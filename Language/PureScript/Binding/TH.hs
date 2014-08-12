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

import Data.Monoid
import Data.Text.Lazy.Builder hiding (fromString)
import qualified Data.String as S
import Data.List
import Data.Proxy
import Data.Aeson.TH

--------------------------------------------------------------------------------
tyVarBndrName :: TyVarBndr -> Name
tyVarBndrName (PlainTV  n  ) = n
tyVarBndrName (KindedTV n _) = n

bUnlines :: [Builder] -> Builder
bUnlines = mconcat . map (<> singleton '\n')

bUnwords :: [Builder] -> Builder
bUnwords = mconcat . intersperse (singleton ' ')

fromString :: String -> Builder
fromString = fromText . S.fromString
{-# INLINE fromString #-}

typeToPsTypeE :: Type -> ExpQ
typeToPsTypeE = \case
    (AppT ListT a) -> [|singleton '[' <> $(typeToPsTypeE a) <> singleton ']'|]
    (AppT     a b) -> [|singleton '(' <> $(typeToPsTypeE a) <> singleton ' ' <> $(typeToPsTypeE b) <> singleton ')'|]
    (VarT       v) -> [|fromString $(stringE $ nameBase v) |]
    TupleT n | n == 2    -> [|fromString $(stringE "Data.Tuple.Tuple")|]
                | otherwise -> fail $ "2-tuple only."
    c             -> do
        b <- recover (return False) (isInstance ''PureScriptType [c])
        if b
            then [|fromText $ toPureScriptType (Proxy :: Proxy $(return c))|]
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
    [clause [wildP] (normalB [|S.fromString $(stringE $ nameBase n)|]) []]

pureScriptTypeInstanceD :: Name -> DecQ
pureScriptTypeInstanceD n = instanceD (return []) (conT ''PureScriptType `appT` conT n)
    [toPureScriptTypeD n]

--------------------------------------------------------------------------------
-- | dataDecl _ = "data A = .."

dataDeclD :: Name -> [TyVarBndr] -> [Con] -> DecQ
dataDeclD name vars cons = funD 'dataDecl
    [clause [wildP] (normalB $ dataDeclE name vars cons) []] 

dataDeclE :: Name -> [TyVarBndr] -> [Con] -> ExpQ
dataDeclE name vars cons =
    let cls = zipWith dataDeclConStringE ("    = " : repeat "    | ") cons
        fl  = unwords
              ("data" : nameBase name : map (nameBase . tyVarBndrName) vars)
    in [|bUnlines $ fromString $(stringE fl) : $(listE cls)|]

dataDeclConStringE :: String -> Con -> ExpQ
dataDeclConStringE p (NormalC n ts) =
    let e = listE $ map (typeToPsTypeE . snd) ts
    in [|fromString $(stringE $ p ++ nameBase n ++ " ") <> bUnwords $e |]

dataDeclConStringE p (RecC    n ts) =
    let e = listE $ map (\(c,_,t) -> [|fromString $(stringE $ nameBase c ++ " :: ") <> $(typeToPsTypeE t)|]) ts
        in [| fromString $(stringE $ p ++ nameBase n ++ " {") <> mconcat (intersperse (fromString ", ") $e) <> singleton '}' |]
    
dataDeclConStringE _ InfixC{}  = fail "cannot use infix data constructor."
dataDeclConStringE _ ForallC{} = fail "cannot use existential quantification."

--------------------------------------------------------------------------------
-- | FromJSON autoNameFromJSON :: FromJSON Name where
--       parseJSON 

foreignDeclD :: Options -> Name -> [TyVarBndr] -> [Con] -> DecQ
foreignDeclD opts name vars cons = funD 'foreignDecl
    [clause [wildP] (normalB $ foreignDeclE opts name vars cons) []] 

foreignDeclE :: Options -> Name -> [TyVarBndr] -> [Con] -> ExpQ
foreignDeclE opts name vars cons = do
    let hdr = concat 
            [ "instance auto", nameBase name, "FromJSON :: "
            , foreignDeclCxt vars
            , "Data.JSON.FromJSON ", foreignDeclName name vars, "where"
            ]
        se  = stringE $ intercalate "\n"
            [ hdr
            , foreignDeclFun opts cons
            ]
    [|fromString $se|]

foreignDeclName :: Name -> [TyVarBndr] -> String
foreignDeclName n []   = nameBase n ++ " "
foreignDeclName n vars = '(' : nameBase n ++ ' ': intercalate " " (map (nameBase . tyVarBndrName) vars) ++ ") "

foreignDeclCxt :: [TyVarBndr] -> String
foreignDeclCxt []   = ""
foreignDeclCxt vars =
    '(' : intercalate ", " (map (\v -> "Data.JSON.FromJSON " ++ nameBase (tyVarBndrName v)) vars) ++ ") => "

sp :: Int -> String
sp i = replicate (4 * i) ' '

foreignDeclSingleFun :: Options -> Int -> Con -> String
foreignDeclSingleFun _ i (NormalC n t) =
    let vs   = map (('v':) . show) $ take (length t) [ 0 :: Int .. ]
        cse  = sp  i      ++ "case input of"
        rit  = sp (i + 1) ++ "Data.JSON.JArray [" ++ intercalate "," vs ++ "] -> do"
        pf v = sp (i + 2) ++ v ++ "' <- Data.JSON.parseJSON " ++ v
        ret  = sp (i + 2) ++ "return (" ++ nameBase n ++ ' ': intercalate "' " vs ++ "')"
        lft  = sp (i + 1) ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ cse : rit : map pf vs ++ [ret, lft]

foreignDeclSingleFun Options{..} i (RecC n t) =
    let cse  = sp  i      ++ "case input of"
        rit  = sp (i + 1) ++ "Data.JSON.JObject object -> do"
        pf v = sp (i + 2) ++ v ++ " <- Data.JSON.(.:) object \"" ++ fieldLabelModifier v ++ "\""
        ret  = sp (i + 2) ++ "return (" ++ nameBase n ++ " {" ++ intercalate ", "
            (map (\(c,_,_) -> nameBase c ++ ": " ++ nameBase c) t) ++ "})"
        lft  = sp (i + 1) ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in intercalate "\n" $ cse : rit : map (\(c,_,_) -> pf $ nameBase c) t ++ [ret, lft]

foreignDeclSingleFun _ _ InfixC{}  = error "cannot use infix data constructor."
foreignDeclSingleFun _ _ ForallC{} = error "cannot use existential quantification."

foreignDeclFun :: Options -> [Con] -> String
foreignDeclFun opts [con] = unlines [sp 1 ++ "parseJSON input =", foreignDeclSingleFun opts 2 con]
foreignDeclFun opt@Options{sumEncoding = TaggedObject {..}, .. } rs =
    let fl   = sp 1 ++ "parseJSON (Data.JSON.JObject obj) = case Data.JSON.(.:) obj \"" ++ tagFieldName ++ "\" of"
        ca c@(NormalC n _) = unlines
            [ sp 2 ++ "Data.Either.Right \"" ++ constructorTagModifier (nameBase n) ++
                "\" -> case Data.JSON.(.:) obj \"" ++ contentsFieldName ++ "\" of"
            , sp 3 ++ "Data.Either.Right input ->"
            , foreignDeclSingleFun opt 4 c
            , sp 3 ++ "_ -> Data.JSON.fail \"cannot parse.\""
            ]
        ca c@(RecC n _)    = unlines
            [ sp 2 ++ "Data.Either.Right \"" ++ constructorTagModifier (nameBase n) ++
                "\" -> let input = Data.JSON.JObject obj in"
            , foreignDeclSingleFun opt 3 c
            ]
        ca InfixC{}  = error "cannot use infix data constructor."
        ca ForallC{} = error "cannot use existential quantification."

        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
        fbk  = sp 1 ++ "parseJSON _ = Data.JSON.fail \"cannot parse.\""
    in unlines $ fl : map ca rs ++ [fil, fbk]

foreignDeclFun opt@Options{sumEncoding = TwoElemArray, .. } rs =
    let fl   = sp 1 ++ "parseJSON array = case Data.JSON.parseJSON array of"
        ca c = unlines
            [ sp 2 ++ "Data.Either.Right (Data.Tuple.Tuple \"" ++
                constructorTagModifier (nameBase $ conName c) ++ "\" input) ->"
            , foreignDeclSingleFun opt 3 c
            ]
        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
    in unlines $ fl : map ca rs ++ [fil]

foreignDeclFun opt@Options{sumEncoding = ObjectWithSingleField, .. } rs =
    let fl   = sp 1 ++ "parseJSON (Data.JSON.JObject obj) = case Data.Map.toList obj of"
        ca c = unlines
            [ sp 2 ++ "[Data.Tuple.Tuple \"" ++
                constructorTagModifier (nameBase $ conName c) ++ "\" input] ->"
            , foreignDeclSingleFun opt 3 c
            ]
        fil  = sp 2 ++ "_ -> Data.JSON.fail \"cannot parse.\""
        fbk  = sp 1 ++ "parseJSON _ = Data.JSON.fail \"cannot parse.\""
    in unlines $ fl : map ca rs ++ [fil, fbk]

--------------------------------------------------------------------------------

hasPureScriptD :: Options -> Name -> [TyVarBndr] -> [Con] -> DecQ
hasPureScriptD opts name vars cons = instanceD (return []) (conT ''HasPureScript `appT` conT name)
    [dataDeclD name vars cons, foreignDeclD opts name vars cons]

declaration :: Options -> Dec -> DecsQ
declaration opts (DataD _ name vars cons _) = do
    deps <- depsD name cons
    typ  <- pureScriptTypeInstanceD name
    has  <- hasPureScriptD opts name vars cons
    return [deps, typ, has]
declaration opts (NewtypeD cnxt name vars con der) = declaration opts (DataD cnxt name vars [con] der)
declaration _ a          = fail $ "cannot convert Dec: " ++ show a

-- | derive PureScriptType and HasPureScript instances with aeson Options.
derivePureScript' :: Options -> Name -> DecsQ
derivePureScript' opt name = reify name >>= \case
    TyConI d -> declaration opt d
    i        -> fail $ "cannot convert Info: " ++ show i

-- | derive PureScriptType, HasPureScript and ToJSON instances.
--
derivePureScript :: Name -> DecsQ
derivePureScript name = reify name >>= \case
    TyConI d -> do
        aeson <- deriveToJSON defaultOptions name
        psc   <- declaration defaultOptions d
        return $ aeson ++ psc
    i        -> fail $ "cannot convert Info: " ++ show i
