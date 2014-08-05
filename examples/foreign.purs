module Foreign where

import Data.JSON ()

data C
    = C1 {a :: A, name :: String}
    | C2 Number B

instance autoCFromJSON :: Data.JSON.FromJSON C where
    parseJSON array = case Data.JSON.parseJSON array of
        Data.Either.Right (Data.Tuple.Tuple "C1" input) ->
            case input of
                Data.JSON.Object object -> do
                    a <- Data.JSON.(.:) object "a"
                    name <- Data.JSON.(.:) object "name"
                    return (C1 {a: a, name: name})
                _ -> Data.JSON.fail "cannot parse."

        Data.Either.Right (Data.Tuple.Tuple "C2" input) ->
            case input of
                Data.JSON.Array [v0,v1] -> do
                    v0' <- Data.JSON.parseJSON v0
                    v1' <- Data.JSON.parseJSON v1
                    return (C2 v0' v1')
                _ -> Data.JSON.fail "cannot parse."

        _ -> Data.JSON.fail "cannot parse."
data D a
    = D a

instance autoDFromJSON :: (Data.JSON.FromJSON a) => Data.JSON.FromJSON (D a) where
    parseJSON input =
        case input of
            Data.JSON.Array [v0] -> do
                v0' <- Data.JSON.parseJSON v0
                return (D v0')
            _ -> Data.JSON.fail "cannot parse."

data A
    = A Number Number String

instance autoAFromJSON :: Data.JSON.FromJSON A where
    parseJSON input =
        case input of
            Data.JSON.Array [v0,v1,v2] -> do
                v0' <- Data.JSON.parseJSON v0
                v1' <- Data.JSON.parseJSON v1
                v2' <- Data.JSON.parseJSON v2
                return (A v0' v1' v2')
            _ -> Data.JSON.fail "cannot parse."

data B
    = B {number :: [Number], first :: String}

instance autoBFromJSON :: Data.JSON.FromJSON B where
    parseJSON input =
        case input of
            Data.JSON.Object object -> do
                number <- Data.JSON.(.:) object "number"
                first <- Data.JSON.(.:) object "first"
                return (B {number: number, first: first})
            _ -> Data.JSON.fail "cannot parse."

