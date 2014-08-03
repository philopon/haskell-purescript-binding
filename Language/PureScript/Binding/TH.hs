{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE LambdaCase #-}
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

hasPureScriptD :: TH.Name -> [TH.TyVarBndr] -> [TH.Con] -> TH.DecQ
hasPureScriptD name vars cons = TH.instanceD (return []) (TH.conT ''HasPureScript `TH.appT` TH.conT name)
    [ dataDeclD name vars cons ]

--------------------------------------------------------------------------------

declaration :: TH.Dec -> TH.DecsQ
declaration (TH.DataD _ name vars cons _) = do
    deps <- depsD name cons
    typ  <- pureScriptTypeInstanceD name
    has  <- hasPureScriptD name vars cons
    return [deps, typ, has]
declaration (TH.NewtypeD cxt name vars con der) = declaration (TH.DataD cxt name vars [con] der)
declaration a          = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: TH.Name -> TH.DecsQ
derivePureScript name = TH.reify name >>= \case
    TH.TyConI d -> declaration d
    i           -> fail $ "cannot convert Info: " ++ show i
