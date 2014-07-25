{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE ScopedTypeVariables #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE TupleSections #-}
{-# LANGUAGE NoMonomorphismRestriction #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE CPP #-}

module Language.Haskell.PureScript.Internal where

import qualified Language.Haskell.TH as TH
import qualified Language.Haskell.TH.Quote as TH
import qualified Language.Haskell.TH.Syntax as TH
import qualified Language.PureScript as PS

import Data.Generics
import Data.Foldable
import Data.Int
import Data.Word
import qualified Data.Text as T
import qualified Data.Text.Lazy as TL
import qualified Data.Scientific as Sci

qual :: [String] -> a -> PS.Qualified a
qual [] a = PS.Qualified Nothing a
qual ms a = PS.Qualified (Just . PS.ModuleName $ map PS.ProperName ms) a

psTyCon :: [String] -> String -> PS.Type
psTyCon qs = PS.TypeConstructor . qual qs . PS.ProperName

prim :: String -> PS.Type
prim = psTyCon ["Prim"]

array :: PS.Type -> PS.Type
array = PS.TypeApp (prim "Array")

number, boolean, string :: PS.Type
number  = prim "Number"
boolean = prim "Boolean"
string  = prim "String"

class PureScriptType a where
    toPureScriptType :: proxy a -> PS.Type
    pureScriptData   :: proxy a -> Maybe PS.Declaration
    pureScriptData _ = Nothing

instance PureScriptType a => PureScriptType (Maybe a) where
    toPureScriptType _ = psTyCon ["Data", "Maybe"] "Maybe" `PS.TypeApp` toPureScriptType (Proxy :: Proxy a)

data PureScriptTypeHole
instance PureScriptType PureScriptTypeHole where
    toPureScriptType _ = error "PureScriptTypeHole"

#define PscType(hs,psc) instance PureScriptType hs where toPureScriptType _ = psc

PscType(Int,     number)
PscType(Int8,    number)
PscType(Int16,   number)
PscType(Int32,   number)
PscType(Int64,   number)
PscType(Integer, number)

PscType(Word,   number)
PscType(Word8,  number)
PscType(Word16, number)
PscType(Word32, number)
PscType(Word64, number)

PscType(Double, number)
PscType(Float,  number)

PscType(Sci.Scientific,  number)

PscType(Bool, boolean)

PscType(Char, string)
PscType([Char], string)
PscType(T.Text, string)
PscType(TL.Text, string)

#undef PscType

--------------------------------------------------------------------------------
psDataD :: TH.Dec -> TH.DecQ
psDataD d = TH.funD 'pureScriptData [TH.clause [TH.wildP] (TH.normalB [| Just $(psDataE d) |]) []] 

psDataE :: TH.Dec -> TH.ExpQ
psDataE (TH.DataD [] name _ cons _) =
    [|PS.DataDeclaration
        (PS.ProperName $(TH.stringE $ TH.nameBase name))
        []
        $(TH.listE $ map psDataTyConE cons)
     |]
psDataE a = fail $ "cannot convert Dec: " ++ show a

psDataTyConE :: TH.Con -> TH.ExpQ
psDataTyConE (TH.NormalC n ts) = do
    let l = TH.listE $ map (\(_,t) -> psDataTypeE t) ts
    [|(PS.ProperName $(TH.stringE $ TH.nameBase n), $l)|]
psDataTyConE (TH.RecC    n ts) = [|(PS.ProperName $(TH.stringE $ TH.nameBase n), $(TH.listE [psDataObjE ts]))|]
psDataTyConE c = fail $ "cannot convert Con: " ++ show c

psDataObjE :: [(TH.VarStrictType)] -> TH.ExpQ
psDataObjE vst = do
    ini <- [|PS.REmpty|]
    let rs = foldrM (\(n,_,t) a -> [|PS.RCons $(TH.stringE $ TH.nameBase n) $(psDataTypeE t) $(return a)|]) ini vst
    [|PS.TypeApp $(TH.dataToExpQ (const Nothing) $ prim "Object") $rs|]

psDataTypeE :: TH.Type -> TH.ExpQ
psDataTypeE t = TH.recover (return False) (TH.isInstance ''PureScriptType [varToHole t]) >>= psDataTypeE'
  where
    psDataTypeE' True = [|toPureScriptType (Proxy :: Proxy $(return t))|]
    psDataTypeE' False = case t of
        (TH.AppT a b) -> [|PS.TypeApp $(psDataTypeE a) $(psDataTypeE b)|]
        (TH.VarT   v) -> [|PS.TypeVar $ $(TH.stringE $ TH.nameBase v)|]
        TH.ListT      -> [|prim "Array"|]
        a             -> fail $ "cannot convert type: " ++ show a

varToHole :: TH.Type -> TH.Type
varToHole = everywhere (mkT f)
  where
    f (TH.VarT _) = TH.ConT ''PureScriptTypeHole
    f a           = a

--------------------------------------------------------------------------------

psTypeE :: TH.Dec -> TH.ExpQ
psTypeE (TH.DataD [] name vs _ _) = do
    st <- [|psTyCon [] $(TH.stringE $ TH.nameBase name)|]
    foldlM ff st vs
  where
    ff b (TH.PlainTV i) = [|$(return b) `PS.TypeApp` toPureScriptType (Proxy :: Proxy $(TH.varT i)) |]
    ff _ _              = fail "canot convert KindedTV."

psTypeE a = fail $ "cannot convert Dec: " ++ show a

psTypeD :: TH.Dec -> TH.DecQ
psTypeD d = TH.funD 'toPureScriptType [TH.clause [TH.wildP] (TH.normalB $ psTypeE d) []] 


--------------------------------------------------------------------------------

psInstancePred :: TH.TyVarBndr -> TH.PredQ
psInstancePred (TH.PlainTV n) = TH.classP ''PureScriptType [TH.varT n]
psInstancePred _              = fail "canot convert KindedTV."

psNameVars :: TH.Name -> [TH.TyVarBndr] -> TH.TypeQ
psNameVars name = foldlM ff (TH.ConT name)
  where
    ff b (TH.PlainTV n) = return b `TH.appT` TH.varT n
    ff _ _              = fail "canot convert KindedTV."

psInstanceD :: TH.Dec -> TH.DecsQ
psInstanceD d@(TH.DataD [] name vs _ _) = do
    i <- TH.instanceD (mapM psInstancePred vs) (TH.conT ''PureScriptType `TH.appT` psNameVars name vs) [psTypeD d, psDataD d]
    return [i]
psInstanceD a = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: TH.Name -> TH.DecsQ
derivePureScript name = TH.reify name >>= \case
    TH.TyConI d -> psInstanceD d
    i           -> fail $ "cannot convert Info: " ++ show i
