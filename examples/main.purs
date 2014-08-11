module Main where

import Foreign

instance showA :: Show A where
    show (A a b c) = "A " ++ show a ++ " " ++ show b ++ " " ++ show c

instance showB :: Show B where
    show (B {number = n, first = s}) =
        "B{ number: " ++ show n ++ ", first: " ++ show s ++ "}"

instance showC :: Show C where
    show (C1 {a = a, name = s, admin = d}) =
        "C1{ a: " ++ show a ++ ", name: " ++ show s ++ ", admin: " ++ show d ++ "}"
    show (C2 i b) =
        "C2 " ++ show i ++ " " ++ show b

main = Debug.Trace.print
    (Data.JSON.decode
        "{\"tag\": \"C1\", \"a\": [12,34.2, \"adf\"], \"name\": \"kevin\", \"admin\": true}"
        :: Data.Maybe.Maybe C)
