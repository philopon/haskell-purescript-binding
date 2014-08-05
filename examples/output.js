var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = function (value0) {
        return {
            ctor: "Prelude.Unit", 
            values: [ value0 ]
        };
    };
    var LT = {
        ctor: "Prelude.LT", 
        values: [  ]
    };
    var GT = {
        ctor: "Prelude.GT", 
        values: [  ]
    };
    var EQ = {
        ctor: "Prelude.EQ", 
        values: [  ]
    };
    function cons(e) {  return function (l) {    return [e].concat(l);  };};
    function showStringImpl(s) {  return JSON.stringify(s);};
    function showNumberImpl(n) {  return n.toString();};
    function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
    function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
    function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
    function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
    function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
    function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
    function numNegate(n) {  return -n;};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function eqArrayImpl(f) {  return function(xs) {    return function(ys) {      if (xs.length !== ys.length) return false;      for (var i = 0; i < xs.length; i++) {        if (!f(xs[i])(ys[i])) return false;      }      return true;    };  };};
    function unsafeCompare(n1) {  return function(n2) {    return n1 < n2 ? LT : n1 > n2 ? GT : EQ;  };};
    function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
    function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
    function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
    function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
    function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
    function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
    function numComplement(n) {  return ~n;};
    function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
    function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
    function boolNot(b) {  return !b;};
    function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
    var $bar$bar = function (dict) {
        return dict["||"];
    };
    var $bar = function (dict) {
        return dict["|"];
    };
    var $up = function (dict) {
        return dict["^"];
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    var $less$greater = function (dict) {
        return dict["<>"];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $greater$greater$greater = function (__dict_Semigroupoid_0) {
        return function (f) {
            return function (g) {
                return $less$less$less(__dict_Semigroupoid_0)(g)(f);
            };
        };
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $colon = cons;
    var $div$eq = function (dict) {
        return dict["/="];
    };
    var $div = function (dict) {
        return dict["/"];
    };
    var $minus = function (dict) {
        return dict["-"];
    };
    var $plus$plus = function (__dict_Semigroup_1) {
        return $less$greater(__dict_Semigroup_1);
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $amp$amp = function (dict) {
        return dict["&&"];
    };
    var $amp = function (dict) {
        return dict["&"];
    };
    var $percent = function (dict) {
        return dict["%"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var $hash = function (x) {
        return function (f) {
            return f(x);
        };
    };
    var zshr = function (dict) {
        return dict.zshr;
    };
    var unit = Unit({});
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return {
            show: function (_38) {
                return "Unit {}";
            }
        };
    };
    var showString = function (_) {
        return {
            show: showStringImpl
        };
    };
    var showOrdering = function (_) {
        return {
            show: function (_46) {
                if (_46.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_46.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_46.ctor === "Prelude.EQ") {
                    return "EQ";
                };
                throw "Failed pattern match";
            }
        };
    };
    var showNumber = function (_) {
        return {
            show: showNumberImpl
        };
    };
    var showBoolean = function (_) {
        return {
            show: function (_39) {
                if (_39) {
                    return "true";
                };
                if (!_39) {
                    return "false";
                };
                throw "Failed pattern match";
            }
        };
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return {
            show: showArrayImpl(show(__dict_Show_2))
        };
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return {
            "<<<": function (f) {
                return function (g) {
                    return function (x) {
                        return f(g(x));
                    };
                };
            }
        };
    };
    var semigroupUnit = function (_) {
        return {
            "<>": function (_53) {
                return function (_54) {
                    return Unit({});
                };
            }
        };
    };
    var semigroupString = function (_) {
        return {
            "<>": concatString
        };
    };
    var semigroupArr = function (__dict_Semigroup_3) {
        return {
            "<>": function (f) {
                return function (g) {
                    return function (x) {
                        return $less$greater(__dict_Semigroup_3)(f(x))(g(x));
                    };
                };
            }
        };
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclasses"]["Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return {
            "+": numAdd, 
            "-": numSub, 
            "*": numMul, 
            "/": numDiv, 
            "%": numMod, 
            negate: numNegate
        };
    };
    var not = function (dict) {
        return dict.not;
    };
    var negate = function (dict) {
        return dict.negate;
    };
    var liftM1 = function (__dict_Monad_5) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_5["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_0) {
                    return $$return(__dict_Monad_5)(f(_0));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclasses"]["Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var functorArr = function (_) {
        return {
            "<$>": $less$less$less(semigroupoidArr({}))
        };
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return {
            "==": function (_40) {
                return function (_41) {
                    return true;
                };
            }, 
            "/=": function (_42) {
                return function (_43) {
                    return false;
                };
            }
        };
    };
    var ordUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqUnit({});
                }
            }, 
            compare: function (_47) {
                return function (_48) {
                    return EQ;
                };
            }
        };
    };
    var eqString = function (_) {
        return {
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqString({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqNumber = function (_) {
        return {
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordNumber = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqNumber({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqBoolean = function (_) {
        return {
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordBoolean = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqBoolean({});
                }
            }, 
            compare: function (_49) {
                return function (_50) {
                    if (!_49) {
                        if (!_50) {
                            return EQ;
                        };
                    };
                    if (!_49) {
                        if (_50) {
                            return LT;
                        };
                    };
                    if (_49) {
                        if (_50) {
                            return EQ;
                        };
                    };
                    if (_49) {
                        if (!_50) {
                            return GT;
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var empty = function (dict) {
        return dict.empty;
    };
    var $$const = function (_34) {
        return function (_35) {
            return _34;
        };
    };
    var $$void = function (__dict_Functor_8) {
        return function (fa) {
            return $less$dollar$greater(__dict_Functor_8)($$const(unit))(fa);
        };
    };
    var complement = function (dict) {
        return dict.complement;
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                return (function (_361) {
                    if (_361.ctor === "Prelude.LT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_10)(a1)(a2));
            };
        };
    };
    var $less$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                return (function (_362) {
                    if (_362.ctor === "Prelude.GT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_11)(a1)(a2));
            };
        };
    };
    var $greater = function (__dict_Ord_12) {
        return function (a1) {
            return function (a2) {
                return (function (_363) {
                    if (_363.ctor === "Prelude.GT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_12)(a1)(a2));
            };
        };
    };
    var $greater$eq = function (__dict_Ord_13) {
        return function (a1) {
            return function (a2) {
                return (function (_364) {
                    if (_364.ctor === "Prelude.LT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_13)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroupoid_0": function (_) {
                    return semigroupoidArr({});
                }
            }, 
            id: function (x) {
                return x;
            }
        };
    };
    var boolLikeBoolean = function (_) {
        return {
            "&&": boolAnd, 
            "||": boolOr, 
            not: boolNot
        };
    };
    var eqArray = function (__dict_Eq_7) {
        return {
            "==": function (xs) {
                return function (ys) {
                    return eqArrayImpl($eq$eq(__dict_Eq_7))(xs)(ys);
                };
            }, 
            "/=": function (xs) {
                return function (ys) {
                    return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_7))(xs)(ys));
                };
            }
        };
    };
    var ordArray = function (__dict_Ord_9) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqArray(__dict_Ord_9["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_51) {
                return function (_52) {
                    if (_51.length === 0) {
                        if (_52.length === 0) {
                            return EQ;
                        };
                    };
                    if (_51.length === 0) {
                        return LT;
                    };
                    if (_52.length === 0) {
                        return GT;
                    };
                    if (_51.length > 0) {
                        var _371 = _51.slice(1);
                        if (_52.length > 0) {
                            var _369 = _52.slice(1);
                            return (function (_367) {
                                if (_367.ctor === "Prelude.EQ") {
                                    return compare(ordArray(__dict_Ord_9))(_371)(_369);
                                };
                                return _367;
                            })(compare(__dict_Ord_9)(_51[0])(_52[0]));
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqOrdering = function (_) {
        return {
            "==": function (_44) {
                return function (_45) {
                    if (_44.ctor === "Prelude.LT") {
                        if (_45.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_44.ctor === "Prelude.GT") {
                        if (_45.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_44.ctor === "Prelude.EQ") {
                        if (_45.ctor === "Prelude.EQ") {
                            return true;
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (x) {
                return function (y) {
                    return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
                };
            }
        };
    };
    var bitsNumber = function (_) {
        return {
            "&": numAnd, 
            "|": numOr, 
            "^": numXor, 
            shl: numShl, 
            shr: numShr, 
            zshr: numZshr, 
            complement: numComplement
        };
    };
    var asTypeOf = function (_36) {
        return function (_37) {
            return _36;
        };
    };
    var applyArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArr({});
                }
            }, 
            "<*>": function (f) {
                return function (g) {
                    return function (x) {
                        return f(x)(g(x));
                    };
                };
            }
        };
    };
    var bindArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            ">>=": function (m) {
                return function (f) {
                    return function (x) {
                        return f(m(x))(x);
                    };
                };
            }
        };
    };
    var applicativeArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArr({});
                }
            }, 
            pure: $$const
        };
    };
    var monadArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArr({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArr({});
                }
            }
        };
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                        return $$return(__dict_Monad_14)(_2(_1));
                    });
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        unit: unit, 
        "++": $plus$plus, 
        "<>": $less$greater, 
        not: not, 
        "||": $bar$bar, 
        "&&": $amp$amp, 
        complement: complement, 
        zshr: zshr, 
        shr: shr, 
        shl: shl, 
        "^": $up, 
        "|": $bar, 
        "&": $amp, 
        ">=": $greater$eq, 
        "<=": $less$eq, 
        ">": $greater, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        "/=": $div$eq, 
        "==": $eq$eq, 
        negate: negate, 
        "%": $percent, 
        "/": $div, 
        "*": $times, 
        "-": $minus, 
        "+": $plus, 
        ap: ap, 
        liftM1: liftM1, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        "<|>": $less$bar$greater, 
        empty: empty, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "void": $$void, 
        "<$>": $less$dollar$greater, 
        show: show, 
        cons: cons, 
        ":": $colon, 
        "#": $hash, 
        "$": $dollar, 
        id: id, 
        ">>>": $greater$greater$greater, 
        "<<<": $less$less$less, 
        asTypeOf: asTypeOf, 
        "const": $$const, 
        flip: flip, 
        semigroupoidArr: semigroupoidArr, 
        categoryArr: categoryArr, 
        showUnit: showUnit, 
        showString: showString, 
        showBoolean: showBoolean, 
        showNumber: showNumber, 
        showArray: showArray, 
        functorArr: functorArr, 
        applyArr: applyArr, 
        applicativeArr: applicativeArr, 
        bindArr: bindArr, 
        monadArr: monadArr, 
        numNumber: numNumber, 
        eqUnit: eqUnit, 
        eqString: eqString, 
        eqNumber: eqNumber, 
        eqBoolean: eqBoolean, 
        eqArray: eqArray, 
        eqOrdering: eqOrdering, 
        showOrdering: showOrdering, 
        ordUnit: ordUnit, 
        ordBoolean: ordBoolean, 
        ordNumber: ordNumber, 
        ordString: ordString, 
        ordArray: ordArray, 
        bitsNumber: bitsNumber, 
        boolLikeBoolean: boolLikeBoolean, 
        semigroupUnit: semigroupUnit, 
        semigroupString: semigroupString, 
        semigroupArr: semigroupArr
    };
})();
var PS = PS || {};
PS.Prelude_Unsafe = (function () {
    "use strict";
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Math = (function () {
    "use strict";
    var abs = Math.abs;;
    var acos = Math.acos;;
    var asin = Math.asin;;
    var atan = Math.atan;;
    function atan2(y){  return function (x) {    return Math.atan2(y, x);  };};
    var ceil = Math.ceil;;
    var cos = Math.cos;;
    var exp = Math.exp;;
    var floor = Math.floor;;
    var log = Math.log;;
    function max(n1){  return function(n2) {    return Math.max(n1, n2);  }};
    function min(n1){  return function(n2) {    return Math.min(n1, n2);  }};
    function pow(n){  return function(p) {    return Math.pow(n, p);  }};
    var round = Math.round;;
    var sin = Math.sin;;
    var sqrt = Math.sqrt;;
    var tan = Math.tan;;
    var e       = Math.E;;
    var ln2     = Math.LN2;;
    var ln10    = Math.LN10;;
    var log2e   = Math.LOG2E;;
    var log10e  = Math.LOG10E;;
    var pi      = Math.PI;;
    var sqrt1_2 = Math.SQRT1_2;;
    var sqrt2   = Math.SQRT2;;
    return {
        sqrt2: sqrt2, 
        "sqrt1_2": sqrt1_2, 
        pi: pi, 
        log10e: log10e, 
        log2e: log2e, 
        ln10: ln10, 
        ln2: ln2, 
        e: e, 
        tan: tan, 
        sqrt: sqrt, 
        sin: sin, 
        round: round, 
        pow: pow, 
        min: min, 
        max: max, 
        log: log, 
        floor: floor, 
        exp: exp, 
        cos: cos, 
        ceil: ceil, 
        atan2: atan2, 
        atan: atan, 
        asin: asin, 
        acos: acos, 
        abs: abs
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Nothing = {
        ctor: "Data.Maybe.Nothing", 
        values: [  ]
    };
    var Just = function (value0) {
        return {
            ctor: "Data.Maybe.Just", 
            values: [ value0 ]
        };
    };
    var showMaybe = function (__dict_Show_15) {
        return {
            show: function (_66) {
                if (_66.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_15)(_66.values[0]) + ")";
                };
                if (_66.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_55) {
        return function (_56) {
            return function (_57) {
                if (_57.ctor === "Data.Maybe.Nothing") {
                    return _55;
                };
                if (_57.ctor === "Data.Maybe.Just") {
                    return _56(_57.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return {
            "<$>": function (_58) {
                return function (_59) {
                    if (_59.ctor === "Data.Maybe.Just") {
                        return Just(_58(_59.values[0]));
                    };
                    return Nothing;
                };
            }
        };
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_17) {
        return {
            "==": function (_67) {
                return function (_68) {
                    if (_67.ctor === "Data.Maybe.Nothing") {
                        if (_68.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_67.ctor === "Data.Maybe.Just") {
                        if (_68.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_17)(_67.values[0])(_68.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqMaybe(__dict_Eq_17))(a)(b);
                };
            }
        };
    };
    var ordMaybe = function (__dict_Ord_16) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqMaybe(__dict_Ord_16["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_69) {
                return function (_70) {
                    if (_69.ctor === "Data.Maybe.Just") {
                        if (_70.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_16)(_69.values[0])(_70.values[0]);
                        };
                    };
                    if (_69.ctor === "Data.Maybe.Nothing") {
                        if (_70.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_69.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_70.ctor === "Data.Maybe.Nothing") {
                        return Prelude.GT;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applyMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorMaybe({});
                }
            }, 
            "<*>": function (_60) {
                return function (_61) {
                    if (_60.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_60.values[0])(_61);
                    };
                    if (_60.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            ">>=": function (_64) {
                return function (_65) {
                    if (_64.ctor === "Data.Maybe.Just") {
                        return _65(_64.values[0]);
                    };
                    if (_64.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applicativeMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            pure: Just
        };
    };
    var monadMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeMaybe({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindMaybe({});
                }
            }
        };
    };
    var alternativeMaybe = function (_) {
        return {
            empty: Nothing, 
            "<|>": function (_62) {
                return function (_63) {
                    if (_62.ctor === "Data.Maybe.Nothing") {
                        return _63;
                    };
                    return _62;
                };
            }
        };
    };
    return {
        Nothing: Nothing, 
        Just: Just, 
        isNothing: isNothing, 
        isJust: isJust, 
        fromMaybe: fromMaybe, 
        maybe: maybe, 
        functorMaybe: functorMaybe, 
        applyMaybe: applyMaybe, 
        applicativeMaybe: applicativeMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var fromJust = function (_71) {
        if (_71.ctor === "Data.Maybe.Just") {
            return _71.values[0];
        };
        throw "Failed pattern match";
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Function = (function () {
    "use strict";
    function mkFn0(f) {  return function() {    return f({});  };};
    function mkFn1(f) {  return function(a) {    return f(a);  };};
    function mkFn2(f) {  return function(a, b) {    return f(a)(b);  };};
    function mkFn3(f) {  return function(a, b, c) {    return f(a)(b)(c);  };};
    function mkFn4(f) {  return function(a, b, c, d) {    return f(a)(b)(c)(d);  };};
    function mkFn5(f) {  return function(a, b, c, d, e) {    return f(a)(b)(c)(d)(e);  };};
    function runFn0(f) {  return f();};
    function runFn1(f) {  return function(a) {    return f(a);  };};
    function runFn2(f) {  return function(a) {    return function(b) {      return f(a, b);    };  };};
    function runFn3(f) {  return function(a) {    return function(b) {      return function(c) {        return f(a, b, c);      };    };  };};
    function runFn4(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return f(a, b, c, d);        };      };    };  };};
    function runFn5(f) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return f(a, b, c, d, e);          };        };      };    };  };};
    var on = function (f) {
        return function (g) {
            return function (x) {
                return function (y) {
                    return f(g(x))(g(y));
                };
            };
        };
    };
    return {
        runFn5: runFn5, 
        runFn4: runFn4, 
        runFn3: runFn3, 
        runFn2: runFn2, 
        runFn1: runFn1, 
        runFn0: runFn0, 
        mkFn5: mkFn5, 
        mkFn4: mkFn4, 
        mkFn3: mkFn3, 
        mkFn2: mkFn2, 
        mkFn1: mkFn1, 
        mkFn0: mkFn0, 
        on: on
    };
})();
var PS = PS || {};
PS.Data_Eq = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Ref = function (value0) {
        return {
            ctor: "Data.Eq.Ref", 
            values: [ value0 ]
        };
    };
    var liftRef = function (_72) {
        return function (_73) {
            return function (_74) {
                return _72(_73.values[0])(_74.values[0]);
            };
        };
    };
    var functorRef = function (_) {
        return {
            "<$>": function (_75) {
                return function (_76) {
                    return Ref(_75(_76.values[0]));
                };
            }
        };
    };
    var eqRef = function (_) {
        return {
            "==": liftRef(Prelude.refEq), 
            "/=": liftRef(Prelude.refIneq)
        };
    };
    return {
        Ref: Ref, 
        liftRef: liftRef, 
        eqRef: eqRef, 
        functorRef: functorRef
    };
})();
var PS = PS || {};
PS.Data_Either = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Left = function (value0) {
        return {
            ctor: "Data.Either.Left", 
            values: [ value0 ]
        };
    };
    var Right = function (value0) {
        return {
            ctor: "Data.Either.Right", 
            values: [ value0 ]
        };
    };
    var showEither = function (__dict_Show_18) {
        return function (__dict_Show_19) {
            return {
                show: function (_84) {
                    if (_84.ctor === "Data.Either.Left") {
                        return "Left (" + Prelude.show(__dict_Show_18)(_84.values[0]) + ")";
                    };
                    if (_84.ctor === "Data.Either.Right") {
                        return "Right (" + Prelude.show(__dict_Show_19)(_84.values[0]) + ")";
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var functorEither = function (_) {
        return {
            "<$>": function (_80) {
                return function (_81) {
                    if (_81.ctor === "Data.Either.Left") {
                        return Left(_81.values[0]);
                    };
                    if (_81.ctor === "Data.Either.Right") {
                        return Right(_80(_81.values[0]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqEither = function (__dict_Eq_22) {
        return function (__dict_Eq_23) {
            return {
                "==": function (_85) {
                    return function (_86) {
                        if (_85.ctor === "Data.Either.Left") {
                            if (_86.ctor === "Data.Either.Left") {
                                return Prelude["=="](__dict_Eq_22)(_85.values[0])(_86.values[0]);
                            };
                        };
                        if (_85.ctor === "Data.Either.Right") {
                            if (_86.ctor === "Data.Either.Right") {
                                return Prelude["=="](__dict_Eq_23)(_85.values[0])(_86.values[0]);
                            };
                        };
                        return false;
                    };
                }, 
                "/=": function (a) {
                    return function (b) {
                        return !Prelude["=="](eqEither(__dict_Eq_22)(__dict_Eq_23))(a)(b);
                    };
                }
            };
        };
    };
    var ordEither = function (__dict_Ord_20) {
        return function (__dict_Ord_21) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqEither(__dict_Ord_20["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_21["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_87) {
                    return function (_88) {
                        if (_87.ctor === "Data.Either.Left") {
                            if (_88.ctor === "Data.Either.Left") {
                                return Prelude.compare(__dict_Ord_20)(_87.values[0])(_88.values[0]);
                            };
                        };
                        if (_87.ctor === "Data.Either.Right") {
                            if (_88.ctor === "Data.Either.Right") {
                                return Prelude.compare(__dict_Ord_21)(_87.values[0])(_88.values[0]);
                            };
                        };
                        if (_87.ctor === "Data.Either.Left") {
                            return Prelude.LT;
                        };
                        if (_88.ctor === "Data.Either.Left") {
                            return Prelude.GT;
                        };
                        throw "Failed pattern match";
                    };
                }
            };
        };
    };
    var either = function (_77) {
        return function (_78) {
            return function (_79) {
                if (_79.ctor === "Data.Either.Left") {
                    return _77(_79.values[0]);
                };
                if (_79.ctor === "Data.Either.Right") {
                    return _78(_79.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEither({});
                }
            }, 
            "<*>": function (_82) {
                return function (_83) {
                    if (_82.ctor === "Data.Either.Left") {
                        return Left(_82.values[0]);
                    };
                    if (_82.ctor === "Data.Either.Right") {
                        return Prelude["<$>"](functorEither({}))(_82.values[0])(_83);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            ">>=": either(function (e) {
                return function (_) {
                    return Left(e);
                };
            })(function (a) {
                return function (f) {
                    return f(a);
                };
            })
        };
    };
    var applicativeEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEither({});
                }
            }, 
            pure: Right
        };
    };
    var monadEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEither({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEither({});
                }
            }
        };
    };
    return {
        Left: Left, 
        Right: Right, 
        isRight: isRight, 
        isLeft: isLeft, 
        either: either, 
        functorEither: functorEither, 
        applyEither: applyEither, 
        applicativeEither: applicativeEither, 
        bindEither: bindEither, 
        monadEither: monadEither, 
        showEither: showEither, 
        eqEither: eqEither, 
        ordEither: ordEither
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    function snoc(l) {  return function (e) {    var l1 = l.slice();    l1.push(e);     return l1;  };};
    function length (xs) {  return xs.length;};
    function findIndex (f) {  return function (arr) {    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function findLastIndex (f) {  return function (arr) {    for (var i = arr.length - 1; i >= 0; i--) {      if (f(arr[i])) {        return i;      }    }    return -1;  };};
    function append (l1) {  return function (l2) {    return l1.concat(l2);  };};
    function concat (xss) {  var result = [];  for (var i = 0, l = xss.length; i < l; i++) {    result.push.apply(result, xss[i]);  }  return result;};
    function reverse (l) {  return l.slice().reverse();};
    function drop (n) {  return function (l) {    return l.slice(n);  };};
    function slice (s) {  return function (e) {    return function (l) {      return l.slice(s, e);    };  };};
    function insertAt (index) {  return function (a) {    return function (l) {      var l1 = l.slice();      l1.splice(index, 0, a);      return l1;    };   };};
    function deleteAt (index) {  return function (n) {    return function (l) {      var l1 = l.slice();      l1.splice(index, n);      return l1;    };   };};
    function updateAt (index) {  return function (a) {    return function (l) {      var i = ~~index;      if (i < 0 || i >= l.length) return l;      var l1 = l.slice();      l1[i] = a;      return l1;    };   };};
    function concatMap (f) {  return function (arr) {    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      Array.prototype.push.apply(result, f(arr[i]));    }    return result;  };};
    function map (f) {  return function (arr) {    var l = arr.length;    var result = new Array(l);    for (var i = 0; i < l; i++) {      result[i] = f(arr[i]);    }    return result;  };};
    function filter (f) {  return function (arr) {    var n = 0;    var result = [];    for (var i = 0, l = arr.length; i < l; i++) {      if (f(arr[i])) {        result[n++] = arr[i];      }    }    return result;  };};
    function range (start) {  return function (end) {    var i = ~~start, e = ~~end;    var step = i > e ? -1 : 1;    var result = [i], n = 1;    while (i !== e) {      i += step;      result[n++] = i;    }    return result;  };};
    function zipWith (f) {  return function (xs) {    return function (ys) {      var l = xs.length < ys.length ? xs.length : ys.length;      var result = new Array(l);      for (var i = 0; i < l; i++) {        result[i] = f(xs[i])(ys[i]);      }      return result;    };  };};
    function sortJS (f) {  return function (l) {    return l.slice().sort(function (x, y) {      return f(x)(y);    });  };};
    var $bang$bang = function (xs) {
        return function (n) {
            var isInt = function (n) {
                return n !== ~~n;
            };
            return n < 0 || n >= length(xs) || isInt(n) ? Data_Maybe.Nothing : Data_Maybe.Just(xs[n]);
        };
    };
    var take = function (n) {
        return slice(0)(n);
    };
    var tail = function (_91) {
        if (_91.length > 0) {
            var _445 = _91.slice(1);
            return Data_Maybe.Just(_445);
        };
        return Data_Maybe.Nothing;
    };
    var span = (function () {
        var go = function (__copy__107) {
            return function (__copy__108) {
                return function (__copy__109) {
                    var _107 = __copy__107;
                    var _108 = __copy__108;
                    var _109 = __copy__109;
                    tco: while (true) {
                        var acc = _107;
                        if (_109.length > 0) {
                            var _450 = _109.slice(1);
                            if (_108(_109[0])) {
                                var __tco__107 = Prelude[":"](_109[0])(acc);
                                var __tco__108 = _108;
                                _107 = __tco__107;
                                _108 = __tco__108;
                                _109 = _450;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_107), 
                            rest: _109
                        };
                    };
                };
            };
        };
        return go([  ]);
    })();
    var sortBy = function (comp) {
        return function (xs) {
            var comp$prime = function (x) {
                return function (y) {
                    return (function (_451) {
                        if (_451.ctor === "Prelude.GT") {
                            return 1;
                        };
                        if (_451.ctor === "Prelude.EQ") {
                            return 0;
                        };
                        if (_451.ctor === "Prelude.LT") {
                            return -1;
                        };
                        throw "Failed pattern match";
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_24) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_24))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (_) {
        return {
            "<>": append
        };
    };
    var $$null = function (_93) {
        if (_93.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_100) {
        return function (_101) {
            if (_101.length === 0) {
                return [  ];
            };
            if (_101.length > 0) {
                var _456 = _101.slice(1);
                return Prelude[":"](_101[0])(nubBy(_100)(filter(function (y) {
                    return !_100(_101[0])(y);
                })(_456)));
            };
            throw "Failed pattern match";
        };
    };
    var nub = function (__dict_Eq_25) {
        return nubBy(Prelude["=="](__dict_Eq_25));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__90) {
        var _90 = __copy__90;
        tco: while (true) {
            if (_90.length > 0) {
                var _459 = _90.slice(1);
                if (_459.length === 0) {
                    return Data_Maybe.Just(_90[0]);
                };
            };
            if (_90.length > 0) {
                var _461 = _90.slice(1);
                _90 = _461;
                continue tco;
            };
            return Data_Maybe.Nothing;
        };
    };
    var intersectBy = function (_97) {
        return function (_98) {
            return function (_99) {
                if (_98.length === 0) {
                    return [  ];
                };
                if (_99.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_97(x))(_99) >= 0;
                };
                return filter(el)(_98);
            };
        };
    };
    var intersect = function (__dict_Eq_26) {
        return intersectBy(Prelude["=="](__dict_Eq_26));
    };
    var init = function (_92) {
        if (_92.length === 0) {
            return Data_Maybe.Nothing;
        };
        return Data_Maybe.Just(slice(0)(length(_92) - 1)(_92));
    };
    var head = function (_89) {
        if (_89.length > 0) {
            var _468 = _89.slice(1);
            return Data_Maybe.Just(_89[0]);
        };
        return Data_Maybe.Nothing;
    };
    var groupBy = (function () {
        var go = function (__copy__104) {
            return function (__copy__105) {
                return function (__copy__106) {
                    var _104 = __copy__104;
                    var _105 = __copy__105;
                    var _106 = __copy__106;
                    tco: while (true) {
                        var acc = _104;
                        if (_106.length === 0) {
                            return reverse(acc);
                        };
                        if (_106.length > 0) {
                            var _473 = _106.slice(1);
                            var sp = span(_105(_106[0]))(_473);
                            var __tco__104 = Prelude[":"](Prelude[":"](_106[0])(sp.init))(_104);
                            var __tco__105 = _105;
                            _104 = __tco__104;
                            _105 = __tco__105;
                            _106 = sp.rest;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_27) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_27))(xs);
        };
    };
    var group$prime = function (__dict_Ord_28) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_28["__superclasses"]["Prelude.Eq_0"]({})))(sort(__dict_Ord_28));
    };
    var functorArray = function (_) {
        return {
            "<$>": map
        };
    };
    var elemLastIndex = function (__dict_Eq_29) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_29)(x));
        };
    };
    var elemIndex = function (__dict_Eq_30) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_30)(x));
        };
    };
    var deleteBy = function (_94) {
        return function (_95) {
            return function (_96) {
                if (_96.length === 0) {
                    return [  ];
                };
                return (function (_477) {
                    if (_477 < 0) {
                        return _96;
                    };
                    return deleteAt(_477)(1)(_96);
                })(findIndex(_94(_95))(_96));
            };
        };
    };
    var $$delete = function (__dict_Eq_31) {
        return deleteBy(Prelude["=="](__dict_Eq_31));
    };
    var $bslash$bslash = function (__dict_Eq_32) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__102) {
                    return function (__copy__103) {
                        var _102 = __copy__102;
                        var _103 = __copy__103;
                        tco: while (true) {
                            var xs = _102;
                            if (_103.length === 0) {
                                return xs;
                            };
                            if (_102.length === 0) {
                                return [  ];
                            };
                            if (_103.length > 0) {
                                var _481 = _103.slice(1);
                                var __tco__102 = $$delete(__dict_Eq_32)(_103[0])(_102);
                                _102 = __tco__102;
                                _103 = _481;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
                return go(xs)(ys);
            };
        };
    };
    var catMaybes = concatMap(Data_Maybe.maybe([  ])(singleton));
    var applicativeArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            pure: singleton
        };
    };
    var applyArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorArray({});
                }
            }, 
            "<*>": Prelude.ap(monadArray({}))
        };
    };
    var monadArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeArray({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindArray({});
                }
            }
        };
    };
    var bindArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyArray({});
                }
            }, 
            ">>=": Prelude.flip(concatMap)
        };
    };
    var alternativeArray = function (_) {
        return {
            empty: [  ], 
            "<|>": append
        };
    };
    return {
        span: span, 
        groupBy: groupBy, 
        "group'": group$prime, 
        group: group, 
        sortBy: sortBy, 
        sort: sort, 
        nubBy: nubBy, 
        nub: nub, 
        zipWith: zipWith, 
        range: range, 
        filter: filter, 
        concatMap: concatMap, 
        intersect: intersect, 
        intersectBy: intersectBy, 
        "\\\\": $bslash$bslash, 
        "delete": $$delete, 
        deleteBy: deleteBy, 
        updateAt: updateAt, 
        deleteAt: deleteAt, 
        insertAt: insertAt, 
        take: take, 
        drop: drop, 
        reverse: reverse, 
        concat: concat, 
        append: append, 
        elemLastIndex: elemLastIndex, 
        elemIndex: elemIndex, 
        findLastIndex: findLastIndex, 
        findIndex: findIndex, 
        length: length, 
        catMaybes: catMaybes, 
        mapMaybe: mapMaybe, 
        map: map, 
        "null": $$null, 
        init: init, 
        tail: tail, 
        last: last, 
        head: head, 
        singleton: singleton, 
        snoc: snoc, 
        "!!": $bang$bang, 
        functorArray: functorArray, 
        applyArray: applyArray, 
        applicativeArray: applicativeArray, 
        bindArray: bindArray, 
        monadArray: monadArray, 
        semigroupArray: semigroupArray, 
        alternativeArray: alternativeArray
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_111) {
        if (_111.length > 0) {
            var _484 = _111.slice(1);
            return _484;
        };
        throw "Failed pattern match";
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_110) {
        if (_110.length > 0) {
            var _487 = _110.slice(1);
            return _110[0];
        };
        throw "Failed pattern match";
    };
    return {
        init: init, 
        last: last, 
        tail: tail, 
        head: head
    };
})();
var PS = PS || {};
PS.Data_Monoid = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var monoidUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupUnit({});
                }
            }, 
            mempty: Prelude.unit
        };
    };
    var monoidString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Prelude.semigroupString({});
                }
            }, 
            mempty: ""
        };
    };
    var monoidArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return Data_Array.semigroupArray({});
                }
            }, 
            mempty: [  ]
        };
    };
    var mempty = function (dict) {
        return dict.mempty;
    };
    return {
        mempty: mempty, 
        monoidString: monoidString, 
        monoidArray: monoidArray, 
        monoidUnit: monoidUnit
    };
})();
var PS = PS || {};
PS.Data_Monoid_All = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var All = function (value0) {
        return {
            ctor: "Data.Monoid.All.All", 
            values: [ value0 ]
        };
    };
    var showAll = function (_) {
        return {
            show: function (_117) {
                return "All (" + Prelude.show(Prelude.showBoolean({}))(_117.values[0]) + ")";
            }
        };
    };
    var semigroupAll = function (_) {
        return {
            "<>": function (_118) {
                return function (_119) {
                    return All(_118.values[0] && _119.values[0]);
                };
            }
        };
    };
    var runAll = function (_112) {
        return _112.values[0];
    };
    var monoidAll = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAll({});
                }
            }, 
            mempty: All(true)
        };
    };
    var eqAll = function (_) {
        return {
            "==": function (_113) {
                return function (_114) {
                    return _113.values[0] === _114.values[0];
                };
            }, 
            "/=": function (_115) {
                return function (_116) {
                    return _115.values[0] !== _116.values[0];
                };
            }
        };
    };
    return {
        All: All, 
        runAll: runAll, 
        eqAll: eqAll, 
        showAll: showAll, 
        semigroupAll: semigroupAll, 
        monoidAll: monoidAll
    };
})();
var PS = PS || {};
PS.Data_Monoid_Any = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Any = function (value0) {
        return {
            ctor: "Data.Monoid.Any.Any", 
            values: [ value0 ]
        };
    };
    var showAny = function (_) {
        return {
            show: function (_125) {
                return "Any (" + Prelude.show(Prelude.showBoolean({}))(_125.values[0]) + ")";
            }
        };
    };
    var semigroupAny = function (_) {
        return {
            "<>": function (_126) {
                return function (_127) {
                    return Any(_126.values[0] || _127.values[0]);
                };
            }
        };
    };
    var runAny = function (_120) {
        return _120.values[0];
    };
    var monoidAny = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupAny({});
                }
            }, 
            mempty: Any(false)
        };
    };
    var eqAny = function (_) {
        return {
            "==": function (_121) {
                return function (_122) {
                    return _121.values[0] === _122.values[0];
                };
            }, 
            "/=": function (_123) {
                return function (_124) {
                    return _123.values[0] !== _124.values[0];
                };
            }
        };
    };
    return {
        Any: Any, 
        runAny: runAny, 
        eqAny: eqAny, 
        showAny: showAny, 
        semigroupAny: semigroupAny, 
        monoidAny: monoidAny
    };
})();
var PS = PS || {};
PS.Data_Monoid_Dual = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Dual = function (value0) {
        return {
            ctor: "Data.Monoid.Dual.Dual", 
            values: [ value0 ]
        };
    };
    var showDual = function (__dict_Show_33) {
        return {
            show: function (_135) {
                return "Dual (" + Prelude.show(__dict_Show_33)(_135.values[0]) + ")";
            }
        };
    };
    var semigroupDual = function (__dict_Semigroup_34) {
        return {
            "<>": function (_136) {
                return function (_137) {
                    return Dual(Prelude["<>"](__dict_Semigroup_34)(_137.values[0])(_136.values[0]));
                };
            }
        };
    };
    var runDual = function (_128) {
        return _128.values[0];
    };
    var monoidDual = function (__dict_Monoid_36) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupDual(__dict_Monoid_36["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            mempty: Dual(Data_Monoid.mempty(__dict_Monoid_36))
        };
    };
    var eqDual = function (__dict_Eq_37) {
        return {
            "==": function (_129) {
                return function (_130) {
                    return Prelude["=="](__dict_Eq_37)(_129.values[0])(_130.values[0]);
                };
            }, 
            "/=": function (_131) {
                return function (_132) {
                    return Prelude["/="](__dict_Eq_37)(_131.values[0])(_132.values[0]);
                };
            }
        };
    };
    var ordDual = function (__dict_Ord_35) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqDual(__dict_Ord_35["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_133) {
                return function (_134) {
                    return Prelude.compare(__dict_Ord_35)(_133.values[0])(_134.values[0]);
                };
            }
        };
    };
    return {
        Dual: Dual, 
        runDual: runDual, 
        eqDual: eqDual, 
        ordDual: ordDual, 
        showDual: showDual, 
        semigroupDual: semigroupDual, 
        monoidDual: monoidDual
    };
})();
var PS = PS || {};
PS.Data_Monoid_Endo = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Endo = function (value0) {
        return {
            ctor: "Data.Monoid.Endo.Endo", 
            values: [ value0 ]
        };
    };
    var semigroupEndo = function (_) {
        return {
            "<>": function (_139) {
                return function (_140) {
                    return Endo(Prelude["<<<"](Prelude.semigroupoidArr({}))(_139.values[0])(_140.values[0]));
                };
            }
        };
    };
    var runEndo = function (_138) {
        return _138.values[0];
    };
    var monoidEndo = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupEndo({});
                }
            }, 
            mempty: Endo(Prelude.id(Prelude.categoryArr({})))
        };
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var First = function (value0) {
        return {
            ctor: "Data.Monoid.First.First", 
            values: [ value0 ]
        };
    };
    var showFirst = function (__dict_Show_38) {
        return {
            show: function (_148) {
                return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_38))(_148.values[0]) + ")";
            }
        };
    };
    var semigroupFirst = function (_) {
        return {
            "<>": function (_149) {
                return function (_150) {
                    if ((_149.values[0]).ctor === "Data.Maybe.Just") {
                        return _149;
                    };
                    return _150;
                };
            }
        };
    };
    var runFirst = function (_141) {
        return _141.values[0];
    };
    var monoidFirst = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupFirst({});
                }
            }, 
            mempty: First(Data_Maybe.Nothing)
        };
    };
    var eqFirst = function (__dict_Eq_40) {
        return {
            "==": function (_142) {
                return function (_143) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_40))(_142.values[0])(_143.values[0]);
                };
            }, 
            "/=": function (_144) {
                return function (_145) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_40))(_144.values[0])(_145.values[0]);
                };
            }
        };
    };
    var ordFirst = function (__dict_Ord_39) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqFirst(__dict_Ord_39["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_146) {
                return function (_147) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_39))(_146.values[0])(_147.values[0]);
                };
            }
        };
    };
    return {
        First: First, 
        runFirst: runFirst, 
        eqFirst: eqFirst, 
        ordFirst: ordFirst, 
        showFirst: showFirst, 
        semigroupFirst: semigroupFirst, 
        monoidFirst: monoidFirst
    };
})();
var PS = PS || {};
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Last = function (value0) {
        return {
            ctor: "Data.Monoid.Last.Last", 
            values: [ value0 ]
        };
    };
    var showLast = function (__dict_Show_41) {
        return {
            show: function (_158) {
                return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_41))(_158.values[0]) + ")";
            }
        };
    };
    var semigroupLast = function (_) {
        return {
            "<>": function (_159) {
                return function (_160) {
                    if ((_160.values[0]).ctor === "Data.Maybe.Just") {
                        return _160;
                    };
                    if ((_160.values[0]).ctor === "Data.Maybe.Nothing") {
                        return _159;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var runLast = function (_151) {
        return _151.values[0];
    };
    var monoidLast = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupLast({});
                }
            }, 
            mempty: Last(Data_Maybe.Nothing)
        };
    };
    var eqLast = function (__dict_Eq_43) {
        return {
            "==": function (_152) {
                return function (_153) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_43))(_152.values[0])(_153.values[0]);
                };
            }, 
            "/=": function (_154) {
                return function (_155) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_43))(_154.values[0])(_155.values[0]);
                };
            }
        };
    };
    var ordLast = function (__dict_Ord_42) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqLast(__dict_Ord_42["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_156) {
                return function (_157) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_42))(_156.values[0])(_157.values[0]);
                };
            }
        };
    };
    return {
        Last: Last, 
        runLast: runLast, 
        eqLast: eqLast, 
        ordLast: ordLast, 
        showLast: showLast, 
        semigroupLast: semigroupLast, 
        monoidLast: monoidLast
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Product = function (value0) {
        return {
            ctor: "Data.Monoid.Product.Product", 
            values: [ value0 ]
        };
    };
    var showProduct = function (_) {
        return {
            show: function (_168) {
                return "Product (" + Prelude.show(Prelude.showNumber({}))(_168.values[0]) + ")";
            }
        };
    };
    var semigroupProduct = function (_) {
        return {
            "<>": function (_169) {
                return function (_170) {
                    return Product(_169.values[0] * _170.values[0]);
                };
            }
        };
    };
    var runProduct = function (_161) {
        return _161.values[0];
    };
    var monoidProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupProduct({});
                }
            }, 
            mempty: Product(1)
        };
    };
    var eqProduct = function (_) {
        return {
            "==": function (_162) {
                return function (_163) {
                    return _162.values[0] === _163.values[0];
                };
            }, 
            "/=": function (_164) {
                return function (_165) {
                    return _164.values[0] !== _165.values[0];
                };
            }
        };
    };
    var ordProduct = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqProduct({});
                }
            }, 
            compare: function (_166) {
                return function (_167) {
                    return Prelude.compare(Prelude.ordNumber({}))(_166.values[0])(_167.values[0]);
                };
            }
        };
    };
    return {
        Product: Product, 
        runProduct: runProduct, 
        eqProduct: eqProduct, 
        ordProduct: ordProduct, 
        showProduct: showProduct, 
        semigroupProduct: semigroupProduct, 
        monoidProduct: monoidProduct
    };
})();
var PS = PS || {};
PS.Data_Monoid_Sum = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Sum = function (value0) {
        return {
            ctor: "Data.Monoid.Sum.Sum", 
            values: [ value0 ]
        };
    };
    var showSum = function (_) {
        return {
            show: function (_178) {
                return "Sum (" + Prelude.show(Prelude.showNumber({}))(_178.values[0]) + ")";
            }
        };
    };
    var semigroupSum = function (_) {
        return {
            "<>": function (_179) {
                return function (_180) {
                    return Sum(_179.values[0] + _180.values[0]);
                };
            }
        };
    };
    var runSum = function (_171) {
        return _171.values[0];
    };
    var monoidSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroup_0": function (_) {
                    return semigroupSum({});
                }
            }, 
            mempty: Sum(0)
        };
    };
    var eqSum = function (_) {
        return {
            "==": function (_172) {
                return function (_173) {
                    return _172.values[0] === _173.values[0];
                };
            }, 
            "/=": function (_174) {
                return function (_175) {
                    return _174.values[0] !== _175.values[0];
                };
            }
        };
    };
    var ordSum = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqSum({});
                }
            }, 
            compare: function (_176) {
                return function (_177) {
                    return Prelude.compare(Prelude.ordNumber({}))(_176.values[0])(_177.values[0]);
                };
            }
        };
    };
    return {
        Sum: Sum, 
        runSum: runSum, 
        eqSum: eqSum, 
        ordSum: ordSum, 
        showSum: showSum, 
        semigroupSum: semigroupSum, 
        monoidSum: monoidSum
    };
})();
var PS = PS || {};
PS.Data_Tuple = (function () {
    "use strict";
    var Data_Array = PS.Data_Array;
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Tuple = function (value0) {
        return function (value1) {
            return {
                ctor: "Data.Tuple.Tuple", 
                values: [ value0, value1 ]
            };
        };
    };
    var zip = Data_Array.zipWith(Tuple);
    var unzip = function (_185) {
        if (_185.length > 0) {
            var _632 = _185.slice(1);
            return (function (_628) {
                return Tuple(Prelude[":"]((_185[0]).values[0])(_628.values[0]))(Prelude[":"]((_185[0]).values[1])(_628.values[1]));
            })(unzip(_632));
        };
        if (_185.length === 0) {
            return Tuple([  ])([  ]);
        };
        throw "Failed pattern match";
    };
    var uncurry = function (_183) {
        return function (_184) {
            return _183(_184.values[0])(_184.values[1]);
        };
    };
    var swap = function (_186) {
        return Tuple(_186.values[1])(_186.values[0]);
    };
    var snd = function (_182) {
        return _182.values[1];
    };
    var showTuple = function (__dict_Show_44) {
        return function (__dict_Show_45) {
            return {
                show: function (_187) {
                    return "Tuple (" + Prelude.show(__dict_Show_44)(_187.values[0]) + ") (" + Prelude.show(__dict_Show_45)(_187.values[1]) + ")";
                }
            };
        };
    };
    var functorTuple = function (_) {
        return {
            "<$>": function (_192) {
                return function (_193) {
                    return Tuple(_193.values[0])(_192(_193.values[1]));
                };
            }
        };
    };
    var fst = function (_181) {
        return _181.values[0];
    };
    var eqTuple = function (__dict_Eq_49) {
        return function (__dict_Eq_50) {
            return {
                "==": function (_188) {
                    return function (_189) {
                        return Prelude["=="](__dict_Eq_49)(_188.values[0])(_189.values[0]) && Prelude["=="](__dict_Eq_50)(_188.values[1])(_189.values[1]);
                    };
                }, 
                "/=": function (t1) {
                    return function (t2) {
                        return !Prelude["=="](eqTuple(__dict_Eq_49)(__dict_Eq_50))(t1)(t2);
                    };
                }
            };
        };
    };
    var ordTuple = function (__dict_Ord_46) {
        return function (__dict_Ord_47) {
            return {
                "__superclasses": {
                    "Prelude.Eq_0": function (_) {
                        return eqTuple(__dict_Ord_46["__superclasses"]["Prelude.Eq_0"]({}))(__dict_Ord_47["__superclasses"]["Prelude.Eq_0"]({}));
                    }
                }, 
                compare: function (_190) {
                    return function (_191) {
                        return (function (_663) {
                            if (_663.ctor === "Prelude.EQ") {
                                return Prelude.compare(__dict_Ord_47)(_190.values[1])(_191.values[1]);
                            };
                            return _663;
                        })(Prelude.compare(__dict_Ord_46)(_190.values[0])(_191.values[0]));
                    };
                }
            };
        };
    };
    var curry = function (f) {
        return function (a) {
            return function (b) {
                return f(Tuple(a)(b));
            };
        };
    };
    var applyTuple = function (__dict_Semigroup_52) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorTuple({});
                }
            }, 
            "<*>": function (_194) {
                return function (_195) {
                    return Tuple(Prelude["<>"](__dict_Semigroup_52)(_194.values[0])(_195.values[0]))(_194.values[1](_195.values[1]));
                };
            }
        };
    };
    var bindTuple = function (__dict_Semigroup_51) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Semigroup_51);
                }
            }, 
            ">>=": function (_196) {
                return function (_197) {
                    return (function (_676) {
                        return Tuple(Prelude["<>"](__dict_Semigroup_51)(_196.values[0])(_676.values[0]))(_676.values[1]);
                    })(_197(_196.values[1]));
                };
            }
        };
    };
    var applicativeTuple = function (__dict_Monoid_53) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyTuple(__dict_Monoid_53["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }, 
            pure: Tuple(Data_Monoid.mempty(__dict_Monoid_53))
        };
    };
    var monadTuple = function (__dict_Monoid_48) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeTuple(__dict_Monoid_48);
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindTuple(__dict_Monoid_48["__superclasses"]["Prelude.Semigroup_0"]({}));
                }
            }
        };
    };
    return {
        Tuple: Tuple, 
        swap: swap, 
        unzip: unzip, 
        zip: zip, 
        uncurry: uncurry, 
        curry: curry, 
        snd: snd, 
        fst: fst, 
        showTuple: showTuple, 
        eqTuple: eqTuple, 
        ordTuple: ordTuple, 
        functorTuple: functorTuple, 
        applyTuple: applyTuple, 
        applicativeTuple: applicativeTuple, 
        bindTuple: bindTuple, 
        monadTuple: monadTuple
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    function runPure(f) {  return f();};
    function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
    function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
    function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
    function foreachE(as) {  return function(f) {    return function() {      for (var i = 0; i < as.length; i++) {        f(as[i])();      }    };  };};
    var applicativeEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            pure: returnE
        };
    };
    var applyEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEff({});
                }
            }, 
            "<*>": Prelude.ap(monadEff({}))
        };
    };
    var functorEff = function (_) {
        return {
            "<$>": Prelude.liftA1(applicativeEff({}))
        };
    };
    var monadEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEff({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEff({});
                }
            }
        };
    };
    var bindEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            ">>=": bindE
        };
    };
    return {
        foreachE: foreachE, 
        forE: forE, 
        whileE: whileE, 
        untilE: untilE, 
        runPure: runPure, 
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Unsafe = (function () {
    "use strict";
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    function newSTRef(val) {  return function () {    return { value: val };  };};
    function readSTRef(ref) {  return function() {    return ref.value;  };};
    function modifySTRef(ref) {  return function(f) {    return function() {      return ref.value = f(ref.value);    };  };};
    function writeSTRef(ref) {  return function(a) {    return function() {      return ref.value = a;    };  };};
    function newSTArray(len) {  return function(a) {    return function() {      var arr = [];      for (var i = 0; i < len; i++) {        arr[i] = a;      };      return arr;    };  };};
    function peekSTArray(arr) {  return function(i) {    return function() {      return arr[i];    };  };};
    function pokeSTArray(arr) {  return function(i) {    return function(a) {      return function() {        return arr[i] = a;      };    };  };};
    function runST(f) {  return f;};
    function runSTArray(f) {  return f;};
    return {
        runSTArray: runSTArray, 
        runST: runST, 
        pokeSTArray: pokeSTArray, 
        peekSTArray: peekSTArray, 
        newSTArray: newSTArray, 
        writeSTRef: writeSTRef, 
        modifySTRef: modifySTRef, 
        readSTRef: readSTRef, 
        newSTRef: newSTRef
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_54) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_54)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.Control_Monad = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var when = function (__dict_Monad_55) {
        return function (_203) {
            return function (_204) {
                if (_203) {
                    return _204;
                };
                if (!_203) {
                    return Prelude["return"](__dict_Monad_55)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var unless = function (__dict_Monad_56) {
        return function (_205) {
            return function (_206) {
                if (!_205) {
                    return _206;
                };
                if (_205) {
                    return Prelude["return"](__dict_Monad_56)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var replicateM = function (__dict_Monad_57) {
        return function (_198) {
            return function (_199) {
                if (_198 === 0) {
                    return Prelude["return"](__dict_Monad_57)([  ]);
                };
                return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(_199)(function (_4) {
                    return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(replicateM(__dict_Monad_57)(_198 - 1)(_199))(function (_3) {
                        return Prelude["return"](__dict_Monad_57)(Prelude[":"](_4)(_3));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_58) {
        return function (_200) {
            return function (_201) {
                return function (_202) {
                    if (_202.length === 0) {
                        return Prelude["return"](__dict_Monad_58)(_201);
                    };
                    if (_202.length > 0) {
                        var _693 = _202.slice(1);
                        return Prelude[">>="](__dict_Monad_58["__superclasses"]["Prelude.Bind_1"]({}))(_200(_201)(_202[0]))(function (a$prime) {
                            return foldM(__dict_Monad_58)(_200)(a$prime)(_693);
                        });
                    };
                    throw "Failed pattern match";
                };
            };
        };
    };
    return {
        unless: unless, 
        when: when, 
        foldM: foldM, 
        replicateM: replicateM
    };
})();
var PS = PS || {};
PS.Control_Bind = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $greater$eq$greater = function (__dict_Bind_59) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_59)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_60) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_60)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_61) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_61)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_62) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_62)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_63) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_63)(cond)(function (cond$prime) {
                        return cond$prime ? t : f;
                    });
                };
            };
        };
    };
    return {
        ifM: ifM, 
        join: join, 
        "<=<": $less$eq$less, 
        ">=>": $greater$eq$greater, 
        "=<<": $eq$less$less
    };
})();
var PS = PS || {};
PS.Control_Apply = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $less$times = function (__dict_Apply_64) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_64)(Prelude["<$>"](__dict_Apply_64["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_65) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_65)(Prelude["<$>"](__dict_Apply_65["__superclasses"]["Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_66) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<*>"](__dict_Apply_66)(Prelude["<$>"](__dict_Apply_66["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_67) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_67)(Prelude["<*>"](__dict_Apply_67)(Prelude["<*>"](__dict_Apply_67)(Prelude["<$>"](__dict_Apply_67["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_68) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_68)(Prelude["<*>"](__dict_Apply_68)(Prelude["<$>"](__dict_Apply_68["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_69) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_69)(Prelude["<$>"](__dict_Apply_69["__superclasses"]["Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_70) {
        return function (a) {
            return $times$greater(__dict_Apply_70)(a)(forever(__dict_Apply_70)(a));
        };
    };
    return {
        forever: forever, 
        lift5: lift5, 
        lift4: lift4, 
        lift3: lift3, 
        lift2: lift2, 
        "*>": $times$greater, 
        "<*": $less$times
    };
})();
var PS = PS || {};
PS.Data_Foldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Monoid_First = PS.Data_Monoid_First;
    var Data_Maybe = PS.Data_Maybe;
    function foldrArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = xs.length - 1; i >= 0; --i) {        acc = f(xs[i])(acc);      }      return acc;    }  }};
    function foldlArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = 0, len = xs.length; i < len; ++i) {        acc = f(acc)(xs[i]);      }      return acc;    }  }};
    var foldr = function (dict) {
        return dict.foldr;
    };
    var traverse_ = function (__dict_Applicative_71) {
        return function (__dict_Foldable_72) {
            return function (f) {
                return foldr(__dict_Foldable_72)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_71["__superclasses"]["Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_71)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_73) {
        return function (__dict_Foldable_74) {
            return Prelude.flip(traverse_(__dict_Applicative_73)(__dict_Foldable_74));
        };
    };
    var sequence_ = function (__dict_Applicative_75) {
        return function (__dict_Foldable_76) {
            return traverse_(__dict_Applicative_75)(__dict_Foldable_76)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_77) {
        return function (__dict_Monoid_78) {
            return foldl(__dict_Foldable_77)(Prelude["<>"](__dict_Monoid_78["__superclasses"]["Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_78));
        };
    };
    var or = function (__dict_Foldable_79) {
        return foldl(__dict_Foldable_79)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_80) {
        return foldl(__dict_Foldable_80)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_81) {
        return foldl(__dict_Foldable_81)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (_) {
        return {
            foldr: function (_232) {
                return function (_233) {
                    return function (_234) {
                        return _232(_234.values[1])(_233);
                    };
                };
            }, 
            foldl: function (_235) {
                return function (_236) {
                    return function (_237) {
                        return _235(_236)(_237.values[1]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_82) {
                return function (_238) {
                    return function (_239) {
                        return _238(_239.values[1]);
                    };
                };
            }
        };
    };
    var foldableRef = function (_) {
        return {
            foldr: function (_224) {
                return function (_225) {
                    return function (_226) {
                        return _224(_226.values[0])(_225);
                    };
                };
            }, 
            foldl: function (_227) {
                return function (_228) {
                    return function (_229) {
                        return _227(_228)(_229.values[0]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_83) {
                return function (_230) {
                    return function (_231) {
                        return _230(_231.values[0]);
                    };
                };
            }
        };
    };
    var foldableMaybe = function (_) {
        return {
            foldr: function (_216) {
                return function (_217) {
                    return function (_218) {
                        if (_218.ctor === "Data.Maybe.Nothing") {
                            return _217;
                        };
                        if (_218.ctor === "Data.Maybe.Just") {
                            return _216(_218.values[0])(_217);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_219) {
                return function (_220) {
                    return function (_221) {
                        if (_221.ctor === "Data.Maybe.Nothing") {
                            return _220;
                        };
                        if (_221.ctor === "Data.Maybe.Just") {
                            return _219(_220)(_221.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_84) {
                return function (_222) {
                    return function (_223) {
                        if (_223.ctor === "Data.Maybe.Nothing") {
                            return Data_Monoid.mempty(__dict_Monoid_84);
                        };
                        if (_223.ctor === "Data.Maybe.Just") {
                            return _222(_223.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableEither = function (_) {
        return {
            foldr: function (_208) {
                return function (_209) {
                    return function (_210) {
                        if (_210.ctor === "Data.Either.Left") {
                            return _209;
                        };
                        if (_210.ctor === "Data.Either.Right") {
                            return _208(_210.values[0])(_209);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_211) {
                return function (_212) {
                    return function (_213) {
                        if (_213.ctor === "Data.Either.Left") {
                            return _212;
                        };
                        if (_213.ctor === "Data.Either.Right") {
                            return _211(_212)(_213.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_85) {
                return function (_214) {
                    return function (_215) {
                        if (_215.ctor === "Data.Either.Left") {
                            return Data_Monoid.mempty(__dict_Monoid_85);
                        };
                        if (_215.ctor === "Data.Either.Right") {
                            return _214(_215.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableArray = function (_) {
        return {
            foldr: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldrArray(f)(z)(xs);
                    };
                };
            }, 
            foldl: function (f) {
                return function (z) {
                    return function (xs) {
                        return foldlArray(f)(z)(xs);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_86) {
                return function (f) {
                    return function (xs) {
                        return foldr(foldableArray({}))(function (x) {
                            return function (acc) {
                                return Prelude["<>"](__dict_Monoid_86["__superclasses"]["Prelude.Semigroup_0"]({}))(f(x))(acc);
                            };
                        })(Data_Monoid.mempty(__dict_Monoid_86))(xs);
                    };
                };
            }
        };
    };
    var foldMap = function (dict) {
        return dict.foldMap;
    };
    var lookup = function (__dict_Eq_87) {
        return function (__dict_Foldable_88) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_88)(Data_Monoid_First.monoidFirst({}))(function (_207) {
                        return Data_Monoid_First.First(Prelude["=="](__dict_Eq_87)(a)(_207.values[0]) ? Data_Maybe.Just(_207.values[1]) : Data_Maybe.Nothing);
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_89) {
        return function (__dict_Monoid_90) {
            return foldMap(__dict_Foldable_89)(__dict_Monoid_90)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_91) {
        return function (p) {
            return function (f) {
                return (function (_747) {
                    if (_747.length > 0) {
                        var _749 = _747.slice(1);
                        return Data_Maybe.Just(_747[0]);
                    };
                    if (_747.length === 0) {
                        return Data_Maybe.Nothing;
                    };
                    throw "Failed pattern match";
                })(foldMap(__dict_Foldable_91)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f));
            };
        };
    };
    var any = function (__dict_Foldable_92) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_92)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_93) {
        return function (__dict_Foldable_94) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_94))(Prelude["=="](__dict_Eq_93));
        };
    };
    var notElem = function (__dict_Eq_95) {
        return function (__dict_Foldable_96) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_95)(__dict_Foldable_96)(x));
            };
        };
    };
    var and = function (__dict_Foldable_97) {
        return foldl(__dict_Foldable_97)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_98) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_98)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    return {
        foldlArray: foldlArray, 
        foldrArray: foldrArray, 
        lookup: lookup, 
        find: find, 
        notElem: notElem, 
        elem: elem, 
        product: product, 
        sum: sum, 
        all: all, 
        any: any, 
        or: or, 
        and: and, 
        mconcat: mconcat, 
        "sequence_": sequence_, 
        "for_": for_, 
        "traverse_": traverse_, 
        fold: fold, 
        foldMap: foldMap, 
        foldl: foldl, 
        foldr: foldr, 
        foldableArray: foldableArray, 
        foldableEither: foldableEither, 
        foldableMaybe: foldableMaybe, 
        foldableRef: foldableRef, 
        foldableTuple: foldableTuple
    };
})();
var PS = PS || {};
PS.Data_Map = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Foldable = PS.Data_Foldable;
    var Leaf = {
        ctor: "Data.Map.Leaf", 
        values: [  ]
    };
    var Two = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return {
                        ctor: "Data.Map.Two", 
                        values: [ value0, value1, value2, value3 ]
                    };
                };
            };
        };
    };
    var Three = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return function (value6) {
                                return {
                                    ctor: "Data.Map.Three", 
                                    values: [ value0, value1, value2, value3, value4, value5, value6 ]
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    var TwoLeft = function (value0) {
        return function (value1) {
            return function (value2) {
                return {
                    ctor: "Data.Map.TwoLeft", 
                    values: [ value0, value1, value2 ]
                };
            };
        };
    };
    var TwoRight = function (value0) {
        return function (value1) {
            return function (value2) {
                return {
                    ctor: "Data.Map.TwoRight", 
                    values: [ value0, value1, value2 ]
                };
            };
        };
    };
    var ThreeLeft = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return {
                                ctor: "Data.Map.ThreeLeft", 
                                values: [ value0, value1, value2, value3, value4, value5 ]
                            };
                        };
                    };
                };
            };
        };
    };
    var ThreeMiddle = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return {
                                ctor: "Data.Map.ThreeMiddle", 
                                values: [ value0, value1, value2, value3, value4, value5 ]
                            };
                        };
                    };
                };
            };
        };
    };
    var ThreeRight = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return {
                                ctor: "Data.Map.ThreeRight", 
                                values: [ value0, value1, value2, value3, value4, value5 ]
                            };
                        };
                    };
                };
            };
        };
    };
    var KickUp = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return {
                        ctor: "Data.Map.KickUp", 
                        values: [ value0, value1, value2, value3 ]
                    };
                };
            };
        };
    };
    var values = function (_250) {
        if (_250.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_250.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_250.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[2] ])(values(_250.values[3])));
        };
        if (_250.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_250.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[2] ])(Prelude["++"](Data_Array.semigroupArray({}))(values(_250.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[5] ])(values(_250.values[6])))));
        };
        throw "Failed pattern match";
    };
    var toList = function (_248) {
        if (_248.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_248.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_248.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_248.values[1])(_248.values[2]) ])(toList(_248.values[3])));
        };
        if (_248.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_248.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_248.values[1])(_248.values[2]) ])(Prelude["++"](Data_Array.semigroupArray({}))(toList(_248.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_248.values[4])(_248.values[5]) ])(toList(_248.values[6])))));
        };
        throw "Failed pattern match";
    };
    var singleton = function (k) {
        return function (v) {
            return Two(Leaf)(k)(v)(Leaf);
        };
    };
    var showTree = function (__dict_Show_99) {
        return function (__dict_Show_100) {
            return function (_242) {
                if (_242.ctor === "Data.Map.Leaf") {
                    return "Leaf";
                };
                if (_242.ctor === "Data.Map.Two") {
                    return "Two (" + showTree(__dict_Show_99)(__dict_Show_100)(_242.values[0]) + ") (" + Prelude.show(__dict_Show_99)(_242.values[1]) + ") (" + Prelude.show(__dict_Show_100)(_242.values[2]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_242.values[3]) + ")";
                };
                if (_242.ctor === "Data.Map.Three") {
                    return "Three (" + showTree(__dict_Show_99)(__dict_Show_100)(_242.values[0]) + ") (" + Prelude.show(__dict_Show_99)(_242.values[1]) + ") (" + Prelude.show(__dict_Show_100)(_242.values[2]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_242.values[3]) + ") (" + Prelude.show(__dict_Show_99)(_242.values[4]) + ") (" + Prelude.show(__dict_Show_100)(_242.values[5]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_242.values[6]) + ")";
                };
                throw "Failed pattern match";
            };
        };
    };
    var showMap = function (__dict_Show_101) {
        return function (__dict_Show_102) {
            return {
                show: function (m) {
                    return "fromList " + Prelude.show(Prelude.showArray(Data_Tuple.showTuple(__dict_Show_101)(__dict_Show_102)))(toList(m));
                }
            };
        };
    };
    var lookup = function (__copy___dict_Ord_103) {
        return function (__copy__244) {
            return function (__copy__245) {
                var __dict_Ord_103 = __copy___dict_Ord_103;
                var _244 = __copy__244;
                var _245 = __copy__245;
                tco: while (true) {
                    var _ = _244;
                    if (_245.ctor === "Data.Map.Leaf") {
                        return Data_Maybe.Nothing;
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Two") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_245.values[1])) {
                            return Data_Maybe.Just(_245.values[2]);
                        };
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Two") {
                        if (Prelude["<"](__dict_Ord_103)(k)(_245.values[1])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__245 = _245.values[0];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _244 = k;
                            _245 = __tco__245;
                            continue tco;
                        };
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Two") {
                        var _ = _245.values[0];
                        var _ = _245.values[1];
                        var __tco___dict_Ord_103 = __dict_Ord_103;
                        var __tco__245 = _245.values[3];
                        __dict_Ord_103 = __tco___dict_Ord_103;
                        _244 = k;
                        _245 = __tco__245;
                        continue tco;
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Three") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_245.values[1])) {
                            return Data_Maybe.Just(_245.values[2]);
                        };
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Three") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_245.values[4])) {
                            return Data_Maybe.Just(_245.values[5]);
                        };
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Three") {
                        var _ = _245.values[2];
                        var _ = _245.values[3];
                        var _ = _245.values[4];
                        if (Prelude["<"](__dict_Ord_103)(k)(_245.values[1])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__245 = _245.values[0];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _244 = k;
                            _245 = __tco__245;
                            continue tco;
                        };
                    };
                    var k = _244;
                    if (_245.ctor === "Data.Map.Three") {
                        var _ = _245.values[0];
                        var _ = _245.values[2];
                        if (Prelude["<"](__dict_Ord_103)(_245.values[1])(k) && Prelude["<="](__dict_Ord_103)(k)(_245.values[4])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__245 = _245.values[3];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _244 = k;
                            _245 = __tco__245;
                            continue tco;
                        };
                    };
                    if (_245.ctor === "Data.Map.Three") {
                        var _ = _245.values[0];
                        var _ = _245.values[1];
                        var _ = _245.values[2];
                        var _ = _245.values[3];
                        var _ = _245.values[4];
                        var __tco___dict_Ord_103 = __dict_Ord_103;
                        var __tco__244 = _244;
                        var __tco__245 = _245.values[6];
                        __dict_Ord_103 = __tco___dict_Ord_103;
                        _244 = __tco__244;
                        _245 = __tco__245;
                        continue tco;
                    };
                    throw "Failed pattern match";
                };
            };
        };
    };
    var member = function (__dict_Ord_104) {
        return function (k) {
            return function (m) {
                return Data_Maybe.isJust(lookup(__dict_Ord_104)(k)(m));
            };
        };
    };
    var keys = function (_249) {
        if (_249.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_249.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_249.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _249.values[1] ])(keys(_249.values[3])));
        };
        if (_249.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_249.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _249.values[1] ])(Prelude["++"](Data_Array.semigroupArray({}))(keys(_249.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ _249.values[4] ])(keys(_249.values[6])))));
        };
        throw "Failed pattern match";
    };
    var isEmpty = function (_243) {
        if (_243.ctor === "Data.Map.Leaf") {
            return true;
        };
        return false;
    };
    var functorMap = function (_) {
        return {
            "<$>": function (_251) {
                return function (_252) {
                    if (_252.ctor === "Data.Map.Leaf") {
                        return Leaf;
                    };
                    if (_252.ctor === "Data.Map.Two") {
                        return Two(Prelude["<$>"](functorMap({}))(_251)(_252.values[0]))(_252.values[1])(_251(_252.values[2]))(Prelude["<$>"](functorMap({}))(_251)(_252.values[3]));
                    };
                    if (_252.ctor === "Data.Map.Three") {
                        return Three(Prelude["<$>"](functorMap({}))(_251)(_252.values[0]))(_252.values[1])(_251(_252.values[2]))(Prelude["<$>"](functorMap({}))(_251)(_252.values[3]))(_252.values[4])(_251(_252.values[5]))(Prelude["<$>"](functorMap({}))(_251)(_252.values[6]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var map = Prelude["<$>"](functorMap({}));
    var fromZipper = function (__copy___dict_Ord_105) {
        return function (__copy__246) {
            return function (__copy__247) {
                var __dict_Ord_105 = __copy___dict_Ord_105;
                var _246 = __copy__246;
                var _247 = __copy__247;
                tco: while (true) {
                    if (_246.length === 0) {
                        return _247;
                    };
                    if (_246.length > 0) {
                        var _864 = _246.slice(1);
                        if ((_246[0]).ctor === "Data.Map.TwoLeft") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__247 = Two(_247)((_246[0]).values[0])((_246[0]).values[1])((_246[0]).values[2]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _246 = _864;
                            _247 = __tco__247;
                            continue tco;
                        };
                    };
                    if (_246.length > 0) {
                        var _869 = _246.slice(1);
                        if ((_246[0]).ctor === "Data.Map.TwoRight") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__247 = Two((_246[0]).values[0])((_246[0]).values[1])((_246[0]).values[2])(_247);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _246 = _869;
                            _247 = __tco__247;
                            continue tco;
                        };
                    };
                    if (_246.length > 0) {
                        var _874 = _246.slice(1);
                        if ((_246[0]).ctor === "Data.Map.ThreeLeft") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__247 = Three(_247)((_246[0]).values[0])((_246[0]).values[1])((_246[0]).values[2])((_246[0]).values[3])((_246[0]).values[4])((_246[0]).values[5]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _246 = _874;
                            _247 = __tco__247;
                            continue tco;
                        };
                    };
                    if (_246.length > 0) {
                        var _882 = _246.slice(1);
                        if ((_246[0]).ctor === "Data.Map.ThreeMiddle") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__247 = Three((_246[0]).values[0])((_246[0]).values[1])((_246[0]).values[2])(_247)((_246[0]).values[3])((_246[0]).values[4])((_246[0]).values[5]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _246 = _882;
                            _247 = __tco__247;
                            continue tco;
                        };
                    };
                    if (_246.length > 0) {
                        var _890 = _246.slice(1);
                        if ((_246[0]).ctor === "Data.Map.ThreeRight") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__247 = Three((_246[0]).values[0])((_246[0]).values[1])((_246[0]).values[2])((_246[0]).values[3])((_246[0]).values[4])((_246[0]).values[5])(_247);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _246 = _890;
                            _247 = __tco__247;
                            continue tco;
                        };
                    };
                    throw "Failed pattern match";
                };
            };
        };
    };
    var insert = function (__dict_Ord_106) {
        var up = function (__copy___dict_Ord_107) {
            return function (__copy__258) {
                return function (__copy__259) {
                    var __dict_Ord_107 = __copy___dict_Ord_107;
                    var _258 = __copy__258;
                    var _259 = __copy__259;
                    tco: while (true) {
                        if (_258.length === 0) {
                            return Two(_259.values[0])(_259.values[1])(_259.values[2])(_259.values[3]);
                        };
                        if (_258.length > 0) {
                            var _908 = _258.slice(1);
                            if ((_258[0]).ctor === "Data.Map.TwoLeft") {
                                return fromZipper(__dict_Ord_107)(_908)(Three(_259.values[0])(_259.values[1])(_259.values[2])(_259.values[3])((_258[0]).values[0])((_258[0]).values[1])((_258[0]).values[2]));
                            };
                        };
                        if (_258.length > 0) {
                            var _917 = _258.slice(1);
                            if ((_258[0]).ctor === "Data.Map.TwoRight") {
                                return fromZipper(__dict_Ord_107)(_917)(Three((_258[0]).values[0])((_258[0]).values[1])((_258[0]).values[2])(_259.values[0])(_259.values[1])(_259.values[2])(_259.values[3]));
                            };
                        };
                        if (_258.length > 0) {
                            var _926 = _258.slice(1);
                            if ((_258[0]).ctor === "Data.Map.ThreeLeft") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__259 = KickUp(Two(_259.values[0])(_259.values[1])(_259.values[2])(_259.values[3]))((_258[0]).values[0])((_258[0]).values[1])(Two((_258[0]).values[2])((_258[0]).values[3])((_258[0]).values[4])((_258[0]).values[5]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _258 = _926;
                                _259 = __tco__259;
                                continue tco;
                            };
                        };
                        if (_258.length > 0) {
                            var _938 = _258.slice(1);
                            if ((_258[0]).ctor === "Data.Map.ThreeMiddle") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__259 = KickUp(Two((_258[0]).values[0])((_258[0]).values[1])((_258[0]).values[2])(_259.values[0]))(_259.values[1])(_259.values[2])(Two(_259.values[3])((_258[0]).values[3])((_258[0]).values[4])((_258[0]).values[5]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _258 = _938;
                                _259 = __tco__259;
                                continue tco;
                            };
                        };
                        if (_258.length > 0) {
                            var _950 = _258.slice(1);
                            if ((_258[0]).ctor === "Data.Map.ThreeRight") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__259 = KickUp(Two((_258[0]).values[0])((_258[0]).values[1])((_258[0]).values[2])((_258[0]).values[3]))((_258[0]).values[4])((_258[0]).values[5])(Two(_259.values[0])(_259.values[1])(_259.values[2])(_259.values[3]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _258 = _950;
                                _259 = __tco__259;
                                continue tco;
                            };
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var down = function (__copy___dict_Ord_108) {
            return function (__copy__254) {
                return function (__copy__255) {
                    return function (__copy__256) {
                        return function (__copy__257) {
                            var __dict_Ord_108 = __copy___dict_Ord_108;
                            var _254 = __copy__254;
                            var _255 = __copy__255;
                            var _256 = __copy__256;
                            var _257 = __copy__257;
                            tco: while (true) {
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Leaf") {
                                    return up(__dict_Ord_108)(ctx)(KickUp(Leaf)(k)(v)(Leaf));
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Two") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_257.values[1])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Two(_257.values[0])(k)(v)(_257.values[3]));
                                    };
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Two") {
                                    if (Prelude["<"](__dict_Ord_108)(k)(_257.values[1])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__254 = Prelude[":"](TwoLeft(_257.values[1])(_257.values[2])(_257.values[3]))(ctx);
                                        var __tco__257 = _257.values[0];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _254 = __tco__254;
                                        _255 = k;
                                        _256 = v;
                                        _257 = __tco__257;
                                        continue tco;
                                    };
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_108 = __dict_Ord_108;
                                    var __tco__254 = Prelude[":"](TwoRight(_257.values[0])(_257.values[1])(_257.values[2]))(ctx);
                                    var __tco__257 = _257.values[3];
                                    __dict_Ord_108 = __tco___dict_Ord_108;
                                    _254 = __tco__254;
                                    _255 = k;
                                    _256 = v;
                                    _257 = __tco__257;
                                    continue tco;
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Three") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_257.values[1])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Three(_257.values[0])(k)(v)(_257.values[3])(_257.values[4])(_257.values[5])(_257.values[6]));
                                    };
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Three") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_257.values[4])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Three(_257.values[0])(_257.values[1])(_257.values[2])(_257.values[3])(k)(v)(_257.values[6]));
                                    };
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Three") {
                                    if (Prelude["<"](__dict_Ord_108)(k)(_257.values[1])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__254 = Prelude[":"](ThreeLeft(_257.values[1])(_257.values[2])(_257.values[3])(_257.values[4])(_257.values[5])(_257.values[6]))(ctx);
                                        var __tco__257 = _257.values[0];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _254 = __tco__254;
                                        _255 = k;
                                        _256 = v;
                                        _257 = __tco__257;
                                        continue tco;
                                    };
                                };
                                var ctx = _254;
                                var k = _255;
                                var v = _256;
                                if (_257.ctor === "Data.Map.Three") {
                                    if (Prelude["<"](__dict_Ord_108)(_257.values[1])(k) && Prelude["<="](__dict_Ord_108)(k)(_257.values[4])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__254 = Prelude[":"](ThreeMiddle(_257.values[0])(_257.values[1])(_257.values[2])(_257.values[4])(_257.values[5])(_257.values[6]))(ctx);
                                        var __tco__257 = _257.values[3];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _254 = __tco__254;
                                        _255 = k;
                                        _256 = v;
                                        _257 = __tco__257;
                                        continue tco;
                                    };
                                };
                                if (_257.ctor === "Data.Map.Three") {
                                    var __tco___dict_Ord_108 = __dict_Ord_108;
                                    var __tco__254 = Prelude[":"](ThreeRight(_257.values[0])(_257.values[1])(_257.values[2])(_257.values[3])(_257.values[4])(_257.values[5]))(_254);
                                    var __tco__255 = _255;
                                    var __tco__256 = _256;
                                    var __tco__257 = _257.values[6];
                                    __dict_Ord_108 = __tco___dict_Ord_108;
                                    _254 = __tco__254;
                                    _255 = __tco__255;
                                    _256 = __tco__256;
                                    _257 = __tco__257;
                                    continue tco;
                                };
                                throw "Failed pattern match";
                            };
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_106)([  ]);
    };
    var union = function (__dict_Ord_109) {
        return function (m1) {
            return function (m2) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
                    return function (_241) {
                        return insert(__dict_Ord_109)(_241.values[0])(_241.values[1])(m);
                    };
                })(m2)(toList(m1));
            };
        };
    };
    var eqMap = function (__dict_Eq_110) {
        return function (__dict_Eq_111) {
            return {
                "==": function (m1) {
                    return function (m2) {
                        return Prelude["=="](Prelude.eqArray(Data_Tuple.eqTuple(__dict_Eq_110)(__dict_Eq_111)))(toList(m1))(toList(m2));
                    };
                }, 
                "/=": function (m1) {
                    return function (m2) {
                        return !Prelude["=="](eqMap(__dict_Eq_110)(__dict_Eq_111))(m1)(m2);
                    };
                }
            };
        };
    };
    var empty = Leaf;
    var fromList = function (__dict_Ord_112) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (_240) {
                return insert(__dict_Ord_112)(_240.values[0])(_240.values[1])(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_113) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_113))(empty);
    };
    var $$delete = function (__dict_Ord_114) {
        var up = function (__copy___dict_Ord_115) {
            return function (__copy__263) {
                return function (__copy__264) {
                    var __dict_Ord_115 = __copy___dict_Ord_115;
                    var _263 = __copy__263;
                    var _264 = __copy__264;
                    tco: while (true) {
                        if (_263.length === 0) {
                            return _264;
                        };
                        if (_263.length > 0) {
                            var _1017 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Leaf") {
                                    if (_264.ctor === "Data.Map.Leaf") {
                                        return fromZipper(__dict_Ord_115)(_1017)(Two(Leaf)((_263[0]).values[0])((_263[0]).values[1])(Leaf));
                                    };
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1022 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoRight") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (_264.ctor === "Data.Map.Leaf") {
                                        return fromZipper(__dict_Ord_115)(_1022)(Two(Leaf)((_263[0]).values[1])((_263[0]).values[2])(Leaf));
                                    };
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1027 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_115 = __dict_Ord_115;
                                    var __tco__264 = Three(_264)((_263[0]).values[0])((_263[0]).values[1])(((_263[0]).values[2]).values[0])(((_263[0]).values[2]).values[1])(((_263[0]).values[2]).values[2])(((_263[0]).values[2]).values[3]);
                                    __dict_Ord_115 = __tco___dict_Ord_115;
                                    _263 = _1027;
                                    _264 = __tco__264;
                                    continue tco;
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1036 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoRight") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_115 = __dict_Ord_115;
                                    var __tco__264 = Three(((_263[0]).values[0]).values[0])(((_263[0]).values[0]).values[1])(((_263[0]).values[0]).values[2])(((_263[0]).values[0]).values[3])((_263[0]).values[1])((_263[0]).values[2])(_264);
                                    __dict_Ord_115 = __tco___dict_Ord_115;
                                    _263 = _1036;
                                    _264 = __tco__264;
                                    continue tco;
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1045 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1045)(Two(Two(_264)((_263[0]).values[0])((_263[0]).values[1])(((_263[0]).values[2]).values[0]))(((_263[0]).values[2]).values[1])(((_263[0]).values[2]).values[2])(Two(((_263[0]).values[2]).values[3])(((_263[0]).values[2]).values[4])(((_263[0]).values[2]).values[5])(((_263[0]).values[2]).values[6])));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1057 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.TwoRight") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1057)(Two(Two(((_263[0]).values[0]).values[0])(((_263[0]).values[0]).values[1])(((_263[0]).values[0]).values[2])(((_263[0]).values[0]).values[3]))(((_263[0]).values[0]).values[4])(((_263[0]).values[0]).values[5])(Two(((_263[0]).values[0]).values[6])((_263[0]).values[1])((_263[0]).values[2])(_264)));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1069 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Leaf") {
                                    if (((_263[0]).values[5]).ctor === "Data.Map.Leaf") {
                                        if (_264.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1069)(Three(Leaf)((_263[0]).values[0])((_263[0]).values[1])(Leaf)((_263[0]).values[3])((_263[0]).values[4])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1077 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (((_263[0]).values[5]).ctor === "Data.Map.Leaf") {
                                        if (_264.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1077)(Three(Leaf)((_263[0]).values[1])((_263[0]).values[2])(Leaf)((_263[0]).values[3])((_263[0]).values[4])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1085 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (((_263[0]).values[3]).ctor === "Data.Map.Leaf") {
                                        if (_264.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1085)(Three(Leaf)((_263[0]).values[1])((_263[0]).values[2])(Leaf)((_263[0]).values[4])((_263[0]).values[5])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1093 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1093)(Two(Three(_264)((_263[0]).values[0])((_263[0]).values[1])(((_263[0]).values[2]).values[0])(((_263[0]).values[2]).values[1])(((_263[0]).values[2]).values[2])(((_263[0]).values[2]).values[3]))((_263[0]).values[3])((_263[0]).values[4])((_263[0]).values[5]));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1105 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1105)(Two(Three(((_263[0]).values[0]).values[0])(((_263[0]).values[0]).values[1])(((_263[0]).values[0]).values[2])(((_263[0]).values[0]).values[3])((_263[0]).values[1])((_263[0]).values[2])(_264))((_263[0]).values[3])((_263[0]).values[4])((_263[0]).values[5]));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1117 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_263[0]).values[5]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1117)(Two((_263[0]).values[0])((_263[0]).values[1])((_263[0]).values[2])(Three(_264)((_263[0]).values[3])((_263[0]).values[4])(((_263[0]).values[5]).values[0])(((_263[0]).values[5]).values[1])(((_263[0]).values[5]).values[2])(((_263[0]).values[5]).values[3])));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1129 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_263[0]).values[3]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1129)(Two((_263[0]).values[0])((_263[0]).values[1])((_263[0]).values[2])(Three(((_263[0]).values[3]).values[0])(((_263[0]).values[3]).values[1])(((_263[0]).values[3]).values[2])(((_263[0]).values[3]).values[3])((_263[0]).values[4])((_263[0]).values[5])(_264)));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1141 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_263[0]).values[2]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1141)(Three(Two(_264)((_263[0]).values[0])((_263[0]).values[1])(((_263[0]).values[2]).values[0]))(((_263[0]).values[2]).values[1])(((_263[0]).values[2]).values[2])(Two(((_263[0]).values[2]).values[3])(((_263[0]).values[2]).values[4])(((_263[0]).values[2]).values[5])(((_263[0]).values[2]).values[6]))((_263[0]).values[3])((_263[0]).values[4])((_263[0]).values[5]));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1156 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_263[0]).values[0]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1156)(Three(Two(((_263[0]).values[0]).values[0])(((_263[0]).values[0]).values[1])(((_263[0]).values[0]).values[2])(((_263[0]).values[0]).values[3]))(((_263[0]).values[0]).values[4])(((_263[0]).values[0]).values[5])(Two(((_263[0]).values[0]).values[6])((_263[0]).values[1])((_263[0]).values[2])(_264))((_263[0]).values[3])((_263[0]).values[4])((_263[0]).values[5]));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1171 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_263[0]).values[5]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1171)(Three((_263[0]).values[0])((_263[0]).values[1])((_263[0]).values[2])(Two(_264)((_263[0]).values[3])((_263[0]).values[4])(((_263[0]).values[5]).values[0]))(((_263[0]).values[5]).values[1])(((_263[0]).values[5]).values[2])(Two(((_263[0]).values[5]).values[3])(((_263[0]).values[5]).values[4])(((_263[0]).values[5]).values[5])(((_263[0]).values[5]).values[6])));
                                };
                            };
                        };
                        if (_263.length > 0) {
                            var _1186 = _263.slice(1);
                            if ((_263[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_263[0]).values[3]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1186)(Three((_263[0]).values[0])((_263[0]).values[1])((_263[0]).values[2])(Two(((_263[0]).values[3]).values[0])(((_263[0]).values[3]).values[1])(((_263[0]).values[3]).values[2])(((_263[0]).values[3]).values[3]))(((_263[0]).values[3]).values[4])(((_263[0]).values[3]).values[5])(Two(((_263[0]).values[3]).values[6])((_263[0]).values[4])((_263[0]).values[5])(_264)));
                                };
                            };
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var removeMaxNode = function (__copy___dict_Ord_116) {
            return function (__copy__266) {
                return function (__copy__267) {
                    var __dict_Ord_116 = __copy___dict_Ord_116;
                    var _266 = __copy__266;
                    var _267 = __copy__267;
                    tco: while (true) {
                        var ctx = _266;
                        if (_267.ctor === "Data.Map.Two") {
                            if ((_267.values[0]).ctor === "Data.Map.Leaf") {
                                if ((_267.values[3]).ctor === "Data.Map.Leaf") {
                                    return up(__dict_Ord_116)(ctx)(Leaf);
                                };
                            };
                        };
                        var ctx = _266;
                        if (_267.ctor === "Data.Map.Two") {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__266 = Prelude[":"](TwoRight(_267.values[0])(_267.values[1])(_267.values[2]))(ctx);
                            var __tco__267 = _267.values[3];
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _266 = __tco__266;
                            _267 = __tco__267;
                            continue tco;
                        };
                        var ctx = _266;
                        if (_267.ctor === "Data.Map.Three") {
                            if ((_267.values[0]).ctor === "Data.Map.Leaf") {
                                if ((_267.values[3]).ctor === "Data.Map.Leaf") {
                                    if ((_267.values[6]).ctor === "Data.Map.Leaf") {
                                        return up(__dict_Ord_116)(Prelude[":"](TwoRight(Leaf)(_267.values[1])(_267.values[2]))(ctx))(Leaf);
                                    };
                                };
                            };
                        };
                        if (_267.ctor === "Data.Map.Three") {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__266 = Prelude[":"](ThreeRight(_267.values[0])(_267.values[1])(_267.values[2])(_267.values[3])(_267.values[4])(_267.values[5]))(_266);
                            var __tco__267 = _267.values[6];
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _266 = __tco__266;
                            _267 = __tco__267;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var maxNode = function (__copy___dict_Ord_117) {
            return function (__copy__265) {
                var __dict_Ord_117 = __copy___dict_Ord_117;
                var _265 = __copy__265;
                tco: while (true) {
                    if (_265.ctor === "Data.Map.Two") {
                        if ((_265.values[3]).ctor === "Data.Map.Leaf") {
                            return {
                                key: _265.values[1], 
                                value: _265.values[2]
                            };
                        };
                    };
                    if (_265.ctor === "Data.Map.Two") {
                        var _ = _265.values[0];
                        var _ = _265.values[1];
                        var __tco___dict_Ord_117 = __dict_Ord_117;
                        var __tco__265 = _265.values[3];
                        __dict_Ord_117 = __tco___dict_Ord_117;
                        _265 = __tco__265;
                        continue tco;
                    };
                    if (_265.ctor === "Data.Map.Three") {
                        if ((_265.values[6]).ctor === "Data.Map.Leaf") {
                            return {
                                key: _265.values[4], 
                                value: _265.values[5]
                            };
                        };
                    };
                    if (_265.ctor === "Data.Map.Three") {
                        var _ = _265.values[0];
                        var _ = _265.values[1];
                        var _ = _265.values[2];
                        var _ = _265.values[3];
                        var _ = _265.values[4];
                        var __tco___dict_Ord_117 = __dict_Ord_117;
                        var __tco__265 = _265.values[6];
                        __dict_Ord_117 = __tco___dict_Ord_117;
                        _265 = __tco__265;
                        continue tco;
                    };
                    throw "Failed pattern match";
                };
            };
        };
        var down = function (__copy___dict_Ord_118) {
            return function (__copy__260) {
                return function (__copy__261) {
                    return function (__copy__262) {
                        var __dict_Ord_118 = __copy___dict_Ord_118;
                        var _260 = __copy__260;
                        var _261 = __copy__261;
                        var _262 = __copy__262;
                        tco: while (true) {
                            var ctx = _260;
                            if (_262.ctor === "Data.Map.Leaf") {
                                return fromZipper(__dict_Ord_118)(ctx)(Leaf);
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Two") {
                                if ((_262.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_262.values[3]).ctor === "Data.Map.Leaf") {
                                        if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[1])) {
                                            return up(__dict_Ord_118)(ctx)(Leaf);
                                        };
                                    };
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Two") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[1])) {
                                    var max = maxNode(__dict_Ord_118)(_262.values[0]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](TwoLeft(max.key)(max.value)(_262.values[3]))(ctx))(_262.values[0]);
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Two") {
                                if (Prelude["<"](__dict_Ord_118)(k)(_262.values[1])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__260 = Prelude[":"](TwoLeft(_262.values[1])(_262.values[2])(_262.values[3]))(ctx);
                                    var __tco__262 = _262.values[0];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _260 = __tco__260;
                                    _261 = k;
                                    _262 = __tco__262;
                                    continue tco;
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Two") {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__260 = Prelude[":"](TwoRight(_262.values[0])(_262.values[1])(_262.values[2]))(ctx);
                                var __tco__262 = _262.values[3];
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _260 = __tco__260;
                                _261 = k;
                                _262 = __tco__262;
                                continue tco;
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if ((_262.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_262.values[3]).ctor === "Data.Map.Leaf") {
                                        if ((_262.values[6]).ctor === "Data.Map.Leaf") {
                                            if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[1])) {
                                                return fromZipper(__dict_Ord_118)(ctx)(Two(Leaf)(_262.values[4])(_262.values[5])(Leaf));
                                            };
                                        };
                                    };
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if ((_262.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_262.values[3]).ctor === "Data.Map.Leaf") {
                                        if ((_262.values[6]).ctor === "Data.Map.Leaf") {
                                            if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[4])) {
                                                return fromZipper(__dict_Ord_118)(ctx)(Two(Leaf)(_262.values[1])(_262.values[2])(Leaf));
                                            };
                                        };
                                    };
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[1])) {
                                    var max = maxNode(__dict_Ord_118)(_262.values[0]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](ThreeLeft(max.key)(max.value)(_262.values[3])(_262.values[4])(_262.values[5])(_262.values[6]))(ctx))(_262.values[0]);
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_262.values[4])) {
                                    var max = maxNode(__dict_Ord_118)(_262.values[3]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](ThreeMiddle(_262.values[0])(_262.values[1])(_262.values[2])(max.key)(max.value)(_262.values[6]))(ctx))(_262.values[3]);
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if (Prelude["<"](__dict_Ord_118)(k)(_262.values[1])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__260 = Prelude[":"](ThreeLeft(_262.values[1])(_262.values[2])(_262.values[3])(_262.values[4])(_262.values[5])(_262.values[6]))(ctx);
                                    var __tco__262 = _262.values[0];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _260 = __tco__260;
                                    _261 = k;
                                    _262 = __tco__262;
                                    continue tco;
                                };
                            };
                            var ctx = _260;
                            var k = _261;
                            if (_262.ctor === "Data.Map.Three") {
                                if (Prelude["<"](__dict_Ord_118)(_262.values[1])(k) && Prelude["<"](__dict_Ord_118)(k)(_262.values[4])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__260 = Prelude[":"](ThreeMiddle(_262.values[0])(_262.values[1])(_262.values[2])(_262.values[4])(_262.values[5])(_262.values[6]))(ctx);
                                    var __tco__262 = _262.values[3];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _260 = __tco__260;
                                    _261 = k;
                                    _262 = __tco__262;
                                    continue tco;
                                };
                            };
                            if (_262.ctor === "Data.Map.Three") {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__260 = Prelude[":"](ThreeRight(_262.values[0])(_262.values[1])(_262.values[2])(_262.values[3])(_262.values[4])(_262.values[5]))(_260);
                                var __tco__261 = _261;
                                var __tco__262 = _262.values[6];
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _260 = __tco__260;
                                _261 = __tco__261;
                                _262 = __tco__262;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_114)([  ]);
    };
    var checkValid = function (tree) {
        var allHeights = function (_253) {
            if (_253.ctor === "Data.Map.Leaf") {
                return [ 0 ];
            };
            if (_253.ctor === "Data.Map.Two") {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_253.values[0]))(allHeights(_253.values[3])));
            };
            if (_253.ctor === "Data.Map.Three") {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_253.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_253.values[3]))(allHeights(_253.values[6]))));
            };
            throw "Failed pattern match";
        };
        return Data_Array.length(Data_Array.nub(Prelude.eqNumber({}))(allHeights(tree))) === 1;
    };
    var alter = function (__dict_Ord_119) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return (function (_1327) {
                        if (_1327.ctor === "Data.Maybe.Nothing") {
                            return $$delete(__dict_Ord_119)(k)(m);
                        };
                        if (_1327.ctor === "Data.Maybe.Just") {
                            return insert(__dict_Ord_119)(k)(_1327.values[0])(m);
                        };
                        throw "Failed pattern match";
                    })(f(lookup(__dict_Ord_119)(k)(m)));
                };
            };
        };
    };
    var update = function (__dict_Ord_120) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return alter(__dict_Ord_120)(Data_Maybe.maybe(Data_Maybe.Nothing)(f))(k)(m);
                };
            };
        };
    };
    return {
        map: map, 
        unions: unions, 
        union: union, 
        values: values, 
        keys: keys, 
        update: update, 
        alter: alter, 
        member: member, 
        "delete": $$delete, 
        fromList: fromList, 
        toList: toList, 
        lookup: lookup, 
        insert: insert, 
        checkValid: checkValid, 
        singleton: singleton, 
        isEmpty: isEmpty, 
        empty: empty, 
        showTree: showTree, 
        eqMap: eqMap, 
        showMap: showMap, 
        functorMap: functorMap
    };
})();
var PS = PS || {};
PS.Data_Set = (function () {
    "use strict";
    var Data_Map = PS.Data_Map;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Set = function (value0) {
        return {
            ctor: "Data.Set.Set", 
            values: [ value0 ]
        };
    };
    var union = function (__dict_Ord_121) {
        return function (_277) {
            return function (_278) {
                return Set(Data_Map.union(__dict_Ord_121)(_277.values[0])(_278.values[0]));
            };
        };
    };
    var toList = function (_276) {
        return Data_Array.map(Data_Tuple.fst)(Data_Map.toList(_276.values[0]));
    };
    var singleton = function (a) {
        return Set(Data_Map.singleton(a)(Prelude.unit));
    };
    var showSet = function (__dict_Show_122) {
        return {
            show: function (s) {
                return "fromList " + Prelude.show(Prelude.showArray(__dict_Show_122))(toList(s));
            }
        };
    };
    var member = function (__dict_Ord_123) {
        return function (_270) {
            return function (_271) {
                return Data_Map.member(__dict_Ord_123)(_270)(_271.values[0]);
            };
        };
    };
    var isEmpty = function (_268) {
        return Data_Map.isEmpty(_268.values[0]);
    };
    var insert = function (__dict_Ord_124) {
        return function (_272) {
            return function (_273) {
                return Set(Data_Map.insert(__dict_Ord_124)(_272)(Prelude.unit)(_273.values[0]));
            };
        };
    };
    var eqSet = function (__dict_Eq_125) {
        return {
            "==": function (_279) {
                return function (_280) {
                    return Prelude["=="](Data_Map.eqMap(__dict_Eq_125)(Prelude.eqUnit({})))(_279.values[0])(_280.values[0]);
                };
            }, 
            "/=": function (_281) {
                return function (_282) {
                    return Prelude["/="](Data_Map.eqMap(__dict_Eq_125)(Prelude.eqUnit({})))(_281.values[0])(_282.values[0]);
                };
            }
        };
    };
    var empty = Set(Data_Map.empty);
    var fromList = function (__dict_Ord_126) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (a) {
                return insert(__dict_Ord_126)(a)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_127) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_127))(empty);
    };
    var $$delete = function (__dict_Ord_128) {
        return function (_274) {
            return function (_275) {
                return Set(Data_Map["delete"](__dict_Ord_128)(_274)(_275.values[0]));
            };
        };
    };
    var checkValid = function (_269) {
        return Data_Map.checkValid(_269.values[0]);
    };
    return {
        unions: unions, 
        union: union, 
        fromList: fromList, 
        toList: toList, 
        "delete": $$delete, 
        member: member, 
        insert: insert, 
        checkValid: checkValid, 
        singleton: singleton, 
        isEmpty: isEmpty, 
        empty: empty, 
        eqSet: eqSet, 
        showSet: showSet
    };
})();
var PS = PS || {};
PS.Data_JSON = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Map = PS.Data_Map;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Set = PS.Data_Set;
    var Data_Function = PS.Data_Function;
    var Object = function (value0) {
        return {
            ctor: "Data.JSON.Object", 
            values: [ value0 ]
        };
    };
    var Array = function (value0) {
        return {
            ctor: "Data.JSON.Array", 
            values: [ value0 ]
        };
    };
    var String = function (value0) {
        return {
            ctor: "Data.JSON.String", 
            values: [ value0 ]
        };
    };
    var Number = function (value0) {
        return {
            ctor: "Data.JSON.Number", 
            values: [ value0 ]
        };
    };
    var Bool = function (value0) {
        return {
            ctor: "Data.JSON.Bool", 
            values: [ value0 ]
        };
    };
    var Null = {
        ctor: "Data.JSON.Null", 
        values: [  ]
    };
    function jsonParseImpl (left, right, string) {    try       { return right(JSON.parse(string)); }    catch (e) { return left(e.toString()); }};
    function jsonToValueImpl (json) {    var typ    = Object.prototype.toString.call(json).slice(8,-1);     var right = Data_Either.Right;     var left  = Data_Either.Left;     if        (typ === 'Number') {         return right(Number(json));    } else if (typ === 'Boolean') {         return right(Bool(json));    } else if (typ === 'String') {         return right(String(json));    } else if (typ === 'Null') {         return right(Null);    } else if (typ === 'Array') {         var ary = [];        for(var i = 0; i < json.length; i++) {             Data_Either.either                 (function(l){return left(l)})                 (function(r){ary.push(r)})                 (jsonToValueImpl(json[i]))         }         return right(Array(ary));    } else if (typ === 'Object') {        var insert = Data_Function.mkFn3(Data_Map.insert(Prelude.ordString()));        var obj = Data_Map.empty;        for(var k in json) {             Data_Either.either                 (function(l){return left(l)})                 (function(r){obj = insert(k, r, obj)})                 (jsonToValueImpl(json[k]));        }         return right(Object(obj));    } else {         return left('unknown type: ' + typ);    }};
    var jsNull = null;
    function unsafeCoerce (a) {return a;};
    function objToHash (obj) {    var hash = {};    for(var i = 0; i < obj.length; i++) {        hash[Data_Tuple.fst(obj[i])] = valueToJSONImpl(Data_Tuple.snd(obj[i]));    }    return hash;};
    function jsonStringify(json) {    return JSON.stringify(json);};
    var $dot$bang$eq = function (pmval) {
        return function (val) {
            return Prelude["<$>"](Data_Either.functorEither({}))(Data_Maybe.fromMaybe(val))(pmval);
        };
    };
    var valueToJSONImpl = function (_284) {
        if (_284.ctor === "Data.JSON.Object") {
            return objToHash(Data_Map.toList(_284.values[0]));
        };
        if (_284.ctor === "Data.JSON.Array") {
            return unsafeCoerce(Prelude["<$>"](Data_Array.functorArray({}))(valueToJSONImpl)(_284.values[0]));
        };
        if (_284.ctor === "Data.JSON.String") {
            return unsafeCoerce(_284.values[0]);
        };
        if (_284.ctor === "Data.JSON.Number") {
            return unsafeCoerce(_284.values[0]);
        };
        if (_284.ctor === "Data.JSON.Bool") {
            return unsafeCoerce(_284.values[0]);
        };
        if (_284.ctor === "Data.JSON.Null") {
            return jsNull;
        };
        throw "Failed pattern match";
    };
    var valueToString = function (v) {
        return jsonStringify(valueToJSONImpl(v));
    };
    var valueToJSON = function (_) {
        return {
            toJSON: Prelude.id(Prelude.categoryArr({}))
        };
    };
    var valueFromJSON = function (_) {
        return {
            parseJSON: Data_Either.Right
        };
    };
    var unitToJSON = function (_) {
        return {
            toJSON: function (_297) {
                return Null;
            }
        };
    };
    var toJSON = function (dict) {
        return dict.toJSON;
    };
    var tupleToJSON = function (__dict_ToJSON_129) {
        return function (__dict_ToJSON_130) {
            return {
                toJSON: function (_300) {
                    return Array([ toJSON(__dict_ToJSON_129)(_300.values[0]), toJSON(__dict_ToJSON_130)(_300.values[1]) ]);
                }
            };
        };
    };
    var $dot$eq = function (__dict_ToJSON_131) {
        return function (name) {
            return function (value) {
                return Data_Tuple.Tuple(name)(toJSON(__dict_ToJSON_131)(value));
            };
        };
    };
    var stringToJSON = function (_) {
        return {
            toJSON: String
        };
    };
    var showValue = function (_) {
        return {
            show: function (_285) {
                if (_285.ctor === "Data.JSON.Object") {
                    return "Object " + Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_285.values[0]);
                };
                if (_285.ctor === "Data.JSON.Array") {
                    return "Array " + Prelude.show(Prelude.showArray(showValue({})))(_285.values[0]);
                };
                if (_285.ctor === "Data.JSON.String") {
                    return "String " + Prelude.show(Prelude.showString({}))(_285.values[0]);
                };
                if (_285.ctor === "Data.JSON.Number") {
                    return "Number " + Prelude.show(Prelude.showNumber({}))(_285.values[0]);
                };
                if (_285.ctor === "Data.JSON.Bool") {
                    return "Bool " + Prelude.show(Prelude.showBoolean({}))(_285.values[0]);
                };
                if (_285.ctor === "Data.JSON.Null") {
                    return "Null";
                };
                throw "Failed pattern match";
            }
        };
    };
    var setToJSON = function (__dict_ToJSON_132) {
        return {
            toJSON: function (s) {
                return Array(Prelude["<$>"](Data_Array.functorArray({}))(toJSON(__dict_ToJSON_132))(Data_Set.toList(s)));
            }
        };
    };
    var sequence = function (__dict_Monad_133) {
        return function (_283) {
            if (_283.length === 0) {
                return Prelude["return"](__dict_Monad_133)([  ]);
            };
            if (_283.length > 0) {
                var _1376 = _283.slice(1);
                return Prelude[">>="](__dict_Monad_133["__superclasses"]["Prelude.Bind_1"]({}))(_283[0])(function (_7) {
                    return Prelude[">>="](__dict_Monad_133["__superclasses"]["Prelude.Bind_1"]({}))(sequence(__dict_Monad_133)(_1376))(function (_6) {
                        return Prelude["return"](__dict_Monad_133)(Prelude[":"](_7)(_6));
                    });
                });
            };
            throw "Failed pattern match";
        };
    };
    var parseJSON = function (dict) {
        return dict.parseJSON;
    };
    var $dot$colon = function (__dict_FromJSON_136) {
        return function (obj) {
            return function (key) {
                return (function (_1377) {
                    if (_1377.ctor === "Data.Maybe.Nothing") {
                        return Data_Either.Left("key " + Prelude.show(Prelude.showString({}))(key) + " not present");
                    };
                    if (_1377.ctor === "Data.Maybe.Just") {
                        return parseJSON(__dict_FromJSON_136)(_1377.values[0]);
                    };
                    throw "Failed pattern match";
                })(Data_Map.lookup(Prelude.ordString({}))(key)(obj));
            };
        };
    };
    var object = function (ps) {
        return Object(Data_Map.fromList(Prelude.ordString({}))(ps));
    };
    var numberToJSON = function (_) {
        return {
            toJSON: Number
        };
    };
    var maybeToJSON = function (__dict_ToJSON_138) {
        return {
            toJSON: function (_299) {
                if (_299.ctor === "Data.Maybe.Nothing") {
                    return Null;
                };
                if (_299.ctor === "Data.Maybe.Just") {
                    return toJSON(__dict_ToJSON_138)(_299.values[0]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybeFromJSON = function (__dict_FromJSON_139) {
        return {
            parseJSON: function (a) {
                return Prelude["return"](Data_Either.monadEither({}))((function (_1381) {
                    if (_1381.ctor === "Data.Either.Left") {
                        return Data_Maybe.Nothing;
                    };
                    if (_1381.ctor === "Data.Either.Right") {
                        return Data_Maybe.Just(_1381.values[0]);
                    };
                    throw "Failed pattern match";
                })(parseJSON(__dict_FromJSON_139)(a)));
            }
        };
    };
    var $dot$colon$qmark = function (__dict_FromJSON_137) {
        return function (obj) {
            return function (key) {
                return (function (_1384) {
                    if (_1384.ctor === "Data.Maybe.Nothing") {
                        return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing);
                    };
                    if (_1384.ctor === "Data.Maybe.Just") {
                        return parseJSON(maybeFromJSON(__dict_FromJSON_137))(_1384.values[0]);
                    };
                    throw "Failed pattern match";
                })(Data_Map.lookup(Prelude.ordString({}))(key)(obj));
            };
        };
    };
    var mapToJSON = function (__dict_ToJSON_140) {
        return {
            toJSON: function (m) {
                return Object(Data_Map.map(toJSON(__dict_ToJSON_140))(m));
            }
        };
    };
    var jsonToValue = Data_Function.runFn3(jsonParseImpl)(Data_Either.Left)(jsonToValueImpl);
    var jsonParse = Data_Function.runFn3(jsonParseImpl)(Data_Either.Left)(Data_Either.Right);
    var fail = Data_Either.Left;
    var mapFromJSON = function (__dict_Ord_141) {
        return function (__dict_FromJSON_142) {
            return {
                parseJSON: function (_295) {
                    if (_295.ctor === "Data.JSON.Object") {
                        var fn = function (_296) {
                            return (function (_1388) {
                                if (_1388.ctor === "Data.Either.Right") {
                                    return Prelude["return"](Data_Either.monadEither({}))(Data_Tuple.Tuple(_296.values[0])(_1388.values[0]));
                                };
                                if (_1388.ctor === "Data.Either.Left") {
                                    return fail(_1388.values[0]);
                                };
                                throw "Failed pattern match";
                            })(parseJSON(__dict_FromJSON_142)(_296.values[1]));
                        };
                        return Prelude["<$>"](Data_Either.functorEither({}))(Data_Map.fromList(Prelude.ordString({})))(sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(fn)(Data_Map.toList(_295.values[0]))));
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var numberFromJSON = function (_) {
        return {
            parseJSON: function (_289) {
                if (_289.ctor === "Data.JSON.Number") {
                    return Prelude["return"](Data_Either.monadEither({}))(_289.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_289) + " is not Number.");
            }
        };
    };
    var stringFromJSON = function (_) {
        return {
            parseJSON: function (_291) {
                if (_291.ctor === "Data.JSON.String") {
                    return Prelude["return"](Data_Either.monadEither({}))(_291.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_291) + " is not String.");
            }
        };
    };
    var tupleFromJSON = function (__dict_FromJSON_143) {
        return function (__dict_FromJSON_144) {
            return {
                parseJSON: function (_293) {
                    if (_293.ctor === "Data.JSON.Array") {
                        if ((_293.values[0]).length === 2) {
                            return Prelude["<*>"](Data_Either.applyEither({}))(Prelude["<$>"](Data_Either.functorEither({}))(Data_Tuple.Tuple)(parseJSON(__dict_FromJSON_143)(_293.values[0][0])))(parseJSON(__dict_FromJSON_144)(_293.values[0][1]));
                        };
                    };
                    return fail(Prelude.show(showValue({}))(_293) + " is not (a,b).");
                }
            };
        };
    };
    var unitFromJSON = function (_) {
        return {
            parseJSON: function (_290) {
                if (_290.ctor === "Data.JSON.Null") {
                    return Prelude["return"](Data_Either.monadEither({}))(Prelude.unit);
                };
                return fail(Prelude.show(showValue({}))(_290) + " is not Null.");
            }
        };
    };
    var eqValue = function (_) {
        return {
            "==": function (_286) {
                return function (_287) {
                    if (_286.ctor === "Data.JSON.Object") {
                        if (_287.ctor === "Data.JSON.Object") {
                            return Prelude["=="](Data_Map.eqMap(Prelude.eqString({}))(eqValue({})))(_286.values[0])(_287.values[0]);
                        };
                    };
                    if (_286.ctor === "Data.JSON.Array") {
                        if (_287.ctor === "Data.JSON.Array") {
                            return Prelude["=="](Prelude.eqArray(eqValue({})))(_286.values[0])(_287.values[0]);
                        };
                    };
                    if (_286.ctor === "Data.JSON.String") {
                        if (_287.ctor === "Data.JSON.String") {
                            return _286.values[0] === _287.values[0];
                        };
                    };
                    if (_286.ctor === "Data.JSON.Number") {
                        if (_287.ctor === "Data.JSON.Number") {
                            return _286.values[0] === _287.values[0];
                        };
                    };
                    if (_286.ctor === "Data.JSON.Bool") {
                        if (_287.ctor === "Data.JSON.Bool") {
                            return _286.values[0] === _287.values[0];
                        };
                    };
                    if (_286.ctor === "Data.JSON.Null") {
                        if (_287.ctor === "Data.JSON.Null") {
                            return true;
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqValue({}))(a)(b);
                };
            }
        };
    };
    var encode = function (__dict_ToJSON_145) {
        return function (a) {
            return valueToString(toJSON(__dict_ToJSON_145)(a));
        };
    };
    var eitherToJSON = function (__dict_ToJSON_146) {
        return function (__dict_ToJSON_147) {
            return {
                toJSON: function (_298) {
                    if (_298.ctor === "Data.Either.Right") {
                        return object([ $dot$eq(__dict_ToJSON_147)("Right")(_298.values[0]) ]);
                    };
                    if (_298.ctor === "Data.Either.Left") {
                        return object([ $dot$eq(__dict_ToJSON_146)("Left")(_298.values[0]) ]);
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var eitherFromJSON = function (__dict_FromJSON_148) {
        return function (__dict_FromJSON_149) {
            return {
                parseJSON: function (_294) {
                    if (_294.ctor === "Data.JSON.Object") {
                        return (function (_1419) {
                            if (_1419.length === 1) {
                                if ((_1419[0]).values[0] === "Right") {
                                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Right)(parseJSON(__dict_FromJSON_149)((_1419[0]).values[1]));
                                };
                            };
                            if (_1419.length === 1) {
                                if ((_1419[0]).values[0] === "Left") {
                                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Left)(parseJSON(__dict_FromJSON_148)((_1419[0]).values[1]));
                                };
                            };
                            return fail(Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_294.values[0]) + " is not (Either a b).");
                        })(Data_Map.toList(_294.values[0]));
                    };
                    return fail(Prelude.show(showValue({}))(_294) + " is not (Either a b).");
                }
            };
        };
    };
    var eitherDecode = function (__dict_FromJSON_150) {
        return function (s) {
            return Prelude[">>="](Data_Either.bindEither({}))(jsonToValue(s))(function (_5) {
                return parseJSON(__dict_FromJSON_150)(_5);
            });
        };
    };
    var decode = function (__dict_FromJSON_151) {
        return function (s) {
            return (function (_1428) {
                if (_1428.ctor === "Data.Either.Right") {
                    return Data_Maybe.Just(_1428.values[0]);
                };
                if (_1428.ctor === "Data.Either.Left") {
                    return Data_Maybe.Nothing;
                };
                throw "Failed pattern match";
            })(eitherDecode(__dict_FromJSON_151)(s));
        };
    };
    var boolToJSON = function (_) {
        return {
            toJSON: Bool
        };
    };
    var boolFromJSON = function (_) {
        return {
            parseJSON: function (_288) {
                if (_288.ctor === "Data.JSON.Bool") {
                    return Data_Either.Right(_288.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_288) + " is not Boolean.");
            }
        };
    };
    var arrayToJSON = function (__dict_ToJSON_152) {
        return {
            toJSON: function (a) {
                return Array(Prelude["<$>"](Data_Array.functorArray({}))(toJSON(__dict_ToJSON_152))(a));
            }
        };
    };
    var arrayFromJSON = function (__dict_FromJSON_153) {
        return {
            parseJSON: function (_292) {
                if (_292.ctor === "Data.JSON.Array") {
                    return sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(parseJSON(__dict_FromJSON_153))(_292.values[0]));
                };
                return fail(Prelude.show(showValue({}))(_292) + " is not [a].");
            }
        };
    };
    var setFromJSON = function (__dict_Ord_134) {
        return function (__dict_FromJSON_135) {
            return {
                parseJSON: function (a) {
                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Set.fromList(__dict_Ord_134))(parseJSON(arrayFromJSON(__dict_FromJSON_135))(a));
                }
            };
        };
    };
    return {
        Object: Object, 
        Array: Array, 
        String: String, 
        Number: Number, 
        Bool: Bool, 
        Null: Null, 
        object: object, 
        ".=": $dot$eq, 
        encode: encode, 
        toJSON: toJSON, 
        ".!=": $dot$bang$eq, 
        ".:?": $dot$colon$qmark, 
        ".:": $dot$colon, 
        eitherDecode: eitherDecode, 
        decode: decode, 
        fail: fail, 
        parseJSON: parseJSON, 
        showValue: showValue, 
        eqValue: eqValue, 
        valueFromJSON: valueFromJSON, 
        boolFromJSON: boolFromJSON, 
        numberFromJSON: numberFromJSON, 
        unitFromJSON: unitFromJSON, 
        stringFromJSON: stringFromJSON, 
        arrayFromJSON: arrayFromJSON, 
        tupleFromJSON: tupleFromJSON, 
        eitherFromJSON: eitherFromJSON, 
        maybeFromJSON: maybeFromJSON, 
        setFromJSON: setFromJSON, 
        mapFromJSON: mapFromJSON, 
        boolToJSON: boolToJSON, 
        numberToJSON: numberToJSON, 
        stringToJSON: stringToJSON, 
        unitToJSON: unitToJSON, 
        arrayToJSON: arrayToJSON, 
        eitherToJSON: eitherToJSON, 
        mapToJSON: mapToJSON, 
        maybeToJSON: maybeToJSON, 
        setToJSON: setToJSON, 
        tupleToJSON: tupleToJSON, 
        valueToJSON: valueToJSON
    };
})();
var PS = PS || {};
PS.Foreign = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Either = PS.Data_Either;
    var Data_JSON = PS.Data_JSON;
    var D = function (value0) {
        return {
            ctor: "Foreign.D", 
            values: [ value0 ]
        };
    };
    var B = function (value0) {
        return {
            ctor: "Foreign.B", 
            values: [ value0 ]
        };
    };
    var A = function (value0) {
        return function (value1) {
            return function (value2) {
                return {
                    ctor: "Foreign.A", 
                    values: [ value0, value1, value2 ]
                };
            };
        };
    };
    var C1 = function (value0) {
        return {
            ctor: "Foreign.C1", 
            values: [ value0 ]
        };
    };
    var C2 = function (value0) {
        return function (value1) {
            return {
                ctor: "Foreign.C2", 
                values: [ value0, value1 ]
            };
        };
    };
    var autoDFromJSON = function (__dict_FromJSON_154) {
        return {
            parseJSON: function (input) {
                if (input.ctor === "Data.JSON.Array") {
                    if ((input.values[0]).length === 1) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(__dict_FromJSON_154)(input.values[0][0]))(function (_12) {
                            return Prelude["return"](Data_Either.monadEither({}))(D(_12));
                        });
                    };
                };
                return Data_JSON.fail("cannot parse.");
            }
        };
    };
    var autoBFromJSON = function (_) {
        return {
            parseJSON: function (input) {
                if (input.ctor === "Data.JSON.Object") {
                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.arrayFromJSON(Data_JSON.numberFromJSON({})))(input.values[0])("number"))(function (_17) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(input.values[0])("first"))(function (_16) {
                            return Prelude["return"](Data_Either.monadEither({}))(B({
                                number: _17, 
                                first: _16
                            }));
                        });
                    });
                };
                return Data_JSON.fail("cannot parse.");
            }
        };
    };
    var autoAFromJSON = function (_) {
        return {
            parseJSON: function (input) {
                if (input.ctor === "Data.JSON.Array") {
                    if ((input.values[0]).length === 3) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.values[0][0]))(function (_15) {
                            return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.values[0][1]))(function (_14) {
                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.stringFromJSON({}))(input.values[0][2]))(function (_13) {
                                    return Prelude["return"](Data_Either.monadEither({}))(A(_15)(_14)(_13));
                                });
                            });
                        });
                    };
                };
                return Data_JSON.fail("cannot parse.");
            }
        };
    };
    var autoCFromJSON = function (_) {
        return {
            parseJSON: function (array) {
                return (function (_1451) {
                    if (_1451.ctor === "Data.Either.Right") {
                        if ((_1451.values[0]).values[0] === "C1") {
                            if (((_1451.values[0]).values[1]).ctor === "Data.JSON.Object") {
                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](autoAFromJSON({}))(((_1451.values[0]).values[1]).values[0])("a"))(function (_9) {
                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(((_1451.values[0]).values[1]).values[0])("name"))(function (_8) {
                                        return Prelude["return"](Data_Either.monadEither({}))(C1({
                                            a: _9, 
                                            name: _8
                                        }));
                                    });
                                });
                            };
                            return Data_JSON.fail("cannot parse.");
                        };
                    };
                    if (_1451.ctor === "Data.Either.Right") {
                        if ((_1451.values[0]).values[0] === "C2") {
                            if (((_1451.values[0]).values[1]).ctor === "Data.JSON.Array") {
                                if ((((_1451.values[0]).values[1]).values[0]).length === 2) {
                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(((_1451.values[0]).values[1]).values[0][0]))(function (_11) {
                                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(autoBFromJSON({}))(((_1451.values[0]).values[1]).values[0][1]))(function (_10) {
                                            return Prelude["return"](Data_Either.monadEither({}))(C2(_11)(_10));
                                        });
                                    });
                                };
                            };
                            return Data_JSON.fail("cannot parse.");
                        };
                    };
                    return Data_JSON.fail("cannot parse.");
                })(Data_JSON.parseJSON(Data_JSON.tupleFromJSON(Data_JSON.stringFromJSON({}))(Data_JSON.valueFromJSON({})))(array));
            }
        };
    };
    return {
        B: B, 
        A: A, 
        D: D, 
        C1: C1, 
        C2: C2, 
        autoCFromJSON: autoCFromJSON, 
        autoDFromJSON: autoDFromJSON, 
        autoAFromJSON: autoAFromJSON, 
        autoBFromJSON: autoBFromJSON
    };
})();
var PS = PS || {};
PS.Main = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Debug_Trace = PS.Debug_Trace;
    var Data_Maybe = PS.Data_Maybe;
    var Data_JSON = PS.Data_JSON;
    var Foreign = PS.Foreign;
    var showB = function (_) {
        return {
            show: function (_302) {
                return "B{ number: " + Prelude.show(Prelude.showArray(Prelude.showNumber({})))((_302.values[0]).number) + ", first: " + Prelude.show(Prelude.showString({}))((_302.values[0]).first) + "}";
            }
        };
    };
    var showA = function (_) {
        return {
            show: function (_301) {
                return "A " + Prelude.show(Prelude.showNumber({}))(_301.values[0]) + " " + Prelude.show(Prelude.showNumber({}))(_301.values[1]) + " " + Prelude.show(Prelude.showString({}))(_301.values[2]);
            }
        };
    };
    var showC = function (_) {
        return {
            show: function (_303) {
                if (_303.ctor === "Foreign.C1") {
                    return "C1{ a: " + Prelude.show(showA({}))((_303.values[0]).a) + ", name: " + Prelude.show(Prelude.showString({}))((_303.values[0]).name) + "}";
                };
                if (_303.ctor === "Foreign.C2") {
                    return "C2 " + Prelude.show(Prelude.showNumber({}))(_303.values[0]) + " " + Prelude.show(showB({}))(_303.values[1]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var main = Debug_Trace.print(Prelude.showArray(Data_Maybe.showMaybe(showC({}))))([ Data_JSON.decode(Foreign.autoCFromJSON({}))("{\"tag\": \"C1\", \"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}"), Data_JSON.decode(Foreign.autoCFromJSON({}))("{\"C1\": {\"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}}"), Data_JSON.decode(Foreign.autoCFromJSON({}))("[\"C1\", {\"a\": [12,34.2, \"adf\"], \"name\": \"kevin\"}]") ]);
    return {
        main: main, 
        showA: showA, 
        showB: showB, 
        showC: showC
    };
})();
var PS = PS || {};
PS.Data_Traversable = (function () {
    "use strict";
    var Data_Tuple = PS.Data_Tuple;
    var Data_Foldable = PS.Data_Foldable;
    var Prelude = PS.Prelude;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Array = PS.Data_Array;
    var traverse = function (dict) {
        return dict.traverse;
    };
    var traversableTuple = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return Data_Tuple.functorTuple({});
                }, 
                "Data.Foldable.Foldable_1": function (_) {
                    return Data_Foldable.foldableTuple({});
                }
            }, 
            traverse: function (__dict_Applicative_155) {
                return function (_316) {
                    return function (_317) {
                        return Prelude["<$>"]((__dict_Applicative_155["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_317.values[0]))(_316(_317.values[1]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_156) {
                return function (_318) {
                    return Prelude["<$>"]((__dict_Applicative_156["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_318.values[0]))(_318.values[1]);
                };
            }
        };
    };
    var traversableRef = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return Data_Eq.functorRef({});
                }, 
                "Data.Foldable.Foldable_1": function (_) {
                    return Data_Foldable.foldableRef({});
                }
            }, 
            traverse: function (__dict_Applicative_157) {
                return function (_310) {
                    return function (_311) {
                        return Prelude["<$>"]((__dict_Applicative_157["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_310(_311.values[0]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_158) {
                return function (_312) {
                    return Prelude["<$>"]((__dict_Applicative_158["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_312.values[0]);
                };
            }
        };
    };
    var traversableMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return Data_Maybe.functorMaybe({});
                }, 
                "Data.Foldable.Foldable_1": function (_) {
                    return Data_Foldable.foldableMaybe({});
                }
            }, 
            traverse: function (__dict_Applicative_159) {
                return function (_313) {
                    return function (_314) {
                        if (_314.ctor === "Data.Maybe.Nothing") {
                            return Prelude.pure(__dict_Applicative_159)(Data_Maybe.Nothing);
                        };
                        if (_314.ctor === "Data.Maybe.Just") {
                            return Prelude["<$>"]((__dict_Applicative_159["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_313(_314.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_160) {
                return function (_315) {
                    if (_315.ctor === "Data.Maybe.Nothing") {
                        return Prelude.pure(__dict_Applicative_160)(Data_Maybe.Nothing);
                    };
                    if (_315.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"]((__dict_Applicative_160["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_315.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var traversableEither = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return Data_Either.functorEither({});
                }, 
                "Data.Foldable.Foldable_1": function (_) {
                    return Data_Foldable.foldableEither({});
                }
            }, 
            traverse: function (__dict_Applicative_161) {
                return function (_307) {
                    return function (_308) {
                        if (_308.ctor === "Data.Either.Left") {
                            return Prelude.pure(__dict_Applicative_161)(Data_Either.Left(_308.values[0]));
                        };
                        if (_308.ctor === "Data.Either.Right") {
                            return Prelude["<$>"]((__dict_Applicative_161["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_307(_308.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_162) {
                return function (_309) {
                    if (_309.ctor === "Data.Either.Left") {
                        return Prelude.pure(__dict_Applicative_162)(Data_Either.Left(_309.values[0]));
                    };
                    if (_309.ctor === "Data.Either.Right") {
                        return Prelude["<$>"]((__dict_Applicative_162["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_309.values[0]);
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return Data_Array.functorArray({});
                }, 
                "Data.Foldable.Foldable_1": function (_) {
                    return Data_Foldable.foldableArray({});
                }
            }, 
            traverse: function (__dict_Applicative_163) {
                return function (_304) {
                    return function (_305) {
                        if (_305.length === 0) {
                            return Prelude.pure(__dict_Applicative_163)([  ]);
                        };
                        if (_305.length > 0) {
                            var _1509 = _305.slice(1);
                            return Prelude["<*>"](__dict_Applicative_163["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_163["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_304(_305[0])))(traverse(traversableArray({}))(__dict_Applicative_163)(_304)(_1509));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_164) {
                return function (_306) {
                    if (_306.length === 0) {
                        return Prelude.pure(__dict_Applicative_164)([  ]);
                    };
                    if (_306.length > 0) {
                        var _1512 = _306.slice(1);
                        return Prelude["<*>"](__dict_Applicative_164["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_164["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_306[0]))(sequence(traversableArray({}))(__dict_Applicative_164)(_1512));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var zipWithA = function (__dict_Applicative_165) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_165)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_166) {
        return function (__dict_Traversable_167) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_167)(__dict_Applicative_166)(f)(x);
                };
            };
        };
    };
    return {
        zipWithA: zipWithA, 
        "for": $$for, 
        sequence: sequence, 
        traverse: traverse, 
        traversableArray: traversableArray, 
        traversableEither: traversableEither, 
        traversableRef: traversableRef, 
        traversableMaybe: traversableMaybe, 
        traversableTuple: traversableTuple
    };
})();
var PS = PS || {};
PS.Data_Graph = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Math = PS.Math;
    var Control_Monad_Eff = PS.Control_Monad_Eff;
    var Control_Monad_ST = PS.Control_Monad_ST;
    var Data_Map = PS.Data_Map;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Traversable = PS.Data_Traversable;
    var Control_Monad = PS.Control_Monad;
    var Data_Array = PS.Data_Array;
    var AcyclicSCC = function (value0) {
        return {
            ctor: "Data.Graph.AcyclicSCC", 
            values: [ value0 ]
        };
    };
    var CyclicSCC = function (value0) {
        return {
            ctor: "Data.Graph.CyclicSCC", 
            values: [ value0 ]
        };
    };
    var Edge = function (value0) {
        return function (value1) {
            return {
                ctor: "Data.Graph.Edge", 
                values: [ value0, value1 ]
            };
        };
    };
    var Graph = function (value0) {
        return function (value1) {
            return {
                ctor: "Data.Graph.Graph", 
                values: [ value0, value1 ]
            };
        };
    };
    var vertices = function (_321) {
        if (_321.ctor === "Data.Graph.AcyclicSCC") {
            return [ _321.values[0] ];
        };
        if (_321.ctor === "Data.Graph.CyclicSCC") {
            return _321.values[0];
        };
        throw "Failed pattern match";
    };
    var showSCC = function (__dict_Show_168) {
        return {
            show: function (_331) {
                if (_331.ctor === "Data.Graph.AcyclicSCC") {
                    return "AcyclicSCC (" + Prelude.show(__dict_Show_168)(_331.values[0]) + ")";
                };
                if (_331.ctor === "Data.Graph.CyclicSCC") {
                    return "CyclicSCC " + Prelude.show(Prelude.showArray(__dict_Show_168))(_331.values[0]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var popUntil = function (__copy___dict_Eq_169) {
        return function (__copy__325) {
            return function (__copy__326) {
                return function (__copy__327) {
                    return function (__copy__328) {
                        var __dict_Eq_169 = __copy___dict_Eq_169;
                        var _325 = __copy__325;
                        var _326 = __copy__326;
                        var _327 = __copy__327;
                        var _328 = __copy__328;
                        tco: while (true) {
                            if (_327.length === 0) {
                                return {
                                    path: [  ], 
                                    component: _328
                                };
                            };
                            var makeKey = _325;
                            var v = _326;
                            if (_327.length > 0) {
                                var _1524 = _327.slice(1);
                                if (Prelude["=="](__dict_Eq_169)(makeKey(v))(makeKey(_327[0]))) {
                                    return {
                                        path: _1524, 
                                        component: Prelude[":"](_327[0])(_328)
                                    };
                                };
                            };
                            if (_327.length > 0) {
                                var _1526 = _327.slice(1);
                                var __tco___dict_Eq_169 = __dict_Eq_169;
                                var __tco__325 = _325;
                                var __tco__326 = _326;
                                var __tco__328 = Prelude[":"](_327[0])(_328);
                                __dict_Eq_169 = __tco___dict_Eq_169;
                                _325 = __tco__325;
                                _326 = __tco__326;
                                _327 = _1526;
                                _328 = __tco__328;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
            };
        };
    };
    var maybeMin = function (_329) {
        return function (_330) {
            if (_330.ctor === "Data.Maybe.Nothing") {
                return Data_Maybe.Just(_329);
            };
            if (_330.ctor === "Data.Maybe.Just") {
                return Data_Maybe.Just(Math.min(_329)(_330.values[0]));
            };
            throw "Failed pattern match";
        };
    };
    var scc$prime = function (__dict_Eq_170) {
        return function (__dict_Ord_171) {
            return function (_322) {
                return function (_323) {
                    return function (_324) {
                        return Control_Monad_Eff.runPure(function __do() {
                            var _33 = {
                                value: 0
                            };
                            var index = _33;
                            var _32 = {
                                value: [  ]
                            };
                            var _31 = {
                                value: Data_Map.empty
                            };
                            var _30 = {
                                value: Data_Map.empty
                            };
                            var _29 = {
                                value: [  ]
                            };
                            return (function () {
                                var lowlinkOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_171)(k)(_30.value);
                                    };
                                };
                                var lowlinkOf = function (v) {
                                    return lowlinkOfKey(_322(v));
                                };
                                var isCycle = function (k) {
                                    return Data_Foldable.any(Data_Foldable.foldableArray({}))(function (_320) {
                                        return Prelude["=="](__dict_Eq_170)(_320.values[0])(k) && Prelude["=="](__dict_Eq_170)(_320.values[1])(k);
                                    })(_324.values[1]);
                                };
                                var makeComponent = function (_335) {
                                    if (_335.length === 1) {
                                        if (!isCycle(_322(_335[0]))) {
                                            return AcyclicSCC(_335[0]);
                                        };
                                    };
                                    return CyclicSCC(_335);
                                };
                                var indexOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_171)(k)(_31.value);
                                    };
                                };
                                var strongConnect = function (k) {
                                    var v = _323(k);
                                    return function __do() {
                                        var _28 = index.value;
                                        _31.value = Data_Map.insert(__dict_Ord_171)(k)(_28)(_31.value);
                                        _30.value = Data_Map.insert(__dict_Ord_171)(k)(_28)(_30.value);
                                        index.value = _28 + 1;
                                        _32.value = Prelude[":"](v)(_32.value);
                                        Data_Traversable["for"](Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_324.values[1])(function (_319) {
                                            return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](__dict_Eq_170)(k)(_319.values[0]))(function __do() {
                                                var _24 = indexOfKey(_319.values[1])();
                                                return (function (_1549) {
                                                    if (_1549.ctor === "Data.Maybe.Nothing") {
                                                        var w = _323(_319.values[1]);
                                                        return function __do() {
                                                            strongConnect(_319.values[1])();
                                                            var _21 = lowlinkOfKey(_319.values[1])();
                                                            return Data_Foldable["for_"](Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_21)(function (lowlink) {
                                                                return Control_Monad_ST.modifySTRef(_30)(Data_Map.alter(__dict_Ord_171)(maybeMin(lowlink))(k));
                                                            })();
                                                        };
                                                    };
                                                    return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Foldable.elem(__dict_Eq_170)(Data_Foldable.foldableArray({}))(_319.values[1])(Data_Array.map(_322)(_32.value)))(function __do() {
                                                        var _22 = indexOfKey(_319.values[1])();
                                                        return Data_Foldable["for_"](Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_22)(function (index) {
                                                            return Control_Monad_ST.modifySTRef(_30)(Data_Map.alter(__dict_Ord_171)(maybeMin(index))(k));
                                                        })();
                                                    });
                                                })(_24)();
                                            });
                                        })();
                                        var _27 = indexOfKey(k)();
                                        var _26 = lowlinkOfKey(k)();
                                        return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](Data_Maybe.eqMaybe(Prelude.eqNumber({})))(_27)(_26))(function __do() {
                                            var _25 = _32.value;
                                            return (function () {
                                                var newPath = popUntil(__dict_Eq_170)(_322)(v)(_25)([  ]);
                                                return function __do() {
                                                    _29.value = Prelude.flip(Prelude["++"](Data_Array.semigroupArray({})))([ makeComponent(newPath.component) ])(_29.value);
                                                    _32.value = newPath.path;
                                                    return Prelude.unit;
                                                };
                                            })()();
                                        })();
                                    };
                                };
                                var indexOf = function (v) {
                                    return indexOfKey(_322(v));
                                };
                                var go = function (_334) {
                                    if (_334.length === 0) {
                                        return Control_Monad_ST.readSTRef(_29);
                                    };
                                    if (_334.length > 0) {
                                        var _1560 = _334.slice(1);
                                        return function __do() {
                                            var _20 = indexOf(_334[0])();
                                            Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isNothing(_20))(strongConnect(_322(_334[0])))();
                                            return go(_1560)();
                                        };
                                    };
                                    throw "Failed pattern match";
                                };
                                return go(_324.values[0]);
                            })()();
                        });
                    };
                };
            };
        };
    };
    var scc = function (__dict_Eq_172) {
        return function (__dict_Ord_173) {
            return scc$prime(__dict_Eq_172)(__dict_Ord_173)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var topSort$prime = function (__dict_Eq_174) {
        return function (__dict_Ord_175) {
            return function (makeKey) {
                return function (makeVert) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.reverse)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.concatMap(vertices))(scc$prime(__dict_Eq_174)(__dict_Ord_175)(makeKey)(makeVert)));
                };
            };
        };
    };
    var topSort = function (__dict_Eq_176) {
        return function (__dict_Ord_177) {
            return topSort$prime(__dict_Eq_176)(__dict_Ord_177)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var eqSCC = function (__dict_Eq_178) {
        return {
            "==": function (_332) {
                return function (_333) {
                    if (_332.ctor === "Data.Graph.AcyclicSCC") {
                        if (_333.ctor === "Data.Graph.AcyclicSCC") {
                            return Prelude["=="](__dict_Eq_178)(_332.values[0])(_333.values[0]);
                        };
                    };
                    if (_332.ctor === "Data.Graph.CyclicSCC") {
                        if (_333.ctor === "Data.Graph.CyclicSCC") {
                            return Prelude["=="](Prelude.eqArray(__dict_Eq_178))(_332.values[0])(_333.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (scc1) {
                return function (scc2) {
                    return !Prelude["=="](eqSCC(__dict_Eq_178))(scc1)(scc2);
                };
            }
        };
    };
    return {
        AcyclicSCC: AcyclicSCC, 
        CyclicSCC: CyclicSCC, 
        Graph: Graph, 
        Edge: Edge, 
        "topSort'": topSort$prime, 
        topSort: topSort, 
        "scc'": scc$prime, 
        scc: scc, 
        vertices: vertices, 
        showSCC: showSCC, 
        eqSCC: eqSCC
    };
})();
PS.Main.main();