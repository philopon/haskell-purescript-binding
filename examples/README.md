haskell-purescript-bindig example
===

contents
---

* [example.hs](./example.hs)

    define some example types and generate its purescript code.

* [main.purs](./main.purs)

    main module of purescript example.
    define Show instances and decode JSON to generated types.

* [outputs/\*](./outputs)

    output files of example.

How to run
---

1. run haskell code to generate [purescript](./outputs/foreign.purs) code.

    ```.sh
    $ runhaskell ./example.hs
    ```

2. install dependencies

    ```.sh
    $ bower install purescript-json
    ```

3. compile purescript to [javascript](./outputs/output.js) code.

    ```.sh
    $ psc --main=Main --output=output.js `ls bower_components/**/src/**/*.purs` foreign.purs main.purs
    ```

4. execute javascript code.

    ```.sh
    $ node output.js
    Just (C1{ a: A 12 34.2 "adf", name: "kevin", admin: true})
    ```
