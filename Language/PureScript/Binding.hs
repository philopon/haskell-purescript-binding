module Language.PureScript.Binding
    ( HasPureScript(..), PureScriptType(..)
    , TList(..), Proxy(..)
      -- * deriving
    , derivePureScript, deriveDefaultPureScript
      -- * modules
    , mkModule, decls
      -- * code generation
    , GenerateConfig(..)
    , generate, generateFile, generateFileDefault
    ) where

import Data.Proxy
import Language.PureScript.Binding.Class
import Language.PureScript.Binding.TH
import Language.PureScript.Binding.Dependency
import Language.PureScript.Binding.Generation
