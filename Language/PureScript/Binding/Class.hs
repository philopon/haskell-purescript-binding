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

import Data.Int
import Data.Word
import qualified Data.Scientific as Sci
import qualified Data.Text as T
import qualified Data.Text.Lazy as TL

class PureScriptType (a :: k) where
    toPureScriptType     :: proxy a -> String

instance PureScriptType Maybe where
    toPureScriptType _ = "Maybe"

#define PscType(hs,psc) instance PureScriptType hs where toPureScriptType _ = psc

PscType(Int,     "Number")
PscType(Int8,    "Number")
PscType(Int16,   "Number")
PscType(Int32,   "Number")
PscType(Int64,   "Number")
PscType(Integer, "Number")

PscType(Word,   "Number")
PscType(Word8,  "Number")
PscType(Word16, "Number")
PscType(Word32, "Number")
PscType(Word64, "Number")

PscType(Double, "Number")
PscType(Float,  "Number")

PscType(Sci.Scientific, "Number")

PscType(Bool, "Boolean")

PscType(Char,    "String")
PscType([Char],  "String")
PscType(T.Text,  "String")
PscType(TL.Text, "String")

#undef PscType
