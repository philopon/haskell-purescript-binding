{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE DeriveDataTypeable #-}
{-# LANGUAGE PolyKinds #-}
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
import Data.List
import Data.Int
import Data.Word
import Data.Aeson.TH
import qualified Data.Foldable as F
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

array, boolean, date, function, number, object, string :: PS.Type
array    = prim "Array"
boolean  = prim "Boolean"
date     = prim "Date"
function = prim "Function"
number   = prim "Number"
object   = prim "Object"
string   = prim "String"

tyVarBndrName :: TH.TyVarBndr -> TH.Name
tyVarBndrName (TH.PlainTV  n  ) = n
tyVarBndrName (TH.KindedTV n _) = n

--------------------------------------------------------------------------------

class Typeable a => PureScriptType (a :: k) where
    toPureScriptType :: proxy a -> PS.Type

instance PureScriptType Maybe where
    toPureScriptType _ = psTyCon ["Data", "Maybe"] "Maybe"

data PureScriptTypeHole deriving Typeable
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

class HasPureScript a where
    declaration :: proxy a -> [(String, PS.Declaration)]

--------------------------------------------------------------------------------
psDataE :: TH.Dec -> TH.ExpQ
psDataE (TH.DataD _ name vars cons _) =
    [|PS.DataDeclaration
        (PS.ProperName $(TH.stringE $ TH.nameBase name))
        $(TH.listE $ map (TH.stringE . TH.nameBase . tyVarBndrName) vars)
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
    let rs = F.foldrM (\(n,_,t) a -> [|PS.RCons $(TH.stringE $ TH.nameBase n) $(psDataTypeE t) $(return a)|]) ini vst
    [|PS.TypeApp $(TH.dataToExpQ (const Nothing) $ prim "Object") $rs|]

psDataTypeE :: TH.Type -> TH.ExpQ
psDataTypeE = \case
    (TH.AppT a b) -> [|PS.TypeApp $(psDataTypeE a) $(psDataTypeE b)|]
    (TH.VarT   v) -> [|PS.TypeVar $(TH.stringE $ TH.nameBase v)|]
    TH.ListT      -> [|prim "Array"|]
    c@(TH.ConT _) -> do
        b <- TH.recover (return False) (TH.isInstance ''PureScriptType [c])
        if b
            then [|toPureScriptType (Proxy :: Proxy $(return c))|]
            else fail $ show c ++ " is not instance of PureScriptType."

    a             -> fail $ "cannot convert type: " ++ show a

--------------------------------------------------------------------------------

psAliasE :: TH.Dec -> TH.ExpQ
psAliasE (TH.DataD _ name vs _ _) = do
    i <- [|psTyCon [] $(TH.stringE $ TH.nameBase name)|]
    [|PS.TypeSynonymDeclaration 
        (PS.ProperName $ $(TH.stringE $ TH.nameBase name) ++ '_' : ppTyNames $(psTypeRepE vs))
        [] $(psAliasVarsE i vs)|]
psAliasE a          = fail $ "cannot convert Dec: " ++ show a

psAliasVarsE :: TH.Exp -> [TH.TyVarBndr] -> TH.ExpQ
psAliasVarsE = F.foldlM $ \b i ->
    [|$(return b) `PS.TypeApp` toPureScriptType (Proxy :: Proxy $(TH.varT $ tyVarBndrName i))|]

psTypeRepE :: [TH.TyVarBndr] -> TH.ExpQ
psTypeRepE = F.foldrM (\i b ->
    [| typeOf (undefined :: $(TH.varT $ tyVarBndrName i)) : $(return b)|] ) (TH.ListE [])

--------------------------------------------------------------------------------

psTypeE :: TH.Dec -> TH.ExpQ
psTypeE (TH.DataD _ name _ _ _) = [|psTyCon [] $(TH.stringE $ TH.nameBase name)|]
psTypeE a = fail $ "cannot convert Dec: " ++ show a

psTypeD :: TH.Dec -> TH.DecQ
psTypeD d = TH.funD 'toPureScriptType [TH.clause [TH.wildP] (TH.normalB $ psTypeE d) []] 

psInstancePred :: TH.TyVarBndr -> TH.PredQ
psInstancePred v = TH.classP ''PureScriptType [TH.varT $ tyVarBndrName v]

psNameVars :: TH.Name -> [TH.TyVarBndr] -> TH.TypeQ
psNameVars name = F.foldlM (\b v -> return b `TH.appT` TH.varT (tyVarBndrName v)) (TH.ConT name)

ppTyNames :: [TypeRep] -> String
ppTyNames = intercalate "_" . map show

--------------------------------------------------------------------------------
psDataD :: TH.Dec -> TH.DecQ
psDataD d@(TH.DataD _ name vs _ _) =
    TH.funD 'declaration 
    [TH.clause [TH.wildP] (TH.normalB [| 
        [ ($(TH.stringE $ TH.nameBase name), $(psDataE d))
        , ($(TH.stringE $ TH.nameBase name) ++ '_': ppTyNames $(psTypeRepE vs), $(psAliasE d))
        ] |]) []] 
psDataD a = fail $ "cannot convert Dec: " ++ show a

psInstanceD :: TH.Dec -> TH.DecsQ
psInstanceD d@(TH.DataD [] name vs _ _) = do
    i <- TH.instanceD (return [])              (TH.conT ''PureScriptType `TH.appT` TH.conT    name)    [psTypeD d]
    j <- TH.instanceD (mapM psInstancePred vs) (TH.conT ''HasPureScript  `TH.appT` psNameVars name vs) [psDataD d]
    k <- deriveToJSON defaultOptions name
    return $ i:j:k
psInstanceD TH.DataD{} = fail "cannot derive Data with context."
psInstanceD a          = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: TH.Name -> TH.DecsQ
derivePureScript name = TH.reify name >>= \case
    TH.TyConI d -> psInstanceD d
    i           -> fail $ "cannot convert Info: " ++ show i
