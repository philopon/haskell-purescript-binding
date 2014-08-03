{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeFamilies #-}

import Data.Proxy
import Language.Haskell.TH
import Language.Haskell.TH.Quote
import Language.PureScript (Declaration)
import Language.PureScript.Binding.TH
import Language.PureScript.Binding.Class
import Language.PureScript.Binding.Dependency

data A a = A (Maybe a) String
data B   = B Double (A Double)
data C = C (A Int) B

derivePureScript ''A
derivePureScript ''B
derivePureScript ''C

testA = decls (Proxy :: Proxy A) :: [Declaration]
testB = decls (Proxy :: Proxy B) :: [Declaration]
testC = decls (Proxy :: Proxy C) :: [Declaration]
