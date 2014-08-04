{-# LANGUAGE GADTs #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE PolyKinds #-}
{-# LANGUAGE KindSignatures #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Language.PureScript.Binding.Dependency where

import qualified Language.PureScript as PS
import Data.Type.Bool
import Data.Proxy

data TList where
    (:-) :: a -> TList -> TList
    TNil :: TList
infixr 5 :-

type family Deps (a :: k) :: TList

class ConsDecl r (elem :: Bool) a where
    consDecl :: p elem -> q a -> [r] -> [r]

instance ConsDecl r True a where
    consDecl _ _ = id

class HasPureScript a where
    dataDecl    :: proxy a -> PS.Declaration
    foreignDecl :: proxy a -> PS.Declaration
    declRefs    :: proxy a -> [PS.DeclarationRef]

instance HasPureScript a => ConsDecl PS.Declaration 'False a where
    consDecl _ p = (dataDecl p :) . (foreignDecl p :)

instance HasPureScript a => ConsDecl [PS.DeclarationRef] 'False a where
    consDecl _ p = (declRefs p:)

type family Elem (a :: k) (as :: TList) :: Bool where
  Elem a TNil       = False
  Elem a (a  :- as) = True
  Elem a (a' :- as) = Elem a as

type NotElem a b = Not (Elem a b)

type family (a :: TList) ++ (b :: TList) :: TList
type instance TNil      ++ ys = ys
type instance (x :- xs) ++ ys = x :- xs ++ ys

type family Yet (done :: TList) (as :: TList) :: TList
type instance Yet done TNil      = TNil
type instance Yet done (a :- as) = If (Elem a done) (Yet done as) (a :- Yet done as)

class Decls' r (b :: Bool) (ds :: TList) (as :: TList) where
    decls' :: Proxy b -> Proxy ds -> Proxy as -> [r]

instance ConsDecl r elm d => Decls' r elm (d :- ds) TNil where
    decls' _ _ _ = consDecl (Proxy :: Proxy elm) (Proxy :: Proxy d) []

type NextDecls r a as d ds =
    Decls' r (Elem a (d :- ds)) (a :- d :- ds) (Yet (d :- ds) (as ++ Deps a))

instance (ConsDecl r elm d, NextDecls r a as d ds) => Decls' r elm (d :- ds) (a :- as) where
    decls' _ _ _ =
        consDecl (Proxy :: Proxy elm) (Proxy :: Proxy d) $
        decls'
            (Proxy :: Proxy (Elem a (d :- ds)))
            (Proxy :: Proxy (a :- d :- ds))
            (Proxy :: Proxy (Yet (d :- ds) (as ++ Deps a)))

type Decls r a = Decls' r False (a :- TNil) (Deps a)
type AllDecls' r a as = Decls' r False (a :- TNil) (as ++ Deps a)
type AllDecls a as = (AllDecls' PS.Declaration a as, AllDecls' [PS.DeclarationRef] a as)

decls :: forall proxy a r. Decls r a => proxy a -> [r]
decls _ = decls' (Proxy :: Proxy False) (Proxy :: Proxy (a :- TNil)) (Proxy :: Proxy (Deps a))

mkModule :: forall proxy a (as :: TList). AllDecls a as => [String] -> proxy (a :- as) -> PS.Module
mkModule modName _ =
    PS.Module (PS.ModuleName $ map PS.ProperName modName)
    ( PS.ImportDeclaration (PS.ModuleName $ map PS.ProperName ["Data", "JSON"]) Nothing Nothing :
      decls' (Proxy :: Proxy False) (Proxy :: Proxy (a :- TNil)) (Proxy :: Proxy (as ++ Deps a))
    )
    (Just . concat $
        decls' (Proxy :: Proxy False) (Proxy :: Proxy (a :- TNil)) (Proxy :: Proxy (as ++ Deps a)))
