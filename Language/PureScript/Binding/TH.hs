{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE PolyKinds #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE NoMonomorphismRestriction #-}

module Language.PureScript.Binding.TH where

import Control.Applicative

import Language.Haskell.TH as TH
import Language.PureScript.Binding.Class
import Language.PureScript.Binding.Dependency

import Data.List
import Data.Proxy
import Data.Aeson.TH

--------------------------------------------------------------------------------
tyVarBndrName :: TyVarBndr -> Name
tyVarBndrName (PlainTV  n  ) = n
tyVarBndrName (KindedTV n _) = n

typeToPsTypeE :: Type -> ExpQ
typeToPsTypeE = \case
    (AppT ListT a) -> [|'[' : $(typeToPsTypeE a) ++ "]"|]
    (AppT     a b) -> [|'(' : $(typeToPsTypeE a) ++ ' ': $(typeToPsTypeE b) ++ ")"|]
    (VarT       v) -> stringE $ nameBase v
    TupleT n | n == 2    -> stringE "Data.Tuple.Tuple"
                | otherwise -> fail $ "2-tuple only."
    c             -> do
        b <- recover (return False) (isInstance ''PureScriptType [c])
        if b
            then [|toPureScriptType (Proxy :: Proxy $(return c))|]
            else fail $ show c ++ " is not instance of PureScriptType."

depTypes :: Type -> Q [Type]
depTypes = \case
    (AppT a b) -> (++) <$> depTypes a <*> depTypes b
    c -> do
        b <- recover (return False) (isInstance ''HasPureScript [c])
        return $ if b then [c] else []

conName :: Con -> Name
conName (NormalC   n _) = n
conName (RecC      n _) = n
conName (InfixC  _ n _) = n
conName (ForallC _ _ c) = conName c

--------------------------------------------------------------------------------
-- | type instance Deps Name = '[Name']

