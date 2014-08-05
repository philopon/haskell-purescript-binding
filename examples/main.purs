module Main where

import Foreign

instance showA :: Show A where
    show (A a b c) = "A " ++ show a ++ " " ++ show b ++ " " ++ show c

instance showB :: Show B where
    show (B {number = n, first = s}) =
        "B{ number: " ++ show n ++ ", first: " ++ show s ++ "}"

instance showC :: Show C where
    show (C1 {a = a, name = s}) =
        "C1{ a: " ++ show a ++ ", name: " ++ show s ++ "}"
    show (C2 i b) =
        "C2 " ++ show i ++ " " ++ show b

main =
    Debug.Trace.print
        [ Data.JSON.decode "{\"tag\": \"C1\", \"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}" :: Data.Maybe.Maybe C
        , Data.JSON.decode "{\"C1\": {\"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}}" :: Data.Maybe.Maybe C
        , Data.JSON.decode "[\"C1\", {\"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}]" :: Data.Maybe.Maybe C
        ]
