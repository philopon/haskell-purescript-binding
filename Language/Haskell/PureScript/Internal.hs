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

fst3 :: (a,b,c) -> a
fst3 (a,_,_) = a

--------------------------------------------------------------------------------
class PureScriptType (a :: k) where
    toPureScriptType     :: proxy a -> PS.Type
    pureScriptTypeString :: proxy a -> String

instance PureScriptType Maybe where
    toPureScriptType     _ = psTyCon ["Data", "Maybe"] "Maybe"
    pureScriptTypeString _ = "Maybe"

data PureScriptTypeHole deriving Typeable
instance PureScriptType PureScriptTypeHole where
    toPureScriptType     _ = error "PureScriptTypeHole"
    pureScriptTypeString _ = "Hole"

#define PscType(hs,psc, str) instance PureScriptType hs where toPureScriptType _ = psc; pureScriptTypeString _ = str

PscType(Int,     number, "Number")
PscType(Int8,    number, "Number")
PscType(Int16,   number, "Number")
PscType(Int32,   number, "Number")
PscType(Int64,   number, "Number")
PscType(Integer, number, "Number")

PscType(Word,   number, "Number")
PscType(Word8,  number, "Number")
PscType(Word16, number, "Number")
PscType(Word32, number, "Number")
PscType(Word64, number, "Number")

PscType(Double, number, "Number")
PscType(Float,  number, "Number")

PscType(Sci.Scientific,  number, "Number")

PscType(Bool, boolean, "Boolean")

PscType(Char,    string, "String")
PscType([Char],  string, "String")
PscType(T.Text,  string, "String")
PscType(TL.Text, string, "String")

#undef PscType

--------------------------------------------------------------------------------
psTypeE :: TH.Name -> TH.ExpQ
psTypeE name = [|psTyCon [] $(TH.stringE $ TH.nameBase name)|]

psToTypeD :: TH.Name -> TH.DecQ
psToTypeD n = TH.funD 'toPureScriptType [TH.clause [TH.wildP] (TH.normalB $ psTypeE n) []] 

psInstancePred :: TH.TyVarBndr -> TH.PredQ
psInstancePred v = TH.classP ''PureScriptType [TH.varT $ tyVarBndrName v]

psNameVars :: TH.Name -> [TH.TyVarBndr] -> TH.TypeQ
psNameVars name = F.foldlM (\b v -> return b `TH.appT` TH.varT (tyVarBndrName v)) (TH.ConT name)

ppTyNames :: [String] -> String
ppTyNames = ('_':) . intercalate "_"

psTypeStrD :: TH.Name -> TH.DecQ
psTypeStrD name = TH.funD 'pureScriptTypeString
    [TH.clause [TH.wildP] (TH.normalB . TH.stringE $ TH.nameBase name) []]

--------------------------------------------------------------------------------
class HasPureScript (a :: *) where
    dataDeclaration    :: proxy a -> PS.Declaration
    synonymDeclaration :: proxy a -> PS.Declaration
    foreignDeclaration :: proxy a -> PS.Declaration

--------------------------------------------------------------------------------
psDataD :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
psDataD name vars cons =
    TH.funD 'dataDeclaration 
    [TH.clause [TH.wildP] (TH.normalB $ psDataE name vars cons) []] 

psDataE :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.ExpQ
psDataE name vars cons =
    [|PS.DataDeclaration
        (PS.ProperName $(TH.stringE $ TH.nameBase name))
        $(TH.listE $ map (TH.stringE . TH.nameBase . tyVarBndrName) vars)
        $(TH.listE $ map psDataTyConE cons)
     |]

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
psAliasD :: TH.Name -> [TH.TyVarBndr] -> TH.DecQ
psAliasD name vs =
    TH.funD 'synonymDeclaration 
    [TH.clause [TH.wildP] (TH.normalB $ psAliasE name vs) []] 

psAliasE :: TH.Name -> [TH.TyVarBndr] -> TH.ExpQ
psAliasE name vs = do
    i <- [|psTyCon [] $(TH.stringE $ TH.nameBase name)|]
    [|PS.TypeSynonymDeclaration 
        (PS.ProperName $ $(TH.stringE $ TH.nameBase name) ++ ppTyNames $(psTypeRepE vs))
        [] $(psAliasVarsE i vs)|]

