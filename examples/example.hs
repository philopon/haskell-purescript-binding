{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DataKinds #-}

import Data.Aeson.TH
import Language.PureScript.Binding

data A = A Int Double String
data B = B { number :: [Int], first :: String }
data C = C1 { a :: A, name :: String }
       | C2 Int B
data D a = D a

derivePureScript defaultOptions{sumEncoding = TwoElemArray} ''A
derivePureScript defaultOptions{sumEncoding = TwoElemArray} ''B
derivePureScript defaultOptions{sumEncoding = TwoElemArray} ''C
derivePureScript defaultOptions{sumEncoding = TwoElemArray} ''D

-- # 1. run this script.
-- $ runhaskell ./example.hs
--
-- # 2. install dependencies
-- $ bower install purescript-json
--
-- # 3. compile
-- $ psc --main=Main --output=output.js `ls bower_components/**/src/**/*.purs` foreign.purs main.purs
--
-- # 4. execute
-- $ node output.js
--
main :: IO ()
main = writeFile "foreign.purs" $ mkModule "Foreign" (Proxy :: Proxy (C :- D :- TNil))
