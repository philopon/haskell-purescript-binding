{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DataKinds #-}

import Language.PureScript.Binding
import qualified Data.Text.Lazy.IO as T

data A = A Int Double String
data B = B { number :: [Int], first :: String }
data C = C1 { a :: A, name :: String, admin :: Bool }
       | C2 Int B
data D a = D a
data E = E Int

derivePureScript ''A
derivePureScript ''B
derivePureScript ''C
derivePureScript ''D
derivePureScript ''E

main :: IO ()
main = T.writeFile "foreign.purs" $ mkModule "Foreign" (Proxy :: Proxy (C :- D :- TNil))
