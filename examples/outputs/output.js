var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = {
        create: function (value) {
            return value;
        }
    };
    function LT() {

    };
    LT.value = new LT();
    function GT() {

    };
    GT.value = new GT();
    function EQ() {

    };
    EQ.value = new EQ();
    function Semigroupoid($less$less$less) {
        this["<<<"] = $less$less$less;
    };
    function Category(__superclass_Prelude$dotSemigroupoid_0, id) {
        this["__superclass_Prelude.Semigroupoid_0"] = __superclass_Prelude$dotSemigroupoid_0;
        this.id = id;
    };
    function Show(show) {
        this.show = show;
    };
    function Functor($less$dollar$greater) {
        this["<$>"] = $less$dollar$greater;
    };
    function Apply($less$times$greater, __superclass_Prelude$dotFunctor_0) {
        this["<*>"] = $less$times$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    function Applicative(__superclass_Prelude$dotApply_0, pure) {
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
        this.pure = pure;
    };
    function Bind($greater$greater$eq, __superclass_Prelude$dotApply_0) {
        this[">>="] = $greater$greater$eq;
        this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
    };
    function Monad(__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
        this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
    };
    function Num($percent, $times, $plus, $minus, $div, negate) {
        this["%"] = $percent;
        this["*"] = $times;
        this["+"] = $plus;
        this["-"] = $minus;
        this["/"] = $div;
        this.negate = negate;
    };
    function Eq($div$eq, $eq$eq) {
        this["/="] = $div$eq;
        this["=="] = $eq$eq;
    };
    function Ord(__superclass_Prelude$dotEq_0, compare) {
        this["__superclass_Prelude.Eq_0"] = __superclass_Prelude$dotEq_0;
        this.compare = compare;
    };
    function Bits($amp, $up, complement, shl, shr, zshr, $bar) {
        this["&"] = $amp;
        this["^"] = $up;
        this.complement = complement;
        this.shl = shl;
        this.shr = shr;
        this.zshr = zshr;
        this["|"] = $bar;
    };
    function BoolLike($amp$amp, not, $bar$bar) {
        this["&&"] = $amp$amp;
        this.not = not;
        this["||"] = $bar$bar;
    };
    function Semigroup($less$greater) {
        this["<>"] = $less$greater;
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
    function unsafeCompareImpl(lt) {  return function (eq) {    return function (gt) {      return function (x) {        return function (y) {          return x < y ? lt : x > y ? gt : eq;        };      };    };  };};
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
    var unsafeCompare = unsafeCompareImpl(LT.value)(EQ.value)(GT.value);
    var unit = {};
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return new Show(function (_39) {
            return "Unit {}";
        });
    };
    var showString = function (_) {
        return new Show(showStringImpl);
    };
    var showOrdering = function (_) {
        return new Show(function (_47) {
            if (_47 instanceof LT) {
                return "LT";
            };
            if (_47 instanceof GT) {
                return "GT";
            };
            if (_47 instanceof EQ) {
                return "EQ";
            };
            throw new Error("Failed pattern match");
        });
    };
    var showNumber = function (_) {
        return new Show(showNumberImpl);
    };
    var showBoolean = function (_) {
        return new Show(function (_40) {
            if (_40) {
                return "true";
            };
            if (!_40) {
                return "false";
            };
            throw new Error("Failed pattern match");
        });
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return new Show(showArrayImpl(show(__dict_Show_2)));
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return new Semigroupoid(function (f) {
            return function (g) {
                return function (x) {
                    return f(g(x));
                };
            };
        });
    };
    var semigroupUnit = function (_) {
        return new Semigroup(function (_54) {
            return function (_55) {
                return {};
            };
        });
    };
    var semigroupString = function (_) {
        return new Semigroup(concatString);
    };
    var semigroupArr = function (__dict_Semigroup_3) {
        return new Semigroup(function (f) {
            return function (g) {
                return function (x) {
                    return $less$greater(__dict_Semigroup_3)(f(x))(g(x));
                };
            };
        });
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_4) {
        return pure(__dict_Monad_4["__superclass_Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return new Num(numMod, numMul, numAdd, numSub, numDiv, numNegate);
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
                return $greater$greater$eq(__dict_Monad_5["__superclass_Prelude.Bind_1"]({}))(a)(function (_0) {
                    return $$return(__dict_Monad_5)(f(_0));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_6) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_6["__superclass_Prelude.Apply_0"]({}))(pure(__dict_Applicative_6)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var functorArr = function (_) {
        return new Functor($less$less$less(semigroupoidArr({})));
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return new Eq(function (_43) {
            return function (_44) {
                return false;
            };
        }, function (_41) {
            return function (_42) {
                return true;
            };
        });
    };
    var ordUnit = function (_) {
        return new Ord(function (__1) {
            return eqUnit({});
        }, function (_48) {
            return function (_49) {
                return EQ.value;
            };
        });
    };
    var eqString = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordString = function (_) {
        return new Ord(function (__1) {
            return eqString({});
        }, unsafeCompare);
    };
    var eqNumber = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordNumber = function (_) {
        return new Ord(function (__1) {
            return eqNumber({});
        }, unsafeCompare);
    };
    var eqBoolean = function (_) {
        return new Eq(refIneq, refEq);
    };
    var ordBoolean = function (_) {
        return new Ord(function (__1) {
            return eqBoolean({});
        }, function (_50) {
            return function (_51) {
                if (!_50 && !_51) {
                    return EQ.value;
                };
                if (!_50 && _51) {
                    return LT.value;
                };
                if (_50 && _51) {
                    return EQ.value;
                };
                if (_50 && !_51) {
                    return GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
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
                return (function (_355) {
                    if (_355 instanceof LT) {
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
                return (function (_356) {
                    if (_356 instanceof GT) {
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
                return (function (_357) {
                    if (_357 instanceof GT) {
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
                return (function (_358) {
                    if (_358 instanceof LT) {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_13)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return new Category(function (__1) {
            return semigroupoidArr({});
        }, function (x) {
            return x;
        });
    };
    var boolLikeBoolean = function (_) {
        return new BoolLike(boolAnd, boolNot, boolOr);
    };
    var eqArray = function (__dict_Eq_7) {
        return new Eq(function (xs) {
            return function (ys) {
                return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_7))(xs)(ys));
            };
        }, function (xs) {
            return function (ys) {
                return eqArrayImpl($eq$eq(__dict_Eq_7))(xs)(ys);
            };
        });
    };
    var ordArray = function (__dict_Ord_9) {
        return new Ord(function (_) {
            return eqArray(__dict_Ord_9["__superclass_Prelude.Eq_0"]({}));
        }, function (_52) {
            return function (_53) {
                if (_52.length === 0 && _53.length === 0) {
                    return EQ.value;
                };
                if (_52.length === 0) {
                    return LT.value;
                };
                if (_53.length === 0) {
                    return GT.value;
                };
                if (_52.length > 0) {
                    var _365 = _52.slice(1);
                    if (_53.length > 0) {
                        var _363 = _53.slice(1);
                        return (function (_361) {
                            if (_361 instanceof EQ) {
                                return compare(ordArray(__dict_Ord_9))(_365)(_363);
                            };
                            return _361;
                        })(compare(__dict_Ord_9)(_52[0])(_53[0]));
                    };
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqOrdering = function (_) {
        return new Eq(function (x) {
            return function (y) {
                return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
            };
        }, function (_45) {
            return function (_46) {
                if (_45 instanceof LT && _46 instanceof LT) {
                    return true;
                };
                if (_45 instanceof GT && _46 instanceof GT) {
                    return true;
                };
                if (_45 instanceof EQ && _46 instanceof EQ) {
                    return true;
                };
                return false;
            };
        });
    };
    var bitsNumber = function (_) {
        return new Bits(numAnd, numXor, numComplement, numShl, numShr, numZshr, numOr);
    };
    var asTypeOf = function (_37) {
        return function (_38) {
            return _37;
        };
    };
    var applyArr = function (_) {
        return new Apply(function (f) {
            return function (g) {
                return function (x) {
                    return f(x)(g(x));
                };
            };
        }, function (__1) {
            return functorArr({});
        });
    };
    var bindArr = function (_) {
        return new Bind(function (m) {
            return function (f) {
                return function (x) {
                    return f(m(x))(x);
                };
            };
        }, function (__1) {
            return applyArr({});
        });
    };
    var applicativeArr = function (_) {
        return new Applicative(function (__1) {
            return applyArr({});
        }, $$const);
    };
    var monadArr = function (_) {
        return new Monad(function (__1) {
            return applicativeArr({});
        }, function (__1) {
            return bindArr({});
        });
    };
    var ap = function (__dict_Monad_14) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(f)(function (_2) {
                    return $greater$greater$eq(__dict_Monad_14["__superclass_Prelude.Bind_1"]({}))(a)(function (_1) {
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
        Semigroup: Semigroup, 
        BoolLike: BoolLike, 
        Bits: Bits, 
        Ord: Ord, 
        Eq: Eq, 
        Num: Num, 
        Monad: Monad, 
        Bind: Bind, 
        Applicative: Applicative, 
        Apply: Apply, 
        Functor: Functor, 
        Show: Show, 
        Category: Category, 
        Semigroupoid: Semigroupoid, 
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
    var Prelude = PS.Prelude;
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Math = (function () {
    "use strict";
    var Prelude = PS.Prelude;
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
        sqrt1_2: sqrt1_2, 
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
PS.Data_Function = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function mkFn0(fn) {  return function() {    return fn({});  };};
    function mkFn1(fn) {  return function(a) {    return fn(a);  };};
    function mkFn2(fn) {  return function(a, b) {    return fn(a)(b);  };};
    function mkFn3(fn) {  return function(a, b, c) {    return fn(a)(b)(c);  };};
    function mkFn4(fn) {  return function(a, b, c, d) {    return fn(a)(b)(c)(d);  };};
    function mkFn5(fn) {  return function(a, b, c, d, e) {    return fn(a)(b)(c)(d)(e);  };};
    function mkFn6(fn) {  return function(a, b, c, d, e, f) {    return fn(a)(b)(c)(d)(e)(f);  };};
    function mkFn7(fn) {  return function(a, b, c, d, e, f, g) {    return fn(a)(b)(c)(d)(e)(f)(g);  };};
    function mkFn8(fn) {  return function(a, b, c, d, e, f, g, h) {    return fn(a)(b)(c)(d)(e)(f)(g)(h);  };};
    function mkFn9(fn) {  return function(a, b, c, d, e, f, g, h, i) {    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i);  };};
    function mkFn10(fn) {  return function(a, b, c, d, e, f, g, h, i, j) {    return fn(a)(b)(c)(d)(e)(f)(g)(h)(i)(j);  };};
    function runFn0(fn) {  return fn();};
    function runFn1(fn) {  return function(a) {    return fn(a);  };};
    function runFn2(fn) {  return function(a) {    return function(b) {      return fn(a, b);    };  };};
    function runFn3(fn) {  return function(a) {    return function(b) {      return function(c) {        return fn(a, b, c);      };    };  };};
    function runFn4(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return fn(a, b, c, d);        };      };    };  };};
    function runFn5(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return fn(a, b, c, d, e);          };        };      };    };  };};
    function runFn6(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return fn(a, b, c, d, e, f);            };          };        };      };    };  };};
    function runFn7(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return fn(a, b, c, d, e, f, g);              };            };          };        };      };    };  };};
    function runFn8(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return fn(a, b, c, d, e, f, g, h);                };              };            };          };        };      };    };  };};
    function runFn9(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return function(i) {                    return fn(a, b, c, d, e, f, g, h, i);                  };                };              };            };          };        };      };    };  };};
    function runFn10(fn) {  return function(a) {    return function(b) {      return function(c) {        return function(d) {          return function(e) {            return function(f) {              return function(g) {                return function(h) {                  return function(i) {                    return function(j) {                      return fn(a, b, c, d, e, f, g, h, i, j);                    };                  };                };              };            };          };        };      };    };  };};
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
        runFn10: runFn10, 
        runFn9: runFn9, 
        runFn8: runFn8, 
        runFn7: runFn7, 
        runFn6: runFn6, 
        runFn5: runFn5, 
        runFn4: runFn4, 
        runFn3: runFn3, 
        runFn2: runFn2, 
        runFn1: runFn1, 
        runFn0: runFn0, 
        mkFn10: mkFn10, 
        mkFn9: mkFn9, 
        mkFn8: mkFn8, 
        mkFn7: mkFn7, 
        mkFn6: mkFn6, 
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
    var Ref = {
        create: function (value) {
            return value;
        }
    };
    var liftRef = function (_56) {
        return function (_57) {
            return function (_58) {
                return _56(_57)(_58);
            };
        };
    };
    var functorRef = function (_) {
        return new Prelude.Functor(function (_59) {
            return function (_60) {
                return _59(_60);
            };
        });
    };
    var eqRef = function (_) {
        return new Prelude.Eq(liftRef(Prelude.refIneq), liftRef(Prelude.refEq));
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
    function Left(value0) {
        this.value0 = value0;
    };
    Left.create = function (value0) {
        return new Left(value0);
    };
    function Right(value0) {
        this.value0 = value0;
    };
    Right.create = function (value0) {
        return new Right(value0);
    };
    var showEither = function (__dict_Show_15) {
        return function (__dict_Show_16) {
            return new Prelude.Show(function (_68) {
                if (_68 instanceof Left) {
                    return "Left (" + Prelude.show(__dict_Show_15)(_68.value0) + ")";
                };
                if (_68 instanceof Right) {
                    return "Right (" + Prelude.show(__dict_Show_16)(_68.value0) + ")";
                };
                throw new Error("Failed pattern match");
            });
        };
    };
    var functorEither = function (_) {
        return new Prelude.Functor(function (_64) {
            return function (_65) {
                if (_65 instanceof Left) {
                    return new Left(_65.value0);
                };
                if (_65 instanceof Right) {
                    return new Right(_64(_65.value0));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var eqEither = function (__dict_Eq_19) {
        return function (__dict_Eq_20) {
            return new Prelude.Eq(function (a) {
                return function (b) {
                    return !Prelude["=="](eqEither(__dict_Eq_19)(__dict_Eq_20))(a)(b);
                };
            }, function (_69) {
                return function (_70) {
                    if (_69 instanceof Left && _70 instanceof Left) {
                        return Prelude["=="](__dict_Eq_19)(_69.value0)(_70.value0);
                    };
                    if (_69 instanceof Right && _70 instanceof Right) {
                        return Prelude["=="](__dict_Eq_20)(_69.value0)(_70.value0);
                    };
                    return false;
                };
            });
        };
    };
    var ordEither = function (__dict_Ord_17) {
        return function (__dict_Ord_18) {
            return new Prelude.Ord(function (_) {
                return eqEither(__dict_Ord_17["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_18["__superclass_Prelude.Eq_0"]({}));
            }, function (_71) {
                return function (_72) {
                    if (_71 instanceof Left && _72 instanceof Left) {
                        return Prelude.compare(__dict_Ord_17)(_71.value0)(_72.value0);
                    };
                    if (_71 instanceof Right && _72 instanceof Right) {
                        return Prelude.compare(__dict_Ord_18)(_71.value0)(_72.value0);
                    };
                    if (_71 instanceof Left) {
                        return Prelude.LT.value;
                    };
                    if (_72 instanceof Left) {
                        return Prelude.GT.value;
                    };
                    throw new Error("Failed pattern match");
                };
            });
        };
    };
    var either = function (_61) {
        return function (_62) {
            return function (_63) {
                if (_63 instanceof Left) {
                    return _61(_63.value0);
                };
                if (_63 instanceof Right) {
                    return _62(_63.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isLeft = either(Prelude["const"](true))(Prelude["const"](false));
    var isRight = either(Prelude["const"](false))(Prelude["const"](true));
    var applyEither = function (_) {
        return new Prelude.Apply(function (_66) {
            return function (_67) {
                if (_66 instanceof Left) {
                    return new Left(_66.value0);
                };
                if (_66 instanceof Right) {
                    return Prelude["<$>"](functorEither({}))(_66.value0)(_67);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return functorEither({});
        });
    };
    var bindEither = function (_) {
        return new Prelude.Bind(either(function (e) {
            return function (__1) {
                return new Left(e);
            };
        })(function (a) {
            return function (f) {
                return f(a);
            };
        }), function (__1) {
            return applyEither({});
        });
    };
    var applicativeEither = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyEither({});
        }, Right.create);
    };
    var monadEither = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeEither({});
        }, function (__1) {
            return bindEither({});
        });
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
        return new Prelude.Applicative(function (__1) {
            return applyEff({});
        }, returnE);
    };
    var applyEff = function (_) {
        return new Prelude.Apply(Prelude.ap(monadEff({})), function (__1) {
            return functorEff({});
        });
    };
    var monadEff = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeEff({});
        }, function (__1) {
            return bindEff({});
        });
    };
    var bindEff = function (_) {
        return new Prelude.Bind(bindE, function (__1) {
            return applyEff({});
        });
    };
    var functorEff = function (_) {
        return new Prelude.Functor(Prelude.liftA1(applicativeEff({})));
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
    var Prelude = PS.Prelude;
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    var Prelude = PS.Prelude;
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
    var print = function (__dict_Show_21) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_21)(o));
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
    var when = function (__dict_Monad_22) {
        return function (_78) {
            return function (_79) {
                if (_78) {
                    return _79;
                };
                if (!_78) {
                    return Prelude["return"](__dict_Monad_22)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var unless = function (__dict_Monad_23) {
        return function (_80) {
            return function (_81) {
                if (!_80) {
                    return _81;
                };
                if (_80) {
                    return Prelude["return"](__dict_Monad_23)(Prelude.unit);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var replicateM = function (__dict_Monad_24) {
        return function (_73) {
            return function (_74) {
                if (_73 === 0) {
                    return Prelude["return"](__dict_Monad_24)([  ]);
                };
                return Prelude[">>="](__dict_Monad_24["__superclass_Prelude.Bind_1"]({}))(_74)(function (_4) {
                    return Prelude[">>="](__dict_Monad_24["__superclass_Prelude.Bind_1"]({}))(replicateM(__dict_Monad_24)(_73 - 1)(_74))(function (_3) {
                        return Prelude["return"](__dict_Monad_24)(Prelude[":"](_4)(_3));
                    });
                });
            };
        };
    };
    var foldM = function (__dict_Monad_25) {
        return function (_75) {
            return function (_76) {
                return function (_77) {
                    if (_77.length === 0) {
                        return Prelude["return"](__dict_Monad_25)(_76);
                    };
                    if (_77.length > 0) {
                        var _419 = _77.slice(1);
                        return Prelude[">>="](__dict_Monad_25["__superclass_Prelude.Bind_1"]({}))(_75(_76)(_77[0]))(function (a$prime) {
                            return foldM(__dict_Monad_25)(_75)(a$prime)(_419);
                        });
                    };
                    throw new Error("Failed pattern match");
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
PS.Control_Lazy = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Lazy(defer) {
        this.defer = defer;
    };
    function Lazy1(defer1) {
        this.defer1 = defer1;
    };
    function Lazy2(defer2) {
        this.defer2 = defer2;
    };
    var defer2 = function (dict) {
        return dict.defer2;
    };
    var fix2 = function (__dict_Lazy2_26) {
        return function (f) {
            return defer2(__dict_Lazy2_26)(function (_) {
                return f(fix2(__dict_Lazy2_26)(f));
            });
        };
    };
    var defer1 = function (dict) {
        return dict.defer1;
    };
    var fix1 = function (__dict_Lazy1_27) {
        return function (f) {
            return defer1(__dict_Lazy1_27)(function (_) {
                return f(fix1(__dict_Lazy1_27)(f));
            });
        };
    };
    var defer = function (dict) {
        return dict.defer;
    };
    var fix = function (__dict_Lazy_28) {
        return function (f) {
            return defer(__dict_Lazy_28)(function (_) {
                return f(fix(__dict_Lazy_28)(f));
            });
        };
    };
    return {
        Lazy2: Lazy2, 
        Lazy1: Lazy1, 
        Lazy: Lazy, 
        fix2: fix2, 
        fix1: fix1, 
        fix: fix, 
        defer2: defer2, 
        defer1: defer1, 
        defer: defer
    };
})();
var PS = PS || {};
PS.Control_Bind = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var $greater$eq$greater = function (__dict_Bind_29) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return Prelude[">>="](__dict_Bind_29)(f(a))(g);
                };
            };
        };
    };
    var $eq$less$less = function (__dict_Bind_30) {
        return function (f) {
            return function (m) {
                return Prelude[">>="](__dict_Bind_30)(m)(f);
            };
        };
    };
    var $less$eq$less = function (__dict_Bind_31) {
        return function (f) {
            return function (g) {
                return function (a) {
                    return $eq$less$less(__dict_Bind_31)(f)(g(a));
                };
            };
        };
    };
    var join = function (__dict_Bind_32) {
        return function (m) {
            return Prelude[">>="](__dict_Bind_32)(m)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var ifM = function (__dict_Bind_33) {
        return function (cond) {
            return function (t) {
                return function (f) {
                    return Prelude[">>="](__dict_Bind_33)(cond)(function (cond$prime) {
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
    var $less$times = function (__dict_Apply_34) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_34)(Prelude["<$>"](__dict_Apply_34["__superclass_Prelude.Functor_0"]({}))(Prelude["const"])(a))(b);
            };
        };
    };
    var $times$greater = function (__dict_Apply_35) {
        return function (a) {
            return function (b) {
                return Prelude["<*>"](__dict_Apply_35)(Prelude["<$>"](__dict_Apply_35["__superclass_Prelude.Functor_0"]({}))(Prelude["const"](Prelude.id(Prelude.categoryArr({}))))(a))(b);
            };
        };
    };
    var lift5 = function (__dict_Apply_36) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return function (e) {
                                return Prelude["<*>"](__dict_Apply_36)(Prelude["<*>"](__dict_Apply_36)(Prelude["<*>"](__dict_Apply_36)(Prelude["<*>"](__dict_Apply_36)(Prelude["<$>"](__dict_Apply_36["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d))(e);
                            };
                        };
                    };
                };
            };
        };
    };
    var lift4 = function (__dict_Apply_37) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return function (d) {
                            return Prelude["<*>"](__dict_Apply_37)(Prelude["<*>"](__dict_Apply_37)(Prelude["<*>"](__dict_Apply_37)(Prelude["<$>"](__dict_Apply_37["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c))(d);
                        };
                    };
                };
            };
        };
    };
    var lift3 = function (__dict_Apply_38) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return function (c) {
                        return Prelude["<*>"](__dict_Apply_38)(Prelude["<*>"](__dict_Apply_38)(Prelude["<$>"](__dict_Apply_38["__superclass_Prelude.Functor_0"]({}))(f)(a))(b))(c);
                    };
                };
            };
        };
    };
    var lift2 = function (__dict_Apply_39) {
        return function (f) {
            return function (a) {
                return function (b) {
                    return Prelude["<*>"](__dict_Apply_39)(Prelude["<$>"](__dict_Apply_39["__superclass_Prelude.Functor_0"]({}))(f)(a))(b);
                };
            };
        };
    };
    var forever = function (__dict_Apply_40) {
        return function (a) {
            return $times$greater(__dict_Apply_40)(a)(forever(__dict_Apply_40)(a));
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
PS.Control_Alt = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Alt($less$bar$greater, __superclass_Prelude$dotFunctor_0) {
        this["<|>"] = $less$bar$greater;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    return {
        Alt: Alt, 
        "<|>": $less$bar$greater
    };
})();
var PS = PS || {};
PS.Control_Plus = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function Plus(__superclass_Control$dotAlt$dotAlt_0, empty) {
        this["__superclass_Control.Alt.Alt_0"] = __superclass_Control$dotAlt$dotAlt_0;
        this.empty = empty;
    };
    var empty = function (dict) {
        return dict.empty;
    };
    return {
        Plus: Plus, 
        empty: empty
    };
})();
var PS = PS || {};
PS.Control_Alternative = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Lazy = PS.Control_Lazy;
    function Alternative(__superclass_Control$dotPlus$dotPlus_1, __superclass_Prelude$dotApplicative_0) {
        this["__superclass_Control.Plus.Plus_1"] = __superclass_Control$dotPlus$dotPlus_1;
        this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
    };
    var many = function (__dict_Alternative_41) {
        return function (__dict_Lazy1_42) {
            return function (v) {
                return Control_Alt["<|>"]((__dict_Alternative_41["__superclass_Control.Plus.Plus_1"]({}))["__superclass_Control.Alt.Alt_0"]({}))(some(__dict_Alternative_41)(__dict_Lazy1_42)(v))(Prelude.pure(__dict_Alternative_41["__superclass_Prelude.Applicative_0"]({}))([  ]));
            };
        };
    };
    var some = function (__dict_Alternative_43) {
        return function (__dict_Lazy1_44) {
            return function (v) {
                return Prelude["<*>"]((__dict_Alternative_43["__superclass_Prelude.Applicative_0"]({}))["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"](((__dict_Alternative_43["__superclass_Control.Plus.Plus_1"]({}))["__superclass_Control.Alt.Alt_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(v))(Control_Lazy.defer1(__dict_Lazy1_44)(function (_) {
                    return many(__dict_Alternative_43)(__dict_Lazy1_44)(v);
                }));
            };
        };
    };
    return {
        Alternative: Alternative, 
        many: many, 
        some: some
    };
})();
var PS = PS || {};
PS.Control_MonadPlus = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Plus = PS.Control_Plus;
    function MonadPlus(__superclass_Control$dotAlternative$dotAlternative_1, __superclass_Prelude$dotMonad_0) {
        this["__superclass_Control.Alternative.Alternative_1"] = __superclass_Control$dotAlternative$dotAlternative_1;
        this["__superclass_Prelude.Monad_0"] = __superclass_Prelude$dotMonad_0;
    };
    var guard = function (__dict_MonadPlus_45) {
        return function (_82) {
            if (_82) {
                return Prelude["return"](__dict_MonadPlus_45["__superclass_Prelude.Monad_0"]({}))(Prelude.unit);
            };
            if (!_82) {
                return Control_Plus.empty((__dict_MonadPlus_45["__superclass_Control.Alternative.Alternative_1"]({}))["__superclass_Control.Plus.Plus_1"]({}));
            };
            throw new Error("Failed pattern match");
        };
    };
    return {
        MonadPlus: MonadPlus, 
        guard: guard
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
    function Nothing() {

    };
    Nothing.value = new Nothing();
    function Just(value0) {
        this.value0 = value0;
    };
    Just.create = function (value0) {
        return new Just(value0);
    };
    var showMaybe = function (__dict_Show_46) {
        return new Prelude.Show(function (_94) {
            if (_94 instanceof Just) {
                return "Just (" + Prelude.show(__dict_Show_46)(_94.value0) + ")";
            };
            if (_94 instanceof Nothing) {
                return "Nothing";
            };
            throw new Error("Failed pattern match");
        });
    };
    var maybe = function (_83) {
        return function (_84) {
            return function (_85) {
                if (_85 instanceof Nothing) {
                    return _83;
                };
                if (_85 instanceof Just) {
                    return _84(_85.value0);
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return new Prelude.Functor(function (_86) {
            return function (_87) {
                if (_87 instanceof Just) {
                    return new Just(_86(_87.value0));
                };
                return Nothing.value;
            };
        });
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_48) {
        return new Prelude.Eq(function (a) {
            return function (b) {
                return !Prelude["=="](eqMaybe(__dict_Eq_48))(a)(b);
            };
        }, function (_95) {
            return function (_96) {
                if (_95 instanceof Nothing && _96 instanceof Nothing) {
                    return true;
                };
                if (_95 instanceof Just && _96 instanceof Just) {
                    return Prelude["=="](__dict_Eq_48)(_95.value0)(_96.value0);
                };
                return false;
            };
        });
    };
    var ordMaybe = function (__dict_Ord_47) {
        return new Prelude.Ord(function (_) {
            return eqMaybe(__dict_Ord_47["__superclass_Prelude.Eq_0"]({}));
        }, function (_97) {
            return function (_98) {
                if (_97 instanceof Just && _98 instanceof Just) {
                    return Prelude.compare(__dict_Ord_47)(_97.value0)(_98.value0);
                };
                if (_97 instanceof Nothing && _98 instanceof Nothing) {
                    return Prelude.EQ.value;
                };
                if (_97 instanceof Nothing) {
                    return Prelude.LT.value;
                };
                if (_98 instanceof Nothing) {
                    return Prelude.GT.value;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var applyMaybe = function (_) {
        return new Prelude.Apply(function (_88) {
            return function (_89) {
                if (_88 instanceof Just) {
                    return Prelude["<$>"](functorMaybe({}))(_88.value0)(_89);
                };
                if (_88 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return functorMaybe({});
        });
    };
    var bindMaybe = function (_) {
        return new Prelude.Bind(function (_92) {
            return function (_93) {
                if (_92 instanceof Just) {
                    return _93(_92.value0);
                };
                if (_92 instanceof Nothing) {
                    return Nothing.value;
                };
                throw new Error("Failed pattern match");
            };
        }, function (__1) {
            return applyMaybe({});
        });
    };
    var applicativeMaybe = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyMaybe({});
        }, Just.create);
    };
    var monadMaybe = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeMaybe({});
        }, function (__1) {
            return bindMaybe({});
        });
    };
    var altMaybe = function (_) {
        return new Control_Alt.Alt(function (_90) {
            return function (_91) {
                if (_90 instanceof Nothing) {
                    return _91;
                };
                return _90;
            };
        }, function (__1) {
            return functorMaybe({});
        });
    };
    var plusMaybe = function (_) {
        return new Control_Plus.Plus(function (__1) {
            return altMaybe({});
        }, Nothing.value);
    };
    var alternativeMaybe = function (_) {
        return new Control_Alternative.Alternative(function (__1) {
            return plusMaybe({});
        }, function (__1) {
            return applicativeMaybe({});
        });
    };
    var monadPlusMaybe = function (_) {
        return new Control_MonadPlus.MonadPlus(function (__1) {
            return alternativeMaybe({});
        }, function (__1) {
            return monadMaybe({});
        });
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
        altMaybe: altMaybe, 
        plusMaybe: plusMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        monadPlusMaybe: monadPlusMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Array = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Control_Alt = PS.Control_Alt;
    var Control_Plus = PS.Control_Plus;
    var Control_Alternative = PS.Control_Alternative;
    var Control_MonadPlus = PS.Control_MonadPlus;
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
            var isInt = function (n_1) {
                return n_1 !== ~~n_1;
            };
            return n < 0 || n >= length(xs) || isInt(n) ? Data_Maybe.Nothing.value : new Data_Maybe.Just(xs[n]);
        };
    };
    var take = function (n) {
        return slice(0)(n);
    };
    var tail = function (_101) {
        if (_101.length > 0) {
            var _448 = _101.slice(1);
            return new Data_Maybe.Just(_448);
        };
        return Data_Maybe.Nothing.value;
    };
    var span = (function () {
        var go = function (__copy__117) {
            return function (__copy__118) {
                return function (__copy__119) {
                    var _117 = __copy__117;
                    var _118 = __copy__118;
                    var _119 = __copy__119;
                    tco: while (true) {
                        if (_119.length > 0) {
                            var _453 = _119.slice(1);
                            if (_118(_119[0])) {
                                var __tco__117 = Prelude[":"](_119[0])(_117);
                                var __tco__118 = _118;
                                _117 = __tco__117;
                                _118 = __tco__118;
                                _119 = _453;
                                continue tco;
                            };
                        };
                        return {
                            init: reverse(_117), 
                            rest: _119
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
                    return (function (_454) {
                        if (_454 instanceof Prelude.GT) {
                            return 1;
                        };
                        if (_454 instanceof Prelude.EQ) {
                            return 0;
                        };
                        if (_454 instanceof Prelude.LT) {
                            return -1;
                        };
                        throw new Error("Failed pattern match");
                    })(comp(x)(y));
                };
            };
            return sortJS(comp$prime)(xs);
        };
    };
    var sort = function (__dict_Ord_49) {
        return function (xs) {
            return sortBy(Prelude.compare(__dict_Ord_49))(xs);
        };
    };
    var singleton = function (a) {
        return [ a ];
    };
    var semigroupArray = function (_) {
        return new Prelude.Semigroup(append);
    };
    var $$null = function (_103) {
        if (_103.length === 0) {
            return true;
        };
        return false;
    };
    var nubBy = function (_110) {
        return function (_111) {
            if (_111.length === 0) {
                return [  ];
            };
            if (_111.length > 0) {
                var _459 = _111.slice(1);
                return Prelude[":"](_111[0])(nubBy(_110)(filter(function (y) {
                    return !_110(_111[0])(y);
                })(_459)));
            };
            throw new Error("Failed pattern match");
        };
    };
    var nub = function (__dict_Eq_50) {
        return nubBy(Prelude["=="](__dict_Eq_50));
    };
    var mapMaybe = function (f) {
        return concatMap(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe.maybe([  ])(singleton))(f));
    };
    var last = function (__copy__100) {
        var _100 = __copy__100;
        tco: while (true) {
            if (_100.length > 0) {
                var _462 = _100.slice(1);
                if (_462.length === 0) {
                    return new Data_Maybe.Just(_100[0]);
                };
            };
            if (_100.length > 0) {
                var _464 = _100.slice(1);
                _100 = _464;
                continue tco;
            };
            return Data_Maybe.Nothing.value;
        };
    };
    var intersectBy = function (_107) {
        return function (_108) {
            return function (_109) {
                if (_108.length === 0) {
                    return [  ];
                };
                if (_109.length === 0) {
                    return [  ];
                };
                var el = function (x) {
                    return findIndex(_107(x))(_109) >= 0;
                };
                return filter(el)(_108);
            };
        };
    };
    var intersect = function (__dict_Eq_51) {
        return intersectBy(Prelude["=="](__dict_Eq_51));
    };
    var init = function (_102) {
        if (_102.length === 0) {
            return Data_Maybe.Nothing.value;
        };
        return new Data_Maybe.Just(slice(0)(length(_102) - 1)(_102));
    };
    var head = function (_99) {
        if (_99.length > 0) {
            var _471 = _99.slice(1);
            return new Data_Maybe.Just(_99[0]);
        };
        return Data_Maybe.Nothing.value;
    };
    var groupBy = (function () {
        var go = function (__copy__114) {
            return function (__copy__115) {
                return function (__copy__116) {
                    var _114 = __copy__114;
                    var _115 = __copy__115;
                    var _116 = __copy__116;
                    tco: while (true) {
                        if (_116.length === 0) {
                            return reverse(_114);
                        };
                        if (_116.length > 0) {
                            var _476 = _116.slice(1);
                            var sp = span(_115(_116[0]))(_476);
                            var __tco__114 = Prelude[":"](Prelude[":"](_116[0])(sp.init))(_114);
                            var __tco__115 = _115;
                            _114 = __tco__114;
                            _115 = __tco__115;
                            _116 = sp.rest;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        return go([  ]);
    })();
    var group = function (__dict_Eq_52) {
        return function (xs) {
            return groupBy(Prelude["=="](__dict_Eq_52))(xs);
        };
    };
    var group$prime = function (__dict_Ord_53) {
        return Prelude["<<<"](Prelude.semigroupoidArr({}))(group(__dict_Ord_53["__superclass_Prelude.Eq_0"]({})))(sort(__dict_Ord_53));
    };
    var functorArray = function (_) {
        return new Prelude.Functor(map);
    };
    var elemLastIndex = function (__dict_Eq_54) {
        return function (x) {
            return findLastIndex(Prelude["=="](__dict_Eq_54)(x));
        };
    };
    var elemIndex = function (__dict_Eq_55) {
        return function (x) {
            return findIndex(Prelude["=="](__dict_Eq_55)(x));
        };
    };
    var deleteBy = function (_104) {
        return function (_105) {
            return function (_106) {
                if (_106.length === 0) {
                    return [  ];
                };
                return (function (_480) {
                    if (_480 < 0) {
                        return _106;
                    };
                    return deleteAt(_480)(1)(_106);
                })(findIndex(_104(_105))(_106));
            };
        };
    };
    var $$delete = function (__dict_Eq_56) {
        return deleteBy(Prelude["=="](__dict_Eq_56));
    };
    var $bslash$bslash = function (__dict_Eq_57) {
        return function (xs) {
            return function (ys) {
                var go = function (__copy__112) {
                    return function (__copy__113) {
                        var _112 = __copy__112;
                        var _113 = __copy__113;
                        tco: while (true) {
                            if (_113.length === 0) {
                                return _112;
                            };
                            if (_112.length === 0) {
                                return [  ];
                            };
                            if (_113.length > 0) {
                                var _484 = _113.slice(1);
                                var __tco__112 = $$delete(__dict_Eq_57)(_113[0])(_112);
                                _112 = __tco__112;
                                _113 = _484;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
                return go(xs)(ys);
            };
        };
    };
    var catMaybes = concatMap(Data_Maybe.maybe([  ])(singleton));
    var applicativeArray = function (_) {
        return new Prelude.Applicative(function (__1) {
            return applyArray({});
        }, singleton);
    };
    var applyArray = function (_) {
        return new Prelude.Apply(Prelude.ap(monadArray({})), function (__1) {
            return functorArray({});
        });
    };
    var monadArray = function (_) {
        return new Prelude.Monad(function (__1) {
            return applicativeArray({});
        }, function (__1) {
            return bindArray({});
        });
    };
    var bindArray = function (_) {
        return new Prelude.Bind(Prelude.flip(concatMap), function (__1) {
            return applyArray({});
        });
    };
    var altArray = function (_) {
        return new Control_Alt.Alt(append, function (__1) {
            return functorArray({});
        });
    };
    var plusArray = function (_) {
        return new Control_Plus.Plus(function (__1) {
            return altArray({});
        }, [  ]);
    };
    var alternativeArray = function (_) {
        return new Control_Alternative.Alternative(function (__1) {
            return plusArray({});
        }, function (__1) {
            return applicativeArray({});
        });
    };
    var monadPlusArray = function (_) {
        return new Control_MonadPlus.MonadPlus(function (__1) {
            return alternativeArray({});
        }, function (__1) {
            return monadArray({});
        });
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
        altArray: altArray, 
        plusArray: plusArray, 
        alternativeArray: alternativeArray, 
        monadPlusArray: monadPlusArray
    };
})();
var PS = PS || {};
PS.Data_Monoid = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    function Monoid(__superclass_Prelude$dotSemigroup_0, mempty) {
        this["__superclass_Prelude.Semigroup_0"] = __superclass_Prelude$dotSemigroup_0;
        this.mempty = mempty;
    };
    var monoidUnit = function (_) {
        return new Monoid(function (__1) {
            return Prelude.semigroupUnit({});
        }, Prelude.unit);
    };
    var monoidString = function (_) {
        return new Monoid(function (__1) {
            return Prelude.semigroupString({});
        }, "");
    };
    var monoidArray = function (_) {
        return new Monoid(function (__1) {
            return Data_Array.semigroupArray({});
        }, [  ]);
    };
    var mempty = function (dict) {
        return dict.mempty;
    };
    return {
        Monoid: Monoid, 
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
    var Data_Monoid = PS.Data_Monoid;
    var All = {
        create: function (value) {
            return value;
        }
    };
    var showAll = function (_) {
        return new Prelude.Show(function (_125) {
            return "All (" + Prelude.show(Prelude.showBoolean({}))(_125) + ")";
        });
    };
    var semigroupAll = function (_) {
        return new Prelude.Semigroup(function (_126) {
            return function (_127) {
                return _126 && _127;
            };
        });
    };
    var runAll = function (_120) {
        return _120;
    };
    var monoidAll = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupAll({});
        }, true);
    };
    var eqAll = function (_) {
        return new Prelude.Eq(function (_123) {
            return function (_124) {
                return _123 !== _124;
            };
        }, function (_121) {
            return function (_122) {
                return _121 === _122;
            };
        });
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
    var Data_Monoid = PS.Data_Monoid;
    var Any = {
        create: function (value) {
            return value;
        }
    };
    var showAny = function (_) {
        return new Prelude.Show(function (_133) {
            return "Any (" + Prelude.show(Prelude.showBoolean({}))(_133) + ")";
        });
    };
    var semigroupAny = function (_) {
        return new Prelude.Semigroup(function (_134) {
            return function (_135) {
                return _134 || _135;
            };
        });
    };
    var runAny = function (_128) {
        return _128;
    };
    var monoidAny = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupAny({});
        }, false);
    };
    var eqAny = function (_) {
        return new Prelude.Eq(function (_131) {
            return function (_132) {
                return _131 !== _132;
            };
        }, function (_129) {
            return function (_130) {
                return _129 === _130;
            };
        });
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
    var Dual = {
        create: function (value) {
            return value;
        }
    };
    var showDual = function (__dict_Show_58) {
        return new Prelude.Show(function (_143) {
            return "Dual (" + Prelude.show(__dict_Show_58)(_143) + ")";
        });
    };
    var semigroupDual = function (__dict_Semigroup_59) {
        return new Prelude.Semigroup(function (_144) {
            return function (_145) {
                return Prelude["<>"](__dict_Semigroup_59)(_145)(_144);
            };
        });
    };
    var runDual = function (_136) {
        return _136;
    };
    var monoidDual = function (__dict_Monoid_61) {
        return new Data_Monoid.Monoid(function (_) {
            return semigroupDual(__dict_Monoid_61["__superclass_Prelude.Semigroup_0"]({}));
        }, Data_Monoid.mempty(__dict_Monoid_61));
    };
    var eqDual = function (__dict_Eq_62) {
        return new Prelude.Eq(function (_139) {
            return function (_140) {
                return Prelude["/="](__dict_Eq_62)(_139)(_140);
            };
        }, function (_137) {
            return function (_138) {
                return Prelude["=="](__dict_Eq_62)(_137)(_138);
            };
        });
    };
    var ordDual = function (__dict_Ord_60) {
        return new Prelude.Ord(function (_) {
            return eqDual(__dict_Ord_60["__superclass_Prelude.Eq_0"]({}));
        }, function (_141) {
            return function (_142) {
                return Prelude.compare(__dict_Ord_60)(_141)(_142);
            };
        });
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
    var Data_Monoid = PS.Data_Monoid;
    var Endo = {
        create: function (value) {
            return value;
        }
    };
    var semigroupEndo = function (_) {
        return new Prelude.Semigroup(function (_147) {
            return function (_148) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(_147)(_148);
            };
        });
    };
    var runEndo = function (_146) {
        return _146;
    };
    var monoidEndo = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupEndo({});
        }, Prelude.id(Prelude.categoryArr({})));
    };
    return {
        Endo: Endo, 
        runEndo: runEndo, 
        semigroupEndo: semigroupEndo, 
        monoidEndo: monoidEndo
    };
})();
var PS = PS || {};
PS.Data_Monoid_Product = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Monoid = PS.Data_Monoid;
    var Product = {
        create: function (value) {
            return value;
        }
    };
    var showProduct = function (_) {
        return new Prelude.Show(function (_156) {
            return "Product (" + Prelude.show(Prelude.showNumber({}))(_156) + ")";
        });
    };
    var semigroupProduct = function (_) {
        return new Prelude.Semigroup(function (_157) {
            return function (_158) {
                return _157 * _158;
            };
        });
    };
    var runProduct = function (_149) {
        return _149;
    };
    var monoidProduct = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupProduct({});
        }, 1);
    };
    var eqProduct = function (_) {
        return new Prelude.Eq(function (_152) {
            return function (_153) {
                return _152 !== _153;
            };
        }, function (_150) {
            return function (_151) {
                return _150 === _151;
            };
        });
    };
    var ordProduct = function (_) {
        return new Prelude.Ord(function (__1) {
            return eqProduct({});
        }, function (_154) {
            return function (_155) {
                return Prelude.compare(Prelude.ordNumber({}))(_154)(_155);
            };
        });
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
    var Data_Monoid = PS.Data_Monoid;
    var Sum = {
        create: function (value) {
            return value;
        }
    };
    var showSum = function (_) {
        return new Prelude.Show(function (_166) {
            return "Sum (" + Prelude.show(Prelude.showNumber({}))(_166) + ")";
        });
    };
    var semigroupSum = function (_) {
        return new Prelude.Semigroup(function (_167) {
            return function (_168) {
                return _167 + _168;
            };
        });
    };
    var runSum = function (_159) {
        return _159;
    };
    var monoidSum = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupSum({});
        }, 0);
    };
    var eqSum = function (_) {
        return new Prelude.Eq(function (_162) {
            return function (_163) {
                return _162 !== _163;
            };
        }, function (_160) {
            return function (_161) {
                return _160 === _161;
            };
        });
    };
    var ordSum = function (_) {
        return new Prelude.Ord(function (__1) {
            return eqSum({});
        }, function (_164) {
            return function (_165) {
                return Prelude.compare(Prelude.ordNumber({}))(_164)(_165);
            };
        });
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
    var Prelude = PS.Prelude;
    var Data_Array = PS.Data_Array;
    var Control_Lazy = PS.Control_Lazy;
    var Data_Monoid = PS.Data_Monoid;
    function Tuple(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Tuple.create = function (value0) {
        return function (value1) {
            return new Tuple(value0, value1);
        };
    };
    var zip = Data_Array.zipWith(Tuple.create);
    var unzip = function (_173) {
        if (_173.length > 0) {
            var _539 = _173.slice(1);
            return (function (_535) {
                return new Tuple(Prelude[":"]((_173[0]).value0)(_535.value0), Prelude[":"]((_173[0]).value1)(_535.value1));
            })(unzip(_539));
        };
        if (_173.length === 0) {
            return new Tuple([  ], [  ]);
        };
        throw new Error("Failed pattern match");
    };
    var uncurry = function (_171) {
        return function (_172) {
            return _171(_172.value0)(_172.value1);
        };
    };
    var swap = function (_174) {
        return new Tuple(_174.value1, _174.value0);
    };
    var snd = function (_170) {
        return _170.value1;
    };
    var showTuple = function (__dict_Show_63) {
        return function (__dict_Show_64) {
            return new Prelude.Show(function (_175) {
                return "Tuple (" + Prelude.show(__dict_Show_63)(_175.value0) + ") (" + Prelude.show(__dict_Show_64)(_175.value1) + ")";
            });
        };
    };
    var functorTuple = function (_) {
        return new Prelude.Functor(function (_180) {
            return function (_181) {
                return new Tuple(_181.value0, _180(_181.value1));
            };
        });
    };
    var fst = function (_169) {
        return _169.value0;
    };
    var lazyLazy1Tuple = function (__dict_Lazy1_68) {
        return function (__dict_Lazy1_69) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer1(__dict_Lazy1_68)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer1(__dict_Lazy1_69)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var lazyLazy2Tuple = function (__dict_Lazy2_70) {
        return function (__dict_Lazy2_71) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer2(__dict_Lazy2_70)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer2(__dict_Lazy2_71)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var lazyTuple = function (__dict_Lazy_72) {
        return function (__dict_Lazy_73) {
            return new Control_Lazy.Lazy(function (f) {
                return new Tuple(Control_Lazy.defer(__dict_Lazy_72)(function (_) {
                    return fst(f(Prelude.unit));
                }), Control_Lazy.defer(__dict_Lazy_73)(function (_) {
                    return snd(f(Prelude.unit));
                }));
            });
        };
    };
    var eqTuple = function (__dict_Eq_74) {
        return function (__dict_Eq_75) {
            return new Prelude.Eq(function (t1) {
                return function (t2) {
                    return !Prelude["=="](eqTuple(__dict_Eq_74)(__dict_Eq_75))(t1)(t2);
                };
            }, function (_176) {
                return function (_177) {
                    return Prelude["=="](__dict_Eq_74)(_176.value0)(_177.value0) && Prelude["=="](__dict_Eq_75)(_176.value1)(_177.value1);
                };
            });
        };
    };
    var ordTuple = function (__dict_Ord_65) {
        return function (__dict_Ord_66) {
            return new Prelude.Ord(function (_) {
                return eqTuple(__dict_Ord_65["__superclass_Prelude.Eq_0"]({}))(__dict_Ord_66["__superclass_Prelude.Eq_0"]({}));
            }, function (_178) {
                return function (_179) {
                    return (function (_570) {
                        if (_570 instanceof Prelude.EQ) {
                            return Prelude.compare(__dict_Ord_66)(_178.value1)(_179.value1);
                        };
                        return _570;
                    })(Prelude.compare(__dict_Ord_65)(_178.value0)(_179.value0));
                };
            });
        };
    };
    var curry = function (f) {
        return function (a) {
            return function (b) {
                return f(new Tuple(a, b));
            };
        };
    };
    var applyTuple = function (__dict_Semigroup_77) {
        return new Prelude.Apply(function (_182) {
            return function (_183) {
                return new Tuple(Prelude["<>"](__dict_Semigroup_77)(_182.value0)(_183.value0), _182.value1(_183.value1));
            };
        }, functorTuple);
    };
    var bindTuple = function (__dict_Semigroup_76) {
        return new Prelude.Bind(function (_184) {
            return function (_185) {
                return (function (_583) {
                    return new Tuple(Prelude["<>"](__dict_Semigroup_76)(_184.value0)(_583.value0), _583.value1);
                })(_185(_184.value1));
            };
        }, function (_) {
            return applyTuple(__dict_Semigroup_76);
        });
    };
    var applicativeTuple = function (__dict_Monoid_78) {
        return new Prelude.Applicative(function (_) {
            return applyTuple(__dict_Monoid_78["__superclass_Prelude.Semigroup_0"]({}));
        }, Tuple.create(Data_Monoid.mempty(__dict_Monoid_78)));
    };
    var monadTuple = function (__dict_Monoid_67) {
        return new Prelude.Monad(function (_) {
            return applicativeTuple(__dict_Monoid_67);
        }, function (_) {
            return bindTuple(__dict_Monoid_67["__superclass_Prelude.Semigroup_0"]({}));
        });
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
        monadTuple: monadTuple, 
        lazyTuple: lazyTuple, 
        lazyLazy1Tuple: lazyLazy1Tuple, 
        lazyLazy2Tuple: lazyLazy2Tuple
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var fromJust = function (_186) {
        if (_186 instanceof Data_Maybe.Just) {
            return _186.value0;
        };
        throw new Error("Failed pattern match");
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Array_Unsafe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Prelude_Unsafe = PS.Prelude_Unsafe;
    var Data_Array = PS.Data_Array;
    var Data_Maybe_Unsafe = PS.Data_Maybe_Unsafe;
    var tail = function (_188) {
        if (_188.length > 0) {
            var _592 = _188.slice(1);
            return _592;
        };
        throw new Error("Failed pattern match");
    };
    var last = function (xs) {
        return xs[Data_Array.length(xs) - 1];
    };
    var init = Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Maybe_Unsafe.fromJust)(Data_Array.init);
    var head = function (_187) {
        if (_187.length > 0) {
            var _595 = _187.slice(1);
            return _187[0];
        };
        throw new Error("Failed pattern match");
    };
    return {
        init: init, 
        last: last, 
        tail: tail, 
        head: head
    };
})();
var PS = PS || {};
PS.Data_Monoid_First = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    var First = {
        create: function (value) {
            return value;
        }
    };
    var showFirst = function (__dict_Show_79) {
        return new Prelude.Show(function (_196) {
            return "First (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_79))(_196) + ")";
        });
    };
    var semigroupFirst = function (_) {
        return new Prelude.Semigroup(function (_197) {
            return function (_198) {
                if (_197 instanceof Data_Maybe.Just) {
                    return _197;
                };
                return _198;
            };
        });
    };
    var runFirst = function (_189) {
        return _189;
    };
    var monoidFirst = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupFirst({});
        }, Data_Maybe.Nothing.value);
    };
    var eqFirst = function (__dict_Eq_81) {
        return new Prelude.Eq(function (_192) {
            return function (_193) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_81))(_192)(_193);
            };
        }, function (_190) {
            return function (_191) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_81))(_190)(_191);
            };
        });
    };
    var ordFirst = function (__dict_Ord_80) {
        return new Prelude.Ord(function (_) {
            return eqFirst(__dict_Ord_80["__superclass_Prelude.Eq_0"]({}));
        }, function (_194) {
            return function (_195) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_80))(_194)(_195);
            };
        });
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
PS.Data_Foldable = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Control_Apply = PS.Control_Apply;
    var Data_Monoid = PS.Data_Monoid;
    var Data_Tuple = PS.Data_Tuple;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Monoid_First = PS.Data_Monoid_First;
    function Foldable(foldMap, foldl, foldr) {
        this.foldMap = foldMap;
        this.foldl = foldl;
        this.foldr = foldr;
    };
    function foldrArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = xs.length - 1; i >= 0; --i) {        acc = f(xs[i])(acc);      }      return acc;    }  }};
    function foldlArray(f) {  return function(z) {    return function(xs) {      var acc = z;      for (var i = 0, len = xs.length; i < len; ++i) {        acc = f(acc)(xs[i]);      }      return acc;    }  }};
    var foldr = function (dict) {
        return dict.foldr;
    };
    var traverse_ = function (__dict_Applicative_82) {
        return function (__dict_Foldable_83) {
            return function (f) {
                return foldr(__dict_Foldable_83)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Control_Apply["*>"](__dict_Applicative_82["__superclass_Prelude.Apply_0"]({})))(f))(Prelude.pure(__dict_Applicative_82)(Prelude.unit));
            };
        };
    };
    var for_ = function (__dict_Applicative_84) {
        return function (__dict_Foldable_85) {
            return Prelude.flip(traverse_(__dict_Applicative_84)(__dict_Foldable_85));
        };
    };
    var sequence_ = function (__dict_Applicative_86) {
        return function (__dict_Foldable_87) {
            return traverse_(__dict_Applicative_86)(__dict_Foldable_87)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var foldl = function (dict) {
        return dict.foldl;
    };
    var mconcat = function (__dict_Foldable_88) {
        return function (__dict_Monoid_89) {
            return foldl(__dict_Foldable_88)(Prelude["<>"](__dict_Monoid_89["__superclass_Prelude.Semigroup_0"]({})))(Data_Monoid.mempty(__dict_Monoid_89));
        };
    };
    var or = function (__dict_Foldable_90) {
        return foldl(__dict_Foldable_90)(Prelude["||"](Prelude.boolLikeBoolean({})))(false);
    };
    var product = function (__dict_Foldable_91) {
        return foldl(__dict_Foldable_91)(Prelude["*"](Prelude.numNumber({})))(1);
    };
    var sum = function (__dict_Foldable_92) {
        return foldl(__dict_Foldable_92)(Prelude["+"](Prelude.numNumber({})))(0);
    };
    var foldableTuple = function (_) {
        return new Foldable(function (__dict_Monoid_93) {
            return function (_230) {
                return function (_231) {
                    return _230(_231.value1);
                };
            };
        }, function (_227) {
            return function (_228) {
                return function (_229) {
                    return _227(_228)(_229.value1);
                };
            };
        }, function (_224) {
            return function (_225) {
                return function (_226) {
                    return _224(_226.value1)(_225);
                };
            };
        });
    };
    var foldableRef = function (_) {
        return new Foldable(function (__dict_Monoid_94) {
            return function (_222) {
                return function (_223) {
                    return _222(_223);
                };
            };
        }, function (_219) {
            return function (_220) {
                return function (_221) {
                    return _219(_220)(_221);
                };
            };
        }, function (_216) {
            return function (_217) {
                return function (_218) {
                    return _216(_218)(_217);
                };
            };
        });
    };
    var foldableMaybe = function (_) {
        return new Foldable(function (__dict_Monoid_95) {
            return function (_214) {
                return function (_215) {
                    if (_215 instanceof Data_Maybe.Nothing) {
                        return Data_Monoid.mempty(__dict_Monoid_95);
                    };
                    if (_215 instanceof Data_Maybe.Just) {
                        return _214(_215.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_211) {
            return function (_212) {
                return function (_213) {
                    if (_213 instanceof Data_Maybe.Nothing) {
                        return _212;
                    };
                    if (_213 instanceof Data_Maybe.Just) {
                        return _211(_212)(_213.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_208) {
            return function (_209) {
                return function (_210) {
                    if (_210 instanceof Data_Maybe.Nothing) {
                        return _209;
                    };
                    if (_210 instanceof Data_Maybe.Just) {
                        return _208(_210.value0)(_209);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableEither = function (_) {
        return new Foldable(function (__dict_Monoid_96) {
            return function (_206) {
                return function (_207) {
                    if (_207 instanceof Data_Either.Left) {
                        return Data_Monoid.mempty(__dict_Monoid_96);
                    };
                    if (_207 instanceof Data_Either.Right) {
                        return _206(_207.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_203) {
            return function (_204) {
                return function (_205) {
                    if (_205 instanceof Data_Either.Left) {
                        return _204;
                    };
                    if (_205 instanceof Data_Either.Right) {
                        return _203(_204)(_205.value0);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        }, function (_200) {
            return function (_201) {
                return function (_202) {
                    if (_202 instanceof Data_Either.Left) {
                        return _201;
                    };
                    if (_202 instanceof Data_Either.Right) {
                        return _200(_202.value0)(_201);
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var foldableArray = function (_) {
        return new Foldable(function (__dict_Monoid_97) {
            return function (f) {
                return function (xs) {
                    return foldr(foldableArray({}))(function (x) {
                        return function (acc) {
                            return Prelude["<>"](__dict_Monoid_97["__superclass_Prelude.Semigroup_0"]({}))(f(x))(acc);
                        };
                    })(Data_Monoid.mempty(__dict_Monoid_97))(xs);
                };
            };
        }, function (f) {
            return function (z) {
                return function (xs) {
                    return foldlArray(f)(z)(xs);
                };
            };
        }, function (f) {
            return function (z) {
                return function (xs) {
                    return foldrArray(f)(z)(xs);
                };
            };
        });
    };
    var foldMap = function (dict) {
        return dict.foldMap;
    };
    var lookup = function (__dict_Eq_98) {
        return function (__dict_Foldable_99) {
            return function (a) {
                return function (f) {
                    return Data_Monoid_First.runFirst(foldMap(__dict_Foldable_99)(Data_Monoid_First.monoidFirst({}))(function (_199) {
                        return Prelude["=="](__dict_Eq_98)(a)(_199.value0) ? new Data_Maybe.Just(_199.value1) : Data_Maybe.Nothing.value;
                    })(f));
                };
            };
        };
    };
    var fold = function (__dict_Foldable_100) {
        return function (__dict_Monoid_101) {
            return foldMap(__dict_Foldable_100)(__dict_Monoid_101)(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var find = function (__dict_Foldable_102) {
        return function (p) {
            return function (f) {
                return (function (_657) {
                    if (_657.length > 0) {
                        var _659 = _657.slice(1);
                        return new Data_Maybe.Just(_657[0]);
                    };
                    if (_657.length === 0) {
                        return Data_Maybe.Nothing.value;
                    };
                    throw new Error("Failed pattern match");
                })(foldMap(__dict_Foldable_102)(Data_Monoid.monoidArray({}))(function (x) {
                    return p(x) ? [ x ] : [  ];
                })(f));
            };
        };
    };
    var any = function (__dict_Foldable_103) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(or(foldableArray({})))(foldMap(__dict_Foldable_103)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    var elem = function (__dict_Eq_104) {
        return function (__dict_Foldable_105) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(any(__dict_Foldable_105))(Prelude["=="](__dict_Eq_104));
        };
    };
    var notElem = function (__dict_Eq_106) {
        return function (__dict_Foldable_107) {
            return function (x) {
                return Prelude["<<<"](Prelude.semigroupoidArr({}))(Prelude.not(Prelude.boolLikeBoolean({})))(elem(__dict_Eq_106)(__dict_Foldable_107)(x));
            };
        };
    };
    var and = function (__dict_Foldable_108) {
        return foldl(__dict_Foldable_108)(Prelude["&&"](Prelude.boolLikeBoolean({})))(true);
    };
    var all = function (__dict_Foldable_109) {
        return function (p) {
            return Prelude["<<<"](Prelude.semigroupoidArr({}))(and(foldableArray({})))(foldMap(__dict_Foldable_109)(Data_Monoid.monoidArray({}))(function (x) {
                return [ p(x) ];
            }));
        };
    };
    return {
        Foldable: Foldable, 
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
        sequence_: sequence_, 
        for_: for_, 
        traverse_: traverse_, 
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
    function Leaf() {

    };
    Leaf.value = new Leaf();
    function Two(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    Two.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new Two(value0, value1, value2, value3);
                };
            };
        };
    };
    function Three(value0, value1, value2, value3, value4, value5, value6) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
        this.value6 = value6;
    };
    Three.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return function (value6) {
                                return new Three(value0, value1, value2, value3, value4, value5, value6);
                            };
                        };
                    };
                };
            };
        };
    };
    function TwoLeft(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoLeft(value0, value1, value2);
            };
        };
    };
    function TwoRight(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    TwoRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new TwoRight(value0, value1, value2);
            };
        };
    };
    function ThreeLeft(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeLeft.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeLeft(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function ThreeMiddle(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeMiddle.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeMiddle(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function ThreeRight(value0, value1, value2, value3, value4, value5) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
        this.value5 = value5;
    };
    ThreeRight.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return function (value4) {
                        return function (value5) {
                            return new ThreeRight(value0, value1, value2, value3, value4, value5);
                        };
                    };
                };
            };
        };
    };
    function KickUp(value0, value1, value2, value3) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    };
    KickUp.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return function (value3) {
                    return new KickUp(value0, value1, value2, value3);
                };
            };
        };
    };
    var values = function (_242) {
        if (_242 instanceof Leaf) {
            return [  ];
        };
        if (_242 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_242.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _242.value2 ])(values(_242.value3)));
        };
        if (_242 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(values(_242.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _242.value2 ])(Prelude["++"](Data_Array.semigroupArray({}))(values(_242.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _242.value5 ])(values(_242.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var toList = function (_240) {
        if (_240 instanceof Leaf) {
            return [  ];
        };
        if (_240 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_240.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_240.value1, _240.value2) ])(toList(_240.value3)));
        };
        if (_240 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(toList(_240.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_240.value1, _240.value2) ])(Prelude["++"](Data_Array.semigroupArray({}))(toList(_240.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ new Data_Tuple.Tuple(_240.value4, _240.value5) ])(toList(_240.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var singleton = function (k) {
        return function (v) {
            return new Two(Leaf.value, k, v, Leaf.value);
        };
    };
    var showTree = function (__dict_Show_110) {
        return function (__dict_Show_111) {
            return function (_234) {
                if (_234 instanceof Leaf) {
                    return "Leaf";
                };
                if (_234 instanceof Two) {
                    return "Two (" + showTree(__dict_Show_110)(__dict_Show_111)(_234.value0) + ") (" + Prelude.show(__dict_Show_110)(_234.value1) + ") (" + Prelude.show(__dict_Show_111)(_234.value2) + ") (" + showTree(__dict_Show_110)(__dict_Show_111)(_234.value3) + ")";
                };
                if (_234 instanceof Three) {
                    return "Three (" + showTree(__dict_Show_110)(__dict_Show_111)(_234.value0) + ") (" + Prelude.show(__dict_Show_110)(_234.value1) + ") (" + Prelude.show(__dict_Show_111)(_234.value2) + ") (" + showTree(__dict_Show_110)(__dict_Show_111)(_234.value3) + ") (" + Prelude.show(__dict_Show_110)(_234.value4) + ") (" + Prelude.show(__dict_Show_111)(_234.value5) + ") (" + showTree(__dict_Show_110)(__dict_Show_111)(_234.value6) + ")";
                };
                throw new Error("Failed pattern match");
            };
        };
    };
    var showMap = function (__dict_Show_112) {
        return function (__dict_Show_113) {
            return new Prelude.Show(function (m) {
                return "fromList " + Prelude.show(Prelude.showArray(Data_Tuple.showTuple(__dict_Show_112)(__dict_Show_113)))(toList(m));
            });
        };
    };
    var lookup = function (__copy___dict_Ord_114) {
        return function (__copy__236) {
            return function (__copy__237) {
                var __dict_Ord_114 = __copy___dict_Ord_114;
                var _236 = __copy__236;
                var _237 = __copy__237;
                tco: while (true) {
                    if (_237 instanceof Leaf) {
                        return Data_Maybe.Nothing.value;
                    };
                    if (_237 instanceof Two && Prelude["=="](__dict_Ord_114["__superclass_Prelude.Eq_0"]({}))(_236)(_237.value1)) {
                        return new Data_Maybe.Just(_237.value2);
                    };
                    if (_237 instanceof Two && Prelude["<"](__dict_Ord_114)(_236)(_237.value1)) {
                        var __tco___dict_Ord_114 = __dict_Ord_114;
                        var __tco__236 = _236;
                        var __tco__237 = _237.value0;
                        __dict_Ord_114 = __tco___dict_Ord_114;
                        _236 = __tco__236;
                        _237 = __tco__237;
                        continue tco;
                    };
                    if (_237 instanceof Two) {
                        var __tco___dict_Ord_114 = __dict_Ord_114;
                        var __tco__236 = _236;
                        var __tco__237 = _237.value3;
                        __dict_Ord_114 = __tco___dict_Ord_114;
                        _236 = __tco__236;
                        _237 = __tco__237;
                        continue tco;
                    };
                    if (_237 instanceof Three && Prelude["=="](__dict_Ord_114["__superclass_Prelude.Eq_0"]({}))(_236)(_237.value1)) {
                        return new Data_Maybe.Just(_237.value2);
                    };
                    if (_237 instanceof Three && Prelude["=="](__dict_Ord_114["__superclass_Prelude.Eq_0"]({}))(_236)(_237.value4)) {
                        return new Data_Maybe.Just(_237.value5);
                    };
                    if (_237 instanceof Three && Prelude["<"](__dict_Ord_114)(_236)(_237.value1)) {
                        var __tco___dict_Ord_114 = __dict_Ord_114;
                        var __tco__236 = _236;
                        var __tco__237 = _237.value0;
                        __dict_Ord_114 = __tco___dict_Ord_114;
                        _236 = __tco__236;
                        _237 = __tco__237;
                        continue tco;
                    };
                    if (_237 instanceof Three && Prelude["<"](__dict_Ord_114)(_237.value1)(_236) && Prelude["<="](__dict_Ord_114)(_236)(_237.value4)) {
                        var __tco___dict_Ord_114 = __dict_Ord_114;
                        var __tco__236 = _236;
                        var __tco__237 = _237.value3;
                        __dict_Ord_114 = __tco___dict_Ord_114;
                        _236 = __tco__236;
                        _237 = __tco__237;
                        continue tco;
                    };
                    if (_237 instanceof Three) {
                        var __tco___dict_Ord_114 = __dict_Ord_114;
                        var __tco__236 = _236;
                        var __tco__237 = _237.value6;
                        __dict_Ord_114 = __tco___dict_Ord_114;
                        _236 = __tco__236;
                        _237 = __tco__237;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var member = function (__dict_Ord_115) {
        return function (k) {
            return function (m) {
                return Data_Maybe.isJust(lookup(__dict_Ord_115)(k)(m));
            };
        };
    };
    var keys = function (_241) {
        if (_241 instanceof Leaf) {
            return [  ];
        };
        if (_241 instanceof Two) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_241.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _241.value1 ])(keys(_241.value3)));
        };
        if (_241 instanceof Three) {
            return Prelude["++"](Data_Array.semigroupArray({}))(keys(_241.value0))(Prelude["++"](Data_Array.semigroupArray({}))([ _241.value1 ])(Prelude["++"](Data_Array.semigroupArray({}))(keys(_241.value3))(Prelude["++"](Data_Array.semigroupArray({}))([ _241.value4 ])(keys(_241.value6)))));
        };
        throw new Error("Failed pattern match");
    };
    var isEmpty = function (_235) {
        if (_235 instanceof Leaf) {
            return true;
        };
        return false;
    };
    var functorMap = function (_) {
        return new Prelude.Functor(function (_243) {
            return function (_244) {
                if (_244 instanceof Leaf) {
                    return Leaf.value;
                };
                if (_244 instanceof Two) {
                    return new Two(Prelude["<$>"](functorMap({}))(_243)(_244.value0), _244.value1, _243(_244.value2), Prelude["<$>"](functorMap({}))(_243)(_244.value3));
                };
                if (_244 instanceof Three) {
                    return new Three(Prelude["<$>"](functorMap({}))(_243)(_244.value0), _244.value1, _243(_244.value2), Prelude["<$>"](functorMap({}))(_243)(_244.value3), _244.value4, _243(_244.value5), Prelude["<$>"](functorMap({}))(_243)(_244.value6));
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var map = Prelude["<$>"](functorMap({}));
    var fromZipper = function (__copy___dict_Ord_116) {
        return function (__copy__238) {
            return function (__copy__239) {
                var __dict_Ord_116 = __copy___dict_Ord_116;
                var _238 = __copy__238;
                var _239 = __copy__239;
                tco: while (true) {
                    if (_238.length === 0) {
                        return _239;
                    };
                    if (_238.length > 0) {
                        var _774 = _238.slice(1);
                        if (_238[0] instanceof TwoLeft) {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__239 = new Two(_239, (_238[0]).value0, (_238[0]).value1, (_238[0]).value2);
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _238 = _774;
                            _239 = __tco__239;
                            continue tco;
                        };
                    };
                    if (_238.length > 0) {
                        var _779 = _238.slice(1);
                        if (_238[0] instanceof TwoRight) {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__239 = new Two((_238[0]).value0, (_238[0]).value1, (_238[0]).value2, _239);
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _238 = _779;
                            _239 = __tco__239;
                            continue tco;
                        };
                    };
                    if (_238.length > 0) {
                        var _784 = _238.slice(1);
                        if (_238[0] instanceof ThreeLeft) {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__239 = new Three(_239, (_238[0]).value0, (_238[0]).value1, (_238[0]).value2, (_238[0]).value3, (_238[0]).value4, (_238[0]).value5);
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _238 = _784;
                            _239 = __tco__239;
                            continue tco;
                        };
                    };
                    if (_238.length > 0) {
                        var _792 = _238.slice(1);
                        if (_238[0] instanceof ThreeMiddle) {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__239 = new Three((_238[0]).value0, (_238[0]).value1, (_238[0]).value2, _239, (_238[0]).value3, (_238[0]).value4, (_238[0]).value5);
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _238 = _792;
                            _239 = __tco__239;
                            continue tco;
                        };
                    };
                    if (_238.length > 0) {
                        var _800 = _238.slice(1);
                        if (_238[0] instanceof ThreeRight) {
                            var __tco___dict_Ord_116 = __dict_Ord_116;
                            var __tco__239 = new Three((_238[0]).value0, (_238[0]).value1, (_238[0]).value2, (_238[0]).value3, (_238[0]).value4, (_238[0]).value5, _239);
                            __dict_Ord_116 = __tco___dict_Ord_116;
                            _238 = _800;
                            _239 = __tco__239;
                            continue tco;
                        };
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
    };
    var insert = function (__dict_Ord_117) {
        var up = function (__copy___dict_Ord_118) {
            return function (__copy__250) {
                return function (__copy__251) {
                    var __dict_Ord_118 = __copy___dict_Ord_118;
                    var _250 = __copy__250;
                    var _251 = __copy__251;
                    tco: while (true) {
                        if (_250.length === 0) {
                            return new Two(_251.value0, _251.value1, _251.value2, _251.value3);
                        };
                        if (_250.length > 0) {
                            var _818 = _250.slice(1);
                            if (_250[0] instanceof TwoLeft) {
                                return fromZipper(__dict_Ord_118)(_818)(new Three(_251.value0, _251.value1, _251.value2, _251.value3, (_250[0]).value0, (_250[0]).value1, (_250[0]).value2));
                            };
                        };
                        if (_250.length > 0) {
                            var _827 = _250.slice(1);
                            if (_250[0] instanceof TwoRight) {
                                return fromZipper(__dict_Ord_118)(_827)(new Three((_250[0]).value0, (_250[0]).value1, (_250[0]).value2, _251.value0, _251.value1, _251.value2, _251.value3));
                            };
                        };
                        if (_250.length > 0) {
                            var _836 = _250.slice(1);
                            if (_250[0] instanceof ThreeLeft) {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__251 = new KickUp(new Two(_251.value0, _251.value1, _251.value2, _251.value3), (_250[0]).value0, (_250[0]).value1, new Two((_250[0]).value2, (_250[0]).value3, (_250[0]).value4, (_250[0]).value5));
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _250 = _836;
                                _251 = __tco__251;
                                continue tco;
                            };
                        };
                        if (_250.length > 0) {
                            var _848 = _250.slice(1);
                            if (_250[0] instanceof ThreeMiddle) {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__251 = new KickUp(new Two((_250[0]).value0, (_250[0]).value1, (_250[0]).value2, _251.value0), _251.value1, _251.value2, new Two(_251.value3, (_250[0]).value3, (_250[0]).value4, (_250[0]).value5));
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _250 = _848;
                                _251 = __tco__251;
                                continue tco;
                            };
                        };
                        if (_250.length > 0) {
                            var _860 = _250.slice(1);
                            if (_250[0] instanceof ThreeRight) {
                                var __tco___dict_Ord_118 = __dict_Ord_118;
                                var __tco__251 = new KickUp(new Two((_250[0]).value0, (_250[0]).value1, (_250[0]).value2, (_250[0]).value3), (_250[0]).value4, (_250[0]).value5, new Two(_251.value0, _251.value1, _251.value2, _251.value3));
                                __dict_Ord_118 = __tco___dict_Ord_118;
                                _250 = _860;
                                _251 = __tco__251;
                                continue tco;
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var down = function (__copy___dict_Ord_119) {
            return function (__copy__246) {
                return function (__copy__247) {
                    return function (__copy__248) {
                        return function (__copy__249) {
                            var __dict_Ord_119 = __copy___dict_Ord_119;
                            var _246 = __copy__246;
                            var _247 = __copy__247;
                            var _248 = __copy__248;
                            var _249 = __copy__249;
                            tco: while (true) {
                                if (_249 instanceof Leaf) {
                                    return up(__dict_Ord_119)(_246)(new KickUp(Leaf.value, _247, _248, Leaf.value));
                                };
                                if (_249 instanceof Two && Prelude["=="](__dict_Ord_119["__superclass_Prelude.Eq_0"]({}))(_247)(_249.value1)) {
                                    return fromZipper(__dict_Ord_119)(_246)(new Two(_249.value0, _247, _248, _249.value3));
                                };
                                if (_249 instanceof Two && Prelude["<"](__dict_Ord_119)(_247)(_249.value1)) {
                                    var __tco___dict_Ord_119 = __dict_Ord_119;
                                    var __tco__246 = Prelude[":"](new TwoLeft(_249.value1, _249.value2, _249.value3))(_246);
                                    var __tco__247 = _247;
                                    var __tco__248 = _248;
                                    var __tco__249 = _249.value0;
                                    __dict_Ord_119 = __tco___dict_Ord_119;
                                    _246 = __tco__246;
                                    _247 = __tco__247;
                                    _248 = __tco__248;
                                    _249 = __tco__249;
                                    continue tco;
                                };
                                if (_249 instanceof Two) {
                                    var __tco___dict_Ord_119 = __dict_Ord_119;
                                    var __tco__246 = Prelude[":"](new TwoRight(_249.value0, _249.value1, _249.value2))(_246);
                                    var __tco__247 = _247;
                                    var __tco__248 = _248;
                                    var __tco__249 = _249.value3;
                                    __dict_Ord_119 = __tco___dict_Ord_119;
                                    _246 = __tco__246;
                                    _247 = __tco__247;
                                    _248 = __tco__248;
                                    _249 = __tco__249;
                                    continue tco;
                                };
                                if (_249 instanceof Three && Prelude["=="](__dict_Ord_119["__superclass_Prelude.Eq_0"]({}))(_247)(_249.value1)) {
                                    return fromZipper(__dict_Ord_119)(_246)(new Three(_249.value0, _247, _248, _249.value3, _249.value4, _249.value5, _249.value6));
                                };
                                if (_249 instanceof Three && Prelude["=="](__dict_Ord_119["__superclass_Prelude.Eq_0"]({}))(_247)(_249.value4)) {
                                    return fromZipper(__dict_Ord_119)(_246)(new Three(_249.value0, _249.value1, _249.value2, _249.value3, _247, _248, _249.value6));
                                };
                                if (_249 instanceof Three && Prelude["<"](__dict_Ord_119)(_247)(_249.value1)) {
                                    var __tco___dict_Ord_119 = __dict_Ord_119;
                                    var __tco__246 = Prelude[":"](new ThreeLeft(_249.value1, _249.value2, _249.value3, _249.value4, _249.value5, _249.value6))(_246);
                                    var __tco__247 = _247;
                                    var __tco__248 = _248;
                                    var __tco__249 = _249.value0;
                                    __dict_Ord_119 = __tco___dict_Ord_119;
                                    _246 = __tco__246;
                                    _247 = __tco__247;
                                    _248 = __tco__248;
                                    _249 = __tco__249;
                                    continue tco;
                                };
                                if (_249 instanceof Three && Prelude["<"](__dict_Ord_119)(_249.value1)(_247) && Prelude["<="](__dict_Ord_119)(_247)(_249.value4)) {
                                    var __tco___dict_Ord_119 = __dict_Ord_119;
                                    var __tco__246 = Prelude[":"](new ThreeMiddle(_249.value0, _249.value1, _249.value2, _249.value4, _249.value5, _249.value6))(_246);
                                    var __tco__247 = _247;
                                    var __tco__248 = _248;
                                    var __tco__249 = _249.value3;
                                    __dict_Ord_119 = __tco___dict_Ord_119;
                                    _246 = __tco__246;
                                    _247 = __tco__247;
                                    _248 = __tco__248;
                                    _249 = __tco__249;
                                    continue tco;
                                };
                                if (_249 instanceof Three) {
                                    var __tco___dict_Ord_119 = __dict_Ord_119;
                                    var __tco__246 = Prelude[":"](new ThreeRight(_249.value0, _249.value1, _249.value2, _249.value3, _249.value4, _249.value5))(_246);
                                    var __tco__247 = _247;
                                    var __tco__248 = _248;
                                    var __tco__249 = _249.value6;
                                    __dict_Ord_119 = __tco___dict_Ord_119;
                                    _246 = __tco__246;
                                    _247 = __tco__247;
                                    _248 = __tco__248;
                                    _249 = __tco__249;
                                    continue tco;
                                };
                                throw new Error("Failed pattern match");
                            };
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_117)([  ]);
    };
    var union = function (__dict_Ord_120) {
        return function (m1) {
            return function (m2) {
                return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
                    return function (_233) {
                        return insert(__dict_Ord_120)(_233.value0)(_233.value1)(m);
                    };
                })(m2)(toList(m1));
            };
        };
    };
    var eqMap = function (__dict_Eq_121) {
        return function (__dict_Eq_122) {
            return new Prelude.Eq(function (m1) {
                return function (m2) {
                    return !Prelude["=="](eqMap(__dict_Eq_121)(__dict_Eq_122))(m1)(m2);
                };
            }, function (m1) {
                return function (m2) {
                    return Prelude["=="](Prelude.eqArray(Data_Tuple.eqTuple(__dict_Eq_121)(__dict_Eq_122)))(toList(m1))(toList(m2));
                };
            });
        };
    };
    var empty = Leaf.value;
    var fromList = function (__dict_Ord_123) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (_232) {
                return insert(__dict_Ord_123)(_232.value0)(_232.value1)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_124) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_124))(empty);
    };
    var $$delete = function (__dict_Ord_125) {
        var up = function (__copy___dict_Ord_126) {
            return function (__copy__255) {
                return function (__copy__256) {
                    var __dict_Ord_126 = __copy___dict_Ord_126;
                    var _255 = __copy__255;
                    var _256 = __copy__256;
                    tco: while (true) {
                        if (_255.length === 0) {
                            return _256;
                        };
                        if (_255.length > 0) {
                            var _927 = _255.slice(1);
                            if (_255[0] instanceof TwoLeft && (_255[0]).value2 instanceof Leaf && _256 instanceof Leaf) {
                                return fromZipper(__dict_Ord_126)(_927)(new Two(Leaf.value, (_255[0]).value0, (_255[0]).value1, Leaf.value));
                            };
                        };
                        if (_255.length > 0) {
                            var _932 = _255.slice(1);
                            if (_255[0] instanceof TwoRight && (_255[0]).value0 instanceof Leaf && _256 instanceof Leaf) {
                                return fromZipper(__dict_Ord_126)(_932)(new Two(Leaf.value, (_255[0]).value1, (_255[0]).value2, Leaf.value));
                            };
                        };
                        if (_255.length > 0) {
                            var _937 = _255.slice(1);
                            if (_255[0] instanceof TwoLeft && (_255[0]).value2 instanceof Two) {
                                var __tco___dict_Ord_126 = __dict_Ord_126;
                                var __tco__256 = new Three(_256, (_255[0]).value0, (_255[0]).value1, (_255[0]).value2.value0, (_255[0]).value2.value1, (_255[0]).value2.value2, (_255[0]).value2.value3);
                                __dict_Ord_126 = __tco___dict_Ord_126;
                                _255 = _937;
                                _256 = __tco__256;
                                continue tco;
                            };
                        };
                        if (_255.length > 0) {
                            var _946 = _255.slice(1);
                            if (_255[0] instanceof TwoRight && (_255[0]).value0 instanceof Two) {
                                var __tco___dict_Ord_126 = __dict_Ord_126;
                                var __tco__256 = new Three((_255[0]).value0.value0, (_255[0]).value0.value1, (_255[0]).value0.value2, (_255[0]).value0.value3, (_255[0]).value1, (_255[0]).value2, _256);
                                __dict_Ord_126 = __tco___dict_Ord_126;
                                _255 = _946;
                                _256 = __tco__256;
                                continue tco;
                            };
                        };
                        if (_255.length > 0) {
                            var _955 = _255.slice(1);
                            if (_255[0] instanceof TwoLeft && (_255[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_955)(new Two(new Two(_256, (_255[0]).value0, (_255[0]).value1, (_255[0]).value2.value0), (_255[0]).value2.value1, (_255[0]).value2.value2, new Two((_255[0]).value2.value3, (_255[0]).value2.value4, (_255[0]).value2.value5, (_255[0]).value2.value6)));
                            };
                        };
                        if (_255.length > 0) {
                            var _967 = _255.slice(1);
                            if (_255[0] instanceof TwoRight && (_255[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_967)(new Two(new Two((_255[0]).value0.value0, (_255[0]).value0.value1, (_255[0]).value0.value2, (_255[0]).value0.value3), (_255[0]).value0.value4, (_255[0]).value0.value5, new Two((_255[0]).value0.value6, (_255[0]).value1, (_255[0]).value2, _256)));
                            };
                        };
                        if (_255.length > 0) {
                            var _979 = _255.slice(1);
                            if (_255[0] instanceof ThreeLeft && (_255[0]).value2 instanceof Leaf && (_255[0]).value5 instanceof Leaf && _256 instanceof Leaf) {
                                return fromZipper(__dict_Ord_126)(_979)(new Three(Leaf.value, (_255[0]).value0, (_255[0]).value1, Leaf.value, (_255[0]).value3, (_255[0]).value4, Leaf.value));
                            };
                        };
                        if (_255.length > 0) {
                            var _987 = _255.slice(1);
                            if (_255[0] instanceof ThreeMiddle && (_255[0]).value0 instanceof Leaf && (_255[0]).value5 instanceof Leaf && _256 instanceof Leaf) {
                                return fromZipper(__dict_Ord_126)(_987)(new Three(Leaf.value, (_255[0]).value1, (_255[0]).value2, Leaf.value, (_255[0]).value3, (_255[0]).value4, Leaf.value));
                            };
                        };
                        if (_255.length > 0) {
                            var _995 = _255.slice(1);
                            if (_255[0] instanceof ThreeRight && (_255[0]).value0 instanceof Leaf && (_255[0]).value3 instanceof Leaf && _256 instanceof Leaf) {
                                return fromZipper(__dict_Ord_126)(_995)(new Three(Leaf.value, (_255[0]).value1, (_255[0]).value2, Leaf.value, (_255[0]).value4, (_255[0]).value5, Leaf.value));
                            };
                        };
                        if (_255.length > 0) {
                            var _1003 = _255.slice(1);
                            if (_255[0] instanceof ThreeLeft && (_255[0]).value2 instanceof Two) {
                                return fromZipper(__dict_Ord_126)(_1003)(new Two(new Three(_256, (_255[0]).value0, (_255[0]).value1, (_255[0]).value2.value0, (_255[0]).value2.value1, (_255[0]).value2.value2, (_255[0]).value2.value3), (_255[0]).value3, (_255[0]).value4, (_255[0]).value5));
                            };
                        };
                        if (_255.length > 0) {
                            var _1015 = _255.slice(1);
                            if (_255[0] instanceof ThreeMiddle && (_255[0]).value0 instanceof Two) {
                                return fromZipper(__dict_Ord_126)(_1015)(new Two(new Three((_255[0]).value0.value0, (_255[0]).value0.value1, (_255[0]).value0.value2, (_255[0]).value0.value3, (_255[0]).value1, (_255[0]).value2, _256), (_255[0]).value3, (_255[0]).value4, (_255[0]).value5));
                            };
                        };
                        if (_255.length > 0) {
                            var _1027 = _255.slice(1);
                            if (_255[0] instanceof ThreeMiddle && (_255[0]).value5 instanceof Two) {
                                return fromZipper(__dict_Ord_126)(_1027)(new Two((_255[0]).value0, (_255[0]).value1, (_255[0]).value2, new Three(_256, (_255[0]).value3, (_255[0]).value4, (_255[0]).value5.value0, (_255[0]).value5.value1, (_255[0]).value5.value2, (_255[0]).value5.value3)));
                            };
                        };
                        if (_255.length > 0) {
                            var _1039 = _255.slice(1);
                            if (_255[0] instanceof ThreeRight && (_255[0]).value3 instanceof Two) {
                                return fromZipper(__dict_Ord_126)(_1039)(new Two((_255[0]).value0, (_255[0]).value1, (_255[0]).value2, new Three((_255[0]).value3.value0, (_255[0]).value3.value1, (_255[0]).value3.value2, (_255[0]).value3.value3, (_255[0]).value4, (_255[0]).value5, _256)));
                            };
                        };
                        if (_255.length > 0) {
                            var _1051 = _255.slice(1);
                            if (_255[0] instanceof ThreeLeft && (_255[0]).value2 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_1051)(new Three(new Two(_256, (_255[0]).value0, (_255[0]).value1, (_255[0]).value2.value0), (_255[0]).value2.value1, (_255[0]).value2.value2, new Two((_255[0]).value2.value3, (_255[0]).value2.value4, (_255[0]).value2.value5, (_255[0]).value2.value6), (_255[0]).value3, (_255[0]).value4, (_255[0]).value5));
                            };
                        };
                        if (_255.length > 0) {
                            var _1066 = _255.slice(1);
                            if (_255[0] instanceof ThreeMiddle && (_255[0]).value0 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_1066)(new Three(new Two((_255[0]).value0.value0, (_255[0]).value0.value1, (_255[0]).value0.value2, (_255[0]).value0.value3), (_255[0]).value0.value4, (_255[0]).value0.value5, new Two((_255[0]).value0.value6, (_255[0]).value1, (_255[0]).value2, _256), (_255[0]).value3, (_255[0]).value4, (_255[0]).value5));
                            };
                        };
                        if (_255.length > 0) {
                            var _1081 = _255.slice(1);
                            if (_255[0] instanceof ThreeMiddle && (_255[0]).value5 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_1081)(new Three((_255[0]).value0, (_255[0]).value1, (_255[0]).value2, new Two(_256, (_255[0]).value3, (_255[0]).value4, (_255[0]).value5.value0), (_255[0]).value5.value1, (_255[0]).value5.value2, new Two((_255[0]).value5.value3, (_255[0]).value5.value4, (_255[0]).value5.value5, (_255[0]).value5.value6)));
                            };
                        };
                        if (_255.length > 0) {
                            var _1096 = _255.slice(1);
                            if (_255[0] instanceof ThreeRight && (_255[0]).value3 instanceof Three) {
                                return fromZipper(__dict_Ord_126)(_1096)(new Three((_255[0]).value0, (_255[0]).value1, (_255[0]).value2, new Two((_255[0]).value3.value0, (_255[0]).value3.value1, (_255[0]).value3.value2, (_255[0]).value3.value3), (_255[0]).value3.value4, (_255[0]).value3.value5, new Two((_255[0]).value3.value6, (_255[0]).value4, (_255[0]).value5, _256)));
                            };
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var removeMaxNode = function (__copy___dict_Ord_127) {
            return function (__copy__258) {
                return function (__copy__259) {
                    var __dict_Ord_127 = __copy___dict_Ord_127;
                    var _258 = __copy__258;
                    var _259 = __copy__259;
                    tco: while (true) {
                        if (_259 instanceof Two && _259.value0 instanceof Leaf && _259.value3 instanceof Leaf) {
                            return up(__dict_Ord_127)(_258)(Leaf.value);
                        };
                        if (_259 instanceof Two) {
                            var __tco___dict_Ord_127 = __dict_Ord_127;
                            var __tco__258 = Prelude[":"](new TwoRight(_259.value0, _259.value1, _259.value2))(_258);
                            var __tco__259 = _259.value3;
                            __dict_Ord_127 = __tco___dict_Ord_127;
                            _258 = __tco__258;
                            _259 = __tco__259;
                            continue tco;
                        };
                        if (_259 instanceof Three && _259.value0 instanceof Leaf && _259.value3 instanceof Leaf && _259.value6 instanceof Leaf) {
                            return up(__dict_Ord_127)(Prelude[":"](new TwoRight(Leaf.value, _259.value1, _259.value2))(_258))(Leaf.value);
                        };
                        if (_259 instanceof Three) {
                            var __tco___dict_Ord_127 = __dict_Ord_127;
                            var __tco__258 = Prelude[":"](new ThreeRight(_259.value0, _259.value1, _259.value2, _259.value3, _259.value4, _259.value5))(_258);
                            var __tco__259 = _259.value6;
                            __dict_Ord_127 = __tco___dict_Ord_127;
                            _258 = __tco__258;
                            _259 = __tco__259;
                            continue tco;
                        };
                        throw new Error("Failed pattern match");
                    };
                };
            };
        };
        var maxNode = function (__copy___dict_Ord_128) {
            return function (__copy__257) {
                var __dict_Ord_128 = __copy___dict_Ord_128;
                var _257 = __copy__257;
                tco: while (true) {
                    if (_257 instanceof Two && _257.value3 instanceof Leaf) {
                        return {
                            key: _257.value1, 
                            value: _257.value2
                        };
                    };
                    if (_257 instanceof Two) {
                        var __tco___dict_Ord_128 = __dict_Ord_128;
                        var __tco__257 = _257.value3;
                        __dict_Ord_128 = __tco___dict_Ord_128;
                        _257 = __tco__257;
                        continue tco;
                    };
                    if (_257 instanceof Three && _257.value6 instanceof Leaf) {
                        return {
                            key: _257.value4, 
                            value: _257.value5
                        };
                    };
                    if (_257 instanceof Three) {
                        var __tco___dict_Ord_128 = __dict_Ord_128;
                        var __tco__257 = _257.value6;
                        __dict_Ord_128 = __tco___dict_Ord_128;
                        _257 = __tco__257;
                        continue tco;
                    };
                    throw new Error("Failed pattern match");
                };
            };
        };
        var down = function (__copy___dict_Ord_129) {
            return function (__copy__252) {
                return function (__copy__253) {
                    return function (__copy__254) {
                        var __dict_Ord_129 = __copy___dict_Ord_129;
                        var _252 = __copy__252;
                        var _253 = __copy__253;
                        var _254 = __copy__254;
                        tco: while (true) {
                            if (_254 instanceof Leaf) {
                                return fromZipper(__dict_Ord_129)(_252)(Leaf.value);
                            };
                            if (_254 instanceof Two && _254.value0 instanceof Leaf && _254.value3 instanceof Leaf && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value1)) {
                                return up(__dict_Ord_129)(_252)(Leaf.value);
                            };
                            if (_254 instanceof Two && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value1)) {
                                var max = maxNode(__dict_Ord_129)(_254.value0);
                                return removeMaxNode(__dict_Ord_129)(Prelude[":"](new TwoLeft(max.key, max.value, _254.value3))(_252))(_254.value0);
                            };
                            if (_254 instanceof Two && Prelude["<"](__dict_Ord_129)(_253)(_254.value1)) {
                                var __tco___dict_Ord_129 = __dict_Ord_129;
                                var __tco__252 = Prelude[":"](new TwoLeft(_254.value1, _254.value2, _254.value3))(_252);
                                var __tco__253 = _253;
                                var __tco__254 = _254.value0;
                                __dict_Ord_129 = __tco___dict_Ord_129;
                                _252 = __tco__252;
                                _253 = __tco__253;
                                _254 = __tco__254;
                                continue tco;
                            };
                            if (_254 instanceof Two) {
                                var __tco___dict_Ord_129 = __dict_Ord_129;
                                var __tco__252 = Prelude[":"](new TwoRight(_254.value0, _254.value1, _254.value2))(_252);
                                var __tco__253 = _253;
                                var __tco__254 = _254.value3;
                                __dict_Ord_129 = __tco___dict_Ord_129;
                                _252 = __tco__252;
                                _253 = __tco__253;
                                _254 = __tco__254;
                                continue tco;
                            };
                            if (_254 instanceof Three && _254.value0 instanceof Leaf && _254.value3 instanceof Leaf && _254.value6 instanceof Leaf && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value1)) {
                                return fromZipper(__dict_Ord_129)(_252)(new Two(Leaf.value, _254.value4, _254.value5, Leaf.value));
                            };
                            if (_254 instanceof Three && _254.value0 instanceof Leaf && _254.value3 instanceof Leaf && _254.value6 instanceof Leaf && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value4)) {
                                return fromZipper(__dict_Ord_129)(_252)(new Two(Leaf.value, _254.value1, _254.value2, Leaf.value));
                            };
                            if (_254 instanceof Three && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value1)) {
                                var max = maxNode(__dict_Ord_129)(_254.value0);
                                return removeMaxNode(__dict_Ord_129)(Prelude[":"](new ThreeLeft(max.key, max.value, _254.value3, _254.value4, _254.value5, _254.value6))(_252))(_254.value0);
                            };
                            if (_254 instanceof Three && Prelude["=="](__dict_Ord_129["__superclass_Prelude.Eq_0"]({}))(_253)(_254.value4)) {
                                var max = maxNode(__dict_Ord_129)(_254.value3);
                                return removeMaxNode(__dict_Ord_129)(Prelude[":"](new ThreeMiddle(_254.value0, _254.value1, _254.value2, max.key, max.value, _254.value6))(_252))(_254.value3);
                            };
                            if (_254 instanceof Three && Prelude["<"](__dict_Ord_129)(_253)(_254.value1)) {
                                var __tco___dict_Ord_129 = __dict_Ord_129;
                                var __tco__252 = Prelude[":"](new ThreeLeft(_254.value1, _254.value2, _254.value3, _254.value4, _254.value5, _254.value6))(_252);
                                var __tco__253 = _253;
                                var __tco__254 = _254.value0;
                                __dict_Ord_129 = __tco___dict_Ord_129;
                                _252 = __tco__252;
                                _253 = __tco__253;
                                _254 = __tco__254;
                                continue tco;
                            };
                            if (_254 instanceof Three && Prelude["<"](__dict_Ord_129)(_254.value1)(_253) && Prelude["<"](__dict_Ord_129)(_253)(_254.value4)) {
                                var __tco___dict_Ord_129 = __dict_Ord_129;
                                var __tco__252 = Prelude[":"](new ThreeMiddle(_254.value0, _254.value1, _254.value2, _254.value4, _254.value5, _254.value6))(_252);
                                var __tco__253 = _253;
                                var __tco__254 = _254.value3;
                                __dict_Ord_129 = __tco___dict_Ord_129;
                                _252 = __tco__252;
                                _253 = __tco__253;
                                _254 = __tco__254;
                                continue tco;
                            };
                            if (_254 instanceof Three) {
                                var __tco___dict_Ord_129 = __dict_Ord_129;
                                var __tco__252 = Prelude[":"](new ThreeRight(_254.value0, _254.value1, _254.value2, _254.value3, _254.value4, _254.value5))(_252);
                                var __tco__253 = _253;
                                var __tco__254 = _254.value6;
                                __dict_Ord_129 = __tco___dict_Ord_129;
                                _252 = __tco__252;
                                _253 = __tco__253;
                                _254 = __tco__254;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
        return down(__dict_Ord_125)([  ]);
    };
    var checkValid = function (tree) {
        var allHeights = function (_245) {
            if (_245 instanceof Leaf) {
                return [ 0 ];
            };
            if (_245 instanceof Two) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_245.value0))(allHeights(_245.value3)));
            };
            if (_245 instanceof Three) {
                return Data_Array.map(function (n) {
                    return n + 1;
                })(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_245.value0))(Prelude["++"](Data_Array.semigroupArray({}))(allHeights(_245.value3))(allHeights(_245.value6))));
            };
            throw new Error("Failed pattern match");
        };
        return Data_Array.length(Data_Array.nub(Prelude.eqNumber({}))(allHeights(tree))) === 1;
    };
    var alter = function (__dict_Ord_130) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return (function (_1237) {
                        if (_1237 instanceof Data_Maybe.Nothing) {
                            return $$delete(__dict_Ord_130)(k)(m);
                        };
                        if (_1237 instanceof Data_Maybe.Just) {
                            return insert(__dict_Ord_130)(k)(_1237.value0)(m);
                        };
                        throw new Error("Failed pattern match");
                    })(f(lookup(__dict_Ord_130)(k)(m)));
                };
            };
        };
    };
    var update = function (__dict_Ord_131) {
        return function (f) {
            return function (k) {
                return function (m) {
                    return alter(__dict_Ord_131)(Data_Maybe.maybe(Data_Maybe.Nothing.value)(f))(k)(m);
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
PS.Data_Monoid_Last = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Monoid = PS.Data_Monoid;
    var Last = {
        create: function (value) {
            return value;
        }
    };
    var showLast = function (__dict_Show_132) {
        return new Prelude.Show(function (_267) {
            return "Last (" + Prelude.show(Data_Maybe.showMaybe(__dict_Show_132))(_267) + ")";
        });
    };
    var semigroupLast = function (_) {
        return new Prelude.Semigroup(function (_268) {
            return function (_269) {
                if (_269 instanceof Data_Maybe.Just) {
                    return _269;
                };
                if (_269 instanceof Data_Maybe.Nothing) {
                    return _268;
                };
                throw new Error("Failed pattern match");
            };
        });
    };
    var runLast = function (_260) {
        return _260;
    };
    var monoidLast = function (_) {
        return new Data_Monoid.Monoid(function (__1) {
            return semigroupLast({});
        }, Data_Maybe.Nothing.value);
    };
    var eqLast = function (__dict_Eq_134) {
        return new Prelude.Eq(function (_263) {
            return function (_264) {
                return Prelude["/="](Data_Maybe.eqMaybe(__dict_Eq_134))(_263)(_264);
            };
        }, function (_261) {
            return function (_262) {
                return Prelude["=="](Data_Maybe.eqMaybe(__dict_Eq_134))(_261)(_262);
            };
        });
    };
    var ordLast = function (__dict_Ord_133) {
        return new Prelude.Ord(function (_) {
            return eqLast(__dict_Ord_133["__superclass_Prelude.Eq_0"]({}));
        }, function (_265) {
            return function (_266) {
                return Prelude.compare(Data_Maybe.ordMaybe(__dict_Ord_133))(_265)(_266);
            };
        });
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
PS.Data_Set = (function () {
    "use strict";
    var Data_Map = PS.Data_Map;
    var Data_Array = PS.Data_Array;
    var Data_Tuple = PS.Data_Tuple;
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    function Set(value0) {
        this.value0 = value0;
    };
    Set.create = function (value0) {
        return new Set(value0);
    };
    var union = function (__dict_Ord_135) {
        return function (_279) {
            return function (_280) {
                return new Set(Data_Map.union(__dict_Ord_135)(_279.value0)(_280.value0));
            };
        };
    };
    var toList = function (_278) {
        return Data_Array.map(Data_Tuple.fst)(Data_Map.toList(_278.value0));
    };
    var singleton = function (a) {
        return new Set(Data_Map.singleton(a)(Prelude.unit));
    };
    var showSet = function (__dict_Show_136) {
        return new Prelude.Show(function (s) {
            return "fromList " + Prelude.show(Prelude.showArray(__dict_Show_136))(toList(s));
        });
    };
    var member = function (__dict_Ord_137) {
        return function (_272) {
            return function (_273) {
                return Data_Map.member(__dict_Ord_137)(_272)(_273.value0);
            };
        };
    };
    var isEmpty = function (_270) {
        return Data_Map.isEmpty(_270.value0);
    };
    var insert = function (__dict_Ord_138) {
        return function (_274) {
            return function (_275) {
                return new Set(Data_Map.insert(__dict_Ord_138)(_274)(Prelude.unit)(_275.value0));
            };
        };
    };
    var eqSet = function (__dict_Eq_139) {
        return new Prelude.Eq(function (_283) {
            return function (_284) {
                return Prelude["/="](Data_Map.eqMap(__dict_Eq_139)(Prelude.eqUnit({})))(_283.value0)(_284.value0);
            };
        }, function (_281) {
            return function (_282) {
                return Prelude["=="](Data_Map.eqMap(__dict_Eq_139)(Prelude.eqUnit({})))(_281.value0)(_282.value0);
            };
        });
    };
    var empty = new Set(Data_Map.empty);
    var fromList = function (__dict_Ord_140) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(function (m) {
            return function (a) {
                return insert(__dict_Ord_140)(a)(m);
            };
        })(empty);
    };
    var unions = function (__dict_Ord_141) {
        return Data_Foldable.foldl(Data_Foldable.foldableArray({}))(union(__dict_Ord_141))(empty);
    };
    var $$delete = function (__dict_Ord_142) {
        return function (_276) {
            return function (_277) {
                return new Set(Data_Map["delete"](__dict_Ord_142)(_276)(_277.value0));
            };
        };
    };
    var checkValid = function (_271) {
        return Data_Map.checkValid(_271.value0);
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
    function JObject(value0) {
        this.value0 = value0;
    };
    JObject.create = function (value0) {
        return new JObject(value0);
    };
    function JArray(value0) {
        this.value0 = value0;
    };
    JArray.create = function (value0) {
        return new JArray(value0);
    };
    function JString(value0) {
        this.value0 = value0;
    };
    JString.create = function (value0) {
        return new JString(value0);
    };
    function JNumber(value0) {
        this.value0 = value0;
    };
    JNumber.create = function (value0) {
        return new JNumber(value0);
    };
    function JBool(value0) {
        this.value0 = value0;
    };
    JBool.create = function (value0) {
        return new JBool(value0);
    };
    function JNull() {

    };
    JNull.value = new JNull();
    function FromJSON(parseJSON) {
        this.parseJSON = parseJSON;
    };
    function ToJSON(toJSON) {
        this.toJSON = toJSON;
    };
    function jsonParseImpl (left, right, string) {    try       { return right(JSON.parse(string)); }    catch (e) { return left(e.toString()); }};
    function jsonToValueImpl (auxes, ctors) {    var left   = auxes.left;    var right  = auxes.right;    var either = auxes.either;    var insert = auxes.insert;    var empty  = auxes.empty;    var Null   = ctors.null;    var Number = ctors.number;    var Bool   = ctors.bool;    var String = ctors.string;    var Array  = ctors.array;    var Object = ctors.object;    var parse  = function(json) {        var typ    = Object.prototype.toString.call(json).slice(8,-1);         if        (typ === 'Number') {             return right(Number(json));        } else if (typ === 'Boolean') {             return right(Bool(json));        } else if (typ === 'String') {             return right(String(json));        } else if (typ === 'Null') {             return right(Null);        } else if (typ === 'Array') {             var ary = [];            for(var i = 0; i < json.length; i++) {                 either                     (function(l){return left(l)})                     (function(r){ary.push(r)})                     (parse(json[i]))             }             return right(Array(ary));        } else if (typ === 'Object') {            var obj = empty;            for(var k in json) {                 either                     (function(l){return left(l)})                     (function(r){obj = insert(k)(r)(obj)})                     (parse(json[k]));            }             return right(Object(obj));        } else {             return left('unknown type: ' + typ);        }   };   return parse;};
    var jsNull = null;
    function unsafeCoerce (a) {return a;};
    function objToHash (obj) {    var hash = {};    for(var i = 0; i < obj.length; i++) {        hash[Data_Tuple.fst(obj[i])] = valueToJSONImpl(Data_Tuple.snd(obj[i]));    }    return hash;};
    function jsonStringify(json) {    return JSON.stringify(json);};
    var $dot$bang$eq = function (pmval) {
        return function (val) {
            return Prelude["<$>"](Data_Either.functorEither({}))(Data_Maybe.fromMaybe(val))(pmval);
        };
    };
    var valueToJSONImpl = function (_286) {
        if (_286 instanceof JObject) {
            return objToHash(Data_Map.toList(_286.value0));
        };
        if (_286 instanceof JArray) {
            return unsafeCoerce(Prelude["<$>"](Data_Array.functorArray({}))(valueToJSONImpl)(_286.value0));
        };
        if (_286 instanceof JString) {
            return unsafeCoerce(_286.value0);
        };
        if (_286 instanceof JNumber) {
            return unsafeCoerce(_286.value0);
        };
        if (_286 instanceof JBool) {
            return unsafeCoerce(_286.value0);
        };
        if (_286 instanceof JNull) {
            return jsNull;
        };
        throw new Error("Failed pattern match");
    };
    var valueToString = function (v) {
        return jsonStringify(valueToJSONImpl(v));
    };
    var valueToJSON = function (_) {
        return new ToJSON(Prelude.id(Prelude.categoryArr({})));
    };
    var valueFromJSON = function (_) {
        return new FromJSON(Data_Either.Right.create);
    };
    var unitToJSON = function (_) {
        return new ToJSON(function (_299) {
            return JNull.value;
        });
    };
    var toJSON = function (dict) {
        return dict.toJSON;
    };
    var tupleToJSON = function (__dict_ToJSON_143) {
        return function (__dict_ToJSON_144) {
            return new ToJSON(function (_302) {
                return new JArray([ toJSON(__dict_ToJSON_143)(_302.value0), toJSON(__dict_ToJSON_144)(_302.value1) ]);
            });
        };
    };
    var $dot$eq = function (__dict_ToJSON_145) {
        return function (name) {
            return function (value) {
                return new Data_Tuple.Tuple(name, toJSON(__dict_ToJSON_145)(value));
            };
        };
    };
    var stringToJSON = function (_) {
        return new ToJSON(JString.create);
    };
    var showValue = function (_) {
        return new Prelude.Show(function (_287) {
            if (_287 instanceof JObject) {
                return "JObject " + Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_287.value0);
            };
            if (_287 instanceof JArray) {
                return "JArray " + Prelude.show(Prelude.showArray(showValue({})))(_287.value0);
            };
            if (_287 instanceof JString) {
                return "JString " + Prelude.show(Prelude.showString({}))(_287.value0);
            };
            if (_287 instanceof JNumber) {
                return "JNumber " + Prelude.show(Prelude.showNumber({}))(_287.value0);
            };
            if (_287 instanceof JBool) {
                return "JBool " + Prelude.show(Prelude.showBoolean({}))(_287.value0);
            };
            if (_287 instanceof JNull) {
                return "JNull";
            };
            throw new Error("Failed pattern match");
        });
    };
    var setToJSON = function (__dict_ToJSON_146) {
        return new ToJSON(function (s) {
            return JArray.create(Prelude["<$>"](Data_Array.functorArray({}))(toJSON(__dict_ToJSON_146))(Data_Set.toList(s)));
        });
    };
    var sequence = function (__dict_Monad_147) {
        return function (_285) {
            if (_285.length === 0) {
                return Prelude["return"](__dict_Monad_147)([  ]);
            };
            if (_285.length > 0) {
                var _1297 = _285.slice(1);
                return Prelude[">>="](__dict_Monad_147["__superclass_Prelude.Bind_1"]({}))(_285[0])(function (_7) {
                    return Prelude[">>="](__dict_Monad_147["__superclass_Prelude.Bind_1"]({}))(sequence(__dict_Monad_147)(_1297))(function (_6) {
                        return Prelude["return"](__dict_Monad_147)(Prelude[":"](_7)(_6));
                    });
                });
            };
            throw new Error("Failed pattern match");
        };
    };
    var parseJSON = function (dict) {
        return dict.parseJSON;
    };
    var $dot$colon = function (__dict_FromJSON_150) {
        return function (obj) {
            return function (key) {
                return (function (_1298) {
                    if (_1298 instanceof Data_Maybe.Nothing) {
                        return Data_Either.Left.create("key " + Prelude.show(Prelude.showString({}))(key) + " not present");
                    };
                    if (_1298 instanceof Data_Maybe.Just) {
                        return parseJSON(__dict_FromJSON_150)(_1298.value0);
                    };
                    throw new Error("Failed pattern match");
                })(Data_Map.lookup(Prelude.ordString({}))(key)(obj));
            };
        };
    };
    var object = function (ps) {
        return JObject.create(Data_Map.fromList(Prelude.ordString({}))(ps));
    };
    var numberToJSON = function (_) {
        return new ToJSON(JNumber.create);
    };
    var maybeToJSON = function (__dict_ToJSON_152) {
        return new ToJSON(function (_301) {
            if (_301 instanceof Data_Maybe.Nothing) {
                return JNull.value;
            };
            if (_301 instanceof Data_Maybe.Just) {
                return toJSON(__dict_ToJSON_152)(_301.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var maybeFromJSON = function (__dict_FromJSON_153) {
        return new FromJSON(function (a) {
            return Prelude["return"](Data_Either.monadEither({}))((function (_1302) {
                if (_1302 instanceof Data_Either.Left) {
                    return Data_Maybe.Nothing.value;
                };
                if (_1302 instanceof Data_Either.Right) {
                    return new Data_Maybe.Just(_1302.value0);
                };
                throw new Error("Failed pattern match");
            })(parseJSON(__dict_FromJSON_153)(a)));
        });
    };
    var $dot$colon$qmark = function (__dict_FromJSON_151) {
        return function (obj) {
            return function (key) {
                return (function (_1305) {
                    if (_1305 instanceof Data_Maybe.Nothing) {
                        return Prelude["return"](Data_Either.monadEither({}))(Data_Maybe.Nothing.value);
                    };
                    if (_1305 instanceof Data_Maybe.Just) {
                        return parseJSON(maybeFromJSON(__dict_FromJSON_151))(_1305.value0);
                    };
                    throw new Error("Failed pattern match");
                })(Data_Map.lookup(Prelude.ordString({}))(key)(obj));
            };
        };
    };
    var mapToJSON = function (__dict_ToJSON_154) {
        return new ToJSON(function (m) {
            return JObject.create(Data_Map.map(toJSON(__dict_ToJSON_154))(m));
        });
    };
    var jsonToValue = (function () {
        var insert$prime = Data_Map.insert(Prelude.ordString({}));
        var ctors = {
            "null": JNull.value, 
            number: JNumber.create, 
            bool: JBool.create, 
            string: JString.create, 
            array: JArray.create, 
            object: JObject.create
        };
        var auxes = {
            left: Data_Either.Left.create, 
            right: Data_Either.Right.create, 
            either: Data_Either.either, 
            insert: insert$prime, 
            empty: Data_Map.empty
        };
        return Data_Function.runFn3(jsonParseImpl)(Data_Either.Left.create)(jsonToValueImpl(auxes, ctors));
    })();
    var jsonParse = Data_Function.runFn3(jsonParseImpl)(Data_Either.Left.create)(Data_Either.Right.create);
    var fail = Data_Either.Left.create;
    var mapFromJSON = function (__dict_Ord_155) {
        return function (__dict_FromJSON_156) {
            return new FromJSON(function (_297) {
                if (_297 instanceof JObject) {
                    var fn = function (_298) {
                        return (function (_1309) {
                            if (_1309 instanceof Data_Either.Right) {
                                return Prelude["return"](Data_Either.monadEither({}))(new Data_Tuple.Tuple(_298.value0, _1309.value0));
                            };
                            if (_1309 instanceof Data_Either.Left) {
                                return fail(_1309.value0);
                            };
                            throw new Error("Failed pattern match");
                        })(parseJSON(__dict_FromJSON_156)(_298.value1));
                    };
                    return Prelude["<$>"](Data_Either.functorEither({}))(Data_Map.fromList(Prelude.ordString({})))(sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(fn)(Data_Map.toList(_297.value0))));
                };
                throw new Error("Failed pattern match");
            });
        };
    };
    var numberFromJSON = function (_) {
        return new FromJSON(function (_291) {
            if (_291 instanceof JNumber) {
                return Prelude["return"](Data_Either.monadEither({}))(_291.value0);
            };
            return fail(Prelude.show(showValue({}))(_291) + " is not Number.");
        });
    };
    var stringFromJSON = function (_) {
        return new FromJSON(function (_293) {
            if (_293 instanceof JString) {
                return Prelude["return"](Data_Either.monadEither({}))(_293.value0);
            };
            return fail(Prelude.show(showValue({}))(_293) + " is not String.");
        });
    };
    var tupleFromJSON = function (__dict_FromJSON_157) {
        return function (__dict_FromJSON_158) {
            return new FromJSON(function (_295) {
                if (_295 instanceof JArray && _295.value0.length === 2) {
                    return Prelude["<*>"](Data_Either.applyEither({}))(Prelude["<$>"](Data_Either.functorEither({}))(Data_Tuple.Tuple.create)(parseJSON(__dict_FromJSON_157)(_295.value0[0])))(parseJSON(__dict_FromJSON_158)(_295.value0[1]));
                };
                return fail(Prelude.show(showValue({}))(_295) + " is not (a,b).");
            });
        };
    };
    var unitFromJSON = function (_) {
        return new FromJSON(function (_292) {
            if (_292 instanceof JNull) {
                return Prelude["return"](Data_Either.monadEither({}))(Prelude.unit);
            };
            return fail(Prelude.show(showValue({}))(_292) + " is not Null.");
        });
    };
    var eqValue = function (_) {
        return new Prelude.Eq(function (a) {
            return function (b) {
                return !Prelude["=="](eqValue({}))(a)(b);
            };
        }, function (_288) {
            return function (_289) {
                if (_288 instanceof JObject && _289 instanceof JObject) {
                    return Prelude["=="](Data_Map.eqMap(Prelude.eqString({}))(eqValue({})))(_288.value0)(_289.value0);
                };
                if (_288 instanceof JArray && _289 instanceof JArray) {
                    return Prelude["=="](Prelude.eqArray(eqValue({})))(_288.value0)(_289.value0);
                };
                if (_288 instanceof JString && _289 instanceof JString) {
                    return _288.value0 === _289.value0;
                };
                if (_288 instanceof JNumber && _289 instanceof JNumber) {
                    return _288.value0 === _289.value0;
                };
                if (_288 instanceof JBool && _289 instanceof JBool) {
                    return _288.value0 === _289.value0;
                };
                if (_288 instanceof JNull && _289 instanceof JNull) {
                    return true;
                };
                return false;
            };
        });
    };
    var encode = function (__dict_ToJSON_159) {
        return function (a) {
            return valueToString(toJSON(__dict_ToJSON_159)(a));
        };
    };
    var eitherToJSON = function (__dict_ToJSON_160) {
        return function (__dict_ToJSON_161) {
            return new ToJSON(function (_300) {
                if (_300 instanceof Data_Either.Right) {
                    return object([ $dot$eq(__dict_ToJSON_161)("Right")(_300.value0) ]);
                };
                if (_300 instanceof Data_Either.Left) {
                    return object([ $dot$eq(__dict_ToJSON_160)("Left")(_300.value0) ]);
                };
                throw new Error("Failed pattern match");
            });
        };
    };
    var eitherFromJSON = function (__dict_FromJSON_162) {
        return function (__dict_FromJSON_163) {
            return new FromJSON(function (_296) {
                if (_296 instanceof JObject) {
                    return (function (_1340) {
                        if (_1340.length === 1 && (_1340[0]).value0 === "Right") {
                            return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Right.create)(parseJSON(__dict_FromJSON_163)((_1340[0]).value1));
                        };
                        if (_1340.length === 1 && (_1340[0]).value0 === "Left") {
                            return Prelude["<$>"](Data_Either.functorEither({}))(Data_Either.Left.create)(parseJSON(__dict_FromJSON_162)((_1340[0]).value1));
                        };
                        return fail(Prelude.show(Data_Map.showMap(Prelude.showString({}))(showValue({})))(_296.value0) + " is not (Either a b).");
                    })(Data_Map.toList(_296.value0));
                };
                return fail(Prelude.show(showValue({}))(_296) + " is not (Either a b).");
            });
        };
    };
    var eitherDecode = function (__dict_FromJSON_164) {
        return function (s) {
            return Prelude[">>="](Data_Either.bindEither({}))(jsonToValue(s))(function (_5) {
                return parseJSON(__dict_FromJSON_164)(_5);
            });
        };
    };
    var decode = function (__dict_FromJSON_165) {
        return function (s) {
            return (function (_1349) {
                if (_1349 instanceof Data_Either.Right) {
                    return new Data_Maybe.Just(_1349.value0);
                };
                if (_1349 instanceof Data_Either.Left) {
                    return Data_Maybe.Nothing.value;
                };
                throw new Error("Failed pattern match");
            })(eitherDecode(__dict_FromJSON_165)(s));
        };
    };
    var boolToJSON = function (_) {
        return new ToJSON(JBool.create);
    };
    var boolFromJSON = function (_) {
        return new FromJSON(function (_290) {
            if (_290 instanceof JBool) {
                return new Data_Either.Right(_290.value0);
            };
            return fail(Prelude.show(showValue({}))(_290) + " is not Boolean.");
        });
    };
    var arrayToJSON = function (__dict_ToJSON_166) {
        return new ToJSON(function (a) {
            return JArray.create(Prelude["<$>"](Data_Array.functorArray({}))(toJSON(__dict_ToJSON_166))(a));
        });
    };
    var arrayFromJSON = function (__dict_FromJSON_167) {
        return new FromJSON(function (_294) {
            if (_294 instanceof JArray) {
                return sequence(Data_Either.monadEither({}))(Prelude["<$>"](Data_Array.functorArray({}))(parseJSON(__dict_FromJSON_167))(_294.value0));
            };
            return fail(Prelude.show(showValue({}))(_294) + " is not [a].");
        });
    };
    var setFromJSON = function (__dict_Ord_148) {
        return function (__dict_FromJSON_149) {
            return new FromJSON(function (a) {
                return Prelude["<$>"](Data_Either.functorEither({}))(Data_Set.fromList(__dict_Ord_148))(parseJSON(arrayFromJSON(__dict_FromJSON_149))(a));
            });
        };
    };
    return {
        JObject: JObject, 
        JArray: JArray, 
        JString: JString, 
        JNumber: JNumber, 
        JBool: JBool, 
        JNull: JNull, 
        ToJSON: ToJSON, 
        FromJSON: FromJSON, 
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
    var Data_JSON = PS.Data_JSON;
    var Data_Either = PS.Data_Either;
    function D(value0) {
        this.value0 = value0;
    };
    D.create = function (value0) {
        return new D(value0);
    };
    function B(value0) {
        this.value0 = value0;
    };
    B.create = function (value0) {
        return new B(value0);
    };
    function A(value0, value1, value2) {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    };
    A.create = function (value0) {
        return function (value1) {
            return function (value2) {
                return new A(value0, value1, value2);
            };
        };
    };
    function C1(value0) {
        this.value0 = value0;
    };
    C1.create = function (value0) {
        return new C1(value0);
    };
    function C2(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    C2.create = function (value0) {
        return function (value1) {
            return new C2(value0, value1);
        };
    };
    var autoDFromJSON = function (__dict_FromJSON_168) {
        return new Data_JSON.FromJSON(function (input) {
            if (input instanceof Data_JSON.JArray && input.value0.length === 1) {
                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(__dict_FromJSON_168)(input.value0[0]))(function (_13) {
                    return Prelude["return"](Data_Either.monadEither({}))(new D(_13));
                });
            };
            return Data_JSON.fail("cannot parse.");
        });
    };
    var autoBFromJSON = function (_) {
        return new Data_JSON.FromJSON(function (input) {
            if (input instanceof Data_JSON.JObject) {
                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.arrayFromJSON(Data_JSON.numberFromJSON({})))(input.value0)("number"))(function (_18) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(input.value0)("first"))(function (_17) {
                        return Prelude["return"](Data_Either.monadEither({}))(new B({
                            number: _18, 
                            first: _17
                        }));
                    });
                });
            };
            return Data_JSON.fail("cannot parse.");
        });
    };
    var autoAFromJSON = function (_) {
        return new Data_JSON.FromJSON(function (input) {
            if (input instanceof Data_JSON.JArray && input.value0.length === 3) {
                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.value0[0]))(function (_16) {
                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(input.value0[1]))(function (_15) {
                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.stringFromJSON({}))(input.value0[2]))(function (_14) {
                            return Prelude["return"](Data_Either.monadEither({}))(new A(_16, _15, _14));
                        });
                    });
                });
            };
            return Data_JSON.fail("cannot parse.");
        });
    };
    var autoCFromJSON = function (_) {
        return new Data_JSON.FromJSON(function (_303) {
            if (_303 instanceof Data_JSON.JObject) {
                return (function (_1373) {
                    if (_1373 instanceof Data_Either.Right && _1373.value0 === "C1") {
                        var input = new Data_JSON.JObject(_303.value0);
                        return (function (_1374) {
                            if (_1374 instanceof Data_JSON.JObject) {
                                return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](autoAFromJSON({}))(_1374.value0)("a"))(function (_10) {
                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_1374.value0)("name"))(function (_9) {
                                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON[".:"](Data_JSON.boolFromJSON({}))(_1374.value0)("admin"))(function (_8) {
                                            return Prelude["return"](Data_Either.monadEither({}))(new C1({
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
                    if (_1373 instanceof Data_Either.Right && _1373.value0 === "C2") {
                        return (function (_1380) {
                            if (_1380 instanceof Data_Either.Right) {
                                if (_1380.value0 instanceof Data_JSON.JArray && _1380.value0.value0.length === 2) {
                                    return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(Data_JSON.numberFromJSON({}))(_1380.value0.value0[0]))(function (_12) {
                                        return Prelude[">>="](Data_Either.bindEither({}))(Data_JSON.parseJSON(autoBFromJSON({}))(_1380.value0.value0[1]))(function (_11) {
                                            return Prelude["return"](Data_Either.monadEither({}))(new C2(_12, _11));
                                        });
                                    });
                                };
                                return Data_JSON.fail("cannot parse.");
                            };
                            return Data_JSON.fail("cannot parse.");
                        })(Data_JSON[".:"](Data_JSON.valueFromJSON({}))(_303.value0)("contents"));
                    };
                    return Data_JSON.fail("cannot parse.");
                })(Data_JSON[".:"](Data_JSON.stringFromJSON({}))(_303.value0)("tag"));
            };
            return Data_JSON.fail("cannot parse.");
        });
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
    var Foreign = PS.Foreign;
    var Debug_Trace = PS.Debug_Trace;
    var Data_Maybe = PS.Data_Maybe;
    var Data_JSON = PS.Data_JSON;
    var showB = function (_) {
        return new Prelude.Show(function (_305) {
            return "B{ number: " + Prelude.show(Prelude.showArray(Prelude.showNumber({})))(_305.value0.number) + ", first: " + Prelude.show(Prelude.showString({}))(_305.value0.first) + "}";
        });
    };
    var showA = function (_) {
        return new Prelude.Show(function (_304) {
            return "A " + Prelude.show(Prelude.showNumber({}))(_304.value0) + " " + Prelude.show(Prelude.showNumber({}))(_304.value1) + " " + Prelude.show(Prelude.showString({}))(_304.value2);
        });
    };
    var showC = function (_) {
        return new Prelude.Show(function (_306) {
            if (_306 instanceof Foreign.C1) {
                return "C1{ a: " + Prelude.show(showA({}))(_306.value0.a) + ", name: " + Prelude.show(Prelude.showString({}))(_306.value0.name) + ", admin: " + Prelude.show(Prelude.showBoolean({}))(_306.value0.admin) + "}";
            };
            if (_306 instanceof Foreign.C2) {
                return "C2 " + Prelude.show(Prelude.showNumber({}))(_306.value0) + " " + Prelude.show(showB({}))(_306.value1);
            };
            throw new Error("Failed pattern match");
        });
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
    var Prelude = PS.Prelude;
    var Data_Foldable = PS.Data_Foldable;
    var Data_Eq = PS.Data_Eq;
    var Data_Maybe = PS.Data_Maybe;
    var Data_Either = PS.Data_Either;
    var Data_Array = PS.Data_Array;
    function Traversable(__superclass_Data$dotFoldable$dotFoldable_1, __superclass_Prelude$dotFunctor_0, sequence, traverse) {
        this["__superclass_Data.Foldable.Foldable_1"] = __superclass_Data$dotFoldable$dotFoldable_1;
        this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
        this.sequence = sequence;
        this.traverse = traverse;
    };
    var traverse = function (dict) {
        return dict.traverse;
    };
    var traversableTuple = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableTuple({});
        }, function (__1) {
            return Data_Tuple.functorTuple({});
        }, function (__dict_Applicative_170) {
            return function (_321) {
                return Prelude["<$>"]((__dict_Applicative_170["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_321.value0))(_321.value1);
            };
        }, function (__dict_Applicative_169) {
            return function (_319) {
                return function (_320) {
                    return Prelude["<$>"]((__dict_Applicative_169["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Tuple.Tuple.create(_320.value0))(_319(_320.value1));
                };
            };
        });
    };
    var traversableRef = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableRef({});
        }, function (__1) {
            return Data_Eq.functorRef({});
        }, function (__dict_Applicative_172) {
            return function (_315) {
                return Prelude["<$>"]((__dict_Applicative_172["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_315);
            };
        }, function (__dict_Applicative_171) {
            return function (_313) {
                return function (_314) {
                    return Prelude["<$>"]((__dict_Applicative_171["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Eq.Ref.create)(_313(_314));
                };
            };
        });
    };
    var traversableMaybe = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableMaybe({});
        }, function (__1) {
            return Data_Maybe.functorMaybe({});
        }, function (__dict_Applicative_174) {
            return function (_318) {
                if (_318 instanceof Data_Maybe.Nothing) {
                    return Prelude.pure(__dict_Applicative_174)(Data_Maybe.Nothing.value);
                };
                if (_318 instanceof Data_Maybe.Just) {
                    return Prelude["<$>"]((__dict_Applicative_174["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_318.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_173) {
            return function (_316) {
                return function (_317) {
                    if (_317 instanceof Data_Maybe.Nothing) {
                        return Prelude.pure(__dict_Applicative_173)(Data_Maybe.Nothing.value);
                    };
                    if (_317 instanceof Data_Maybe.Just) {
                        return Prelude["<$>"]((__dict_Applicative_173["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Maybe.Just.create)(_316(_317.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var traversableEither = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableEither({});
        }, function (__1) {
            return Data_Either.functorEither({});
        }, function (__dict_Applicative_176) {
            return function (_312) {
                if (_312 instanceof Data_Either.Left) {
                    return Prelude.pure(__dict_Applicative_176)(new Data_Either.Left(_312.value0));
                };
                if (_312 instanceof Data_Either.Right) {
                    return Prelude["<$>"]((__dict_Applicative_176["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_312.value0);
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_175) {
            return function (_310) {
                return function (_311) {
                    if (_311 instanceof Data_Either.Left) {
                        return Prelude.pure(__dict_Applicative_175)(new Data_Either.Left(_311.value0));
                    };
                    if (_311 instanceof Data_Either.Right) {
                        return Prelude["<$>"]((__dict_Applicative_175["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Data_Either.Right.create)(_310(_311.value0));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var sequence = function (dict) {
        return dict.sequence;
    };
    var traversableArray = function (_) {
        return new Traversable(function (__1) {
            return Data_Foldable.foldableArray({});
        }, function (__1) {
            return Data_Array.functorArray({});
        }, function (__dict_Applicative_178) {
            return function (_309) {
                if (_309.length === 0) {
                    return Prelude.pure(__dict_Applicative_178)([  ]);
                };
                if (_309.length > 0) {
                    var _1429 = _309.slice(1);
                    return Prelude["<*>"](__dict_Applicative_178["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_178["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_309[0]))(sequence(traversableArray({}))(__dict_Applicative_178)(_1429));
                };
                throw new Error("Failed pattern match");
            };
        }, function (__dict_Applicative_177) {
            return function (_307) {
                return function (_308) {
                    if (_308.length === 0) {
                        return Prelude.pure(__dict_Applicative_177)([  ]);
                    };
                    if (_308.length > 0) {
                        var _1433 = _308.slice(1);
                        return Prelude["<*>"](__dict_Applicative_177["__superclass_Prelude.Apply_0"]({}))(Prelude["<$>"]((__dict_Applicative_177["__superclass_Prelude.Apply_0"]({}))["__superclass_Prelude.Functor_0"]({}))(Prelude[":"])(_307(_308[0])))(traverse(traversableArray({}))(__dict_Applicative_177)(_307)(_1433));
                    };
                    throw new Error("Failed pattern match");
                };
            };
        });
    };
    var zipWithA = function (__dict_Applicative_179) {
        return function (f) {
            return function (xs) {
                return function (ys) {
                    return sequence(traversableArray({}))(__dict_Applicative_179)(Data_Array.zipWith(f)(xs)(ys));
                };
            };
        };
    };
    var $$for = function (__dict_Applicative_180) {
        return function (__dict_Traversable_181) {
            return function (x) {
                return function (f) {
                    return traverse(__dict_Traversable_181)(__dict_Applicative_180)(f)(x);
                };
            };
        };
    };
    return {
        Traversable: Traversable, 
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
    function AcyclicSCC(value0) {
        this.value0 = value0;
    };
    AcyclicSCC.create = function (value0) {
        return new AcyclicSCC(value0);
    };
    function CyclicSCC(value0) {
        this.value0 = value0;
    };
    CyclicSCC.create = function (value0) {
        return new CyclicSCC(value0);
    };
    function Edge(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Edge.create = function (value0) {
        return function (value1) {
            return new Edge(value0, value1);
        };
    };
    function Graph(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    Graph.create = function (value0) {
        return function (value1) {
            return new Graph(value0, value1);
        };
    };
    var vertices = function (_324) {
        if (_324 instanceof AcyclicSCC) {
            return [ _324.value0 ];
        };
        if (_324 instanceof CyclicSCC) {
            return _324.value0;
        };
        throw new Error("Failed pattern match");
    };
    var showSCC = function (__dict_Show_182) {
        return new Prelude.Show(function (_334) {
            if (_334 instanceof AcyclicSCC) {
                return "AcyclicSCC (" + Prelude.show(__dict_Show_182)(_334.value0) + ")";
            };
            if (_334 instanceof CyclicSCC) {
                return "CyclicSCC " + Prelude.show(Prelude.showArray(__dict_Show_182))(_334.value0);
            };
            throw new Error("Failed pattern match");
        });
    };
    var popUntil = function (__copy___dict_Eq_183) {
        return function (__copy__328) {
            return function (__copy__329) {
                return function (__copy__330) {
                    return function (__copy__331) {
                        var __dict_Eq_183 = __copy___dict_Eq_183;
                        var _328 = __copy__328;
                        var _329 = __copy__329;
                        var _330 = __copy__330;
                        var _331 = __copy__331;
                        tco: while (true) {
                            if (_330.length === 0) {
                                return {
                                    path: [  ], 
                                    component: _331
                                };
                            };
                            if (_330.length > 0) {
                                var _1445 = _330.slice(1);
                                if (Prelude["=="](__dict_Eq_183)(_328(_329))(_328(_330[0]))) {
                                    return {
                                        path: _1445, 
                                        component: Prelude[":"](_330[0])(_331)
                                    };
                                };
                            };
                            if (_330.length > 0) {
                                var _1447 = _330.slice(1);
                                var __tco___dict_Eq_183 = __dict_Eq_183;
                                var __tco__328 = _328;
                                var __tco__329 = _329;
                                var __tco__331 = Prelude[":"](_330[0])(_331);
                                __dict_Eq_183 = __tco___dict_Eq_183;
                                _328 = __tco__328;
                                _329 = __tco__329;
                                _330 = _1447;
                                _331 = __tco__331;
                                continue tco;
                            };
                            throw new Error("Failed pattern match");
                        };
                    };
                };
            };
        };
    };
    var maybeMin = function (_332) {
        return function (_333) {
            if (_333 instanceof Data_Maybe.Nothing) {
                return new Data_Maybe.Just(_332);
            };
            if (_333 instanceof Data_Maybe.Just) {
                return Data_Maybe.Just.create(Math.min(_332)(_333.value0));
            };
            throw new Error("Failed pattern match");
        };
    };
    var scc$prime = function (__dict_Eq_184) {
        return function (__dict_Ord_185) {
            return function (_325) {
                return function (_326) {
                    return function (_327) {
                        return Control_Monad_Eff.runPure(function __do() {
                            var _34 = {
                                value: 0
                            };
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
                                        return Data_Map.lookup(__dict_Ord_185)(k)(_31.value);
                                    };
                                };
                                var lowlinkOf = function (v) {
                                    return lowlinkOfKey(_325(v));
                                };
                                var isCycle = function (k) {
                                    return Data_Foldable.any(Data_Foldable.foldableArray({}))(function (_323) {
                                        return Prelude["=="](__dict_Eq_184)(_323.value0)(k) && Prelude["=="](__dict_Eq_184)(_323.value1)(k);
                                    })(_327.value1);
                                };
                                var makeComponent = function (_338) {
                                    if (_338.length === 1 && !isCycle(_325(_338[0]))) {
                                        return new AcyclicSCC(_338[0]);
                                    };
                                    return new CyclicSCC(_338);
                                };
                                var indexOfKey = function (k) {
                                    return function __do() {
                                        return Data_Map.lookup(__dict_Ord_185)(k)(_32.value);
                                    };
                                };
                                var strongConnect = function (k) {
                                    var v = _326(k);
                                    return function __do() {
                                        var _29 = _34.value;
                                        _32.value = Data_Map.insert(__dict_Ord_185)(k)(_29)(_32.value);
                                        var __1 = _31.value = Data_Map.insert(__dict_Ord_185)(k)(_29)(_31.value);
                                        var __2 = _34.value = _29 + 1;
                                        var __3 = _33.value = Prelude[":"](v)(_33.value);
                                        var __4 = Data_Traversable["for"](Control_Monad_Eff.applicativeEff({}))(Data_Traversable.traversableArray({}))(_327.value1)(function (_322) {
                                            return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Prelude["=="](__dict_Eq_184)(k)(_322.value0))(function __do() {
                                                var _25 = indexOfKey(_322.value1)();
                                                return (function (_1470) {
                                                    if (_1470 instanceof Data_Maybe.Nothing) {
                                                        var w = _326(_322.value1);
                                                        return function __do() {
                                                            var __4 = strongConnect(_322.value1)();
                                                            var _22 = lowlinkOfKey(_322.value1)();
                                                            return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_22)(function (lowlink) {
                                                                return Control_Monad_ST.modifySTRef(_31)(Data_Map.alter(__dict_Ord_185)(maybeMin(lowlink))(k));
                                                            })();
                                                        };
                                                    };
                                                    return Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Foldable.elem(__dict_Eq_184)(Data_Foldable.foldableArray({}))(_322.value1)(Data_Array.map(_325)(_33.value)))(function __do() {
                                                        var _23 = indexOfKey(_322.value1)();
                                                        return Data_Foldable.for_(Control_Monad_Eff.applicativeEff({}))(Data_Foldable.foldableMaybe({}))(_23)(function (index_1) {
                                                            return Control_Monad_ST.modifySTRef(_31)(Data_Map.alter(__dict_Ord_185)(maybeMin(index_1))(k));
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
                                                var newPath = popUntil(__dict_Eq_184)(_325)(v)(_26)([  ]);
                                                return function __do() {
                                                    var __5 = _30.value = Prelude.flip(Prelude["++"](Data_Array.semigroupArray({})))([ makeComponent(newPath.component) ])(_30.value);
                                                    var __6 = _33.value = newPath.path;
                                                    return Prelude.unit;
                                                };
                                            })()();
                                        })();
                                    };
                                };
                                var indexOf = function (v) {
                                    return indexOfKey(_325(v));
                                };
                                var go = function (_337) {
                                    if (_337.length === 0) {
                                        return Control_Monad_ST.readSTRef(_30);
                                    };
                                    if (_337.length > 0) {
                                        var _1481 = _337.slice(1);
                                        return function __do() {
                                            var _21 = indexOf(_337[0])();
                                            Control_Monad.when(Control_Monad_Eff.monadEff({}))(Data_Maybe.isNothing(_21))(strongConnect(_325(_337[0])))();
                                            return go(_1481)();
                                        };
                                    };
                                    throw new Error("Failed pattern match");
                                };
                                return go(_327.value0);
                            })()();
                        });
                    };
                };
            };
        };
    };
    var scc = function (__dict_Eq_186) {
        return function (__dict_Ord_187) {
            return scc$prime(__dict_Eq_186)(__dict_Ord_187)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var topSort$prime = function (__dict_Eq_188) {
        return function (__dict_Ord_189) {
            return function (makeKey) {
                return function (makeVert) {
                    return Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.reverse)(Prelude["<<<"](Prelude.semigroupoidArr({}))(Data_Array.concatMap(vertices))(scc$prime(__dict_Eq_188)(__dict_Ord_189)(makeKey)(makeVert)));
                };
            };
        };
    };
    var topSort = function (__dict_Eq_190) {
        return function (__dict_Ord_191) {
            return topSort$prime(__dict_Eq_190)(__dict_Ord_191)(Prelude.id(Prelude.categoryArr({})))(Prelude.id(Prelude.categoryArr({})));
        };
    };
    var eqSCC = function (__dict_Eq_192) {
        return new Prelude.Eq(function (scc1) {
            return function (scc2) {
                return !Prelude["=="](eqSCC(__dict_Eq_192))(scc1)(scc2);
            };
        }, function (_335) {
            return function (_336) {
                if (_335 instanceof AcyclicSCC && _336 instanceof AcyclicSCC) {
                    return Prelude["=="](__dict_Eq_192)(_335.value0)(_336.value0);
                };
                if (_335 instanceof CyclicSCC && _336 instanceof CyclicSCC) {
                    return Prelude["=="](Prelude.eqArray(__dict_Eq_192))(_335.value0)(_336.value0);
                };
                return false;
            };
        });
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