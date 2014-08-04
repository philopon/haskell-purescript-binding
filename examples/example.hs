{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DataKinds #-}

import Language.PureScript.Binding

data A = A Int
data B = B { number :: Int }
data C = C1 { a :: A, name :: String }
       | C2 Int B

deriveDefaultPureScript ''A
deriveDefaultPureScript ''B
deriveDefaultPureScript ''C

-- | do bower install purescript-json before execute.
-- generate foreign.purs and foreign.js.
main :: IO ()
main = generateFileDefault "foreign" (Proxy :: Proxy (C :- TNil))
