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
            show: function (_39) {
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
            show: function (_47) {
                if (_47.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_47.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_47.ctor === "Prelude.EQ") {
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
            show: function (_40) {
                if (_40) {
                    return "true";
                };
                if (!_40) {
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
            "<>": function (_54) {
                return function (_55) {
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
            "==": function (_41) {
                return function (_42) {
                    return true;
                };
            }, 
            "/=": function (_43) {
                return function (_44) {
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
            compare: function (_48) {
                return function (_49) {
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
            compare: function (_50) {
                return function (_51) {
                    if (!_50) {
                        if (!_51) {
                            return EQ;
                        };
                    };
                    if (!_50) {
                        if (_51) {
                            return LT;
                        };
                    };
                    if (_50) {
                        if (_51) {
                            return EQ;
                        };
                    };
                    if (_50) {
                        if (!_51) {
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
    var $$const = function (_35) {
        return function (_36) {
            return _35;
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
                return (function (_363) {
                    if (_363.ctor === "Prelude.LT") {
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
                return (function (_364) {
                    if (_364.ctor === "Prelude.GT") {
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
                return (function (_365) {
                    if (_365.ctor === "Prelude.GT") {
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
                return (function (_366) {
                    if (_366.ctor === "Prelude.LT") {
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
            compare: function (_52) {
                return function (_53) {
                    if (_52.length === 0) {
                        if (_53.length === 0) {
                            return EQ;
                        };
                    };
                    if (_52.length === 0) {
                        return LT;
                    };
                    if (_53.length === 0) {
                        return GT;
                    };
                    if (_52.length > 0) {
                        var _373 = _52.slice(1);
                        if (_53.length > 0) {
                            var _371 = _53.slice(1);
                            return (function (_369) {
                                if (_369.ctor === "Prelude.EQ") {
                                    return compare(ordArray(__dict_Ord_9))(_373)(_371);
                                };
                                return _369;
                            })(compare(__dict_Ord_9)(_52[0])(_53[0]));
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqOrdering = function (_) {
        return {
            "==": function (_45) {
                return function (_46) {
                    if (_45.ctor === "Prelude.LT") {
                        if (_46.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_45.ctor === "Prelude.GT") {
                        if (_46.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_45.ctor === "Prelude.EQ") {
                        if (_46.ctor === "Prelude.EQ") {
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
    var asTypeOf = function (_37) {
        return function (_38) {
            return _37;
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
            show: function (_67) {
                if (_67.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_15)(_67.values[0]) + ")";
                };
                if (_67.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_56) {
        return function (_57) {
            return function (_58) {
                if (_58.ctor === "Data.Maybe.Nothing") {
                    return _56;
                };
                if (_58.ctor === "Data.Maybe.Just") {
                    return _57(_58.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return {
            "<$>": function (_59) {
                return function (_60) {
                    if (_60.ctor === "Data.Maybe.Just") {
                        return Just(_59(_60.values[0]));
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
            "==": function (_68) {
                return function (_69) {
                    if (_68.ctor === "Data.Maybe.Nothing") {
                        if (_69.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_68.ctor === "Data.Maybe.Just") {
                        if (_69.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_17)(_68.values[0])(_69.values[0]);
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
            compare: function (_70) {
                return function (_71) {
                    if (_70.ctor === "Data.Maybe.Just") {
                        if (_71.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_16)(_70.values[0])(_71.values[0]);
                        };
                    };
                    if (_70.ctor === "Data.Maybe.Nothing") {
                        if (_71.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_70.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_71.ctor === "Data.Maybe.Nothing") {
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
            "<*>": function (_61) {
                return function (_62) {
                    if (_61.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_61.values[0])(_62);
                    };
                    if (_61.ctor === "Data.Maybe.Nothing") {
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
            ">>=": function (_65) {
                return function (_66) {
                    if (_65.ctor === "Data.Maybe.Just") {
                        return _66(_65.values[0]);
                    };
                    if (_65.ctor === "Data.Maybe.Nothing") {
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
            "<|>": function (_63) {
                return function (_64) {
                    if (_63.ctor === "Data.Maybe.Nothing") {
                        return _64;
                    };
                    return _63;
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
    var fromJust = function (_72) {
        if (_72.ctor === "Data.Maybe.Just") {
            return _72.values[0];
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
    var liftRef = function (_73) {
        return function (_74) {
            return function (_75) {
                return _73(_74.values[0])(_75.values[0]);
            };
        };
    };
    var functorRef = function (_) {
        return {
            "<$>": function (_76) {
                return function (_77) {
                    return Ref(_76(_77.values[0]));
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
                show: function (_85) {
                    if (_85.ctor === "Data.Either.Left") {
                        return "Left (" + Prelude.show(__dict_Show_18)(_85.values[0]) + ")";
                    };
                    if (_85.ctor === "Data.Either.Right") {
                        return "Right (" + Prelude.show(__dict_Show_19)(_85.values[0]) + ")";
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var functorEither = function (_) {
        return {
            "<$>": function (_81) {
                return function (_82) {
                    if (_82.ctor === "Data.Either.Left") {
                        return Left(_82.values[0]);
                    };
                    if (_82.ctor === "Data.Either.Right") {
                        return Right(_81(_82.values[0]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var eqEither = function (__dict_Eq_22) {
        return function (__dict_Eq_23) {
            return {
                "==": function (_86) {
                    return function (_87) {
                        if (_86.ctor === "Data.Either.Left") {
                            if (_87.ctor === "Data.Either.Left") {
                                return Prelude["=="](__dict_Eq_22)(_86.values[0])(_87.values[0]);
                            };
                        };
                        if (_86.ctor === "Data.Either.Right") {
                            if (_87.ctor === "Data.Either.Right") {
                                return Prelude["=="](__dict_Eq_23)(_86.values[0])(_87.values[0]);
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
                compare: function (_88) {
                    return function (_89) {
                        if (_88.ctor === "Data.Either.Left") {
                            if (_89.ctor === "Data.Either.Left") {
                                return Prelude.compare(__dict_Ord_20)(_88.values[0])(_89.values[0]);
                            };
                        };
                        if (_88.ctor === "Data.Either.Right") {
                            if (_89.ctor === "Data.Either.Right") {
                                return Prelude.compare(__dict_Ord_21)(_88.values[0])(_89.values[0]);
                            };
                        };
                        if (_88.ctor === "Data.Either.Left") {
                            return Prelude.LT;
                        };
                        if (_89.ctor === "Data.Either.Left") {
                            return Prelude.GT;
                        };
                        throw "Failed pattern match";
                    };
                }
            };
        };
    };
    var either = function (_78) {
        return function (_79) {
            return function (_80) {
                if (_80.ctor === "Data.Either.Left") {
                    return _78(_80.values[0]);
                };
                if (_80.ctor === "Data.Either.Right") {
                    return _79(_80.values[0]);
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
            "<*>": function (_83) {
                return function (_84) {
                    if (_83.ctor === "Data.Either.Left") {
                        return Left(_83.values[0]);
                    };
                    if (_83.ctor === "Data.Either.Right") {
                        return Prelude["<$>"](functorEither({}))(_83.values[0])(_84);
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
    var tail = function (_92) {
        if (_92.length > 0) {
            var _447 = _92.slice(1);
            return Data_Maybe.Just(_447);
        };
        return Data_Maybe.Nothing;
    };
    var span = (function () {
        var go = function (__copy__108) {
            return function (__copy__109) {
                return function (__copy__110) {
                    var _108 = __copy__108;
                    var _109 = __copy__109;
                    var _110 = __copy__110;
                    tco: while (true) {
                        var acc = _108;
                        if (_110.length > 0) {
                            var _452 = _110.slice(1);
                            if (_109(_110[0])) {
                                var __tco__108 = Prelude[":"](_110[0])(acc);
                                var __tco__109 = _109;
                                _108 = __tco__108;
                                _109 = __tco__109;
                                _110 = _452;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_108), 
                            rest: _110
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
                    return (function (_453) {
                        if (_453.ctor === "Prelude.GT") {
                            return 1;
                        };
                        if (_453.ctor === "Prelude.EQ") {
                            return 0;
                        };
                        if (_453.ctor === "Prelude.LT") {
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
    var $$null = function (_94) {
        if (_94.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_101) {
        return function (_102) {
            if (_102.length === 0) {
                return [  ];
            };
            if (_102.length > 0) {
                var _458 = _102.slice(1);
                return Prelude[":"](_102[0])(nubBy(_101)(filter(function (y) {
                    return !_101(_102[0])(y);
                })(_458)));
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
    var last = function (__copy__91) {
        var _91 = __copy__91;
        tco: while (true) {
            if (_91.length > 0) {
                var _461 = _91.slice(1);
                if (_461.length === 0) {
                    return Data_Maybe.Just(_91[0]);
                };
            };
            if (_91.length > 0) {
                var _463 = _91.slice(1);
                _91 = _463;
                continue tco;
            };
            return Data_Maybe.Nothing;
        };
    };
    var intersectBy = function (_98) {
        return function (_99) {
            return function (_100) {
                if (_99.length === 0) {
                    return [  ];
                };
                if (_100.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_98(x))(_100) >= 0;
                };
                return filter(el)(_99);
            };
        };
    };
    var intersect = function (__dict_Eq_26) {
        return intersectBy(Prelude["=="](__dict_Eq_26));
    };
    var init = function (_93) {
        if (_93.length === 0) {
            return Data_Maybe.Nothing;
        };
        return Data_Maybe.Just(slice(0)(length(_93) - 1)(_93));
    };
    var head = function (_90) {
        if (_90.length > 0) {
            var _470 = _90.slice(1);
            return Data_Maybe.Just(_90[0]);
        };
        return Data_Maybe.Nothing;
    };
    var groupBy = (function () {
        var go = function (__copy__105) {
            return function (__copy__106) {
                return function (__copy__107) {
                    var _105 = __copy__105;
                    var _106 = __copy__106;
                    var _107 = __copy__107;
                    tco: while (true) {
                        var acc = _105;
                        if (_107.length === 0) {
                            return reverse(acc);
                        };
                        if (_107.length > 0) {
                            var _475 = _107.slice(1);
                            var sp = span(_106(_107[0]))(_475);
                            var __tco__105 = Prelude[":"](Prelude[":"](_107[0])(sp.init))(_105);
                            var __tco__106 = _106;
                            _105 = __tco__105;
                            _106 = __tco__106;
                            _107 = sp.rest;
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
    var deleteBy = function (_95) {
        return function (_96) {
            return function (_97) {
                if (_97.length === 0) {
                    return [  ];
                };
                return (function (_479) {
                    if (_479 < 0) {
                        return _97;
                    };
                    return deleteAt(_479)(1)(_97);
                })(findIndex(_95(_96))(_97));
            };
        };
    };
    var $$delete = function (__dict_Eq_31) {
        return deleteBy(Prelude["=="](__dict_Eq_31));
    };
    var $bslash$bslash = function (__dict_Eq_32) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__103) {
                    return function (__copy__104) {
                        var _103 = __copy__103;
                        var _104 = __copy__104;
                        tco: while (true) {
                            var xs = _103;
                            if (_104.length === 0) {
                                return xs;
                            };
                            if (_103.length === 0) {
                                return [  ];
                            };
                            if (_104.length > 0) {
                                var _483 = _104.slice(1);
                                var __tco__103 = $$delete(__dict_Eq_32)(_104[0])(_103);
                                _103 = __tco__103;
                                _104 = _483;
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
    var tail = function (_112) {
        if (_112.length > 0) {
            var _486 = _112.slice(1);
            return _486;
        };
        throw "Failed pattern match";
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_111) {
        if (_111.length > 0) {
            var _489 = _111.slice(1);
            return _111[0];
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
            show: function (_118) {
                return "All (" + Prelude.show(Prelude.showBoolean({}))(_118.values[0]) + ")";
            }
        };
    };
    var semigroupAll = function (_) {
        return {
            "<>": function (_119) {
                return function (_120) {
                    return All(_119.values[0] && _120.values[0]);
                };
            }
        };
    };
    var runAll = function (_113) {
        return _113.values[0];
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
            "==": function (_114) {
                return function (_115) {
                    return _114.values[0] === _115.values[0];
                };
            }, 
            "/=": function (_116) {
                return function (_117) {
                    return _116.values[0] !== _117.values[0];
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
            show: function (_126) {
                return "Any (" + Prelude.show(Prelude.showBoolean({}))(_126.values[0]) + ")";
            }
        };
    };
    var semigroupAny = function (_) {
        return {
            "<>": function (_127) {
                return function (_128) {
                    return Any(_127.values[0] || _128.values[0]);
                };
            }
        };
    };
    var runAny = function (_121) {
        return _121.values[0];
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
            "==": function (_122) {
                return function (_123) {
                    return _122.values[0] === _123.values[0];
                };
            }, 
            "/=": function (_124) {
                return function (_125) {
                    return _124.values[0] !== _125.values[0];
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
            show: function (_136) {
                return "Dual (" + Prelude.show(__dict_Show_33)(_136.values[0]) + ")";
            }
        };
    };
    var semigroupDual = function (__dict_Semigroup_34) {
        return {
            "<>": function (_137) {
                return function (_138) {
                    return Dual(Prelude["<>"](__dict_Semigroup_34)(_138.values[0])(_137.values[0]));
                };
            }
        };
    };
    var runDual = function (_129) {
        return _129.values[0];
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
            "==": function (_130) {
                return function (_131) {
                    return Prelude["=="](__dict_Eq_37)(_130.values[0])(_131.values[0]);
                };
            }, 
            "/=": function (_132) {
                return function (_133) {
                    return Prelude["/="](__dict_Eq_37)(_132.values[0])(_133.values[0]);
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
            compare: function (_134) {
                return function (_135) {
                    return Prelude.compare(__dict_Ord_35)(_134.values[0])(_135.values[0]);
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
            "<>": function (_140) {
                return function (_141) {
                    return Endo(Prelude["<<<"](Prelude.semigroupoidArr({}))(_140.values[0])(_141.values[0]));
                };
            }
        };
    };
    var runEndo = function (_139) {
        return _139.values[0];
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
            show: function (_149) {
                return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_38))(_149.values[0]) + ")";
            }
        };
    };
    var semigroupFirst = function (_) {
        return {
            "<>": function (_150) {
                return function (_151) {
                    if ((_150.values[0]).ctor === "Data.Maybe.Just") {
                        return _150;
                    };
                    return _151;
                };
            }
        };
    };
    var runFirst = function (_142) {
        return _142.values[0];
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
            "==": function (_143) {
                return function (_144) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_40))(_143.values[0])(_144.values[0]);
                };
            }, 
            "/=": function (_145) {
                return function (_146) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_40))(_145.values[0])(_146.values[0]);
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
            compare: function (_147) {
                return function (_148) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_39))(_147.values[0])(_148.values[0]);
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
            show: function (_159) {
                return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_41))(_159.values[0]) + ")";
            }
        };
    };
    var semigroupLast = function (_) {
        return {
            "<>": function (_160) {
                return function (_161) {
                    if ((_161.values[0]).ctor === "Data.Maybe.Just") {
                        return _161;
                    };
                    if ((_161.values[0]).ctor === "Data.Maybe.Nothing") {
                        return _160;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var runLast = function (_152) {
        return _152.values[0];
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
            "==": function (_153) {
                return function (_154) {
                    return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_43))(_153.values[0])(_154.values[0]);
                };
            }, 
            "/=": function (_155) {
                return function (_156) {
                    return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_43))(_155.values[0])(_156.values[0]);
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
            compare: function (_157) {
                return function (_158) {
                    return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_42))(_157.values[0])(_158.values[0]);
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
            show: function (_169) {
                return "Product (" + Prelude.show(Prelude.showNumber({}))(_169.values[0]) + ")";
            }
        };
    };
    var semigroupProduct = function (_) {
        return {
            "<>": function (_170) {
                return function (_171) {
                    return Product(_170.values[0] * _171.values[0]);
                };
            }
        };
    };
    var runProduct = function (_162) {
        return _162.values[0];
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
            "==": function (_163) {
                return function (_164) {
                    return _163.values[0] === _164.values[0];
                };
            }, 
            "/=": function (_165) {
                return function (_166) {
                    return _165.values[0] !== _166.values[0];
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
            compare: function (_167) {
                return function (_168) {
                    return Prelude.compare(Prelude.ordNumber({}))(_167.values[0])(_168.values[0]);
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
            show: function (_179) {
                return "Sum (" + Prelude.show(Prelude.showNumber({}))(_179.values[0]) + ")";
            }
        };
    };
    var semigroupSum = function (_) {
        return {
            "<>": function (_180) {
                return function (_181) {
                    return Sum(_180.values[0] + _181.values[0]);
                };
            }
        };
    };
    var runSum = function (_172) {
        return _172.values[0];
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
            "==": function (_173) {
                return function (_174) {
                    return _173.values[0] === _174.values[0];
                };
            }, 
            "/=": function (_175) {
                return function (_176) {
                    return _175.values[0] !== _176.values[0];
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
            compare: function (_177) {
                return function (_178) {
                    return Prelude.compare(Prelude.ordNumber({}))(_177.values[0])(_178.values[0]);
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
    var unzip = function (_186) {
        if (_186.length > 0) {
            var _634 = _186.slice(1);
            return (function (_630) {
                return Tuple(Prelude[":"]((_186[0]).values[0])(_630.values[0]))(Prelude[":"]((_186[0]).values[1])(_630.values[1]));
            })(unzip(_634));
        };
        if (_186.length === 0) {
            return Tuple([  ])([  ]);
        };
        throw "Failed pattern match";
    };
    var uncurry = function (_184) {
        return function (_185) {
            return _184(_185.values[0])(_185.values[1]);
        };
    };
    var swap = function (_187) {
        return Tuple(_187.values[1])(_187.values[0]);
    };
    var snd = function (_183) {
        return _183.values[1];
    };
    var showTuple = function (__dict_Show_44) {
        return function (__dict_Show_45) {
            return {
                show: function (_188) {
                    return "Tuple (" + Prelude.show(__dict_Show_44)(_188.values[0]) + ") (" + Prelude.show(__dict_Show_45)(_188.values[1]) + ")";
                }
            };
        };
    };
    var functorTuple = function (_) {
        return {
            "<$>": function (_193) {
                return function (_194) {
                    return Tuple(_194.values[0])(_193(_194.values[1]));
                };
            }
        };
    };
    var fst = function (_182) {
        return _182.values[0];
    };
    var eqTuple = function (__dict_Eq_49) {
        return function (__dict_Eq_50) {
            return {
                "==": function (_189) {
                    return function (_190) {
                        return Prelude["=="](__dict_Eq_49)(_189.values[0])(_190.values[0]) && Prelude["=="](__dict_Eq_50)(_189.values[1])(_190.values[1]);
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
                compare: function (_191) {
                    return function (_192) {
                        return (function (_665) {
                            if (_665.ctor === "Prelude.EQ") {
                                return Prelude.compare(__dict_Ord_47)(_191.values[1])(_192.values[1]);
                            };
                            return _665;
                        })(Prelude.compare(__dict_Ord_46)(_191.values[0])(_192.values[0]));
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
            "<*>": function (_195) {
                return function (_196) {
                    return Tuple(Prelude["<>"](__dict_Semigroup_52)(_195.values[0])(_196.values[0]))(_195.values[1](_196.values[1]));
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
            ">>=": function (_197) {
                return function (_198) {
                    return (function (_678) {
                        return Tuple(Prelude["<>"](__dict_Semigroup_51)(_197.values[0])(_678.values[0]))(_678.values[1]);
                    })(_198(_197.values[1]));
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
        return function (_204) {
            return function (_205) {
                if (_204) {
                    return _205;
                };
                if (!_204) {
                    return Prelude["return"](__dict_Monad_55)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var unless = function (__dict_Monad_56) {
        return function (_206) {
            return function (_207) {
                if (!_206) {
                    return _207;
                };
                if (_206) {
                    return Prelude["return"](__dict_Monad_56)(Prelude.unit);
                };
                throw "Failed pattern match";
            };
        };
    };
    var replicateM = function (__dict_Monad_57) {
        return function (_199) {
            return function (_200) {
                if (_199 === 0) {
                    return Prelude["return"](__dict_Monad_57)([  ]);
                };
                return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(_200)(function (_4) {
                    return Prelude[">>="](__dict_Monad_57["__superclasses"]["Prelude.Bind_1"]({}))(replicateM(__dict_Monad_57)(_199 - 1)(_200))(function (_3) {
                        return Prelude["return"](__dict_Monad_57)(Prelude[":"](_4)(_3));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_58) {
        return function (_201) {
            return function (_202) {
                return function (_203) {
                    if (_203.length === 0) {
                        return Prelude["return"](__dict_Monad_58)(_202);
                    };
                    if (_203.length > 0) {
                        var _695 = _203.slice(1);
                        return Prelude[">>="](__dict_Monad_58["__superclasses"]["Prelude.Bind_1"]({}))(_201(_202)(_203[0]))(function (a$prime) {
                            return foldM(__dict_Monad_58)(_201)(a$prime)(_695);
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
            foldr: function (_233) {
                return function (_234) {
                    return function (_235) {
                        return _233(_235.values[1])(_234);
                    };
                };
            }, 
            foldl: function (_236) {
                return function (_237) {
                    return function (_238) {
                        return _236(_237)(_238.values[1]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_82) {
                return function (_239) {
                    return function (_240) {
                        return _239(_240.values[1]);
                    };
                };
            }
        };
    };
    var foldableRef = function (_) {
        return {
            foldr: function (_225) {
                return function (_226) {
                    return function (_227) {
                        return _225(_227.values[0])(_226);
                    };
                };
            }, 
            foldl: function (_228) {
                return function (_229) {
                    return function (_230) {
                        return _228(_229)(_230.values[0]);
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_83) {
                return function (_231) {
                    return function (_232) {
                        return _231(_232.values[0]);
                    };
                };
            }
        };
    };
    var foldableMaybe = function (_) {
        return {
            foldr: function (_217) {
                return function (_218) {
                    return function (_219) {
                        if (_219.ctor === "Data.Maybe.Nothing") {
                            return _218;
                        };
                        if (_219.ctor === "Data.Maybe.Just") {
                            return _217(_219.values[0])(_218);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_220) {
                return function (_221) {
                    return function (_222) {
                        if (_222.ctor === "Data.Maybe.Nothing") {
                            return _221;
                        };
                        if (_222.ctor === "Data.Maybe.Just") {
                            return _220(_221)(_222.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_84) {
                return function (_223) {
                    return function (_224) {
                        if (_224.ctor === "Data.Maybe.Nothing") {
                            return Data_Monoid.mempty(__dict_Monoid_84);
                        };
                        if (_224.ctor === "Data.Maybe.Just") {
                            return _223(_224.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }
        };
    };
    var foldableEither = function (_) {
        return {
            foldr: function (_209) {
                return function (_210) {
                    return function (_211) {
                        if (_211.ctor === "Data.Either.Left") {
                            return _210;
                        };
                        if (_211.ctor === "Data.Either.Right") {
                            return _209(_211.values[0])(_210);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldl: function (_212) {
                return function (_213) {
                    return function (_214) {
                        if (_214.ctor === "Data.Either.Left") {
                            return _213;
                        };
                        if (_214.ctor === "Data.Either.Right") {
                            return _212(_213)(_214.values[0]);
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            foldMap: function (__dict_Monoid_85) {
                return function (_215) {
                    return function (_216) {
                        if (_216.ctor === "Data.Either.Left") {
                            return Data_Monoid.mempty(__dict_Monoid_85);
                        };
                        if (_216.ctor === "Data.Either.Right") {
                            return _215(_216.values[0]);
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
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_88)(Data_Monoid_First.monoidFirst({}))(function (_208) {
                        return Data_Monoid_First.First(Prelude["=="](__dict_Eq_87)(a)(_208.values[0]) ? Data_Maybe.Just(_208.values[1]) : Data_Maybe.Nothing);
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
                return (function (_749) {
                    if (_749.length > 0) {
                        var _751 = _749.slice(1);
                        return Data_Maybe.Just(_749[0]);
                    };
                    if (_749.length === 0) {
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
    var values = function (_251) {
        if (_251.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_251.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_251.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _251.values[2] ])(values(_251.values[3])));
        };
        if (_251.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_251.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _251.values[2] ])(Prelude["++"](Data_Array.semigroupArray({}))(values(_251.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ _251.values[5] ])(values(_251.values[6])))));
        };
        throw "Failed pattern match";
    };
    var toList = function (_249) {
        if (_249.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_249.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_249.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_249.values[1])(_249.values[2]) ])(toList(_249.values[3])));
        };
        if (_249.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_249.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_249.values[1])(_249.values[2]) ])(Prelude["++"](Data_Array.semigroupArray({}))(toList(_249.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ Data_Tuple.Tuple(_249.values[4])(_249.values[5]) ])(toList(_249.values[6])))));
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
            return function (_243) {
                if (_243.ctor === "Data.Map.Leaf") {
                    return "Leaf";
                };
                if (_243.ctor === "Data.Map.Two") {
                    return "Two (" + showTree(__dict_Show_99)(__dict_Show_100)(_243.values[0]) + ") (" + Prelude.show(__dict_Show_99)(_243.values[1]) + ") (" + Prelude.show(__dict_Show_100)(_243.values[2]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_243.values[3]) + ")";
                };
                if (_243.ctor === "Data.Map.Three") {
                    return "Three (" + showTree(__dict_Show_99)(__dict_Show_100)(_243.values[0]) + ") (" + Prelude.show(__dict_Show_99)(_243.values[1]) + ") (" + Prelude.show(__dict_Show_100)(_243.values[2]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_243.values[3]) + ") (" + Prelude.show(__dict_Show_99)(_243.values[4]) + ") (" + Prelude.show(__dict_Show_100)(_243.values[5]) + ") (" + showTree(__dict_Show_99)(__dict_Show_100)(_243.values[6]) + ")";
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
        return function (__copy__245) {
            return function (__copy__246) {
                var __dict_Ord_103 = __copy___dict_Ord_103;
                var _245 = __copy__245;
                var _246 = __copy__246;
                tco: while (true) {
                    var _ = _245;
                    if (_246.ctor === "Data.Map.Leaf") {
                        return Data_Maybe.Nothing;
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Two") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_246.values[1])) {
                            return Data_Maybe.Just(_246.values[2]);
                        };
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Two") {
                        if (Prelude["<"](__dict_Ord_103)(k)(_246.values[1])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__246 = _246.values[0];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _245 = k;
                            _246 = __tco__246;
                            continue tco;
                        };
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Two") {
                        var _ = _246.values[0];
                        var _ = _246.values[1];
                        var __tco___dict_Ord_103 = __dict_Ord_103;
                        var __tco__246 = _246.values[3];
                        __dict_Ord_103 = __tco___dict_Ord_103;
                        _245 = k;
                        _246 = __tco__246;
                        continue tco;
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Three") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_246.values[1])) {
                            return Data_Maybe.Just(_246.values[2]);
                        };
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Three") {
                        if (Prelude["=="](__dict_Ord_103["__superclasses"]["Prelude.Eq_0"]({}))(k)(_246.values[4])) {
                            return Data_Maybe.Just(_246.values[5]);
                        };
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Three") {
                        var _ = _246.values[2];
                        var _ = _246.values[3];
                        var _ = _246.values[4];
                        if (Prelude["<"](__dict_Ord_103)(k)(_246.values[1])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__246 = _246.values[0];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _245 = k;
                            _246 = __tco__246;
                            continue tco;
                        };
                    };
                    var k = _245;
                    if (_246.ctor === "Data.Map.Three") {
                        var _ = _246.values[0];
                        var _ = _246.values[2];
                        if (Prelude["<"](__dict_Ord_103)(_246.values[1])(k) && Prelude["<="](__dict_Ord_103)(k)(_246.values[4])) {
                            var __tco___dict_Ord_103 = __dict_Ord_103;
                            var __tco__246 = _246.values[3];
                            __dict_Ord_103 = __tco___dict_Ord_103;
                            _245 = k;
                            _246 = __tco__246;
                            continue tco;
                        };
                    };
                    if (_246.ctor === "Data.Map.Three") {
                        var _ = _246.values[0];
                        var _ = _246.values[1];
                        var _ = _246.values[2];
                        var _ = _246.values[3];
                        var _ = _246.values[4];
                        var __tco___dict_Ord_103 = __dict_Ord_103;
                        var __tco__245 = _245;
                        var __tco__246 = _246.values[6];
                        __dict_Ord_103 = __tco___dict_Ord_103;
                        _245 = __tco__245;
                        _246 = __tco__246;
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
    var keys = function (_250) {
        if (_250.ctor === "Data.Map.Leaf") {
            return [  ];
        };
        if (_250.ctor === "Data.Map.Two") {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_250.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[1] ])(keys(_250.values[3])));
        };
        if (_250.ctor === "Data.Map.Three") {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_250.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[1] ])(Prelude["++"](Data_Array.semigroupArray({}))(keys(_250.values[3]))(Prelude["++"](Data_Array.semigroupArray({}))([ _250.values[4] ])(keys(_250.values[6])))));
        };
        throw "Failed pattern match";
    };
    var isEmpty = function (_244) {
        if (_244.ctor === "Data.Map.Leaf") {
            return true;
        };
        return false;
    };
    var functorMap = function (_) {
        return {
            "<$>": function (_252) {
                return function (_253) {
                    if (_253.ctor === "Data.Map.Leaf") {
                        return Leaf;
                    };
                    if (_253.ctor === "Data.Map.Two") {
                        return Two(Prelude["<$>"](functorMap({}))(_252)(_253.values[0]))(_253.values[1])(_252(_253.values[2]))(Prelude["<$>"](functorMap({}))(_252)(_253.values[3]));
                    };
                    if (_253.ctor === "Data.Map.Three") {
                        return Three(Prelude["<$>"](functorMap({}))(_252)(_253.values[0]))(_253.values[1])(_252(_253.values[2]))(Prelude["<$>"](functorMap({}))(_252)(_253.values[3]))(_253.values[4])(_252(_253.values[5]))(Prelude["<$>"](functorMap({}))(_252)(_253.values[6]));
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var map = Prelude["<$>"](functorMap({}));
    var fromZipper = function (__copy___dict_Ord_105) {
        return function (__copy__247) {
            return function (__copy__248) {
                var __dict_Ord_105 = __copy___dict_Ord_105;
                var _247 = __copy__247;
                var _248 = __copy__248;
                tco: while (true) {
                    if (_247.length === 0) {
                        return _248;
                    };
                    if (_247.length > 0) {
                        var _866 = _247.slice(1);
                        if ((_247[0]).ctor === "Data.Map.TwoLeft") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__248 = Two(_248)((_247[0]).values[0])((_247[0]).values[1])((_247[0]).values[2]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _247 = _866;
                            _248 = __tco__248;
                            continue tco;
                        };
                    };
                    if (_247.length > 0) {
                        var _871 = _247.slice(1);
                        if ((_247[0]).ctor === "Data.Map.TwoRight") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__248 = Two((_247[0]).values[0])((_247[0]).values[1])((_247[0]).values[2])(_248);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _247 = _871;
                            _248 = __tco__248;
                            continue tco;
                        };
                    };
                    if (_247.length > 0) {
                        var _876 = _247.slice(1);
                        if ((_247[0]).ctor === "Data.Map.ThreeLeft") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__248 = Three(_248)((_247[0]).values[0])((_247[0]).values[1])((_247[0]).values[2])((_247[0]).values[3])((_247[0]).values[4])((_247[0]).values[5]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _247 = _876;
                            _248 = __tco__248;
                            continue tco;
                        };
                    };
                    if (_247.length > 0) {
                        var _884 = _247.slice(1);
                        if ((_247[0]).ctor === "Data.Map.ThreeMiddle") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__248 = Three((_247[0]).values[0])((_247[0]).values[1])((_247[0]).values[2])(_248)((_247[0]).values[3])((_247[0]).values[4])((_247[0]).values[5]);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _247 = _884;
                            _248 = __tco__248;
                            continue tco;
                        };
                    };
                    if (_247.length > 0) {
                        var _892 = _247.slice(1);
                        if ((_247[0]).ctor === "Data.Map.ThreeRight") {
                            var __tco___dict_Ord_105 = __dict_Ord_105;
                            var __tco__248 = Three((_247[0]).values[0])((_247[0]).values[1])((_247[0]).values[2])((_247[0]).values[3])((_247[0]).values[4])((_247[0]).values[5])(_248);
                            __dict_Ord_105 = __tco___dict_Ord_105;
                            _247 = _892;
                            _248 = __tco__248;
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
            return function (__copy__259) {
                return function (__copy__260) {
                    var __dict_Ord_107 = __copy___dict_Ord_107;
                    var _259 = __copy__259;
                    var _260 = __copy__260;
                    tco: while (true) {
                        if (_259.length === 0) {
                            return Two(_260.values[0])(_260.values[1])(_260.values[2])(_260.values[3]);
                        };
                        if (_259.length > 0) {
                            var _910 = _259.slice(1);
                            if ((_259[0]).ctor === "Data.Map.TwoLeft") {
                                return fromZipper(__dict_Ord_107)(_910)(Three(_260.values[0])(_260.values[1])(_260.values[2])(_260.values[3])((_259[0]).values[0])((_259[0]).values[1])((_259[0]).values[2]));
                            };
                        };
                        if (_259.length > 0) {
                            var _919 = _259.slice(1);
                            if ((_259[0]).ctor === "Data.Map.TwoRight") {
                                return fromZipper(__dict_Ord_107)(_919)(Three((_259[0]).values[0])((_259[0]).values[1])((_259[0]).values[2])(_260.values[0])(_260.values[1])(_260.values[2])(_260.values[3]));
                            };
                        };
                        if (_259.length > 0) {
                            var _928 = _259.slice(1);
                            if ((_259[0]).ctor === "Data.Map.ThreeLeft") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__260 = KickUp(Two(_260.values[0])(_260.values[1])(_260.values[2])(_260.values[3]))((_259[0]).values[0])((_259[0]).values[1])(Two((_259[0]).values[2])((_259[0]).values[3])((_259[0]).values[4])((_259[0]).values[5]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _259 = _928;
                                _260 = __tco__260;
                                continue tco;
                            };
                        };
                        if (_259.length > 0) {
                            var _940 = _259.slice(1);
                            if ((_259[0]).ctor === "Data.Map.ThreeMiddle") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__260 = KickUp(Two((_259[0]).values[0])((_259[0]).values[1])((_259[0]).values[2])(_260.values[0]))(_260.values[1])(_260.values[2])(Two(_260.values[3])((_259[0]).values[3])((_259[0]).values[4])((_259[0]).values[5]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _259 = _940;
                                _260 = __tco__260;
                                continue tco;
                            };
                        };
                        if (_259.length > 0) {
                            var _952 = _259.slice(1);
                            if ((_259[0]).ctor === "Data.Map.ThreeRight") {
                                var __tco___dict_Ord_107 = __dict_Ord_107;
                                var __tco__260 = KickUp(Two((_259[0]).values[0])((_259[0]).values[1])((_259[0]).values[2])((_259[0]).values[3]))((_259[0]).values[4])((_259[0]).values[5])(Two(_260.values[0])(_260.values[1])(_260.values[2])(_260.values[3]));
                                __dict_Ord_107 = __tco___dict_Ord_107;
                                _259 = _952;
                                _260 = __tco__260;
                                continue tco;
                            };
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var down = function (__copy___dict_Ord_108) {
            return function (__copy__255) {
                return function (__copy__256) {
                    return function (__copy__257) {
                        return function (__copy__258) {
                            var __dict_Ord_108 = __copy___dict_Ord_108;
                            var _255 = __copy__255;
                            var _256 = __copy__256;
                            var _257 = __copy__257;
                            var _258 = __copy__258;
                            tco: while (true) {
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Leaf") {
                                    return up(__dict_Ord_108)(ctx)(KickUp(Leaf)(k)(v)(Leaf));
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Two") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_258.values[1])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Two(_258.values[0])(k)(v)(_258.values[3]));
                                    };
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Two") {
                                    if (Prelude["<"](__dict_Ord_108)(k)(_258.values[1])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__255 = Prelude[":"](TwoLeft(_258.values[1])(_258.values[2])(_258.values[3]))(ctx);
                                        var __tco__258 = _258.values[0];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _255 = __tco__255;
                                        _256 = k;
                                        _257 = v;
                                        _258 = __tco__258;
                                        continue tco;
                                    };
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_108 = __dict_Ord_108;
                                    var __tco__255 = Prelude[":"](TwoRight(_258.values[0])(_258.values[1])(_258.values[2]))(ctx);
                                    var __tco__258 = _258.values[3];
                                    __dict_Ord_108 = __tco___dict_Ord_108;
                                    _255 = __tco__255;
                                    _256 = k;
                                    _257 = v;
                                    _258 = __tco__258;
                                    continue tco;
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Three") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_258.values[1])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Three(_258.values[0])(k)(v)(_258.values[3])(_258.values[4])(_258.values[5])(_258.values[6]));
                                    };
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Three") {
                                    if (Prelude["=="](__dict_Ord_108["__superclasses"]["Prelude.Eq_0"]({}))(k)(_258.values[4])) {
                                        return fromZipper(__dict_Ord_108)(ctx)(Three(_258.values[0])(_258.values[1])(_258.values[2])(_258.values[3])(k)(v)(_258.values[6]));
                                    };
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Three") {
                                    if (Prelude["<"](__dict_Ord_108)(k)(_258.values[1])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__255 = Prelude[":"](ThreeLeft(_258.values[1])(_258.values[2])(_258.values[3])(_258.values[4])(_258.values[5])(_258.values[6]))(ctx);
                                        var __tco__258 = _258.values[0];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _255 = __tco__255;
                                        _256 = k;
                                        _257 = v;
                                        _258 = __tco__258;
                                        continue tco;
                                    };
                                };
                                var ctx = _255;
                                var k = _256;
                                var v = _257;
                                if (_258.ctor === "Data.Map.Three") {
                                    if (Prelude["<"](__dict_Ord_108)(_258.values[1])(k) && Prelude["<="](__dict_Ord_108)(k)(_258.values[4])) {
                                        var __tco___dict_Ord_108 = __dict_Ord_108;
                                        var __tco__255 = Prelude[":"](ThreeMiddle(_258.values[0])(_258.values[1])(_258.values[2])(_258.values[4])(_258.values[5])(_258.values[6]))(ctx);
                                        var __tco__258 = _258.values[3];
                                        __dict_Ord_108 = __tco___dict_Ord_108;
                                        _255 = __tco__255;
                                        _256 = k;
                                        _257 = v;
                                        _258 = __tco__258;
                                        continue tco;
                                    };
                                };
                                if (_258.ctor === "Data.Map.Three") {
                                    var __tco___dict_Ord_108 = __dict_Ord_108;
                                    var __tco__255 = Prelude[":"](ThreeRight(_258.values[0])(_258.values[1])(_258.values[2])(_258.values[3])(_258.values[4])(_258.values[5]))(_255);
                                    var __tco__256 = _256;
                                    var __tco__257 = _257;
                                    var __tco__258 = _258.values[6];
                                    __dict_Ord_108 = __tco___dict_Ord_108;
                                    _255 = __tco__255;
                                    _256 = __tco__256;
                                    _257 = __tco__257;
                                    _258 = __tco__258;
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
                    return function (_242) {
                        return insert(__dict_Ord_109)(_242.values[0])(_242.values[1])(m);
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
            return function (_241) {
                return insert(__dict_Ord_112)(_241.values[0])(_241.values[1])(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_113) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_113))(empty);
    };
    var $$delete = function (__dict_Ord_114) {
        var up = function (__copy___dict_Ord_115) {
            return function (__copy__264) {
                return function (__copy__265) {
                    var __dict_Ord_115 = __copy___dict_Ord_115;
                    var _264 = __copy__264;
                    var _265 = __copy__265;
                    tco: while (true) {
                        if (_264.length === 0) {
                            return _265;
                        };
                        if (_264.length > 0) {
                            var _1019 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Leaf") {
                                    if (_265.ctor === "Data.Map.Leaf") {
                                        return fromZipper(__dict_Ord_115)(_1019)(Two(Leaf)((_264[0]).values[0])((_264[0]).values[1])(Leaf));
                                    };
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1024 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoRight") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (_265.ctor === "Data.Map.Leaf") {
                                        return fromZipper(__dict_Ord_115)(_1024)(Two(Leaf)((_264[0]).values[1])((_264[0]).values[2])(Leaf));
                                    };
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1029 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_115 = __dict_Ord_115;
                                    var __tco__265 = Three(_265)((_264[0]).values[0])((_264[0]).values[1])(((_264[0]).values[2]).values[0])(((_264[0]).values[2]).values[1])(((_264[0]).values[2]).values[2])(((_264[0]).values[2]).values[3]);
                                    __dict_Ord_115 = __tco___dict_Ord_115;
                                    _264 = _1029;
                                    _265 = __tco__265;
                                    continue tco;
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1038 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoRight") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Two") {
                                    var __tco___dict_Ord_115 = __dict_Ord_115;
                                    var __tco__265 = Three(((_264[0]).values[0]).values[0])(((_264[0]).values[0]).values[1])(((_264[0]).values[0]).values[2])(((_264[0]).values[0]).values[3])((_264[0]).values[1])((_264[0]).values[2])(_265);
                                    __dict_Ord_115 = __tco___dict_Ord_115;
                                    _264 = _1038;
                                    _265 = __tco__265;
                                    continue tco;
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1047 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1047)(Two(Two(_265)((_264[0]).values[0])((_264[0]).values[1])(((_264[0]).values[2]).values[0]))(((_264[0]).values[2]).values[1])(((_264[0]).values[2]).values[2])(Two(((_264[0]).values[2]).values[3])(((_264[0]).values[2]).values[4])(((_264[0]).values[2]).values[5])(((_264[0]).values[2]).values[6])));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1059 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.TwoRight") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1059)(Two(Two(((_264[0]).values[0]).values[0])(((_264[0]).values[0]).values[1])(((_264[0]).values[0]).values[2])(((_264[0]).values[0]).values[3]))(((_264[0]).values[0]).values[4])(((_264[0]).values[0]).values[5])(Two(((_264[0]).values[0]).values[6])((_264[0]).values[1])((_264[0]).values[2])(_265)));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1071 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Leaf") {
                                    if (((_264[0]).values[5]).ctor === "Data.Map.Leaf") {
                                        if (_265.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1071)(Three(Leaf)((_264[0]).values[0])((_264[0]).values[1])(Leaf)((_264[0]).values[3])((_264[0]).values[4])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1079 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (((_264[0]).values[5]).ctor === "Data.Map.Leaf") {
                                        if (_265.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1079)(Three(Leaf)((_264[0]).values[1])((_264[0]).values[2])(Leaf)((_264[0]).values[3])((_264[0]).values[4])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1087 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Leaf") {
                                    if (((_264[0]).values[3]).ctor === "Data.Map.Leaf") {
                                        if (_265.ctor === "Data.Map.Leaf") {
                                            return fromZipper(__dict_Ord_115)(_1087)(Three(Leaf)((_264[0]).values[1])((_264[0]).values[2])(Leaf)((_264[0]).values[4])((_264[0]).values[5])(Leaf));
                                        };
                                    };
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1095 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1095)(Two(Three(_265)((_264[0]).values[0])((_264[0]).values[1])(((_264[0]).values[2]).values[0])(((_264[0]).values[2]).values[1])(((_264[0]).values[2]).values[2])(((_264[0]).values[2]).values[3]))((_264[0]).values[3])((_264[0]).values[4])((_264[0]).values[5]));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1107 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1107)(Two(Three(((_264[0]).values[0]).values[0])(((_264[0]).values[0]).values[1])(((_264[0]).values[0]).values[2])(((_264[0]).values[0]).values[3])((_264[0]).values[1])((_264[0]).values[2])(_265))((_264[0]).values[3])((_264[0]).values[4])((_264[0]).values[5]));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1119 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_264[0]).values[5]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1119)(Two((_264[0]).values[0])((_264[0]).values[1])((_264[0]).values[2])(Three(_265)((_264[0]).values[3])((_264[0]).values[4])(((_264[0]).values[5]).values[0])(((_264[0]).values[5]).values[1])(((_264[0]).values[5]).values[2])(((_264[0]).values[5]).values[3])));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1131 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_264[0]).values[3]).ctor === "Data.Map.Two") {
                                    return fromZipper(__dict_Ord_115)(_1131)(Two((_264[0]).values[0])((_264[0]).values[1])((_264[0]).values[2])(Three(((_264[0]).values[3]).values[0])(((_264[0]).values[3]).values[1])(((_264[0]).values[3]).values[2])(((_264[0]).values[3]).values[3])((_264[0]).values[4])((_264[0]).values[5])(_265)));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1143 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeLeft") {
                                if (((_264[0]).values[2]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1143)(Three(Two(_265)((_264[0]).values[0])((_264[0]).values[1])(((_264[0]).values[2]).values[0]))(((_264[0]).values[2]).values[1])(((_264[0]).values[2]).values[2])(Two(((_264[0]).values[2]).values[3])(((_264[0]).values[2]).values[4])(((_264[0]).values[2]).values[5])(((_264[0]).values[2]).values[6]))((_264[0]).values[3])((_264[0]).values[4])((_264[0]).values[5]));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1158 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_264[0]).values[0]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1158)(Three(Two(((_264[0]).values[0]).values[0])(((_264[0]).values[0]).values[1])(((_264[0]).values[0]).values[2])(((_264[0]).values[0]).values[3]))(((_264[0]).values[0]).values[4])(((_264[0]).values[0]).values[5])(Two(((_264[0]).values[0]).values[6])((_264[0]).values[1])((_264[0]).values[2])(_265))((_264[0]).values[3])((_264[0]).values[4])((_264[0]).values[5]));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1173 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeMiddle") {
                                if (((_264[0]).values[5]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1173)(Three((_264[0]).values[0])((_264[0]).values[1])((_264[0]).values[2])(Two(_265)((_264[0]).values[3])((_264[0]).values[4])(((_264[0]).values[5]).values[0]))(((_264[0]).values[5]).values[1])(((_264[0]).values[5]).values[2])(Two(((_264[0]).values[5]).values[3])(((_264[0]).values[5]).values[4])(((_264[0]).values[5]).values[5])(((_264[0]).values[5]).values[6])));
                                };
                            };
                        };
                        if (_264.length > 0) {
                            var _1188 = _264.slice(1);
                            if ((_264[0]).ctor === "Data.Map.ThreeRight") {
                                if (((_264[0]).values[3]).ctor === "Data.Map.Three") {
                                    return fromZipper(__dict_Ord_115)(_1188)(Three((_264[0]).values[0])((_264[0]).values[1])((_264[0]).values[2])(Two(((_264[0]).values[3]).values[0])(((_264[0]).values[3]).values[1])(((_264[0]).values[3]).values[2])(((_264[0]).values[3]).values[3]))(((_264[0]).values[3]).values[4])(((_264[0]).values[3]).values[5])(Two(((_264[0]).values[3]).values[6])((_264[0]).values[4])((_264[0]).values[5])(_265)));
                                };
                            };
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var removeMaxNode = function (__copy___dict_Ord_116) {
            return function (__copy__267) {
                return function (__copy__268) {
                    var __dict_Ord_116 = __copy___dict_Ord_116;
                    var _267 = __copy__267;
                    var _268 = __copy__268;
                    tco: while (true) {
                        var ctx = _267;
                        if (_268.ctor === "Data.Map.Two") {
                            if ((_268.values[0]).ctor === "Data.Map.Leaf") {
                                if ((_268.values[3]).ctor === "Data.Map.Leaf") {
                                    return up(__dict_Ord_116)(ctx)(Leaf);
                                };
                            };
                        };
                        var ctx = _267;
                        if (_268.ctor === "Data.Map.Two") {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__267 = Prelude[":"](TwoRight(_268.values[0])(_268.values[1])(_268.values[2]))(ctx);
                            var __tco__268 = _268.values[3];
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _267 = __tco__267;
                            _268 = __tco__268;
                            continue tco;
                        };
                        var ctx = _267;
                        if (_268.ctor === "Data.Map.Three") {
                            if ((_268.values[0]).ctor === "Data.Map.Leaf") {
                                if ((_268.values[3]).ctor === "Data.Map.Leaf") {
                                    if ((_268.values[6]).ctor === "Data.Map.Leaf") {
                                        return up(__dict_Ord_116)(Prelude[":"](TwoRight(Leaf)(_268.values[1])(_268.values[2]))(ctx))(Leaf);
                                    };
                                };
                            };
                        };
                        if (_268.ctor === "Data.Map.Three") {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__267 = Prelude[":"](ThreeRight(_268.values[0])(_268.values[1])(_268.values[2])(_268.values[3])(_268.values[4])(_268.values[5]))(_267);
                            var __tco__268 = _268.values[6];
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _267 = __tco__267;
                            _268 = __tco__268;
                            continue tco;
                        };
                        throw "Failed pattern match";
                    };
                };
            };
        };
        var maxNode = function (__copy___dict_Ord_117) {
            return function (__copy__266) {
                var __dict_Ord_117 = __copy___dict_Ord_117;
                var _266 = __copy__266;
                tco: while (true) {
                    if (_266.ctor === "Data.Map.Two") {
                        if ((_266.values[3]).ctor === "Data.Map.Leaf") {
                            return {
                                key: _266.values[1], 
                                value: _266.values[2]
                            };
                        };
                    };
                    if (_266.ctor === "Data.Map.Two") {
                        var _ = _266.values[0];
                        var _ = _266.values[1];
                        var __tco___dict_Ord_117 = __dict_Ord_117;
                        var __tco__266 = _266.values[3];
                        __dict_Ord_117 = __tco___dict_Ord_117;
                        _266 = __tco__266;
                        continue tco;
                    };
                    if (_266.ctor === "Data.Map.Three") {
                        if ((_266.values[6]).ctor === "Data.Map.Leaf") {
                            return {
                                key: _266.values[4], 
                                value: _266.values[5]
                            };
                        };
                    };
                    if (_266.ctor === "Data.Map.Three") {
                        var _ = _266.values[0];
                        var _ = _266.values[1];
                        var _ = _266.values[2];
                        var _ = _266.values[3];
                        var _ = _266.values[4];
                        var __tco___dict_Ord_117 = __dict_Ord_117;
                        var __tco__266 = _266.values[6];
                        __dict_Ord_117 = __tco___dict_Ord_117;
                        _266 = __tco__266;
                        continue tco;
                    };
                    throw "Failed pattern match";
                };
            };
        };
        var down = function (__copy___dict_Ord_118) {
            return function (__copy__261) {
                return function (__copy__262) {
                    return function (__copy__263) {
                        var __dict_Ord_118 = __copy___dict_Ord_118;
                        var _261 = __copy__261;
                        var _262 = __copy__262;
                        var _263 = __copy__263;
                        tco: while (true) {
                            var ctx = _261;
                            if (_263.ctor === "Data.Map.Leaf") {
                                return fromZipper(__dict_Ord_118)(ctx)(Leaf);
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Two") {
                                if ((_263.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_263.values[3]).ctor === "Data.Map.Leaf") {
                                        if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[1])) {
                                            return up(__dict_Ord_118)(ctx)(Leaf);
                                        };
                                    };
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Two") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[1])) {
                                    var max = maxNode(__dict_Ord_118)(_263.values[0]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](TwoLeft(max.key)(max.value)(_263.values[3]))(ctx))(_263.values[0]);
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Two") {
                                if (Prelude["<"](__dict_Ord_118)(k)(_263.values[1])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__261 = Prelude[":"](TwoLeft(_263.values[1])(_263.values[2])(_263.values[3]))(ctx);
                                    var __tco__263 = _263.values[0];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _261 = __tco__261;
                                    _262 = k;
                                    _263 = __tco__263;
                                    continue tco;
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Two") {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__261 = Prelude[":"](TwoRight(_263.values[0])(_263.values[1])(_263.values[2]))(ctx);
                                var __tco__263 = _263.values[3];
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _261 = __tco__261;
                                _262 = k;
                                _263 = __tco__263;
                                continue tco;
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if ((_263.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_263.values[3]).ctor === "Data.Map.Leaf") {
                                        if ((_263.values[6]).ctor === "Data.Map.Leaf") {
                                            if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[1])) {
                                                return fromZipper(__dict_Ord_118)(ctx)(Two(Leaf)(_263.values[4])(_263.values[5])(Leaf));
                                            };
                                        };
                                    };
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if ((_263.values[0]).ctor === "Data.Map.Leaf") {
                                    if ((_263.values[3]).ctor === "Data.Map.Leaf") {
                                        if ((_263.values[6]).ctor === "Data.Map.Leaf") {
                                            if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[4])) {
                                                return fromZipper(__dict_Ord_118)(ctx)(Two(Leaf)(_263.values[1])(_263.values[2])(Leaf));
                                            };
                                        };
                                    };
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[1])) {
                                    var max = maxNode(__dict_Ord_118)(_263.values[0]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](ThreeLeft(max.key)(max.value)(_263.values[3])(_263.values[4])(_263.values[5])(_263.values[6]))(ctx))(_263.values[0]);
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if (Prelude["=="](__dict_Ord_118["__superclasses"]["Prelude.Eq_0"]({}))(k)(_263.values[4])) {
                                    var max = maxNode(__dict_Ord_118)(_263.values[3]);
                                    return removeMaxNode(__dict_Ord_118)(Prelude[":"](ThreeMiddle(_263.values[0])(_263.values[1])(_263.values[2])(max.key)(max.value)(_263.values[6]))(ctx))(_263.values[3]);
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if (Prelude["<"](__dict_Ord_118)(k)(_263.values[1])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__261 = Prelude[":"](ThreeLeft(_263.values[1])(_263.values[2])(_263.values[3])(_263.values[4])(_263.values[5])(_263.values[6]))(ctx);
                                    var __tco__263 = _263.values[0];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _261 = __tco__261;
                                    _262 = k;
                                    _263 = __tco__263;
                                    continue tco;
                                };
                            };
                            var ctx = _261;
                            var k = _262;
                            if (_263.ctor === "Data.Map.Three") {
                                if (Prelude["<"](__dict_Ord_118)(_263.values[1])(k) && Prelude["<"](__dict_Ord_118)(k)(_263.values[4])) {
                                    var __tco___dict_Ord_118 = __dict_Ord_118;
                                    var __tco__261 = Prelude[":"](ThreeMiddle(_263.values[0])(_263.values[1])(_263.values[2])(_263.values[4])(_263.values[5])(_263.values[6]))(ctx);
                                    var __tco__263 = _263.values[3];
                                    __dict_Ord_118 = __tco___dict_Ord_118;
                                    _261 = __tco__261;
                                    _262 = k;
                                    _263 = __tco__263;
                                    continue tco;
                                };
                            };
                            if (_263.ctor === "Data.Map.Three") {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__261 = Prelude[":"](ThreeRight(_263.values[0])(_263.values[1])(_263.values[2])(_263.values[3])(_263.values[4])(_263.values[5]))(_261);
                                var __tco__262 = _262;
                                var __tco__263 = _263.values[6];
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _261 = __tco__261;
                                _262 = __tco__262;
                                _263 = __tco__263;
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
        var allHeights = function (_254) {
            if (_254.ctor === "Data.Map.Leaf") {
                return [ 0 ];
            };
            if (_254.ctor === "Data.Map.Two") {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_254.values[0]))(allHeights(_254.values[3])));
            };
            if (_254.ctor === "Data.Map.Three") {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_254.values[0]))(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_254.values[3]))(allHeights(_254.values[6]))));
            };
            throw "Failed pattern match";
        };
        return Data_Array.length(Data_Array.nub(Prelude.eqNumber({}))(allHeights(tree))) === 1;
    };
    var alter = function (__dict_Ord_119) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return (function (_1329) {
                        if (_1329.ctor === "Data.Maybe.Nothing") {
                            return $$delete(__dict_Ord_119)(k)(m);
                        };
                        if (_1329.ctor === "Data.Maybe.Just") {
                            return insert(__dict_Ord_119)(k)(_1329.values[0])(m);
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
        return function (_278) {
            return function (_279) {
                return Set(Data_Map.union(__dict_Ord_121)(_278.values[0])(_279.values[0]));
            };
        };
    };
    var toList = function (_277) {
        return Data_Array.map(Data_Tuple.fst)(Data_Map.toList(_277.values[0]));
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
        return function (_271) {
            return function (_272) {
                return Data_Map.member(__dict_Ord_123)(_271)(_272.values[0]);
            };
        };
    };
    var isEmpty = function (_269) {
        return Data_Map.isEmpty(_269.values[0]);
    };
    var insert = function (__dict_Ord_124) {
        return function (_273) {
            return function (_274) {
                return Set(Data_Map.insert(__dict_Ord_124)(_273)(Prelude.unit)(_274.values[0]));
            };
        };
    };
    var eqSet = function (__dict_Eq_125) {
        return {
            "==": function (_280) {
                return function (_281) {
                    return Prelude["=="](Data_Map.eqMap(__dict_Eq_125)(Prelude.eqUnit({})))(_280.values[0])(_281.values[0]);
                };
            }, 
            "/=": function (_282) {
                return function (_283) {
                    return Prelude["/="](Data_Map.eqMap(__dict_Eq_125)(Prelude.eqUnit({})))(_282.values[0])(_283.values[0]);
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
        return function (_275) {
            return function (_276) {
                return Set(Data_Map["delete"](__dict_Ord_128)(_275)(_276.values[0]));
            };
        };
    };
    var checkValid = function (_270) {
        return Data_Map.checkValid(_270.values[0]);
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
    var valueToJSONImpl = function (_285) {
        if (_285.ctor === "Data.JSON.Object") {
            return objToHash(Data_Map.toList(_285.values[0]));
        };
        if (_285.ctor === "Data.JSON.Array") {
            return unsafeCoerce(Prelude["<$>"](Data_Array.functorArray({}))(valueToJSONImpl)(_285.values[0]));
        };
        if (_285.ctor === "Data.JSON.String") {
            return unsafeCoerce(_285.values[0]);
        };
        if (_285.ctor === "Data.JSON.Number") {
            return unsafeCoerce(_285.values[0]);
        };
        if (_285.ctor === "Data.JSON.Bool") {
            return unsafeCoerce(_285.values[0]);
        };
        if (_285.ctor === "Data.JSON.Null") {
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
            toJSON: function (_298) {
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
                toJSON: function (_301) {
                    return Array([ toJSON(__dict_ToJSON_129)(_301.values[0]), toJSON(__dict_ToJSON_130)(_301.values[1]) ]);
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
            show: function (_286) {
                if (_286.ctor === "Data.JSON.Object") {
                    return "Object " + Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_286.values[0]);
                };
                if (_286.ctor === "Data.JSON.Array") {
                    return "Array " + Prelude.show(Prelude.showArray(showValue({})))(_286.values[0]);
                };
                if (_286.ctor === "Data.JSON.String") {
                    return "String " + Prelude.show(Prelude.showString({}))(_286.values[0]);
                };
                if (_286.ctor === "Data.JSON.Number") {
                    return "Number " + Prelude.show(Prelude.showNumber({}))(_286.values[0]);
                };
                if (_286.ctor === "Data.JSON.Bool") {
                    return "Bool " + Prelude.show(Prelude.showBoolean({}))(_286.values[0]);
                };
                if (_286.ctor === "Data.JSON.Null") {
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
        return function (_284) {
            if (_284.length === 0) {
                return Prelude["return"](__dict_Monad_133)([  ]);
            };
            if (_284.length > 0) {
                var _1378 = _284.slice(1);
                return Prelude[">>="](__dict_Monad_133["__superclasses"]["Prelude.Bind_1"]({}))(_284[0])(function (_7) {
                    return Prelude[">>="](__dict_Monad_133["__superclasses"]["Prelude.Bind_1"]({}))(sequence(__dict_Monad_133)(_1378))(function (_6) {
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
                return (function (_1379) {
                    if (_1379.ctor === "Data.Maybe.Nothing") {
                        return Data_Either.Left("key " + Prelude.show(Prelude.showString({}))(key) + " not present");
                    };
                    if (_1379.ctor === "Data.Maybe.Just") {
                        return parseJSON(__dict_FromJSON_136)(_1379.values[0]);
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
            toJSON: function (_300) {
                if (_300.ctor === "Data.Maybe.Nothing") {
                    return Null;
                };
                if (_300.ctor === "Data.Maybe.Just") {
                    return toJSON(__dict_ToJSON_138)(_300.values[0]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybeFromJSON = function (__dict_FromJSON_139) {
        return {
            parseJSON: function (a) {
                return Prelude["return"](Data_Either.monadEither({}))((function (_1383) {
                    if (_1383.ctor === "Data.Either.Left") {
                        return Data_Maybe.Nothing;
                    };
                    if (_1383.ctor === "Data.Either.Right") {
                        return Data_Maybe.Just(_1383.values[0]);
                    };
                    throw "Failed pattern match";
                })(parseJSON(__dict_FromJSON_139)(a)));
            }
        };
    };
    var $dot$colon$qmark = function (__dict_FromJSON_137) {
        return function (obj) {
            return function (key) {
                return (function (_1386) {
                    if (_1386.ctor === "Data.Maybe.Nothing") {
                        return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing);
                    };
                    if (_1386.ctor === "Data.Maybe.Just") {
                        return parseJSON(maybeFromJSON(__dict_FromJSON_137))(_1386.values[0]);
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
                parseJSON: function (_296) {
                    if (_296.ctor === "Data.JSON.Object") {
                        var fn = function (_297) {
                            return (function (_1390) {
                                if (_1390.ctor === "Data.Either.Right") {
                                    return Prelude["return"](Data_Either.monadEither({}))(Data_Tuple.Tuple(_297.values[0])(_1390.values[0]));
                                };
                                if (_1390.ctor === "Data.Either.Left") {
                                    return fail(_1390.values[0]);
                                };
                                throw "Failed pattern match";
                            })(parseJSON(__dict_FromJSON_142)(_297.values[1]));
                        };
                        return Prelude["<$>"](Data_Either.functorEither({}))(Data_Map.fromList(Prelude.ordString({})))(sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(fn)(Data_Map.toList(_296.values[0]))));
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var numberFromJSON = function (_) {
        return {
            parseJSON: function (_290) {
                if (_290.ctor === "Data.JSON.Number") {
                    return Prelude["return"](Data_Either.monadEither({}))(_290.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_290) + " is not Number.");
            }
        };
    };
    var stringFromJSON = function (_) {
        return {
            parseJSON: function (_292) {
                if (_292.ctor === "Data.JSON.String") {
                    return Prelude["return"](Data_Either.monadEither({}))(_292.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_292) + " is not String.");
            }
        };
    };
    var tupleFromJSON = function (__dict_FromJSON_143) {
        return function (__dict_FromJSON_144) {
            return {
                parseJSON: function (_294) {
                    if (_294.ctor === "Data.JSON.Array") {
                        if ((_294.values[0]).length === 2) {
                            return Prelude["<*>"](Data_Either.applyEither({}))(Prelude["<$>"](Data_Either.functorEither({}))(Data_Tuple.Tuple)(parseJSON(__dict_FromJSON_143)(_294.values[0][0])))(parseJSON(__dict_FromJSON_144)(_294.values[0][1]));
                        };
                    };
                    return fail(Prelude.show(showValue({}))(_294) + " is not (a,b).");
                }
            };
        };
    };
    var unitFromJSON = function (_) {
        return {
            parseJSON: function (_291) {
                if (_291.ctor === "Data.JSON.Null") {
                    return Prelude["return"](Data_Either.monadEither({}))(Prelude.unit);
                };
                return fail(Prelude.show(showValue({}))(_291) + " is not Null.");
            }
        };
    };
    var eqValue = function (_) {
        return {
            "==": function (_287) {
                return function (_288) {
                    if (_287.ctor === "Data.JSON.Object") {
                        if (_288.ctor === "Data.JSON.Object") {
                            return Prelude["=="](Data_Map.eqMap(Prelude.eqString({}))(eqValue({})))(_287.values[0])(_288.values[0]);
                        };
                    };
                    if (_287.ctor === "Data.JSON.Array") {
                        if (_288.ctor === "Data.JSON.Array") {
                            return Prelude["=="](Prelude.eqArray(eqValue({})))(_287.values[0])(_288.values[0]);
                        };
                    };
                    if (_287.ctor === "Data.JSON.String") {
                        if (_288.ctor === "Data.JSON.String") {
                            return _287.values[0] === _288.values[0];
                        };
                    };
                    if (_287.ctor === "Data.JSON.Number") {
                        if (_288.ctor === "Data.JSON.Number") {
                            return _287.values[0] === _288.values[0];
                        };
                    };
                    if (_287.ctor === "Data.JSON.Bool") {
                        if (_288.ctor === "Data.JSON.Bool") {
                            return _287.values[0] === _288.values[0];
                        };
                    };
                    if (_287.ctor === "Data.JSON.Null") {
                        if (_288.ctor === "Data.JSON.Null") {
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
                toJSON: function (_299) {
                    if (_299.ctor === "Data.Either.Right") {
                        return object([ $dot$eq(__dict_ToJSON_147)("Right")(_299.values[0]) ]);
                    };
                    if (_299.ctor === "Data.Either.Left") {
                        return object([ $dot$eq(__dict_ToJSON_146)("Left")(_299.values[0]) ]);
                    };
                    throw "Failed pattern match";
                }
            };
        };
    };
    var eitherFromJSON = function (__dict_FromJSON_148) {
        return function (__dict_FromJSON_149) {
            return {
                parseJSON: function (_295) {
                    if (_295.ctor === "Data.JSON.Object") {
                        return (function (_1421) {
                            if (_1421.length === 1) {
                                if ((_1421[0]).values[0] === "Right") {
                                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Right)(parseJSON(__dict_FromJSON_149)((_1421[0]).values[1]));
                                };
                            };
                            if (_1421.length === 1) {
                                if ((_1421[0]).values[0] === "Left") {
                                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Left)(parseJSON(__dict_FromJSON_148)((_1421[0]).values[1]));
                                };
                            };
                            return fail(Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_295.values[0]) + " is not (Either a b).");
                        })(Data_Map.toList(_295.values[0]));
                    };
                    return fail(Prelude.show(showValue({}))(_295) + " is not (Either a b).");
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
            return (function (_1430) {
                if (_1430.ctor === "Data.Either.Right") {
                    return Data_Maybe.Just(_1430.values[0]);
                };
                if (_1430.ctor === "Data.Either.Left") {
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
            parseJSON: function (_289) {
                if (_289.ctor === "Data.JSON.Bool") {
                    return Data_Either.Right(_289.values[0]);
                };
                return fail(Prelude.show(showValue({}))(_289) + " is not Boolean.");
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
            parseJSON: function (_293) {
                if (_293.ctor === "Data.JSON.Array") {
                    return sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(parseJSON(__dict_FromJSON_153))(_293.values[0]));
                };
                return fail(Prelude.show(showValue({}))(_293) + " is not [a].");
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
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(__dict_FromJSON_154)(input.values[0][0]))(function (_13) {
                            return Prelude["return"](Data_Either.monadEither({}))(D(_13));
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
                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.arrayFromJSON(Data_JSON.numberFromJSON({})))(input.values[0])("number"))(function (_18) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(input.values[0])("first"))(function (_17) {
                            return Prelude["return"](Data_Either.monadEither({}))(B({
                                number: _18, 
                                first: _17
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
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.values[0][0]))(function (_16) {
                            return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.values[0][1]))(function (_15) {
                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.stringFromJSON({}))(input.values[0][2]))(function (_14) {
                                    return Prelude["return"](Data_Either.monadEither({}))(A(_16)(_15)(_14));
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
            parseJSON: function (_302) {
                if (_302.ctor === "Data.JSON.Object") {
                    return (function (_1454) {
                        if (_1454.ctor === "Data.Either.Right") {
                            if (_1454.values[0] === "C1") {
                                var input = Data_JSON.Object(_302.values[0]);
                                return (function (_1455) {
                                    if (_1455.ctor === "Data.JSON.Object") {
                                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](autoAFromJSON({}))(_1455.values[0])("a"))(function (_10) {
                                            return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_1455.values[0])("name"))(function (_9) {
                                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.boolFromJSON({}))(_1455.values[0])("admin"))(function (_8) {
                                                    return Prelude["return"](Data_Either.monadEither({}))(C1({
                                                        a: _10, 
                                                        name: _9, 
                                                        admin: _8
                                                    }));
                                                });
                                            });
                                        });
                                    };
                                    return Data_JSON.fail("cannot parse.");
                                })(input);
                            };
                        };
                        if (_1454.ctor === "Data.Either.Right") {
                            if (_1454.values[0] === "C2") {
                                return (function (_1461) {
                                    if (_1461.ctor === "Data.Either.Right") {
                                        if ((_1461.values[0]).ctor === "Data.JSON.Array") {
                                            if (((_1461.values[0]).values[0]).length === 2) {
                                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))((_1461.values[0]).values[0][0]))(function (_12) {
                                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(autoBFromJSON({}))((_1461.values[0]).values[0][1]))(function (_11) {
                                                        return Prelude["return"](Data_Either.monadEither({}))(C2(_12)(_11));
                                                    });
                                                });
                                            };
                                        };
                                        return Data_JSON.fail("cannot parse.");
                                    };
                                    return Data_JSON.fail("cannot parse.");
                                })(Data_JSON[".:"](Data_JSON.valueFromJSON({}))(_302.values[0])("contents"));
                            };
                        };
                        return Data_JSON.fail("cannot parse.");
                    })(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_302.values[0])("tag"));
                };
                return Data_JSON.fail("cannot parse.");
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
            show: function (_304) {
                return "B{ number: " + Prelude.show(Prelude.showArray(Prelude.showNumber({})))((_304.values[0]).number) + ", first: " + Prelude.show(Prelude.showString({}))((_304.values[0]).first) + "}";
            }
        };
    };
    var showA = function (_) {
        return {
            show: function (_303) {
                return "A " + Prelude.show(Prelude.showNumber({}))(_303.values[0]) + " " + Prelude.show(Prelude.showNumber({}))(_303.values[1]) + " " + Prelude.show(Prelude.showString({}))(_303.values[2]);
            }
        };
    };
    var showC = function (_) {
        return {
            show: function (_305) {
                if (_305.ctor === "Foreign.C1") {
                    return "C1{ a: " + Prelude.show(showA({}))((_305.values[0]).a) + ", name: " + Prelude.show(Prelude.showString({}))((_305.values[0]).name) + ", admin: " + Prelude.show(Prelude.showBoolean({}))((_305.values[0]).admin) + "}";
                };
                if (_305.ctor === "Foreign.C2") {
                    return "C2 " + Prelude.show(Prelude.showNumber({}))(_305.values[0]) + " " + Prelude.show(showB({}))(_305.values[1]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var main = Debug_Trace.print(Data_Maybe.showMaybe(showC({})))(Data_JSON.decode(Foreign.autoCFromJSON({}))("{\"tag\": \"C1\", \"a\": [12,34.2, \"adf\"], \"name\": \"kevin\", \"admin\": true}"));
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
                return function (_318) {
                    return function (_319) {
                        return Prelude["<$>"]((__dict_Applicative_155["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_319.values[0]))(_318(_319.values[1]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_156) {
                return function (_320) {
                    return Prelude["<$>"]((__dict_Applicative_156["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Tuple.Tuple(_320.values[0]))(_320.values[1]);
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
                return function (_312) {
                    return function (_313) {
                        return Prelude["<$>"]((__dict_Applicative_157["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_312(_313.values[0]));
                    };
                };
            }, 
            sequence: function (__dict_Applicative_158) {
                return function (_314) {
                    return Prelude["<$>"]((__dict_Applicative_158["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Eq.Ref)(_314.values[0]);
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
                return function (_315) {
                    return function (_316) {
                        if (_316.ctor === "Data.Maybe.Nothing") {
                            return Prelude.pure(__dict_Applicative_159)(Data_Maybe.Nothing);
                        };
                        if (_316.ctor === "Data.Maybe.Just") {
                            return Prelude["<$>"]((__dict_Applicative_159["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_315(_316.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_160) {
                return function (_317) {
                    if (_317.ctor === "Data.Maybe.Nothing") {
                        return Prelude.pure(__dict_Applicative_160)(Data_Maybe.Nothing);
                    };
                    if (_317.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"]((__dict_Applicative_160["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Maybe.Just)(_317.values[0]);
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
                return function (_309) {
                    return function (_310) {
                        if (_310.ctor === "Data.Either.Left") {
                            return Prelude.pure(__dict_Applicative_161)(Data_Either.Left(_310.values[0]));
                        };
                        if (_310.ctor === "Data.Either.Right") {
                            return Prelude["<$>"]((__dict_Applicative_161["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_309(_310.values[0]));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_162) {
                return function (_311) {
                    if (_311.ctor === "Data.Either.Left") {
                        return Prelude.pure(__dict_Applicative_162)(Data_Either.Left(_311.values[0]));
                    };
                    if (_311.ctor === "Data.Either.Right") {
                        return Prelude["<$>"]((__dict_Applicative_162["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Data_Either.Right)(_311.values[0]);
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
                return function (_306) {
                    return function (_307) {
                        if (_307.length === 0) {
                            return Prelude.pure(__dict_Applicative_163)([  ]);
                        };
                        if (_307.length > 0) {
                            var _1513 = _307.slice(1);
                            return Prelude["<*>"](__dict_Applicative_163["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_163["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_306(_307[0])))(traverse(traversableArray({}))(__dict_Applicative_163)(_306)(_1513));
                        };
                        throw "Failed pattern match";
                    };
                };
            }, 
            sequence: function (__dict_Applicative_164) {
                return function (_308) {
                    if (_308.length === 0) {
                        return Prelude.pure(__dict_Applicative_164)([  ]);
                    };
                    if (_308.length > 0) {
                        var _1516 = _308.slice(1);
                        return Prelude["<*>"](__dict_Applicative_164["__superclasses"]["Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_164["__superclasses"]["Prelude.Apply_0"]({}))["__superclasses"]["Prelude.Functor_0"]({}))(Prelude[":"])(_308[0]))(sequence(traversableArray({}))(__dict_Applicative_164)(_1516));
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
    var vertices = function (_323) {
        if (_323.ctor === "Data.Graph.AcyclicSCC") {
            return [ _323.values[0] ];
        };
        if (_323.ctor === "Data.Graph.CyclicSCC") {
            return _323.values[0];
        };
        throw "Failed pattern match";
    };
    var showSCC = function (__dict_Show_168) {
        return {
            show: function (_333) {
                if (_333.ctor === "Data.Graph.AcyclicSCC") {
                    return "AcyclicSCC (" + Prelude.show(__dict_Show_168)(_333.values[0]) + ")";
                };
                if (_333.ctor === "Data.Graph.CyclicSCC") {
                    return "CyclicSCC " + Prelude.show(Prelude.showArray(__dict_Show_168))(_333.values[0]);
                };
                throw "Failed pattern match";
            }
        };
    };
    var popUntil = function (__copy___dict_Eq_169) {
        return function (__copy__327) {
            return function (__copy__328) {
                return function (__copy__329) {
                    return function (__copy__330) {
                        var __dict_Eq_169 = __copy___dict_Eq_169;
                        var _327 = __copy__327;
                        var _328 = __copy__328;
                        var _329 = __copy__329;
                        var _330 = __copy__330;
                        tco: while (true) {
                            if (_329.length === 0) {
                                return {
                                    path: [  ], 
                                    component: _330
                                };
                            };
                            var makeKey = _327;
                            var v = _328;
                            if (_329.length > 0) {
                                var _1528 = _329.slice(1);
                                if (Prelude["=="](__dict_Eq_169)(makeKey(v))(makeKey(_329[0]))) {
                                    return {
                                        path: _1528, 
                                        component: Prelude[":"](_329[0])(_330)
                                    };
                                };
                            };
                            if (_329.length > 0) {
                                var _1530 = _329.slice(1);
                                var __tco___dict_Eq_169 = __dict_Eq_169;
                                var __tco__327 = _327;
                                var __tco__328 = _328;
                                var __tco__330 = Prelude[":"](_329[0])(_330);
                                __dict_Eq_169 = __tco___dict_Eq_169;
                                _327 = __tco__327;
                                _328 = __tco__328;
                                _329 = _1530;
                                _330 = __tco__330;
                                continue tco;
                            };
                            throw "Failed pattern match";
                        };
                    };
                };
            };
        };
    };
    var maybeMin = function (_331) {
        return function (_332) {
            if (_332.ctor === "Data.Maybe.Nothing") {
                return Data_Maybe.Just(_331);
            };
            if (_332.ctor === "Data.Maybe.Just") {
                return Data_Maybe.Just(Math.min(_331)(_332.values[0]));
            };
            throw "Failed pattern match";
        };
    };
    var scc$prime = function (__dict_Eq_170) {
        return function (__dict_Ord_171) {
            return function (_324) {
                return function (_325) {
                    return function (_326) {
                        return Control_Monad_Eff.runPure(function __do() {
                            var _34 = {
                                value: 0
                            };
                            var index = _34;
                            var _33 = {
                                value: [  ]
                            };
                            var _32 = {
                                value: Data_Map.empty
                            };
                            var _31 = {
                                value: Data_Map.empty
                            };
                            var _30 = {
                                value: [  ]
                            };
                            return (function () {
                                var lowlinkOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_171)(k)(_31.value);
                                    };
                                };
                                var lowlinkOf = function (v) {
                                    return lowlinkOfKey(_324(v));
                                };
                                var isCycle = function (k) {
                                    return Data_Foldable.any(Data_Foldable.foldableArray({}))(function (_322) {
                                        return Prelude["=="](__dict_Eq_170)(_322.values[0])(k) && Prelude["=="](__dict_Eq_170)(_322.values[1])(k);
                                    })(_326.values[1]);
                                };
                                var makeComponent = function (_337) {
                                    if (_337.length === 1) {
                                        if (!isCycle(_324(_337[0]))) {
                                            return AcyclicSCC(_337[0]);
                                        };
                                    };
                                    return CyclicSCC(_337);
                                };
                                var indexOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_171)(k)(_32.value);
                                    };
                                };
                                var strongConnect = function (k) {
                                    var v = _325(k);
                                    return function __do() {
                                        var _29 = index.value;
                                        _32.value = Data_Map.insert(__dict_Ord_171)(k)(_29)(_32.value);
                                        _31.value = Data_Map.insert(__dict_Ord_171)(k)(_29)(_31.value);
                                        index.value = _29 + 1;
                                        _33.value = Prelude[":"](v)(_33.value);
                                        Data_Traversable["for"](Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_326.values[1])(function (_321) {
                                            return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](__dict_Eq_170)(k)(_321.values[0]))(function __do() {
                                                var _25 = indexOfKey(_321.values[1])();
                                                return (function (_1553) {
                                                    if (_1553.ctor === "Data.Maybe.Nothing") {
                                                        var w = _325(_321.values[1]);
                                                        return function __do() {
                                                            strongConnect(_321.values[1])();
                                                            var _22 = lowlinkOfKey(_321.values[1])();
                                                            return Data_Foldable["for_"](Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_22)(function (lowlink) {
                                                                return Control_Monad_ST.modifySTRef(_31)(Data_Map.alter(__dict_Ord_171)(maybeMin(lowlink))(k));
                                                            })();
                                                        };
                                                    };
                                                    return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Foldable.elem(__dict_Eq_170)(Data_Foldable.foldableArray({}))(_321.values[1])(Data_Array.map(_324)(_33.value)))(function __do() {
                                                        var _23 = indexOfKey(_321.values[1])();
                                                        return Data_Foldable["for_"](Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_23)(function (index) {
                                                            return Control_Monad_ST.modifySTRef(_31)(Data_Map.alter(__dict_Ord_171)(maybeMin(index))(k));
                                                        })();
                                                    });
                                                })(_25)();
                                            });
                                        })();
                                        var _28 = indexOfKey(k)();
                                        var _27 = lowlinkOfKey(k)();
                                        return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](Data_Maybe.eqMaybe(Prelude.eqNumber({})))(_28)(_27))(function __do() {
                                            var _26 = _33.value;
                                            return (function () {
                                                var newPath = popUntil(__dict_Eq_170)(_324)(v)(_26)([  ]);
                                                return function __do() {
                                                    _30.value = Prelude.flip(Prelude["++"](Data_Array.semigroupArray({})))([ makeComponent(newPath.component) ])(_30.value);
                                                    _33.value = newPath.path;
                                                    return Prelude.unit;
                                                };
                                            })()();
                                        })();
                                    };
                                };
                                var indexOf = function (v) {
                                    return indexOfKey(_324(v));
                                };
                                var go = function (_336) {
                                    if (_336.length === 0) {
                                        return Control_Monad_ST.readSTRef(_30);
                                    };
                                    if (_336.length > 0) {
                                        var _1564 = _336.slice(1);
                                        return function __do() {
                                            var _21 = indexOf(_336[0])();
                                            Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isNothing(_21))(strongConnect(_324(_336[0])))();
                                            return go(_1564)();
                                        };
                                    };
                                    throw "Failed pattern match";
                                };
                                return go(_326.values[0]);
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
            "==": function (_334) {
                return function (_335) {
                    if (_334.ctor === "Data.Graph.AcyclicSCC") {
                        if (_335.ctor === "Data.Graph.AcyclicSCC") {
                            return Prelude["=="](__dict_Eq_178)(_334.values[0])(_335.values[0]);
                        };
                    };
                    if (_334.ctor === "Data.Graph.CyclicSCC") {
                        if (_335.ctor === "Data.Graph.CyclicSCC") {
                            return Prelude["=="](Prelude.eqArray(__dict_Eq_178))(_334.values[0])(_335.values[0]);
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