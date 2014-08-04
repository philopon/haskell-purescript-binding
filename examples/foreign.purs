module Foreign.Haskell.Binding where
import Prelude ()
import Data.JSON ()
data B  = B { number :: Prim.Number }
data A  = A Prim.Number
data C  = C1 { name :: Prim.String, a :: Foreign.Haskell.Binding.A } | C2 Prim.Number Foreign.Haskell.Binding.B
foreign import instance autoCFromJSON :: Data.JSON.FromJSON Foreign.Haskell.Binding.C
foreign import instance autoAFromJSON :: Data.JSON.FromJSON Foreign.Haskell.Binding.A
foreign import instance autoBFromJSON :: Data.JSON.FromJSON Foreign.Haskell.Binding.B