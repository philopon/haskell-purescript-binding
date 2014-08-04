{-# LANGUAGE CPP #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE Rank2Types #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE DataKinds #-}
{-# LANGUAGE ConstraintKinds #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE RecordWildCards #-}

module Language.PureScript.Binding.Generation where

import Control.Applicative
import Control.Monad

import Language.Haskell.TH
import Language.PureScript
import Language.PureScript.Binding.Dependency

import System.FilePath
import System.Directory
import qualified System.FilePath.Glob as G
import qualified System.IO.UTF8 as U

import qualified Paths_haskell_purescript_binding as Path

import Data.List
import Data.Default.Class

purescriptDatadir :: FilePath
purescriptDatadir = $( do
    d <- runIO Path.getDataDir
    stringE $ takeDirectory d </> "purescript-" ++ VERSION_purescript
    )

defaultPreludePath :: FilePath
defaultPreludePath = purescriptDatadir </> "prelude/prelude.purs"

defaultPatterns :: [G.Pattern]
defaultPatterns = map G.compile 
    [ "src/**/*.purs"
    , "bower_components/purescript-*/src/**/*.purs"
    , "bower_components/purescript-*/src/**/*.purs.hs"
    ]

data GenerateConfig = GenerateConfig
    { libraryPatterns   :: [G.Pattern]
    , libraryBaseDir    :: FilePath
    , preludePath       :: FilePath
    , moduleName        :: [String]
    , targetOnly        :: Bool
    , pureScriptOptions :: Options
    }

instance Default GenerateConfig where
    def = GenerateConfig defaultPatterns "." defaultPreludePath ["Foreign", "Haskell", "Binding"] True
        defaultOptions { optionsBrowserNamespace = Just "PS" }

readPscInput :: FilePath -> IO [Module]
readPscInput p = do
    txt <- U.readFile p
    case runIndentParser p parseModules txt of
        Left  e -> fail $ "Parse Error: " ++ show e
        Right r -> return r

generate :: forall proxy a as. AllDecls a as => GenerateConfig -> proxy (a :- as) -> IO (String, String)
generate GenerateConfig{moduleName = mn, ..} p = do
    let m  = mkModule mn p
    fs <- concat . fst <$> G.globDir libraryPatterns libraryBaseDir
    ms <- mapM readPscInput (preludePath : fs)
    let opts = if targetOnly
                   then pureScriptOptions { optionsModules        = [intercalate "." mn]
                                          , optionsCodeGenModules = [intercalate "." mn]
                                          }
                   else pureScriptOptions
    case compile opts (m:concat ms) of
        Left  e -> fail e
        Right (js, ex, _) -> return (ex, js)

generateFile :: forall proxy a as. AllDecls a as => GenerateConfig -> Bool -> FilePath -> proxy (a :- as) -> IO ()
generateFile c ow f p = do
    let jsf = f <.> "js"
        psf = f <.> "purs"

    unless ow $ do
        jse <- doesFileExist jsf
        when jse $ fail (jsf ++ " already exists.")

        pse <- doesFileExist psf
        when pse $ fail (psf ++ " already exists.")

    (ps, js) <- generate c p

    writeFile jsf js
    writeFile psf ps

generateFileDefault :: forall proxy a as. AllDecls a as => FilePath -> proxy (a :- as) -> IO ()
generateFileDefault = generateFile def True
