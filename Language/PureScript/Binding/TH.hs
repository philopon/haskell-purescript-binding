{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE PolyKinds #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE NoMonomorphismRestriction #-}
{-# OPTIONS_GHC -fno-warn-orphans #-}

module Language.PureScript.Binding.TH where

import Control.Applicative

import qualified Language.Haskell.TH as TH
import qualified Language.Haskell.TH.Syntax as TH
import qualified Language.Haskell.TH.Quote  as TH
import qualified Language.PureScript as PS
import Language.PureScript.Binding.Class
import Language.PureScript.Binding.Dependency

import Data.Proxy
import Data.Aeson.TH
import qualified Data.Foldable as F

--------------------------------------------------------------------------------
tyVarBndrName :: TH.TyVarBndr -> TH.Name
tyVarBndrName (TH.PlainTV  n  ) = n
tyVarBndrName (TH.KindedTV n _) = n

typeToPsTypeE :: TH.Type -> TH.ExpQ
typeToPsTypeE = \case
    (TH.AppT a b) -> [|PS.TypeApp $(typeToPsTypeE a) $(typeToPsTypeE b)|]
    (TH.VarT   v) -> [|PS.TypeVar $(TH.stringE $ TH.nameBase v)|]
    TH.ListT      -> [|prim "Array"|]
    TH.TupleT n | n == 2    -> [|psTyCon ["Data", "Tuple"] "Tuple"|]
                | otherwise -> fail $ "2-tuple only."
    c             -> do
        b <- TH.recover (return False) (TH.isInstance ''PureScriptType [c])
        if b
            then [|toPureScriptType (Proxy :: Proxy $(return c))|]
            else fail $ show c ++ " is not instance of PureScriptType."

depTypes :: TH.Type -> TH.Q [TH.Type]
depTypes = \case
    (TH.AppT a b) -> (++) <$> depTypes a <*> depTypes b
    c -> do
        b <- TH.recover (return False) (TH.isInstance ''HasPureScript [c])
        return $ if b then [c] else []

conName :: TH.Con -> TH.Name
conName (TH.NormalC   n _) = n
conName (TH.RecC      n _) = n
conName (TH.InfixC  _ n _) = n
conName (TH.ForallC _ _ c) = conName c

--------------------------------------------------------------------------------
-- | type instance Deps Name = '[Name']

depsD :: TH.Name -> [TH.Con] -> TH.DecQ
depsD name cons = do
    let ts = concatMap fn cons
    deps <- concat <$> mapM depTypes ts
    let r = foldr (\i b -> (TH.PromotedT '(:-) `TH.AppT` i `TH.AppT` b)) (TH.PromotedT 'TNil) deps
    TH.tySynInstD ''Deps $ TH.tySynEqn [TH.conT name] (return r)
  where
    fn (TH.NormalC  _ ts) = map snd ts
    fn (TH.RecC     _ ts) = map (\(_,_,t) -> t) ts
    fn (TH.InfixC  a _ b) = snd a : snd b : []
    fn (TH.ForallC _ _ c) = fn c
--------------------------------------------------------------------------------
-- | instance PureScriptType Name where
--       toPureScriptType _ = psTyCon [] "Name"
--       pureScriptString _ = "Name"

toPureScriptTypeD :: TH.Name -> TH.DecQ
toPureScriptTypeD n =
    TH.funD 'toPureScriptType [TH.clause [TH.wildP] (TH.normalB $ toPureScriptTypeE n) []]

toPureScriptTypeE :: TH.Name -> TH.ExpQ
toPureScriptTypeE n = [|psTyCon [] $(TH.stringE $ TH.nameBase n)|]

pureScriptTypeStringD :: TH.Name -> TH.DecQ
pureScriptTypeStringD n = TH.funD 'pureScriptTypeString
    [TH.clause [TH.wildP] (TH.normalB . TH.stringE $ TH.nameBase n) []]

pureScriptTypeInstanceD :: TH.Name -> TH.DecQ
pureScriptTypeInstanceD n = TH.instanceD (return []) (TH.conT ''PureScriptType `TH.appT` TH.conT n)
    [toPureScriptTypeD n, pureScriptTypeStringD n]

--------------------------------------------------------------------------------
-- | dataDecl _ = PS.DataDeclaration Name [v1, v2 ..] [(C1, [c1t1, c1t2 ..])]

dataDeclD :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
dataDeclD name vars cons =
    TH.funD 'dataDecl
    [TH.clause [TH.wildP] (TH.normalB $ dataDeclE name vars cons) []] 

dataDeclE :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.ExpQ
dataDeclE name vars cons =
    [|PS.DataDeclaration
        (PS.ProperName $(TH.stringE $ TH.nameBase name))
        $(TH.listE $ map (TH.stringE . TH.nameBase . tyVarBndrName) vars)
        $(TH.listE $ map dataDeclTyConE cons)
     |]

dataDeclTyConE :: TH.Con -> TH.ExpQ
dataDeclTyConE (TH.NormalC n ts) = do
    let l = TH.listE $ map (\(_,t) -> typeToPsTypeE t) ts
    [|(PS.ProperName $(TH.stringE $ TH.nameBase n), $l)|]

dataDeclTyConE (TH.RecC    n ts) = do
    [|(PS.ProperName $(TH.stringE $ TH.nameBase n), $(TH.listE [dataDeclObjE ts]))|]

dataDeclTyConE c = fail $ "cannot convert Con: " ++ show c

dataDeclObjE :: [(TH.VarStrictType)] -> TH.ExpQ
dataDeclObjE vst = do
    ini <- [|PS.REmpty|]
    let rs = F.foldrM (\(n,_,t) a -> [|PS.RCons $(TH.stringE $ TH.nameBase n) $(typeToPsTypeE t) $(return a)|]) ini vst
    [|PS.TypeApp $(TH.dataToExpQ (const Nothing) $ prim "Object") $rs|]

--------------------------------------------------------------------------------
-- | FromJSON autoNameFromJSON :: FromJSON Name where
--       parseJSON 

-- TypeInstanceDeclaration Ident [(Qualified ProperName, [Type])] (Qualified ProperName) [Type] [Declaration]

foreignDeclD :: Options -> TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
foreignDeclD opts name vars cons = TH.funD 'foreignDecl
    [TH.clause [TH.wildP] (TH.normalB $ foreignDeclE opts name vars cons) []] 

foreignDeclE :: Options -> TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.ExpQ
foreignDeclE opts name vars cons = do
    con <- [|PS.TypeConstructor (qual [] $ PS.ProperName $(TH.stringE $ TH.nameBase name))|]
    let fromJSON = [|json (PS.ProperName "FromJSON")|]
    [|PS.TypeInstanceDeclaration
        (PS.Ident $(TH.stringE $ "auto" ++ TH.nameBase name ++ "FromJSON"))
        $(TH.listE $ map (\v -> [|($fromJSON, [PS.TypeVar $(TH.stringE . TH.nameBase $ tyVarBndrName v)])|]) vars)
        $fromJSON
        [$(F.foldlM (\b i -> [|$(return b) `PS.TypeApp` PS.TypeVar $(TH.stringE . TH.nameBase $ tyVarBndrName i) |]) con vars)]
        $(foreignFunE opts cons)
     |]

psFail :: String -> TH.ExpQ
psFail s = [|PS.Var (json $ PS.Ident "fail") `PS.App` PS.StringLiteral $(TH.stringE s)|]

parseFail :: TH.ExpQ
parseFail = [|PS.CaseAlternative [PS.NullBinder] Nothing $(psFail "parse failed")|]

localVar :: String -> TH.ExpQ
localVar s = [| PS.Var . qual [] $ PS.Ident $(TH.stringE s) |]

json :: a -> PS.Qualified a
json = qual ["Data", "JSON"]

parseJSON :: [PS.Binder] -> PS.Value -> PS.Declaration
parseJSON b = PS.ValueDeclaration (PS.Ident "parseJSON") PS.Value b Nothing

constructor :: [String] -> String -> TH.ExpQ
constructor q c = [|PS.Constructor (qual $(TH.listE $ map TH.stringE q) $ PS.ProperName $(TH.stringE c))|]

objBinder :: String -> TH.ExpQ
objBinder var = do
    let obj = [|json $ PS.ProperName "Object"|]
    [| PS.ConstructorBinder $obj [PS.VarBinder $ PS.Ident $(TH.stringE var)] |]

-- case input of
--     Array [v1,v2 ..] -> do
--         v1' <- parseJSON v1
--         v2' <- parseJSON v2
--         ...
--         return (Con v1 v2 ..)
--     _ -> fail ""
foreignSingleFunE :: Options -> TH.Con -> TH.ExpQ
foreignSingleFunE _ (TH.NormalC c ts) = do
    let is  = take (length ts) [0::Int ..]
        bs  = TH.listE $ map (\i -> [|PS.VarBinder $ PS.Ident $(TH.stringE $ 'v': show i)|]) is
        doB = map (\i -> [|PS.DoNotationBind (PS.VarBinder $ PS.Ident $(TH.stringE $ 'v': show i ++ "'"))
            (PS.Var (json $ PS.Ident "parseJSON") `PS.App` $(localVar $ 'v': show i))
            |]) is
        ar = [|json $ PS.ProperName "Array"|]
    cn <- constructor [] (TH.nameBase c)
    let v   = F.foldlM (\b i -> [|$(return b) `PS.App` $(localVar $ 'v': show i ++ "'")|]) cn is
        ret = [| PS.DoNotationValue $ $(localVar "return") `PS.App` $v|]
    [| PS.Case [$(localVar "input")]
        [ PS.CaseAlternative [PS.ConstructorBinder $ar [PS.ArrayBinder $bs]] Nothing (PS.Do $(TH.listE $ doB ++ [ret]))
        , $parseFail
        ]
     |]

-- case input of
--     Object obj -> do
--         aa <- obj .: "a"
--         ab <- obj .: "b"
--         return (Con {aa: aa, ab: ab})
--     _ -> fail ""
foreignSingleFunE Options{fieldLabelModifier = f} (TH.RecC c fs) = do
    let vs  = map (\(n, _, _) -> TH.nameBase n) fs
        doB = map (\v -> [|PS.DoNotationBind (PS.VarBinder $ PS.Ident $(TH.stringE v)) $
                PS.BinaryNoParens (json $ PS.Op ".:") $(localVar "obj") (PS.StringLiteral $(TH.stringE $ f v))
             |]) vs
        ol  = [| PS.ObjectLiteral $(TH.listE $ map (\v -> [|($(TH.stringE v), $(localVar v))|]) vs) |]
        ret = [| PS.DoNotationValue $ $(localVar "return") `PS.App` ($(constructor [] $ TH.nameBase c) `PS.App` $ol) |]
    [| PS.Case [$(localVar "input")]
        [ PS.CaseAlternative [$(objBinder "obj")]
            Nothing (PS.Do $(TH.listE $ doB ++ [ret]))
        , $parseFail
        ]
     |]

foreignSingleFunE _ c = fail $ "cannot convert Con: " ++ show c

letTaggedInput :: Options -> String -> TH.Con -> TH.ExpQ
letTaggedInput opt content r@(TH.NormalC _ _) =
    [| PS.Case [PS.BinaryNoParens (json $ PS.Op ".:") $(localVar "object") (PS.StringLiteral $(TH.stringE content))]
       [ PS.CaseAlternative
           [ PS.ConstructorBinder (qual ["Data", "Either"] $ PS.ProperName "Right") [PS.VarBinder $ PS.Ident "input"] ]
           Nothing $(foreignSingleFunE opt r)
       , $parseFail
       ]
     |]
letTaggedInput opt _ r@(TH.RecC _ _) =
    [| PS.Let [PS.ValueDeclaration (PS.Ident "input") PS.Value [] Nothing $
       PS.Constructor (json $ PS.ProperName "Object") `PS.App` $(localVar "object")]
       $(foreignSingleFunE opt r)
     |]
letTaggedInput _ _ _ = fail "cannot use InfixC, ForallC."

foreignFunE :: Options -> [TH.Con] -> TH.ExpQ
foreignFunE opt [r] =
    [|[parseJSON [PS.VarBinder $ PS.Ident "input"] $(foreignSingleFunE opt r)]|]

foreignFunE opt@Options{sumEncoding = TaggedObject {..}, .. } rs = do
    let ca = map (\r -> [|PS.CaseAlternative
            [ PS.ConstructorBinder (qual ["Data", "Either"] $ PS.ProperName "Right")
                [ PS.StringBinder $(TH.stringE . constructorTagModifier . TH.nameBase $ conName r) ]
            ] Nothing $(letTaggedInput opt contentsFieldName r)|]) rs
    [|[ parseJSON [$(objBinder "object")] $ PS.Case
            [PS.BinaryNoParens (json $ PS.Op ".:") $(localVar "object") $ PS.StringLiteral $(TH.stringE tagFieldName)]
            $(TH.listE $ ca ++ [parseFail])
        ]|]

foreignFunE opt@Options{sumEncoding = TwoElemArray, .. } rs = do
    let ca = map (\r -> [|PS.CaseAlternative
            [ PS.ConstructorBinder (qual ["Data", "Either"] $ PS.ProperName "Right")
                [ PS.ConstructorBinder (qual ["Data", "Tuple"] $ PS.ProperName "Tuple")
                    [ PS.StringBinder $(TH.stringE . constructorTagModifier . TH.nameBase $ conName r)
                    , PS.VarBinder (PS.Ident "input")
                    ]
                ]
            ] Nothing $(foreignSingleFunE opt r)|]) rs
    [|[ parseJSON [PS.VarBinder $ PS.Ident "iTuple"] $ PS.Case
            [PS.Var (json $ PS.Ident "parseJSON") `PS.App` $(localVar "iTuple")]
            $(TH.listE $ ca ++ [parseFail])
        ]|]

foreignFunE opt@Options{sumEncoding = ObjectWithSingleField, .. } rs = do
    let ca = map (\r -> [|PS.CaseAlternative
            [ PS.ArrayBinder
                [ PS.ConstructorBinder (qual ["Data", "Tuple"] $ PS.ProperName "Tuple")
                    [ PS.StringBinder $(TH.stringE . constructorTagModifier . TH.nameBase $ conName r)
                    , PS.VarBinder (PS.Ident "input")
                    ]
                ]
            ] Nothing $(foreignSingleFunE opt r)|]) rs
    [|[ parseJSON [$(objBinder "object")] $ PS.Case
            [PS.Var (qual ["Data", "Map"] $ PS.Ident "toList") `PS.App` $(localVar "object")]
            $(TH.listE $ ca ++ [parseFail])
        ]|]
--------------------------------------------------------------------------------

declRefsD :: TH.Name -> TH.DecQ
declRefsD name = TH.funD 'declRefs
    [TH.clause [TH.wildP] (TH.normalB $ declRefsE name) []] 

declRefsE :: TH.Name -> TH.ExpQ
declRefsE name =
    [|[ PS.TypeInstanceRef (PS.Ident $(TH.stringE $ "auto" ++ TH.nameBase name ++ "FromJSON"))
      , PS.TypeRef (PS.ProperName $(TH.stringE $ TH.nameBase name)) Nothing]
     |]

--------------------------------------------------------------------------------
hasPureScriptD :: Options -> TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
hasPureScriptD opts name vars cons = TH.instanceD (return []) (TH.conT ''HasPureScript `TH.appT` TH.conT name)
    [dataDeclD name vars cons, foreignDeclD opts name vars cons, declRefsD name]

declaration :: Options -> TH.Dec -> TH.DecsQ
declaration opts (TH.DataD _ name vars cons _) = do
    deps <- depsD name cons
    typ  <- pureScriptTypeInstanceD name
    has  <- hasPureScriptD opts name vars cons
    return [deps, typ, has]
declaration opts (TH.NewtypeD cxt name vars con der) = declaration opts (TH.DataD cxt name vars [con] der)
declaration _ a          = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: Options -> TH.Name -> TH.DecsQ
derivePureScript opt name = TH.reify name >>= \case
    TH.TyConI d -> declaration opt d
    i           -> fail $ "cannot convert Info: " ++ show i

deriveDefaultPureScript :: TH.Name -> TH.DecsQ
deriveDefaultPureScript = derivePureScript defaultOptions
