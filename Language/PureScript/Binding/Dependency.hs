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

import Data.Monoid
import Data.Text.Lazy (Text)
import Data.Type.Bool
import Data.Proxy
import Language.PureScript.Binding.Class
import Data.Text.Lazy.Builder

data TList where
    (:-) :: a -> TList -> TList
    TNil :: TList
infixr 5 :-

type family Deps (a :: k) :: TList

class ConsDecl r (elem :: Bool) a where
    consDecl :: p elem -> q a -> r -> r

instance ConsDecl r True a where
    consDecl _ _ = id

instance HasPureScript a => ConsDecl Builder 'False a where
    consDecl _ p r = dataDecl p <> singleton '\n' <> foreignDecl p <> singleton '\n' <> r

instance HasPureScript a => ConsDecl [Builder] 'False a where
    consDecl _ p r = dataDecl p : foreignDecl p : r

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
    decls' :: Proxy b -> Proxy ds -> Proxy as -> r

instance (Monoid r, ConsDecl r elm d) => Decls' r elm (d :- ds) TNil where
    decls' _ _ _ = consDecl (Proxy :: Proxy elm) (Proxy :: Proxy d) mempty

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
type AllDecls r a as = Decls' r False (a :- TNil) (as ++ Deps a)

-- | convert to PureScript Declaration Strings.
--
-- @
-- decls (Proxy :: Proxy Type)
-- @
decls :: forall proxy a. Decls [Builder] a => proxy a -> [Builder]
decls _ = decls' (Proxy :: Proxy False) (Proxy :: Proxy (a :- TNil)) (Proxy :: Proxy (Deps a))

-- | convert to PureScript module String.
--
-- automatically include dependencies.
--
-- @
-- mkModule \"Module.Name\" (Proxy :: Proxy (TypeA :- TypeB :- TNil))
-- @
mkModule :: forall proxy a (as :: TList). AllDecls Builder a as
         => String -- ^ module name
         -> proxy (a :- as) -> Text
mkModule modName _ = toLazyText $
    fromString "module " <>
    fromString modName <>
    fromString " where\n\n" <>
    fromString "import Data.JSON ()\n\n" <>
    ds
  where
    ds = decls' (Proxy :: Proxy False) (Proxy :: Proxy (a :- TNil)) (Proxy :: Proxy (as ++ Deps a))
