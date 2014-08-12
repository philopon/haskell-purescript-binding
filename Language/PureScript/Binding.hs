-- |
--
-- @
-- &#123;-&#35; LANGUAGE TemplateHaskell &#35;-&#125;
-- &#123;-&#35; LANGUAGE TypeFamilies &#35;-&#125;
-- &#123;-&#35; LANGUAGE TypeOperators &#35;-&#125;
-- &#123;-&#35; LANGUAGE DataKinds &#35;-&#125;
-- 
-- import Language.PureScript.Binding
-- import qualified Data.Text.Lazy.IO as T
-- 
-- data A = A Int Double String
-- data B = B { number :: [Int], first :: String }
-- data C = C1 { a :: A, name :: String, admin :: Bool }
--        | C2 Int B
-- data D a = D a
-- data E = E Int
-- 
-- derivePureScript ''A
-- derivePureScript ''B
-- derivePureScript ''C
-- derivePureScript ''D
-- derivePureScript ''E
-- 
-- main :: IO ()
-- main = T.writeFile \"foreign.purs\" $ mkModule \"Foreign\" (Proxy :: Proxy (C :- D :- TNil))
-- @
--
-- generated PureScript module depends on purescript-json (<https://github.com/philopon/purescript-json>).
--
-- @
-- bower install purescript-json
-- @
--

module Language.PureScript.Binding
    ( TList(..)
      -- * deriving
    , derivePureScript, derivePureScript'
      -- * modules
    , mkModule, decls
    -- * reexports
    , module Data.Proxy
    ) where

import Data.Proxy
import Language.PureScript.Binding.TH
import Language.PureScript.Binding.Dependency
