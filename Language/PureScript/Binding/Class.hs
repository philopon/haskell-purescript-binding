{-# LANGUAGE CPP #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE PolyKinds #-}
{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE UndecidableInstances #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE ScopedTypeVariables #-}

module Language.PureScript.Binding.Class where

import qualified Language.PureScript as PS
import Data.Proxy
import Data.Int
import Data.Word
import qualified Data.Scientific as Sci
import qualified Data.Text as T
import qualified Data.Text.Lazy as TL

qual :: [String] -> a -> PS.Qualified a
qual [] a = PS.Qualified Nothing a
qual ms a = PS.Qualified (Just . PS.ModuleName $ map PS.ProperName ms) a

psTyCon :: [String] -> String -> PS.Type
psTyCon qs = PS.TypeConstructor . qual qs . PS.ProperName

prim :: String -> PS.Type
prim = psTyCon ["Prim"]

array, boolean, date, function, number, object, string :: PS.Type
array    = prim "Array"
boolean  = prim "Boolean"
date     = prim "Date"
function = prim "Function"
number   = prim "Number"
object   = prim "Object"
string   = prim "String"

--------------------------------------------------------------------------------

class PureScriptType (a :: k) where
    toPureScriptType     :: proxy a -> PS.Type
    pureScriptTypeString :: proxy a -> String

instance PureScriptType Maybe where
    toPureScriptType     _ = psTyCon ["Data", "Maybe"] "Maybe"
    pureScriptTypeString _ = "Maybe"

instance PureScriptType a => PureScriptType (Maybe a) where
    toPureScriptType     _ = psTyCon ["Data", "Maybe"] "Maybe" `PS.TypeApp` toPureScriptType (Proxy :: Proxy a)
    pureScriptTypeString _ = "Maybe " ++ (pureScriptTypeString (Proxy :: Proxy a))


#define PscType(hs,psc, str) instance PureScriptType hs where toPureScriptType _ = psc; pureScriptTypeString _ = str

PscType(Int,     number, "Number")
PscType(Int8,    number, "Number")
PscType(Int16,   number, "Number")
PscType(Int32,   number, "Number")
PscType(Int64,   number, "Number")
PscType(Integer, number, "Number")

PscType(Word,   number, "Number")
PscType(Word8,  number, "Number")
PscType(Word16, number, "Number")
PscType(Word32, number, "Number")
PscType(Word64, number, "Number")

PscType(Double, number, "Number")
PscType(Float,  number, "Number")

PscType(Sci.Scientific,  number, "Number")

PscType(Bool, boolean, "Boolean")

PscType(Char,    string, "String")
PscType([Char],  string, "String")
PscType(T.Text,  string, "String")
PscType(TL.Text, string, "String")

#undef PscType