depsD :: Name -> [Con] -> DecQ
depsD name cons = do
    let ts = concatMap fn cons
    deps <- concat <$> mapM depTypes ts
    let r = foldr (\i b -> (PromotedT '(:-) `AppT` i `AppT` b)) (PromotedT 'TNil) deps
    tySynInstD ''Deps $ tySynEqn [conT name] (return r)
  where
    fn (NormalC  _ ts) = map snd ts
    fn (RecC     _ ts) = map (\(_,_,t) -> t) ts
    fn (InfixC  a _ b) = snd a : snd b : []
    fn (ForallC _ _ c) = fn c
--------------------------------------------------------------------------------
-- | instance PureScriptType Name where
--       toPureScriptType _ = "Name"

toPureScriptTypeD :: Name -> DecQ
toPureScriptTypeD n = funD 'toPureScriptType
    [clause [wildP] (normalB . stringE $ nameBase n) []]

pureScriptTypeInstanceD :: Name -> DecQ
pureScriptTypeInstanceD n = instanceD (return []) (conT ''PureScriptType `appT` conT n)
    [toPureScriptTypeD n]

--------------------------------------------------------------------------------
-- | dataDecl _ = PS.DataDeclaration Name [v1, v2 ..] [(C1, [c1t1, c1t2 ..])]

dataDeclStringD :: Name -> [TyVarBndr] -> [Con] -> DecQ
dataDeclStringD name vars cons = funD 'dataDeclString
    [clause [wildP] (normalB $ dataDeclStringE name vars cons) []] 

dataDeclStringE :: Name -> [TyVarBndr] -> [Con] -> ExpQ
dataDeclStringE name vars cons =
    let cls = zipWith dataDeclConStringE ("    = " : repeat "    | ") cons
        fl  = unwords
              ("data" : nameBase name : map (nameBase . tyVarBndrName) vars)
    in [|unlines $ $(stringE fl) : $(listE cls)|]

dataDeclConStringE :: String -> Con -> ExpQ
dataDeclConStringE p (NormalC n ts) =
    let e = listE $ map (typeToPsTypeE . snd) ts
    in [|$(stringE $ p ++ nameBase n ++ " ") ++ unwords $e |]

dataDeclConStringE p (RecC    n ts) =
    let e = listE $ map (\(c,_,t) -> [|$(stringE $ nameBase c ++ " :: ") ++ $(typeToPsTypeE t)|]) ts
    in [| $(stringE $ p ++ nameBase n ++ " {") ++ intercalate ", " $e ++ "}" |]
    
dataDeclConStringE _ InfixC{}  = fail "cannot use infix data constructor."
dataDeclConStringE _ ForallC{} = fail "cannot use existential quantification."

--------------------------------------------------------------------------------
-- | FromJSON autoNameFromJSON :: FromJSON Name where
--       parseJSON 

foreignDeclStringD :: Options -> Name -> [TyVarBndr] -> [Con] -> DecQ
foreignDeclStringD opts name vars cons = funD 'foreignDeclString
    [clause [wildP] (normalB $ foreignDeclStringE opts name vars cons) []] 

foreignDeclStringE :: Options -> Name -> [TyVarBndr] -> [Con] -> ExpQ
foreignDeclStringE opts name vars cons = do
    let hdr = concat 
            [ "instance auto", nameBase name, "FromJSON :: "
            , foreignDeclStringCxt vars
            , "Data.JSON.FromJSON ", foreignDeclStringName name vars, "where"]
    stringE $ intercalate "\n"
        [ hdr
        , foreignDeclStringFun opts cons
        ]

foreignDeclStringName :: Name -> [TyVarBndr] -> String
foreignDeclStringName n []   = nameBase n ++ " "
foreignDeclStringName n vars = '(' : nameBase n ++ ' ': intercalate " " (map (nameBase . tyVarBndrName) vars) ++ ") "

foreignDeclStringCxt :: [TyVarBndr] -> String
foreignDeclStringCxt []   = ""
foreignDeclStringCxt vars =
    '(' : intercalate ", " (map (\v -> "Data.JSON.FromJSON " ++ nameBase (tyVarBndrName v)) vars) ++ ") => "

sp :: Int -> String
sp i = replicate (4 * i) ' '

foreignDeclStringSingleFun :: Options -> Int -> Con -> String
foreignDeclStringSingleFun _ i (NormalC n t) =
    let vs   = map (('v':) . show) $ take (length t) [ 0 :: Int .. ]
        cse  = sp  i      ++ "case input of"
        rit  = sp (i + 1) ++ "Data.JSON.Array [" ++ intercalate "," vs ++ "] -> do"
        pf v = sp (i + 2) ++ v ++ "' <- Data.JSON.parseJSON " ++ v
        ret  = sp (i + 2) ++ "return (" ++ nameBase n ++ ' ': intercalate "' " vs ++ "')"
        lft  = sp (i + 1) ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ cse : rit : map pf vs ++ [ret, lft]

foreignDeclStringSingleFun Options{..} i (RecC n t) =
    let cse  = sp  i      ++ "case input of"
        rit  = sp (i + 1) ++ "Data.JSON.Object object -> do"
        pf v = sp (i + 2) ++ v ++ " <- Data.JSON.(.:) object \"" ++ fieldLabelModifier v ++ "\""
        ret  = sp (i + 2) ++ "return (" ++ nameBase n ++ " {" ++ intercalate ", "
            (map (\(c,_,_) -> nameBase c ++ ": " ++ nameBase c) t) ++ "})"
        lft  = sp (i + 1) ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ cse : rit : map (\(c,_,_) -> pf $ nameBase c) t ++ [ret, lft]

foreignDeclStringSingleFun _ _ InfixC{}  = error "cannot use infix data constructor."
foreignDeclStringSingleFun _ _ ForallC{} = error "cannot use existential quantification."

foreignDeclStringFun :: Options -> [Con] -> String
foreignDeclStringFun opts [con] = unlines [sp 1 ++ "parseJSON input =", foreignDeclStringSingleFun opts 2 con]
foreignDeclStringFun opt@Options{sumEncoding = TaggedObject {..}, .. } rs =
    let fl   = sp 1 ++ "parseJSON (Data.JSON.Object obj) = case Data.JSON.(.:) obj \"" ++ tagFieldName ++ "\" of"
        ca c@(NormalC n _) = unlines
            [ sp 2 ++ "Data.Either.Right \"" ++ constructorTagModifier (nameBase n) ++
                "\" -> case Data.JSON.(.:) obj \"" ++ contentsFieldName ++ "\" of"
            , sp 3 ++ "Data.Either.Right input ->"
            , foreignDeclStringSingleFun opt 4 c
            , sp 3 ++ "_ -> Data.JSON.fail \"cannot parse.\""
            ]
        ca c@(RecC n _)    = unlines
            [ sp 2 ++ "Data.Either.Right \"" ++ constructorTagModifier (nameBase n) ++
                "\" -> let input = Data.JSON.Object obj in"
            , foreignDeclStringSingleFun opt 3 c
            ]
        ca InfixC{}  = error "cannot use infix data constructor."
        ca ForallC{} = error "cannot use existential quantification."

        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
        fbk  = sp 1 ++ "parseJSON _ = Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ fl : map ca rs ++ [fil, fbk]

foreignDeclStringFun opt@Options{sumEncoding = TwoElemArray, .. } rs =
    let fl   = sp 1 ++ "parseJSON array = case Data.JSON.parseJSON array of"
        ca c = unlines
            [ sp 2 ++ "Data.Either.Right (Data.Tuple.Tuple \"" ++
                constructorTagModifier (nameBase $ conName c) ++ "\" input) ->"
            , foreignDeclStringSingleFun opt 3 c
            ]
        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ fl : map ca rs ++ [fil]

foreignDeclStringFun opt@Options{sumEncoding = ObjectWithSingleField, .. } rs =
    let fl   = sp 1 ++ "parseJSON (Data.JSON.Object obj) = case Data.Map.toList obj of"
        ca c = unlines
            [ sp 2 ++ "[Data.Tuple.Tuple \"" ++
                constructorTagModifier (nameBase $ conName c) ++ "\" input] ->"
            , foreignDeclStringSingleFun opt 3 c
            ]
        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
        fbk  = sp 1 ++ "parseJSON _ = Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ fl : map ca rs ++ [fil, fbk]

hasPureScriptD :: Options -> Name -> [TyVarBndr] -> [Con] -> DecQ
hasPureScriptD opts name vars cons = instanceD (return []) (conT ''HasPureScript `appT` conT name)
    [dataDeclStringD name vars cons, foreignDeclStringD opts name vars cons]

declaration :: Options -> Dec -> DecsQ
declaration opts (DataD _ name vars cons _) = do
    deps <- depsD name cons
    typ  <- pureScriptTypeInstanceD name
    has  <- hasPureScriptD opts name vars cons
    return [deps, typ, has]
declaration opts (NewtypeD cnxt name vars con der) = declaration opts (DataD cnxt name vars [con] der)
declaration _ a          = fail $ "cannot convert Dec: " ++ show a

derivePureScript :: Options -> Name -> DecsQ
derivePureScript opt name = reify name >>= \case
    TyConI d -> declaration opt d
    i           -> fail $ "cannot convert Info: " ++ show i

deriveDefaultPureScript :: Name -> DecsQ
deriveDefaultPureScript = derivePureScript defaultOptions