psAliasVarsE :: TH.Exp -> [TH.TyVarBndr] -> TH.ExpQ
psAliasVarsE = F.foldlM $ \b i ->
    [|$(return b) `PS.TypeApp` toPureScriptType (Proxy :: Proxy $(TH.varT $ tyVarBndrName i))|]

psTypeRepE :: [TH.TyVarBndr] -> TH.ExpQ
psTypeRepE = flip F.foldrM (TH.ListE []) $ \i b ->
    [|pureScriptTypeString (Proxy :: Proxy $(TH.varT $ tyVarBndrName i)) : $(return b)|]

--------------------------------------------------------------------------------

foreignD :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
foreignD name vars cons = TH.funD 'foreignDeclaration
    [TH.clause [TH.wildP] (TH.normalB $ foreignE name vars cons) []]

foreignE :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.ExpQ
foreignE name vars cons = 
    [| PS.TypeInstanceDeclaration
       (PS.Ident $(TH.stringE $ "readForeign" ++ TH.nameBase name))
       $(foreignDepsE vars)
       (qual ["Data", "Foreign"] (PS.ProperName "ReadForeign"))
       [$(foreignTypeE name vars)]
       [PS.ValueDeclaration (PS.Ident "read") PS.Value [] Nothing $(foreignExprE cons)]

     |]

foreignDepsE :: [TH.TyVarBndr] -> TH.ExpQ
foreignDepsE vars = do
    let l = TH.listE $ map (TH.stringE . TH.nameBase . tyVarBndrName) vars
    [|map foreignDepsFn $l|]

foreignDepsFn :: String -> (PS.Qualified PS.ProperName, [PS.Type])
foreignDepsFn s = (qual ["Data", "Foreign"] (PS.ProperName "ReadForeign"), [PS.TypeVar s])

foreignTypeE :: TH.Name -> [TH.TyVarBndr] -> TH.ExpQ
foreignTypeE name vars = do
    s <- [| PS.TypeConstructor . qual [] $ PS.ProperName $(TH.stringE $ TH.nameBase name) |]
    F.foldlM (\a i -> [|$(return a) `PS.TypeApp` PS.TypeVar $(TH.stringE . TH.nameBase $ tyVarBndrName i) |] ) s vars

foreignExprE :: [TH.Con] -> TH.ExpQ
foreignExprE [TH.RecC cst fs] = foreignExprSingleTaggedE cst (map fst3 fs)
foreignExprE a = fail $ fail "cannot create Foreign instance: " ++ show a

foreignExprSingleTaggedE :: TH.Name -> [TH.Name] -> TH.ExpQ
foreignExprSingleTaggedE cst fs = do
    let ifs = zip [0 :: Int ..] fs
    let l = map (\(i, n) ->
            [| PS.DoNotationBind 
                   (PS.VarBinder $ PS.Ident $(TH.stringE $ 'v': show i))
                   (PS.Var (qual ["Data", "Foreign"] (PS.Ident "prop")) `PS.App` PS.StringLiteral $(TH.stringE $ TH.nameBase n))
             |] ) ifs
    c <- [|PS.Constructor (qual [] (PS.ProperName $(TH.stringE $ TH.nameBase cst)))|]
    let v = F.foldlM (\a (i,_) -> [|$(return a) `PS.App` PS.Var (qual [] (PS.Ident $(TH.stringE $ 'v': show i)))|]) c ifs
    let r = [|PS.DoNotationValue (PS.Var (qual [] $ PS.Ident "return") `PS.App` PS.Parens $v )|]
    [|PS.Do $(TH.listE $ l ++ [r]) |]

--------------------------------------------------------------------------------
psInstanceD :: TH.Dec -> TH.DecsQ
psInstanceD (TH.DataD [] name vs cs _) = do
    i <- TH.instanceD (return [])
        (TH.conT ''PureScriptType `TH.appT` TH.conT name) [psToTypeD name, psTypeStrD name]
    j <- TH.instanceD (mapM psInstancePred vs)
        (TH.conT ''HasPureScript `TH.appT` psNameVars name vs) [psDataD name vs cs, psAliasD name vs, foreignD name vs cs]
    k <- deriveToJSON defaultOptions name
    return $ i:j:k
psInstanceD TH.DataD{} = fail "cannot derive Data with context."
psInstanceD a          = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: TH.Name -> TH.DecsQ
derivePureScript name = TH.reify name >>= \case
    TH.TyConI d -> psInstanceD d
    i           -> fail $ "cannot convert Info: " ++ show i
