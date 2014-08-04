var PS = PS || {};
PS.Foreign_Haskell_Binding = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_JSON = PS.Data_JSON;
    var B = function (value0) {
        return {
            ctor: "Foreign.Haskell.Binding.B", 
            values: [ value0 ]
        };
    };
    var A = function (value0) {
        return {
            ctor: "Foreign.Haskell.Binding.A", 
            values: [ value0 ]
        };
    };
    var C1 = function (value0) {
        return {
            ctor: "Foreign.Haskell.Binding.C1", 
            values: [ value0 ]
        };
    };
    var C2 = function (value0) {
        return function (value1) {
            return {
                ctor: "Foreign.Haskell.Binding.C2", 
                values: [ value0, value1 ]
            };
        };
    };
    var autoBFromJSON = function (_) {
        return {
            parseJSON: function (input) {
                if (input.ctor === "Data.JSON.Object") {
                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.numberFromJSON({}))(input.values[0])("number"))(function (number) {
                        return Prelude["return"](Data_Either.monadEither({}))(B({
                            number: number
                        }));
                    });
                };
                return Data_JSON.fail("parse failed");
            }
        };
    };
    var autoAFromJSON = function (_) {
        return {
            parseJSON: function (input) {
                if (input.ctor === "Data.JSON.Array") {
                    if ((input.values[0]).length === 1) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.values[0][0]))(function (v0$prime) {
                            return Prelude["return"](Data_Either.monadEither({}))(A(v0$prime));
                        });
                    };
                };
                return Data_JSON.fail("parse failed");
            }
        };
    };
    var autoCFromJSON = function (_) {
        return {
            parseJSON: function (_291) {
                if (_291.ctor === "Data.JSON.Object") {
                    return (function (_330) {
                        if (_330.ctor === "Data.Either.Right") {
                            if (_330.values[0] === "C1") {
                                var input = Data_JSON.Object(_291.values[0]);
                                return (function (_331) {
                                    if (_331.ctor === "Data.JSON.Object") {
                                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](autoAFromJSON({}))(_331.values[0])("a"))(function (a) {
                                            return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_331.values[0])("name"))(function (name) {
                                                return Prelude["return"](Data_Either.monadEither({}))(C1({
                                                    a: a, 
                                                    name: name
                                                }));
                                            });
                                        });
                                    };
                                    return Data_JSON.fail("parse failed");
                                })(input);
                            };
                        };
                        if (_330.ctor === "Data.Either.Right") {
                            if (_330.values[0] === "C2") {
                                return (function (_334) {
                                    if (_334.ctor === "Data.Either.Right") {
                                        if ((_334.values[0]).ctor === "Data.JSON.Array") {
                                            if (((_334.values[0]).values[0]).length === 2) {
                                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))((_334.values[0]).values[0][0]))(function (v0$prime) {
                                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(autoBFromJSON({}))((_334.values[0]).values[0][1]))(function (v1$prime) {
                                                        return Prelude["return"](Data_Either.monadEither({}))(C2(v0$prime)(v1$prime));
                                                    });
                                                });
                                            };
                                        };
                                        return Data_JSON.fail("parse failed");
                                    };
                                    return Data_JSON.fail("parse failed");
                                })(Data_JSON[".:"](Data_JSON.valueFromJSON({}))(_291.values[0])("contents"));
                            };
                        };
                        return Data_JSON.fail("parse failed");
                    })(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_291.values[0])("tag"));
                };
                throw "Failed pattern match";
            }
        };
    };
    return {
        B: B, 
        A: A, 
        C1: C1, 
        C2: C2, 
        autoCFromJSON: autoCFromJSON, 
        autoAFromJSON: autoAFromJSON, 
        autoBFromJSON: autoBFromJSON
    };
})();