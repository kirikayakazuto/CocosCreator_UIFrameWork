'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/* Polyfill service v3.13.0
 * For detailed credits and licence information see http://github.com/financial-times/polyfill-service
 *
 * - Array.prototype.fill, License: CC0 */

if (!('fill' in Array.prototype)) {
  Object.defineProperty(Array.prototype, 'fill', {
    configurable: true,
    value: function fill (value) {
      if (this === undefined || this === null) {
        throw new TypeError(this + ' is not an object')
      }

      var arrayLike = Object(this);

      var length = Math.max(Math.min(arrayLike.length, 9007199254740991), 0) || 0;

      var relativeStart = 1 in arguments ? parseInt(Number(arguments[1]), 10) || 0 : 0;

      relativeStart = relativeStart < 0 ? Math.max(length + relativeStart, 0) : Math.min(relativeStart, length);

      var relativeEnd = 2 in arguments && arguments[2] !== undefined ? parseInt(Number(arguments[2]), 10) || 0 : length;

      relativeEnd = relativeEnd < 0 ? Math.max(length + arguments[2], 0) : Math.min(relativeEnd, length);

      while (relativeStart < relativeEnd) {
        arrayLike[relativeStart] = value;

        ++relativeStart;
      }

      return arrayLike
    },
    writable: true
  });
}

/**
 * Polyfill for IE support
 */
Number.isFinite = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value)
};

Number.isInteger = Number.isInteger || function (val) {
  return typeof val === 'number' &&
  isFinite(val) &&
  Math.floor(val) === val
};

Number.parseFloat = Number.parseFloat || parseFloat;

Number.isNaN = Number.isNaN || function (value) {
  return value !== value // eslint-disable-line
};

/**
 * Polyfill for IE support
 */
Math.trunc = Math.trunc || function (x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x)
};

var NumberUtil = function NumberUtil () {};

NumberUtil.prototype.interfaces_ = function interfaces_ () {
  return []
};
NumberUtil.prototype.getClass = function getClass () {
  return NumberUtil
};
NumberUtil.prototype.equalsWithTolerance = function equalsWithTolerance (x1, x2, tolerance) {
  return Math.abs(x1 - x2) <= tolerance
};

var IllegalArgumentException = (function (Error) {
	function IllegalArgumentException (message) {
		Error.call(this, message);
		this.name = 'IllegalArgumentException';
		this.message = message;
		this.stack = (new Error()).stack;
	}

	if ( Error ) IllegalArgumentException.__proto__ = Error;
	IllegalArgumentException.prototype = Object.create( Error && Error.prototype );
	IllegalArgumentException.prototype.constructor = IllegalArgumentException;

	return IllegalArgumentException;
}(Error));

var Double = function Double () {};

var staticAccessors$1 = { MAX_VALUE: { configurable: true } };

Double.isNaN = function isNaN (n) { return Number.isNaN(n) };
Double.doubleToLongBits = function doubleToLongBits (n) { return n };
Double.longBitsToDouble = function longBitsToDouble (n) { return n };
Double.isInfinite = function isInfinite (n) { return !Number.isFinite(n) };
staticAccessors$1.MAX_VALUE.get = function () { return Number.MAX_VALUE };

Object.defineProperties( Double, staticAccessors$1 );

var Comparable = function Comparable () {};

var Clonable = function Clonable () {};

var Comparator = function Comparator () {};

function Serializable () {}

// import Assert from '../util/Assert'

var Coordinate = function Coordinate () {
  this.x = null;
  this.y = null;
  this.z = null;
  if (arguments.length === 0) {
    this.x = 0.0;
    this.y = 0.0;
    this.z = Coordinate.NULL_ORDINATE;
  } else if (arguments.length === 1) {
    var c = arguments[0];
    this.x = c.x;
    this.y = c.y;
    this.z = c.z;
  } else if (arguments.length === 2) {
    this.x = arguments[0];
    this.y = arguments[1];
    this.z = Coordinate.NULL_ORDINATE;
  } else if (arguments.length === 3) {
    this.x = arguments[0];
    this.y = arguments[1];
    this.z = arguments[2];
  }
};

var staticAccessors = { DimensionalComparator: { configurable: true },serialVersionUID: { configurable: true },NULL_ORDINATE: { configurable: true },X: { configurable: true },Y: { configurable: true },Z: { configurable: true } };
Coordinate.prototype.setOrdinate = function setOrdinate (ordinateIndex, value) {
  switch (ordinateIndex) {
    case Coordinate.X:
      this.x = value;
      break
    case Coordinate.Y:
      this.y = value;
      break
    case Coordinate.Z:
      this.z = value;
      break
    default:
      throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
  }
};
Coordinate.prototype.equals2D = function equals2D () {
  if (arguments.length === 1) {
    var other = arguments[0];
    if (this.x !== other.x) {
      return false
    }
    if (this.y !== other.y) {
      return false
    }
    return true
  } else if (arguments.length === 2) {
    var c = arguments[0];
    var tolerance = arguments[1];
    if (!NumberUtil.equalsWithTolerance(this.x, c.x, tolerance)) {
      return false
    }
    if (!NumberUtil.equalsWithTolerance(this.y, c.y, tolerance)) {
      return false
    }
    return true
  }
};
Coordinate.prototype.getOrdinate = function getOrdinate (ordinateIndex) {
  switch (ordinateIndex) {
    case Coordinate.X:
      return this.x
    case Coordinate.Y:
      return this.y
    case Coordinate.Z:
      return this.z
    default:
  }
  throw new IllegalArgumentException('Invalid ordinate index: ' + ordinateIndex)
};
Coordinate.prototype.equals3D = function equals3D (other) {
  return this.x === other.x &&
         this.y === other.y &&
         ((this.z === other.z || Double.isNaN(this.z)) &&
         Double.isNaN(other.z))
};
Coordinate.prototype.equals = function equals (other) {
  if (!(other instanceof Coordinate)) {
    return false
  }
  return this.equals2D(other)
};
Coordinate.prototype.equalInZ = function equalInZ (c, tolerance) {
  return NumberUtil.equalsWithTolerance(this.z, c.z, tolerance)
};
Coordinate.prototype.compareTo = function compareTo (o) {
  var other = o;
  if (this.x < other.x) { return -1 }
  if (this.x > other.x) { return 1 }
  if (this.y < other.y) { return -1 }
  if (this.y > other.y) { return 1 }
  return 0
};
Coordinate.prototype.clone = function clone () {
  // try {
  // var coord = null
  // return coord
  // } catch (e) {
  // if (e instanceof CloneNotSupportedException) {
  //   Assert.shouldNeverReachHere("this shouldn't happen because this class is Cloneable")
  //   return null
  // } else throw e
  // } finally {}
};
Coordinate.prototype.copy = function copy () {
  return new Coordinate(this)
};
Coordinate.prototype.toString = function toString () {
  return '(' + this.x + ', ' + this.y + ', ' + this.z + ')'
};
Coordinate.prototype.distance3D = function distance3D (c) {
  var dx = this.x - c.x;
  var dy = this.y - c.y;
  var dz = this.z - c.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
};
Coordinate.prototype.distance = function distance (c) {
  var dx = this.x - c.x;
  var dy = this.y - c.y;
  return Math.sqrt(dx * dx + dy * dy)
};
Coordinate.prototype.hashCode = function hashCode () {
  var result = 17;
  result = 37 * result + Coordinate.hashCode(this.x);
  result = 37 * result + Coordinate.hashCode(this.y);
  return result
};
Coordinate.prototype.setCoordinate = function setCoordinate (other) {
  this.x = other.x;
  this.y = other.y;
  this.z = other.z;
};
Coordinate.prototype.interfaces_ = function interfaces_ () {
  return [Comparable, Clonable, Serializable]
};
Coordinate.prototype.getClass = function getClass () {
  return Coordinate
};
Coordinate.hashCode = function hashCode () {
  if (arguments.length === 1) {
    var x = arguments[0];
    var f = Double.doubleToLongBits(x);
    return Math.trunc((f ^ f) >>> 32)
  }
};
staticAccessors.DimensionalComparator.get = function () { return DimensionalComparator };
staticAccessors.serialVersionUID.get = function () { return 6683108902428366910 };
staticAccessors.NULL_ORDINATE.get = function () { return Double.NaN };
staticAccessors.X.get = function () { return 0 };
staticAccessors.Y.get = function () { return 1 };
staticAccessors.Z.get = function () { return 2 };

Object.defineProperties( Coordinate, staticAccessors );

var DimensionalComparator = function DimensionalComparator (dimensionsToTest) {
  this._dimensionsToTest = 2;
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var dimensionsToTest$1 = arguments[0];
    if (dimensionsToTest$1 !== 2 && dimensionsToTest$1 !== 3) { throw new IllegalArgumentException('only 2 or 3 dimensions may be specified') }
    this._dimensionsToTest = dimensionsToTest$1;
  }
};
DimensionalComparator.prototype.compare = function compare (o1, o2) {
  var c1 = o1;
  var c2 = o2;
  var compX = DimensionalComparator.compare(c1.x, c2.x);
  if (compX !== 0) { return compX }
  var compY = DimensionalComparator.compare(c1.y, c2.y);
  if (compY !== 0) { return compY }
  if (this._dimensionsToTest <= 2) { return 0 }
  var compZ = DimensionalComparator.compare(c1.z, c2.z);
  return compZ
};
DimensionalComparator.prototype.interfaces_ = function interfaces_ () {
  return [Comparator]
};
DimensionalComparator.prototype.getClass = function getClass () {
  return DimensionalComparator
};
DimensionalComparator.compare = function compare (a, b) {
  if (a < b) { return -1 }
  if (a > b) { return 1 }
  if (Double.isNaN(a)) {
    if (Double.isNaN(b)) { return 0 }
    return -1
  }
  if (Double.isNaN(b)) { return 1 }
  return 0
};

// import hasInterface from '../../../../hasInterface'
// import CoordinateSequence from './CoordinateSequence'

var CoordinateSequenceFactory = function CoordinateSequenceFactory () {};

CoordinateSequenceFactory.prototype.create = function create () {
  // if (arguments.length === 1) {
  // if (arguments[0] instanceof Array) {
  //   let coordinates = arguments[0]
  // } else if (hasInterface(arguments[0], CoordinateSequence)) {
  //   let coordSeq = arguments[0]
  // }
  // } else if (arguments.length === 2) {
  // let size = arguments[0]
  // let dimension = arguments[1]
  // }
};
CoordinateSequenceFactory.prototype.interfaces_ = function interfaces_ () {
  return []
};
CoordinateSequenceFactory.prototype.getClass = function getClass () {
  return CoordinateSequenceFactory
};

var Location = function Location () {};

var staticAccessors$4 = { INTERIOR: { configurable: true },BOUNDARY: { configurable: true },EXTERIOR: { configurable: true },NONE: { configurable: true } };

Location.prototype.interfaces_ = function interfaces_ () {
  return []
};
Location.prototype.getClass = function getClass () {
  return Location
};
Location.toLocationSymbol = function toLocationSymbol (locationValue) {
  switch (locationValue) {
    case Location.EXTERIOR:
      return 'e'
    case Location.BOUNDARY:
      return 'b'
    case Location.INTERIOR:
      return 'i'
    case Location.NONE:
      return '-'
    default:
  }
  throw new IllegalArgumentException('Unknown location value: ' + locationValue)
};
staticAccessors$4.INTERIOR.get = function () { return 0 };
staticAccessors$4.BOUNDARY.get = function () { return 1 };
staticAccessors$4.EXTERIOR.get = function () { return 2 };
staticAccessors$4.NONE.get = function () { return -1 };

Object.defineProperties( Location, staticAccessors$4 );

var hasInterface = function (o, i) {
  return o.interfaces_ && o.interfaces_().indexOf(i) > -1
};

var MathUtil = function MathUtil () {};

var staticAccessors$5 = { LOG_10: { configurable: true } };

MathUtil.prototype.interfaces_ = function interfaces_ () {
  return []
};
MathUtil.prototype.getClass = function getClass () {
  return MathUtil
};
MathUtil.log10 = function log10 (x) {
  var ln = Math.log(x);
  if (Double.isInfinite(ln)) { return ln }
  if (Double.isNaN(ln)) { return ln }
  return ln / MathUtil.LOG_10
};
MathUtil.min = function min (v1, v2, v3, v4) {
  var min = v1;
  if (v2 < min) { min = v2; }
  if (v3 < min) { min = v3; }
  if (v4 < min) { min = v4; }
  return min
};
MathUtil.clamp = function clamp () {
  if (typeof arguments[2] === 'number' && (typeof arguments[0] === 'number' && typeof arguments[1] === 'number')) {
    var x = arguments[0];
    var min = arguments[1];
    var max = arguments[2];
    if (x < min) { return min }
    if (x > max) { return max }
    return x
  } else if (Number.isInteger(arguments[2]) && (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1]))) {
    var x$1 = arguments[0];
    var min$1 = arguments[1];
    var max$1 = arguments[2];
    if (x$1 < min$1) { return min$1 }
    if (x$1 > max$1) { return max$1 }
    return x$1
  }
};
MathUtil.wrap = function wrap (index, max) {
  if (index < 0) {
    return max - -index % max
  }
  return index % max
};
MathUtil.max = function max () {
  if (arguments.length === 3) {
    var v1 = arguments[0];
    var v2 = arguments[1];
    var v3 = arguments[2];
    var max = v1;
    if (v2 > max) { max = v2; }
    if (v3 > max) { max = v3; }
    return max
  } else if (arguments.length === 4) {
    var v1$1 = arguments[0];
    var v2$1 = arguments[1];
    var v3$1 = arguments[2];
    var v4 = arguments[3];
    var max$1 = v1$1;
    if (v2$1 > max$1) { max$1 = v2$1; }
    if (v3$1 > max$1) { max$1 = v3$1; }
    if (v4 > max$1) { max$1 = v4; }
    return max$1
  }
};
MathUtil.average = function average (x1, x2) {
  return (x1 + x2) / 2.0
};
staticAccessors$5.LOG_10.get = function () { return Math.log(10) };

Object.defineProperties( MathUtil, staticAccessors$5 );

var StringBuffer = function StringBuffer (str) {
  this.str = str;
};
StringBuffer.prototype.append = function append (e) {
  this.str += e;
};

StringBuffer.prototype.setCharAt = function setCharAt (i, c) {
  this.str = this.str.substr(0, i) + c + this.str.substr(i + 1);
};

StringBuffer.prototype.toString = function toString (e) {
  return this.str
};

var Integer = function Integer (value) {
  this.value = value;
};
Integer.prototype.intValue = function intValue () {
  return this.value
};
Integer.prototype.compareTo = function compareTo (o) {
  if (this.value < o) { return -1 }
  if (this.value > o) { return 1 }
  return 0
};
Integer.isNaN = function isNaN (n) { return Number.isNaN(n) };

var Character = function Character () {};

Character.isWhitespace = function isWhitespace (c) { return ((c <= 32 && c >= 0) || c === 127) };
Character.toUpperCase = function toUpperCase (c) { return c.toUpperCase() };

var DD = function DD () {
  this._hi = 0.0;
  this._lo = 0.0;
  if (arguments.length === 0) {
    this.init(0.0);
  } else if (arguments.length === 1) {
    if (typeof arguments[0] === 'number') {
      var x = arguments[0];
      this.init(x);
    } else if (arguments[0] instanceof DD) {
      var dd = arguments[0];
      this.init(dd);
    } else if (typeof arguments[0] === 'string') {
      var str = arguments[0];
      DD.call(this, DD.parse(str));
    }
  } else if (arguments.length === 2) {
    var hi = arguments[0];
    var lo = arguments[1];
    this.init(hi, lo);
  }
};

var staticAccessors$7 = { PI: { configurable: true },TWO_PI: { configurable: true },PI_2: { configurable: true },E: { configurable: true },NaN: { configurable: true },EPS: { configurable: true },SPLIT: { configurable: true },MAX_PRINT_DIGITS: { configurable: true },TEN: { configurable: true },ONE: { configurable: true },SCI_NOT_EXPONENT_CHAR: { configurable: true },SCI_NOT_ZERO: { configurable: true } };
DD.prototype.le = function le (y) {
  return (this._hi < y._hi || this._hi === y._hi) && this._lo <= y._lo
};
DD.prototype.extractSignificantDigits = function extractSignificantDigits (insertDecimalPoint, magnitude) {
  var y = this.abs();
  var mag = DD.magnitude(y._hi);
  var scale = DD.TEN.pow(mag);
  y = y.divide(scale);
  if (y.gt(DD.TEN)) {
    y = y.divide(DD.TEN);
    mag += 1;
  } else if (y.lt(DD.ONE)) {
    y = y.multiply(DD.TEN);
    mag -= 1;
  }
  var decimalPointPos = mag + 1;
  var buf = new StringBuffer();
  var numDigits = DD.MAX_PRINT_DIGITS - 1;
  for (var i = 0; i <= numDigits; i++) {
    if (insertDecimalPoint && i === decimalPointPos) {
      buf.append('.');
    }
    var digit = Math.trunc(y._hi);
    if (digit < 0) {
      break
    }
    var rebiasBy10 = false;
    var digitChar = 0;
    if (digit > 9) {
      rebiasBy10 = true;
      digitChar = '9';
    } else {
      digitChar = '0' + digit;
    }
    buf.append(digitChar);
    y = y.subtract(DD.valueOf(digit)).multiply(DD.TEN);
    if (rebiasBy10) { y.selfAdd(DD.TEN); }
    var continueExtractingDigits = true;
    var remMag = DD.magnitude(y._hi);
    if (remMag < 0 && Math.abs(remMag) >= numDigits - i) { continueExtractingDigits = false; }
    if (!continueExtractingDigits) { break }
  }
  magnitude[0] = mag;
  return buf.toString()
};
DD.prototype.sqr = function sqr () {
  return this.multiply(this)
};
DD.prototype.doubleValue = function doubleValue () {
  return this._hi + this._lo
};
DD.prototype.subtract = function subtract () {
  if (arguments[0] instanceof DD) {
    var y = arguments[0];
    return this.add(y.negate())
  } else if (typeof arguments[0] === 'number') {
    var y$1 = arguments[0];
    return this.add(-y$1)
  }
};
DD.prototype.equals = function equals () {
  if (arguments.length === 1) {
    var y = arguments[0];
    return this._hi === y._hi && this._lo === y._lo
  }
};
DD.prototype.isZero = function isZero () {
  return this._hi === 0.0 && this._lo === 0.0
};
DD.prototype.selfSubtract = function selfSubtract () {
  if (arguments[0] instanceof DD) {
    var y = arguments[0];
    if (this.isNaN()) { return this }
    return this.selfAdd(-y._hi, -y._lo)
  } else if (typeof arguments[0] === 'number') {
    var y$1 = arguments[0];
    if (this.isNaN()) { return this }
    return this.selfAdd(-y$1, 0.0)
  }
};
DD.prototype.getSpecialNumberString = function getSpecialNumberString () {
  if (this.isZero()) { return '0.0' }
  if (this.isNaN()) { return 'NaN ' }
  return null
};
DD.prototype.min = function min (x) {
  if (this.le(x)) {
    return this
  } else {
    return x
  }
};
DD.prototype.selfDivide = function selfDivide () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof DD) {
      var y = arguments[0];
      return this.selfDivide(y._hi, y._lo)
    } else if (typeof arguments[0] === 'number') {
      var y$1 = arguments[0];
      return this.selfDivide(y$1, 0.0)
    }
  } else if (arguments.length === 2) {
    var yhi = arguments[0];
    var ylo = arguments[1];
    var hc = null;
    var tc = null;
    var hy = null;
    var ty = null;
    var C = null;
    var c = null;
    var U = null;
    var u = null;
    C = this._hi / yhi;
    c = DD.SPLIT * C;
    hc = c - C;
    u = DD.SPLIT * yhi;
    hc = c - hc;
    tc = C - hc;
    hy = u - yhi;
    U = C * yhi;
    hy = u - hy;
    ty = yhi - hy;
    u = hc * hy - U + hc * ty + tc * hy + tc * ty;
    c = (this._hi - U - u + this._lo - C * ylo) / yhi;
    u = C + c;
    this._hi = u;
    this._lo = C - u + c;
    return this
  }
};
DD.prototype.dump = function dump () {
  return 'DD<' + this._hi + ', ' + this._lo + '>'
};
DD.prototype.divide = function divide () {
  if (arguments[0] instanceof DD) {
    var y = arguments[0];
    var hc = null;
    var tc = null;
    var hy = null;
    var ty = null;
    var C = null;
    var c = null;
    var U = null;
    var u = null;
    C = this._hi / y._hi;
    c = DD.SPLIT * C;
    hc = c - C;
    u = DD.SPLIT * y._hi;
    hc = c - hc;
    tc = C - hc;
    hy = u - y._hi;
    U = C * y._hi;
    hy = u - hy;
    ty = y._hi - hy;
    u = hc * hy - U + hc * ty + tc * hy + tc * ty;
    c = (this._hi - U - u + this._lo - C * y._lo) / y._hi;
    u = C + c;
    var zhi = u;
    var zlo = C - u + c;
    return new DD(zhi, zlo)
  } else if (typeof arguments[0] === 'number') {
    var y$1 = arguments[0];
    if (Double.isNaN(y$1)) { return DD.createNaN() }
    return DD.copy(this).selfDivide(y$1, 0.0)
  }
};
DD.prototype.ge = function ge (y) {
  return (this._hi > y._hi || this._hi === y._hi) && this._lo >= y._lo
};
DD.prototype.pow = function pow (exp) {
  if (exp === 0.0) { return DD.valueOf(1.0) }
  var r = new DD(this);
  var s = DD.valueOf(1.0);
  var n = Math.abs(exp);
  if (n > 1) {
    while (n > 0) {
      if (n % 2 === 1) {
        s.selfMultiply(r);
      }
      n /= 2;
      if (n > 0) { r = r.sqr(); }
    }
  } else {
    s = r;
  }
  if (exp < 0) { return s.reciprocal() }
  return s
};
DD.prototype.ceil = function ceil () {
  if (this.isNaN()) { return DD.NaN }
  var fhi = Math.ceil(this._hi);
  var flo = 0.0;
  if (fhi === this._hi) {
    flo = Math.ceil(this._lo);
  }
  return new DD(fhi, flo)
};
DD.prototype.compareTo = function compareTo (o) {
  var other = o;
  if (this._hi < other._hi) { return -1 }
  if (this._hi > other._hi) { return 1 }
  if (this._lo < other._lo) { return -1 }
  if (this._lo > other._lo) { return 1 }
  return 0
};
DD.prototype.rint = function rint () {
  if (this.isNaN()) { return this }
  var plus5 = this.add(0.5);
  return plus5.floor()
};
DD.prototype.setValue = function setValue () {
  if (arguments[0] instanceof DD) {
    var value = arguments[0];
    this.init(value);
    return this
  } else if (typeof arguments[0] === 'number') {
    var value$1 = arguments[0];
    this.init(value$1);
    return this
  }
};
DD.prototype.max = function max (x) {
  if (this.ge(x)) {
    return this
  } else {
    return x
  }
};
DD.prototype.sqrt = function sqrt () {
  if (this.isZero()) { return DD.valueOf(0.0) }
  if (this.isNegative()) {
    return DD.NaN
  }
  var x = 1.0 / Math.sqrt(this._hi);
  var ax = this._hi * x;
  var axdd = DD.valueOf(ax);
  var diffSq = this.subtract(axdd.sqr());
  var d2 = diffSq._hi * (x * 0.5);
  return axdd.add(d2)
};
DD.prototype.selfAdd = function selfAdd () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof DD) {
      var y = arguments[0];
      return this.selfAdd(y._hi, y._lo)
    } else if (typeof arguments[0] === 'number') {
      var y$1 = arguments[0];
      var H = null;
      var h = null;
      var S = null;
      var s = null;
      var e = null;
      var f = null;
      S = this._hi + y$1;
      e = S - this._hi;
      s = S - e;
      s = y$1 - e + (this._hi - s);
      f = s + this._lo;
      H = S + f;
      h = f + (S - H);
      this._hi = H + h;
      this._lo = h + (H - this._hi);
      return this
    }
  } else if (arguments.length === 2) {
    var yhi = arguments[0];
    var ylo = arguments[1];
    var H$1 = null;
    var h$1 = null;
    var T = null;
    var t = null;
    var S$1 = null;
    var s$1 = null;
    var e$1 = null;
    var f$1 = null;
    S$1 = this._hi + yhi;
    T = this._lo + ylo;
    e$1 = S$1 - this._hi;
    f$1 = T - this._lo;
    s$1 = S$1 - e$1;
    t = T - f$1;
    s$1 = yhi - e$1 + (this._hi - s$1);
    t = ylo - f$1 + (this._lo - t);
    e$1 = s$1 + T;
    H$1 = S$1 + e$1;
    h$1 = e$1 + (S$1 - H$1);
    e$1 = t + h$1;
    var zhi = H$1 + e$1;
    var zlo = e$1 + (H$1 - zhi);
    this._hi = zhi;
    this._lo = zlo;
    return this
  }
};
DD.prototype.selfMultiply = function selfMultiply () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof DD) {
      var y = arguments[0];
      return this.selfMultiply(y._hi, y._lo)
    } else if (typeof arguments[0] === 'number') {
      var y$1 = arguments[0];
      return this.selfMultiply(y$1, 0.0)
    }
  } else if (arguments.length === 2) {
    var yhi = arguments[0];
    var ylo = arguments[1];
    var hx = null;
    var tx = null;
    var hy = null;
    var ty = null;
    var C = null;
    var c = null;
    C = DD.SPLIT * this._hi;
    hx = C - this._hi;
    c = DD.SPLIT * yhi;
    hx = C - hx;
    tx = this._hi - hx;
    hy = c - yhi;
    C = this._hi * yhi;
    hy = c - hy;
    ty = yhi - hy;
    c = hx * hy - C + hx * ty + tx * hy + tx * ty + (this._hi * ylo + this._lo * yhi);
    var zhi = C + c;
    hx = C - zhi;
    var zlo = c + hx;
    this._hi = zhi;
    this._lo = zlo;
    return this
  }
};
DD.prototype.selfSqr = function selfSqr () {
  return this.selfMultiply(this)
};
DD.prototype.floor = function floor () {
  if (this.isNaN()) { return DD.NaN }
  var fhi = Math.floor(this._hi);
  var flo = 0.0;
  if (fhi === this._hi) {
    flo = Math.floor(this._lo);
  }
  return new DD(fhi, flo)
};
DD.prototype.negate = function negate () {
  if (this.isNaN()) { return this }
  return new DD(-this._hi, -this._lo)
};
DD.prototype.clone = function clone () {
  // try {
  // return null
  // } catch (ex) {
  // if (ex instanceof CloneNotSupportedException) {
  //   return null
  // } else throw ex
  // } finally {}
};
DD.prototype.multiply = function multiply () {
  if (arguments[0] instanceof DD) {
    var y = arguments[0];
    if (y.isNaN()) { return DD.createNaN() }
    return DD.copy(this).selfMultiply(y)
  } else if (typeof arguments[0] === 'number') {
    var y$1 = arguments[0];
    if (Double.isNaN(y$1)) { return DD.createNaN() }
    return DD.copy(this).selfMultiply(y$1, 0.0)
  }
};
DD.prototype.isNaN = function isNaN () {
  return Double.isNaN(this._hi)
};
DD.prototype.intValue = function intValue () {
  return Math.trunc(this._hi)
};
DD.prototype.toString = function toString () {
  var mag = DD.magnitude(this._hi);
  if (mag >= -3 && mag <= 20) { return this.toStandardNotation() }
  return this.toSciNotation()
};
DD.prototype.toStandardNotation = function toStandardNotation () {
  var specialStr = this.getSpecialNumberString();
  if (specialStr !== null) { return specialStr }
  var magnitude = new Array(1).fill(null);
  var sigDigits = this.extractSignificantDigits(true, magnitude);
  var decimalPointPos = magnitude[0] + 1;
  var num = sigDigits;
  if (sigDigits.charAt(0) === '.') {
    num = '0' + sigDigits;
  } else if (decimalPointPos < 0) {
    num = '0.' + DD.stringOfChar('0', -decimalPointPos) + sigDigits;
  } else if (sigDigits.indexOf('.') === -1) {
    var numZeroes = decimalPointPos - sigDigits.length;
    var zeroes = DD.stringOfChar('0', numZeroes);
    num = sigDigits + zeroes + '.0';
  }
  if (this.isNegative()) { return '-' + num }
  return num
};
DD.prototype.reciprocal = function reciprocal () {
  var hc = null;
  var tc = null;
  var hy = null;
  var ty = null;
  var C = null;
  var c = null;
  var U = null;
  var u = null;
  C = 1.0 / this._hi;
  c = DD.SPLIT * C;
  hc = c - C;
  u = DD.SPLIT * this._hi;
  hc = c - hc;
  tc = C - hc;
  hy = u - this._hi;
  U = C * this._hi;
  hy = u - hy;
  ty = this._hi - hy;
  u = hc * hy - U + hc * ty + tc * hy + tc * ty;
  c = (1.0 - U - u - C * this._lo) / this._hi;
  var zhi = C + c;
  var zlo = C - zhi + c;
  return new DD(zhi, zlo)
};
DD.prototype.toSciNotation = function toSciNotation () {
  if (this.isZero()) { return DD.SCI_NOT_ZERO }
  var specialStr = this.getSpecialNumberString();
  if (specialStr !== null) { return specialStr }
  var magnitude = new Array(1).fill(null);
  var digits = this.extractSignificantDigits(false, magnitude);
  var expStr = DD.SCI_NOT_EXPONENT_CHAR + magnitude[0];
  if (digits.charAt(0) === '0') {
    throw new Error('Found leading zero: ' + digits)
  }
  var trailingDigits = '';
  if (digits.length > 1) { trailingDigits = digits.substring(1); }
  var digitsWithDecimal = digits.charAt(0) + '.' + trailingDigits;
  if (this.isNegative()) { return '-' + digitsWithDecimal + expStr }
  return digitsWithDecimal + expStr
};
DD.prototype.abs = function abs () {
  if (this.isNaN()) { return DD.NaN }
  if (this.isNegative()) { return this.negate() }
  return new DD(this)
};
DD.prototype.isPositive = function isPositive () {
  return (this._hi > 0.0 || this._hi === 0.0) && this._lo > 0.0
};
DD.prototype.lt = function lt (y) {
  return (this._hi < y._hi || this._hi === y._hi) && this._lo < y._lo
};
DD.prototype.add = function add () {
  if (arguments[0] instanceof DD) {
    var y = arguments[0];
    return DD.copy(this).selfAdd(y)
  } else if (typeof arguments[0] === 'number') {
    var y$1 = arguments[0];
    return DD.copy(this).selfAdd(y$1)
  }
};
DD.prototype.init = function init () {
  if (arguments.length === 1) {
    if (typeof arguments[0] === 'number') {
      var x = arguments[0];
      this._hi = x;
      this._lo = 0.0;
    } else if (arguments[0] instanceof DD) {
      var dd = arguments[0];
      this._hi = dd._hi;
      this._lo = dd._lo;
    }
  } else if (arguments.length === 2) {
    var hi = arguments[0];
    var lo = arguments[1];
    this._hi = hi;
    this._lo = lo;
  }
};
DD.prototype.gt = function gt (y) {
  return (this._hi > y._hi || this._hi === y._hi) && this._lo > y._lo
};
DD.prototype.isNegative = function isNegative () {
  return (this._hi < 0.0 || this._hi === 0.0) && this._lo < 0.0
};
DD.prototype.trunc = function trunc () {
  if (this.isNaN()) { return DD.NaN }
  if (this.isPositive()) { return this.floor(); } else { return this.ceil() }
};
DD.prototype.signum = function signum () {
  if (this._hi > 0) { return 1 }
  if (this._hi < 0) { return -1 }
  if (this._lo > 0) { return 1 }
  if (this._lo < 0) { return -1 }
  return 0
};
DD.prototype.interfaces_ = function interfaces_ () {
  return [Serializable, Comparable, Clonable]
};
DD.prototype.getClass = function getClass () {
  return DD
};
DD.sqr = function sqr (x) {
  return DD.valueOf(x).selfMultiply(x)
};
DD.valueOf = function valueOf () {
  if (typeof arguments[0] === 'string') {
    var str = arguments[0];
    return DD.parse(str)
  } else if (typeof arguments[0] === 'number') {
    var x = arguments[0];
    return new DD(x)
  }
};
DD.sqrt = function sqrt (x) {
  return DD.valueOf(x).sqrt()
};
DD.parse = function parse (str) {
  var i = 0;
  var strlen = str.length;
  while (Character.isWhitespace(str.charAt(i))) { i++; }
  var isNegative = false;
  if (i < strlen) {
    var signCh = str.charAt(i);
    if (signCh === '-' || signCh === '+') {
      i++;
      if (signCh === '-') { isNegative = true; }
    }
  }
  var val = new DD();
  var numDigits = 0;
  var numBeforeDec = 0;
  var exp = 0;
  while (true) {
    if (i >= strlen) { break }
    var ch = str.charAt(i);
    i++;
    if (Character.isDigit(ch)) {
      var d = ch - '0';
      val.selfMultiply(DD.TEN);
      val.selfAdd(d);
      numDigits++;
      continue
    }
    if (ch === '.') {
      numBeforeDec = numDigits;
      continue
    }
    if (ch === 'e' || ch === 'E') {
      var expStr = str.substring(i);
      try {
        exp = Integer.parseInt(expStr);
      } catch (ex) {
        if (ex instanceof Error) {
          throw new Error('Invalid exponent ' + expStr + ' in string ' + str)
        } else { throw ex }
      } finally {}
      break
    }
    throw new Error("Unexpected character '" + ch + "' at position " + i + ' in string ' + str)
  }
  var val2 = val;
  var numDecPlaces = numDigits - numBeforeDec - exp;
  if (numDecPlaces === 0) {
    val2 = val;
  } else if (numDecPlaces > 0) {
    var scale = DD.TEN.pow(numDecPlaces);
    val2 = val.divide(scale);
  } else if (numDecPlaces < 0) {
    var scale$1 = DD.TEN.pow(-numDecPlaces);
    val2 = val.multiply(scale$1);
  }
  if (isNegative) {
    return val2.negate()
  }
  return val2
};
DD.createNaN = function createNaN () {
  return new DD(Double.NaN, Double.NaN)
};
DD.copy = function copy (dd) {
  return new DD(dd)
};
DD.magnitude = function magnitude (x) {
  var xAbs = Math.abs(x);
  var xLog10 = Math.log(xAbs) / Math.log(10);
  var xMag = Math.trunc(Math.floor(xLog10));
  var xApprox = Math.pow(10, xMag);
  if (xApprox * 10 <= xAbs) { xMag += 1; }
  return xMag
};
DD.stringOfChar = function stringOfChar (ch, len) {
  var buf = new StringBuffer();
  for (var i = 0; i < len; i++) {
    buf.append(ch);
  }
  return buf.toString()
};
staticAccessors$7.PI.get = function () { return new DD(3.141592653589793116e+00, 1.224646799147353207e-16) };
staticAccessors$7.TWO_PI.get = function () { return new DD(6.283185307179586232e+00, 2.449293598294706414e-16) };
staticAccessors$7.PI_2.get = function () { return new DD(1.570796326794896558e+00, 6.123233995736766036e-17) };
staticAccessors$7.E.get = function () { return new DD(2.718281828459045091e+00, 1.445646891729250158e-16) };
staticAccessors$7.NaN.get = function () { return new DD(Double.NaN, Double.NaN) };
staticAccessors$7.EPS.get = function () { return 1.23259516440783e-32 };
staticAccessors$7.SPLIT.get = function () { return 134217729.0 };
staticAccessors$7.MAX_PRINT_DIGITS.get = function () { return 32 };
staticAccessors$7.TEN.get = function () { return DD.valueOf(10.0) };
staticAccessors$7.ONE.get = function () { return DD.valueOf(1.0) };
staticAccessors$7.SCI_NOT_EXPONENT_CHAR.get = function () { return 'E' };
staticAccessors$7.SCI_NOT_ZERO.get = function () { return '0.0E0' };

Object.defineProperties( DD, staticAccessors$7 );

var CGAlgorithmsDD = function CGAlgorithmsDD () {};

var staticAccessors$6 = { DP_SAFE_EPSILON: { configurable: true } };

CGAlgorithmsDD.prototype.interfaces_ = function interfaces_ () {
  return []
};
CGAlgorithmsDD.prototype.getClass = function getClass () {
  return CGAlgorithmsDD
};
CGAlgorithmsDD.orientationIndex = function orientationIndex (p1, p2, q) {
  var index = CGAlgorithmsDD.orientationIndexFilter(p1, p2, q);
  if (index <= 1) { return index }
  var dx1 = DD.valueOf(p2.x).selfAdd(-p1.x);
  var dy1 = DD.valueOf(p2.y).selfAdd(-p1.y);
  var dx2 = DD.valueOf(q.x).selfAdd(-p2.x);
  var dy2 = DD.valueOf(q.y).selfAdd(-p2.y);
  return dx1.selfMultiply(dy2).selfSubtract(dy1.selfMultiply(dx2)).signum()
};
CGAlgorithmsDD.signOfDet2x2 = function signOfDet2x2 (x1, y1, x2, y2) {
  var det = x1.multiply(y2).selfSubtract(y1.multiply(x2));
  return det.signum()
};
CGAlgorithmsDD.intersection = function intersection (p1, p2, q1, q2) {
  var denom1 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p2.x).selfSubtract(p1.x));
  var denom2 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p2.y).selfSubtract(p1.y));
  var denom = denom1.subtract(denom2);
  var numx1 = DD.valueOf(q2.x).selfSubtract(q1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y));
  var numx2 = DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x));
  var numx = numx1.subtract(numx2);
  var fracP = numx.selfDivide(denom).doubleValue();
  var x = DD.valueOf(p1.x).selfAdd(DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(fracP)).doubleValue();
  var numy1 = DD.valueOf(p2.x).selfSubtract(p1.x).selfMultiply(DD.valueOf(p1.y).selfSubtract(q1.y));
  var numy2 = DD.valueOf(p2.y).selfSubtract(p1.y).selfMultiply(DD.valueOf(p1.x).selfSubtract(q1.x));
  var numy = numy1.subtract(numy2);
  var fracQ = numy.selfDivide(denom).doubleValue();
  var y = DD.valueOf(q1.y).selfAdd(DD.valueOf(q2.y).selfSubtract(q1.y).selfMultiply(fracQ)).doubleValue();
  return new Coordinate(x, y)
};
CGAlgorithmsDD.orientationIndexFilter = function orientationIndexFilter (pa, pb, pc) {
  var detsum = null;
  var detleft = (pa.x - pc.x) * (pb.y - pc.y);
  var detright = (pa.y - pc.y) * (pb.x - pc.x);
  var det = detleft - detright;
  if (detleft > 0.0) {
    if (detright <= 0.0) {
      return CGAlgorithmsDD.signum(det)
    } else {
      detsum = detleft + detright;
    }
  } else if (detleft < 0.0) {
    if (detright >= 0.0) {
      return CGAlgorithmsDD.signum(det)
    } else {
      detsum = -detleft - detright;
    }
  } else {
    return CGAlgorithmsDD.signum(det)
  }
  var errbound = CGAlgorithmsDD.DP_SAFE_EPSILON * detsum;
  if (det >= errbound || -det >= errbound) {
    return CGAlgorithmsDD.signum(det)
  }
  return 2
};
CGAlgorithmsDD.signum = function signum (x) {
  if (x > 0) { return 1 }
  if (x < 0) { return -1 }
  return 0
};
staticAccessors$6.DP_SAFE_EPSILON.get = function () { return 1e-15 };

Object.defineProperties( CGAlgorithmsDD, staticAccessors$6 );

var CoordinateSequence = function CoordinateSequence () {};

var staticAccessors$8 = { X: { configurable: true },Y: { configurable: true },Z: { configurable: true },M: { configurable: true } };

staticAccessors$8.X.get = function () { return 0 };
staticAccessors$8.Y.get = function () { return 1 };
staticAccessors$8.Z.get = function () { return 2 };
staticAccessors$8.M.get = function () { return 3 };
CoordinateSequence.prototype.setOrdinate = function setOrdinate (index, ordinateIndex, value) {};
CoordinateSequence.prototype.size = function size () {};
CoordinateSequence.prototype.getOrdinate = function getOrdinate (index, ordinateIndex) {};
CoordinateSequence.prototype.getCoordinate = function getCoordinate () {};
CoordinateSequence.prototype.getCoordinateCopy = function getCoordinateCopy (i) {};
CoordinateSequence.prototype.getDimension = function getDimension () {};
CoordinateSequence.prototype.getX = function getX (index) {};
CoordinateSequence.prototype.clone = function clone () {};
CoordinateSequence.prototype.expandEnvelope = function expandEnvelope (env) {};
CoordinateSequence.prototype.copy = function copy () {};
CoordinateSequence.prototype.getY = function getY (index) {};
CoordinateSequence.prototype.toCoordinateArray = function toCoordinateArray () {};
CoordinateSequence.prototype.interfaces_ = function interfaces_ () {
  return [Clonable]
};
CoordinateSequence.prototype.getClass = function getClass () {
  return CoordinateSequence
};

Object.defineProperties( CoordinateSequence, staticAccessors$8 );

var Exception = function Exception () {};

var NotRepresentableException = (function (Exception$$1) {
  function NotRepresentableException () {
    Exception$$1.call(this, 'Projective point not representable on the Cartesian plane.');
  }

  if ( Exception$$1 ) NotRepresentableException.__proto__ = Exception$$1;
  NotRepresentableException.prototype = Object.create( Exception$$1 && Exception$$1.prototype );
  NotRepresentableException.prototype.constructor = NotRepresentableException;
  NotRepresentableException.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  NotRepresentableException.prototype.getClass = function getClass () {
    return NotRepresentableException
  };

  return NotRepresentableException;
}(Exception));

var System = function System () {};

System.arraycopy = function arraycopy (src, srcPos, dest, destPos, len) {
  var c = 0;
  for (var i = srcPos; i < srcPos + len; i++) {
    dest[destPos + c] = src[i];
    c++;
  }
};

System.getProperty = function getProperty (name) {
  return {
    'line.separator': '\n'
  }[name]
};

var HCoordinate = function HCoordinate () {
  this.x = null;
  this.y = null;
  this.w = null;
  if (arguments.length === 0) {
    this.x = 0.0;
    this.y = 0.0;
    this.w = 1.0;
  } else if (arguments.length === 1) {
    var p = arguments[0];
    this.x = p.x;
    this.y = p.y;
    this.w = 1.0;
  } else if (arguments.length === 2) {
    if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
      var _x = arguments[0];
      var _y = arguments[1];
      this.x = _x;
      this.y = _y;
      this.w = 1.0;
    } else if (arguments[0] instanceof HCoordinate && arguments[1] instanceof HCoordinate) {
      var p1 = arguments[0];
      var p2 = arguments[1];
      this.x = p1.y * p2.w - p2.y * p1.w;
      this.y = p2.x * p1.w - p1.x * p2.w;
      this.w = p1.x * p2.y - p2.x * p1.y;
    } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
      var p1$1 = arguments[0];
      var p2$1 = arguments[1];
      this.x = p1$1.y - p2$1.y;
      this.y = p2$1.x - p1$1.x;
      this.w = p1$1.x * p2$1.y - p2$1.x * p1$1.y;
    }
  } else if (arguments.length === 3) {
    var _x$1 = arguments[0];
    var _y$1 = arguments[1];
    var _w = arguments[2];
    this.x = _x$1;
    this.y = _y$1;
    this.w = _w;
  } else if (arguments.length === 4) {
    var p1$2 = arguments[0];
    var p2$2 = arguments[1];
    var q1 = arguments[2];
    var q2 = arguments[3];
    var px = p1$2.y - p2$2.y;
    var py = p2$2.x - p1$2.x;
    var pw = p1$2.x * p2$2.y - p2$2.x * p1$2.y;
    var qx = q1.y - q2.y;
    var qy = q2.x - q1.x;
    var qw = q1.x * q2.y - q2.x * q1.y;
    this.x = py * qw - qy * pw;
    this.y = qx * pw - px * qw;
    this.w = px * qy - qx * py;
  }
};
HCoordinate.prototype.getY = function getY () {
  var a = this.y / this.w;
  if (Double.isNaN(a) || Double.isInfinite(a)) {
    throw new NotRepresentableException()
  }
  return a
};
HCoordinate.prototype.getX = function getX () {
  var a = this.x / this.w;
  if (Double.isNaN(a) || Double.isInfinite(a)) {
    throw new NotRepresentableException()
  }
  return a
};
HCoordinate.prototype.getCoordinate = function getCoordinate () {
  var p = new Coordinate();
  p.x = this.getX();
  p.y = this.getY();
  return p
};
HCoordinate.prototype.interfaces_ = function interfaces_ () {
  return []
};
HCoordinate.prototype.getClass = function getClass () {
  return HCoordinate
};
HCoordinate.intersection = function intersection (p1, p2, q1, q2) {
  var px = p1.y - p2.y;
  var py = p2.x - p1.x;
  var pw = p1.x * p2.y - p2.x * p1.y;
  var qx = q1.y - q2.y;
  var qy = q2.x - q1.x;
  var qw = q1.x * q2.y - q2.x * q1.y;
  var x = py * qw - qy * pw;
  var y = qx * pw - px * qw;
  var w = px * qy - qx * py;
  var xInt = x / w;
  var yInt = y / w;
  if (Double.isNaN(xInt) || (Double.isInfinite(xInt) || Double.isNaN(yInt)) || Double.isInfinite(yInt)) {
    throw new NotRepresentableException()
  }
  return new Coordinate(xInt, yInt)
};

var Envelope = function Envelope () {
  this._minx = null;
  this._maxx = null;
  this._miny = null;
  this._maxy = null;
  if (arguments.length === 0) {
    this.init();
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      this.init(p.x, p.x, p.y, p.y);
    } else if (arguments[0] instanceof Envelope) {
      var env = arguments[0];
      this.init(env);
    }
  } else if (arguments.length === 2) {
    var p1 = arguments[0];
    var p2 = arguments[1];
    this.init(p1.x, p2.x, p1.y, p2.y);
  } else if (arguments.length === 4) {
    var x1 = arguments[0];
    var x2 = arguments[1];
    var y1 = arguments[2];
    var y2 = arguments[3];
    this.init(x1, x2, y1, y2);
  }
};

var staticAccessors$9 = { serialVersionUID: { configurable: true } };
Envelope.prototype.getArea = function getArea () {
  return this.getWidth() * this.getHeight()
};
Envelope.prototype.equals = function equals (other) {
  if (!(other instanceof Envelope)) {
    return false
  }
  var otherEnvelope = other;
  if (this.isNull()) {
    return otherEnvelope.isNull()
  }
  return this._maxx === otherEnvelope.getMaxX() && this._maxy === otherEnvelope.getMaxY() && this._minx === otherEnvelope.getMinX() && this._miny === otherEnvelope.getMinY()
};
Envelope.prototype.intersection = function intersection (env) {
  if (this.isNull() || env.isNull() || !this.intersects(env)) { return new Envelope() }
  var intMinX = this._minx > env._minx ? this._minx : env._minx;
  var intMinY = this._miny > env._miny ? this._miny : env._miny;
  var intMaxX = this._maxx < env._maxx ? this._maxx : env._maxx;
  var intMaxY = this._maxy < env._maxy ? this._maxy : env._maxy;
  return new Envelope(intMinX, intMaxX, intMinY, intMaxY)
};
Envelope.prototype.isNull = function isNull () {
  return this._maxx < this._minx
};
Envelope.prototype.getMaxX = function getMaxX () {
  return this._maxx
};
Envelope.prototype.covers = function covers () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      return this.covers(p.x, p.y)
    } else if (arguments[0] instanceof Envelope) {
      var other = arguments[0];
      if (this.isNull() || other.isNull()) {
        return false
      }
      return other.getMinX() >= this._minx && other.getMaxX() <= this._maxx && other.getMinY() >= this._miny && other.getMaxY() <= this._maxy
    }
  } else if (arguments.length === 2) {
    var x = arguments[0];
    var y = arguments[1];
    if (this.isNull()) { return false }
    return x >= this._minx && x <= this._maxx && y >= this._miny && y <= this._maxy
  }
};
Envelope.prototype.intersects = function intersects () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof Envelope) {
      var other = arguments[0];
      if (this.isNull() || other.isNull()) {
        return false
      }
      return !(other._minx > this._maxx || other._maxx < this._minx || other._miny > this._maxy || other._maxy < this._miny)
    } else if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      return this.intersects(p.x, p.y)
    }
  } else if (arguments.length === 2) {
    var x = arguments[0];
    var y = arguments[1];
    if (this.isNull()) { return false }
    return !(x > this._maxx || x < this._minx || y > this._maxy || y < this._miny)
  }
};
Envelope.prototype.getMinY = function getMinY () {
  return this._miny
};
Envelope.prototype.getMinX = function getMinX () {
  return this._minx
};
Envelope.prototype.expandToInclude = function expandToInclude () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      this.expandToInclude(p.x, p.y);
    } else if (arguments[0] instanceof Envelope) {
      var other = arguments[0];
      if (other.isNull()) {
        return null
      }
      if (this.isNull()) {
        this._minx = other.getMinX();
        this._maxx = other.getMaxX();
        this._miny = other.getMinY();
        this._maxy = other.getMaxY();
      } else {
        if (other._minx < this._minx) {
          this._minx = other._minx;
        }
        if (other._maxx > this._maxx) {
          this._maxx = other._maxx;
        }
        if (other._miny < this._miny) {
          this._miny = other._miny;
        }
        if (other._maxy > this._maxy) {
          this._maxy = other._maxy;
        }
      }
    }
  } else if (arguments.length === 2) {
    var x = arguments[0];
    var y = arguments[1];
    if (this.isNull()) {
      this._minx = x;
      this._maxx = x;
      this._miny = y;
      this._maxy = y;
    } else {
      if (x < this._minx) {
        this._minx = x;
      }
      if (x > this._maxx) {
        this._maxx = x;
      }
      if (y < this._miny) {
        this._miny = y;
      }
      if (y > this._maxy) {
        this._maxy = y;
      }
    }
  }
};
Envelope.prototype.minExtent = function minExtent () {
  if (this.isNull()) { return 0.0 }
  var w = this.getWidth();
  var h = this.getHeight();
  if (w < h) { return w }
  return h
};
Envelope.prototype.getWidth = function getWidth () {
  if (this.isNull()) {
    return 0
  }
  return this._maxx - this._minx
};
Envelope.prototype.compareTo = function compareTo (o) {
  var env = o;
  if (this.isNull()) {
    if (env.isNull()) { return 0 }
    return -1
  } else {
    if (env.isNull()) { return 1 }
  }
  if (this._minx < env._minx) { return -1 }
  if (this._minx > env._minx) { return 1 }
  if (this._miny < env._miny) { return -1 }
  if (this._miny > env._miny) { return 1 }
  if (this._maxx < env._maxx) { return -1 }
  if (this._maxx > env._maxx) { return 1 }
  if (this._maxy < env._maxy) { return -1 }
  if (this._maxy > env._maxy) { return 1 }
  return 0
};
Envelope.prototype.translate = function translate (transX, transY) {
  if (this.isNull()) {
    return null
  }
  this.init(this.getMinX() + transX, this.getMaxX() + transX, this.getMinY() + transY, this.getMaxY() + transY);
};
Envelope.prototype.toString = function toString () {
  return 'Env[' + this._minx + ' : ' + this._maxx + ', ' + this._miny + ' : ' + this._maxy + ']'
};
Envelope.prototype.setToNull = function setToNull () {
  this._minx = 0;
  this._maxx = -1;
  this._miny = 0;
  this._maxy = -1;
};
Envelope.prototype.getHeight = function getHeight () {
  if (this.isNull()) {
    return 0
  }
  return this._maxy - this._miny
};
Envelope.prototype.maxExtent = function maxExtent () {
  if (this.isNull()) { return 0.0 }
  var w = this.getWidth();
  var h = this.getHeight();
  if (w > h) { return w }
  return h
};
Envelope.prototype.expandBy = function expandBy () {
  if (arguments.length === 1) {
    var distance = arguments[0];
    this.expandBy(distance, distance);
  } else if (arguments.length === 2) {
    var deltaX = arguments[0];
    var deltaY = arguments[1];
    if (this.isNull()) { return null }
    this._minx -= deltaX;
    this._maxx += deltaX;
    this._miny -= deltaY;
    this._maxy += deltaY;
    if (this._minx > this._maxx || this._miny > this._maxy) { this.setToNull(); }
  }
};
Envelope.prototype.contains = function contains () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof Envelope) {
      var other = arguments[0];
      return this.covers(other)
    } else if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      return this.covers(p)
    }
  } else if (arguments.length === 2) {
    var x = arguments[0];
    var y = arguments[1];
    return this.covers(x, y)
  }
};
Envelope.prototype.centre = function centre () {
  if (this.isNull()) { return null }
  return new Coordinate((this.getMinX() + this.getMaxX()) / 2.0, (this.getMinY() + this.getMaxY()) / 2.0)
};
Envelope.prototype.init = function init () {
  if (arguments.length === 0) {
    this.setToNull();
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Coordinate) {
      var p = arguments[0];
      this.init(p.x, p.x, p.y, p.y);
    } else if (arguments[0] instanceof Envelope) {
      var env = arguments[0];
      this._minx = env._minx;
      this._maxx = env._maxx;
      this._miny = env._miny;
      this._maxy = env._maxy;
    }
  } else if (arguments.length === 2) {
    var p1 = arguments[0];
    var p2 = arguments[1];
    this.init(p1.x, p2.x, p1.y, p2.y);
  } else if (arguments.length === 4) {
    var x1 = arguments[0];
    var x2 = arguments[1];
    var y1 = arguments[2];
    var y2 = arguments[3];
    if (x1 < x2) {
      this._minx = x1;
      this._maxx = x2;
    } else {
      this._minx = x2;
      this._maxx = x1;
    }
    if (y1 < y2) {
      this._miny = y1;
      this._maxy = y2;
    } else {
      this._miny = y2;
      this._maxy = y1;
    }
  }
};
Envelope.prototype.getMaxY = function getMaxY () {
  return this._maxy
};
Envelope.prototype.distance = function distance (env) {
  if (this.intersects(env)) { return 0 }
  var dx = 0.0;
  if (this._maxx < env._minx) { dx = env._minx - this._maxx; } else if (this._minx > env._maxx) { dx = this._minx - env._maxx; }
  var dy = 0.0;
  if (this._maxy < env._miny) { dy = env._miny - this._maxy; } else if (this._miny > env._maxy) { dy = this._miny - env._maxy; }
  if (dx === 0.0) { return dy }
  if (dy === 0.0) { return dx }
  return Math.sqrt(dx * dx + dy * dy)
};
Envelope.prototype.hashCode = function hashCode () {
  var result = 17;
  result = 37 * result + Coordinate.hashCode(this._minx);
  result = 37 * result + Coordinate.hashCode(this._maxx);
  result = 37 * result + Coordinate.hashCode(this._miny);
  result = 37 * result + Coordinate.hashCode(this._maxy);
  return result
};
Envelope.prototype.interfaces_ = function interfaces_ () {
  return [Comparable, Serializable]
};
Envelope.prototype.getClass = function getClass () {
  return Envelope
};
Envelope.intersects = function intersects () {
  if (arguments.length === 3) {
    var p1 = arguments[0];
    var p2 = arguments[1];
    var q = arguments[2];
    if (q.x >= (p1.x < p2.x ? p1.x : p2.x) && q.x <= (p1.x > p2.x ? p1.x : p2.x) && (q.y >= (p1.y < p2.y ? p1.y : p2.y) && q.y <= (p1.y > p2.y ? p1.y : p2.y))) {
      return true
    }
    return false
  } else if (arguments.length === 4) {
    var p1$1 = arguments[0];
    var p2$1 = arguments[1];
    var q1 = arguments[2];
    var q2 = arguments[3];
    var minq = Math.min(q1.x, q2.x);
    var maxq = Math.max(q1.x, q2.x);
    var minp = Math.min(p1$1.x, p2$1.x);
    var maxp = Math.max(p1$1.x, p2$1.x);
    if (minp > maxq) { return false }
    if (maxp < minq) { return false }
    minq = Math.min(q1.y, q2.y);
    maxq = Math.max(q1.y, q2.y);
    minp = Math.min(p1$1.y, p2$1.y);
    maxp = Math.max(p1$1.y, p2$1.y);
    if (minp > maxq) { return false }
    if (maxp < minq) { return false }
    return true
  }
};
staticAccessors$9.serialVersionUID.get = function () { return 5873921885273102420 };

Object.defineProperties( Envelope, staticAccessors$9 );

var regExes = {
  'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
  'emptyTypeStr': /^\s*(\w+)\s*EMPTY\s*$/,
  'spaces': /\s+/,
  'parenComma': /\)\s*,\s*\(/,
  'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/, // can't use {2} here
  'trimParens': /^\s*\(?(.*?)\)?\s*$/
};

/**
 * Class for reading and writing Well-Known Text.
 *
 * NOTE: Adapted from OpenLayers 2.11 implementation.
 */

/** Create a new parser for WKT
 *
 * @param {GeometryFactory} geometryFactory
 * @return An instance of WKTParser.
 * @constructor
 * @private
 */
var WKTParser = function WKTParser (geometryFactory) {
  this.geometryFactory = geometryFactory || new GeometryFactory();
};
/**
 * Deserialize a WKT string and return a geometry. Supports WKT for POINT,
 * MULTIPOINT, LINESTRING, LINEARRING, MULTILINESTRING, POLYGON, MULTIPOLYGON,
 * and GEOMETRYCOLLECTION.
 *
 * @param {String} wkt A WKT string.
 * @return {Geometry} A geometry instance.
 * @private
 */
WKTParser.prototype.read = function read (wkt) {
  var geometry, type, str;
  wkt = wkt.replace(/[\n\r]/g, ' ');
  var matches = regExes.typeStr.exec(wkt);
  if (wkt.search('EMPTY') !== -1) {
    matches = regExes.emptyTypeStr.exec(wkt);
    matches[2] = undefined;
  }
  if (matches) {
    type = matches[1].toLowerCase();
    str = matches[2];
    if (parse$1[type]) {
      geometry = parse$1[type].apply(this, [str]);
    }
  }

  if (geometry === undefined) { throw new Error('Could not parse WKT ' + wkt) }

  return geometry
};

/**
 * Serialize a geometry into a WKT string.
 *
 * @param {Geometry} geometry A feature or array of features.
 * @return {String} The WKT string representation of the input geometries.
 * @private
 */
WKTParser.prototype.write = function write (geometry) {
  return this.extractGeometry(geometry)
};

/**
 * Entry point to construct the WKT for a single Geometry object.
 *
 * @param {Geometry} geometry
 * @return {String} A WKT string of representing the geometry.
 * @private
 */
WKTParser.prototype.extractGeometry = function extractGeometry (geometry) {
  var type = geometry.getGeometryType().toLowerCase();
  if (!extract$1[type]) {
    return null
  }
  var wktType = type.toUpperCase();
  var data;
  if (geometry.isEmpty()) {
    data = wktType + ' EMPTY';
  } else {
    data = wktType + '(' + extract$1[type].apply(this, [geometry]) + ')';
  }
  return data
};

/**
 * Object with properties corresponding to the geometry types. Property values
 * are functions that do the actual data extraction.
 * @private
 */
var extract$1 = {
  coordinate: function coordinate (coordinate$1) {
    return coordinate$1.x + ' ' + coordinate$1.y
  },

  /**
   * Return a space delimited string of point coordinates.
   *
   * @param {Point}
   *          point
   * @return {String} A string of coordinates representing the point.
   */
  point: function point (point$1) {
    return extract$1.coordinate.call(this, point$1._coordinates._coordinates[0])
  },

  /**
   * Return a comma delimited string of point coordinates from a multipoint.
   *
   * @param {MultiPoint}
   *          multipoint
   * @return {String} A string of point coordinate strings representing the
   *         multipoint.
   */
  multipoint: function multipoint (multipoint$1) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = multipoint$1._geometries.length; i < len; ++i) {
      array.push('(' + extract$1.point.apply(this$1, [multipoint$1._geometries[i]]) + ')');
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of point coordinates from a line.
   *
   * @param {LineString} linestring
   * @return {String} A string of point coordinate strings representing the linestring.
   */
  linestring: function linestring (linestring$1) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = linestring$1._points._coordinates.length; i < len; ++i) {
      array.push(extract$1.coordinate.apply(this$1, [linestring$1._points._coordinates[i]]));
    }
    return array.join(',')
  },

  linearring: function linearring (linearring$1) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = linearring$1._points._coordinates.length; i < len; ++i) {
      array.push(extract$1.coordinate.apply(this$1, [linearring$1._points._coordinates[i]]));
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of linestring strings from a
   * multilinestring.
   *
   * @param {MultiLineString} multilinestring
   * @return {String} A string of of linestring strings representing the multilinestring.
   */
  multilinestring: function multilinestring (multilinestring$1) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = multilinestring$1._geometries.length; i < len; ++i) {
      array.push('(' +
        extract$1.linestring.apply(this$1, [multilinestring$1._geometries[i]]) +
        ')');
    }
    return array.join(',')
  },

  /**
   * Return a comma delimited string of linear ring arrays from a polygon.
   *
   * @param {Polygon} polygon
   * @return {String} An array of linear ring arrays representing the polygon.
   */
  polygon: function polygon (polygon$1) {
    var this$1 = this;

    var array = [];
    array.push('(' + extract$1.linestring.apply(this, [polygon$1._shell]) + ')');
    for (var i = 0, len = polygon$1._holes.length; i < len; ++i) {
      array.push('(' + extract$1.linestring.apply(this$1, [polygon$1._holes[i]]) + ')');
    }
    return array.join(',')
  },

  /**
   * Return an array of polygon arrays from a multipolygon.
   *
   * @param {MultiPolygon} multipolygon
   * @return {String} An array of polygon arrays representing the multipolygon.
   */
  multipolygon: function multipolygon (multipolygon$1) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = multipolygon$1._geometries.length; i < len; ++i) {
      array.push('(' + extract$1.polygon.apply(this$1, [multipolygon$1._geometries[i]]) + ')');
    }
    return array.join(',')
  },

  /**
   * Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an
   * geometrycollection.
   *
   * @param {GeometryCollection} collection
   * @return {String} internal WKT representation of the collection.
   */
  geometrycollection: function geometrycollection (collection) {
    var this$1 = this;

    var array = [];
    for (var i = 0, len = collection._geometries.length; i < len; ++i) {
      array.push(this$1.extractGeometry(collection._geometries[i]));
    }
    return array.join(',')
  }
};

/**
 * Object with properties corresponding to the geometry types. Property values
 * are functions that do the actual parsing.
 * @private
 */
var parse$1 = {
  /**
   * Return point geometry given a point WKT fragment.
   *
   * @param {String} str A WKT fragment representing the point.
   * @return {Point} A point geometry.
   * @private
   */
  point: function point (str) {
    if (str === undefined) {
      return this.geometryFactory.createPoint()
    }

    var coords = str.trim().split(regExes.spaces);
    return this.geometryFactory.createPoint(new Coordinate(Number.parseFloat(coords[0]),
      Number.parseFloat(coords[1])))
  },

  /**
   * Return a multipoint geometry given a multipoint WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multipoint.
   * @return {Point} A multipoint feature.
   * @private
   */
  multipoint: function multipoint (str) {
    var this$1 = this;

    if (str === undefined) {
      return this.geometryFactory.createMultiPoint()
    }

    var point;
    var points = str.trim().split(',');
    var components = [];
    for (var i = 0, len = points.length; i < len; ++i) {
      point = points[i].replace(regExes.trimParens, '$1');
      components.push(parse$1.point.apply(this$1, [point]));
    }
    return this.geometryFactory.createMultiPoint(components)
  },

  /**
   * Return a linestring geometry given a linestring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the linestring.
   * @return {LineString} A linestring geometry.
   * @private
   */
  linestring: function linestring (str) {
    if (str === undefined) {
      return this.geometryFactory.createLineString()
    }

    var points = str.trim().split(',');
    var components = [];
    var coords;
    for (var i = 0, len = points.length; i < len; ++i) {
      coords = points[i].trim().split(regExes.spaces);
      components.push(new Coordinate(Number.parseFloat(coords[0]), Number.parseFloat(coords[1])));
    }
    return this.geometryFactory.createLineString(components)
  },

  /**
   * Return a linearring geometry given a linearring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the linearring.
   * @return {LinearRing} A linearring geometry.
   * @private
   */
  linearring: function linearring (str) {
    if (str === undefined) {
      return this.geometryFactory.createLinearRing()
    }

    var points = str.trim().split(',');
    var components = [];
    var coords;
    for (var i = 0, len = points.length; i < len; ++i) {
      coords = points[i].trim().split(regExes.spaces);
      components.push(new Coordinate(Number.parseFloat(coords[0]), Number.parseFloat(coords[1])));
    }
    return this.geometryFactory.createLinearRing(components)
  },

  /**
   * Return a multilinestring geometry given a multilinestring WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multilinestring.
   * @return {MultiLineString} A multilinestring geometry.
   * @private
   */
  multilinestring: function multilinestring (str) {
    var this$1 = this;

    if (str === undefined) {
      return this.geometryFactory.createMultiLineString()
    }

    var line;
    var lines = str.trim().split(regExes.parenComma);
    var components = [];
    for (var i = 0, len = lines.length; i < len; ++i) {
      line = lines[i].replace(regExes.trimParens, '$1');
      components.push(parse$1.linestring.apply(this$1, [line]));
    }
    return this.geometryFactory.createMultiLineString(components)
  },

  /**
   * Return a polygon geometry given a polygon WKT fragment.
   *
   * @param {String} str A WKT fragment representing the polygon.
   * @return {Polygon} A polygon geometry.
   * @private
   */
  polygon: function polygon (str) {
    var this$1 = this;

    if (str === undefined) {
      return this.geometryFactory.createPolygon()
    }

    var ring, linestring, linearring;
    var rings = str.trim().split(regExes.parenComma);
    var shell;
    var holes = [];
    for (var i = 0, len = rings.length; i < len; ++i) {
      ring = rings[i].replace(regExes.trimParens, '$1');
      linestring = parse$1.linestring.apply(this$1, [ring]);
      linearring = this$1.geometryFactory.createLinearRing(linestring._points);
      if (i === 0) {
        shell = linearring;
      } else {
        holes.push(linearring);
      }
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  /**
   * Return a multipolygon geometry given a multipolygon WKT fragment.
   *
   * @param {String} str A WKT fragment representing the multipolygon.
   * @return {MultiPolygon} A multipolygon geometry.
   * @private
   */
  multipolygon: function multipolygon (str) {
    var this$1 = this;

    if (str === undefined) {
      return this.geometryFactory.createMultiPolygon()
    }

    var polygon;
    var polygons = str.trim().split(regExes.doubleParenComma);
    var components = [];
    for (var i = 0, len = polygons.length; i < len; ++i) {
      polygon = polygons[i].replace(regExes.trimParens, '$1');
      components.push(parse$1.polygon.apply(this$1, [polygon]));
    }
    return this.geometryFactory.createMultiPolygon(components)
  },

  /**
   * Return a geometrycollection given a geometrycollection WKT fragment.
   *
   * @param {String} str A WKT fragment representing the geometrycollection.
   * @return {GeometryCollection}
   * @private
   */
  geometrycollection: function geometrycollection (str) {
    var this$1 = this;

    if (str === undefined) {
      return this.geometryFactory.createGeometryCollection()
    }

    // separate components of the collection with |
    str = str.replace(/,\s*([A-Za-z])/g, '|$1');
    var wktArray = str.trim().split('|');
    var components = [];
    for (var i = 0, len = wktArray.length; i < len; ++i) {
      components.push(this$1.read(wktArray[i]));
    }
    return this.geometryFactory.createGeometryCollection(components)
  }
};

/**
 * Writes the Well-Known Text representation of a {@link Geometry}. The
 * Well-Known Text format is defined in the <A
 * HREF="http://www.opengis.org/techno/specs.htm"> OGC Simple Features
 * Specification for SQL</A>.
 * <p>
 * The <code>WKTWriter</code> outputs coordinates rounded to the precision
 * model. Only the maximum number of decimal places necessary to represent the
 * ordinates to the required precision will be output.
 * <p>
 * The SFS WKT spec does not define a special tag for {@link LinearRing}s.
 * Under the spec, rings are output as <code>LINESTRING</code>s.
 */

/**
 * @param {GeometryFactory} geometryFactory
 * @constructor
 */
var WKTWriter = function WKTWriter (geometryFactory) {
  this.parser = new WKTParser(geometryFactory);
};

/**
 * Converts a <code>Geometry</code> to its Well-known Text representation.
 *
 * @param {Geometry} geometry a <code>Geometry</code> to process.
 * @return {string} a <Geometry Tagged Text> string (see the OpenGIS Simple
 *       Features Specification).
 * @memberof WKTWriter
 */
WKTWriter.prototype.write = function write (geometry) {
  return this.parser.write(geometry)
};
/**
 * Generates the WKT for a <tt>LINESTRING</tt> specified by two
 * {@link Coordinate}s.
 *
 * @param p0 the first coordinate.
 * @param p1 the second coordinate.
 *
 * @return the WKT.
 * @private
 */
WKTWriter.toLineString = function toLineString (p0, p1) {
  if (arguments.length !== 2) {
    throw new Error('Not implemented')
  }
  return 'LINESTRING ( ' + p0.x + ' ' + p0.y + ', ' + p1.x + ' ' + p1.y + ' )'
};

var RuntimeException = (function (Error) {
  function RuntimeException (message) {
    Error.call(this, message);
    this.name = 'RuntimeException';
    this.message = message;
    this.stack = (new Error()).stack;
  }

  if ( Error ) RuntimeException.__proto__ = Error;
  RuntimeException.prototype = Object.create( Error && Error.prototype );
  RuntimeException.prototype.constructor = RuntimeException;

  return RuntimeException;
}(Error));

var AssertionFailedException = (function (RuntimeException$$1) {
  function AssertionFailedException () {
    RuntimeException$$1.call(this);
    if (arguments.length === 0) {
      RuntimeException$$1.call(this);
    } else if (arguments.length === 1) {
      var message = arguments[0];
      RuntimeException$$1.call(this, message);
    }
  }

  if ( RuntimeException$$1 ) AssertionFailedException.__proto__ = RuntimeException$$1;
  AssertionFailedException.prototype = Object.create( RuntimeException$$1 && RuntimeException$$1.prototype );
  AssertionFailedException.prototype.constructor = AssertionFailedException;
  AssertionFailedException.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  AssertionFailedException.prototype.getClass = function getClass () {
    return AssertionFailedException
  };

  return AssertionFailedException;
}(RuntimeException));

var Assert = function Assert () {};

Assert.prototype.interfaces_ = function interfaces_ () {
  return []
};
Assert.prototype.getClass = function getClass () {
  return Assert
};
Assert.shouldNeverReachHere = function shouldNeverReachHere () {
  if (arguments.length === 0) {
    Assert.shouldNeverReachHere(null);
  } else if (arguments.length === 1) {
    var message = arguments[0];
    throw new AssertionFailedException('Should never reach here' + (message !== null ? ': ' + message : ''))
  }
};
Assert.isTrue = function isTrue () {
  var assertion;
  var message;
  if (arguments.length === 1) {
    assertion = arguments[0];
    Assert.isTrue(assertion, null);
  } else if (arguments.length === 2) {
    assertion = arguments[0];
    message = arguments[1];
    if (!assertion) {
      if (message === null) {
        throw new AssertionFailedException()
      } else {
        throw new AssertionFailedException(message)
      }
    }
  }
};
Assert.equals = function equals () {
  var expectedValue;
  var actualValue;
  var message;
  if (arguments.length === 2) {
    expectedValue = arguments[0];
    actualValue = arguments[1];
    Assert.equals(expectedValue, actualValue, null);
  } else if (arguments.length === 3) {
    expectedValue = arguments[0];
    actualValue = arguments[1];
    message = arguments[2];
    if (!actualValue.equals(expectedValue)) {
      throw new AssertionFailedException('Expected ' + expectedValue + ' but encountered ' + actualValue + (message !== null ? ': ' + message : ''))
    }
  }
};

var LineIntersector = function LineIntersector () {
  this._result = null;
  this._inputLines = Array(2).fill().map(function () { return Array(2); });
  this._intPt = new Array(2).fill(null);
  this._intLineIndex = null;
  this._isProper = null;
  this._pa = null;
  this._pb = null;
  this._precisionModel = null;
  this._intPt[0] = new Coordinate();
  this._intPt[1] = new Coordinate();
  this._pa = this._intPt[0];
  this._pb = this._intPt[1];
  this._result = 0;
};

var staticAccessors$10 = { DONT_INTERSECT: { configurable: true },DO_INTERSECT: { configurable: true },COLLINEAR: { configurable: true },NO_INTERSECTION: { configurable: true },POINT_INTERSECTION: { configurable: true },COLLINEAR_INTERSECTION: { configurable: true } };
LineIntersector.prototype.getIndexAlongSegment = function getIndexAlongSegment (segmentIndex, intIndex) {
  this.computeIntLineIndex();
  return this._intLineIndex[segmentIndex][intIndex]
};
LineIntersector.prototype.getTopologySummary = function getTopologySummary () {
  var catBuf = new StringBuffer();
  if (this.isEndPoint()) { catBuf.append(' endpoint'); }
  if (this._isProper) { catBuf.append(' proper'); }
  if (this.isCollinear()) { catBuf.append(' collinear'); }
  return catBuf.toString()
};
LineIntersector.prototype.computeIntersection = function computeIntersection (p1, p2, p3, p4) {
  this._inputLines[0][0] = p1;
  this._inputLines[0][1] = p2;
  this._inputLines[1][0] = p3;
  this._inputLines[1][1] = p4;
  this._result = this.computeIntersect(p1, p2, p3, p4);
};
LineIntersector.prototype.getIntersectionNum = function getIntersectionNum () {
  return this._result
};
LineIntersector.prototype.computeIntLineIndex = function computeIntLineIndex () {
  if (arguments.length === 0) {
    if (this._intLineIndex === null) {
      this._intLineIndex = Array(2).fill().map(function () { return Array(2); });
      this.computeIntLineIndex(0);
      this.computeIntLineIndex(1);
    }
  } else if (arguments.length === 1) {
    var segmentIndex = arguments[0];
    var dist0 = this.getEdgeDistance(segmentIndex, 0);
    var dist1 = this.getEdgeDistance(segmentIndex, 1);
    if (dist0 > dist1) {
      this._intLineIndex[segmentIndex][0] = 0;
      this._intLineIndex[segmentIndex][1] = 1;
    } else {
      this._intLineIndex[segmentIndex][0] = 1;
      this._intLineIndex[segmentIndex][1] = 0;
    }
  }
};
LineIntersector.prototype.isProper = function isProper () {
  return this.hasIntersection() && this._isProper
};
LineIntersector.prototype.setPrecisionModel = function setPrecisionModel (precisionModel) {
  this._precisionModel = precisionModel;
};
LineIntersector.prototype.isInteriorIntersection = function isInteriorIntersection () {
    var this$1 = this;

  if (arguments.length === 0) {
    if (this.isInteriorIntersection(0)) { return true }
    if (this.isInteriorIntersection(1)) { return true }
    return false
  } else if (arguments.length === 1) {
    var inputLineIndex = arguments[0];
    for (var i = 0; i < this._result; i++) {
      if (!(this$1._intPt[i].equals2D(this$1._inputLines[inputLineIndex][0]) || this$1._intPt[i].equals2D(this$1._inputLines[inputLineIndex][1]))) {
        return true
      }
    }
    return false
  }
};
LineIntersector.prototype.getIntersection = function getIntersection (intIndex) {
  return this._intPt[intIndex]
};
LineIntersector.prototype.isEndPoint = function isEndPoint () {
  return this.hasIntersection() && !this._isProper
};
LineIntersector.prototype.hasIntersection = function hasIntersection () {
  return this._result !== LineIntersector.NO_INTERSECTION
};
LineIntersector.prototype.getEdgeDistance = function getEdgeDistance (segmentIndex, intIndex) {
  var dist = LineIntersector.computeEdgeDistance(this._intPt[intIndex], this._inputLines[segmentIndex][0], this._inputLines[segmentIndex][1]);
  return dist
};
LineIntersector.prototype.isCollinear = function isCollinear () {
  return this._result === LineIntersector.COLLINEAR_INTERSECTION
};
LineIntersector.prototype.toString = function toString () {
  return WKTWriter.toLineString(this._inputLines[0][0], this._inputLines[0][1]) + ' - ' + WKTWriter.toLineString(this._inputLines[1][0], this._inputLines[1][1]) + this.getTopologySummary()
};
LineIntersector.prototype.getEndpoint = function getEndpoint (segmentIndex, ptIndex) {
  return this._inputLines[segmentIndex][ptIndex]
};
LineIntersector.prototype.isIntersection = function isIntersection (pt) {
    var this$1 = this;

  for (var i = 0; i < this._result; i++) {
    if (this$1._intPt[i].equals2D(pt)) {
      return true
    }
  }
  return false
};
LineIntersector.prototype.getIntersectionAlongSegment = function getIntersectionAlongSegment (segmentIndex, intIndex) {
  this.computeIntLineIndex();
  return this._intPt[this._intLineIndex[segmentIndex][intIndex]]
};
LineIntersector.prototype.interfaces_ = function interfaces_ () {
  return []
};
LineIntersector.prototype.getClass = function getClass () {
  return LineIntersector
};
LineIntersector.computeEdgeDistance = function computeEdgeDistance (p, p0, p1) {
  var dx = Math.abs(p1.x - p0.x);
  var dy = Math.abs(p1.y - p0.y);
  var dist = -1.0;
  if (p.equals(p0)) {
    dist = 0.0;
  } else if (p.equals(p1)) {
    if (dx > dy) { dist = dx; } else { dist = dy; }
  } else {
    var pdx = Math.abs(p.x - p0.x);
    var pdy = Math.abs(p.y - p0.y);
    if (dx > dy) { dist = pdx; } else { dist = pdy; }
    if (dist === 0.0 && !p.equals(p0)) {
      dist = Math.max(pdx, pdy);
    }
  }
  Assert.isTrue(!(dist === 0.0 && !p.equals(p0)), 'Bad distance calculation');
  return dist
};
LineIntersector.nonRobustComputeEdgeDistance = function nonRobustComputeEdgeDistance (p, p1, p2) {
  var dx = p.x - p1.x;
  var dy = p.y - p1.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  Assert.isTrue(!(dist === 0.0 && !p.equals(p1)), 'Invalid distance calculation');
  return dist
};
staticAccessors$10.DONT_INTERSECT.get = function () { return 0 };
staticAccessors$10.DO_INTERSECT.get = function () { return 1 };
staticAccessors$10.COLLINEAR.get = function () { return 2 };
staticAccessors$10.NO_INTERSECTION.get = function () { return 0 };
staticAccessors$10.POINT_INTERSECTION.get = function () { return 1 };
staticAccessors$10.COLLINEAR_INTERSECTION.get = function () { return 2 };

Object.defineProperties( LineIntersector, staticAccessors$10 );

var RobustLineIntersector = (function (LineIntersector$$1) {
  function RobustLineIntersector () {
    LineIntersector$$1.apply(this, arguments);
  }

  if ( LineIntersector$$1 ) RobustLineIntersector.__proto__ = LineIntersector$$1;
  RobustLineIntersector.prototype = Object.create( LineIntersector$$1 && LineIntersector$$1.prototype );
  RobustLineIntersector.prototype.constructor = RobustLineIntersector;

  RobustLineIntersector.prototype.isInSegmentEnvelopes = function isInSegmentEnvelopes (intPt) {
    var env0 = new Envelope(this._inputLines[0][0], this._inputLines[0][1]);
    var env1 = new Envelope(this._inputLines[1][0], this._inputLines[1][1]);
    return env0.contains(intPt) && env1.contains(intPt)
  };
  RobustLineIntersector.prototype.computeIntersection = function computeIntersection () {
    if (arguments.length === 3) {
      var p = arguments[0];
      var p1 = arguments[1];
      var p2 = arguments[2];
      this._isProper = false;
      if (Envelope.intersects(p1, p2, p)) {
        if (CGAlgorithms.orientationIndex(p1, p2, p) === 0 && CGAlgorithms.orientationIndex(p2, p1, p) === 0) {
          this._isProper = true;
          if (p.equals(p1) || p.equals(p2)) {
            this._isProper = false;
          }
          this._result = LineIntersector$$1.POINT_INTERSECTION;
          return null
        }
      }
      this._result = LineIntersector$$1.NO_INTERSECTION;
    } else { return LineIntersector$$1.prototype.computeIntersection.apply(this, arguments) }
  };
  RobustLineIntersector.prototype.normalizeToMinimum = function normalizeToMinimum (n1, n2, n3, n4, normPt) {
    normPt.x = this.smallestInAbsValue(n1.x, n2.x, n3.x, n4.x);
    normPt.y = this.smallestInAbsValue(n1.y, n2.y, n3.y, n4.y);
    n1.x -= normPt.x;
    n1.y -= normPt.y;
    n2.x -= normPt.x;
    n2.y -= normPt.y;
    n3.x -= normPt.x;
    n3.y -= normPt.y;
    n4.x -= normPt.x;
    n4.y -= normPt.y;
  };
  RobustLineIntersector.prototype.safeHCoordinateIntersection = function safeHCoordinateIntersection (p1, p2, q1, q2) {
    var intPt = null;
    try {
      intPt = HCoordinate.intersection(p1, p2, q1, q2);
    } catch (e) {
      if (e instanceof NotRepresentableException) {
        intPt = RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2);
      } else { throw e }
    } finally {}
    return intPt
  };
  RobustLineIntersector.prototype.intersection = function intersection (p1, p2, q1, q2) {
    var intPt = this.intersectionWithNormalization(p1, p2, q1, q2);
    if (!this.isInSegmentEnvelopes(intPt)) {
      intPt = new Coordinate(RobustLineIntersector.nearestEndpoint(p1, p2, q1, q2));
    }
    if (this._precisionModel !== null) {
      this._precisionModel.makePrecise(intPt);
    }
    return intPt
  };
  RobustLineIntersector.prototype.smallestInAbsValue = function smallestInAbsValue (x1, x2, x3, x4) {
    var x = x1;
    var xabs = Math.abs(x);
    if (Math.abs(x2) < xabs) {
      x = x2;
      xabs = Math.abs(x2);
    }
    if (Math.abs(x3) < xabs) {
      x = x3;
      xabs = Math.abs(x3);
    }
    if (Math.abs(x4) < xabs) {
      x = x4;
    }
    return x
  };
  RobustLineIntersector.prototype.checkDD = function checkDD (p1, p2, q1, q2, intPt) {
    var intPtDD = CGAlgorithmsDD.intersection(p1, p2, q1, q2);
    var isIn = this.isInSegmentEnvelopes(intPtDD);
    System.out.println('DD in env = ' + isIn + '  --------------------- ' + intPtDD);
    if (intPt.distance(intPtDD) > 0.0001) {
      System.out.println('Distance = ' + intPt.distance(intPtDD));
    }
  };
  RobustLineIntersector.prototype.intersectionWithNormalization = function intersectionWithNormalization (p1, p2, q1, q2) {
    var n1 = new Coordinate(p1);
    var n2 = new Coordinate(p2);
    var n3 = new Coordinate(q1);
    var n4 = new Coordinate(q2);
    var normPt = new Coordinate();
    this.normalizeToEnvCentre(n1, n2, n3, n4, normPt);
    var intPt = this.safeHCoordinateIntersection(n1, n2, n3, n4);
    intPt.x += normPt.x;
    intPt.y += normPt.y;
    return intPt
  };
  RobustLineIntersector.prototype.computeCollinearIntersection = function computeCollinearIntersection (p1, p2, q1, q2) {
    var p1q1p2 = Envelope.intersects(p1, p2, q1);
    var p1q2p2 = Envelope.intersects(p1, p2, q2);
    var q1p1q2 = Envelope.intersects(q1, q2, p1);
    var q1p2q2 = Envelope.intersects(q1, q2, p2);
    if (p1q1p2 && p1q2p2) {
      this._intPt[0] = q1;
      this._intPt[1] = q2;
      return LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    if (q1p1q2 && q1p2q2) {
      this._intPt[0] = p1;
      this._intPt[1] = p2;
      return LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    if (p1q1p2 && q1p1q2) {
      this._intPt[0] = q1;
      this._intPt[1] = p1;
      return q1.equals(p1) && !p1q2p2 && !q1p2q2 ? LineIntersector$$1.POINT_INTERSECTION : LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    if (p1q1p2 && q1p2q2) {
      this._intPt[0] = q1;
      this._intPt[1] = p2;
      return q1.equals(p2) && !p1q2p2 && !q1p1q2 ? LineIntersector$$1.POINT_INTERSECTION : LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    if (p1q2p2 && q1p1q2) {
      this._intPt[0] = q2;
      this._intPt[1] = p1;
      return q2.equals(p1) && !p1q1p2 && !q1p2q2 ? LineIntersector$$1.POINT_INTERSECTION : LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    if (p1q2p2 && q1p2q2) {
      this._intPt[0] = q2;
      this._intPt[1] = p2;
      return q2.equals(p2) && !p1q1p2 && !q1p1q2 ? LineIntersector$$1.POINT_INTERSECTION : LineIntersector$$1.COLLINEAR_INTERSECTION
    }
    return LineIntersector$$1.NO_INTERSECTION
  };
  RobustLineIntersector.prototype.normalizeToEnvCentre = function normalizeToEnvCentre (n00, n01, n10, n11, normPt) {
    var minX0 = n00.x < n01.x ? n00.x : n01.x;
    var minY0 = n00.y < n01.y ? n00.y : n01.y;
    var maxX0 = n00.x > n01.x ? n00.x : n01.x;
    var maxY0 = n00.y > n01.y ? n00.y : n01.y;
    var minX1 = n10.x < n11.x ? n10.x : n11.x;
    var minY1 = n10.y < n11.y ? n10.y : n11.y;
    var maxX1 = n10.x > n11.x ? n10.x : n11.x;
    var maxY1 = n10.y > n11.y ? n10.y : n11.y;
    var intMinX = minX0 > minX1 ? minX0 : minX1;
    var intMaxX = maxX0 < maxX1 ? maxX0 : maxX1;
    var intMinY = minY0 > minY1 ? minY0 : minY1;
    var intMaxY = maxY0 < maxY1 ? maxY0 : maxY1;
    var intMidX = (intMinX + intMaxX) / 2.0;
    var intMidY = (intMinY + intMaxY) / 2.0;
    normPt.x = intMidX;
    normPt.y = intMidY;
    n00.x -= normPt.x;
    n00.y -= normPt.y;
    n01.x -= normPt.x;
    n01.y -= normPt.y;
    n10.x -= normPt.x;
    n10.y -= normPt.y;
    n11.x -= normPt.x;
    n11.y -= normPt.y;
  };
  RobustLineIntersector.prototype.computeIntersect = function computeIntersect (p1, p2, q1, q2) {
    this._isProper = false;
    if (!Envelope.intersects(p1, p2, q1, q2)) { return LineIntersector$$1.NO_INTERSECTION }
    var Pq1 = CGAlgorithms.orientationIndex(p1, p2, q1);
    var Pq2 = CGAlgorithms.orientationIndex(p1, p2, q2);
    if ((Pq1 > 0 && Pq2 > 0) || (Pq1 < 0 && Pq2 < 0)) {
      return LineIntersector$$1.NO_INTERSECTION
    }
    var Qp1 = CGAlgorithms.orientationIndex(q1, q2, p1);
    var Qp2 = CGAlgorithms.orientationIndex(q1, q2, p2);
    if ((Qp1 > 0 && Qp2 > 0) || (Qp1 < 0 && Qp2 < 0)) {
      return LineIntersector$$1.NO_INTERSECTION
    }
    var collinear = Pq1 === 0 && Pq2 === 0 && Qp1 === 0 && Qp2 === 0;
    if (collinear) {
      return this.computeCollinearIntersection(p1, p2, q1, q2)
    }
    if (Pq1 === 0 || Pq2 === 0 || Qp1 === 0 || Qp2 === 0) {
      this._isProper = false;
      if (p1.equals2D(q1) || p1.equals2D(q2)) {
        this._intPt[0] = p1;
      } else if (p2.equals2D(q1) || p2.equals2D(q2)) {
        this._intPt[0] = p2;
      } else if (Pq1 === 0) {
        this._intPt[0] = new Coordinate(q1);
      } else if (Pq2 === 0) {
        this._intPt[0] = new Coordinate(q2);
      } else if (Qp1 === 0) {
        this._intPt[0] = new Coordinate(p1);
      } else if (Qp2 === 0) {
        this._intPt[0] = new Coordinate(p2);
      }
    } else {
      this._isProper = true;
      this._intPt[0] = this.intersection(p1, p2, q1, q2);
    }
    return LineIntersector$$1.POINT_INTERSECTION
  };
  RobustLineIntersector.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  RobustLineIntersector.prototype.getClass = function getClass () {
    return RobustLineIntersector
  };
  RobustLineIntersector.nearestEndpoint = function nearestEndpoint (p1, p2, q1, q2) {
    var nearestPt = p1;
    var minDist = CGAlgorithms.distancePointLine(p1, q1, q2);
    var dist = CGAlgorithms.distancePointLine(p2, q1, q2);
    if (dist < minDist) {
      minDist = dist;
      nearestPt = p2;
    }
    dist = CGAlgorithms.distancePointLine(q1, p1, p2);
    if (dist < minDist) {
      minDist = dist;
      nearestPt = q1;
    }
    dist = CGAlgorithms.distancePointLine(q2, p1, p2);
    if (dist < minDist) {
      minDist = dist;
      nearestPt = q2;
    }
    return nearestPt
  };

  return RobustLineIntersector;
}(LineIntersector));

var RobustDeterminant = function RobustDeterminant () {};

RobustDeterminant.prototype.interfaces_ = function interfaces_ () {
  return []
};
RobustDeterminant.prototype.getClass = function getClass () {
  return RobustDeterminant
};
RobustDeterminant.orientationIndex = function orientationIndex (p1, p2, q) {
  var dx1 = p2.x - p1.x;
  var dy1 = p2.y - p1.y;
  var dx2 = q.x - p2.x;
  var dy2 = q.y - p2.y;
  return RobustDeterminant.signOfDet2x2(dx1, dy1, dx2, dy2)
};
RobustDeterminant.signOfDet2x2 = function signOfDet2x2 (x1, y1, x2, y2) {
  var sign = null;
  var swap = null;
  var k = null;
  sign = 1;
  if (x1 === 0.0 || y2 === 0.0) {
    if (y1 === 0.0 || x2 === 0.0) {
      return 0
    } else if (y1 > 0) {
      if (x2 > 0) {
        return -sign
      } else {
        return sign
      }
    } else {
      if (x2 > 0) {
        return sign
      } else {
        return -sign
      }
    }
  }
  if (y1 === 0.0 || x2 === 0.0) {
    if (y2 > 0) {
      if (x1 > 0) {
        return sign
      } else {
        return -sign
      }
    } else {
      if (x1 > 0) {
        return -sign
      } else {
        return sign
      }
    }
  }
  if (y1 > 0.0) {
    if (y2 > 0.0) {
      if (y1 <= y2) {
        
      } else {
        sign = -sign;
        swap = x1;
        x1 = x2;
        x2 = swap;
        swap = y1;
        y1 = y2;
        y2 = swap;
      }
    } else {
      if (y1 <= -y2) {
        sign = -sign;
        x2 = -x2;
        y2 = -y2;
      } else {
        swap = x1;
        x1 = -x2;
        x2 = swap;
        swap = y1;
        y1 = -y2;
        y2 = swap;
      }
    }
  } else {
    if (y2 > 0.0) {
      if (-y1 <= y2) {
        sign = -sign;
        x1 = -x1;
        y1 = -y1;
      } else {
        swap = -x1;
        x1 = x2;
        x2 = swap;
        swap = -y1;
        y1 = y2;
        y2 = swap;
      }
    } else {
      if (y1 >= y2) {
        x1 = -x1;
        y1 = -y1;
        x2 = -x2;
        y2 = -y2;
      } else {
        sign = -sign;
        swap = -x1;
        x1 = -x2;
        x2 = swap;
        swap = -y1;
        y1 = -y2;
        y2 = swap;
      }
    }
  }
  if (x1 > 0.0) {
    if (x2 > 0.0) {
      if (x1 <= x2) {
        
      } else {
        return sign
      }
    } else {
      return sign
    }
  } else {
    if (x2 > 0.0) {
      return -sign
    } else {
      if (x1 >= x2) {
        sign = -sign;
        x1 = -x1;
        x2 = -x2;
      } else {
        return -sign
      }
    }
  }
  while (true) {
    k = Math.floor(x2 / x1);
    x2 = x2 - k * x1;
    y2 = y2 - k * y1;
    if (y2 < 0.0) {
      return -sign
    }
    if (y2 > y1) {
      return sign
    }
    if (x1 > x2 + x2) {
      if (y1 < y2 + y2) {
        return sign
      }
    } else {
      if (y1 > y2 + y2) {
        return -sign
      } else {
        x2 = x1 - x2;
        y2 = y1 - y2;
        sign = -sign;
      }
    }
    if (y2 === 0.0) {
      if (x2 === 0.0) {
        return 0
      } else {
        return -sign
      }
    }
    if (x2 === 0.0) {
      return sign
    }
    k = Math.floor(x1 / x2);
    x1 = x1 - k * x2;
    y1 = y1 - k * y2;
    if (y1 < 0.0) {
      return sign
    }
    if (y1 > y2) {
      return -sign
    }
    if (x2 > x1 + x1) {
      if (y2 < y1 + y1) {
        return -sign
      }
    } else {
      if (y2 > y1 + y1) {
        return sign
      } else {
        x1 = x2 - x1;
        y1 = y2 - y1;
        sign = -sign;
      }
    }
    if (y1 === 0.0) {
      if (x1 === 0.0) {
        return 0
      } else {
        return sign
      }
    }
    if (x1 === 0.0) {
      return -sign
    }
  }
};

var RayCrossingCounter = function RayCrossingCounter () {
  this._p = null;
  this._crossingCount = 0;
  this._isPointOnSegment = false;
  var p = arguments[0];
  this._p = p;
};
RayCrossingCounter.prototype.countSegment = function countSegment (p1, p2) {
  if (p1.x < this._p.x && p2.x < this._p.x) { return null }
  if (this._p.x === p2.x && this._p.y === p2.y) {
    this._isPointOnSegment = true;
    return null
  }
  if (p1.y === this._p.y && p2.y === this._p.y) {
    var minx = p1.x;
    var maxx = p2.x;
    if (minx > maxx) {
      minx = p2.x;
      maxx = p1.x;
    }
    if (this._p.x >= minx && this._p.x <= maxx) {
      this._isPointOnSegment = true;
    }
    return null
  }
  if ((p1.y > this._p.y && p2.y <= this._p.y) || (p2.y > this._p.y && p1.y <= this._p.y)) {
    var x1 = p1.x - this._p.x;
    var y1 = p1.y - this._p.y;
    var x2 = p2.x - this._p.x;
    var y2 = p2.y - this._p.y;
    var xIntSign = RobustDeterminant.signOfDet2x2(x1, y1, x2, y2);
    if (xIntSign === 0.0) {
      this._isPointOnSegment = true;
      return null
    }
    if (y2 < y1) { xIntSign = -xIntSign; }
    if (xIntSign > 0.0) {
      this._crossingCount++;
    }
  }
};
RayCrossingCounter.prototype.isPointInPolygon = function isPointInPolygon () {
  return this.getLocation() !== Location.EXTERIOR
};
RayCrossingCounter.prototype.getLocation = function getLocation () {
  if (this._isPointOnSegment) { return Location.BOUNDARY }
  if (this._crossingCount % 2 === 1) {
    return Location.INTERIOR
  }
  return Location.EXTERIOR
};
RayCrossingCounter.prototype.isOnSegment = function isOnSegment () {
  return this._isPointOnSegment
};
RayCrossingCounter.prototype.interfaces_ = function interfaces_ () {
  return []
};
RayCrossingCounter.prototype.getClass = function getClass () {
  return RayCrossingCounter
};
RayCrossingCounter.locatePointInRing = function locatePointInRing () {
  if (arguments[0] instanceof Coordinate && hasInterface(arguments[1], CoordinateSequence)) {
    var p = arguments[0];
    var ring = arguments[1];
    var counter = new RayCrossingCounter(p);
    var p1 = new Coordinate();
    var p2 = new Coordinate();
    for (var i = 1; i < ring.size(); i++) {
      ring.getCoordinate(i, p1);
      ring.getCoordinate(i - 1, p2);
      counter.countSegment(p1, p2);
      if (counter.isOnSegment()) { return counter.getLocation() }
    }
    return counter.getLocation()
  } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Array) {
    var p$1 = arguments[0];
    var ring$1 = arguments[1];
    var counter$1 = new RayCrossingCounter(p$1);
    for (var i$1 = 1; i$1 < ring$1.length; i$1++) {
      var p1$1 = ring$1[i$1];
      var p2$1 = ring$1[i$1 - 1];
      counter$1.countSegment(p1$1, p2$1);
      if (counter$1.isOnSegment()) { return counter$1.getLocation() }
    }
    return counter$1.getLocation()
  }
};

var CGAlgorithms = function CGAlgorithms () {};

var staticAccessors$3 = { CLOCKWISE: { configurable: true },RIGHT: { configurable: true },COUNTERCLOCKWISE: { configurable: true },LEFT: { configurable: true },COLLINEAR: { configurable: true },STRAIGHT: { configurable: true } };

CGAlgorithms.prototype.interfaces_ = function interfaces_ () {
  return []
};
CGAlgorithms.prototype.getClass = function getClass () {
  return CGAlgorithms
};
CGAlgorithms.orientationIndex = function orientationIndex (p1, p2, q) {
  return CGAlgorithmsDD.orientationIndex(p1, p2, q)
};
CGAlgorithms.signedArea = function signedArea () {
  if (arguments[0] instanceof Array) {
    var ring = arguments[0];
    if (ring.length < 3) { return 0.0 }
    var sum = 0.0;
    var x0 = ring[0].x;
    for (var i = 1; i < ring.length - 1; i++) {
      var x = ring[i].x - x0;
      var y1 = ring[i + 1].y;
      var y2 = ring[i - 1].y;
      sum += x * (y2 - y1);
    }
    return sum / 2.0
  } else if (hasInterface(arguments[0], CoordinateSequence)) {
    var ring$1 = arguments[0];
    var n = ring$1.size();
    if (n < 3) { return 0.0 }
    var p0 = new Coordinate();
    var p1 = new Coordinate();
    var p2 = new Coordinate();
    ring$1.getCoordinate(0, p1);
    ring$1.getCoordinate(1, p2);
    var x0$1 = p1.x;
    p2.x -= x0$1;
    var sum$1 = 0.0;
    for (var i$1 = 1; i$1 < n - 1; i$1++) {
      p0.y = p1.y;
      p1.x = p2.x;
      p1.y = p2.y;
      ring$1.getCoordinate(i$1 + 1, p2);
      p2.x -= x0$1;
      sum$1 += p1.x * (p0.y - p2.y);
    }
    return sum$1 / 2.0
  }
};
CGAlgorithms.distanceLineLine = function distanceLineLine (A, B, C, D) {
  if (A.equals(B)) { return CGAlgorithms.distancePointLine(A, C, D) }
  if (C.equals(D)) { return CGAlgorithms.distancePointLine(D, A, B) }
  var noIntersection = false;
  if (!Envelope.intersects(A, B, C, D)) {
    noIntersection = true;
  } else {
    var denom = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);
    if (denom === 0) {
      noIntersection = true;
    } else {
      var rNumb = (A.y - C.y) * (D.x - C.x) - (A.x - C.x) * (D.y - C.y);
      var sNum = (A.y - C.y) * (B.x - A.x) - (A.x - C.x) * (B.y - A.y);
      var s = sNum / denom;
      var r = rNumb / denom;
      if (r < 0 || r > 1 || s < 0 || s > 1) {
        noIntersection = true;
      }
    }
  }
  if (noIntersection) {
    return MathUtil.min(CGAlgorithms.distancePointLine(A, C, D), CGAlgorithms.distancePointLine(B, C, D), CGAlgorithms.distancePointLine(C, A, B), CGAlgorithms.distancePointLine(D, A, B))
  }
  return 0.0
};
CGAlgorithms.isPointInRing = function isPointInRing (p, ring) {
  return CGAlgorithms.locatePointInRing(p, ring) !== Location.EXTERIOR
};
CGAlgorithms.computeLength = function computeLength (pts) {
  var n = pts.size();
  if (n <= 1) { return 0.0 }
  var len = 0.0;
  var p = new Coordinate();
  pts.getCoordinate(0, p);
  var x0 = p.x;
  var y0 = p.y;
  for (var i = 1; i < n; i++) {
    pts.getCoordinate(i, p);
    var x1 = p.x;
    var y1 = p.y;
    var dx = x1 - x0;
    var dy = y1 - y0;
    len += Math.sqrt(dx * dx + dy * dy);
    x0 = x1;
    y0 = y1;
  }
  return len
};
CGAlgorithms.isCCW = function isCCW (ring) {
  var nPts = ring.length - 1;
  if (nPts < 3) { throw new IllegalArgumentException('Ring has fewer than 4 points, so orientation cannot be determined') }
  var hiPt = ring[0];
  var hiIndex = 0;
  for (var i = 1; i <= nPts; i++) {
    var p = ring[i];
    if (p.y > hiPt.y) {
      hiPt = p;
      hiIndex = i;
    }
  }
  var iPrev = hiIndex;
  do {
    iPrev = iPrev - 1;
    if (iPrev < 0) { iPrev = nPts; }
  } while (ring[iPrev].equals2D(hiPt) && iPrev !== hiIndex)
  var iNext = hiIndex;
  do {
    iNext = (iNext + 1) % nPts;
  } while (ring[iNext].equals2D(hiPt) && iNext !== hiIndex)
  var prev = ring[iPrev];
  var next = ring[iNext];
  if (prev.equals2D(hiPt) || next.equals2D(hiPt) || prev.equals2D(next)) { return false }
  var disc = CGAlgorithms.computeOrientation(prev, hiPt, next);
  var isCCW = false;
  if (disc === 0) {
    isCCW = prev.x > next.x;
  } else {
    isCCW = disc > 0;
  }
  return isCCW
};
CGAlgorithms.locatePointInRing = function locatePointInRing (p, ring) {
  return RayCrossingCounter.locatePointInRing(p, ring)
};
CGAlgorithms.distancePointLinePerpendicular = function distancePointLinePerpendicular (p, A, B) {
  var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
  var s = ((A.y - p.y) * (B.x - A.x) - (A.x - p.x) * (B.y - A.y)) / len2;
  return Math.abs(s) * Math.sqrt(len2)
};
CGAlgorithms.computeOrientation = function computeOrientation (p1, p2, q) {
  return CGAlgorithms.orientationIndex(p1, p2, q)
};
CGAlgorithms.distancePointLine = function distancePointLine () {
  if (arguments.length === 2) {
    var p = arguments[0];
    var line = arguments[1];
    if (line.length === 0) { throw new IllegalArgumentException('Line array must contain at least one vertex') }
    var minDistance = p.distance(line[0]);
    for (var i = 0; i < line.length - 1; i++) {
      var dist = CGAlgorithms.distancePointLine(p, line[i], line[i + 1]);
      if (dist < minDistance) {
        minDistance = dist;
      }
    }
    return minDistance
  } else if (arguments.length === 3) {
    var p$1 = arguments[0];
    var A = arguments[1];
    var B = arguments[2];
    if (A.x === B.x && A.y === B.y) { return p$1.distance(A) }
    var len2 = (B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y);
    var r = ((p$1.x - A.x) * (B.x - A.x) + (p$1.y - A.y) * (B.y - A.y)) / len2;
    if (r <= 0.0) { return p$1.distance(A) }
    if (r >= 1.0) { return p$1.distance(B) }
    var s = ((A.y - p$1.y) * (B.x - A.x) - (A.x - p$1.x) * (B.y - A.y)) / len2;
    return Math.abs(s) * Math.sqrt(len2)
  }
};
CGAlgorithms.isOnLine = function isOnLine (p, pt) {
  var lineIntersector = new RobustLineIntersector();
  for (var i = 1; i < pt.length; i++) {
    var p0 = pt[i - 1];
    var p1 = pt[i];
    lineIntersector.computeIntersection(p, p0, p1);
    if (lineIntersector.hasIntersection()) {
      return true
    }
  }
  return false
};
staticAccessors$3.CLOCKWISE.get = function () { return -1 };
staticAccessors$3.RIGHT.get = function () { return CGAlgorithms.CLOCKWISE };
staticAccessors$3.COUNTERCLOCKWISE.get = function () { return 1 };
staticAccessors$3.LEFT.get = function () { return CGAlgorithms.COUNTERCLOCKWISE };
staticAccessors$3.COLLINEAR.get = function () { return 0 };
staticAccessors$3.STRAIGHT.get = function () { return CGAlgorithms.COLLINEAR };

Object.defineProperties( CGAlgorithms, staticAccessors$3 );

var GeometryComponentFilter = function GeometryComponentFilter () {};

GeometryComponentFilter.prototype.filter = function filter (geom) {};
GeometryComponentFilter.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryComponentFilter.prototype.getClass = function getClass () {
  return GeometryComponentFilter
};

var Geometry = function Geometry () {
  var factory = arguments[0];

  this._envelope = null;
  this._factory = null;
  this._SRID = null;
  this._userData = null;
  this._factory = factory;
  this._SRID = factory.getSRID();
};

var staticAccessors$11 = { serialVersionUID: { configurable: true },SORTINDEX_POINT: { configurable: true },SORTINDEX_MULTIPOINT: { configurable: true },SORTINDEX_LINESTRING: { configurable: true },SORTINDEX_LINEARRING: { configurable: true },SORTINDEX_MULTILINESTRING: { configurable: true },SORTINDEX_POLYGON: { configurable: true },SORTINDEX_MULTIPOLYGON: { configurable: true },SORTINDEX_GEOMETRYCOLLECTION: { configurable: true },geometryChangedFilter: { configurable: true } };
Geometry.prototype.isGeometryCollection = function isGeometryCollection () {
  return this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION
};
Geometry.prototype.getFactory = function getFactory () {
  return this._factory
};
Geometry.prototype.getGeometryN = function getGeometryN (n) {
  return this
};
Geometry.prototype.getArea = function getArea () {
  return 0.0
};
Geometry.prototype.isRectangle = function isRectangle () {
  return false
};
Geometry.prototype.equals = function equals () {
  if (arguments[0] instanceof Geometry) {
    var g$1 = arguments[0];
    if (g$1 === null) { return false }
    return this.equalsTopo(g$1)
  } else if (arguments[0] instanceof Object) {
    var o = arguments[0];
    if (!(o instanceof Geometry)) { return false }
    var g = o;
    return this.equalsExact(g)
  }
};
Geometry.prototype.equalsExact = function equalsExact (other) {
  return this === other || this.equalsExact(other, 0)
};
Geometry.prototype.geometryChanged = function geometryChanged () {
  this.apply(Geometry.geometryChangedFilter);
};
Geometry.prototype.geometryChangedAction = function geometryChangedAction () {
  this._envelope = null;
};
Geometry.prototype.equalsNorm = function equalsNorm (g) {
  if (g === null) { return false }
  return this.norm().equalsExact(g.norm())
};
Geometry.prototype.getLength = function getLength () {
  return 0.0
};
Geometry.prototype.getNumGeometries = function getNumGeometries () {
  return 1
};
Geometry.prototype.compareTo = function compareTo () {
  if (arguments.length === 1) {
    var o = arguments[0];
    var other = o;
    if (this.getSortIndex() !== other.getSortIndex()) {
      return this.getSortIndex() - other.getSortIndex()
    }
    if (this.isEmpty() && other.isEmpty()) {
      return 0
    }
    if (this.isEmpty()) {
      return -1
    }
    if (other.isEmpty()) {
      return 1
    }
    return this.compareToSameClass(o)
  } else if (arguments.length === 2) {
    var other$1 = arguments[0];
    var comp = arguments[1];
    if (this.getSortIndex() !== other$1.getSortIndex()) {
      return this.getSortIndex() - other$1.getSortIndex()
    }
    if (this.isEmpty() && other$1.isEmpty()) {
      return 0
    }
    if (this.isEmpty()) {
      return -1
    }
    if (other$1.isEmpty()) {
      return 1
    }
    return this.compareToSameClass(other$1, comp)
  }
};
Geometry.prototype.getUserData = function getUserData () {
  return this._userData
};
Geometry.prototype.getSRID = function getSRID () {
  return this._SRID
};
Geometry.prototype.getEnvelope = function getEnvelope () {
  return this.getFactory().toGeometry(this.getEnvelopeInternal())
};
Geometry.prototype.checkNotGeometryCollection = function checkNotGeometryCollection (g) {
  if (g.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION) {
    throw new IllegalArgumentException('This method does not support GeometryCollection arguments')
  }
};
Geometry.prototype.equal = function equal (a, b, tolerance) {
  if (tolerance === 0) {
    return a.equals(b)
  }
  return a.distance(b) <= tolerance
};
Geometry.prototype.norm = function norm () {
  var copy = this.copy();
  copy.normalize();
  return copy
};
Geometry.prototype.getPrecisionModel = function getPrecisionModel () {
  return this._factory.getPrecisionModel()
};
Geometry.prototype.getEnvelopeInternal = function getEnvelopeInternal () {
  if (this._envelope === null) {
    this._envelope = this.computeEnvelopeInternal();
  }
  return new Envelope(this._envelope)
};
Geometry.prototype.setSRID = function setSRID (SRID) {
  this._SRID = SRID;
};
Geometry.prototype.setUserData = function setUserData (userData) {
  this._userData = userData;
};
Geometry.prototype.compare = function compare (a, b) {
  var i = a.iterator();
  var j = b.iterator();
  while (i.hasNext() && j.hasNext()) {
    var aElement = i.next();
    var bElement = j.next();
    var comparison = aElement.compareTo(bElement);
    if (comparison !== 0) {
      return comparison
    }
  }
  if (i.hasNext()) {
    return 1
  }
  if (j.hasNext()) {
    return -1
  }
  return 0
};
Geometry.prototype.hashCode = function hashCode () {
  return this.getEnvelopeInternal().hashCode()
};
Geometry.prototype.isGeometryCollectionOrDerived = function isGeometryCollectionOrDerived () {
  if (this.getSortIndex() === Geometry.SORTINDEX_GEOMETRYCOLLECTION || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOINT || this.getSortIndex() === Geometry.SORTINDEX_MULTILINESTRING || this.getSortIndex() === Geometry.SORTINDEX_MULTIPOLYGON) {
    return true
  }
  return false
};
Geometry.prototype.interfaces_ = function interfaces_ () {
  return [Clonable, Comparable, Serializable]
};
Geometry.prototype.getClass = function getClass () {
  return Geometry
};
Geometry.hasNonEmptyElements = function hasNonEmptyElements (geometries) {
  for (var i = 0; i < geometries.length; i++) {
    if (!geometries[i].isEmpty()) {
      return true
    }
  }
  return false
};
Geometry.hasNullElements = function hasNullElements (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === null) {
      return true
    }
  }
  return false
};
staticAccessors$11.serialVersionUID.get = function () { return 8763622679187376702 };
staticAccessors$11.SORTINDEX_POINT.get = function () { return 0 };
staticAccessors$11.SORTINDEX_MULTIPOINT.get = function () { return 1 };
staticAccessors$11.SORTINDEX_LINESTRING.get = function () { return 2 };
staticAccessors$11.SORTINDEX_LINEARRING.get = function () { return 3 };
staticAccessors$11.SORTINDEX_MULTILINESTRING.get = function () { return 4 };
staticAccessors$11.SORTINDEX_POLYGON.get = function () { return 5 };
staticAccessors$11.SORTINDEX_MULTIPOLYGON.get = function () { return 6 };
staticAccessors$11.SORTINDEX_GEOMETRYCOLLECTION.get = function () { return 7 };
staticAccessors$11.geometryChangedFilter.get = function () { return geometryChangedFilter };

Object.defineProperties( Geometry, staticAccessors$11 );

var geometryChangedFilter = function geometryChangedFilter () {};

geometryChangedFilter.interfaces_ = function interfaces_ () {
  return [GeometryComponentFilter]
};
geometryChangedFilter.filter = function filter (geom) {
  geom.geometryChangedAction();
};

var CoordinateFilter = function CoordinateFilter () {};

CoordinateFilter.prototype.filter = function filter (coord) {};
CoordinateFilter.prototype.interfaces_ = function interfaces_ () {
  return []
};
CoordinateFilter.prototype.getClass = function getClass () {
  return CoordinateFilter
};

var BoundaryNodeRule = function BoundaryNodeRule () {};

var staticAccessors$12 = { Mod2BoundaryNodeRule: { configurable: true },EndPointBoundaryNodeRule: { configurable: true },MultiValentEndPointBoundaryNodeRule: { configurable: true },MonoValentEndPointBoundaryNodeRule: { configurable: true },MOD2_BOUNDARY_RULE: { configurable: true },ENDPOINT_BOUNDARY_RULE: { configurable: true },MULTIVALENT_ENDPOINT_BOUNDARY_RULE: { configurable: true },MONOVALENT_ENDPOINT_BOUNDARY_RULE: { configurable: true },OGC_SFS_BOUNDARY_RULE: { configurable: true } };

BoundaryNodeRule.prototype.isInBoundary = function isInBoundary (boundaryCount) {};
BoundaryNodeRule.prototype.interfaces_ = function interfaces_ () {
  return []
};
BoundaryNodeRule.prototype.getClass = function getClass () {
  return BoundaryNodeRule
};
staticAccessors$12.Mod2BoundaryNodeRule.get = function () { return Mod2BoundaryNodeRule };
staticAccessors$12.EndPointBoundaryNodeRule.get = function () { return EndPointBoundaryNodeRule };
staticAccessors$12.MultiValentEndPointBoundaryNodeRule.get = function () { return MultiValentEndPointBoundaryNodeRule };
staticAccessors$12.MonoValentEndPointBoundaryNodeRule.get = function () { return MonoValentEndPointBoundaryNodeRule };
staticAccessors$12.MOD2_BOUNDARY_RULE.get = function () { return new Mod2BoundaryNodeRule() };
staticAccessors$12.ENDPOINT_BOUNDARY_RULE.get = function () { return new EndPointBoundaryNodeRule() };
staticAccessors$12.MULTIVALENT_ENDPOINT_BOUNDARY_RULE.get = function () { return new MultiValentEndPointBoundaryNodeRule() };
staticAccessors$12.MONOVALENT_ENDPOINT_BOUNDARY_RULE.get = function () { return new MonoValentEndPointBoundaryNodeRule() };
staticAccessors$12.OGC_SFS_BOUNDARY_RULE.get = function () { return BoundaryNodeRule.MOD2_BOUNDARY_RULE };

Object.defineProperties( BoundaryNodeRule, staticAccessors$12 );

var Mod2BoundaryNodeRule = function Mod2BoundaryNodeRule () {};

Mod2BoundaryNodeRule.prototype.isInBoundary = function isInBoundary (boundaryCount) {
  return boundaryCount % 2 === 1
};
Mod2BoundaryNodeRule.prototype.interfaces_ = function interfaces_ () {
  return [BoundaryNodeRule]
};
Mod2BoundaryNodeRule.prototype.getClass = function getClass () {
  return Mod2BoundaryNodeRule
};

var EndPointBoundaryNodeRule = function EndPointBoundaryNodeRule () {};

EndPointBoundaryNodeRule.prototype.isInBoundary = function isInBoundary (boundaryCount) {
  return boundaryCount > 0
};
EndPointBoundaryNodeRule.prototype.interfaces_ = function interfaces_ () {
  return [BoundaryNodeRule]
};
EndPointBoundaryNodeRule.prototype.getClass = function getClass () {
  return EndPointBoundaryNodeRule
};

var MultiValentEndPointBoundaryNodeRule = function MultiValentEndPointBoundaryNodeRule () {};

MultiValentEndPointBoundaryNodeRule.prototype.isInBoundary = function isInBoundary (boundaryCount) {
  return boundaryCount > 1
};
MultiValentEndPointBoundaryNodeRule.prototype.interfaces_ = function interfaces_ () {
  return [BoundaryNodeRule]
};
MultiValentEndPointBoundaryNodeRule.prototype.getClass = function getClass () {
  return MultiValentEndPointBoundaryNodeRule
};

var MonoValentEndPointBoundaryNodeRule = function MonoValentEndPointBoundaryNodeRule () {};

MonoValentEndPointBoundaryNodeRule.prototype.isInBoundary = function isInBoundary (boundaryCount) {
  return boundaryCount === 1
};
MonoValentEndPointBoundaryNodeRule.prototype.interfaces_ = function interfaces_ () {
  return [BoundaryNodeRule]
};
MonoValentEndPointBoundaryNodeRule.prototype.getClass = function getClass () {
  return MonoValentEndPointBoundaryNodeRule
};

// import Iterator from './Iterator'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Collection.html
 *
 * @constructor
 * @private
 */
var Collection = function Collection () {};

Collection.prototype.add = function add () {};

/**
 * Appends all of the elements in the specified collection to the end of this
 * list, in the order that they are returned by the specified collection's
 * iterator (optional operation).
 * @param {javascript.util.Collection} c
 * @return {boolean}
 */
Collection.prototype.addAll = function addAll () {};

/**
 * Returns true if this collection contains no elements.
 * @return {boolean}
 */
Collection.prototype.isEmpty = function isEmpty () {};

/**
 * Returns an iterator over the elements in this collection.
 * @return {javascript.util.Iterator}
 */
Collection.prototype.iterator = function iterator () {};

/**
 * Returns an iterator over the elements in this collection.
 * @return {number}
 */
Collection.prototype.size = function size () {};

/**
 * Returns an array containing all of the elements in this collection.
 * @return {Array}
 */
Collection.prototype.toArray = function toArray () {};

/**
 * Removes a single instance of the specified element from this collection if it
 * is present. (optional)
 * @param {Object} e
 * @return {boolean}
 */
Collection.prototype.remove = function remove () {};

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
function IndexOutOfBoundsException (message) {
  this.message = message || '';
}
IndexOutOfBoundsException.prototype = new Error();

/**
 * @type {string}
 */
IndexOutOfBoundsException.prototype.name = 'IndexOutOfBoundsException';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Iterator.html
 * @constructor
 * @private
 */
var Iterator = function Iterator () {};

Iterator.prototype.hasNext = function hasNext () {};

/**
 * Returns the next element in the iteration.
 * @return {Object}
 */
Iterator.prototype.next = function next () {};

/**
 * Removes from the underlying collection the last element returned by the
 * iterator (optional operation).
 */
Iterator.prototype.remove = function remove () {};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/List.html
 *
 * @extends {javascript.util.Collection}
 * @constructor
 * @private
 */
var List = (function (Collection$$1) {
  function List () {
    Collection$$1.apply(this, arguments);
  }

  if ( Collection$$1 ) List.__proto__ = Collection$$1;
  List.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
  List.prototype.constructor = List;

  List.prototype.get = function get () { };

  /**
   * Replaces the element at the specified position in this list with the
   * specified element (optional operation).
   * @param {number} index
   * @param {Object} e
   * @return {Object}
   */
  List.prototype.set = function set () { };

  /**
   * Returns true if this collection contains no elements.
   * @return {boolean}
   */
  List.prototype.isEmpty = function isEmpty () { };

  return List;
}(Collection));

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
function NoSuchElementException (message) {
  this.message = message || '';
}
NoSuchElementException.prototype = new Error();

/**
 * @type {string}
 */
NoSuchElementException.prototype.name = 'NoSuchElementException';

// import OperationNotSupported from './OperationNotSupported'

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/ArrayList.html
 *
 * @extends List
 * @private
 */
var ArrayList = (function (List$$1) {
  function ArrayList () {
    List$$1.call(this);
    this.array_ = [];

    if (arguments[0] instanceof Collection) {
      this.addAll(arguments[0]);
    }
  }

  if ( List$$1 ) ArrayList.__proto__ = List$$1;
  ArrayList.prototype = Object.create( List$$1 && List$$1.prototype );
  ArrayList.prototype.constructor = ArrayList;

  ArrayList.prototype.ensureCapacity = function ensureCapacity () {};
  ArrayList.prototype.interfaces_ = function interfaces_ () { return [List$$1, Collection] };

  /**
   * @override
   */
  ArrayList.prototype.add = function add (e) {
    if (arguments.length === 1) {
      this.array_.push(e);
    } else {
      this.array_.splice(arguments[0], arguments[1]);
    }
    return true
  };

  ArrayList.prototype.clear = function clear () {
    this.array_ = [];
  };

  /**
   * @override
   */
  ArrayList.prototype.addAll = function addAll (c) {
    var this$1 = this;

    for (var i = c.iterator(); i.hasNext();) {
      this$1.add(i.next());
    }
    return true
  };

  /**
   * @override
   */
  ArrayList.prototype.set = function set (index, element) {
    var oldElement = this.array_[index];
    this.array_[index] = element;
    return oldElement
  };

  /**
   * @override
   */
  ArrayList.prototype.iterator = function iterator () {
    return new Iterator_(this)
  };

  /**
   * @override
   */
  ArrayList.prototype.get = function get (index) {
    if (index < 0 || index >= this.size()) {
      throw new IndexOutOfBoundsException()
    }

    return this.array_[index]
  };

  /**
   * @override
   */
  ArrayList.prototype.isEmpty = function isEmpty () {
    return this.array_.length === 0
  };

  /**
   * @override
   */
  ArrayList.prototype.size = function size () {
    return this.array_.length
  };

  /**
   * @override
   */
  ArrayList.prototype.toArray = function toArray () {
    var this$1 = this;

    var array = [];

    for (var i = 0, len = this.array_.length; i < len; i++) {
      array.push(this$1.array_[i]);
    }

    return array
  };

  /**
   * @override
   */
  ArrayList.prototype.remove = function remove (o) {
    var this$1 = this;

    var found = false;

    for (var i = 0, len = this.array_.length; i < len; i++) {
      if (this$1.array_[i] === o) {
        this$1.array_.splice(i, 1);
        found = true;
        break
      }
    }

    return found
  };

  return ArrayList;
}(List));

/**
 * @extends {Iterator}
 * @param {ArrayList} arrayList
 * @constructor
 * @private
 */
var Iterator_ = (function (Iterator$$1) {
  function Iterator_ (arrayList) {
    Iterator$$1.call(this);
    /**
     * @type {ArrayList}
     * @private
    */
    this.arrayList_ = arrayList;
    /**
     * @type {number}
     * @private
    */
    this.position_ = 0;
  }

  if ( Iterator$$1 ) Iterator_.__proto__ = Iterator$$1;
  Iterator_.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
  Iterator_.prototype.constructor = Iterator_;

  /**
   * @override
   */
  Iterator_.prototype.next = function next () {
    if (this.position_ === this.arrayList_.size()) {
      throw new NoSuchElementException()
    }
    return this.arrayList_.get(this.position_++)
  };

  /**
   * @override
   */
  Iterator_.prototype.hasNext = function hasNext () {
    if (this.position_ < this.arrayList_.size()) {
      return true
    } else {
      return false
    }
  };

  /**
   * TODO: should be in ListIterator
   * @override
   */
  Iterator_.prototype.set = function set (element) {
    return this.arrayList_.set(this.position_ - 1, element)
  };

  /**
   * @override
   */
  Iterator_.prototype.remove = function remove () {
    this.arrayList_.remove(this.arrayList_.get(this.position_));
  };

  return Iterator_;
}(Iterator));

var CoordinateList = (function (ArrayList$$1) {
  function CoordinateList () {
    ArrayList$$1.call(this);
    if (arguments.length === 0) {
    } else if (arguments.length === 1) {
      var coord = arguments[0];
      this.ensureCapacity(coord.length);
      this.add(coord, true);
    } else if (arguments.length === 2) {
      var coord$1 = arguments[0];
      var allowRepeated = arguments[1];
      this.ensureCapacity(coord$1.length);
      this.add(coord$1, allowRepeated);
    }
  }

  if ( ArrayList$$1 ) CoordinateList.__proto__ = ArrayList$$1;
  CoordinateList.prototype = Object.create( ArrayList$$1 && ArrayList$$1.prototype );
  CoordinateList.prototype.constructor = CoordinateList;

  var staticAccessors = { coordArrayType: { configurable: true } };
  staticAccessors.coordArrayType.get = function () { return new Array(0).fill(null) };
  CoordinateList.prototype.getCoordinate = function getCoordinate (i) {
    return this.get(i)
  };
  CoordinateList.prototype.addAll = function addAll () {
    var this$1 = this;

    if (arguments.length === 2) {
      var coll = arguments[0];
      var allowRepeated = arguments[1];
      var isChanged = false;
      for (var i = coll.iterator(); i.hasNext();) {
        this$1.add(i.next(), allowRepeated);
        isChanged = true;
      }
      return isChanged
    } else { return ArrayList$$1.prototype.addAll.apply(this, arguments) }
  };
  CoordinateList.prototype.clone = function clone () {
    var this$1 = this;

    var clone = ArrayList$$1.prototype.clone.call(this);
    for (var i = 0; i < this.size(); i++) {
      clone.add(i, this$1.get(i).copy());
    }
    return clone
  };
  CoordinateList.prototype.toCoordinateArray = function toCoordinateArray () {
    return this.toArray(CoordinateList.coordArrayType)
  };
  CoordinateList.prototype.add = function add () {
    var this$1 = this;

    if (arguments.length === 1) {
      var coord = arguments[0];
      ArrayList$$1.prototype.add.call(this, coord);
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof Array && typeof arguments[1] === 'boolean') {
        var coord$1 = arguments[0];
        var allowRepeated = arguments[1];
        this.add(coord$1, allowRepeated, true);
        return true
      } else if (arguments[0] instanceof Coordinate && typeof arguments[1] === 'boolean') {
        var coord$2 = arguments[0];
        var allowRepeated$1 = arguments[1];
        if (!allowRepeated$1) {
          if (this.size() >= 1) {
            var last = this.get(this.size() - 1);
            if (last.equals2D(coord$2)) { return null }
          }
        }
        ArrayList$$1.prototype.add.call(this, coord$2);
      } else if (arguments[0] instanceof Object && typeof arguments[1] === 'boolean') {
        var obj = arguments[0];
        var allowRepeated$2 = arguments[1];
        this.add(obj, allowRepeated$2);
        return true
      }
    } else if (arguments.length === 3) {
      if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof Array && typeof arguments[1] === 'boolean')) {
        var coord$3 = arguments[0];
        var allowRepeated$3 = arguments[1];
        var direction = arguments[2];
        if (direction) {
          for (var i$1 = 0; i$1 < coord$3.length; i$1++) {
            this$1.add(coord$3[i$1], allowRepeated$3);
          }
        } else {
          for (var i$2 = coord$3.length - 1; i$2 >= 0; i$2--) {
            this$1.add(coord$3[i$2], allowRepeated$3);
          }
        }
        return true
      } else if (typeof arguments[2] === 'boolean' && (Number.isInteger(arguments[0]) && arguments[1] instanceof Coordinate)) {
        var i$3 = arguments[0];
        var coord$4 = arguments[1];
        var allowRepeated$4 = arguments[2];
        if (!allowRepeated$4) {
          var size = this.size();
          if (size > 0) {
            if (i$3 > 0) {
              var prev = this.get(i$3 - 1);
              if (prev.equals2D(coord$4)) { return null }
            }
            if (i$3 < size) {
              var next = this.get(i$3);
              if (next.equals2D(coord$4)) { return null }
            }
          }
        }
        ArrayList$$1.prototype.add.call(this, i$3, coord$4);
      }
    } else if (arguments.length === 4) {
      var coord$5 = arguments[0];
      var allowRepeated$5 = arguments[1];
      var start = arguments[2];
      var end = arguments[3];
      var inc = 1;
      if (start > end) { inc = -1; }
      for (var i = start; i !== end; i += inc) {
        this$1.add(coord$5[i], allowRepeated$5);
      }
      return true
    }
  };
  CoordinateList.prototype.closeRing = function closeRing () {
    if (this.size() > 0) { this.add(new Coordinate(this.get(0)), false); }
  };
  CoordinateList.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  CoordinateList.prototype.getClass = function getClass () {
    return CoordinateList
  };

  Object.defineProperties( CoordinateList, staticAccessors );

  return CoordinateList;
}(ArrayList));

var CoordinateArrays = function CoordinateArrays () {};

var staticAccessors$13 = { ForwardComparator: { configurable: true },BidirectionalComparator: { configurable: true },coordArrayType: { configurable: true } };

staticAccessors$13.ForwardComparator.get = function () { return ForwardComparator };
staticAccessors$13.BidirectionalComparator.get = function () { return BidirectionalComparator };
staticAccessors$13.coordArrayType.get = function () { return new Array(0).fill(null) };

CoordinateArrays.prototype.interfaces_ = function interfaces_ () {
  return []
};
CoordinateArrays.prototype.getClass = function getClass () {
  return CoordinateArrays
};
CoordinateArrays.isRing = function isRing (pts) {
  if (pts.length < 4) { return false }
  if (!pts[0].equals2D(pts[pts.length - 1])) { return false }
  return true
};
CoordinateArrays.ptNotInList = function ptNotInList (testPts, pts) {
  for (var i = 0; i < testPts.length; i++) {
    var testPt = testPts[i];
    if (CoordinateArrays.indexOf(testPt, pts) < 0) { return testPt }
  }
  return null
};
CoordinateArrays.scroll = function scroll (coordinates, firstCoordinate) {
  var i = CoordinateArrays.indexOf(firstCoordinate, coordinates);
  if (i < 0) { return null }
  var newCoordinates = new Array(coordinates.length).fill(null);
  System.arraycopy(coordinates, i, newCoordinates, 0, coordinates.length - i);
  System.arraycopy(coordinates, 0, newCoordinates, coordinates.length - i, i);
  System.arraycopy(newCoordinates, 0, coordinates, 0, coordinates.length);
};
CoordinateArrays.equals = function equals () {
  if (arguments.length === 2) {
    var coord1 = arguments[0];
    var coord2 = arguments[1];
    if (coord1 === coord2) { return true }
    if (coord1 === null || coord2 === null) { return false }
    if (coord1.length !== coord2.length) { return false }
    for (var i = 0; i < coord1.length; i++) {
      if (!coord1[i].equals(coord2[i])) { return false }
    }
    return true
  } else if (arguments.length === 3) {
    var coord1$1 = arguments[0];
    var coord2$1 = arguments[1];
    var coordinateComparator = arguments[2];
    if (coord1$1 === coord2$1) { return true }
    if (coord1$1 === null || coord2$1 === null) { return false }
    if (coord1$1.length !== coord2$1.length) { return false }
    for (var i$1 = 0; i$1 < coord1$1.length; i$1++) {
      if (coordinateComparator.compare(coord1$1[i$1], coord2$1[i$1]) !== 0) { return false }
    }
    return true
  }
};
CoordinateArrays.intersection = function intersection (coordinates, env) {
  var coordList = new CoordinateList();
  for (var i = 0; i < coordinates.length; i++) {
    if (env.intersects(coordinates[i])) { coordList.add(coordinates[i], true); }
  }
  return coordList.toCoordinateArray()
};
CoordinateArrays.hasRepeatedPoints = function hasRepeatedPoints (coord) {
  for (var i = 1; i < coord.length; i++) {
    if (coord[i - 1].equals(coord[i])) {
      return true
    }
  }
  return false
};
CoordinateArrays.removeRepeatedPoints = function removeRepeatedPoints (coord) {
  if (!CoordinateArrays.hasRepeatedPoints(coord)) { return coord }
  var coordList = new CoordinateList(coord, false);
  return coordList.toCoordinateArray()
};
CoordinateArrays.reverse = function reverse (coord) {
  var last = coord.length - 1;
  var mid = Math.trunc(last / 2);
  for (var i = 0; i <= mid; i++) {
    var tmp = coord[i];
    coord[i] = coord[last - i];
    coord[last - i] = tmp;
  }
};
CoordinateArrays.removeNull = function removeNull (coord) {
  var nonNull = 0;
  for (var i = 0; i < coord.length; i++) {
    if (coord[i] !== null) { nonNull++; }
  }
  var newCoord = new Array(nonNull).fill(null);
  if (nonNull === 0) { return newCoord }
  var j = 0;
  for (var i$1 = 0; i$1 < coord.length; i$1++) {
    if (coord[i$1] !== null) { newCoord[j++] = coord[i$1]; }
  }
  return newCoord
};
CoordinateArrays.copyDeep = function copyDeep () {
  if (arguments.length === 1) {
    var coordinates = arguments[0];
    var copy = new Array(coordinates.length).fill(null);
    for (var i = 0; i < coordinates.length; i++) {
      copy[i] = new Coordinate(coordinates[i]);
    }
    return copy
  } else if (arguments.length === 5) {
    var src = arguments[0];
    var srcStart = arguments[1];
    var dest = arguments[2];
    var destStart = arguments[3];
    var length = arguments[4];
    for (var i$1 = 0; i$1 < length; i$1++) {
      dest[destStart + i$1] = new Coordinate(src[srcStart + i$1]);
    }
  }
};
CoordinateArrays.isEqualReversed = function isEqualReversed (pts1, pts2) {
  for (var i = 0; i < pts1.length; i++) {
    var p1 = pts1[i];
    var p2 = pts2[pts1.length - i - 1];
    if (p1.compareTo(p2) !== 0) { return false }
  }
  return true
};
CoordinateArrays.envelope = function envelope (coordinates) {
  var env = new Envelope();
  for (var i = 0; i < coordinates.length; i++) {
    env.expandToInclude(coordinates[i]);
  }
  return env
};
CoordinateArrays.toCoordinateArray = function toCoordinateArray (coordList) {
  return coordList.toArray(CoordinateArrays.coordArrayType)
};
CoordinateArrays.atLeastNCoordinatesOrNothing = function atLeastNCoordinatesOrNothing (n, c) {
  return c.length >= n ? c : []
};
CoordinateArrays.indexOf = function indexOf (coordinate, coordinates) {
  for (var i = 0; i < coordinates.length; i++) {
    if (coordinate.equals(coordinates[i])) {
      return i
    }
  }
  return -1
};
CoordinateArrays.increasingDirection = function increasingDirection (pts) {
  for (var i = 0; i < Math.trunc(pts.length / 2); i++) {
    var j = pts.length - 1 - i;
    var comp = pts[i].compareTo(pts[j]);
    if (comp !== 0) { return comp }
  }
  return 1
};
CoordinateArrays.compare = function compare (pts1, pts2) {
  var i = 0;
  while (i < pts1.length && i < pts2.length) {
    var compare = pts1[i].compareTo(pts2[i]);
    if (compare !== 0) { return compare }
    i++;
  }
  if (i < pts2.length) { return -1 }
  if (i < pts1.length) { return 1 }
  return 0
};
CoordinateArrays.minCoordinate = function minCoordinate (coordinates) {
  var minCoord = null;
  for (var i = 0; i < coordinates.length; i++) {
    if (minCoord === null || minCoord.compareTo(coordinates[i]) > 0) {
      minCoord = coordinates[i];
    }
  }
  return minCoord
};
CoordinateArrays.extract = function extract (pts, start, end) {
  start = MathUtil.clamp(start, 0, pts.length);
  end = MathUtil.clamp(end, -1, pts.length);
  var npts = end - start + 1;
  if (end < 0) { npts = 0; }
  if (start >= pts.length) { npts = 0; }
  if (end < start) { npts = 0; }
  var extractPts = new Array(npts).fill(null);
  if (npts === 0) { return extractPts }
  var iPts = 0;
  for (var i = start; i <= end; i++) {
    extractPts[iPts++] = pts[i];
  }
  return extractPts
};

Object.defineProperties( CoordinateArrays, staticAccessors$13 );

var ForwardComparator = function ForwardComparator () {};

ForwardComparator.prototype.compare = function compare (o1, o2) {
  var pts1 = o1;
  var pts2 = o2;
  return CoordinateArrays.compare(pts1, pts2)
};
ForwardComparator.prototype.interfaces_ = function interfaces_ () {
  return [Comparator]
};
ForwardComparator.prototype.getClass = function getClass () {
  return ForwardComparator
};

var BidirectionalComparator = function BidirectionalComparator () {};

BidirectionalComparator.prototype.compare = function compare (o1, o2) {
  var pts1 = o1;
  var pts2 = o2;
  if (pts1.length < pts2.length) { return -1 }
  if (pts1.length > pts2.length) { return 1 }
  if (pts1.length === 0) { return 0 }
  var forwardComp = CoordinateArrays.compare(pts1, pts2);
  var isEqualRev = CoordinateArrays.isEqualReversed(pts1, pts2);
  if (isEqualRev) { return 0 }
  return forwardComp
};
BidirectionalComparator.prototype.OLDcompare = function OLDcompare (o1, o2) {
  var pts1 = o1;
  var pts2 = o2;
  if (pts1.length < pts2.length) { return -1 }
  if (pts1.length > pts2.length) { return 1 }
  if (pts1.length === 0) { return 0 }
  var dir1 = CoordinateArrays.increasingDirection(pts1);
  var dir2 = CoordinateArrays.increasingDirection(pts2);
  var i1 = dir1 > 0 ? 0 : pts1.length - 1;
  var i2 = dir2 > 0 ? 0 : pts1.length - 1;
  for (var i = 0; i < pts1.length; i++) {
    var comparePt = pts1[i1].compareTo(pts2[i2]);
    if (comparePt !== 0) { return comparePt }
    i1 += dir1;
    i2 += dir2;
  }
  return 0
};
BidirectionalComparator.prototype.interfaces_ = function interfaces_ () {
  return [Comparator]
};
BidirectionalComparator.prototype.getClass = function getClass () {
  return BidirectionalComparator
};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Map.html
 *
 * @constructor
 * @private
 */
var Map$1 = function Map () {};

Map$1.prototype.get = function get () {};
/**
 * Associates the specified value with the specified key in this map (optional
 * operation).
 * @param {Object} key
 * @param {Object} value
 * @return {Object}
 */
Map$1.prototype.put = function put () {};

/**
 * Returns the number of key-value mappings in this map.
 * @return {number}
 */
Map$1.prototype.size = function size () {};

/**
 * Returns a Collection view of the values contained in this map.
 * @return {javascript.util.Collection}
 */
Map$1.prototype.values = function values () {};

/**
 * Returns a {@link Set} view of the mappings contained in this map.
 * The set is backed by the map, so changes to the map are
 * reflected in the set, and vice-versa.If the map is modified
 * while an iteration over the set is in progress (except through
 * the iterator's own <tt>remove</tt> operation, or through the
 * <tt>setValue</tt> operation on a map entry returned by the
 * iterator) the results of the iteration are undefined.The set
 * supports element removal, which removes the corresponding
 * mapping from the map, via the <tt>Iterator.remove</tt>,
 * <tt>Set.remove</tt>, <tt>removeAll</tt>, <tt>retainAll</tt> and
 * <tt>clear</tt> operations.It does not support the
 * <tt>add</tt> or <tt>addAll</tt> operations.
 *
 * @return {Set} a set view of the mappings contained in this map
 */
Map$1.prototype.entrySet = function entrySet () {};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedMap.html
 *
 * @extends {Map}
 * @constructor
 * @private
 */
var SortedMap = (function (Map) {
	function SortedMap () {
		Map.apply(this, arguments);
	}if ( Map ) SortedMap.__proto__ = Map;
	SortedMap.prototype = Object.create( Map && Map.prototype );
	SortedMap.prototype.constructor = SortedMap;

	

	return SortedMap;
}(Map$1));

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
function OperationNotSupported (message) {
  this.message = message || '';
}
OperationNotSupported.prototype = new Error();

/**
 * @type {string}
 */
OperationNotSupported.prototype.name = 'OperationNotSupported';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Set.html
 *
 * @extends {Collection}
 * @constructor
 * @private
 */
function Set() {}
Set.prototype = new Collection();


/**
 * Returns true if this set contains the specified element. More formally,
 * returns true if and only if this set contains an element e such that (o==null ?
 * e==null : o.equals(e)).
 * @param {Object} e
 * @return {boolean}
 */
Set.prototype.contains = function() {};

/**
 * @see http://docs.oracle.com/javase/6/docs/api/java/util/HashSet.html
 *
 * @extends {javascript.util.Set}
 * @constructor
 * @private
 */
var HashSet = (function (Set$$1) {
  function HashSet () {
    Set$$1.call(this);
    this.array_ = [];

    if (arguments[0] instanceof Collection) {
      this.addAll(arguments[0]);
    }
  }

  if ( Set$$1 ) HashSet.__proto__ = Set$$1;
  HashSet.prototype = Object.create( Set$$1 && Set$$1.prototype );
  HashSet.prototype.constructor = HashSet;

  /**
   * @override
   */
  HashSet.prototype.contains = function contains (o) {
    var this$1 = this;

    for (var i = 0, len = this.array_.length; i < len; i++) {
      var e = this$1.array_[i];
      if (e === o) {
        return true
      }
    }
    return false
  };

  /**
   * @override
   */
  HashSet.prototype.add = function add (o) {
    if (this.contains(o)) {
      return false
    }

    this.array_.push(o);

    return true
  };

  /**
   * @override
   */
  HashSet.prototype.addAll = function addAll (c) {
    var this$1 = this;

    for (var i = c.iterator(); i.hasNext();) {
      this$1.add(i.next());
    }
    return true
  };

  /**
   * @override
   */
  HashSet.prototype.remove = function remove (o) {
    // throw new javascript.util.OperationNotSupported()
    throw new Error()
  };

  /**
   * @override
   */
  HashSet.prototype.size = function size () {
    return this.array_.length
  };

  /**
   * @override
   */
  HashSet.prototype.isEmpty = function isEmpty () {
    return this.array_.length === 0
  };

  /**
   * @override
   */
  HashSet.prototype.toArray = function toArray () {
    var this$1 = this;

    var array = [];

    for (var i = 0, len = this.array_.length; i < len; i++) {
      array.push(this$1.array_[i]);
    }

    return array
  };

  /**
   * @override
   */
  HashSet.prototype.iterator = function iterator () {
    return new Iterator_$1(this)
  };

  return HashSet;
}(Set));

/**
   * @extends {Iterator}
   * @param {HashSet} hashSet
   * @constructor
   * @private
   */
var Iterator_$1 = (function (Iterator$$1) {
  function Iterator_ (hashSet) {
    Iterator$$1.call(this);
    /**
     * @type {HashSet}
     * @private
     */
    this.hashSet_ = hashSet;
    /**
     * @type {number}
     * @private
     */
    this.position_ = 0;
  }

  if ( Iterator$$1 ) Iterator_.__proto__ = Iterator$$1;
  Iterator_.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
  Iterator_.prototype.constructor = Iterator_;

  /**
   * @override
   */
  Iterator_.prototype.next = function next () {
    if (this.position_ === this.hashSet_.size()) {
      throw new NoSuchElementException()
    }
    return this.hashSet_.array_[this.position_++]
  };

  /**
   * @override
   */
  Iterator_.prototype.hasNext = function hasNext () {
    if (this.position_ < this.hashSet_.size()) {
      return true
    } else {
      return false
    }
  };

  /**
   * @override
   */
  Iterator_.prototype.remove = function remove () {
    throw new OperationNotSupported()
  };

  return Iterator_;
}(Iterator));

var BLACK = 0;
var RED = 1;
function colorOf (p) { return (p === null ? BLACK : p.color) }
function parentOf (p) { return (p === null ? null : p.parent) }
function setColor (p, c) { if (p !== null) { p.color = c; } }
function leftOf (p) { return (p === null ? null : p.left) }
function rightOf (p) { return (p === null ? null : p.right) }

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeMap.html
 *
 * @extends {SortedMap}
 * @constructor
 * @private
 */
function TreeMap () {
  /**
   * @type {Object}
   * @private
   */
  this.root_ = null;
  /**
   * @type {number}
   * @private
  */
  this.size_ = 0;
}
TreeMap.prototype = new SortedMap();

/**
 * @override
 */
TreeMap.prototype.get = function (key) {
  var p = this.root_;
  while (p !== null) {
    var cmp = key['compareTo'](p.key);
    if (cmp < 0) { p = p.left; }
    else if (cmp > 0) { p = p.right; }
    else { return p.value }
  }
  return null
};

/**
 * @override
 */
TreeMap.prototype.put = function (key, value) {
  if (this.root_ === null) {
    this.root_ = {
      key: key,
      value: value,
      left: null,
      right: null,
      parent: null,
      color: BLACK,
      getValue: function getValue () { return this.value },
      getKey: function getKey () { return this.key }
    };
    this.size_ = 1;
    return null
  }
  var t = this.root_;
  var parent;
  var cmp;
  do {
    parent = t;
    cmp = key['compareTo'](t.key);
    if (cmp < 0) {
      t = t.left;
    } else if (cmp > 0) {
      t = t.right;
    } else {
      var oldValue = t.value;
      t.value = value;
      return oldValue
    }
  } while (t !== null)
  var e = {
    key: key,
    left: null,
    right: null,
    value: value,
    parent: parent,
    color: BLACK,
    getValue: function getValue () { return this.value },
    getKey: function getKey () { return this.key }
  };
  if (cmp < 0) {
    parent.left = e;
  } else {
    parent.right = e;
  }
  this.fixAfterInsertion(e);
  this.size_++;
  return null
};

/**
 * @param {Object} x
 */
TreeMap.prototype.fixAfterInsertion = function (x) {
  var this$1 = this;

  x.color = RED;
  while (x != null && x !== this.root_ && x.parent.color === RED) {
    if (parentOf(x) === leftOf(parentOf(parentOf(x)))) {
      var y = rightOf(parentOf(parentOf(x)));
      if (colorOf(y) === RED) {
        setColor(parentOf(x), BLACK);
        setColor(y, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x === rightOf(parentOf(x))) {
          x = parentOf(x);
          this$1.rotateLeft(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this$1.rotateRight(parentOf(parentOf(x)));
      }
    } else {
      var y$1 = leftOf(parentOf(parentOf(x)));
      if (colorOf(y$1) === RED) {
        setColor(parentOf(x), BLACK);
        setColor(y$1, BLACK);
        setColor(parentOf(parentOf(x)), RED);
        x = parentOf(parentOf(x));
      } else {
        if (x === leftOf(parentOf(x))) {
          x = parentOf(x);
          this$1.rotateRight(x);
        }
        setColor(parentOf(x), BLACK);
        setColor(parentOf(parentOf(x)), RED);
        this$1.rotateLeft(parentOf(parentOf(x)));
      }
    }
  }
  this.root_.color = BLACK;
};

/**
 * @override
 */
TreeMap.prototype.values = function () {
  var arrayList = new ArrayList();
  var p = this.getFirstEntry();
  if (p !== null) {
    arrayList.add(p.value);
    while ((p = TreeMap.successor(p)) !== null) {
      arrayList.add(p.value);
    }
  }
  return arrayList
};

/**
 * @override
 */
TreeMap.prototype.entrySet = function () {
  var hashSet = new HashSet();
  var p = this.getFirstEntry();
  if (p !== null) {
    hashSet.add(p);
    while ((p = TreeMap.successor(p)) !== null) {
      hashSet.add(p);
    }
  }
  return hashSet
};

/**
 * @param {Object} p
 */
TreeMap.prototype.rotateLeft = function (p) {
  if (p != null) {
    var r = p.right;
    p.right = r.left;
    if (r.left != null) { r.left.parent = p; }
    r.parent = p.parent;
    if (p.parent === null) { this.root_ = r; } else if (p.parent.left === p) { p.parent.left = r; } else { p.parent.right = r; }
    r.left = p;
    p.parent = r;
  }
};

/**
 * @param {Object} p
 */
TreeMap.prototype.rotateRight = function (p) {
  if (p != null) {
    var l = p.left;
    p.left = l.right;
    if (l.right != null) { l.right.parent = p; }
    l.parent = p.parent;
    if (p.parent === null) { this.root_ = l; } else if (p.parent.right === p) { p.parent.right = l; } else { p.parent.left = l; }
    l.right = p;
    p.parent = l;
  }
};

/**
 * @return {Object}
 */
TreeMap.prototype.getFirstEntry = function () {
  var p = this.root_;
  if (p != null) {
    while (p.left != null) {
      p = p.left;
    }
  }
  return p
};

/**
 * @param {Object} t
 * @return {Object}
 * @private
 */
TreeMap.successor = function (t) {
  if (t === null) { return null } else if (t.right !== null) {
    var p = t.right;
    while (p.left !== null) {
      p = p.left;
    }
    return p
  } else {
    var p$1 = t.parent;
    var ch = t;
    while (p$1 !== null && ch === p$1.right) {
      ch = p$1;
      p$1 = p$1.parent;
    }
    return p$1
  }
};

/**
 * @override
 */
TreeMap.prototype.size = function () {
  return this.size_
};

var Lineal = function Lineal () {};

Lineal.prototype.interfaces_ = function interfaces_ () {
  return []
};
Lineal.prototype.getClass = function getClass () {
  return Lineal
};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/SortedSet.html
 *
 * @extends {Set}
 * @constructor
 * @private
 */
function SortedSet () {}
SortedSet.prototype = new Set();

// import Iterator from './Iterator'
/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/TreeSet.html
 *
 * @extends {SortedSet}
 * @constructor
 * @private
 */
function TreeSet () {
  /**
   * @type {Array}
   * @private
  */
  this.array_ = [];

  if (arguments[0] instanceof Collection) {
    this.addAll(arguments[0]);
  }
}
TreeSet.prototype = new SortedSet();

/**
 * @override
 */
TreeSet.prototype.contains = function (o) {
  var this$1 = this;

  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this$1.array_[i];
    if (e['compareTo'](o) === 0) {
      return true
    }
  }
  return false
};

/**
 * @override
 */
TreeSet.prototype.add = function (o) {
  var this$1 = this;

  if (this.contains(o)) {
    return false
  }

  for (var i = 0, len = this.array_.length; i < len; i++) {
    var e = this$1.array_[i];
    if (e['compareTo'](o) === 1) {
      this$1.array_.splice(i, 0, o);
      return true
    }
  }

  this.array_.push(o);

  return true
};

/**
 * @override
 */
TreeSet.prototype.addAll = function (c) {
  var this$1 = this;

  for (var i = c.iterator(); i.hasNext();) {
    this$1.add(i.next());
  }
  return true
};

/**
 * @override
 */
TreeSet.prototype.remove = function (e) {
  throw new OperationNotSupported()
};

/**
 * @override
 */
TreeSet.prototype.size = function () {
  return this.array_.length
};

/**
 * @override
 */
TreeSet.prototype.isEmpty = function () {
  return this.array_.length === 0
};

/**
 * @override
 */
TreeSet.prototype.toArray = function () {
  var this$1 = this;

  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this$1.array_[i]);
  }

  return array
};

/**
 * @override
 */
TreeSet.prototype.iterator = function () {
  return new Iterator_$2(this)
};

/**
 * @extends {javascript.util.Iterator}
 * @param {javascript.util.TreeSet} treeSet
 * @constructor
 * @private
 */
var Iterator_$2 = function (treeSet) {
  /**
   * @type {javascript.util.TreeSet}
   * @private
   */
  this.treeSet_ = treeSet;
  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};

/**
 * @override
 */
Iterator_$2.prototype.next = function () {
  if (this.position_ === this.treeSet_.size()) {
    throw new NoSuchElementException()
  }
  return this.treeSet_.array_[this.position_++]
};

/**
 * @override
 */
Iterator_$2.prototype.hasNext = function () {
  if (this.position_ < this.treeSet_.size()) {
    return true
  } else {
    return false
  }
};

/**
 * @override
 */
Iterator_$2.prototype.remove = function () {
  throw new OperationNotSupported()
};

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Arrays.html
 *
 * @constructor
 * @private
 */
var Arrays = function Arrays () {};

Arrays.sort = function sort () {
  var a = arguments[0];
  var i;
  var t;
  var comparator;
  var compare;
  if (arguments.length === 1) {
    compare = function (a, b) {
      return a.compareTo(b)
    };
    a.sort(compare);
  } else if (arguments.length === 2) {
    comparator = arguments[1];
    compare = function (a, b) {
      return comparator['compare'](a, b)
    };
    a.sort(compare);
  } else if (arguments.length === 3) {
    t = a.slice(arguments[1], arguments[2]);
    t.sort();
    var r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
  } else if (arguments.length === 4) {
    t = a.slice(arguments[1], arguments[2]);
    comparator = arguments[3];
    compare = function (a, b) {
      return comparator['compare'](a, b)
    };
    t.sort(compare);
    r = a.slice(0, arguments[1]).concat(t, a.slice(arguments[2], a.length));
    a.splice(0, a.length);
    for (i = 0; i < r.length; i++) {
      a.push(r[i]);
    }
  }
};
/**
 * @param {Array} array
 * @return {ArrayList}
 */
Arrays.asList = function asList (array) {
  var arrayList = new ArrayList();
  for (var i = 0, len = array.length; i < len; i++) {
    arrayList.add(array[i]);
  }
  return arrayList
};

var Dimension = function Dimension () {};

var staticAccessors$14 = { P: { configurable: true },L: { configurable: true },A: { configurable: true },FALSE: { configurable: true },TRUE: { configurable: true },DONTCARE: { configurable: true },SYM_FALSE: { configurable: true },SYM_TRUE: { configurable: true },SYM_DONTCARE: { configurable: true },SYM_P: { configurable: true },SYM_L: { configurable: true },SYM_A: { configurable: true } };

staticAccessors$14.P.get = function () { return 0 };
staticAccessors$14.L.get = function () { return 1 };
staticAccessors$14.A.get = function () { return 2 };
staticAccessors$14.FALSE.get = function () { return -1 };
staticAccessors$14.TRUE.get = function () { return -2 };
staticAccessors$14.DONTCARE.get = function () { return -3 };
staticAccessors$14.SYM_FALSE.get = function () { return 'F' };
staticAccessors$14.SYM_TRUE.get = function () { return 'T' };
staticAccessors$14.SYM_DONTCARE.get = function () { return '*' };
staticAccessors$14.SYM_P.get = function () { return '0' };
staticAccessors$14.SYM_L.get = function () { return '1' };
staticAccessors$14.SYM_A.get = function () { return '2' };

Dimension.prototype.interfaces_ = function interfaces_ () {
  return []
};
Dimension.prototype.getClass = function getClass () {
  return Dimension
};
Dimension.toDimensionSymbol = function toDimensionSymbol (dimensionValue) {
  switch (dimensionValue) {
    case Dimension.FALSE:
      return Dimension.SYM_FALSE
    case Dimension.TRUE:
      return Dimension.SYM_TRUE
    case Dimension.DONTCARE:
      return Dimension.SYM_DONTCARE
    case Dimension.P:
      return Dimension.SYM_P
    case Dimension.L:
      return Dimension.SYM_L
    case Dimension.A:
      return Dimension.SYM_A
    default:
  }
  throw new IllegalArgumentException('Unknown dimension value: ' + dimensionValue)
};
Dimension.toDimensionValue = function toDimensionValue (dimensionSymbol) {
  switch (Character.toUpperCase(dimensionSymbol)) {
    case Dimension.SYM_FALSE:
      return Dimension.FALSE
    case Dimension.SYM_TRUE:
      return Dimension.TRUE
    case Dimension.SYM_DONTCARE:
      return Dimension.DONTCARE
    case Dimension.SYM_P:
      return Dimension.P
    case Dimension.SYM_L:
      return Dimension.L
    case Dimension.SYM_A:
      return Dimension.A
    default:
  }
  throw new IllegalArgumentException('Unknown dimension symbol: ' + dimensionSymbol)
};

Object.defineProperties( Dimension, staticAccessors$14 );

var GeometryFilter = function GeometryFilter () {};

GeometryFilter.prototype.filter = function filter (geom) {};
GeometryFilter.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryFilter.prototype.getClass = function getClass () {
  return GeometryFilter
};

var CoordinateSequenceFilter = function CoordinateSequenceFilter () {};

CoordinateSequenceFilter.prototype.filter = function filter (seq, i) {};
CoordinateSequenceFilter.prototype.isDone = function isDone () {};
CoordinateSequenceFilter.prototype.isGeometryChanged = function isGeometryChanged () {};
CoordinateSequenceFilter.prototype.interfaces_ = function interfaces_ () {
  return []
};
CoordinateSequenceFilter.prototype.getClass = function getClass () {
  return CoordinateSequenceFilter
};

var GeometryCollection = (function (Geometry$$1) {
  function GeometryCollection (geometries, factory) {
    Geometry$$1.call(this, factory);
    this._geometries = geometries || [];

    if (Geometry$$1.hasNullElements(this._geometries)) {
      throw new IllegalArgumentException('geometries must not contain null elements')
    }
  }

  if ( Geometry$$1 ) GeometryCollection.__proto__ = Geometry$$1;
  GeometryCollection.prototype = Object.create( Geometry$$1 && Geometry$$1.prototype );
  GeometryCollection.prototype.constructor = GeometryCollection;

  var staticAccessors = { serialVersionUID: { configurable: true } };
  GeometryCollection.prototype.computeEnvelopeInternal = function computeEnvelopeInternal () {
    var this$1 = this;

    var envelope = new Envelope();
    for (var i = 0; i < this._geometries.length; i++) {
      envelope.expandToInclude(this$1._geometries[i].getEnvelopeInternal());
    }
    return envelope
  };
  GeometryCollection.prototype.getGeometryN = function getGeometryN (n) {
    return this._geometries[n]
  };
  GeometryCollection.prototype.getSortIndex = function getSortIndex () {
    return Geometry$$1.SORTINDEX_GEOMETRYCOLLECTION
  };
  GeometryCollection.prototype.getCoordinates = function getCoordinates () {
    var this$1 = this;

    var coordinates = new Array(this.getNumPoints()).fill(null);
    var k = -1;
    for (var i = 0; i < this._geometries.length; i++) {
      var childCoordinates = this$1._geometries[i].getCoordinates();
      for (var j = 0; j < childCoordinates.length; j++) {
        k++;
        coordinates[k] = childCoordinates[j];
      }
    }
    return coordinates
  };
  GeometryCollection.prototype.getArea = function getArea () {
    var this$1 = this;

    var area = 0.0;
    for (var i = 0; i < this._geometries.length; i++) {
      area += this$1._geometries[i].getArea();
    }
    return area
  };
  GeometryCollection.prototype.equalsExact = function equalsExact () {
    var this$1 = this;

    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      var otherCollection = other;
      if (this._geometries.length !== otherCollection._geometries.length) {
        return false
      }
      for (var i = 0; i < this._geometries.length; i++) {
        if (!this$1._geometries[i].equalsExact(otherCollection._geometries[i], tolerance)) {
          return false
        }
      }
      return true
    } else { return Geometry$$1.prototype.equalsExact.apply(this, arguments) }
  };
  GeometryCollection.prototype.normalize = function normalize () {
    var this$1 = this;

    for (var i = 0; i < this._geometries.length; i++) {
      this$1._geometries[i].normalize();
    }
    Arrays.sort(this._geometries);
  };
  GeometryCollection.prototype.getCoordinate = function getCoordinate () {
    if (this.isEmpty()) { return null }
    return this._geometries[0].getCoordinate()
  };
  GeometryCollection.prototype.getBoundaryDimension = function getBoundaryDimension () {
    var this$1 = this;

    var dimension = Dimension.FALSE;
    for (var i = 0; i < this._geometries.length; i++) {
      dimension = Math.max(dimension, this$1._geometries[i].getBoundaryDimension());
    }
    return dimension
  };
  GeometryCollection.prototype.getDimension = function getDimension () {
    var this$1 = this;

    var dimension = Dimension.FALSE;
    for (var i = 0; i < this._geometries.length; i++) {
      dimension = Math.max(dimension, this$1._geometries[i].getDimension());
    }
    return dimension
  };
  GeometryCollection.prototype.getLength = function getLength () {
    var this$1 = this;

    var sum = 0.0;
    for (var i = 0; i < this._geometries.length; i++) {
      sum += this$1._geometries[i].getLength();
    }
    return sum
  };
  GeometryCollection.prototype.getNumPoints = function getNumPoints () {
    var this$1 = this;

    var numPoints = 0;
    for (var i = 0; i < this._geometries.length; i++) {
      numPoints += this$1._geometries[i].getNumPoints();
    }
    return numPoints
  };
  GeometryCollection.prototype.getNumGeometries = function getNumGeometries () {
    return this._geometries.length
  };
  GeometryCollection.prototype.reverse = function reverse () {
    var this$1 = this;

    var n = this._geometries.length;
    var revGeoms = new Array(n).fill(null);
    for (var i = 0; i < this._geometries.length; i++) {
      revGeoms[i] = this$1._geometries[i].reverse();
    }
    return this.getFactory().createGeometryCollection(revGeoms)
  };
  GeometryCollection.prototype.compareToSameClass = function compareToSameClass () {
    var this$1 = this;

    if (arguments.length === 1) {
      var o = arguments[0];
      var theseElements = new TreeSet(Arrays.asList(this._geometries));
      var otherElements = new TreeSet(Arrays.asList(o._geometries));
      return this.compare(theseElements, otherElements)
    } else if (arguments.length === 2) {
      var o$1 = arguments[0];
      var comp = arguments[1];
      var gc = o$1;
      var n1 = this.getNumGeometries();
      var n2 = gc.getNumGeometries();
      var i = 0;
      while (i < n1 && i < n2) {
        var thisGeom = this$1.getGeometryN(i);
        var otherGeom = gc.getGeometryN(i);
        var holeComp = thisGeom.compareToSameClass(otherGeom, comp);
        if (holeComp !== 0) { return holeComp }
        i++;
      }
      if (i < n1) { return 1 }
      if (i < n2) { return -1 }
      return 0
    }
  };
  GeometryCollection.prototype.apply = function apply () {
    var this$1 = this;

    if (hasInterface(arguments[0], CoordinateFilter)) {
      var filter = arguments[0];
      for (var i = 0; i < this._geometries.length; i++) {
        this$1._geometries[i].apply(filter);
      }
    } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
      var filter$1 = arguments[0];
      if (this._geometries.length === 0) { return null }
      for (var i$1 = 0; i$1 < this._geometries.length; i$1++) {
        this$1._geometries[i$1].apply(filter$1);
        if (filter$1.isDone()) {
          break
        }
      }
      if (filter$1.isGeometryChanged()) { this.geometryChanged(); }
    } else if (hasInterface(arguments[0], GeometryFilter)) {
      var filter$2 = arguments[0];
      filter$2.filter(this);
      for (var i$2 = 0; i$2 < this._geometries.length; i$2++) {
        this$1._geometries[i$2].apply(filter$2);
      }
    } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
      var filter$3 = arguments[0];
      filter$3.filter(this);
      for (var i$3 = 0; i$3 < this._geometries.length; i$3++) {
        this$1._geometries[i$3].apply(filter$3);
      }
    }
  };
  GeometryCollection.prototype.getBoundary = function getBoundary () {
    this.checkNotGeometryCollection(this);
    Assert.shouldNeverReachHere();
    return null
  };
  GeometryCollection.prototype.clone = function clone () {
    var this$1 = this;

    var gc = Geometry$$1.prototype.clone.call(this);
    gc._geometries = new Array(this._geometries.length).fill(null);
    for (var i = 0; i < this._geometries.length; i++) {
      gc._geometries[i] = this$1._geometries[i].clone();
    }
    return gc
  };
  GeometryCollection.prototype.getGeometryType = function getGeometryType () {
    return 'GeometryCollection'
  };
  GeometryCollection.prototype.copy = function copy () {
    var this$1 = this;

    var geometries = new Array(this._geometries.length).fill(null);
    for (var i = 0; i < geometries.length; i++) {
      geometries[i] = this$1._geometries[i].copy();
    }
    return new GeometryCollection(geometries, this._factory)
  };
  GeometryCollection.prototype.isEmpty = function isEmpty () {
    var this$1 = this;

    for (var i = 0; i < this._geometries.length; i++) {
      if (!this$1._geometries[i].isEmpty()) {
        return false
      }
    }
    return true
  };
  GeometryCollection.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  GeometryCollection.prototype.getClass = function getClass () {
    return GeometryCollection
  };
  staticAccessors.serialVersionUID.get = function () { return -5694727726395021467 };

  Object.defineProperties( GeometryCollection, staticAccessors );

  return GeometryCollection;
}(Geometry));

var MultiLineString = (function (GeometryCollection$$1) {
  function MultiLineString () {
    GeometryCollection$$1.apply(this, arguments);
  }

  if ( GeometryCollection$$1 ) MultiLineString.__proto__ = GeometryCollection$$1;
  MultiLineString.prototype = Object.create( GeometryCollection$$1 && GeometryCollection$$1.prototype );
  MultiLineString.prototype.constructor = MultiLineString;

  var staticAccessors = { serialVersionUID: { configurable: true } };

  MultiLineString.prototype.getSortIndex = function getSortIndex () {
    return Geometry.SORTINDEX_MULTILINESTRING
  };
  MultiLineString.prototype.equalsExact = function equalsExact () {
    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      return GeometryCollection$$1.prototype.equalsExact.call(this, other, tolerance)
    } else { return GeometryCollection$$1.prototype.equalsExact.apply(this, arguments) }
  };
  MultiLineString.prototype.getBoundaryDimension = function getBoundaryDimension () {
    if (this.isClosed()) {
      return Dimension.FALSE
    }
    return 0
  };
  MultiLineString.prototype.isClosed = function isClosed () {
    var this$1 = this;

    if (this.isEmpty()) {
      return false
    }
    for (var i = 0; i < this._geometries.length; i++) {
      if (!this$1._geometries[i].isClosed()) {
        return false
      }
    }
    return true
  };
  MultiLineString.prototype.getDimension = function getDimension () {
    return 1
  };
  MultiLineString.prototype.reverse = function reverse () {
    var this$1 = this;

    var nLines = this._geometries.length;
    var revLines = new Array(nLines).fill(null);
    for (var i = 0; i < this._geometries.length; i++) {
      revLines[nLines - 1 - i] = this$1._geometries[i].reverse();
    }
    return this.getFactory().createMultiLineString(revLines)
  };
  MultiLineString.prototype.getBoundary = function getBoundary () {
    return new BoundaryOp(this).getBoundary()
  };
  MultiLineString.prototype.getGeometryType = function getGeometryType () {
    return 'MultiLineString'
  };
  MultiLineString.prototype.copy = function copy () {
    var this$1 = this;

    var lineStrings = new Array(this._geometries.length).fill(null);
    for (var i = 0; i < lineStrings.length; i++) {
      lineStrings[i] = this$1._geometries[i].copy();
    }
    return new MultiLineString(lineStrings, this._factory)
  };
  MultiLineString.prototype.interfaces_ = function interfaces_ () {
    return [Lineal]
  };
  MultiLineString.prototype.getClass = function getClass () {
    return MultiLineString
  };
  staticAccessors.serialVersionUID.get = function () { return 8166665132445433741 };

  Object.defineProperties( MultiLineString, staticAccessors );

  return MultiLineString;
}(GeometryCollection));

var BoundaryOp = function BoundaryOp () {
  this._geom = null;
  this._geomFact = null;
  this._bnRule = null;
  this._endpointMap = null;
  if (arguments.length === 1) {
    var geom = arguments[0];
    var bnRule = BoundaryNodeRule.MOD2_BOUNDARY_RULE;
    this._geom = geom;
    this._geomFact = geom.getFactory();
    this._bnRule = bnRule;
  } else if (arguments.length === 2) {
    var geom$1 = arguments[0];
    var bnRule$1 = arguments[1];
    this._geom = geom$1;
    this._geomFact = geom$1.getFactory();
    this._bnRule = bnRule$1;
  }
};
BoundaryOp.prototype.boundaryMultiLineString = function boundaryMultiLineString (mLine) {
  if (this._geom.isEmpty()) {
    return this.getEmptyMultiPoint()
  }
  var bdyPts = this.computeBoundaryCoordinates(mLine);
  if (bdyPts.length === 1) {
    return this._geomFact.createPoint(bdyPts[0])
  }
  return this._geomFact.createMultiPointFromCoords(bdyPts)
};
BoundaryOp.prototype.getBoundary = function getBoundary () {
  if (this._geom instanceof LineString) { return this.boundaryLineString(this._geom) }
  if (this._geom instanceof MultiLineString) { return this.boundaryMultiLineString(this._geom) }
  return this._geom.getBoundary()
};
BoundaryOp.prototype.boundaryLineString = function boundaryLineString (line) {
  if (this._geom.isEmpty()) {
    return this.getEmptyMultiPoint()
  }
  if (line.isClosed()) {
    var closedEndpointOnBoundary = this._bnRule.isInBoundary(2);
    if (closedEndpointOnBoundary) {
      return line.getStartPoint()
    } else {
      return this._geomFact.createMultiPoint()
    }
  }
  return this._geomFact.createMultiPoint([line.getStartPoint(), line.getEndPoint()])
};
BoundaryOp.prototype.getEmptyMultiPoint = function getEmptyMultiPoint () {
  return this._geomFact.createMultiPoint()
};
BoundaryOp.prototype.computeBoundaryCoordinates = function computeBoundaryCoordinates (mLine) {
    var this$1 = this;

  var bdyPts = new ArrayList();
  this._endpointMap = new TreeMap();
  for (var i = 0; i < mLine.getNumGeometries(); i++) {
    var line = mLine.getGeometryN(i);
    if (line.getNumPoints() === 0) { continue }
    this$1.addEndpoint(line.getCoordinateN(0));
    this$1.addEndpoint(line.getCoordinateN(line.getNumPoints() - 1));
  }
  for (var it = this._endpointMap.entrySet().iterator(); it.hasNext();) {
    var entry = it.next();
    var counter = entry.getValue();
    var valence = counter.count;
    if (this$1._bnRule.isInBoundary(valence)) {
      bdyPts.add(entry.getKey());
    }
  }
  return CoordinateArrays.toCoordinateArray(bdyPts)
};
BoundaryOp.prototype.addEndpoint = function addEndpoint (pt) {
  var counter = this._endpointMap.get(pt);
  if (counter === null) {
    counter = new Counter();
    this._endpointMap.put(pt, counter);
  }
  counter.count++;
};
BoundaryOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
BoundaryOp.prototype.getClass = function getClass () {
  return BoundaryOp
};
BoundaryOp.getBoundary = function getBoundary () {
  if (arguments.length === 1) {
    var g = arguments[0];
    var bop = new BoundaryOp(g);
    return bop.getBoundary()
  } else if (arguments.length === 2) {
    var g$1 = arguments[0];
    var bnRule = arguments[1];
    var bop$1 = new BoundaryOp(g$1, bnRule);
    return bop$1.getBoundary()
  }
};

var Counter = function Counter () {
  this.count = null;
};
Counter.prototype.interfaces_ = function interfaces_ () {
  return []
};
Counter.prototype.getClass = function getClass () {
  return Counter
};

// boundary

function PrintStream () {}

function StringReader () {}

var DecimalFormat = function DecimalFormat () {};

function ByteArrayOutputStream () {}

function IOException () {}

function LineNumberReader () {}

var StringUtil = function StringUtil () {};

var staticAccessors$15 = { NEWLINE: { configurable: true },SIMPLE_ORDINATE_FORMAT: { configurable: true } };

StringUtil.prototype.interfaces_ = function interfaces_ () {
  return []
};
StringUtil.prototype.getClass = function getClass () {
  return StringUtil
};
StringUtil.chars = function chars (c, n) {
  var ch = new Array(n).fill(null);
  for (var i = 0; i < n; i++) {
    ch[i] = c;
  }
  return String(ch)
};
StringUtil.getStackTrace = function getStackTrace () {
  if (arguments.length === 1) {
    var t = arguments[0];
    var os = new ByteArrayOutputStream();
    var ps = new PrintStream(os);
    t.printStackTrace(ps);
    return os.toString()
  } else if (arguments.length === 2) {
    var t$1 = arguments[0];
    var depth = arguments[1];
    var stackTrace = '';
    var stringReader = new StringReader(StringUtil.getStackTrace(t$1));
    var lineNumberReader = new LineNumberReader(stringReader);
    for (var i = 0; i < depth; i++) {
      try {
        stackTrace += lineNumberReader.readLine() + StringUtil.NEWLINE;
      } catch (e) {
        if (e instanceof IOException) {
          Assert.shouldNeverReachHere();
        } else { throw e }
      } finally {}
    }
    return stackTrace
  }
};
StringUtil.split = function split (s, separator) {
  var separatorlen = separator.length;
  var tokenList = new ArrayList();
  var tmpString = '' + s;
  var pos = tmpString.indexOf(separator);
  while (pos >= 0) {
    var token = tmpString.substring(0, pos);
    tokenList.add(token);
    tmpString = tmpString.substring(pos + separatorlen);
    pos = tmpString.indexOf(separator);
  }
  if (tmpString.length > 0) { tokenList.add(tmpString); }
  var res = new Array(tokenList.size()).fill(null);
  for (var i = 0; i < res.length; i++) {
    res[i] = tokenList.get(i);
  }
  return res
};
StringUtil.toString = function toString () {
  if (arguments.length === 1) {
    var d = arguments[0];
    return StringUtil.SIMPLE_ORDINATE_FORMAT.format(d)
  }
};
StringUtil.spaces = function spaces (n) {
  return StringUtil.chars(' ', n)
};
staticAccessors$15.NEWLINE.get = function () { return System.getProperty('line.separator') };
staticAccessors$15.SIMPLE_ORDINATE_FORMAT.get = function () { return new DecimalFormat('0.#') };

Object.defineProperties( StringUtil, staticAccessors$15 );

var CoordinateSequences = function CoordinateSequences () {};

CoordinateSequences.prototype.interfaces_ = function interfaces_ () {
  return []
};
CoordinateSequences.prototype.getClass = function getClass () {
  return CoordinateSequences
};
CoordinateSequences.copyCoord = function copyCoord (src, srcPos, dest, destPos) {
  var minDim = Math.min(src.getDimension(), dest.getDimension());
  for (var dim = 0; dim < minDim; dim++) {
    dest.setOrdinate(destPos, dim, src.getOrdinate(srcPos, dim));
  }
};
CoordinateSequences.isRing = function isRing (seq) {
  var n = seq.size();
  if (n === 0) { return true }
  if (n <= 3) { return false }
  return seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y)
};
CoordinateSequences.isEqual = function isEqual (cs1, cs2) {
  var cs1Size = cs1.size();
  var cs2Size = cs2.size();
  if (cs1Size !== cs2Size) { return false }
  var dim = Math.min(cs1.getDimension(), cs2.getDimension());
  for (var i = 0; i < cs1Size; i++) {
    for (var d = 0; d < dim; d++) {
      var v1 = cs1.getOrdinate(i, d);
      var v2 = cs2.getOrdinate(i, d);
      if (cs1.getOrdinate(i, d) === cs2.getOrdinate(i, d)) { continue }
      if (Double.isNaN(v1) && Double.isNaN(v2)) { continue }
      return false
    }
  }
  return true
};
CoordinateSequences.extend = function extend (fact, seq, size) {
  var newseq = fact.create(size, seq.getDimension());
  var n = seq.size();
  CoordinateSequences.copy(seq, 0, newseq, 0, n);
  if (n > 0) {
    for (var i = n; i < size; i++) { CoordinateSequences.copy(seq, n - 1, newseq, i, 1); }
  }
  return newseq
};
CoordinateSequences.reverse = function reverse (seq) {
  var last = seq.size() - 1;
  var mid = Math.trunc(last / 2);
  for (var i = 0; i <= mid; i++) {
    CoordinateSequences.swap(seq, i, last - i);
  }
};
CoordinateSequences.swap = function swap (seq, i, j) {
  if (i === j) { return null }
  for (var dim = 0; dim < seq.getDimension(); dim++) {
    var tmp = seq.getOrdinate(i, dim);
    seq.setOrdinate(i, dim, seq.getOrdinate(j, dim));
    seq.setOrdinate(j, dim, tmp);
  }
};
CoordinateSequences.copy = function copy (src, srcPos, dest, destPos, length) {
  for (var i = 0; i < length; i++) {
    CoordinateSequences.copyCoord(src, srcPos + i, dest, destPos + i);
  }
};
CoordinateSequences.toString = function toString () {
  if (arguments.length === 1) {
    var cs = arguments[0];
    var size = cs.size();
    if (size === 0) { return '()' }
    var dim = cs.getDimension();
    var buf = new StringBuffer();
    buf.append('(');
    for (var i = 0; i < size; i++) {
      if (i > 0) { buf.append(' '); }
      for (var d = 0; d < dim; d++) {
        if (d > 0) { buf.append(','); }
        buf.append(StringUtil.toString(cs.getOrdinate(i, d)));
      }
    }
    buf.append(')');
    return buf.toString()
  }
};
CoordinateSequences.ensureValidRing = function ensureValidRing (fact, seq) {
  var n = seq.size();
  if (n === 0) { return seq }
  if (n <= 3) { return CoordinateSequences.createClosedRing(fact, seq, 4) }
  var isClosed = seq.getOrdinate(0, CoordinateSequence.X) === seq.getOrdinate(n - 1, CoordinateSequence.X) && seq.getOrdinate(0, CoordinateSequence.Y) === seq.getOrdinate(n - 1, CoordinateSequence.Y);
  if (isClosed) { return seq }
  return CoordinateSequences.createClosedRing(fact, seq, n + 1)
};
CoordinateSequences.createClosedRing = function createClosedRing (fact, seq, size) {
  var newseq = fact.create(size, seq.getDimension());
  var n = seq.size();
  CoordinateSequences.copy(seq, 0, newseq, 0, n);
  for (var i = n; i < size; i++) { CoordinateSequences.copy(seq, 0, newseq, i, 1); }
  return newseq
};

var LineString = (function (Geometry$$1) {
  function LineString (points, factory) {
    Geometry$$1.call(this, factory);
    this._points = null;
    this.init(points);
  }

  if ( Geometry$$1 ) LineString.__proto__ = Geometry$$1;
  LineString.prototype = Object.create( Geometry$$1 && Geometry$$1.prototype );
  LineString.prototype.constructor = LineString;

  var staticAccessors = { serialVersionUID: { configurable: true } };
  LineString.prototype.computeEnvelopeInternal = function computeEnvelopeInternal () {
    if (this.isEmpty()) {
      return new Envelope()
    }
    return this._points.expandEnvelope(new Envelope())
  };
  LineString.prototype.isRing = function isRing () {
    return this.isClosed() && this.isSimple()
  };
  LineString.prototype.getSortIndex = function getSortIndex () {
    return Geometry$$1.SORTINDEX_LINESTRING
  };
  LineString.prototype.getCoordinates = function getCoordinates () {
    return this._points.toCoordinateArray()
  };
  LineString.prototype.equalsExact = function equalsExact () {
    var this$1 = this;

    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      var otherLineString = other;
      if (this._points.size() !== otherLineString._points.size()) {
        return false
      }
      for (var i = 0; i < this._points.size(); i++) {
        if (!this$1.equal(this$1._points.getCoordinate(i), otherLineString._points.getCoordinate(i), tolerance)) {
          return false
        }
      }
      return true
    } else { return Geometry$$1.prototype.equalsExact.apply(this, arguments) }
  };
  LineString.prototype.normalize = function normalize () {
    var this$1 = this;

    for (var i = 0; i < Math.trunc(this._points.size() / 2); i++) {
      var j = this$1._points.size() - 1 - i;
      if (!this$1._points.getCoordinate(i).equals(this$1._points.getCoordinate(j))) {
        if (this$1._points.getCoordinate(i).compareTo(this$1._points.getCoordinate(j)) > 0) {
          CoordinateSequences.reverse(this$1._points);
        }
        return null
      }
    }
  };
  LineString.prototype.getCoordinate = function getCoordinate () {
    if (this.isEmpty()) { return null }
    return this._points.getCoordinate(0)
  };
  LineString.prototype.getBoundaryDimension = function getBoundaryDimension () {
    if (this.isClosed()) {
      return Dimension.FALSE
    }
    return 0
  };
  LineString.prototype.isClosed = function isClosed () {
    if (this.isEmpty()) {
      return false
    }
    return this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints() - 1))
  };
  LineString.prototype.getEndPoint = function getEndPoint () {
    if (this.isEmpty()) {
      return null
    }
    return this.getPointN(this.getNumPoints() - 1)
  };
  LineString.prototype.getDimension = function getDimension () {
    return 1
  };
  LineString.prototype.getLength = function getLength () {
    return CGAlgorithms.computeLength(this._points)
  };
  LineString.prototype.getNumPoints = function getNumPoints () {
    return this._points.size()
  };
  LineString.prototype.reverse = function reverse () {
    var seq = this._points.copy();
    CoordinateSequences.reverse(seq);
    var revLine = this.getFactory().createLineString(seq);
    return revLine
  };
  LineString.prototype.compareToSameClass = function compareToSameClass () {
    var this$1 = this;

    if (arguments.length === 1) {
      var o = arguments[0];
      var line = o;
      var i = 0;
      var j = 0;
      while (i < this._points.size() && j < line._points.size()) {
        var comparison = this$1._points.getCoordinate(i).compareTo(line._points.getCoordinate(j));
        if (comparison !== 0) {
          return comparison
        }
        i++;
        j++;
      }
      if (i < this._points.size()) {
        return 1
      }
      if (j < line._points.size()) {
        return -1
      }
      return 0
    } else if (arguments.length === 2) {
      var o$1 = arguments[0];
      var comp = arguments[1];
      var line$1 = o$1;
      return comp.compare(this._points, line$1._points)
    }
  };
  LineString.prototype.apply = function apply () {
    var this$1 = this;

    if (hasInterface(arguments[0], CoordinateFilter)) {
      var filter = arguments[0];
      for (var i = 0; i < this._points.size(); i++) {
        filter.filter(this$1._points.getCoordinate(i));
      }
    } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
      var filter$1 = arguments[0];
      if (this._points.size() === 0) { return null }
      for (var i$1 = 0; i$1 < this._points.size(); i$1++) {
        filter$1.filter(this$1._points, i$1);
        if (filter$1.isDone()) { break }
      }
      if (filter$1.isGeometryChanged()) { this.geometryChanged(); }
    } else if (hasInterface(arguments[0], GeometryFilter)) {
      var filter$2 = arguments[0];
      filter$2.filter(this);
    } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
      var filter$3 = arguments[0];
      filter$3.filter(this);
    }
  };
  LineString.prototype.getBoundary = function getBoundary () {
    return new BoundaryOp(this).getBoundary()
  };
  LineString.prototype.isEquivalentClass = function isEquivalentClass (other) {
    return other instanceof LineString
  };
  LineString.prototype.clone = function clone () {
    var ls = Geometry$$1.prototype.clone.call(this);
    ls._points = this._points.clone();
    return ls
  };
  LineString.prototype.getCoordinateN = function getCoordinateN (n) {
    return this._points.getCoordinate(n)
  };
  LineString.prototype.getGeometryType = function getGeometryType () {
    return 'LineString'
  };
  LineString.prototype.copy = function copy () {
    return new LineString(this._points.copy(), this._factory)
  };
  LineString.prototype.getCoordinateSequence = function getCoordinateSequence () {
    return this._points
  };
  LineString.prototype.isEmpty = function isEmpty () {
    return this._points.size() === 0
  };
  LineString.prototype.init = function init (points) {
    if (points === null) {
      points = this.getFactory().getCoordinateSequenceFactory().create([]);
    }
    if (points.size() === 1) {
      throw new IllegalArgumentException('Invalid number of points in LineString (found ' + points.size() + ' - must be 0 or >= 2)')
    }
    this._points = points;
  };
  LineString.prototype.isCoordinate = function isCoordinate (pt) {
    var this$1 = this;

    for (var i = 0; i < this._points.size(); i++) {
      if (this$1._points.getCoordinate(i).equals(pt)) {
        return true
      }
    }
    return false
  };
  LineString.prototype.getStartPoint = function getStartPoint () {
    if (this.isEmpty()) {
      return null
    }
    return this.getPointN(0)
  };
  LineString.prototype.getPointN = function getPointN (n) {
    return this.getFactory().createPoint(this._points.getCoordinate(n))
  };
  LineString.prototype.interfaces_ = function interfaces_ () {
    return [Lineal]
  };
  LineString.prototype.getClass = function getClass () {
    return LineString
  };
  staticAccessors.serialVersionUID.get = function () { return 3110669828065365560 };

  Object.defineProperties( LineString, staticAccessors );

  return LineString;
}(Geometry));

var Puntal = function Puntal () {};

Puntal.prototype.interfaces_ = function interfaces_ () {
  return []
};
Puntal.prototype.getClass = function getClass () {
  return Puntal
};

var Point = (function (Geometry$$1) {
  function Point (coordinates, factory) {
    Geometry$$1.call(this, factory);
    this._coordinates = coordinates || null;
    this.init(this._coordinates);
  }

  if ( Geometry$$1 ) Point.__proto__ = Geometry$$1;
  Point.prototype = Object.create( Geometry$$1 && Geometry$$1.prototype );
  Point.prototype.constructor = Point;

  var staticAccessors = { serialVersionUID: { configurable: true } };
  Point.prototype.computeEnvelopeInternal = function computeEnvelopeInternal () {
    if (this.isEmpty()) {
      return new Envelope()
    }
    var env = new Envelope();
    env.expandToInclude(this._coordinates.getX(0), this._coordinates.getY(0));
    return env
  };
  Point.prototype.getSortIndex = function getSortIndex () {
    return Geometry$$1.SORTINDEX_POINT
  };
  Point.prototype.getCoordinates = function getCoordinates () {
    return this.isEmpty() ? [] : [this.getCoordinate()]
  };
  Point.prototype.equalsExact = function equalsExact () {
    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      if (this.isEmpty() && other.isEmpty()) {
        return true
      }
      if (this.isEmpty() !== other.isEmpty()) {
        return false
      }
      return this.equal(other.getCoordinate(), this.getCoordinate(), tolerance)
    } else { return Geometry$$1.prototype.equalsExact.apply(this, arguments) }
  };
  Point.prototype.normalize = function normalize () {};
  Point.prototype.getCoordinate = function getCoordinate () {
    return this._coordinates.size() !== 0 ? this._coordinates.getCoordinate(0) : null
  };
  Point.prototype.getBoundaryDimension = function getBoundaryDimension () {
    return Dimension.FALSE
  };
  Point.prototype.getDimension = function getDimension () {
    return 0
  };
  Point.prototype.getNumPoints = function getNumPoints () {
    return this.isEmpty() ? 0 : 1
  };
  Point.prototype.reverse = function reverse () {
    return this.copy()
  };
  Point.prototype.getX = function getX () {
    if (this.getCoordinate() === null) {
      throw new Error('getX called on empty Point')
    }
    return this.getCoordinate().x
  };
  Point.prototype.compareToSameClass = function compareToSameClass () {
    if (arguments.length === 1) {
      var other = arguments[0];
      var point$1 = other;
      return this.getCoordinate().compareTo(point$1.getCoordinate())
    } else if (arguments.length === 2) {
      var other$1 = arguments[0];
      var comp = arguments[1];
      var point = other$1;
      return comp.compare(this._coordinates, point._coordinates)
    }
  };
  Point.prototype.apply = function apply () {
    if (hasInterface(arguments[0], CoordinateFilter)) {
      var filter = arguments[0];
      if (this.isEmpty()) {
        return null
      }
      filter.filter(this.getCoordinate());
    } else if (hasInterface(arguments[0], CoordinateSequenceFilter)) {
      var filter$1 = arguments[0];
      if (this.isEmpty()) { return null }
      filter$1.filter(this._coordinates, 0);
      if (filter$1.isGeometryChanged()) { this.geometryChanged(); }
    } else if (hasInterface(arguments[0], GeometryFilter)) {
      var filter$2 = arguments[0];
      filter$2.filter(this);
    } else if (hasInterface(arguments[0], GeometryComponentFilter)) {
      var filter$3 = arguments[0];
      filter$3.filter(this);
    }
  };
  Point.prototype.getBoundary = function getBoundary () {
    return this.getFactory().createGeometryCollection(null)
  };
  Point.prototype.clone = function clone () {
    var p = Geometry$$1.prototype.clone.call(this);
    p._coordinates = this._coordinates.clone();
    return p
  };
  Point.prototype.getGeometryType = function getGeometryType () {
    return 'Point'
  };
  Point.prototype.copy = function copy () {
    return new Point(this._coordinates.copy(), this._factory)
  };
  Point.prototype.getCoordinateSequence = function getCoordinateSequence () {
    return this._coordinates
  };
  Point.prototype.getY = function getY () {
    if (this.getCoordinate() === null) {
      throw new Error('getY called on empty Point')
    }
    return this.getCoordinate().y
  };
  Point.prototype.isEmpty = function isEmpty () {
    return this._coordinates.size() === 0
  };
  Point.prototype.init = function init (coordinates) {
    if (coordinates === null) {
      coordinates = this.getFactory().getCoordinateSequenceFactory().create([]);
    }
    Assert.isTrue(coordinates.size() <= 1);
    this._coordinates = coordinates;
  };
  Point.prototype.isSimple = function isSimple () {
    return true
  };
  Point.prototype.interfaces_ = function interfaces_ () {
    return [Puntal]
  };
  Point.prototype.getClass = function getClass () {
    return Point
  };
  staticAccessors.serialVersionUID.get = function () { return 4902022702746614570 };

  Object.defineProperties( Point, staticAccessors );

  return Point;
}(Geometry));

var Polygonal = function Polygonal () {};

Polygonal.prototype.interfaces_ = function interfaces_ () {
  return []
};
Polygonal.prototype.getClass = function getClass () {
  return Polygonal
};

var Polygon = (function (Geometry$$1) {
  function Polygon (shell, holes, factory) {
    Geometry$$1.call(this, factory);
    this._shell = null;
    this._holes = null;
    if (shell === null) {
      shell = this.getFactory().createLinearRing();
    }
    if (holes === null) {
      holes = [];
    }
    if (Geometry$$1.hasNullElements(holes)) {
      throw new IllegalArgumentException('holes must not contain null elements')
    }
    if (shell.isEmpty() && Geometry$$1.hasNonEmptyElements(holes)) {
      throw new IllegalArgumentException('shell is empty but holes are not')
    }
    this._shell = shell;
    this._holes = holes;
  }

  if ( Geometry$$1 ) Polygon.__proto__ = Geometry$$1;
  Polygon.prototype = Object.create( Geometry$$1 && Geometry$$1.prototype );
  Polygon.prototype.constructor = Polygon;

  var staticAccessors = { serialVersionUID: { configurable: true } };
  Polygon.prototype.computeEnvelopeInternal = function computeEnvelopeInternal () {
    return this._shell.getEnvelopeInternal()
  };
  Polygon.prototype.getSortIndex = function getSortIndex () {
    return Geometry$$1.SORTINDEX_POLYGON
  };
  Polygon.prototype.getCoordinates = function getCoordinates () {
    var this$1 = this;

    if (this.isEmpty()) {
      return []
    }
    var coordinates = new Array(this.getNumPoints()).fill(null);
    var k = -1;
    var shellCoordinates = this._shell.getCoordinates();
    for (var x = 0; x < shellCoordinates.length; x++) {
      k++;
      coordinates[k] = shellCoordinates[x];
    }
    for (var i = 0; i < this._holes.length; i++) {
      var childCoordinates = this$1._holes[i].getCoordinates();
      for (var j = 0; j < childCoordinates.length; j++) {
        k++;
        coordinates[k] = childCoordinates[j];
      }
    }
    return coordinates
  };
  Polygon.prototype.getArea = function getArea () {
    var this$1 = this;

    var area = 0.0;
    area += Math.abs(CGAlgorithms.signedArea(this._shell.getCoordinateSequence()));
    for (var i = 0; i < this._holes.length; i++) {
      area -= Math.abs(CGAlgorithms.signedArea(this$1._holes[i].getCoordinateSequence()));
    }
    return area
  };
  Polygon.prototype.isRectangle = function isRectangle () {
    if (this.getNumInteriorRing() !== 0) { return false }
    if (this._shell === null) { return false }
    if (this._shell.getNumPoints() !== 5) { return false }
    var seq = this._shell.getCoordinateSequence();
    var env = this.getEnvelopeInternal();
    for (var i = 0; i < 5; i++) {
      var x = seq.getX(i);
      if (!(x === env.getMinX() || x === env.getMaxX())) { return false }
      var y = seq.getY(i);
      if (!(y === env.getMinY() || y === env.getMaxY())) { return false }
    }
    var prevX = seq.getX(0);
    var prevY = seq.getY(0);
    for (var i$1 = 1; i$1 <= 4; i$1++) {
      var x$1 = seq.getX(i$1);
      var y$1 = seq.getY(i$1);
      var xChanged = x$1 !== prevX;
      var yChanged = y$1 !== prevY;
      if (xChanged === yChanged) { return false }
      prevX = x$1;
      prevY = y$1;
    }
    return true
  };
  Polygon.prototype.equalsExact = function equalsExact () {
    var this$1 = this;

    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      var otherPolygon = other;
      var thisShell = this._shell;
      var otherPolygonShell = otherPolygon._shell;
      if (!thisShell.equalsExact(otherPolygonShell, tolerance)) {
        return false
      }
      if (this._holes.length !== otherPolygon._holes.length) {
        return false
      }
      for (var i = 0; i < this._holes.length; i++) {
        if (!this$1._holes[i].equalsExact(otherPolygon._holes[i], tolerance)) {
          return false
        }
      }
      return true
    } else { return Geometry$$1.prototype.equalsExact.apply(this, arguments) }
  };
  Polygon.prototype.normalize = function normalize () {
    var this$1 = this;

    if (arguments.length === 0) {
      this.normalize(this._shell, true);
      for (var i = 0; i < this._holes.length; i++) {
        this$1.normalize(this$1._holes[i], false);
      }
      Arrays.sort(this._holes);
    } else if (arguments.length === 2) {
      var ring = arguments[0];
      var clockwise = arguments[1];
      if (ring.isEmpty()) {
        return null
      }
      var uniqueCoordinates = new Array(ring.getCoordinates().length - 1).fill(null);
      System.arraycopy(ring.getCoordinates(), 0, uniqueCoordinates, 0, uniqueCoordinates.length);
      var minCoordinate = CoordinateArrays.minCoordinate(ring.getCoordinates());
      CoordinateArrays.scroll(uniqueCoordinates, minCoordinate);
      System.arraycopy(uniqueCoordinates, 0, ring.getCoordinates(), 0, uniqueCoordinates.length);
      ring.getCoordinates()[uniqueCoordinates.length] = uniqueCoordinates[0];
      if (CGAlgorithms.isCCW(ring.getCoordinates()) === clockwise) {
        CoordinateArrays.reverse(ring.getCoordinates());
      }
    }
  };
  Polygon.prototype.getCoordinate = function getCoordinate () {
    return this._shell.getCoordinate()
  };
  Polygon.prototype.getNumInteriorRing = function getNumInteriorRing () {
    return this._holes.length
  };
  Polygon.prototype.getBoundaryDimension = function getBoundaryDimension () {
    return 1
  };
  Polygon.prototype.getDimension = function getDimension () {
    return 2
  };
  Polygon.prototype.getLength = function getLength () {
    var this$1 = this;

    var len = 0.0;
    len += this._shell.getLength();
    for (var i = 0; i < this._holes.length; i++) {
      len += this$1._holes[i].getLength();
    }
    return len
  };
  Polygon.prototype.getNumPoints = function getNumPoints () {
    var this$1 = this;

    var numPoints = this._shell.getNumPoints();
    for (var i = 0; i < this._holes.length; i++) {
      numPoints += this$1._holes[i].getNumPoints();
    }
    return numPoints
  };
  Polygon.prototype.reverse = function reverse () {
    var this$1 = this;

    var poly = this.copy();
    poly._shell = this._shell.copy().reverse();
    poly._holes = new Array(this._holes.length).fill(null);
    for (var i = 0; i < this._holes.length; i++) {
      poly._holes[i] = this$1._holes[i].copy().reverse();
    }
    return poly
  };
  Polygon.prototype.convexHull = function convexHull () {
    return this.getExteriorRing().convexHull()
  };
  Polygon.prototype.compareToSameClass = function compareToSameClass () {
    var this$1 = this;

    if (arguments.length === 1) {
      var o = arguments[0];
      var thisShell = this._shell;
      var otherShell = o._shell;
      return thisShell.compareToSameClass(otherShell)
    } else if (arguments.length === 2) {
      var o$1 = arguments[0];
      var comp = arguments[1];
      var poly = o$1;
      var thisShell$1 = this._shell;
      var otherShell$1 = poly._shell;
      var shellComp = thisShell$1.compareToSameClass(otherShell$1, comp);
      if (shellComp !== 0) { return shellComp }
      var nHole1 = this.getNumInteriorRing();
      var nHole2 = poly.getNumInteriorRing();
      var i = 0;
      while (i < nHole1 && i < nHole2) {
        var thisHole = this$1.getInteriorRingN(i);
        var otherHole = poly.getInteriorRingN(i);
        var holeComp = thisHole.compareToSameClass(otherHole, comp);
        if (holeComp !== 0) { return holeComp }
        i++;
      }
      if (i < nHole1) { return 1 }
      if (i < nHole2) { return -1 }
      return 0
    }
  };
  Polygon.prototype.apply = function apply (filter) {
    var this$1 = this;

    if (hasInterface(filter, CoordinateFilter)) {
      this._shell.apply(filter);
      for (var i$1 = 0; i$1 < this._holes.length; i$1++) {
        this$1._holes[i$1].apply(filter);
      }
    } else if (hasInterface(filter, CoordinateSequenceFilter)) {
      this._shell.apply(filter);
      if (!filter.isDone()) {
        for (var i$2 = 0; i$2 < this._holes.length; i$2++) {
          this$1._holes[i$2].apply(filter);
          if (filter.isDone()) { break }
        }
      }
      if (filter.isGeometryChanged()) { this.geometryChanged(); }
    } else if (hasInterface(filter, GeometryFilter)) {
      filter.filter(this);
    } else if (hasInterface(filter, GeometryComponentFilter)) {
      filter.filter(this);
      this._shell.apply(filter);
      for (var i = 0; i < this._holes.length; i++) {
        this$1._holes[i].apply(filter);
      }
    }
  };
  Polygon.prototype.getBoundary = function getBoundary () {
    var this$1 = this;

    if (this.isEmpty()) {
      return this.getFactory().createMultiLineString()
    }
    var rings = new Array(this._holes.length + 1).fill(null);
    rings[0] = this._shell;
    for (var i = 0; i < this._holes.length; i++) {
      rings[i + 1] = this$1._holes[i];
    }
    if (rings.length <= 1) { return this.getFactory().createLinearRing(rings[0].getCoordinateSequence()) }
    return this.getFactory().createMultiLineString(rings)
  };
  Polygon.prototype.clone = function clone () {
    var this$1 = this;

    var poly = Geometry$$1.prototype.clone.call(this);
    poly._shell = this._shell.clone();
    poly._holes = new Array(this._holes.length).fill(null);
    for (var i = 0; i < this._holes.length; i++) {
      poly._holes[i] = this$1._holes[i].clone();
    }
    return poly
  };
  Polygon.prototype.getGeometryType = function getGeometryType () {
    return 'Polygon'
  };
  Polygon.prototype.copy = function copy () {
    var this$1 = this;

    var shell = this._shell.copy();
    var holes = new Array(this._holes.length).fill(null);
    for (var i = 0; i < holes.length; i++) {
      holes[i] = this$1._holes[i].copy();
    }
    return new Polygon(shell, holes, this._factory)
  };
  Polygon.prototype.getExteriorRing = function getExteriorRing () {
    return this._shell
  };
  Polygon.prototype.isEmpty = function isEmpty () {
    return this._shell.isEmpty()
  };
  Polygon.prototype.getInteriorRingN = function getInteriorRingN (n) {
    return this._holes[n]
  };
  Polygon.prototype.interfaces_ = function interfaces_ () {
    return [Polygonal]
  };
  Polygon.prototype.getClass = function getClass () {
    return Polygon
  };
  staticAccessors.serialVersionUID.get = function () { return -3494792200821764533 };

  Object.defineProperties( Polygon, staticAccessors );

  return Polygon;
}(Geometry));

var MultiPoint = (function (GeometryCollection$$1) {
  function MultiPoint () {
    GeometryCollection$$1.apply(this, arguments);
  }

  if ( GeometryCollection$$1 ) MultiPoint.__proto__ = GeometryCollection$$1;
  MultiPoint.prototype = Object.create( GeometryCollection$$1 && GeometryCollection$$1.prototype );
  MultiPoint.prototype.constructor = MultiPoint;

  var staticAccessors = { serialVersionUID: { configurable: true } };

  MultiPoint.prototype.getSortIndex = function getSortIndex () {
    return Geometry.SORTINDEX_MULTIPOINT
  };
  MultiPoint.prototype.isValid = function isValid () {
    return true
  };
  MultiPoint.prototype.equalsExact = function equalsExact () {
    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      return GeometryCollection$$1.prototype.equalsExact.call(this, other, tolerance)
    } else { return GeometryCollection$$1.prototype.equalsExact.apply(this, arguments) }
  };
  MultiPoint.prototype.getCoordinate = function getCoordinate () {
    if (arguments.length === 1) {
      var n = arguments[0];
      return this._geometries[n].getCoordinate()
    } else { return GeometryCollection$$1.prototype.getCoordinate.apply(this, arguments) }
  };
  MultiPoint.prototype.getBoundaryDimension = function getBoundaryDimension () {
    return Dimension.FALSE
  };
  MultiPoint.prototype.getDimension = function getDimension () {
    return 0
  };
  MultiPoint.prototype.getBoundary = function getBoundary () {
    return this.getFactory().createGeometryCollection(null)
  };
  MultiPoint.prototype.getGeometryType = function getGeometryType () {
    return 'MultiPoint'
  };
  MultiPoint.prototype.copy = function copy () {
    var this$1 = this;

    var points = new Array(this._geometries.length).fill(null);
    for (var i = 0; i < points.length; i++) {
      points[i] = this$1._geometries[i].copy();
    }
    return new MultiPoint(points, this._factory)
  };
  MultiPoint.prototype.interfaces_ = function interfaces_ () {
    return [Puntal]
  };
  MultiPoint.prototype.getClass = function getClass () {
    return MultiPoint
  };
  staticAccessors.serialVersionUID.get = function () { return -8048474874175355449 };

  Object.defineProperties( MultiPoint, staticAccessors );

  return MultiPoint;
}(GeometryCollection));

var LinearRing = (function (LineString$$1) {
  function LinearRing (points, factory) {
    if (points instanceof Coordinate && factory instanceof GeometryFactory) {
      points = factory.getCoordinateSequenceFactory().create(points);
    }
    LineString$$1.call(this, points, factory);
    this.validateConstruction();
  }

  if ( LineString$$1 ) LinearRing.__proto__ = LineString$$1;
  LinearRing.prototype = Object.create( LineString$$1 && LineString$$1.prototype );
  LinearRing.prototype.constructor = LinearRing;

  var staticAccessors = { MINIMUM_VALID_SIZE: { configurable: true },serialVersionUID: { configurable: true } };
  LinearRing.prototype.getSortIndex = function getSortIndex () {
    return Geometry.SORTINDEX_LINEARRING
  };
  LinearRing.prototype.getBoundaryDimension = function getBoundaryDimension () {
    return Dimension.FALSE
  };
  LinearRing.prototype.isClosed = function isClosed () {
    if (this.isEmpty()) {
      return true
    }
    return LineString$$1.prototype.isClosed.call(this)
  };
  LinearRing.prototype.reverse = function reverse () {
    var seq = this._points.copy();
    CoordinateSequences.reverse(seq);
    var rev = this.getFactory().createLinearRing(seq);
    return rev
  };
  LinearRing.prototype.validateConstruction = function validateConstruction () {
    if (!this.isEmpty() && !LineString$$1.prototype.isClosed.call(this)) {
      throw new IllegalArgumentException('Points of LinearRing do not form a closed linestring')
    }
    if (this.getCoordinateSequence().size() >= 1 && this.getCoordinateSequence().size() < LinearRing.MINIMUM_VALID_SIZE) {
      throw new IllegalArgumentException('Invalid number of points in LinearRing (found ' + this.getCoordinateSequence().size() + ' - must be 0 or >= 4)')
    }
  };
  LinearRing.prototype.getGeometryType = function getGeometryType () {
    return 'LinearRing'
  };
  LinearRing.prototype.copy = function copy () {
    return new LinearRing(this._points.copy(), this._factory)
  };
  LinearRing.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  LinearRing.prototype.getClass = function getClass () {
    return LinearRing
  };
  staticAccessors.MINIMUM_VALID_SIZE.get = function () { return 4 };
  staticAccessors.serialVersionUID.get = function () { return -4261142084085851829 };

  Object.defineProperties( LinearRing, staticAccessors );

  return LinearRing;
}(LineString));

var MultiPolygon = (function (GeometryCollection$$1) {
  function MultiPolygon () {
    GeometryCollection$$1.apply(this, arguments);
  }

  if ( GeometryCollection$$1 ) MultiPolygon.__proto__ = GeometryCollection$$1;
  MultiPolygon.prototype = Object.create( GeometryCollection$$1 && GeometryCollection$$1.prototype );
  MultiPolygon.prototype.constructor = MultiPolygon;

  var staticAccessors = { serialVersionUID: { configurable: true } };

  MultiPolygon.prototype.getSortIndex = function getSortIndex () {
    return Geometry.SORTINDEX_MULTIPOLYGON
  };
  MultiPolygon.prototype.equalsExact = function equalsExact () {
    if (arguments.length === 2) {
      var other = arguments[0];
      var tolerance = arguments[1];
      if (!this.isEquivalentClass(other)) {
        return false
      }
      return GeometryCollection$$1.prototype.equalsExact.call(this, other, tolerance)
    } else { return GeometryCollection$$1.prototype.equalsExact.apply(this, arguments) }
  };
  MultiPolygon.prototype.getBoundaryDimension = function getBoundaryDimension () {
    return 1
  };
  MultiPolygon.prototype.getDimension = function getDimension () {
    return 2
  };
  MultiPolygon.prototype.reverse = function reverse () {
    var this$1 = this;

    var n = this._geometries.length;
    var revGeoms = new Array(n).fill(null);
    for (var i = 0; i < this._geometries.length; i++) {
      revGeoms[i] = this$1._geometries[i].reverse();
    }
    return this.getFactory().createMultiPolygon(revGeoms)
  };
  MultiPolygon.prototype.getBoundary = function getBoundary () {
    var this$1 = this;

    if (this.isEmpty()) {
      return this.getFactory().createMultiLineString()
    }
    var allRings = new ArrayList();
    for (var i = 0; i < this._geometries.length; i++) {
      var polygon = this$1._geometries[i];
      var rings = polygon.getBoundary();
      for (var j = 0; j < rings.getNumGeometries(); j++) {
        allRings.add(rings.getGeometryN(j));
      }
    }
    var allRingsArray = new Array(allRings.size()).fill(null);
    return this.getFactory().createMultiLineString(allRings.toArray(allRingsArray))
  };
  MultiPolygon.prototype.getGeometryType = function getGeometryType () {
    return 'MultiPolygon'
  };
  MultiPolygon.prototype.copy = function copy () {
    var this$1 = this;

    var polygons = new Array(this._geometries.length).fill(null);
    for (var i = 0; i < polygons.length; i++) {
      polygons[i] = this$1._geometries[i].copy();
    }
    return new MultiPolygon(polygons, this._factory)
  };
  MultiPolygon.prototype.interfaces_ = function interfaces_ () {
    return [Polygonal]
  };
  MultiPolygon.prototype.getClass = function getClass () {
    return MultiPolygon
  };
  staticAccessors.serialVersionUID.get = function () { return -551033529766975875 };

  Object.defineProperties( MultiPolygon, staticAccessors );

  return MultiPolygon;
}(GeometryCollection));

var GeometryEditor = function GeometryEditor (factory) {
  this._factory = factory || null;
  this._isUserDataCopied = false;
};

var staticAccessors$16 = { NoOpGeometryOperation: { configurable: true },CoordinateOperation: { configurable: true },CoordinateSequenceOperation: { configurable: true } };
GeometryEditor.prototype.setCopyUserData = function setCopyUserData (isUserDataCopied) {
  this._isUserDataCopied = isUserDataCopied;
};
GeometryEditor.prototype.edit = function edit (geometry, operation) {
  if (geometry === null) { return null }
  var result = this.editInternal(geometry, operation);
  if (this._isUserDataCopied) {
    result.setUserData(geometry.getUserData());
  }
  return result
};
GeometryEditor.prototype.editInternal = function editInternal (geometry, operation) {
  if (this._factory === null) { this._factory = geometry.getFactory(); }
  if (geometry instanceof GeometryCollection) {
    return this.editGeometryCollection(geometry, operation)
  }
  if (geometry instanceof Polygon) {
    return this.editPolygon(geometry, operation)
  }
  if (geometry instanceof Point) {
    return operation.edit(geometry, this._factory)
  }
  if (geometry instanceof LineString) {
    return operation.edit(geometry, this._factory)
  }
  Assert.shouldNeverReachHere('Unsupported Geometry class: ' + geometry.getClass().getName());
  return null
};
GeometryEditor.prototype.editGeometryCollection = function editGeometryCollection (collection, operation) {
    var this$1 = this;

  var collectionForType = operation.edit(collection, this._factory);
  var geometries = new ArrayList();
  for (var i = 0; i < collectionForType.getNumGeometries(); i++) {
    var geometry = this$1.edit(collectionForType.getGeometryN(i), operation);
    if (geometry === null || geometry.isEmpty()) {
      continue
    }
    geometries.add(geometry);
  }
  if (collectionForType.getClass() === MultiPoint) {
    return this._factory.createMultiPoint(geometries.toArray([]))
  }
  if (collectionForType.getClass() === MultiLineString) {
    return this._factory.createMultiLineString(geometries.toArray([]))
  }
  if (collectionForType.getClass() === MultiPolygon) {
    return this._factory.createMultiPolygon(geometries.toArray([]))
  }
  return this._factory.createGeometryCollection(geometries.toArray([]))
};
GeometryEditor.prototype.editPolygon = function editPolygon (polygon, operation) {
    var this$1 = this;

  var newPolygon = operation.edit(polygon, this._factory);
  if (newPolygon === null) { newPolygon = this._factory.createPolygon(null); }
  if (newPolygon.isEmpty()) {
    return newPolygon
  }
  var shell = this.edit(newPolygon.getExteriorRing(), operation);
  if (shell === null || shell.isEmpty()) {
    return this._factory.createPolygon()
  }
  var holes = new ArrayList();
  for (var i = 0; i < newPolygon.getNumInteriorRing(); i++) {
    var hole = this$1.edit(newPolygon.getInteriorRingN(i), operation);
    if (hole === null || hole.isEmpty()) {
      continue
    }
    holes.add(hole);
  }
  return this._factory.createPolygon(shell, holes.toArray([]))
};
GeometryEditor.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryEditor.prototype.getClass = function getClass () {
  return GeometryEditor
};
GeometryEditor.GeometryEditorOperation = function GeometryEditorOperation () {};
staticAccessors$16.NoOpGeometryOperation.get = function () { return NoOpGeometryOperation };
staticAccessors$16.CoordinateOperation.get = function () { return CoordinateOperation };
staticAccessors$16.CoordinateSequenceOperation.get = function () { return CoordinateSequenceOperation };

Object.defineProperties( GeometryEditor, staticAccessors$16 );

var NoOpGeometryOperation = function NoOpGeometryOperation () {};

NoOpGeometryOperation.prototype.edit = function edit (geometry, factory) {
  return geometry
};
NoOpGeometryOperation.prototype.interfaces_ = function interfaces_ () {
  return [GeometryEditor.GeometryEditorOperation]
};
NoOpGeometryOperation.prototype.getClass = function getClass () {
  return NoOpGeometryOperation
};

var CoordinateOperation = function CoordinateOperation () {};

CoordinateOperation.prototype.edit = function edit (geometry, factory) {
  var coords = this.editCoordinates(geometry.getCoordinates(), geometry);
  if (coords === null) { return geometry }
  if (geometry instanceof LinearRing) {
    return factory.createLinearRing(coords)
  }
  if (geometry instanceof LineString) {
    return factory.createLineString(coords)
  }
  if (geometry instanceof Point) {
    if (coords.length > 0) {
      return factory.createPoint(coords[0])
    } else {
      return factory.createPoint()
    }
  }
  return geometry
};
CoordinateOperation.prototype.interfaces_ = function interfaces_ () {
  return [GeometryEditor.GeometryEditorOperation]
};
CoordinateOperation.prototype.getClass = function getClass () {
  return CoordinateOperation
};

var CoordinateSequenceOperation = function CoordinateSequenceOperation () {};

CoordinateSequenceOperation.prototype.edit = function edit (geometry, factory) {
  if (geometry instanceof LinearRing) {
    return factory.createLinearRing(this.edit(geometry.getCoordinateSequence(), geometry))
  }
  if (geometry instanceof LineString) {
    return factory.createLineString(this.edit(geometry.getCoordinateSequence(), geometry))
  }
  if (geometry instanceof Point) {
    return factory.createPoint(this.edit(geometry.getCoordinateSequence(), geometry))
  }
  return geometry
};
CoordinateSequenceOperation.prototype.interfaces_ = function interfaces_ () {
  return [GeometryEditor.GeometryEditorOperation]
};
CoordinateSequenceOperation.prototype.getClass = function getClass () {
  return CoordinateSequenceOperation
};

var CoordinateArraySequence = function CoordinateArraySequence () {
  var this$1 = this;

  this._dimension = 3;
  this._coordinates = null;
  if (arguments.length === 1) {
    if (arguments[0] instanceof Array) {
      this._coordinates = arguments[0];
      this._dimension = 3;
    } else if (Number.isInteger(arguments[0])) {
      var size = arguments[0];
      this._coordinates = new Array(size).fill(null);
      for (var i = 0; i < size; i++) {
        this$1._coordinates[i] = new Coordinate();
      }
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordSeq = arguments[0];
      if (coordSeq === null) {
        this._coordinates = new Array(0).fill(null);
        return null
      }
      this._dimension = coordSeq.getDimension();
      this._coordinates = new Array(coordSeq.size()).fill(null);
      for (var i$1 = 0; i$1 < this._coordinates.length; i$1++) {
        this$1._coordinates[i$1] = coordSeq.getCoordinateCopy(i$1);
      }
    }
  } else if (arguments.length === 2) {
    if (arguments[0] instanceof Array && Number.isInteger(arguments[1])) {
      var coordinates = arguments[0];
      var dimension = arguments[1];
      this._coordinates = coordinates;
      this._dimension = dimension;
      if (coordinates === null) { this._coordinates = new Array(0).fill(null); }
    } else if (Number.isInteger(arguments[0]) && Number.isInteger(arguments[1])) {
      var size$1 = arguments[0];
      var dimension$1 = arguments[1];
      this._coordinates = new Array(size$1).fill(null);
      this._dimension = dimension$1;
      for (var i$2 = 0; i$2 < size$1; i$2++) {
        this$1._coordinates[i$2] = new Coordinate();
      }
    }
  }
};

var staticAccessors$18 = { serialVersionUID: { configurable: true } };
CoordinateArraySequence.prototype.setOrdinate = function setOrdinate (index, ordinateIndex, value) {
  switch (ordinateIndex) {
    case CoordinateSequence.X:
      this._coordinates[index].x = value;
      break
    case CoordinateSequence.Y:
      this._coordinates[index].y = value;
      break
    case CoordinateSequence.Z:
      this._coordinates[index].z = value;
      break
    default:
      throw new IllegalArgumentException('invalid ordinateIndex')
  }
};
CoordinateArraySequence.prototype.size = function size () {
  return this._coordinates.length
};
CoordinateArraySequence.prototype.getOrdinate = function getOrdinate (index, ordinateIndex) {
  switch (ordinateIndex) {
    case CoordinateSequence.X:
      return this._coordinates[index].x
    case CoordinateSequence.Y:
      return this._coordinates[index].y
    case CoordinateSequence.Z:
      return this._coordinates[index].z
    default:
  }
  return Double.NaN
};
CoordinateArraySequence.prototype.getCoordinate = function getCoordinate () {
  if (arguments.length === 1) {
    var i = arguments[0];
    return this._coordinates[i]
  } else if (arguments.length === 2) {
    var index = arguments[0];
    var coord = arguments[1];
    coord.x = this._coordinates[index].x;
    coord.y = this._coordinates[index].y;
    coord.z = this._coordinates[index].z;
  }
};
CoordinateArraySequence.prototype.getCoordinateCopy = function getCoordinateCopy (i) {
  return new Coordinate(this._coordinates[i])
};
CoordinateArraySequence.prototype.getDimension = function getDimension () {
  return this._dimension
};
CoordinateArraySequence.prototype.getX = function getX (index) {
  return this._coordinates[index].x
};
CoordinateArraySequence.prototype.clone = function clone () {
    var this$1 = this;

  var cloneCoordinates = new Array(this.size()).fill(null);
  for (var i = 0; i < this._coordinates.length; i++) {
    cloneCoordinates[i] = this$1._coordinates[i].clone();
  }
  return new CoordinateArraySequence(cloneCoordinates, this._dimension)
};
CoordinateArraySequence.prototype.expandEnvelope = function expandEnvelope (env) {
    var this$1 = this;

  for (var i = 0; i < this._coordinates.length; i++) {
    env.expandToInclude(this$1._coordinates[i]);
  }
  return env
};
CoordinateArraySequence.prototype.copy = function copy () {
    var this$1 = this;

  var cloneCoordinates = new Array(this.size()).fill(null);
  for (var i = 0; i < this._coordinates.length; i++) {
    cloneCoordinates[i] = this$1._coordinates[i].copy();
  }
  return new CoordinateArraySequence(cloneCoordinates, this._dimension)
};
CoordinateArraySequence.prototype.toString = function toString () {
    var this$1 = this;

  if (this._coordinates.length > 0) {
    var strBuf = new StringBuffer(17 * this._coordinates.length);
    strBuf.append('(');
    strBuf.append(this._coordinates[0]);
    for (var i = 1; i < this._coordinates.length; i++) {
      strBuf.append(', ');
      strBuf.append(this$1._coordinates[i]);
    }
    strBuf.append(')');
    return strBuf.toString()
  } else {
    return '()'
  }
};
CoordinateArraySequence.prototype.getY = function getY (index) {
  return this._coordinates[index].y
};
CoordinateArraySequence.prototype.toCoordinateArray = function toCoordinateArray () {
  return this._coordinates
};
CoordinateArraySequence.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateSequence, Serializable]
};
CoordinateArraySequence.prototype.getClass = function getClass () {
  return CoordinateArraySequence
};
staticAccessors$18.serialVersionUID.get = function () { return -915438501601840650 };

Object.defineProperties( CoordinateArraySequence, staticAccessors$18 );

var CoordinateArraySequenceFactory = function CoordinateArraySequenceFactory () {};

var staticAccessors$17 = { serialVersionUID: { configurable: true },instanceObject: { configurable: true } };

CoordinateArraySequenceFactory.prototype.readResolve = function readResolve () {
  return CoordinateArraySequenceFactory.instance()
};
CoordinateArraySequenceFactory.prototype.create = function create () {
  if (arguments.length === 1) {
    if (arguments[0] instanceof Array) {
      var coordinates = arguments[0];
      return new CoordinateArraySequence(coordinates)
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordSeq = arguments[0];
      return new CoordinateArraySequence(coordSeq)
    }
  } else if (arguments.length === 2) {
    var size = arguments[0];
    var dimension = arguments[1];
    if (dimension > 3) { dimension = 3; }
    if (dimension < 2) { return new CoordinateArraySequence(size) }
    return new CoordinateArraySequence(size, dimension)
  }
};
CoordinateArraySequenceFactory.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateSequenceFactory, Serializable]
};
CoordinateArraySequenceFactory.prototype.getClass = function getClass () {
  return CoordinateArraySequenceFactory
};
CoordinateArraySequenceFactory.instance = function instance () {
  return CoordinateArraySequenceFactory.instanceObject
};

staticAccessors$17.serialVersionUID.get = function () { return -4099577099607551657 };
staticAccessors$17.instanceObject.get = function () { return new CoordinateArraySequenceFactory() };

Object.defineProperties( CoordinateArraySequenceFactory, staticAccessors$17 );

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/HashMap.html
 *
 * @extends {javascript.util.Map}
 * @constructor
 * @private
 */
var HashMap = (function (MapInterface) {
  function HashMap () {
    MapInterface.call(this);
    this.map_ = new Map();
  }

  if ( MapInterface ) HashMap.__proto__ = MapInterface;
  HashMap.prototype = Object.create( MapInterface && MapInterface.prototype );
  HashMap.prototype.constructor = HashMap;
  /**
   * @override
   */
  HashMap.prototype.get = function get (key) {
    return this.map_.get(key) || null
  };

  /**
   * @override
   */
  HashMap.prototype.put = function put (key, value) {
    this.map_.set(key, value);
    return value
  };

  /**
   * @override
   */
  HashMap.prototype.values = function values () {
    var arrayList = new ArrayList();
    var it = this.map_.values();
    var o = it.next();
    while (!o.done) {
      arrayList.add(o.value);
      o = it.next();
    }
    return arrayList
  };

  /**
   * @override
   */
  HashMap.prototype.entrySet = function entrySet () {
    var hashSet = new HashSet();
    this.map_.entries().forEach(function (entry) { return hashSet.add(entry); });
    return hashSet
  };

  /**
   * @override
   */
  HashMap.prototype.size = function size () {
    return this.map_.size()
  };

  return HashMap;
}(Map$1));

var PrecisionModel = function PrecisionModel () {
  this._modelType = null;
  this._scale = null;
  if (arguments.length === 0) {
    this._modelType = PrecisionModel.FLOATING;
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Type) {
      var modelType = arguments[0];
      this._modelType = modelType;
      if (modelType === PrecisionModel.FIXED) {
        this.setScale(1.0);
      }
    } else if (typeof arguments[0] === 'number') {
      var scale = arguments[0];
      this._modelType = PrecisionModel.FIXED;
      this.setScale(scale);
    } else if (arguments[0] instanceof PrecisionModel) {
      var pm = arguments[0];
      this._modelType = pm._modelType;
      this._scale = pm._scale;
    }
  }
};

var staticAccessors$19 = { serialVersionUID: { configurable: true },maximumPreciseValue: { configurable: true } };
PrecisionModel.prototype.equals = function equals (other) {
  if (!(other instanceof PrecisionModel)) {
    return false
  }
  var otherPrecisionModel = other;
  return this._modelType === otherPrecisionModel._modelType && this._scale === otherPrecisionModel._scale
};
PrecisionModel.prototype.compareTo = function compareTo (o) {
  var other = o;
  var sigDigits = this.getMaximumSignificantDigits();
  var otherSigDigits = other.getMaximumSignificantDigits();
  return new Integer(sigDigits).compareTo(new Integer(otherSigDigits))
};
PrecisionModel.prototype.getScale = function getScale () {
  return this._scale
};
PrecisionModel.prototype.isFloating = function isFloating () {
  return this._modelType === PrecisionModel.FLOATING || this._modelType === PrecisionModel.FLOATING_SINGLE
};
PrecisionModel.prototype.getType = function getType () {
  return this._modelType
};
PrecisionModel.prototype.toString = function toString () {
  var description = 'UNKNOWN';
  if (this._modelType === PrecisionModel.FLOATING) {
    description = 'Floating';
  } else if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
    description = 'Floating-Single';
  } else if (this._modelType === PrecisionModel.FIXED) {
    description = 'Fixed (Scale=' + this.getScale() + ')';
  }
  return description
};
PrecisionModel.prototype.makePrecise = function makePrecise () {
  if (typeof arguments[0] === 'number') {
    var val = arguments[0];
    if (Double.isNaN(val)) { return val }
    if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
      var floatSingleVal = val;
      return floatSingleVal
    }
    if (this._modelType === PrecisionModel.FIXED) {
      return Math.round(val * this._scale) / this._scale
    }
    return val
  } else if (arguments[0] instanceof Coordinate) {
    var coord = arguments[0];
    if (this._modelType === PrecisionModel.FLOATING) { return null }
    coord.x = this.makePrecise(coord.x);
    coord.y = this.makePrecise(coord.y);
  }
};
PrecisionModel.prototype.getMaximumSignificantDigits = function getMaximumSignificantDigits () {
  var maxSigDigits = 16;
  if (this._modelType === PrecisionModel.FLOATING) {
    maxSigDigits = 16;
  } else if (this._modelType === PrecisionModel.FLOATING_SINGLE) {
    maxSigDigits = 6;
  } else if (this._modelType === PrecisionModel.FIXED) {
    maxSigDigits = 1 + Math.trunc(Math.ceil(Math.log(this.getScale()) / Math.log(10)));
  }
  return maxSigDigits
};
PrecisionModel.prototype.setScale = function setScale (scale) {
  this._scale = Math.abs(scale);
};
PrecisionModel.prototype.interfaces_ = function interfaces_ () {
  return [Serializable, Comparable]
};
PrecisionModel.prototype.getClass = function getClass () {
  return PrecisionModel
};
PrecisionModel.mostPrecise = function mostPrecise (pm1, pm2) {
  if (pm1.compareTo(pm2) >= 0) { return pm1 }
  return pm2
};
staticAccessors$19.serialVersionUID.get = function () { return 7777263578777803835 };
staticAccessors$19.maximumPreciseValue.get = function () { return 9007199254740992.0 };

Object.defineProperties( PrecisionModel, staticAccessors$19 );

var Type = function Type (name) {
  this._name = name || null;
  Type.nameToTypeMap.put(name, this);
};

var staticAccessors$1$1 = { serialVersionUID: { configurable: true },nameToTypeMap: { configurable: true } };
Type.prototype.readResolve = function readResolve () {
  return Type.nameToTypeMap.get(this._name)
};
Type.prototype.toString = function toString () {
  return this._name
};
Type.prototype.interfaces_ = function interfaces_ () {
  return [Serializable]
};
Type.prototype.getClass = function getClass () {
  return Type
};
staticAccessors$1$1.serialVersionUID.get = function () { return -5528602631731589822 };
staticAccessors$1$1.nameToTypeMap.get = function () { return new HashMap() };

Object.defineProperties( Type, staticAccessors$1$1 );

PrecisionModel.Type = Type;
PrecisionModel.FIXED = new Type('FIXED');
PrecisionModel.FLOATING = new Type('FLOATING');
PrecisionModel.FLOATING_SINGLE = new Type('FLOATING SINGLE');

var GeometryFactory = function GeometryFactory () {
  this._precisionModel = new PrecisionModel();
  this._SRID = 0;
  this._coordinateSequenceFactory = GeometryFactory.getDefaultCoordinateSequenceFactory();

  if (arguments.length === 0) {
  } else if (arguments.length === 1) {
    if (hasInterface(arguments[0], CoordinateSequenceFactory)) {
      this._coordinateSequenceFactory = arguments[0];
    } else if (arguments[0] instanceof PrecisionModel) {
      this._precisionModel = arguments[0];
    }
  } else if (arguments.length === 2) {
    this._precisionModel = arguments[0];
    this._SRID = arguments[1];
  } else if (arguments.length === 3) {
    this._precisionModel = arguments[0];
    this._SRID = arguments[1];
    this._coordinateSequenceFactory = arguments[2];
  }
};

var staticAccessors$2 = { serialVersionUID: { configurable: true } };
GeometryFactory.prototype.toGeometry = function toGeometry (envelope) {
  if (envelope.isNull()) {
    return this.createPoint(null)
  }
  if (envelope.getMinX() === envelope.getMaxX() && envelope.getMinY() === envelope.getMaxY()) {
    return this.createPoint(new Coordinate(envelope.getMinX(), envelope.getMinY()))
  }
  if (envelope.getMinX() === envelope.getMaxX() || envelope.getMinY() === envelope.getMaxY()) {
    return this.createLineString([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY())])
  }
  return this.createPolygon(this.createLinearRing([new Coordinate(envelope.getMinX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMaxY()), new Coordinate(envelope.getMaxX(), envelope.getMinY()), new Coordinate(envelope.getMinX(), envelope.getMinY())]), null)
};
GeometryFactory.prototype.createLineString = function createLineString (coordinates) {
  if (!coordinates) { return new LineString(this.getCoordinateSequenceFactory().create([]), this) }
  else if (coordinates instanceof Array) { return new LineString(this.getCoordinateSequenceFactory().create(coordinates), this) }
  else if (hasInterface(coordinates, CoordinateSequence)) { return new LineString(coordinates, this) }
};
GeometryFactory.prototype.createMultiLineString = function createMultiLineString () {
  if (arguments.length === 0) {
    return new MultiLineString(null, this)
  } else if (arguments.length === 1) {
    var lineStrings = arguments[0];
    return new MultiLineString(lineStrings, this)
  }
};
GeometryFactory.prototype.buildGeometry = function buildGeometry (geomList) {
  var geomClass = null;
  var isHeterogeneous = false;
  var hasGeometryCollection = false;
  for (var i = geomList.iterator(); i.hasNext();) {
    var geom = i.next();
    var partClass = geom.getClass();
    if (geomClass === null) {
      geomClass = partClass;
    }
    if (partClass !== geomClass) {
      isHeterogeneous = true;
    }
    if (geom.isGeometryCollectionOrDerived()) { hasGeometryCollection = true; }
  }
  if (geomClass === null) {
    return this.createGeometryCollection()
  }
  if (isHeterogeneous || hasGeometryCollection) {
    return this.createGeometryCollection(GeometryFactory.toGeometryArray(geomList))
  }
  var geom0 = geomList.iterator().next();
  var isCollection = geomList.size() > 1;
  if (isCollection) {
    if (geom0 instanceof Polygon) {
      return this.createMultiPolygon(GeometryFactory.toPolygonArray(geomList))
    } else if (geom0 instanceof LineString) {
      return this.createMultiLineString(GeometryFactory.toLineStringArray(geomList))
    } else if (geom0 instanceof Point) {
      return this.createMultiPoint(GeometryFactory.toPointArray(geomList))
    }
    Assert.shouldNeverReachHere('Unhandled class: ' + geom0.getClass().getName());
  }
  return geom0
};
GeometryFactory.prototype.createMultiPointFromCoords = function createMultiPointFromCoords (coordinates) {
  return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
};
GeometryFactory.prototype.createPoint = function createPoint () {
  if (arguments.length === 0) {
    return this.createPoint(this.getCoordinateSequenceFactory().create([]))
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Coordinate) {
      var coordinate = arguments[0];
      return this.createPoint(coordinate !== null ? this.getCoordinateSequenceFactory().create([coordinate]) : null)
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordinates = arguments[0];
      return new Point(coordinates, this)
    }
  }
};
GeometryFactory.prototype.getCoordinateSequenceFactory = function getCoordinateSequenceFactory () {
  return this._coordinateSequenceFactory
};
GeometryFactory.prototype.createPolygon = function createPolygon () {
  if (arguments.length === 0) {
    return new Polygon(null, null, this)
  } else if (arguments.length === 1) {
    if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordinates = arguments[0];
      return this.createPolygon(this.createLinearRing(coordinates))
    } else if (arguments[0] instanceof Array) {
      var coordinates$1 = arguments[0];
      return this.createPolygon(this.createLinearRing(coordinates$1))
    } else if (arguments[0] instanceof LinearRing) {
      var shell = arguments[0];
      return this.createPolygon(shell, null)
    }
  } else if (arguments.length === 2) {
    var shell$1 = arguments[0];
    var holes = arguments[1];
    return new Polygon(shell$1, holes, this)
  }
};
GeometryFactory.prototype.getSRID = function getSRID () {
  return this._SRID
};
GeometryFactory.prototype.createGeometryCollection = function createGeometryCollection () {
  if (arguments.length === 0) {
    return new GeometryCollection(null, this)
  } else if (arguments.length === 1) {
    var geometries = arguments[0];
    return new GeometryCollection(geometries, this)
  }
};
GeometryFactory.prototype.createGeometry = function createGeometry (g) {
  var editor = new GeometryEditor(this);
  return editor.edit(g, {
    edit: function () {
      if (arguments.length === 2) {
        var coordSeq = arguments[0];
        // const geometry = arguments[1]
        return this._coordinateSequenceFactory.create(coordSeq)
      }
    }
  })
};
GeometryFactory.prototype.getPrecisionModel = function getPrecisionModel () {
  return this._precisionModel
};
GeometryFactory.prototype.createLinearRing = function createLinearRing () {
  if (arguments.length === 0) {
    return this.createLinearRing(this.getCoordinateSequenceFactory().create([]))
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Array) {
      var coordinates = arguments[0];
      return this.createLinearRing(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordinates$1 = arguments[0];
      return new LinearRing(coordinates$1, this)
    }
  }
};
GeometryFactory.prototype.createMultiPolygon = function createMultiPolygon () {
  if (arguments.length === 0) {
    return new MultiPolygon(null, this)
  } else if (arguments.length === 1) {
    var polygons = arguments[0];
    return new MultiPolygon(polygons, this)
  }
};
GeometryFactory.prototype.createMultiPoint = function createMultiPoint () {
    var this$1 = this;

  if (arguments.length === 0) {
    return new MultiPoint(null, this)
  } else if (arguments.length === 1) {
    if (arguments[0] instanceof Array) {
      var point = arguments[0];
      return new MultiPoint(point, this)
    } else if (arguments[0] instanceof Array) {
      var coordinates = arguments[0];
      return this.createMultiPoint(coordinates !== null ? this.getCoordinateSequenceFactory().create(coordinates) : null)
    } else if (hasInterface(arguments[0], CoordinateSequence)) {
      var coordinates$1 = arguments[0];
      if (coordinates$1 === null) {
        return this.createMultiPoint(new Array(0).fill(null))
      }
      var points = new Array(coordinates$1.size()).fill(null);
      for (var i = 0; i < coordinates$1.size(); i++) {
        var ptSeq = this$1.getCoordinateSequenceFactory().create(1, coordinates$1.getDimension());
        CoordinateSequences.copy(coordinates$1, i, ptSeq, 0, 1);
        points[i] = this$1.createPoint(ptSeq);
      }
      return this.createMultiPoint(points)
    }
  }
};
GeometryFactory.prototype.interfaces_ = function interfaces_ () {
  return [Serializable]
};
GeometryFactory.prototype.getClass = function getClass () {
  return GeometryFactory
};
GeometryFactory.toMultiPolygonArray = function toMultiPolygonArray (multiPolygons) {
  var multiPolygonArray = new Array(multiPolygons.size()).fill(null);
  return multiPolygons.toArray(multiPolygonArray)
};
GeometryFactory.toGeometryArray = function toGeometryArray (geometries) {
  if (geometries === null) { return null }
  var geometryArray = new Array(geometries.size()).fill(null);
  return geometries.toArray(geometryArray)
};
GeometryFactory.getDefaultCoordinateSequenceFactory = function getDefaultCoordinateSequenceFactory () {
  return CoordinateArraySequenceFactory.instance()
};
GeometryFactory.toMultiLineStringArray = function toMultiLineStringArray (multiLineStrings) {
  var multiLineStringArray = new Array(multiLineStrings.size()).fill(null);
  return multiLineStrings.toArray(multiLineStringArray)
};
GeometryFactory.toLineStringArray = function toLineStringArray (lineStrings) {
  var lineStringArray = new Array(lineStrings.size()).fill(null);
  return lineStrings.toArray(lineStringArray)
};
GeometryFactory.toMultiPointArray = function toMultiPointArray (multiPoints) {
  var multiPointArray = new Array(multiPoints.size()).fill(null);
  return multiPoints.toArray(multiPointArray)
};
GeometryFactory.toLinearRingArray = function toLinearRingArray (linearRings) {
  var linearRingArray = new Array(linearRings.size()).fill(null);
  return linearRings.toArray(linearRingArray)
};
GeometryFactory.toPointArray = function toPointArray (points) {
  var pointArray = new Array(points.size()).fill(null);
  return points.toArray(pointArray)
};
GeometryFactory.toPolygonArray = function toPolygonArray (polygons) {
  var polygonArray = new Array(polygons.size()).fill(null);
  return polygons.toArray(polygonArray)
};
GeometryFactory.createPointFromInternalCoord = function createPointFromInternalCoord (coord, exemplar) {
  exemplar.getPrecisionModel().makePrecise(coord);
  return exemplar.getFactory().createPoint(coord)
};
staticAccessors$2.serialVersionUID.get = function () { return -6820524753094095635 };

Object.defineProperties( GeometryFactory, staticAccessors$2 );

var geometryTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'];

/**
 * Class for reading and writing Well-Known Text.Create a new parser for GeoJSON
 * NOTE: Adapted from OpenLayers 2.11 implementation.
 */

/**
 * Create a new parser for GeoJSON
 *
 * @param {GeometryFactory} geometryFactory
 * @return An instance of GeoJsonParser.
 * @constructor
 * @private
 */
var GeoJSONParser = function GeoJSONParser (geometryFactory) {
  this.geometryFactory = geometryFactory || new GeometryFactory();
};
/**
 * Deserialize a GeoJSON object and return the Geometry or Feature(Collection) with JSTS Geometries
 *
 * @param {}
 *        A GeoJSON object.
 * @return {} A Geometry instance or object representing a Feature(Collection) with Geometry instances.
 * @private
 */
GeoJSONParser.prototype.read = function read (json) {
  var obj;
  if (typeof json === 'string') {
    obj = JSON.parse(json);
  } else {
    obj = json;
  }

  var type = obj.type;

  if (!parse[type]) {
    throw new Error('Unknown GeoJSON type: ' + obj.type)
  }

  if (geometryTypes.indexOf(type) !== -1) {
    return parse[type].apply(this, [obj.coordinates])
  } else if (type === 'GeometryCollection') {
    return parse[type].apply(this, [obj.geometries])
  }

  // feature or feature collection
  return parse[type].apply(this, [obj])
};

/**
 * Serialize a Geometry object into GeoJSON
 *
 * @param {Geometry}
 *        geometry A Geometry or array of Geometries.
 * @return {Object} A GeoJSON object represting the input Geometry/Geometries.
 * @private
 */
GeoJSONParser.prototype.write = function write (geometry) {
  var type = geometry.getGeometryType();

  if (!extract[type]) {
    throw new Error('Geometry is not supported')
  }

  return extract[type].apply(this, [geometry])
};

var parse = {
  /**
   * Parse a GeoJSON Feature object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} Feature with geometry/bbox converted to JSTS Geometries.
   */
  Feature: function (obj) {
    var feature = {};

    // copy features
    for (var key in obj) {
      feature[key] = obj[key];
    }

    // parse geometry
    if (obj.geometry) {
      var type = obj.geometry.type;
      if (!parse[type]) {
        throw new Error('Unknown GeoJSON type: ' + obj.type)
      }
      feature.geometry = this.read(obj.geometry);
    }

    // bbox
    if (obj.bbox) {
      feature.bbox = parse.bbox.apply(this, [obj.bbox]);
    }

    return feature
  },

  /**
   * Parse a GeoJSON FeatureCollection object
   *
   * @param {Object}
   *          obj Object to parse.
   *
   * @return {Object} FeatureCollection with geometry/bbox converted to JSTS Geometries.
   */
  FeatureCollection: function (obj) {
    var this$1 = this;

    var featureCollection = {};

    if (obj.features) {
      featureCollection.features = [];

      for (var i = 0; i < obj.features.length; ++i) {
        featureCollection.features.push(this$1.read(obj.features[i]));
      }
    }

    if (obj.bbox) {
      featureCollection.bbox = this.parse.bbox.apply(this, [obj.bbox]);
    }

    return featureCollection
  },

  /**
   * Convert the ordinates in an array to an array of Coordinates
   *
   * @param {Array}
   *          array Array with {Number}s.
   *
   * @return {Array} Array with Coordinates.
   */
  coordinates: function (array) {
    var coordinates = [];
    for (var i = 0; i < array.length; ++i) {
      var sub = array[i];
      coordinates.push(new Coordinate(sub[0], sub[1]));
    }
    return coordinates
  },

  /**
   * Convert the bbox to a LinearRing
   *
   * @param {Array}
   *          array Array with [xMin, yMin, xMax, yMax].
   *
   * @return {Array} Array with Coordinates.
   */
  bbox: function (array) {
    return this.geometryFactory.createLinearRing([
      new Coordinate(array[0], array[1]),
      new Coordinate(array[2], array[1]),
      new Coordinate(array[2], array[3]),
      new Coordinate(array[0], array[3]),
      new Coordinate(array[0], array[1])
    ])
  },

  /**
   * Convert an Array with ordinates to a Point
   *
   * @param {Array}
   *          array Array with ordinates.
   *
   * @return {Point} Point.
   */
  Point: function (array) {
    var coordinate = new Coordinate(array[0], array[1]);
    return this.geometryFactory.createPoint(coordinate)
  },

  /**
   * Convert an Array with coordinates to a MultiPoint
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiPoint} MultiPoint.
   */
  MultiPoint: function (array) {
    var this$1 = this;

    var points = [];
    for (var i = 0; i < array.length; ++i) {
      points.push(parse.Point.apply(this$1, [array[i]]));
    }
    return this.geometryFactory.createMultiPoint(points)
  },

  /**
   * Convert an Array with coordinates to a LineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {LineString} LineString.
   */
  LineString: function (array) {
    var coordinates = parse.coordinates.apply(this, [array]);
    return this.geometryFactory.createLineString(coordinates)
  },

  /**
   * Convert an Array with coordinates to a MultiLineString
   *
   * @param {Array}
   *          array Array with coordinates.
   *
   * @return {MultiLineString} MultiLineString.
   */
  MultiLineString: function (array) {
    var this$1 = this;

    var lineStrings = [];
    for (var i = 0; i < array.length; ++i) {
      lineStrings.push(parse.LineString.apply(this$1, [array[i]]));
    }
    return this.geometryFactory.createMultiLineString(lineStrings)
  },

  /**
   * Convert an Array to a Polygon
   *
   * @param {Array}
   *          array Array with shell and holes.
   *
   * @return {Polygon} Polygon.
   */
  Polygon: function (array) {
    var this$1 = this;

    var shellCoordinates = parse.coordinates.apply(this, [array[0]]);
    var shell = this.geometryFactory.createLinearRing(shellCoordinates);
    var holes = [];
    for (var i = 1; i < array.length; ++i) {
      var hole = array[i];
      var coordinates = parse.coordinates.apply(this$1, [hole]);
      var linearRing = this$1.geometryFactory.createLinearRing(coordinates);
      holes.push(linearRing);
    }
    return this.geometryFactory.createPolygon(shell, holes)
  },

  /**
   * Convert an Array to a MultiPolygon
   *
   * @param {Array}
   *          array Array of arrays with shell and rings.
   *
   * @return {MultiPolygon} MultiPolygon.
   */
  MultiPolygon: function (array) {
    var this$1 = this;

    var polygons = [];
    for (var i = 0; i < array.length; ++i) {
      var polygon = array[i];
      polygons.push(parse.Polygon.apply(this$1, [polygon]));
    }
    return this.geometryFactory.createMultiPolygon(polygons)
  },

  /**
   * Convert an Array to a GeometryCollection
   *
   * @param {Array}
   *          array Array of GeoJSON geometries.
   *
   * @return {GeometryCollection} GeometryCollection.
   */
  GeometryCollection: function (array) {
    var this$1 = this;

    var geometries = [];
    for (var i = 0; i < array.length; ++i) {
      var geometry = array[i];
      geometries.push(this$1.read(geometry));
    }
    return this.geometryFactory.createGeometryCollection(geometries)
  }
};

var extract = {
  /**
   * Convert a Coordinate to an Array
   *
   * @param {Coordinate}
   *          coordinate Coordinate to convert.
   *
   * @return {Array} Array of ordinates.
   */
  coordinate: function (coordinate) {
    return [coordinate.x, coordinate.y]
  },

  /**
   * Convert a Point to a GeoJSON object
   *
   * @param {Point}
   *          point Point to convert.
   *
   * @return {Array} Array of 2 ordinates (paired to a coordinate).
   */
  Point: function (point) {
    var array = extract.coordinate.apply(this, [point.getCoordinate()]);
    return {
      type: 'Point',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPoint to a GeoJSON object
   *
   * @param {MultiPoint}
   *          multipoint MultiPoint to convert.
   *
   * @return {Array} Array of coordinates.
   */
  MultiPoint: function (multipoint) {
    var this$1 = this;

    var array = [];
    for (var i = 0; i < multipoint._geometries.length; ++i) {
      var point = multipoint._geometries[i];
      var geoJson = extract.Point.apply(this$1, [point]);
      array.push(geoJson.coordinates);
    }
    return {
      type: 'MultiPoint',
      coordinates: array
    }
  },

  /**
   * Convert a LineString to a GeoJSON object
   *
   * @param {LineString}
   *          linestring LineString to convert.
   *
   * @return {Array} Array of coordinates.
   */
  LineString: function (linestring) {
    var this$1 = this;

    var array = [];
    var coordinates = linestring.getCoordinates();
    for (var i = 0; i < coordinates.length; ++i) {
      var coordinate = coordinates[i];
      array.push(extract.coordinate.apply(this$1, [coordinate]));
    }
    return {
      type: 'LineString',
      coordinates: array
    }
  },

  /**
   * Convert a MultiLineString to a GeoJSON object
   *
   * @param {MultiLineString}
   *          multilinestring MultiLineString to convert.
   *
   * @return {Array} Array of Array of coordinates.
   */
  MultiLineString: function (multilinestring) {
    var this$1 = this;

    var array = [];
    for (var i = 0; i < multilinestring._geometries.length; ++i) {
      var linestring = multilinestring._geometries[i];
      var geoJson = extract.LineString.apply(this$1, [linestring]);
      array.push(geoJson.coordinates);
    }
    return {
      type: 'MultiLineString',
      coordinates: array
    }
  },

  /**
   * Convert a Polygon to a GeoJSON object
   *
   * @param {Polygon}
   *          polygon Polygon to convert.
   *
   * @return {Array} Array with shell, holes.
   */
  Polygon: function (polygon) {
    var this$1 = this;

    var array = [];
    var shellGeoJson = extract.LineString.apply(this, [polygon._shell]);
    array.push(shellGeoJson.coordinates);
    for (var i = 0; i < polygon._holes.length; ++i) {
      var hole = polygon._holes[i];
      var holeGeoJson = extract.LineString.apply(this$1, [hole]);
      array.push(holeGeoJson.coordinates);
    }
    return {
      type: 'Polygon',
      coordinates: array
    }
  },

  /**
   * Convert a MultiPolygon to a GeoJSON object
   *
   * @param {MultiPolygon}
   *          multipolygon MultiPolygon to convert.
   *
   * @return {Array} Array of polygons.
   */
  MultiPolygon: function (multipolygon) {
    var this$1 = this;

    var array = [];
    for (var i = 0; i < multipolygon._geometries.length; ++i) {
      var polygon = multipolygon._geometries[i];
      var geoJson = extract.Polygon.apply(this$1, [polygon]);
      array.push(geoJson.coordinates);
    }
    return {
      type: 'MultiPolygon',
      coordinates: array
    }
  },

  /**
   * Convert a GeometryCollection to a GeoJSON object
   *
   * @param {GeometryCollection}
   *          collection GeometryCollection to convert.
   *
   * @return {Array} Array of geometries.
   */
  GeometryCollection: function (collection) {
    var this$1 = this;

    var array = [];
    for (var i = 0; i < collection._geometries.length; ++i) {
      var geometry = collection._geometries[i];
      var type = geometry.getGeometryType();
      array.push(extract[type].apply(this$1, [geometry]));
    }
    return {
      type: 'GeometryCollection',
      geometries: array
    }
  }
};

/**
 * Converts a geometry in GeoJSON to a {@link Geometry}.
 */

/**
 * A <code>GeoJSONReader</code> is parameterized by a <code>GeometryFactory</code>,
 * to allow it to create <code>Geometry</code> objects of the appropriate
 * implementation. In particular, the <code>GeometryFactory</code> determines
 * the <code>PrecisionModel</code> and <code>SRID</code> that is used.
 *
 * @param {GeometryFactory} geometryFactory
 * @constructor
 */
var GeoJSONReader = function GeoJSONReader (geometryFactory) {
  this.geometryFactory = geometryFactory || new GeometryFactory();
  this.precisionModel = this.geometryFactory.getPrecisionModel();
  this.parser = new GeoJSONParser(this.geometryFactory);
};
/**
 * Reads a GeoJSON representation of a {@link Geometry}
 *
 * Will also parse GeoJSON Features/FeatureCollections as custom objects.
 *
 * @param {Object|String} geoJson a GeoJSON Object or String.
 * @return {Geometry|Object} a <code>Geometry or Feature/FeatureCollection representation.</code>
 * @memberof GeoJSONReader
 */
GeoJSONReader.prototype.read = function read (geoJson) {
  var geometry = this.parser.read(geoJson);

  if (this.precisionModel.getType() === PrecisionModel.FIXED) {
    this.reducePrecision(geometry);
  }

  return geometry
};

// NOTE: this is a hack
GeoJSONReader.prototype.reducePrecision = function reducePrecision (geometry) {
    var this$1 = this;

  var i, len;

  if (geometry.coordinate) {
    this.precisionModel.makePrecise(geometry.coordinate);
  } else if (geometry.points) {
    for (i = 0, len = geometry.points.length; i < len; i++) {
      this$1.precisionModel.makePrecise(geometry.points[i]);
    }
  } else if (geometry.geometries) {
    for (i = 0, len = geometry.geometries.length; i < len; i++) {
      this$1.reducePrecision(geometry.geometries[i]);
    }
  }
};

/**
 * @module GeoJSONWriter
 */

/**
 * Writes the GeoJSON representation of a {@link Geometry}. The
 * The GeoJSON format is defined <A
 * HREF="http://geojson.org/geojson-spec.html">here</A>.
 */

/**
 * The <code>GeoJSONWriter</code> outputs coordinates rounded to the precision
 * model. Only the maximum number of decimal places necessary to represent the
 * ordinates to the required precision will be output.
 *
 * @param {GeometryFactory} geometryFactory
 * @constructor
 */
var GeoJSONWriter = function GeoJSONWriter () {
  this.parser = new GeoJSONParser(this.geometryFactory);
};
/**
 * Converts a <code>Geometry</code> to its GeoJSON representation.
 *
 * @param {Geometry}
 *        geometry a <code>Geometry</code> to process.
 * @return {Object} The GeoJSON representation of the Geometry.
 * @memberof GeoJSONWriter
 */
GeoJSONWriter.prototype.write = function write (geometry) {
  return this.parser.write(geometry)
};

/* eslint-disable no-undef */

// io

var Position = function Position () {};

var staticAccessors$20 = { ON: { configurable: true },LEFT: { configurable: true },RIGHT: { configurable: true } };

Position.prototype.interfaces_ = function interfaces_ () {
  return []
};
Position.prototype.getClass = function getClass () {
  return Position
};
Position.opposite = function opposite (position) {
  if (position === Position.LEFT) { return Position.RIGHT }
  if (position === Position.RIGHT) { return Position.LEFT }
  return position
};
staticAccessors$20.ON.get = function () { return 0 };
staticAccessors$20.LEFT.get = function () { return 1 };
staticAccessors$20.RIGHT.get = function () { return 2 };

Object.defineProperties( Position, staticAccessors$20 );

/**
 * @param {string=} message Optional message
 * @extends {Error}
 * @constructor
 * @private
 */
function EmptyStackException (message) {
  this.message = message || '';
}
EmptyStackException.prototype = new Error();

/**
 * @type {string}
 */
EmptyStackException.prototype.name = 'EmptyStackException';

/**
 * @see http://download.oracle.com/javase/6/docs/api/java/util/Stack.html
 *
 * @extends {List}
 * @constructor
 * @private
 */
function Stack () {
  /**
   * @type {Array}
   * @private
   */
  this.array_ = [];
}
Stack.prototype = new List();

/**
 * @override
 */
Stack.prototype.add = function (e) {
  this.array_.push(e);
  return true
};

/**
 * @override
 */
Stack.prototype.get = function (index) {
  if (index < 0 || index >= this.size()) {
    throw new Error()
  }

  return this.array_[index]
};

/**
 * Pushes an item onto the top of this stack.
 * @param {Object} e
 * @return {Object}
 */
Stack.prototype.push = function (e) {
  this.array_.push(e);
  return e
};

/**
 * Pushes an item onto the top of this stack.
 * @param {Object} e
 * @return {Object}
 */
Stack.prototype.pop = function (e) {
  if (this.array_.length === 0) {
    throw new EmptyStackException()
  }

  return this.array_.pop()
};

/**
 * Looks at the object at the top of this stack without removing it from the
 * stack.
 * @return {Object}
 */
Stack.prototype.peek = function () {
  if (this.array_.length === 0) {
    throw new EmptyStackException()
  }

  return this.array_[this.array_.length - 1]
};

/**
 * Tests if this stack is empty.
 * @return {boolean} true if and only if this stack contains no items; false
 *         otherwise.
 */
Stack.prototype.empty = function () {
  if (this.array_.length === 0) {
    return true
  } else {
    return false
  }
};

/**
 * @return {boolean}
 */
Stack.prototype.isEmpty = function () {
  return this.empty()
};

/**
 * Returns the 1-based position where an object is on this stack. If the object
 * o occurs as an item in this stack, this method returns the distance from the
 * top of the stack of the occurrence nearest the top of the stack; the topmost
 * item on the stack is considered to be at distance 1. The equals method is
 * used to compare o to the items in this stack.
 *
 * NOTE: does not currently actually use equals. (=== is used)
 *
 * @param {Object} o
 * @return {number} the 1-based position from the top of the stack where the
 *         object is located; the return value -1 indicates that the object is
 *         not on the stack.
 */
Stack.prototype.search = function (o) {
  return this.array_.indexOf(o)
};

/**
 * @return {number}
 * @export
 */
Stack.prototype.size = function () {
  return this.array_.length
};

/**
 * @return {Array}
 */
Stack.prototype.toArray = function () {
  var this$1 = this;

  var array = [];

  for (var i = 0, len = this.array_.length; i < len; i++) {
    array.push(this$1.array_[i]);
  }

  return array
};

var RightmostEdgeFinder = function RightmostEdgeFinder () {
  this._minIndex = -1;
  this._minCoord = null;
  this._minDe = null;
  this._orientedDe = null;
};
RightmostEdgeFinder.prototype.getCoordinate = function getCoordinate () {
  return this._minCoord
};
RightmostEdgeFinder.prototype.getRightmostSide = function getRightmostSide (de, index) {
  var side = this.getRightmostSideOfSegment(de, index);
  if (side < 0) { side = this.getRightmostSideOfSegment(de, index - 1); }
  if (side < 0) {
    this._minCoord = null;
    this.checkForRightmostCoordinate(de);
  }
  return side
};
RightmostEdgeFinder.prototype.findRightmostEdgeAtVertex = function findRightmostEdgeAtVertex () {
  var pts = this._minDe.getEdge().getCoordinates();
  Assert.isTrue(this._minIndex > 0 && this._minIndex < pts.length, 'rightmost point expected to be interior vertex of edge');
  var pPrev = pts[this._minIndex - 1];
  var pNext = pts[this._minIndex + 1];
  var orientation = CGAlgorithms.computeOrientation(this._minCoord, pNext, pPrev);
  var usePrev = false;
  if (pPrev.y < this._minCoord.y && pNext.y < this._minCoord.y && orientation === CGAlgorithms.COUNTERCLOCKWISE) {
    usePrev = true;
  } else if (pPrev.y > this._minCoord.y && pNext.y > this._minCoord.y && orientation === CGAlgorithms.CLOCKWISE) {
    usePrev = true;
  }
  if (usePrev) {
    this._minIndex = this._minIndex - 1;
  }
};
RightmostEdgeFinder.prototype.getRightmostSideOfSegment = function getRightmostSideOfSegment (de, i) {
  var e = de.getEdge();
  var coord = e.getCoordinates();
  if (i < 0 || i + 1 >= coord.length) { return -1 }
  if (coord[i].y === coord[i + 1].y) { return -1 }
  var pos = Position.LEFT;
  if (coord[i].y < coord[i + 1].y) { pos = Position.RIGHT; }
  return pos
};
RightmostEdgeFinder.prototype.getEdge = function getEdge () {
  return this._orientedDe
};
RightmostEdgeFinder.prototype.checkForRightmostCoordinate = function checkForRightmostCoordinate (de) {
    var this$1 = this;

  var coord = de.getEdge().getCoordinates();
  for (var i = 0; i < coord.length - 1; i++) {
    if (this$1._minCoord === null || coord[i].x > this$1._minCoord.x) {
      this$1._minDe = de;
      this$1._minIndex = i;
      this$1._minCoord = coord[i];
    }
  }
};
RightmostEdgeFinder.prototype.findRightmostEdgeAtNode = function findRightmostEdgeAtNode () {
  var node = this._minDe.getNode();
  var star = node.getEdges();
  this._minDe = star.getRightmostEdge();
  if (!this._minDe.isForward()) {
    this._minDe = this._minDe.getSym();
    this._minIndex = this._minDe.getEdge().getCoordinates().length - 1;
  }
};
RightmostEdgeFinder.prototype.findEdge = function findEdge (dirEdgeList) {
    var this$1 = this;

  for (var i = dirEdgeList.iterator(); i.hasNext();) {
    var de = i.next();
    if (!de.isForward()) { continue }
    this$1.checkForRightmostCoordinate(de);
  }
  Assert.isTrue(this._minIndex !== 0 || this._minCoord.equals(this._minDe.getCoordinate()), 'inconsistency in rightmost processing');
  if (this._minIndex === 0) {
    this.findRightmostEdgeAtNode();
  } else {
    this.findRightmostEdgeAtVertex();
  }
  this._orientedDe = this._minDe;
  var rightmostSide = this.getRightmostSide(this._minDe, this._minIndex);
  if (rightmostSide === Position.LEFT) {
    this._orientedDe = this._minDe.getSym();
  }
};
RightmostEdgeFinder.prototype.interfaces_ = function interfaces_ () {
  return []
};
RightmostEdgeFinder.prototype.getClass = function getClass () {
  return RightmostEdgeFinder
};

var TopologyException = (function (RuntimeException$$1) {
  function TopologyException (msg, pt) {
    RuntimeException$$1.call(this, TopologyException.msgWithCoord(msg, pt));
    this.pt = pt ? new Coordinate(pt) : null;
    this.name = 'TopologyException';
  }

  if ( RuntimeException$$1 ) TopologyException.__proto__ = RuntimeException$$1;
  TopologyException.prototype = Object.create( RuntimeException$$1 && RuntimeException$$1.prototype );
  TopologyException.prototype.constructor = TopologyException;
  TopologyException.prototype.getCoordinate = function getCoordinate () {
    return this.pt
  };
  TopologyException.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  TopologyException.prototype.getClass = function getClass () {
    return TopologyException
  };
  TopologyException.msgWithCoord = function msgWithCoord (msg, pt) {
    if (!pt) { return msg + ' [ ' + pt + ' ]' }
    return msg
  };

  return TopologyException;
}(RuntimeException));

var LinkedList = function LinkedList () {
  this.array_ = [];
};
LinkedList.prototype.addLast = function addLast (e) {
  this.array_.push(e);
};
LinkedList.prototype.removeFirst = function removeFirst () {
  return this.array_.shift()
};
LinkedList.prototype.isEmpty = function isEmpty () {
  return this.array_.length === 0
};

var BufferSubgraph = function BufferSubgraph () {
  this._finder = null;
  this._dirEdgeList = new ArrayList();
  this._nodes = new ArrayList();
  this._rightMostCoord = null;
  this._env = null;
  this._finder = new RightmostEdgeFinder();
};
BufferSubgraph.prototype.clearVisitedEdges = function clearVisitedEdges () {
  for (var it = this._dirEdgeList.iterator(); it.hasNext();) {
    var de = it.next();
    de.setVisited(false);
  }
};
BufferSubgraph.prototype.getRightmostCoordinate = function getRightmostCoordinate () {
  return this._rightMostCoord
};
BufferSubgraph.prototype.computeNodeDepth = function computeNodeDepth (n) {
    var this$1 = this;

  var startEdge = null;
  for (var i = n.getEdges().iterator(); i.hasNext();) {
    var de = i.next();
    if (de.isVisited() || de.getSym().isVisited()) {
      startEdge = de;
      break
    }
  }
  if (startEdge === null) { throw new TopologyException('unable to find edge to compute depths at ' + n.getCoordinate()) }
  n.getEdges().computeDepths(startEdge);
  for (var i$1 = n.getEdges().iterator(); i$1.hasNext();) {
    var de$1 = i$1.next();
    de$1.setVisited(true);
    this$1.copySymDepths(de$1);
  }
};
BufferSubgraph.prototype.computeDepth = function computeDepth (outsideDepth) {
  this.clearVisitedEdges();
  var de = this._finder.getEdge();
  // const n = de.getNode()
  // const label = de.getLabel()
  de.setEdgeDepths(Position.RIGHT, outsideDepth);
  this.copySymDepths(de);
  this.computeDepths(de);
};
BufferSubgraph.prototype.create = function create (node) {
  this.addReachable(node);
  this._finder.findEdge(this._dirEdgeList);
  this._rightMostCoord = this._finder.getCoordinate();
};
BufferSubgraph.prototype.findResultEdges = function findResultEdges () {
  for (var it = this._dirEdgeList.iterator(); it.hasNext();) {
    var de = it.next();
    if (de.getDepth(Position.RIGHT) >= 1 && de.getDepth(Position.LEFT) <= 0 && !de.isInteriorAreaEdge()) {
      de.setInResult(true);
    }
  }
};
BufferSubgraph.prototype.computeDepths = function computeDepths (startEdge) {
    var this$1 = this;

  var nodesVisited = new HashSet();
  var nodeQueue = new LinkedList();
  var startNode = startEdge.getNode();
  nodeQueue.addLast(startNode);
  nodesVisited.add(startNode);
  startEdge.setVisited(true);
  while (!nodeQueue.isEmpty()) {
    var n = nodeQueue.removeFirst();
    nodesVisited.add(n);
    this$1.computeNodeDepth(n);
    for (var i = n.getEdges().iterator(); i.hasNext();) {
      var de = i.next();
      var sym = de.getSym();
      if (sym.isVisited()) { continue }
      var adjNode = sym.getNode();
      if (!nodesVisited.contains(adjNode)) {
        nodeQueue.addLast(adjNode);
        nodesVisited.add(adjNode);
      }
    }
  }
};
BufferSubgraph.prototype.compareTo = function compareTo (o) {
  var graph = o;
  if (this._rightMostCoord.x < graph._rightMostCoord.x) {
    return -1
  }
  if (this._rightMostCoord.x > graph._rightMostCoord.x) {
    return 1
  }
  return 0
};
BufferSubgraph.prototype.getEnvelope = function getEnvelope () {
  if (this._env === null) {
    var edgeEnv = new Envelope();
    for (var it = this._dirEdgeList.iterator(); it.hasNext();) {
      var dirEdge = it.next();
      var pts = dirEdge.getEdge().getCoordinates();
      for (var i = 0; i < pts.length - 1; i++) {
        edgeEnv.expandToInclude(pts[i]);
      }
    }
    this._env = edgeEnv;
  }
  return this._env
};
BufferSubgraph.prototype.addReachable = function addReachable (startNode) {
    var this$1 = this;

  var nodeStack = new Stack();
  nodeStack.add(startNode);
  while (!nodeStack.empty()) {
    var node = nodeStack.pop();
    this$1.add(node, nodeStack);
  }
};
BufferSubgraph.prototype.copySymDepths = function copySymDepths (de) {
  var sym = de.getSym();
  sym.setDepth(Position.LEFT, de.getDepth(Position.RIGHT));
  sym.setDepth(Position.RIGHT, de.getDepth(Position.LEFT));
};
BufferSubgraph.prototype.add = function add (node, nodeStack) {
    var this$1 = this;

  node.setVisited(true);
  this._nodes.add(node);
  for (var i = node.getEdges().iterator(); i.hasNext();) {
    var de = i.next();
    this$1._dirEdgeList.add(de);
    var sym = de.getSym();
    var symNode = sym.getNode();
    if (!symNode.isVisited()) { nodeStack.push(symNode); }
  }
};
BufferSubgraph.prototype.getNodes = function getNodes () {
  return this._nodes
};
BufferSubgraph.prototype.getDirectedEdges = function getDirectedEdges () {
  return this._dirEdgeList
};
BufferSubgraph.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
BufferSubgraph.prototype.getClass = function getClass () {
  return BufferSubgraph
};

var TopologyLocation = function TopologyLocation () {
  var this$1 = this;

  this.location = null;
  if (arguments.length === 1) {
    if (arguments[0] instanceof Array) {
      var location = arguments[0];
      this.init(location.length);
    } else if (Number.isInteger(arguments[0])) {
      var on = arguments[0];
      this.init(1);
      this.location[Position.ON] = on;
    } else if (arguments[0] instanceof TopologyLocation) {
      var gl = arguments[0];
      this.init(gl.location.length);
      if (gl !== null) {
        for (var i = 0; i < this.location.length; i++) {
          this$1.location[i] = gl.location[i];
        }
      }
    }
  } else if (arguments.length === 3) {
    var on$1 = arguments[0];
    var left = arguments[1];
    var right = arguments[2];
    this.init(3);
    this.location[Position.ON] = on$1;
    this.location[Position.LEFT] = left;
    this.location[Position.RIGHT] = right;
  }
};
TopologyLocation.prototype.setAllLocations = function setAllLocations (locValue) {
    var this$1 = this;

  for (var i = 0; i < this.location.length; i++) {
    this$1.location[i] = locValue;
  }
};
TopologyLocation.prototype.isNull = function isNull () {
    var this$1 = this;

  for (var i = 0; i < this.location.length; i++) {
    if (this$1.location[i] !== Location.NONE) { return false }
  }
  return true
};
TopologyLocation.prototype.setAllLocationsIfNull = function setAllLocationsIfNull (locValue) {
    var this$1 = this;

  for (var i = 0; i < this.location.length; i++) {
    if (this$1.location[i] === Location.NONE) { this$1.location[i] = locValue; }
  }
};
TopologyLocation.prototype.isLine = function isLine () {
  return this.location.length === 1
};
TopologyLocation.prototype.merge = function merge (gl) {
    var this$1 = this;

  if (gl.location.length > this.location.length) {
    var newLoc = new Array(3).fill(null);
    newLoc[Position.ON] = this.location[Position.ON];
    newLoc[Position.LEFT] = Location.NONE;
    newLoc[Position.RIGHT] = Location.NONE;
    this.location = newLoc;
  }
  for (var i = 0; i < this.location.length; i++) {
    if (this$1.location[i] === Location.NONE && i < gl.location.length) { this$1.location[i] = gl.location[i]; }
  }
};
TopologyLocation.prototype.getLocations = function getLocations () {
  return this.location
};
TopologyLocation.prototype.flip = function flip () {
  if (this.location.length <= 1) { return null }
  var temp = this.location[Position.LEFT];
  this.location[Position.LEFT] = this.location[Position.RIGHT];
  this.location[Position.RIGHT] = temp;
};
TopologyLocation.prototype.toString = function toString () {
  var buf = new StringBuffer();
  if (this.location.length > 1) { buf.append(Location.toLocationSymbol(this.location[Position.LEFT])); }
  buf.append(Location.toLocationSymbol(this.location[Position.ON]));
  if (this.location.length > 1) { buf.append(Location.toLocationSymbol(this.location[Position.RIGHT])); }
  return buf.toString()
};
TopologyLocation.prototype.setLocations = function setLocations (on, left, right) {
  this.location[Position.ON] = on;
  this.location[Position.LEFT] = left;
  this.location[Position.RIGHT] = right;
};
TopologyLocation.prototype.get = function get (posIndex) {
  if (posIndex < this.location.length) { return this.location[posIndex] }
  return Location.NONE
};
TopologyLocation.prototype.isArea = function isArea () {
  return this.location.length > 1
};
TopologyLocation.prototype.isAnyNull = function isAnyNull () {
    var this$1 = this;

  for (var i = 0; i < this.location.length; i++) {
    if (this$1.location[i] === Location.NONE) { return true }
  }
  return false
};
TopologyLocation.prototype.setLocation = function setLocation () {
  if (arguments.length === 1) {
    var locValue = arguments[0];
    this.setLocation(Position.ON, locValue);
  } else if (arguments.length === 2) {
    var locIndex = arguments[0];
    var locValue$1 = arguments[1];
    this.location[locIndex] = locValue$1;
  }
};
TopologyLocation.prototype.init = function init (size) {
  this.location = new Array(size).fill(null);
  this.setAllLocations(Location.NONE);
};
TopologyLocation.prototype.isEqualOnSide = function isEqualOnSide (le, locIndex) {
  return this.location[locIndex] === le.location[locIndex]
};
TopologyLocation.prototype.allPositionsEqual = function allPositionsEqual (loc) {
    var this$1 = this;

  for (var i = 0; i < this.location.length; i++) {
    if (this$1.location[i] !== loc) { return false }
  }
  return true
};
TopologyLocation.prototype.interfaces_ = function interfaces_ () {
  return []
};
TopologyLocation.prototype.getClass = function getClass () {
  return TopologyLocation
};

var Label = function Label () {
  this.elt = new Array(2).fill(null);
  if (arguments.length === 1) {
    if (Number.isInteger(arguments[0])) {
      var onLoc = arguments[0];
      this.elt[0] = new TopologyLocation(onLoc);
      this.elt[1] = new TopologyLocation(onLoc);
    } else if (arguments[0] instanceof Label) {
      var lbl = arguments[0];
      this.elt[0] = new TopologyLocation(lbl.elt[0]);
      this.elt[1] = new TopologyLocation(lbl.elt[1]);
    }
  } else if (arguments.length === 2) {
    var geomIndex = arguments[0];
    var onLoc$1 = arguments[1];
    this.elt[0] = new TopologyLocation(Location.NONE);
    this.elt[1] = new TopologyLocation(Location.NONE);
    this.elt[geomIndex].setLocation(onLoc$1);
  } else if (arguments.length === 3) {
    var onLoc$2 = arguments[0];
    var leftLoc = arguments[1];
    var rightLoc = arguments[2];
    this.elt[0] = new TopologyLocation(onLoc$2, leftLoc, rightLoc);
    this.elt[1] = new TopologyLocation(onLoc$2, leftLoc, rightLoc);
  } else if (arguments.length === 4) {
    var geomIndex$1 = arguments[0];
    var onLoc$3 = arguments[1];
    var leftLoc$1 = arguments[2];
    var rightLoc$1 = arguments[3];
    this.elt[0] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
    this.elt[1] = new TopologyLocation(Location.NONE, Location.NONE, Location.NONE);
    this.elt[geomIndex$1].setLocations(onLoc$3, leftLoc$1, rightLoc$1);
  }
};
Label.prototype.getGeometryCount = function getGeometryCount () {
  var count = 0;
  if (!this.elt[0].isNull()) { count++; }
  if (!this.elt[1].isNull()) { count++; }
  return count
};
Label.prototype.setAllLocations = function setAllLocations (geomIndex, location) {
  this.elt[geomIndex].setAllLocations(location);
};
Label.prototype.isNull = function isNull (geomIndex) {
  return this.elt[geomIndex].isNull()
};
Label.prototype.setAllLocationsIfNull = function setAllLocationsIfNull () {
  if (arguments.length === 1) {
    var location = arguments[0];
    this.setAllLocationsIfNull(0, location);
    this.setAllLocationsIfNull(1, location);
  } else if (arguments.length === 2) {
    var geomIndex = arguments[0];
    var location$1 = arguments[1];
    this.elt[geomIndex].setAllLocationsIfNull(location$1);
  }
};
Label.prototype.isLine = function isLine (geomIndex) {
  return this.elt[geomIndex].isLine()
};
Label.prototype.merge = function merge (lbl) {
    var this$1 = this;

  for (var i = 0; i < 2; i++) {
    if (this$1.elt[i] === null && lbl.elt[i] !== null) {
      this$1.elt[i] = new TopologyLocation(lbl.elt[i]);
    } else {
      this$1.elt[i].merge(lbl.elt[i]);
    }
  }
};
Label.prototype.flip = function flip () {
  this.elt[0].flip();
  this.elt[1].flip();
};
Label.prototype.getLocation = function getLocation () {
  if (arguments.length === 1) {
    var geomIndex = arguments[0];
    return this.elt[geomIndex].get(Position.ON)
  } else if (arguments.length === 2) {
    var geomIndex$1 = arguments[0];
    var posIndex = arguments[1];
    return this.elt[geomIndex$1].get(posIndex)
  }
};
Label.prototype.toString = function toString () {
  var buf = new StringBuffer();
  if (this.elt[0] !== null) {
    buf.append('A:');
    buf.append(this.elt[0].toString());
  }
  if (this.elt[1] !== null) {
    buf.append(' B:');
    buf.append(this.elt[1].toString());
  }
  return buf.toString()
};
Label.prototype.isArea = function isArea () {
  if (arguments.length === 0) {
    return this.elt[0].isArea() || this.elt[1].isArea()
  } else if (arguments.length === 1) {
    var geomIndex = arguments[0];
    return this.elt[geomIndex].isArea()
  }
};
Label.prototype.isAnyNull = function isAnyNull (geomIndex) {
  return this.elt[geomIndex].isAnyNull()
};
Label.prototype.setLocation = function setLocation () {
  if (arguments.length === 2) {
    var geomIndex = arguments[0];
    var location = arguments[1];
    this.elt[geomIndex].setLocation(Position.ON, location);
  } else if (arguments.length === 3) {
    var geomIndex$1 = arguments[0];
    var posIndex = arguments[1];
    var location$1 = arguments[2];
    this.elt[geomIndex$1].setLocation(posIndex, location$1);
  }
};
Label.prototype.isEqualOnSide = function isEqualOnSide (lbl, side) {
  return this.elt[0].isEqualOnSide(lbl.elt[0], side) && this.elt[1].isEqualOnSide(lbl.elt[1], side)
};
Label.prototype.allPositionsEqual = function allPositionsEqual (geomIndex, loc) {
  return this.elt[geomIndex].allPositionsEqual(loc)
};
Label.prototype.toLine = function toLine (geomIndex) {
  if (this.elt[geomIndex].isArea()) { this.elt[geomIndex] = new TopologyLocation(this.elt[geomIndex].location[0]); }
};
Label.prototype.interfaces_ = function interfaces_ () {
  return []
};
Label.prototype.getClass = function getClass () {
  return Label
};
Label.toLineLabel = function toLineLabel (label) {
  var lineLabel = new Label(Location.NONE);
  for (var i = 0; i < 2; i++) {
    lineLabel.setLocation(i, label.getLocation(i));
  }
  return lineLabel
};

var EdgeRing = function EdgeRing () {
  this._startDe = null;
  this._maxNodeDegree = -1;
  this._edges = new ArrayList();
  this._pts = new ArrayList();
  this._label = new Label(Location.NONE);
  this._ring = null;
  this._isHole = null;
  this._shell = null;
  this._holes = new ArrayList();
  this._geometryFactory = null;
  var start = arguments[0];
  var geometryFactory = arguments[1];
  this._geometryFactory = geometryFactory;
  this.computePoints(start);
  this.computeRing();
};
EdgeRing.prototype.computeRing = function computeRing () {
    var this$1 = this;

  if (this._ring !== null) { return null }
  var coord = new Array(this._pts.size()).fill(null);
  for (var i = 0; i < this._pts.size(); i++) {
    coord[i] = this$1._pts.get(i);
  }
  this._ring = this._geometryFactory.createLinearRing(coord);
  this._isHole = CGAlgorithms.isCCW(this._ring.getCoordinates());
};
EdgeRing.prototype.isIsolated = function isIsolated () {
  return this._label.getGeometryCount() === 1
};
EdgeRing.prototype.computePoints = function computePoints (start) {
    var this$1 = this;

  this._startDe = start;
  var de = start;
  var isFirstEdge = true;
  do {
    if (de === null) { throw new TopologyException('Found null DirectedEdge') }
    if (de.getEdgeRing() === this$1) { throw new TopologyException('Directed Edge visited twice during ring-building at ' + de.getCoordinate()) }
    this$1._edges.add(de);
    var label = de.getLabel();
    Assert.isTrue(label.isArea());
    this$1.mergeLabel(label);
    this$1.addPoints(de.getEdge(), de.isForward(), isFirstEdge);
    isFirstEdge = false;
    this$1.setEdgeRing(de, this$1);
    de = this$1.getNext(de);
  } while (de !== this._startDe)
};
EdgeRing.prototype.getLinearRing = function getLinearRing () {
  return this._ring
};
EdgeRing.prototype.getCoordinate = function getCoordinate (i) {
  return this._pts.get(i)
};
EdgeRing.prototype.computeMaxNodeDegree = function computeMaxNodeDegree () {
    var this$1 = this;

  this._maxNodeDegree = 0;
  var de = this._startDe;
  do {
    var node = de.getNode();
    var degree = node.getEdges().getOutgoingDegree(this$1);
    if (degree > this$1._maxNodeDegree) { this$1._maxNodeDegree = degree; }
    de = this$1.getNext(de);
  } while (de !== this._startDe)
  this._maxNodeDegree *= 2;
};
EdgeRing.prototype.addPoints = function addPoints (edge, isForward, isFirstEdge) {
    var this$1 = this;

  var edgePts = edge.getCoordinates();
  if (isForward) {
    var startIndex = 1;
    if (isFirstEdge) { startIndex = 0; }
    for (var i = startIndex; i < edgePts.length; i++) {
      this$1._pts.add(edgePts[i]);
    }
  } else {
    var startIndex$1 = edgePts.length - 2;
    if (isFirstEdge) { startIndex$1 = edgePts.length - 1; }
    for (var i$1 = startIndex$1; i$1 >= 0; i$1--) {
      this$1._pts.add(edgePts[i$1]);
    }
  }
};
EdgeRing.prototype.isHole = function isHole () {
  return this._isHole
};
EdgeRing.prototype.setInResult = function setInResult () {
  var de = this._startDe;
  do {
    de.getEdge().setInResult(true);
    de = de.getNext();
  } while (de !== this._startDe)
};
EdgeRing.prototype.containsPoint = function containsPoint (p) {
  var shell = this.getLinearRing();
  var env = shell.getEnvelopeInternal();
  if (!env.contains(p)) { return false }
  if (!CGAlgorithms.isPointInRing(p, shell.getCoordinates())) { return false }
  for (var i = this._holes.iterator(); i.hasNext();) {
    var hole = i.next();
    if (hole.containsPoint(p)) { return false }
  }
  return true
};
EdgeRing.prototype.addHole = function addHole (ring) {
  this._holes.add(ring);
};
EdgeRing.prototype.isShell = function isShell () {
  return this._shell === null
};
EdgeRing.prototype.getLabel = function getLabel () {
  return this._label
};
EdgeRing.prototype.getEdges = function getEdges () {
  return this._edges
};
EdgeRing.prototype.getMaxNodeDegree = function getMaxNodeDegree () {
  if (this._maxNodeDegree < 0) { this.computeMaxNodeDegree(); }
  return this._maxNodeDegree
};
EdgeRing.prototype.getShell = function getShell () {
  return this._shell
};
EdgeRing.prototype.mergeLabel = function mergeLabel () {
  if (arguments.length === 1) {
    var deLabel = arguments[0];
    this.mergeLabel(deLabel, 0);
    this.mergeLabel(deLabel, 1);
  } else if (arguments.length === 2) {
    var deLabel$1 = arguments[0];
    var geomIndex = arguments[1];
    var loc = deLabel$1.getLocation(geomIndex, Position.RIGHT);
    if (loc === Location.NONE) { return null }
    if (this._label.getLocation(geomIndex) === Location.NONE) {
      this._label.setLocation(geomIndex, loc);
      return null
    }
  }
};
EdgeRing.prototype.setShell = function setShell (shell) {
  this._shell = shell;
  if (shell !== null) { shell.addHole(this); }
};
EdgeRing.prototype.toPolygon = function toPolygon (geometryFactory) {
    var this$1 = this;

  var holeLR = new Array(this._holes.size()).fill(null);
  for (var i = 0; i < this._holes.size(); i++) {
    holeLR[i] = this$1._holes.get(i).getLinearRing();
  }
  var poly = geometryFactory.createPolygon(this.getLinearRing(), holeLR);
  return poly
};
EdgeRing.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeRing.prototype.getClass = function getClass () {
  return EdgeRing
};

var MinimalEdgeRing = (function (EdgeRing$$1) {
  function MinimalEdgeRing () {
    var start = arguments[0];
    var geometryFactory = arguments[1];
    EdgeRing$$1.call(this, start, geometryFactory);
  }

  if ( EdgeRing$$1 ) MinimalEdgeRing.__proto__ = EdgeRing$$1;
  MinimalEdgeRing.prototype = Object.create( EdgeRing$$1 && EdgeRing$$1.prototype );
  MinimalEdgeRing.prototype.constructor = MinimalEdgeRing;
  MinimalEdgeRing.prototype.setEdgeRing = function setEdgeRing (de, er) {
    de.setMinEdgeRing(er);
  };
  MinimalEdgeRing.prototype.getNext = function getNext (de) {
    return de.getNextMin()
  };
  MinimalEdgeRing.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  MinimalEdgeRing.prototype.getClass = function getClass () {
    return MinimalEdgeRing
  };

  return MinimalEdgeRing;
}(EdgeRing));

var MaximalEdgeRing = (function (EdgeRing$$1) {
  function MaximalEdgeRing () {
    var start = arguments[0];
    var geometryFactory = arguments[1];
    EdgeRing$$1.call(this, start, geometryFactory);
  }

  if ( EdgeRing$$1 ) MaximalEdgeRing.__proto__ = EdgeRing$$1;
  MaximalEdgeRing.prototype = Object.create( EdgeRing$$1 && EdgeRing$$1.prototype );
  MaximalEdgeRing.prototype.constructor = MaximalEdgeRing;
  MaximalEdgeRing.prototype.buildMinimalRings = function buildMinimalRings () {
    var this$1 = this;

    var minEdgeRings = new ArrayList();
    var de = this._startDe;
    do {
      if (de.getMinEdgeRing() === null) {
        var minEr = new MinimalEdgeRing(de, this$1._geometryFactory);
        minEdgeRings.add(minEr);
      }
      de = de.getNext();
    } while (de !== this._startDe)
    return minEdgeRings
  };
  MaximalEdgeRing.prototype.setEdgeRing = function setEdgeRing (de, er) {
    de.setEdgeRing(er);
  };
  MaximalEdgeRing.prototype.linkDirectedEdgesForMinimalEdgeRings = function linkDirectedEdgesForMinimalEdgeRings () {
    var this$1 = this;

    var de = this._startDe;
    do {
      var node = de.getNode();
      node.getEdges().linkMinimalDirectedEdges(this$1);
      de = de.getNext();
    } while (de !== this._startDe)
  };
  MaximalEdgeRing.prototype.getNext = function getNext (de) {
    return de.getNext()
  };
  MaximalEdgeRing.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  MaximalEdgeRing.prototype.getClass = function getClass () {
    return MaximalEdgeRing
  };

  return MaximalEdgeRing;
}(EdgeRing));

var GraphComponent = function GraphComponent () {
  this._label = null;
  this._isInResult = false;
  this._isCovered = false;
  this._isCoveredSet = false;
  this._isVisited = false;
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var label = arguments[0];
    this._label = label;
  }
};
GraphComponent.prototype.setVisited = function setVisited (isVisited) {
  this._isVisited = isVisited;
};
GraphComponent.prototype.setInResult = function setInResult (isInResult) {
  this._isInResult = isInResult;
};
GraphComponent.prototype.isCovered = function isCovered () {
  return this._isCovered
};
GraphComponent.prototype.isCoveredSet = function isCoveredSet () {
  return this._isCoveredSet
};
GraphComponent.prototype.setLabel = function setLabel (label) {
  this._label = label;
};
GraphComponent.prototype.getLabel = function getLabel () {
  return this._label
};
GraphComponent.prototype.setCovered = function setCovered (isCovered) {
  this._isCovered = isCovered;
  this._isCoveredSet = true;
};
GraphComponent.prototype.updateIM = function updateIM (im) {
  Assert.isTrue(this._label.getGeometryCount() >= 2, 'found partial label');
  this.computeIM(im);
};
GraphComponent.prototype.isInResult = function isInResult () {
  return this._isInResult
};
GraphComponent.prototype.isVisited = function isVisited () {
  return this._isVisited
};
GraphComponent.prototype.interfaces_ = function interfaces_ () {
  return []
};
GraphComponent.prototype.getClass = function getClass () {
  return GraphComponent
};

var Node = (function (GraphComponent$$1) {
  function Node () {
    GraphComponent$$1.call(this);
    this._coord = null;
    this._edges = null;
    var coord = arguments[0];
    var edges = arguments[1];
    this._coord = coord;
    this._edges = edges;
    this._label = new Label(0, Location.NONE);
  }

  if ( GraphComponent$$1 ) Node.__proto__ = GraphComponent$$1;
  Node.prototype = Object.create( GraphComponent$$1 && GraphComponent$$1.prototype );
  Node.prototype.constructor = Node;
  Node.prototype.isIncidentEdgeInResult = function isIncidentEdgeInResult () {
    for (var it = this.getEdges().getEdges().iterator(); it.hasNext();) {
      var de = it.next();
      if (de.getEdge().isInResult()) { return true }
    }
    return false
  };
  Node.prototype.isIsolated = function isIsolated () {
    return this._label.getGeometryCount() === 1
  };
  Node.prototype.getCoordinate = function getCoordinate () {
    return this._coord
  };
  Node.prototype.print = function print (out) {
    out.println('node ' + this._coord + ' lbl: ' + this._label);
  };
  Node.prototype.computeIM = function computeIM (im) {};
  Node.prototype.computeMergedLocation = function computeMergedLocation (label2, eltIndex) {
    var loc = Location.NONE;
    loc = this._label.getLocation(eltIndex);
    if (!label2.isNull(eltIndex)) {
      var nLoc = label2.getLocation(eltIndex);
      if (loc !== Location.BOUNDARY) { loc = nLoc; }
    }
    return loc
  };
  Node.prototype.setLabel = function setLabel () {
    if (arguments.length === 2) {
      var argIndex = arguments[0];
      var onLocation = arguments[1];
      if (this._label === null) {
        this._label = new Label(argIndex, onLocation);
      } else { this._label.setLocation(argIndex, onLocation); }
    } else { return GraphComponent$$1.prototype.setLabel.apply(this, arguments) }
  };
  Node.prototype.getEdges = function getEdges () {
    return this._edges
  };
  Node.prototype.mergeLabel = function mergeLabel () {
    var this$1 = this;

    if (arguments[0] instanceof Node) {
      var n = arguments[0];
      this.mergeLabel(n._label);
    } else if (arguments[0] instanceof Label) {
      var label2 = arguments[0];
      for (var i = 0; i < 2; i++) {
        var loc = this$1.computeMergedLocation(label2, i);
        var thisLoc = this$1._label.getLocation(i);
        if (thisLoc === Location.NONE) { this$1._label.setLocation(i, loc); }
      }
    }
  };
  Node.prototype.add = function add (e) {
    this._edges.insert(e);
    e.setNode(this);
  };
  Node.prototype.setLabelBoundary = function setLabelBoundary (argIndex) {
    if (this._label === null) { return null }
    var loc = Location.NONE;
    if (this._label !== null) { loc = this._label.getLocation(argIndex); }
    var newLoc = null;
    switch (loc) {
      case Location.BOUNDARY:
        newLoc = Location.INTERIOR;
        break
      case Location.INTERIOR:
        newLoc = Location.BOUNDARY;
        break
      default:
        newLoc = Location.BOUNDARY;
        break
    }
    this._label.setLocation(argIndex, newLoc);
  };
  Node.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  Node.prototype.getClass = function getClass () {
    return Node
  };

  return Node;
}(GraphComponent));

var NodeMap = function NodeMap () {
  this.nodeMap = new TreeMap();
  this.nodeFact = null;
  var nodeFact = arguments[0];
  this.nodeFact = nodeFact;
};
NodeMap.prototype.find = function find (coord) {
  return this.nodeMap.get(coord)
};
NodeMap.prototype.addNode = function addNode () {
  if (arguments[0] instanceof Coordinate) {
    var coord = arguments[0];
    var node = this.nodeMap.get(coord);
    if (node === null) {
      node = this.nodeFact.createNode(coord);
      this.nodeMap.put(coord, node);
    }
    return node
  } else if (arguments[0] instanceof Node) {
    var n = arguments[0];
    var node$1 = this.nodeMap.get(n.getCoordinate());
    if (node$1 === null) {
      this.nodeMap.put(n.getCoordinate(), n);
      return n
    }
    node$1.mergeLabel(n);
    return node$1
  }
};
NodeMap.prototype.print = function print (out) {
  for (var it = this.iterator(); it.hasNext();) {
    var n = it.next();
    n.print(out);
  }
};
NodeMap.prototype.iterator = function iterator () {
  return this.nodeMap.values().iterator()
};
NodeMap.prototype.values = function values () {
  return this.nodeMap.values()
};
NodeMap.prototype.getBoundaryNodes = function getBoundaryNodes (geomIndex) {
  var bdyNodes = new ArrayList();
  for (var i = this.iterator(); i.hasNext();) {
    var node = i.next();
    if (node.getLabel().getLocation(geomIndex) === Location.BOUNDARY) { bdyNodes.add(node); }
  }
  return bdyNodes
};
NodeMap.prototype.add = function add (e) {
  var p = e.getCoordinate();
  var n = this.addNode(p);
  n.add(e);
};
NodeMap.prototype.interfaces_ = function interfaces_ () {
  return []
};
NodeMap.prototype.getClass = function getClass () {
  return NodeMap
};

var Quadrant = function Quadrant () {};

var staticAccessors$21 = { NE: { configurable: true },NW: { configurable: true },SW: { configurable: true },SE: { configurable: true } };

Quadrant.prototype.interfaces_ = function interfaces_ () {
  return []
};
Quadrant.prototype.getClass = function getClass () {
  return Quadrant
};
Quadrant.isNorthern = function isNorthern (quad) {
  return quad === Quadrant.NE || quad === Quadrant.NW
};
Quadrant.isOpposite = function isOpposite (quad1, quad2) {
  if (quad1 === quad2) { return false }
  var diff = (quad1 - quad2 + 4) % 4;
  if (diff === 2) { return true }
  return false
};
Quadrant.commonHalfPlane = function commonHalfPlane (quad1, quad2) {
  if (quad1 === quad2) { return quad1 }
  var diff = (quad1 - quad2 + 4) % 4;
  if (diff === 2) { return -1 }
  var min = quad1 < quad2 ? quad1 : quad2;
  var max = quad1 > quad2 ? quad1 : quad2;
  if (min === 0 && max === 3) { return 3 }
  return min
};
Quadrant.isInHalfPlane = function isInHalfPlane (quad, halfPlane) {
  if (halfPlane === Quadrant.SE) {
    return quad === Quadrant.SE || quad === Quadrant.SW
  }
  return quad === halfPlane || quad === halfPlane + 1
};
Quadrant.quadrant = function quadrant () {
  if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    var dx = arguments[0];
    var dy = arguments[1];
    if (dx === 0.0 && dy === 0.0) { throw new IllegalArgumentException('Cannot compute the quadrant for point ( ' + dx + ', ' + dy + ' )') }
    if (dx >= 0.0) {
      if (dy >= 0.0) { return Quadrant.NE; } else { return Quadrant.SE }
    } else {
      if (dy >= 0.0) { return Quadrant.NW; } else { return Quadrant.SW }
    }
  } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    if (p1.x === p0.x && p1.y === p0.y) { throw new IllegalArgumentException('Cannot compute the quadrant for two identical points ' + p0) }
    if (p1.x >= p0.x) {
      if (p1.y >= p0.y) { return Quadrant.NE; } else { return Quadrant.SE }
    } else {
      if (p1.y >= p0.y) { return Quadrant.NW; } else { return Quadrant.SW }
    }
  }
};
staticAccessors$21.NE.get = function () { return 0 };
staticAccessors$21.NW.get = function () { return 1 };
staticAccessors$21.SW.get = function () { return 2 };
staticAccessors$21.SE.get = function () { return 3 };

Object.defineProperties( Quadrant, staticAccessors$21 );

var EdgeEnd = function EdgeEnd () {
  this._edge = null;
  this._label = null;
  this._node = null;
  this._p0 = null;
  this._p1 = null;
  this._dx = null;
  this._dy = null;
  this._quadrant = null;
  if (arguments.length === 1) {
    var edge = arguments[0];
    this._edge = edge;
  } else if (arguments.length === 3) {
    var edge$1 = arguments[0];
    var p0 = arguments[1];
    var p1 = arguments[2];
    var label = null;
    this._edge = edge$1;
    this.init(p0, p1);
    this._label = label;
  } else if (arguments.length === 4) {
    var edge$2 = arguments[0];
    var p0$1 = arguments[1];
    var p1$1 = arguments[2];
    var label$1 = arguments[3];
    this._edge = edge$2;
    this.init(p0$1, p1$1);
    this._label = label$1;
  }
};
EdgeEnd.prototype.compareDirection = function compareDirection (e) {
  if (this._dx === e._dx && this._dy === e._dy) { return 0 }
  if (this._quadrant > e._quadrant) { return 1 }
  if (this._quadrant < e._quadrant) { return -1 }
  return CGAlgorithms.computeOrientation(e._p0, e._p1, this._p1)
};
EdgeEnd.prototype.getDy = function getDy () {
  return this._dy
};
EdgeEnd.prototype.getCoordinate = function getCoordinate () {
  return this._p0
};
EdgeEnd.prototype.setNode = function setNode (node) {
  this._node = node;
};
EdgeEnd.prototype.print = function print (out) {
  var angle = Math.atan2(this._dy, this._dx);
  var className = this.getClass().getName();
  var lastDotPos = className.lastIndexOf('.');
  var name = className.substring(lastDotPos + 1);
  out.print('  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label);
};
EdgeEnd.prototype.compareTo = function compareTo (obj) {
  var e = obj;
  return this.compareDirection(e)
};
EdgeEnd.prototype.getDirectedCoordinate = function getDirectedCoordinate () {
  return this._p1
};
EdgeEnd.prototype.getDx = function getDx () {
  return this._dx
};
EdgeEnd.prototype.getLabel = function getLabel () {
  return this._label
};
EdgeEnd.prototype.getEdge = function getEdge () {
  return this._edge
};
EdgeEnd.prototype.getQuadrant = function getQuadrant () {
  return this._quadrant
};
EdgeEnd.prototype.getNode = function getNode () {
  return this._node
};
EdgeEnd.prototype.toString = function toString () {
  var angle = Math.atan2(this._dy, this._dx);
  var className = this.getClass().getName();
  var lastDotPos = className.lastIndexOf('.');
  var name = className.substring(lastDotPos + 1);
  return '  ' + name + ': ' + this._p0 + ' - ' + this._p1 + ' ' + this._quadrant + ':' + angle + '   ' + this._label
};
EdgeEnd.prototype.computeLabel = function computeLabel (boundaryNodeRule) {};
EdgeEnd.prototype.init = function init (p0, p1) {
  this._p0 = p0;
  this._p1 = p1;
  this._dx = p1.x - p0.x;
  this._dy = p1.y - p0.y;
  this._quadrant = Quadrant.quadrant(this._dx, this._dy);
  Assert.isTrue(!(this._dx === 0 && this._dy === 0), 'EdgeEnd with identical endpoints found');
};
EdgeEnd.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
EdgeEnd.prototype.getClass = function getClass () {
  return EdgeEnd
};

var DirectedEdge = (function (EdgeEnd$$1) {
  function DirectedEdge () {
    var edge = arguments[0];
    var isForward = arguments[1];
    EdgeEnd$$1.call(this, edge);
    this._isForward = null;
    this._isInResult = false;
    this._isVisited = false;
    this._sym = null;
    this._next = null;
    this._nextMin = null;
    this._edgeRing = null;
    this._minEdgeRing = null;
    this._depth = [0, -999, -999];
    this._isForward = isForward;
    if (isForward) {
      this.init(edge.getCoordinate(0), edge.getCoordinate(1));
    } else {
      var n = edge.getNumPoints() - 1;
      this.init(edge.getCoordinate(n), edge.getCoordinate(n - 1));
    }
    this.computeDirectedLabel();
  }

  if ( EdgeEnd$$1 ) DirectedEdge.__proto__ = EdgeEnd$$1;
  DirectedEdge.prototype = Object.create( EdgeEnd$$1 && EdgeEnd$$1.prototype );
  DirectedEdge.prototype.constructor = DirectedEdge;
  DirectedEdge.prototype.getNextMin = function getNextMin () {
    return this._nextMin
  };
  DirectedEdge.prototype.getDepth = function getDepth (position) {
    return this._depth[position]
  };
  DirectedEdge.prototype.setVisited = function setVisited (isVisited) {
    this._isVisited = isVisited;
  };
  DirectedEdge.prototype.computeDirectedLabel = function computeDirectedLabel () {
    this._label = new Label(this._edge.getLabel());
    if (!this._isForward) { this._label.flip(); }
  };
  DirectedEdge.prototype.getNext = function getNext () {
    return this._next
  };
  DirectedEdge.prototype.setDepth = function setDepth (position, depthVal) {
    if (this._depth[position] !== -999) {
      if (this._depth[position] !== depthVal) { throw new TopologyException('assigned depths do not match', this.getCoordinate()) }
    }
    this._depth[position] = depthVal;
  };
  DirectedEdge.prototype.isInteriorAreaEdge = function isInteriorAreaEdge () {
    var this$1 = this;

    var isInteriorAreaEdge = true;
    for (var i = 0; i < 2; i++) {
      if (!(this$1._label.isArea(i) && this$1._label.getLocation(i, Position.LEFT) === Location.INTERIOR && this$1._label.getLocation(i, Position.RIGHT) === Location.INTERIOR)) {
        isInteriorAreaEdge = false;
      }
    }
    return isInteriorAreaEdge
  };
  DirectedEdge.prototype.setNextMin = function setNextMin (nextMin) {
    this._nextMin = nextMin;
  };
  DirectedEdge.prototype.print = function print (out) {
    EdgeEnd$$1.prototype.print.call(this, out);
    out.print(' ' + this._depth[Position.LEFT] + '/' + this._depth[Position.RIGHT]);
    out.print(' (' + this.getDepthDelta() + ')');
    if (this._isInResult) { out.print(' inResult'); }
  };
  DirectedEdge.prototype.setMinEdgeRing = function setMinEdgeRing (minEdgeRing) {
    this._minEdgeRing = minEdgeRing;
  };
  DirectedEdge.prototype.isLineEdge = function isLineEdge () {
    var isLine = this._label.isLine(0) || this._label.isLine(1);
    var isExteriorIfArea0 = !this._label.isArea(0) || this._label.allPositionsEqual(0, Location.EXTERIOR);
    var isExteriorIfArea1 = !this._label.isArea(1) || this._label.allPositionsEqual(1, Location.EXTERIOR);
    return isLine && isExteriorIfArea0 && isExteriorIfArea1
  };
  DirectedEdge.prototype.setEdgeRing = function setEdgeRing (edgeRing) {
    this._edgeRing = edgeRing;
  };
  DirectedEdge.prototype.getMinEdgeRing = function getMinEdgeRing () {
    return this._minEdgeRing
  };
  DirectedEdge.prototype.getDepthDelta = function getDepthDelta () {
    var depthDelta = this._edge.getDepthDelta();
    if (!this._isForward) { depthDelta = -depthDelta; }
    return depthDelta
  };
  DirectedEdge.prototype.setInResult = function setInResult (isInResult) {
    this._isInResult = isInResult;
  };
  DirectedEdge.prototype.getSym = function getSym () {
    return this._sym
  };
  DirectedEdge.prototype.isForward = function isForward () {
    return this._isForward
  };
  DirectedEdge.prototype.getEdge = function getEdge () {
    return this._edge
  };
  DirectedEdge.prototype.printEdge = function printEdge (out) {
    this.print(out);
    out.print(' ');
    if (this._isForward) { this._edge.print(out); } else { this._edge.printReverse(out); }
  };
  DirectedEdge.prototype.setSym = function setSym (de) {
    this._sym = de;
  };
  DirectedEdge.prototype.setVisitedEdge = function setVisitedEdge (isVisited) {
    this.setVisited(isVisited);
    this._sym.setVisited(isVisited);
  };
  DirectedEdge.prototype.setEdgeDepths = function setEdgeDepths (position, depth) {
    var depthDelta = this.getEdge().getDepthDelta();
    if (!this._isForward) { depthDelta = -depthDelta; }
    var directionFactor = 1;
    if (position === Position.LEFT) { directionFactor = -1; }
    var oppositePos = Position.opposite(position);
    var delta = depthDelta * directionFactor;
    var oppositeDepth = depth + delta;
    this.setDepth(position, depth);
    this.setDepth(oppositePos, oppositeDepth);
  };
  DirectedEdge.prototype.getEdgeRing = function getEdgeRing () {
    return this._edgeRing
  };
  DirectedEdge.prototype.isInResult = function isInResult () {
    return this._isInResult
  };
  DirectedEdge.prototype.setNext = function setNext (next) {
    this._next = next;
  };
  DirectedEdge.prototype.isVisited = function isVisited () {
    return this._isVisited
  };
  DirectedEdge.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  DirectedEdge.prototype.getClass = function getClass () {
    return DirectedEdge
  };
  DirectedEdge.depthFactor = function depthFactor (currLocation, nextLocation) {
    if (currLocation === Location.EXTERIOR && nextLocation === Location.INTERIOR) { return 1; } else if (currLocation === Location.INTERIOR && nextLocation === Location.EXTERIOR) { return -1 }
    return 0
  };

  return DirectedEdge;
}(EdgeEnd));

var NodeFactory = function NodeFactory () {};

NodeFactory.prototype.createNode = function createNode (coord) {
  return new Node(coord, null)
};
NodeFactory.prototype.interfaces_ = function interfaces_ () {
  return []
};
NodeFactory.prototype.getClass = function getClass () {
  return NodeFactory
};

var PlanarGraph = function PlanarGraph () {
  this._edges = new ArrayList();
  this._nodes = null;
  this._edgeEndList = new ArrayList();
  if (arguments.length === 0) {
    this._nodes = new NodeMap(new NodeFactory());
  } else if (arguments.length === 1) {
    var nodeFact = arguments[0];
    this._nodes = new NodeMap(nodeFact);
  }
};
PlanarGraph.prototype.printEdges = function printEdges (out) {
    var this$1 = this;

  out.println('Edges:');
  for (var i = 0; i < this._edges.size(); i++) {
    out.println('edge ' + i + ':');
    var e = this$1._edges.get(i);
    e.print(out);
    e.eiList.print(out);
  }
};
PlanarGraph.prototype.find = function find (coord) {
  return this._nodes.find(coord)
};
PlanarGraph.prototype.addNode = function addNode () {
  if (arguments[0] instanceof Node) {
    var node = arguments[0];
    return this._nodes.addNode(node)
  } else if (arguments[0] instanceof Coordinate) {
    var coord = arguments[0];
    return this._nodes.addNode(coord)
  }
};
PlanarGraph.prototype.getNodeIterator = function getNodeIterator () {
  return this._nodes.iterator()
};
PlanarGraph.prototype.linkResultDirectedEdges = function linkResultDirectedEdges () {
  for (var nodeit = this._nodes.iterator(); nodeit.hasNext();) {
    var node = nodeit.next();
    node.getEdges().linkResultDirectedEdges();
  }
};
PlanarGraph.prototype.debugPrintln = function debugPrintln (o) {
  System.out.println(o);
};
PlanarGraph.prototype.isBoundaryNode = function isBoundaryNode (geomIndex, coord) {
  var node = this._nodes.find(coord);
  if (node === null) { return false }
  var label = node.getLabel();
  if (label !== null && label.getLocation(geomIndex) === Location.BOUNDARY) { return true }
  return false
};
PlanarGraph.prototype.linkAllDirectedEdges = function linkAllDirectedEdges () {
  for (var nodeit = this._nodes.iterator(); nodeit.hasNext();) {
    var node = nodeit.next();
    node.getEdges().linkAllDirectedEdges();
  }
};
PlanarGraph.prototype.matchInSameDirection = function matchInSameDirection (p0, p1, ep0, ep1) {
  if (!p0.equals(ep0)) { return false }
  if (CGAlgorithms.computeOrientation(p0, p1, ep1) === CGAlgorithms.COLLINEAR && Quadrant.quadrant(p0, p1) === Quadrant.quadrant(ep0, ep1)) { return true }
  return false
};
PlanarGraph.prototype.getEdgeEnds = function getEdgeEnds () {
  return this._edgeEndList
};
PlanarGraph.prototype.debugPrint = function debugPrint (o) {
  System.out.print(o);
};
PlanarGraph.prototype.getEdgeIterator = function getEdgeIterator () {
  return this._edges.iterator()
};
PlanarGraph.prototype.findEdgeInSameDirection = function findEdgeInSameDirection (p0, p1) {
    var this$1 = this;

  for (var i = 0; i < this._edges.size(); i++) {
    var e = this$1._edges.get(i);
    var eCoord = e.getCoordinates();
    if (this$1.matchInSameDirection(p0, p1, eCoord[0], eCoord[1])) { return e }
    if (this$1.matchInSameDirection(p0, p1, eCoord[eCoord.length - 1], eCoord[eCoord.length - 2])) { return e }
  }
  return null
};
PlanarGraph.prototype.insertEdge = function insertEdge (e) {
  this._edges.add(e);
};
PlanarGraph.prototype.findEdgeEnd = function findEdgeEnd (e) {
  for (var i = this.getEdgeEnds().iterator(); i.hasNext();) {
    var ee = i.next();
    if (ee.getEdge() === e) { return ee }
  }
  return null
};
PlanarGraph.prototype.addEdges = function addEdges (edgesToAdd) {
    var this$1 = this;

  for (var it = edgesToAdd.iterator(); it.hasNext();) {
    var e = it.next();
    this$1._edges.add(e);
    var de1 = new DirectedEdge(e, true);
    var de2 = new DirectedEdge(e, false);
    de1.setSym(de2);
    de2.setSym(de1);
    this$1.add(de1);
    this$1.add(de2);
  }
};
PlanarGraph.prototype.add = function add (e) {
  this._nodes.add(e);
  this._edgeEndList.add(e);
};
PlanarGraph.prototype.getNodes = function getNodes () {
  return this._nodes.values()
};
PlanarGraph.prototype.findEdge = function findEdge (p0, p1) {
    var this$1 = this;

  for (var i = 0; i < this._edges.size(); i++) {
    var e = this$1._edges.get(i);
    var eCoord = e.getCoordinates();
    if (p0.equals(eCoord[0]) && p1.equals(eCoord[1])) { return e }
  }
  return null
};
PlanarGraph.prototype.interfaces_ = function interfaces_ () {
  return []
};
PlanarGraph.prototype.getClass = function getClass () {
  return PlanarGraph
};
PlanarGraph.linkResultDirectedEdges = function linkResultDirectedEdges (nodes) {
  for (var nodeit = nodes.iterator(); nodeit.hasNext();) {
    var node = nodeit.next();
    node.getEdges().linkResultDirectedEdges();
  }
};

var PolygonBuilder = function PolygonBuilder () {
  this._geometryFactory = null;
  this._shellList = new ArrayList();
  var geometryFactory = arguments[0];
  this._geometryFactory = geometryFactory;
};
PolygonBuilder.prototype.sortShellsAndHoles = function sortShellsAndHoles (edgeRings, shellList, freeHoleList) {
  for (var it = edgeRings.iterator(); it.hasNext();) {
    var er = it.next();
    if (er.isHole()) {
      freeHoleList.add(er);
    } else {
      shellList.add(er);
    }
  }
};
PolygonBuilder.prototype.computePolygons = function computePolygons (shellList) {
    var this$1 = this;

  var resultPolyList = new ArrayList();
  for (var it = shellList.iterator(); it.hasNext();) {
    var er = it.next();
    var poly = er.toPolygon(this$1._geometryFactory);
    resultPolyList.add(poly);
  }
  return resultPolyList
};
PolygonBuilder.prototype.placeFreeHoles = function placeFreeHoles (shellList, freeHoleList) {
    var this$1 = this;

  for (var it = freeHoleList.iterator(); it.hasNext();) {
    var hole = it.next();
    if (hole.getShell() === null) {
      var shell = this$1.findEdgeRingContaining(hole, shellList);
      if (shell === null) { throw new TopologyException('unable to assign hole to a shell', hole.getCoordinate(0)) }
      hole.setShell(shell);
    }
  }
};
PolygonBuilder.prototype.buildMinimalEdgeRings = function buildMinimalEdgeRings (maxEdgeRings, shellList, freeHoleList) {
    var this$1 = this;

  var edgeRings = new ArrayList();
  for (var it = maxEdgeRings.iterator(); it.hasNext();) {
    var er = it.next();
    if (er.getMaxNodeDegree() > 2) {
      er.linkDirectedEdgesForMinimalEdgeRings();
      var minEdgeRings = er.buildMinimalRings();
      var shell = this$1.findShell(minEdgeRings);
      if (shell !== null) {
        this$1.placePolygonHoles(shell, minEdgeRings);
        shellList.add(shell);
      } else {
        freeHoleList.addAll(minEdgeRings);
      }
    } else {
      edgeRings.add(er);
    }
  }
  return edgeRings
};
PolygonBuilder.prototype.containsPoint = function containsPoint (p) {
  for (var it = this._shellList.iterator(); it.hasNext();) {
    var er = it.next();
    if (er.containsPoint(p)) { return true }
  }
  return false
};
PolygonBuilder.prototype.buildMaximalEdgeRings = function buildMaximalEdgeRings (dirEdges) {
    var this$1 = this;

  var maxEdgeRings = new ArrayList();
  for (var it = dirEdges.iterator(); it.hasNext();) {
    var de = it.next();
    if (de.isInResult() && de.getLabel().isArea()) {
      if (de.getEdgeRing() === null) {
        var er = new MaximalEdgeRing(de, this$1._geometryFactory);
        maxEdgeRings.add(er);
        er.setInResult();
      }
    }
  }
  return maxEdgeRings
};
PolygonBuilder.prototype.placePolygonHoles = function placePolygonHoles (shell, minEdgeRings) {
  for (var it = minEdgeRings.iterator(); it.hasNext();) {
    var er = it.next();
    if (er.isHole()) {
      er.setShell(shell);
    }
  }
};
PolygonBuilder.prototype.getPolygons = function getPolygons () {
  var resultPolyList = this.computePolygons(this._shellList);
  return resultPolyList
};
PolygonBuilder.prototype.findEdgeRingContaining = function findEdgeRingContaining (testEr, shellList) {
  var testRing = testEr.getLinearRing();
  var testEnv = testRing.getEnvelopeInternal();
  var testPt = testRing.getCoordinateN(0);
  var minShell = null;
  var minEnv = null;
  for (var it = shellList.iterator(); it.hasNext();) {
    var tryShell = it.next();
    var tryRing = tryShell.getLinearRing();
    var tryEnv = tryRing.getEnvelopeInternal();
    if (minShell !== null) { minEnv = minShell.getLinearRing().getEnvelopeInternal(); }
    var isContained = false;
    if (tryEnv.contains(testEnv) && CGAlgorithms.isPointInRing(testPt, tryRing.getCoordinates())) { isContained = true; }
    if (isContained) {
      if (minShell === null || minEnv.contains(tryEnv)) {
        minShell = tryShell;
      }
    }
  }
  return minShell
};
PolygonBuilder.prototype.findShell = function findShell (minEdgeRings) {
  var shellCount = 0;
  var shell = null;
  for (var it = minEdgeRings.iterator(); it.hasNext();) {
    var er = it.next();
    if (!er.isHole()) {
      shell = er;
      shellCount++;
    }
  }
  Assert.isTrue(shellCount <= 1, 'found two shells in MinimalEdgeRing list');
  return shell
};
PolygonBuilder.prototype.add = function add () {
  if (arguments.length === 1) {
    var graph = arguments[0];
    this.add(graph.getEdgeEnds(), graph.getNodes());
  } else if (arguments.length === 2) {
    var dirEdges = arguments[0];
    var nodes = arguments[1];
    PlanarGraph.linkResultDirectedEdges(nodes);
    var maxEdgeRings = this.buildMaximalEdgeRings(dirEdges);
    var freeHoleList = new ArrayList();
    var edgeRings = this.buildMinimalEdgeRings(maxEdgeRings, this._shellList, freeHoleList);
    this.sortShellsAndHoles(edgeRings, this._shellList, freeHoleList);
    this.placeFreeHoles(this._shellList, freeHoleList);
  }
};
PolygonBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
PolygonBuilder.prototype.getClass = function getClass () {
  return PolygonBuilder
};

var Boundable = function Boundable () {};

Boundable.prototype.getBounds = function getBounds () {};
Boundable.prototype.interfaces_ = function interfaces_ () {
  return []
};
Boundable.prototype.getClass = function getClass () {
  return Boundable
};

var ItemBoundable = function ItemBoundable () {
  this._bounds = null;
  this._item = null;
  var bounds = arguments[0];
  var item = arguments[1];
  this._bounds = bounds;
  this._item = item;
};
ItemBoundable.prototype.getItem = function getItem () {
  return this._item
};
ItemBoundable.prototype.getBounds = function getBounds () {
  return this._bounds
};
ItemBoundable.prototype.interfaces_ = function interfaces_ () {
  return [Boundable, Serializable]
};
ItemBoundable.prototype.getClass = function getClass () {
  return ItemBoundable
};

var PriorityQueue = function PriorityQueue () {
  this._size = null;
  this._items = null;
  this._size = 0;
  this._items = new ArrayList();
  this._items.add(null);
};
PriorityQueue.prototype.poll = function poll () {
  if (this.isEmpty()) { return null }
  var minItem = this._items.get(1);
  this._items.set(1, this._items.get(this._size));
  this._size -= 1;
  this.reorder(1);
  return minItem
};
PriorityQueue.prototype.size = function size () {
  return this._size
};
PriorityQueue.prototype.reorder = function reorder (hole) {
    var this$1 = this;

  var child = null;
  var tmp = this._items.get(hole);
  for (; hole * 2 <= this._size; hole = child) {
    child = hole * 2;
    if (child !== this$1._size && this$1._items.get(child + 1).compareTo(this$1._items.get(child)) < 0) { child++; }
    if (this$1._items.get(child).compareTo(tmp) < 0) { this$1._items.set(hole, this$1._items.get(child)); } else { break }
  }
  this._items.set(hole, tmp);
};
PriorityQueue.prototype.clear = function clear () {
  this._size = 0;
  this._items.clear();
};
PriorityQueue.prototype.isEmpty = function isEmpty () {
  return this._size === 0
};
PriorityQueue.prototype.add = function add (x) {
    var this$1 = this;

  this._items.add(null);
  this._size += 1;
  var hole = this._size;
  this._items.set(0, x);
  for (; x.compareTo(this._items.get(Math.trunc(hole / 2))) < 0; hole /= 2) {
    this$1._items.set(hole, this$1._items.get(Math.trunc(hole / 2)));
  }
  this._items.set(hole, x);
};
PriorityQueue.prototype.interfaces_ = function interfaces_ () {
  return []
};
PriorityQueue.prototype.getClass = function getClass () {
  return PriorityQueue
};

var ItemVisitor = function ItemVisitor () {};

ItemVisitor.prototype.visitItem = function visitItem (item) {};
ItemVisitor.prototype.interfaces_ = function interfaces_ () {
  return []
};
ItemVisitor.prototype.getClass = function getClass () {
  return ItemVisitor
};

var SpatialIndex = function SpatialIndex () {};

SpatialIndex.prototype.insert = function insert (itemEnv, item) {};
SpatialIndex.prototype.remove = function remove (itemEnv, item) {};
SpatialIndex.prototype.query = function query () {
  // if (arguments.length === 1) {
  // const searchEnv = arguments[0]
  // } else if (arguments.length === 2) {
  // const searchEnv = arguments[0]
  // const visitor = arguments[1]
  // }
};
SpatialIndex.prototype.interfaces_ = function interfaces_ () {
  return []
};
SpatialIndex.prototype.getClass = function getClass () {
  return SpatialIndex
};

var AbstractNode = function AbstractNode () {
  this._childBoundables = new ArrayList();
  this._bounds = null;
  this._level = null;
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var level = arguments[0];
    this._level = level;
  }
};

var staticAccessors$22 = { serialVersionUID: { configurable: true } };
AbstractNode.prototype.getLevel = function getLevel () {
  return this._level
};
AbstractNode.prototype.size = function size () {
  return this._childBoundables.size()
};
AbstractNode.prototype.getChildBoundables = function getChildBoundables () {
  return this._childBoundables
};
AbstractNode.prototype.addChildBoundable = function addChildBoundable (childBoundable) {
  Assert.isTrue(this._bounds === null);
  this._childBoundables.add(childBoundable);
};
AbstractNode.prototype.isEmpty = function isEmpty () {
  return this._childBoundables.isEmpty()
};
AbstractNode.prototype.getBounds = function getBounds () {
  if (this._bounds === null) {
    this._bounds = this.computeBounds();
  }
  return this._bounds
};
AbstractNode.prototype.interfaces_ = function interfaces_ () {
  return [Boundable, Serializable]
};
AbstractNode.prototype.getClass = function getClass () {
  return AbstractNode
};
staticAccessors$22.serialVersionUID.get = function () { return 6493722185909573708 };

Object.defineProperties( AbstractNode, staticAccessors$22 );

var Collections = function Collections () {};

Collections.reverseOrder = function reverseOrder () {
  return {
    compare: function compare (a, b) {
      return b.compareTo(a)
    }
  }
};
Collections.min = function min (l) {
  Collections.sort(l);
  return l.get(0)
};
Collections.sort = function sort (l, c) {
  var a = l.toArray();
  if (c) {
    Arrays.sort(a, c);
  } else {
    Arrays.sort(a);
  }
  var i = l.iterator();
  for (var pos = 0, alen = a.length; pos < alen; pos++) {
    i.next();
    i.set(a[pos]);
  }
};
Collections.singletonList = function singletonList (o) {
  var arrayList = new ArrayList();
  arrayList.add(o);
  return arrayList
};

var BoundablePair = function BoundablePair () {
  this._boundable1 = null;
  this._boundable2 = null;
  this._distance = null;
  this._itemDistance = null;
  var boundable1 = arguments[0];
  var boundable2 = arguments[1];
  var itemDistance = arguments[2];
  this._boundable1 = boundable1;
  this._boundable2 = boundable2;
  this._itemDistance = itemDistance;
  this._distance = this.distance();
};
BoundablePair.prototype.expandToQueue = function expandToQueue (priQ, minDistance) {
  var isComp1 = BoundablePair.isComposite(this._boundable1);
  var isComp2 = BoundablePair.isComposite(this._boundable2);
  if (isComp1 && isComp2) {
    if (BoundablePair.area(this._boundable1) > BoundablePair.area(this._boundable2)) {
      this.expand(this._boundable1, this._boundable2, priQ, minDistance);
      return null
    } else {
      this.expand(this._boundable2, this._boundable1, priQ, minDistance);
      return null
    }
  } else if (isComp1) {
    this.expand(this._boundable1, this._boundable2, priQ, minDistance);
    return null
  } else if (isComp2) {
    this.expand(this._boundable2, this._boundable1, priQ, minDistance);
    return null
  }
  throw new IllegalArgumentException('neither boundable is composite')
};
BoundablePair.prototype.isLeaves = function isLeaves () {
  return !(BoundablePair.isComposite(this._boundable1) || BoundablePair.isComposite(this._boundable2))
};
BoundablePair.prototype.compareTo = function compareTo (o) {
  var nd = o;
  if (this._distance < nd._distance) { return -1 }
  if (this._distance > nd._distance) { return 1 }
  return 0
};
BoundablePair.prototype.expand = function expand (bndComposite, bndOther, priQ, minDistance) {
    var this$1 = this;

  var children = bndComposite.getChildBoundables();
  for (var i = children.iterator(); i.hasNext();) {
    var child = i.next();
    var bp = new BoundablePair(child, bndOther, this$1._itemDistance);
    if (bp.getDistance() < minDistance) {
      priQ.add(bp);
    }
  }
};
BoundablePair.prototype.getBoundable = function getBoundable (i) {
  if (i === 0) { return this._boundable1 }
  return this._boundable2
};
BoundablePair.prototype.getDistance = function getDistance () {
  return this._distance
};
BoundablePair.prototype.distance = function distance () {
  if (this.isLeaves()) {
    return this._itemDistance.distance(this._boundable1, this._boundable2)
  }
  return this._boundable1.getBounds().distance(this._boundable2.getBounds())
};
BoundablePair.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
BoundablePair.prototype.getClass = function getClass () {
  return BoundablePair
};
BoundablePair.area = function area (b) {
  return b.getBounds().getArea()
};
BoundablePair.isComposite = function isComposite (item) {
  return item instanceof AbstractNode
};

var AbstractSTRtree = function AbstractSTRtree () {
  this._root = null;
  this._built = false;
  this._itemBoundables = new ArrayList();
  this._nodeCapacity = null;
  if (arguments.length === 0) {
    var nodeCapacity = AbstractSTRtree.DEFAULT_NODE_CAPACITY;
    this._nodeCapacity = nodeCapacity;
  } else if (arguments.length === 1) {
    var nodeCapacity$1 = arguments[0];
    Assert.isTrue(nodeCapacity$1 > 1, 'Node capacity must be greater than 1');
    this._nodeCapacity = nodeCapacity$1;
  }
};

var staticAccessors$23 = { IntersectsOp: { configurable: true },serialVersionUID: { configurable: true },DEFAULT_NODE_CAPACITY: { configurable: true } };
AbstractSTRtree.prototype.getNodeCapacity = function getNodeCapacity () {
  return this._nodeCapacity
};
AbstractSTRtree.prototype.lastNode = function lastNode (nodes) {
  return nodes.get(nodes.size() - 1)
};
AbstractSTRtree.prototype.size = function size () {
    var this$1 = this;

  if (arguments.length === 0) {
    if (this.isEmpty()) {
      return 0
    }
    this.build();
    return this.size(this._root)
  } else if (arguments.length === 1) {
    var node = arguments[0];
    var size = 0;
    for (var i = node.getChildBoundables().iterator(); i.hasNext();) {
      var childBoundable = i.next();
      if (childBoundable instanceof AbstractNode) {
        size += this$1.size(childBoundable);
      } else if (childBoundable instanceof ItemBoundable) {
        size += 1;
      }
    }
    return size
  }
};
AbstractSTRtree.prototype.removeItem = function removeItem (node, item) {
  var childToRemove = null;
  for (var i = node.getChildBoundables().iterator(); i.hasNext();) {
    var childBoundable = i.next();
    if (childBoundable instanceof ItemBoundable) {
      if (childBoundable.getItem() === item) { childToRemove = childBoundable; }
    }
  }
  if (childToRemove !== null) {
    node.getChildBoundables().remove(childToRemove);
    return true
  }
  return false
};
AbstractSTRtree.prototype.itemsTree = function itemsTree () {
    var this$1 = this;

  if (arguments.length === 0) {
    this.build();
    var valuesTree = this.itemsTree(this._root);
    if (valuesTree === null) { return new ArrayList() }
    return valuesTree
  } else if (arguments.length === 1) {
    var node = arguments[0];
    var valuesTreeForNode = new ArrayList();
    for (var i = node.getChildBoundables().iterator(); i.hasNext();) {
      var childBoundable = i.next();
      if (childBoundable instanceof AbstractNode) {
        var valuesTreeForChild = this$1.itemsTree(childBoundable);
        if (valuesTreeForChild !== null) { valuesTreeForNode.add(valuesTreeForChild); }
      } else if (childBoundable instanceof ItemBoundable) {
        valuesTreeForNode.add(childBoundable.getItem());
      } else {
        Assert.shouldNeverReachHere();
      }
    }
    if (valuesTreeForNode.size() <= 0) { return null }
    return valuesTreeForNode
  }
};
AbstractSTRtree.prototype.insert = function insert (bounds, item) {
  Assert.isTrue(!this._built, 'Cannot insert items into an STR packed R-tree after it has been built.');
  this._itemBoundables.add(new ItemBoundable(bounds, item));
};
AbstractSTRtree.prototype.boundablesAtLevel = function boundablesAtLevel () {
    var this$1 = this;

  if (arguments.length === 1) {
    var level = arguments[0];
    var boundables = new ArrayList();
    this.boundablesAtLevel(level, this._root, boundables);
    return boundables
  } else if (arguments.length === 3) {
    var level$1 = arguments[0];
    var top = arguments[1];
    var boundables$1 = arguments[2];
    Assert.isTrue(level$1 > -2);
    if (top.getLevel() === level$1) {
      boundables$1.add(top);
      return null
    }
    for (var i = top.getChildBoundables().iterator(); i.hasNext();) {
      var boundable = i.next();
      if (boundable instanceof AbstractNode) {
        this$1.boundablesAtLevel(level$1, boundable, boundables$1);
      } else {
        Assert.isTrue(boundable instanceof ItemBoundable);
        if (level$1 === -1) {
          boundables$1.add(boundable);
        }
      }
    }
    return null
  }
};
AbstractSTRtree.prototype.query = function query () {
    var this$1 = this;

  if (arguments.length === 1) {
    var searchBounds = arguments[0];
    this.build();
    var matches = new ArrayList();
    if (this.isEmpty()) {
      return matches
    }
    if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds)) {
      this.query(searchBounds, this._root, matches);
    }
    return matches
  } else if (arguments.length === 2) {
    var searchBounds$1 = arguments[0];
    var visitor = arguments[1];
    this.build();
    if (this.isEmpty()) {
      return null
    }
    if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds$1)) {
      this.query(searchBounds$1, this._root, visitor);
    }
  } else if (arguments.length === 3) {
    if (hasInterface(arguments[2], ItemVisitor) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
      var searchBounds$2 = arguments[0];
      var node = arguments[1];
      var visitor$1 = arguments[2];
      var childBoundables = node.getChildBoundables();
      for (var i = 0; i < childBoundables.size(); i++) {
        var childBoundable = childBoundables.get(i);
        if (!this$1.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds$2)) {
          continue
        }
        if (childBoundable instanceof AbstractNode) {
          this$1.query(searchBounds$2, childBoundable, visitor$1);
        } else if (childBoundable instanceof ItemBoundable) {
          visitor$1.visitItem(childBoundable.getItem());
        } else {
          Assert.shouldNeverReachHere();
        }
      }
    } else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
      var searchBounds$3 = arguments[0];
      var node$1 = arguments[1];
      var matches$1 = arguments[2];
      var childBoundables$1 = node$1.getChildBoundables();
      for (var i$1 = 0; i$1 < childBoundables$1.size(); i$1++) {
        var childBoundable$1 = childBoundables$1.get(i$1);
        if (!this$1.getIntersectsOp().intersects(childBoundable$1.getBounds(), searchBounds$3)) {
          continue
        }
        if (childBoundable$1 instanceof AbstractNode) {
          this$1.query(searchBounds$3, childBoundable$1, matches$1);
        } else if (childBoundable$1 instanceof ItemBoundable) {
          matches$1.add(childBoundable$1.getItem());
        } else {
          Assert.shouldNeverReachHere();
        }
      }
    }
  }
};
AbstractSTRtree.prototype.build = function build () {
  if (this._built) { return null }
  this._root = this._itemBoundables.isEmpty() ? this.createNode(0) : this.createHigherLevels(this._itemBoundables, -1);
  this._itemBoundables = null;
  this._built = true;
};
AbstractSTRtree.prototype.getRoot = function getRoot () {
  this.build();
  return this._root
};
AbstractSTRtree.prototype.remove = function remove () {
    var this$1 = this;

  if (arguments.length === 2) {
    var searchBounds = arguments[0];
    var item = arguments[1];
    this.build();
    if (this.getIntersectsOp().intersects(this._root.getBounds(), searchBounds)) {
      return this.remove(searchBounds, this._root, item)
    }
    return false
  } else if (arguments.length === 3) {
    var searchBounds$1 = arguments[0];
    var node = arguments[1];
    var item$1 = arguments[2];
    var found = this.removeItem(node, item$1);
    if (found) { return true }
    var childToPrune = null;
    for (var i = node.getChildBoundables().iterator(); i.hasNext();) {
      var childBoundable = i.next();
      if (!this$1.getIntersectsOp().intersects(childBoundable.getBounds(), searchBounds$1)) {
        continue
      }
      if (childBoundable instanceof AbstractNode) {
        found = this$1.remove(searchBounds$1, childBoundable, item$1);
        if (found) {
          childToPrune = childBoundable;
          break
        }
      }
    }
    if (childToPrune !== null) {
      if (childToPrune.getChildBoundables().isEmpty()) {
        node.getChildBoundables().remove(childToPrune);
      }
    }
    return found
  }
};
AbstractSTRtree.prototype.createHigherLevels = function createHigherLevels (boundablesOfALevel, level) {
  Assert.isTrue(!boundablesOfALevel.isEmpty());
  var parentBoundables = this.createParentBoundables(boundablesOfALevel, level + 1);
  if (parentBoundables.size() === 1) {
    return parentBoundables.get(0)
  }
  return this.createHigherLevels(parentBoundables, level + 1)
};
AbstractSTRtree.prototype.depth = function depth () {
    var this$1 = this;

  if (arguments.length === 0) {
    if (this.isEmpty()) {
      return 0
    }
    this.build();
    return this.depth(this._root)
  } else if (arguments.length === 1) {
    var node = arguments[0];
    var maxChildDepth = 0;
    for (var i = node.getChildBoundables().iterator(); i.hasNext();) {
      var childBoundable = i.next();
      if (childBoundable instanceof AbstractNode) {
        var childDepth = this$1.depth(childBoundable);
        if (childDepth > maxChildDepth) { maxChildDepth = childDepth; }
      }
    }
    return maxChildDepth + 1
  }
};
AbstractSTRtree.prototype.createParentBoundables = function createParentBoundables (childBoundables, newLevel) {
    var this$1 = this;

  Assert.isTrue(!childBoundables.isEmpty());
  var parentBoundables = new ArrayList();
  parentBoundables.add(this.createNode(newLevel));
  var sortedChildBoundables = new ArrayList(childBoundables);
  Collections.sort(sortedChildBoundables, this.getComparator());
  for (var i = sortedChildBoundables.iterator(); i.hasNext();) {
    var childBoundable = i.next();
    if (this$1.lastNode(parentBoundables).getChildBoundables().size() === this$1.getNodeCapacity()) {
      parentBoundables.add(this$1.createNode(newLevel));
    }
    this$1.lastNode(parentBoundables).addChildBoundable(childBoundable);
  }
  return parentBoundables
};
AbstractSTRtree.prototype.isEmpty = function isEmpty () {
  if (!this._built) { return this._itemBoundables.isEmpty() }
  return this._root.isEmpty()
};
AbstractSTRtree.prototype.interfaces_ = function interfaces_ () {
  return [Serializable]
};
AbstractSTRtree.prototype.getClass = function getClass () {
  return AbstractSTRtree
};
AbstractSTRtree.compareDoubles = function compareDoubles (a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
staticAccessors$23.IntersectsOp.get = function () { return IntersectsOp };
staticAccessors$23.serialVersionUID.get = function () { return -3886435814360241337 };
staticAccessors$23.DEFAULT_NODE_CAPACITY.get = function () { return 10 };

Object.defineProperties( AbstractSTRtree, staticAccessors$23 );

var IntersectsOp = function IntersectsOp () {};

var ItemDistance = function ItemDistance () {};

ItemDistance.prototype.distance = function distance (item1, item2) {};
ItemDistance.prototype.interfaces_ = function interfaces_ () {
  return []
};
ItemDistance.prototype.getClass = function getClass () {
  return ItemDistance
};

var STRtree = (function (AbstractSTRtree$$1) {
  function STRtree (nodeCapacity) {
    nodeCapacity = nodeCapacity || STRtree.DEFAULT_NODE_CAPACITY;
    AbstractSTRtree$$1.call(this, nodeCapacity);
  }

  if ( AbstractSTRtree$$1 ) STRtree.__proto__ = AbstractSTRtree$$1;
  STRtree.prototype = Object.create( AbstractSTRtree$$1 && AbstractSTRtree$$1.prototype );
  STRtree.prototype.constructor = STRtree;

  var staticAccessors = { STRtreeNode: { configurable: true },serialVersionUID: { configurable: true },xComparator: { configurable: true },yComparator: { configurable: true },intersectsOp: { configurable: true },DEFAULT_NODE_CAPACITY: { configurable: true } };
  STRtree.prototype.createParentBoundablesFromVerticalSlices = function createParentBoundablesFromVerticalSlices (verticalSlices, newLevel) {
    var this$1 = this;

    Assert.isTrue(verticalSlices.length > 0);
    var parentBoundables = new ArrayList();
    for (var i = 0; i < verticalSlices.length; i++) {
      parentBoundables.addAll(this$1.createParentBoundablesFromVerticalSlice(verticalSlices[i], newLevel));
    }
    return parentBoundables
  };
  STRtree.prototype.createNode = function createNode (level) {
    return new STRtreeNode(level)
  };
  STRtree.prototype.size = function size () {
    if (arguments.length === 0) {
      return AbstractSTRtree$$1.prototype.size.call(this)
    } else { return AbstractSTRtree$$1.prototype.size.apply(this, arguments) }
  };
  STRtree.prototype.insert = function insert () {
    if (arguments.length === 2) {
      var itemEnv = arguments[0];
      var item = arguments[1];
      if (itemEnv.isNull()) {
        return null
      }
      AbstractSTRtree$$1.prototype.insert.call(this, itemEnv, item);
    } else { return AbstractSTRtree$$1.prototype.insert.apply(this, arguments) }
  };
  STRtree.prototype.getIntersectsOp = function getIntersectsOp () {
    return STRtree.intersectsOp
  };
  STRtree.prototype.verticalSlices = function verticalSlices (childBoundables, sliceCount) {
    var sliceCapacity = Math.trunc(Math.ceil(childBoundables.size() / sliceCount));
    var slices = new Array(sliceCount).fill(null);
    var i = childBoundables.iterator();
    for (var j = 0; j < sliceCount; j++) {
      slices[j] = new ArrayList();
      var boundablesAddedToSlice = 0;
      while (i.hasNext() && boundablesAddedToSlice < sliceCapacity) {
        var childBoundable = i.next();
        slices[j].add(childBoundable);
        boundablesAddedToSlice++;
      }
    }
    return slices
  };
  STRtree.prototype.query = function query () {
    if (arguments.length === 1) {
      var searchEnv = arguments[0];
      return AbstractSTRtree$$1.prototype.query.call(this, searchEnv)
    } else if (arguments.length === 2) {
      var searchEnv$1 = arguments[0];
      var visitor = arguments[1];
      AbstractSTRtree$$1.prototype.query.call(this, searchEnv$1, visitor);
    } else if (arguments.length === 3) {
      if (hasInterface(arguments[2], ItemVisitor) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
        var searchBounds = arguments[0];
        var node = arguments[1];
        var visitor$1 = arguments[2];
        AbstractSTRtree$$1.prototype.query.call(this, searchBounds, node, visitor$1);
      } else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Object && arguments[1] instanceof AbstractNode)) {
        var searchBounds$1 = arguments[0];
        var node$1 = arguments[1];
        var matches = arguments[2];
        AbstractSTRtree$$1.prototype.query.call(this, searchBounds$1, node$1, matches);
      }
    }
  };
  STRtree.prototype.getComparator = function getComparator () {
    return STRtree.yComparator
  };
  STRtree.prototype.createParentBoundablesFromVerticalSlice = function createParentBoundablesFromVerticalSlice (childBoundables, newLevel) {
    return AbstractSTRtree$$1.prototype.createParentBoundables.call(this, childBoundables, newLevel)
  };
  STRtree.prototype.remove = function remove () {
    if (arguments.length === 2) {
      var itemEnv = arguments[0];
      var item = arguments[1];
      return AbstractSTRtree$$1.prototype.remove.call(this, itemEnv, item)
    } else { return AbstractSTRtree$$1.prototype.remove.apply(this, arguments) }
  };
  STRtree.prototype.depth = function depth () {
    if (arguments.length === 0) {
      return AbstractSTRtree$$1.prototype.depth.call(this)
    } else { return AbstractSTRtree$$1.prototype.depth.apply(this, arguments) }
  };
  STRtree.prototype.createParentBoundables = function createParentBoundables (childBoundables, newLevel) {
    Assert.isTrue(!childBoundables.isEmpty());
    var minLeafCount = Math.trunc(Math.ceil(childBoundables.size() / this.getNodeCapacity()));
    var sortedChildBoundables = new ArrayList(childBoundables);
    Collections.sort(sortedChildBoundables, STRtree.xComparator);
    var verticalSlices = this.verticalSlices(sortedChildBoundables, Math.trunc(Math.ceil(Math.sqrt(minLeafCount))));
    return this.createParentBoundablesFromVerticalSlices(verticalSlices, newLevel)
  };
  STRtree.prototype.nearestNeighbour = function nearestNeighbour () {
    if (arguments.length === 1) {
      if (hasInterface(arguments[0], ItemDistance)) {
        var itemDist = arguments[0];
        var bp = new BoundablePair(this.getRoot(), this.getRoot(), itemDist);
        return this.nearestNeighbour(bp)
      } else if (arguments[0] instanceof BoundablePair) {
        var initBndPair = arguments[0];
        return this.nearestNeighbour(initBndPair, Double.POSITIVE_INFINITY)
      }
    } else if (arguments.length === 2) {
      if (arguments[0] instanceof STRtree && hasInterface(arguments[1], ItemDistance)) {
        var tree = arguments[0];
        var itemDist$1 = arguments[1];
        var bp$1 = new BoundablePair(this.getRoot(), tree.getRoot(), itemDist$1);
        return this.nearestNeighbour(bp$1)
      } else if (arguments[0] instanceof BoundablePair && typeof arguments[1] === 'number') {
        var initBndPair$1 = arguments[0];
        var maxDistance = arguments[1];
        var distanceLowerBound = maxDistance;
        var minPair = null;
        var priQ = new PriorityQueue();
        priQ.add(initBndPair$1);
        while (!priQ.isEmpty() && distanceLowerBound > 0.0) {
          var bndPair = priQ.poll();
          var currentDistance = bndPair.getDistance();
          if (currentDistance >= distanceLowerBound) { break }
          if (bndPair.isLeaves()) {
            distanceLowerBound = currentDistance;
            minPair = bndPair;
          } else {
            bndPair.expandToQueue(priQ, distanceLowerBound);
          }
        }
        return [minPair.getBoundable(0).getItem(), minPair.getBoundable(1).getItem()]
      }
    } else if (arguments.length === 3) {
      var env = arguments[0];
      var item = arguments[1];
      var itemDist$2 = arguments[2];
      var bnd = new ItemBoundable(env, item);
      var bp$2 = new BoundablePair(this.getRoot(), bnd, itemDist$2);
      return this.nearestNeighbour(bp$2)[0]
    }
  };
  STRtree.prototype.interfaces_ = function interfaces_ () {
    return [SpatialIndex, Serializable]
  };
  STRtree.prototype.getClass = function getClass () {
    return STRtree
  };
  STRtree.centreX = function centreX (e) {
    return STRtree.avg(e.getMinX(), e.getMaxX())
  };
  STRtree.avg = function avg (a, b) {
    return (a + b) / 2
  };
  STRtree.centreY = function centreY (e) {
    return STRtree.avg(e.getMinY(), e.getMaxY())
  };
  staticAccessors.STRtreeNode.get = function () { return STRtreeNode };
  staticAccessors.serialVersionUID.get = function () { return 259274702368956900 };
  staticAccessors.xComparator.get = function () {
    return {
      interfaces_: function () {
        return [Comparator]
      },
      compare: function (o1, o2) {
        return AbstractSTRtree$$1.compareDoubles(STRtree.centreX(o1.getBounds()), STRtree.centreX(o2.getBounds()))
      }
    }
  };
  staticAccessors.yComparator.get = function () {
    return {
      interfaces_: function () {
        return [Comparator]
      },
      compare: function (o1, o2) {
        return AbstractSTRtree$$1.compareDoubles(STRtree.centreY(o1.getBounds()), STRtree.centreY(o2.getBounds()))
      }
    }
  };
  staticAccessors.intersectsOp.get = function () {
    return {
      interfaces_: function () {
        return [AbstractSTRtree$$1.IntersectsOp]
      },
      intersects: function (aBounds, bBounds) {
        return aBounds.intersects(bBounds)
      }
    }
  };
  staticAccessors.DEFAULT_NODE_CAPACITY.get = function () { return 10 };

  Object.defineProperties( STRtree, staticAccessors );

  return STRtree;
}(AbstractSTRtree));

var STRtreeNode = (function (AbstractNode$$1) {
  function STRtreeNode () {
    var level = arguments[0];
    AbstractNode$$1.call(this, level);
  }

  if ( AbstractNode$$1 ) STRtreeNode.__proto__ = AbstractNode$$1;
  STRtreeNode.prototype = Object.create( AbstractNode$$1 && AbstractNode$$1.prototype );
  STRtreeNode.prototype.constructor = STRtreeNode;
  STRtreeNode.prototype.computeBounds = function computeBounds () {
    var bounds = null;
    for (var i = this.getChildBoundables().iterator(); i.hasNext();) {
      var childBoundable = i.next();
      if (bounds === null) {
        bounds = new Envelope(childBoundable.getBounds());
      } else {
        bounds.expandToInclude(childBoundable.getBounds());
      }
    }
    return bounds
  };
  STRtreeNode.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  STRtreeNode.prototype.getClass = function getClass () {
    return STRtreeNode
  };

  return STRtreeNode;
}(AbstractNode));

var SegmentPointComparator = function SegmentPointComparator () {};

SegmentPointComparator.prototype.interfaces_ = function interfaces_ () {
  return []
};
SegmentPointComparator.prototype.getClass = function getClass () {
  return SegmentPointComparator
};
SegmentPointComparator.relativeSign = function relativeSign (x0, x1) {
  if (x0 < x1) { return -1 }
  if (x0 > x1) { return 1 }
  return 0
};
SegmentPointComparator.compare = function compare (octant, p0, p1) {
  if (p0.equals2D(p1)) { return 0 }
  var xSign = SegmentPointComparator.relativeSign(p0.x, p1.x);
  var ySign = SegmentPointComparator.relativeSign(p0.y, p1.y);
  switch (octant) {
    case 0:
      return SegmentPointComparator.compareValue(xSign, ySign)
    case 1:
      return SegmentPointComparator.compareValue(ySign, xSign)
    case 2:
      return SegmentPointComparator.compareValue(ySign, -xSign)
    case 3:
      return SegmentPointComparator.compareValue(-xSign, ySign)
    case 4:
      return SegmentPointComparator.compareValue(-xSign, -ySign)
    case 5:
      return SegmentPointComparator.compareValue(-ySign, -xSign)
    case 6:
      return SegmentPointComparator.compareValue(-ySign, xSign)
    case 7:
      return SegmentPointComparator.compareValue(xSign, -ySign)
    default:
  }
  Assert.shouldNeverReachHere('invalid octant value');
  return 0
};
SegmentPointComparator.compareValue = function compareValue (compareSign0, compareSign1) {
  if (compareSign0 < 0) { return -1 }
  if (compareSign0 > 0) { return 1 }
  if (compareSign1 < 0) { return -1 }
  if (compareSign1 > 0) { return 1 }
  return 0
};

var SegmentNode = function SegmentNode () {
  this._segString = null;
  this.coord = null;
  this.segmentIndex = null;
  this._segmentOctant = null;
  this._isInterior = null;
  var segString = arguments[0];
  var coord = arguments[1];
  var segmentIndex = arguments[2];
  var segmentOctant = arguments[3];
  this._segString = segString;
  this.coord = new Coordinate(coord);
  this.segmentIndex = segmentIndex;
  this._segmentOctant = segmentOctant;
  this._isInterior = !coord.equals2D(segString.getCoordinate(segmentIndex));
};
SegmentNode.prototype.getCoordinate = function getCoordinate () {
  return this.coord
};
SegmentNode.prototype.print = function print (out) {
  out.print(this.coord);
  out.print(' seg # = ' + this.segmentIndex);
};
SegmentNode.prototype.compareTo = function compareTo (obj) {
  var other = obj;
  if (this.segmentIndex < other.segmentIndex) { return -1 }
  if (this.segmentIndex > other.segmentIndex) { return 1 }
  if (this.coord.equals2D(other.coord)) { return 0 }
  return SegmentPointComparator.compare(this._segmentOctant, this.coord, other.coord)
};
SegmentNode.prototype.isEndPoint = function isEndPoint (maxSegmentIndex) {
  if (this.segmentIndex === 0 && !this._isInterior) { return true }
  if (this.segmentIndex === maxSegmentIndex) { return true }
  return false
};
SegmentNode.prototype.isInterior = function isInterior () {
  return this._isInterior
};
SegmentNode.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
SegmentNode.prototype.getClass = function getClass () {
  return SegmentNode
};

// import Iterator from '../../../../java/util/Iterator'
var SegmentNodeList = function SegmentNodeList () {
  this._nodeMap = new TreeMap();
  this._edge = null;
  var edge = arguments[0];
  this._edge = edge;
};
SegmentNodeList.prototype.getSplitCoordinates = function getSplitCoordinates () {
    var this$1 = this;

  var coordList = new CoordinateList();
  this.addEndpoints();
  var it = this.iterator();
  var eiPrev = it.next();
  while (it.hasNext()) {
    var ei = it.next();
    this$1.addEdgeCoordinates(eiPrev, ei, coordList);
    eiPrev = ei;
  }
  return coordList.toCoordinateArray()
};
SegmentNodeList.prototype.addCollapsedNodes = function addCollapsedNodes () {
    var this$1 = this;

  var collapsedVertexIndexes = new ArrayList();
  this.findCollapsesFromInsertedNodes(collapsedVertexIndexes);
  this.findCollapsesFromExistingVertices(collapsedVertexIndexes);
  for (var it = collapsedVertexIndexes.iterator(); it.hasNext();) {
    var vertexIndex = it.next().intValue();
    this$1.add(this$1._edge.getCoordinate(vertexIndex), vertexIndex);
  }
};
SegmentNodeList.prototype.print = function print (out) {
  out.println('Intersections:');
  for (var it = this.iterator(); it.hasNext();) {
    var ei = it.next();
    ei.print(out);
  }
};
SegmentNodeList.prototype.findCollapsesFromExistingVertices = function findCollapsesFromExistingVertices (collapsedVertexIndexes) {
    var this$1 = this;

  for (var i = 0; i < this._edge.size() - 2; i++) {
    var p0 = this$1._edge.getCoordinate(i);
    // const p1 = this._edge.getCoordinate(i + 1)
    var p2 = this$1._edge.getCoordinate(i + 2);
    if (p0.equals2D(p2)) {
      collapsedVertexIndexes.add(new Integer(i + 1));
    }
  }
};
SegmentNodeList.prototype.addEdgeCoordinates = function addEdgeCoordinates (ei0, ei1, coordList) {
    var this$1 = this;

  // let npts = ei1.segmentIndex - ei0.segmentIndex + 2
  var lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex);
  var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
  // if (!useIntPt1) {
  // npts--
  // }
  // const ipt = 0
  coordList.add(new Coordinate(ei0.coord), false);
  for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
    coordList.add(this$1._edge.getCoordinate(i));
  }
  if (useIntPt1) {
    coordList.add(new Coordinate(ei1.coord));
  }
};
SegmentNodeList.prototype.iterator = function iterator () {
  return this._nodeMap.values().iterator()
};
SegmentNodeList.prototype.addSplitEdges = function addSplitEdges (edgeList) {
    var this$1 = this;

  this.addEndpoints();
  this.addCollapsedNodes();
  var it = this.iterator();
  var eiPrev = it.next();
  while (it.hasNext()) {
    var ei = it.next();
    var newEdge = this$1.createSplitEdge(eiPrev, ei);
    edgeList.add(newEdge);
    eiPrev = ei;
  }
};
SegmentNodeList.prototype.findCollapseIndex = function findCollapseIndex (ei0, ei1, collapsedVertexIndex) {
  if (!ei0.coord.equals2D(ei1.coord)) { return false }
  var numVerticesBetween = ei1.segmentIndex - ei0.segmentIndex;
  if (!ei1.isInterior()) {
    numVerticesBetween--;
  }
  if (numVerticesBetween === 1) {
    collapsedVertexIndex[0] = ei0.segmentIndex + 1;
    return true
  }
  return false
};
SegmentNodeList.prototype.findCollapsesFromInsertedNodes = function findCollapsesFromInsertedNodes (collapsedVertexIndexes) {
    var this$1 = this;

  var collapsedVertexIndex = new Array(1).fill(null);
  var it = this.iterator();
  var eiPrev = it.next();
  while (it.hasNext()) {
    var ei = it.next();
    var isCollapsed = this$1.findCollapseIndex(eiPrev, ei, collapsedVertexIndex);
    if (isCollapsed) { collapsedVertexIndexes.add(new Integer(collapsedVertexIndex[0])); }
    eiPrev = ei;
  }
};
SegmentNodeList.prototype.getEdge = function getEdge () {
  return this._edge
};
SegmentNodeList.prototype.addEndpoints = function addEndpoints () {
  var maxSegIndex = this._edge.size() - 1;
  this.add(this._edge.getCoordinate(0), 0);
  this.add(this._edge.getCoordinate(maxSegIndex), maxSegIndex);
};
SegmentNodeList.prototype.createSplitEdge = function createSplitEdge (ei0, ei1) {
    var this$1 = this;

  var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
  var lastSegStartPt = this._edge.getCoordinate(ei1.segmentIndex);
  var useIntPt1 = ei1.isInterior() || !ei1.coord.equals2D(lastSegStartPt);
  if (!useIntPt1) {
    npts--;
  }
  var pts = new Array(npts).fill(null);
  var ipt = 0;
  pts[ipt++] = new Coordinate(ei0.coord);
  for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
    pts[ipt++] = this$1._edge.getCoordinate(i);
  }
  if (useIntPt1) { pts[ipt] = new Coordinate(ei1.coord); }
  return new NodedSegmentString(pts, this._edge.getData())
};
SegmentNodeList.prototype.add = function add (intPt, segmentIndex) {
  var eiNew = new SegmentNode(this._edge, intPt, segmentIndex, this._edge.getSegmentOctant(segmentIndex));
  var ei = this._nodeMap.get(eiNew);
  if (ei !== null) {
    Assert.isTrue(ei.coord.equals2D(intPt), 'Found equal nodes with different coordinates');
    return ei
  }
  this._nodeMap.put(eiNew, eiNew);
  return eiNew
};
SegmentNodeList.prototype.checkSplitEdgesCorrectness = function checkSplitEdgesCorrectness (splitEdges) {
  var edgePts = this._edge.getCoordinates();
  var split0 = splitEdges.get(0);
  var pt0 = split0.getCoordinate(0);
  if (!pt0.equals2D(edgePts[0])) { throw new RuntimeException('bad split edge start point at ' + pt0) }
  var splitn = splitEdges.get(splitEdges.size() - 1);
  var splitnPts = splitn.getCoordinates();
  var ptn = splitnPts[splitnPts.length - 1];
  if (!ptn.equals2D(edgePts[edgePts.length - 1])) { throw new RuntimeException('bad split edge end point at ' + ptn) }
};
SegmentNodeList.prototype.interfaces_ = function interfaces_ () {
  return []
};
SegmentNodeList.prototype.getClass = function getClass () {
  return SegmentNodeList
};



// class NodeVertexIterator {
//   constructor () {
//     this._nodeList = null
//     this._edge = null
//     this._nodeIt = null
//     this._currNode = null
//     this._nextNode = null
//     this._currSegIndex = 0
//     let nodeList = arguments[0]
//     this._nodeList = nodeList
//     this._edge = nodeList.getEdge()
//     this._nodeIt = nodeList.iterator()
//     this.readNextNode()
//   }
//   next () {
//     if (this._currNode === null) {
//       this._currNode = this._nextNode
//       this._currSegIndex = this._currNode.segmentIndex
//       this.readNextNode()
//       return this._currNode
//     }
//     if (this._nextNode === null) return null
//     if (this._nextNode.segmentIndex === this._currNode.segmentIndex) {
//       this._currNode = this._nextNode
//       this._currSegIndex = this._currNode.segmentIndex
//       this.readNextNode()
//       return this._currNode
//     }
//     if (this._nextNode.segmentIndex > this._currNode.segmentIndex) {}
//     return null
//   }
//   remove () {
//     // throw new UnsupportedOperationException(this.getClass().getName())
//   }
//   hasNext () {
//     if (this._nextNode === null) return false
//     return true
//   }
//   readNextNode () {
//     if (this._nodeIt.hasNext()) this._nextNode = this._nodeIt.next(); else this._nextNode = null
//   }
//   interfaces_ () {
//     return [Iterator]
//   }
//   getClass () {
//     return NodeVertexIterator
//   }
// }

var Octant = function Octant () {};

Octant.prototype.interfaces_ = function interfaces_ () {
  return []
};
Octant.prototype.getClass = function getClass () {
  return Octant
};
Octant.octant = function octant () {
  if (typeof arguments[0] === 'number' && typeof arguments[1] === 'number') {
    var dx = arguments[0];
    var dy = arguments[1];
    if (dx === 0.0 && dy === 0.0) { throw new IllegalArgumentException('Cannot compute the octant for point ( ' + dx + ', ' + dy + ' )') }
    var adx = Math.abs(dx);
    var ady = Math.abs(dy);
    if (dx >= 0) {
      if (dy >= 0) {
        if (adx >= ady) { return 0; } else { return 1 }
      } else {
        if (adx >= ady) { return 7; } else { return 6 }
      }
    } else {
      if (dy >= 0) {
        if (adx >= ady) { return 3; } else { return 2 }
      } else {
        if (adx >= ady) { return 4; } else { return 5 }
      }
    }
  } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Coordinate) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    var dx$1 = p1.x - p0.x;
    var dy$1 = p1.y - p0.y;
    if (dx$1 === 0.0 && dy$1 === 0.0) { throw new IllegalArgumentException('Cannot compute the octant for two identical points ' + p0) }
    return Octant.octant(dx$1, dy$1)
  }
};

var SegmentString = function SegmentString () {};

SegmentString.prototype.getCoordinates = function getCoordinates () {};
SegmentString.prototype.size = function size () {};
SegmentString.prototype.getCoordinate = function getCoordinate (i) {};
SegmentString.prototype.isClosed = function isClosed () {};
SegmentString.prototype.setData = function setData (data) {};
SegmentString.prototype.getData = function getData () {};
SegmentString.prototype.interfaces_ = function interfaces_ () {
  return []
};
SegmentString.prototype.getClass = function getClass () {
  return SegmentString
};

var NodableSegmentString = function NodableSegmentString () {};

NodableSegmentString.prototype.addIntersection = function addIntersection (intPt, segmentIndex) {};
NodableSegmentString.prototype.interfaces_ = function interfaces_ () {
  return [SegmentString]
};
NodableSegmentString.prototype.getClass = function getClass () {
  return NodableSegmentString
};

var NodedSegmentString = function NodedSegmentString () {
  this._nodeList = new SegmentNodeList(this);
  this._pts = null;
  this._data = null;
  var pts = arguments[0];
  var data = arguments[1];
  this._pts = pts;
  this._data = data;
};
NodedSegmentString.prototype.getCoordinates = function getCoordinates () {
  return this._pts
};
NodedSegmentString.prototype.size = function size () {
  return this._pts.length
};
NodedSegmentString.prototype.getCoordinate = function getCoordinate (i) {
  return this._pts[i]
};
NodedSegmentString.prototype.isClosed = function isClosed () {
  return this._pts[0].equals(this._pts[this._pts.length - 1])
};
NodedSegmentString.prototype.getSegmentOctant = function getSegmentOctant (index) {
  if (index === this._pts.length - 1) { return -1 }
  return this.safeOctant(this.getCoordinate(index), this.getCoordinate(index + 1))
};
NodedSegmentString.prototype.setData = function setData (data) {
  this._data = data;
};
NodedSegmentString.prototype.safeOctant = function safeOctant (p0, p1) {
  if (p0.equals2D(p1)) { return 0 }
  return Octant.octant(p0, p1)
};
NodedSegmentString.prototype.getData = function getData () {
  return this._data
};
NodedSegmentString.prototype.addIntersection = function addIntersection () {
  if (arguments.length === 2) {
    var intPt$1 = arguments[0];
    var segmentIndex = arguments[1];
    this.addIntersectionNode(intPt$1, segmentIndex);
  } else if (arguments.length === 4) {
    var li = arguments[0];
    var segmentIndex$1 = arguments[1];
    // const geomIndex = arguments[2]
    var intIndex = arguments[3];
    var intPt = new Coordinate(li.getIntersection(intIndex));
    this.addIntersection(intPt, segmentIndex$1);
  }
};
NodedSegmentString.prototype.toString = function toString () {
  return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))
};
NodedSegmentString.prototype.getNodeList = function getNodeList () {
  return this._nodeList
};
NodedSegmentString.prototype.addIntersectionNode = function addIntersectionNode (intPt, segmentIndex) {
  var normalizedSegmentIndex = segmentIndex;
  var nextSegIndex = normalizedSegmentIndex + 1;
  if (nextSegIndex < this._pts.length) {
    var nextPt = this._pts[nextSegIndex];
    if (intPt.equals2D(nextPt)) {
      normalizedSegmentIndex = nextSegIndex;
    }
  }
  var ei = this._nodeList.add(intPt, normalizedSegmentIndex);
  return ei
};
NodedSegmentString.prototype.addIntersections = function addIntersections (li, segmentIndex, geomIndex) {
    var this$1 = this;

  for (var i = 0; i < li.getIntersectionNum(); i++) {
    this$1.addIntersection(li, segmentIndex, geomIndex, i);
  }
};
NodedSegmentString.prototype.interfaces_ = function interfaces_ () {
  return [NodableSegmentString]
};
NodedSegmentString.prototype.getClass = function getClass () {
  return NodedSegmentString
};
NodedSegmentString.getNodedSubstrings = function getNodedSubstrings () {
  if (arguments.length === 1) {
    var segStrings = arguments[0];
    var resultEdgelist = new ArrayList();
    NodedSegmentString.getNodedSubstrings(segStrings, resultEdgelist);
    return resultEdgelist
  } else if (arguments.length === 2) {
    var segStrings$1 = arguments[0];
    var resultEdgelist$1 = arguments[1];
    for (var i = segStrings$1.iterator(); i.hasNext();) {
      var ss = i.next();
      ss.getNodeList().addSplitEdges(resultEdgelist$1);
    }
  }
};

var LineSegment = function LineSegment () {
  this.p0 = null;
  this.p1 = null;
  if (arguments.length === 0) {
    this.p0 = new Coordinate();
    this.p1 = new Coordinate();
  } else if (arguments.length === 1) {
    var ls = arguments[0];
    this.p0 = new Coordinate(ls.p0);
    this.p1 = new Coordinate(ls.p1);
  } else if (arguments.length === 2) {
    this.p0 = arguments[0];
    this.p1 = arguments[1];
  } else if (arguments.length === 4) {
    var x0 = arguments[0];
    var y0 = arguments[1];
    var x1 = arguments[2];
    var y1 = arguments[3];
    this.p0 = new Coordinate(x0, y0);
    this.p1 = new Coordinate(x1, y1);
  }
};

var staticAccessors$24 = { serialVersionUID: { configurable: true } };
LineSegment.prototype.minX = function minX () {
  return Math.min(this.p0.x, this.p1.x)
};
LineSegment.prototype.orientationIndex = function orientationIndex () {
  if (arguments[0] instanceof LineSegment) {
    var seg = arguments[0];
    var orient0 = CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p0);
    var orient1 = CGAlgorithms.orientationIndex(this.p0, this.p1, seg.p1);
    if (orient0 >= 0 && orient1 >= 0) { return Math.max(orient0, orient1) }
    if (orient0 <= 0 && orient1 <= 0) { return Math.max(orient0, orient1) }
    return 0
  } else if (arguments[0] instanceof Coordinate) {
    var p = arguments[0];
    return CGAlgorithms.orientationIndex(this.p0, this.p1, p)
  }
};
LineSegment.prototype.toGeometry = function toGeometry (geomFactory) {
  return geomFactory.createLineString([this.p0, this.p1])
};
LineSegment.prototype.isVertical = function isVertical () {
  return this.p0.x === this.p1.x
};
LineSegment.prototype.equals = function equals (o) {
  if (!(o instanceof LineSegment)) {
    return false
  }
  var other = o;
  return this.p0.equals(other.p0) && this.p1.equals(other.p1)
};
LineSegment.prototype.intersection = function intersection (line) {
  var li = new RobustLineIntersector();
  li.computeIntersection(this.p0, this.p1, line.p0, line.p1);
  if (li.hasIntersection()) { return li.getIntersection(0) }
  return null
};
LineSegment.prototype.project = function project () {
  if (arguments[0] instanceof Coordinate) {
    var p = arguments[0];
    if (p.equals(this.p0) || p.equals(this.p1)) { return new Coordinate(p) }
    var r = this.projectionFactor(p);
    var coord = new Coordinate();
    coord.x = this.p0.x + r * (this.p1.x - this.p0.x);
    coord.y = this.p0.y + r * (this.p1.y - this.p0.y);
    return coord
  } else if (arguments[0] instanceof LineSegment) {
    var seg = arguments[0];
    var pf0 = this.projectionFactor(seg.p0);
    var pf1 = this.projectionFactor(seg.p1);
    if (pf0 >= 1.0 && pf1 >= 1.0) { return null }
    if (pf0 <= 0.0 && pf1 <= 0.0) { return null }
    var newp0 = this.project(seg.p0);
    if (pf0 < 0.0) { newp0 = this.p0; }
    if (pf0 > 1.0) { newp0 = this.p1; }
    var newp1 = this.project(seg.p1);
    if (pf1 < 0.0) { newp1 = this.p0; }
    if (pf1 > 1.0) { newp1 = this.p1; }
    return new LineSegment(newp0, newp1)
  }
};
LineSegment.prototype.normalize = function normalize () {
  if (this.p1.compareTo(this.p0) < 0) { this.reverse(); }
};
LineSegment.prototype.angle = function angle () {
  return Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x)
};
LineSegment.prototype.getCoordinate = function getCoordinate (i) {
  if (i === 0) { return this.p0 }
  return this.p1
};
LineSegment.prototype.distancePerpendicular = function distancePerpendicular (p) {
  return CGAlgorithms.distancePointLinePerpendicular(p, this.p0, this.p1)
};
LineSegment.prototype.minY = function minY () {
  return Math.min(this.p0.y, this.p1.y)
};
LineSegment.prototype.midPoint = function midPoint () {
  return LineSegment.midPoint(this.p0, this.p1)
};
LineSegment.prototype.projectionFactor = function projectionFactor (p) {
  if (p.equals(this.p0)) { return 0.0 }
  if (p.equals(this.p1)) { return 1.0 }
  var dx = this.p1.x - this.p0.x;
  var dy = this.p1.y - this.p0.y;
  var len = dx * dx + dy * dy;
  if (len <= 0.0) { return Double.NaN }
  var r = ((p.x - this.p0.x) * dx + (p.y - this.p0.y) * dy) / len;
  return r
};
LineSegment.prototype.closestPoints = function closestPoints (line) {
  var intPt = this.intersection(line);
  if (intPt !== null) {
    return [intPt, intPt]
  }
  var closestPt = new Array(2).fill(null);
  var minDistance = Double.MAX_VALUE;
  var dist = null;
  var close00 = this.closestPoint(line.p0);
  minDistance = close00.distance(line.p0);
  closestPt[0] = close00;
  closestPt[1] = line.p0;
  var close01 = this.closestPoint(line.p1);
  dist = close01.distance(line.p1);
  if (dist < minDistance) {
    minDistance = dist;
    closestPt[0] = close01;
    closestPt[1] = line.p1;
  }
  var close10 = line.closestPoint(this.p0);
  dist = close10.distance(this.p0);
  if (dist < minDistance) {
    minDistance = dist;
    closestPt[0] = this.p0;
    closestPt[1] = close10;
  }
  var close11 = line.closestPoint(this.p1);
  dist = close11.distance(this.p1);
  if (dist < minDistance) {
    minDistance = dist;
    closestPt[0] = this.p1;
    closestPt[1] = close11;
  }
  return closestPt
};
LineSegment.prototype.closestPoint = function closestPoint (p) {
  var factor = this.projectionFactor(p);
  if (factor > 0 && factor < 1) {
    return this.project(p)
  }
  var dist0 = this.p0.distance(p);
  var dist1 = this.p1.distance(p);
  if (dist0 < dist1) { return this.p0 }
  return this.p1
};
LineSegment.prototype.maxX = function maxX () {
  return Math.max(this.p0.x, this.p1.x)
};
LineSegment.prototype.getLength = function getLength () {
  return this.p0.distance(this.p1)
};
LineSegment.prototype.compareTo = function compareTo (o) {
  var other = o;
  var comp0 = this.p0.compareTo(other.p0);
  if (comp0 !== 0) { return comp0 }
  return this.p1.compareTo(other.p1)
};
LineSegment.prototype.reverse = function reverse () {
  var temp = this.p0;
  this.p0 = this.p1;
  this.p1 = temp;
};
LineSegment.prototype.equalsTopo = function equalsTopo (other) {
  return this.p0.equals(other.p0) &&
        (this.p1.equals(other.p1) || this.p0.equals(other.p1)) &&
         this.p1.equals(other.p0)
};
LineSegment.prototype.lineIntersection = function lineIntersection (line) {
  try {
    var intPt = HCoordinate.intersection(this.p0, this.p1, line.p0, line.p1);
    return intPt
  } catch (ex) {
    if (ex instanceof NotRepresentableException) {} else { throw ex }
  } finally {}
  return null
};
LineSegment.prototype.maxY = function maxY () {
  return Math.max(this.p0.y, this.p1.y)
};
LineSegment.prototype.pointAlongOffset = function pointAlongOffset (segmentLengthFraction, offsetDistance) {
  var segx = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
  var segy = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
  var dx = this.p1.x - this.p0.x;
  var dy = this.p1.y - this.p0.y;
  var len = Math.sqrt(dx * dx + dy * dy);
  var ux = 0.0;
  var uy = 0.0;
  if (offsetDistance !== 0.0) {
    if (len <= 0.0) { throw new Error('Cannot compute offset from zero-length line segment') }
    ux = offsetDistance * dx / len;
    uy = offsetDistance * dy / len;
  }
  var offsetx = segx - uy;
  var offsety = segy + ux;
  var coord = new Coordinate(offsetx, offsety);
  return coord
};
LineSegment.prototype.setCoordinates = function setCoordinates () {
  if (arguments.length === 1) {
    var ls = arguments[0];
    this.setCoordinates(ls.p0, ls.p1);
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    this.p0.x = p0.x;
    this.p0.y = p0.y;
    this.p1.x = p1.x;
    this.p1.y = p1.y;
  }
};
LineSegment.prototype.segmentFraction = function segmentFraction (inputPt) {
  var segFrac = this.projectionFactor(inputPt);
  if (segFrac < 0.0) { segFrac = 0.0; } else if (segFrac > 1.0 || Double.isNaN(segFrac)) { segFrac = 1.0; }
  return segFrac
};
LineSegment.prototype.toString = function toString () {
  return 'LINESTRING( ' + this.p0.x + ' ' + this.p0.y + ', ' + this.p1.x + ' ' + this.p1.y + ')'
};
LineSegment.prototype.isHorizontal = function isHorizontal () {
  return this.p0.y === this.p1.y
};
LineSegment.prototype.distance = function distance () {
  if (arguments[0] instanceof LineSegment) {
    var ls = arguments[0];
    return CGAlgorithms.distanceLineLine(this.p0, this.p1, ls.p0, ls.p1)
  } else if (arguments[0] instanceof Coordinate) {
    var p = arguments[0];
    return CGAlgorithms.distancePointLine(p, this.p0, this.p1)
  }
};
LineSegment.prototype.pointAlong = function pointAlong (segmentLengthFraction) {
  var coord = new Coordinate();
  coord.x = this.p0.x + segmentLengthFraction * (this.p1.x - this.p0.x);
  coord.y = this.p0.y + segmentLengthFraction * (this.p1.y - this.p0.y);
  return coord
};
LineSegment.prototype.hashCode = function hashCode () {
  var bits0 = Double.doubleToLongBits(this.p0.x);
  bits0 ^= Double.doubleToLongBits(this.p0.y) * 31;
  var hash0 = Math.trunc(bits0) ^ Math.trunc(bits0 >> 32);
  var bits1 = Double.doubleToLongBits(this.p1.x);
  bits1 ^= Double.doubleToLongBits(this.p1.y) * 31;
  var hash1 = Math.trunc(bits1) ^ Math.trunc(bits1 >> 32);
  return hash0 ^ hash1
};
LineSegment.prototype.interfaces_ = function interfaces_ () {
  return [Comparable, Serializable]
};
LineSegment.prototype.getClass = function getClass () {
  return LineSegment
};
LineSegment.midPoint = function midPoint (p0, p1) {
  return new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2)
};
staticAccessors$24.serialVersionUID.get = function () { return 3252005833466256227 };

Object.defineProperties( LineSegment, staticAccessors$24 );

var MonotoneChainOverlapAction = function MonotoneChainOverlapAction () {
  this.tempEnv1 = new Envelope();
  this.tempEnv2 = new Envelope();
  this._overlapSeg1 = new LineSegment();
  this._overlapSeg2 = new LineSegment();
};
MonotoneChainOverlapAction.prototype.overlap = function overlap () {
  if (arguments.length === 2) {
    // const seg1 = arguments[0]
    // const seg2 = arguments[1]
  } else if (arguments.length === 4) {
    var mc1 = arguments[0];
    var start1 = arguments[1];
    var mc2 = arguments[2];
    var start2 = arguments[3];
    mc1.getLineSegment(start1, this._overlapSeg1);
    mc2.getLineSegment(start2, this._overlapSeg2);
    this.overlap(this._overlapSeg1, this._overlapSeg2);
  }
};
MonotoneChainOverlapAction.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChainOverlapAction.prototype.getClass = function getClass () {
  return MonotoneChainOverlapAction
};

var MonotoneChain = function MonotoneChain () {
  this._pts = null;
  this._start = null;
  this._end = null;
  this._env = null;
  this._context = null;
  this._id = null;
  var pts = arguments[0];
  var start = arguments[1];
  var end = arguments[2];
  var context = arguments[3];
  this._pts = pts;
  this._start = start;
  this._end = end;
  this._context = context;
};
MonotoneChain.prototype.getLineSegment = function getLineSegment (index, ls) {
  ls.p0 = this._pts[index];
  ls.p1 = this._pts[index + 1];
};
MonotoneChain.prototype.computeSelect = function computeSelect (searchEnv, start0, end0, mcs) {
  var p0 = this._pts[start0];
  var p1 = this._pts[end0];
  mcs.tempEnv1.init(p0, p1);
  if (end0 - start0 === 1) {
    mcs.select(this, start0);
    return null
  }
  if (!searchEnv.intersects(mcs.tempEnv1)) { return null }
  var mid = Math.trunc((start0 + end0) / 2);
  if (start0 < mid) {
    this.computeSelect(searchEnv, start0, mid, mcs);
  }
  if (mid < end0) {
    this.computeSelect(searchEnv, mid, end0, mcs);
  }
};
MonotoneChain.prototype.getCoordinates = function getCoordinates () {
    var this$1 = this;

  var coord = new Array(this._end - this._start + 1).fill(null);
  var index = 0;
  for (var i = this._start; i <= this._end; i++) {
    coord[index++] = this$1._pts[i];
  }
  return coord
};
MonotoneChain.prototype.computeOverlaps = function computeOverlaps (mc, mco) {
  this.computeOverlapsInternal(this._start, this._end, mc, mc._start, mc._end, mco);
};
MonotoneChain.prototype.setId = function setId (id) {
  this._id = id;
};
MonotoneChain.prototype.select = function select (searchEnv, mcs) {
  this.computeSelect(searchEnv, this._start, this._end, mcs);
};
MonotoneChain.prototype.getEnvelope = function getEnvelope () {
  if (this._env === null) {
    var p0 = this._pts[this._start];
    var p1 = this._pts[this._end];
    this._env = new Envelope(p0, p1);
  }
  return this._env
};
MonotoneChain.prototype.getEndIndex = function getEndIndex () {
  return this._end
};
MonotoneChain.prototype.getStartIndex = function getStartIndex () {
  return this._start
};
MonotoneChain.prototype.getContext = function getContext () {
  return this._context
};
MonotoneChain.prototype.getId = function getId () {
  return this._id
};
MonotoneChain.prototype.computeOverlapsInternal = function computeOverlapsInternal (start0, end0, mc, start1, end1, mco) {
  var p00 = this._pts[start0];
  var p01 = this._pts[end0];
  var p10 = mc._pts[start1];
  var p11 = mc._pts[end1];
  if (end0 - start0 === 1 && end1 - start1 === 1) {
    mco.overlap(this, start0, mc, start1);
    return null
  }
  mco.tempEnv1.init(p00, p01);
  mco.tempEnv2.init(p10, p11);
  if (!mco.tempEnv1.intersects(mco.tempEnv2)) { return null }
  var mid0 = Math.trunc((start0 + end0) / 2);
  var mid1 = Math.trunc((start1 + end1) / 2);
  if (start0 < mid0) {
    if (start1 < mid1) { this.computeOverlapsInternal(start0, mid0, mc, start1, mid1, mco); }
    if (mid1 < end1) { this.computeOverlapsInternal(start0, mid0, mc, mid1, end1, mco); }
  }
  if (mid0 < end0) {
    if (start1 < mid1) { this.computeOverlapsInternal(mid0, end0, mc, start1, mid1, mco); }
    if (mid1 < end1) { this.computeOverlapsInternal(mid0, end0, mc, mid1, end1, mco); }
  }
};
MonotoneChain.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChain.prototype.getClass = function getClass () {
  return MonotoneChain
};

var MonotoneChainBuilder = function MonotoneChainBuilder () {};

MonotoneChainBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChainBuilder.prototype.getClass = function getClass () {
  return MonotoneChainBuilder
};
MonotoneChainBuilder.getChainStartIndices = function getChainStartIndices (pts) {
  var start = 0;
  var startIndexList = new ArrayList();
  startIndexList.add(new Integer(start));
  do {
    var last = MonotoneChainBuilder.findChainEnd(pts, start);
    startIndexList.add(new Integer(last));
    start = last;
  } while (start < pts.length - 1)
  var startIndex = MonotoneChainBuilder.toIntArray(startIndexList);
  return startIndex
};
MonotoneChainBuilder.findChainEnd = function findChainEnd (pts, start) {
  var safeStart = start;
  while (safeStart < pts.length - 1 && pts[safeStart].equals2D(pts[safeStart + 1])) {
    safeStart++;
  }
  if (safeStart >= pts.length - 1) {
    return pts.length - 1
  }
  var chainQuad = Quadrant.quadrant(pts[safeStart], pts[safeStart + 1]);
  var last = start + 1;
  while (last < pts.length) {
    if (!pts[last - 1].equals2D(pts[last])) {
      var quad = Quadrant.quadrant(pts[last - 1], pts[last]);
      if (quad !== chainQuad) { break }
    }
    last++;
  }
  return last - 1
};
MonotoneChainBuilder.getChains = function getChains () {
  if (arguments.length === 1) {
    var pts = arguments[0];
    return MonotoneChainBuilder.getChains(pts, null)
  } else if (arguments.length === 2) {
    var pts$1 = arguments[0];
    var context = arguments[1];
    var mcList = new ArrayList();
    var startIndex = MonotoneChainBuilder.getChainStartIndices(pts$1);
    for (var i = 0; i < startIndex.length - 1; i++) {
      var mc = new MonotoneChain(pts$1, startIndex[i], startIndex[i + 1], context);
      mcList.add(mc);
    }
    return mcList
  }
};
MonotoneChainBuilder.toIntArray = function toIntArray (list) {
  var array = new Array(list.size()).fill(null);
  for (var i = 0; i < array.length; i++) {
    array[i] = list.get(i).intValue();
  }
  return array
};

var Noder = function Noder () {};

Noder.prototype.computeNodes = function computeNodes (segStrings) {};
Noder.prototype.getNodedSubstrings = function getNodedSubstrings () {};
Noder.prototype.interfaces_ = function interfaces_ () {
  return []
};
Noder.prototype.getClass = function getClass () {
  return Noder
};

var SinglePassNoder = function SinglePassNoder () {
  this._segInt = null;
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var segInt = arguments[0];
    this.setSegmentIntersector(segInt);
  }
};
SinglePassNoder.prototype.setSegmentIntersector = function setSegmentIntersector (segInt) {
  this._segInt = segInt;
};
SinglePassNoder.prototype.interfaces_ = function interfaces_ () {
  return [Noder]
};
SinglePassNoder.prototype.getClass = function getClass () {
  return SinglePassNoder
};

var MCIndexNoder = (function (SinglePassNoder$$1) {
  function MCIndexNoder (si) {
    if (si) { SinglePassNoder$$1.call(this, si); }
    else { SinglePassNoder$$1.call(this); }
    this._monoChains = new ArrayList();
    this._index = new STRtree();
    this._idCounter = 0;
    this._nodedSegStrings = null;
    this._nOverlaps = 0;
  }

  if ( SinglePassNoder$$1 ) MCIndexNoder.__proto__ = SinglePassNoder$$1;
  MCIndexNoder.prototype = Object.create( SinglePassNoder$$1 && SinglePassNoder$$1.prototype );
  MCIndexNoder.prototype.constructor = MCIndexNoder;

  var staticAccessors = { SegmentOverlapAction: { configurable: true } };
  MCIndexNoder.prototype.getMonotoneChains = function getMonotoneChains () {
    return this._monoChains
  };
  MCIndexNoder.prototype.getNodedSubstrings = function getNodedSubstrings () {
    return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)
  };
  MCIndexNoder.prototype.getIndex = function getIndex () {
    return this._index
  };
  MCIndexNoder.prototype.add = function add (segStr) {
    var this$1 = this;

    var segChains = MonotoneChainBuilder.getChains(segStr.getCoordinates(), segStr);
    for (var i = segChains.iterator(); i.hasNext();) {
      var mc = i.next();
      mc.setId(this$1._idCounter++);
      this$1._index.insert(mc.getEnvelope(), mc);
      this$1._monoChains.add(mc);
    }
  };
  MCIndexNoder.prototype.computeNodes = function computeNodes (inputSegStrings) {
    var this$1 = this;

    this._nodedSegStrings = inputSegStrings;
    for (var i = inputSegStrings.iterator(); i.hasNext();) {
      this$1.add(i.next());
    }
    this.intersectChains();
  };
  MCIndexNoder.prototype.intersectChains = function intersectChains () {
    var this$1 = this;

    var overlapAction = new SegmentOverlapAction(this._segInt);
    for (var i = this._monoChains.iterator(); i.hasNext();) {
      var queryChain = i.next();
      var overlapChains = this$1._index.query(queryChain.getEnvelope());
      for (var j = overlapChains.iterator(); j.hasNext();) {
        var testChain = j.next();
        if (testChain.getId() > queryChain.getId()) {
          queryChain.computeOverlaps(testChain, overlapAction);
          this$1._nOverlaps++;
        }
        if (this$1._segInt.isDone()) { return null }
      }
    }
  };
  MCIndexNoder.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  MCIndexNoder.prototype.getClass = function getClass () {
    return MCIndexNoder
  };
  staticAccessors.SegmentOverlapAction.get = function () { return SegmentOverlapAction };

  Object.defineProperties( MCIndexNoder, staticAccessors );

  return MCIndexNoder;
}(SinglePassNoder));

var SegmentOverlapAction = (function (MonotoneChainOverlapAction$$1) {
  function SegmentOverlapAction () {
    MonotoneChainOverlapAction$$1.call(this);
    this._si = null;
    var si = arguments[0];
    this._si = si;
  }

  if ( MonotoneChainOverlapAction$$1 ) SegmentOverlapAction.__proto__ = MonotoneChainOverlapAction$$1;
  SegmentOverlapAction.prototype = Object.create( MonotoneChainOverlapAction$$1 && MonotoneChainOverlapAction$$1.prototype );
  SegmentOverlapAction.prototype.constructor = SegmentOverlapAction;
  SegmentOverlapAction.prototype.overlap = function overlap () {
    if (arguments.length === 4) {
      var mc1 = arguments[0];
      var start1 = arguments[1];
      var mc2 = arguments[2];
      var start2 = arguments[3];
      var ss1 = mc1.getContext();
      var ss2 = mc2.getContext();
      this._si.processIntersections(ss1, start1, ss2, start2);
    } else { return MonotoneChainOverlapAction$$1.prototype.overlap.apply(this, arguments) }
  };
  SegmentOverlapAction.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  SegmentOverlapAction.prototype.getClass = function getClass () {
    return SegmentOverlapAction
  };

  return SegmentOverlapAction;
}(MonotoneChainOverlapAction));

var BufferParameters = function BufferParameters () {
  this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
  this._endCapStyle = BufferParameters.CAP_ROUND;
  this._joinStyle = BufferParameters.JOIN_ROUND;
  this._mitreLimit = BufferParameters.DEFAULT_MITRE_LIMIT;
  this._isSingleSided = false;
  this._simplifyFactor = BufferParameters.DEFAULT_SIMPLIFY_FACTOR;

  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var quadrantSegments = arguments[0];
    this.setQuadrantSegments(quadrantSegments);
  } else if (arguments.length === 2) {
    var quadrantSegments$1 = arguments[0];
    var endCapStyle = arguments[1];
    this.setQuadrantSegments(quadrantSegments$1);
    this.setEndCapStyle(endCapStyle);
  } else if (arguments.length === 4) {
    var quadrantSegments$2 = arguments[0];
    var endCapStyle$1 = arguments[1];
    var joinStyle = arguments[2];
    var mitreLimit = arguments[3];
    this.setQuadrantSegments(quadrantSegments$2);
    this.setEndCapStyle(endCapStyle$1);
    this.setJoinStyle(joinStyle);
    this.setMitreLimit(mitreLimit);
  }
};

var staticAccessors$25 = { CAP_ROUND: { configurable: true },CAP_FLAT: { configurable: true },CAP_SQUARE: { configurable: true },JOIN_ROUND: { configurable: true },JOIN_MITRE: { configurable: true },JOIN_BEVEL: { configurable: true },DEFAULT_QUADRANT_SEGMENTS: { configurable: true },DEFAULT_MITRE_LIMIT: { configurable: true },DEFAULT_SIMPLIFY_FACTOR: { configurable: true } };
BufferParameters.prototype.getEndCapStyle = function getEndCapStyle () {
  return this._endCapStyle
};
BufferParameters.prototype.isSingleSided = function isSingleSided () {
  return this._isSingleSided
};
BufferParameters.prototype.setQuadrantSegments = function setQuadrantSegments (quadSegs) {
  this._quadrantSegments = quadSegs;
  if (this._quadrantSegments === 0) { this._joinStyle = BufferParameters.JOIN_BEVEL; }
  if (this._quadrantSegments < 0) {
    this._joinStyle = BufferParameters.JOIN_MITRE;
    this._mitreLimit = Math.abs(this._quadrantSegments);
  }
  if (quadSegs <= 0) {
    this._quadrantSegments = 1;
  }
  if (this._joinStyle !== BufferParameters.JOIN_ROUND) {
    this._quadrantSegments = BufferParameters.DEFAULT_QUADRANT_SEGMENTS;
  }
};
BufferParameters.prototype.getJoinStyle = function getJoinStyle () {
  return this._joinStyle
};
BufferParameters.prototype.setJoinStyle = function setJoinStyle (joinStyle) {
  this._joinStyle = joinStyle;
};
BufferParameters.prototype.setSimplifyFactor = function setSimplifyFactor (simplifyFactor) {
  this._simplifyFactor = simplifyFactor < 0 ? 0 : simplifyFactor;
};
BufferParameters.prototype.getSimplifyFactor = function getSimplifyFactor () {
  return this._simplifyFactor
};
BufferParameters.prototype.getQuadrantSegments = function getQuadrantSegments () {
  return this._quadrantSegments
};
BufferParameters.prototype.setEndCapStyle = function setEndCapStyle (endCapStyle) {
  this._endCapStyle = endCapStyle;
};
BufferParameters.prototype.getMitreLimit = function getMitreLimit () {
  return this._mitreLimit
};
BufferParameters.prototype.setMitreLimit = function setMitreLimit (mitreLimit) {
  this._mitreLimit = mitreLimit;
};
BufferParameters.prototype.setSingleSided = function setSingleSided (isSingleSided) {
  this._isSingleSided = isSingleSided;
};
BufferParameters.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferParameters.prototype.getClass = function getClass () {
  return BufferParameters
};
BufferParameters.bufferDistanceError = function bufferDistanceError (quadSegs) {
  var alpha = Math.PI / 2.0 / quadSegs;
  return 1 - Math.cos(alpha / 2.0)
};
staticAccessors$25.CAP_ROUND.get = function () { return 1 };
staticAccessors$25.CAP_FLAT.get = function () { return 2 };
staticAccessors$25.CAP_SQUARE.get = function () { return 3 };
staticAccessors$25.JOIN_ROUND.get = function () { return 1 };
staticAccessors$25.JOIN_MITRE.get = function () { return 2 };
staticAccessors$25.JOIN_BEVEL.get = function () { return 3 };
staticAccessors$25.DEFAULT_QUADRANT_SEGMENTS.get = function () { return 8 };
staticAccessors$25.DEFAULT_MITRE_LIMIT.get = function () { return 5.0 };
staticAccessors$25.DEFAULT_SIMPLIFY_FACTOR.get = function () { return 0.01 };

Object.defineProperties( BufferParameters, staticAccessors$25 );

var BufferInputLineSimplifier = function BufferInputLineSimplifier (inputLine) {
  this._distanceTol = null;
  this._isDeleted = null;
  this._angleOrientation = CGAlgorithms.COUNTERCLOCKWISE;
  this._inputLine = inputLine || null;
};

var staticAccessors$26 = { INIT: { configurable: true },DELETE: { configurable: true },KEEP: { configurable: true },NUM_PTS_TO_CHECK: { configurable: true } };
BufferInputLineSimplifier.prototype.isDeletable = function isDeletable (i0, i1, i2, distanceTol) {
  var p0 = this._inputLine[i0];
  var p1 = this._inputLine[i1];
  var p2 = this._inputLine[i2];
  if (!this.isConcave(p0, p1, p2)) { return false }
  if (!this.isShallow(p0, p1, p2, distanceTol)) { return false }
  return this.isShallowSampled(p0, p1, i0, i2, distanceTol)
};
BufferInputLineSimplifier.prototype.deleteShallowConcavities = function deleteShallowConcavities () {
    var this$1 = this;

  var index = 1;
  // const maxIndex = this._inputLine.length - 1
  var midIndex = this.findNextNonDeletedIndex(index);
  var lastIndex = this.findNextNonDeletedIndex(midIndex);
  var isChanged = false;
  while (lastIndex < this._inputLine.length) {
    var isMiddleVertexDeleted = false;
    if (this$1.isDeletable(index, midIndex, lastIndex, this$1._distanceTol)) {
      this$1._isDeleted[midIndex] = BufferInputLineSimplifier.DELETE;
      isMiddleVertexDeleted = true;
      isChanged = true;
    }
    if (isMiddleVertexDeleted) { index = lastIndex; } else { index = midIndex; }
    midIndex = this$1.findNextNonDeletedIndex(index);
    lastIndex = this$1.findNextNonDeletedIndex(midIndex);
  }
  return isChanged
};
BufferInputLineSimplifier.prototype.isShallowConcavity = function isShallowConcavity (p0, p1, p2, distanceTol) {
  var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
  var isAngleToSimplify = orientation === this._angleOrientation;
  if (!isAngleToSimplify) { return false }
  var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
  return dist < distanceTol
};
BufferInputLineSimplifier.prototype.isShallowSampled = function isShallowSampled (p0, p2, i0, i2, distanceTol) {
    var this$1 = this;

  var inc = Math.trunc((i2 - i0) / BufferInputLineSimplifier.NUM_PTS_TO_CHECK);
  if (inc <= 0) { inc = 1; }
  for (var i = i0; i < i2; i += inc) {
    if (!this$1.isShallow(p0, p2, this$1._inputLine[i], distanceTol)) { return false }
  }
  return true
};
BufferInputLineSimplifier.prototype.isConcave = function isConcave (p0, p1, p2) {
  var orientation = CGAlgorithms.computeOrientation(p0, p1, p2);
  var isConcave = orientation === this._angleOrientation;
  return isConcave
};
BufferInputLineSimplifier.prototype.simplify = function simplify (distanceTol) {
    var this$1 = this;

  this._distanceTol = Math.abs(distanceTol);
  if (distanceTol < 0) { this._angleOrientation = CGAlgorithms.CLOCKWISE; }
  this._isDeleted = new Array(this._inputLine.length).fill(null);
  var isChanged = false;
  do {
    isChanged = this$1.deleteShallowConcavities();
  } while (isChanged)
  return this.collapseLine()
};
BufferInputLineSimplifier.prototype.findNextNonDeletedIndex = function findNextNonDeletedIndex (index) {
  var next = index + 1;
  while (next < this._inputLine.length && this._isDeleted[next] === BufferInputLineSimplifier.DELETE) { next++; }
  return next
};
BufferInputLineSimplifier.prototype.isShallow = function isShallow (p0, p1, p2, distanceTol) {
  var dist = CGAlgorithms.distancePointLine(p1, p0, p2);
  return dist < distanceTol
};
BufferInputLineSimplifier.prototype.collapseLine = function collapseLine () {
    var this$1 = this;

  var coordList = new CoordinateList();
  for (var i = 0; i < this._inputLine.length; i++) {
    if (this$1._isDeleted[i] !== BufferInputLineSimplifier.DELETE) { coordList.add(this$1._inputLine[i]); }
  }
  return coordList.toCoordinateArray()
};
BufferInputLineSimplifier.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferInputLineSimplifier.prototype.getClass = function getClass () {
  return BufferInputLineSimplifier
};
BufferInputLineSimplifier.simplify = function simplify (inputLine, distanceTol) {
  var simp = new BufferInputLineSimplifier(inputLine);
  return simp.simplify(distanceTol)
};
staticAccessors$26.INIT.get = function () { return 0 };
staticAccessors$26.DELETE.get = function () { return 1 };
staticAccessors$26.KEEP.get = function () { return 1 };
staticAccessors$26.NUM_PTS_TO_CHECK.get = function () { return 10 };

Object.defineProperties( BufferInputLineSimplifier, staticAccessors$26 );

var OffsetSegmentString = function OffsetSegmentString () {
  this._ptList = null;
  this._precisionModel = null;
  this._minimimVertexDistance = 0.0;
  this._ptList = new ArrayList();
};

var staticAccessors$28 = { COORDINATE_ARRAY_TYPE: { configurable: true } };
OffsetSegmentString.prototype.getCoordinates = function getCoordinates () {
  var coord = this._ptList.toArray(OffsetSegmentString.COORDINATE_ARRAY_TYPE);
  return coord
};
OffsetSegmentString.prototype.setPrecisionModel = function setPrecisionModel (precisionModel) {
  this._precisionModel = precisionModel;
};
OffsetSegmentString.prototype.addPt = function addPt (pt) {
  var bufPt = new Coordinate(pt);
  this._precisionModel.makePrecise(bufPt);
  if (this.isRedundant(bufPt)) { return null }
  this._ptList.add(bufPt);
};
OffsetSegmentString.prototype.revere = function revere () {};
OffsetSegmentString.prototype.addPts = function addPts (pt, isForward) {
    var this$1 = this;

  if (isForward) {
    for (var i = 0; i < pt.length; i++) {
      this$1.addPt(pt[i]);
    }
  } else {
    for (var i$1 = pt.length - 1; i$1 >= 0; i$1--) {
      this$1.addPt(pt[i$1]);
    }
  }
};
OffsetSegmentString.prototype.isRedundant = function isRedundant (pt) {
  if (this._ptList.size() < 1) { return false }
  var lastPt = this._ptList.get(this._ptList.size() - 1);
  var ptDist = pt.distance(lastPt);
  if (ptDist < this._minimimVertexDistance) { return true }
  return false
};
OffsetSegmentString.prototype.toString = function toString () {
  var fact = new GeometryFactory();
  var line = fact.createLineString(this.getCoordinates());
  return line.toString()
};
OffsetSegmentString.prototype.closeRing = function closeRing () {
  if (this._ptList.size() < 1) { return null }
  var startPt = new Coordinate(this._ptList.get(0));
  var lastPt = this._ptList.get(this._ptList.size() - 1);
  // const last2Pt = null
  // if (this._ptList.size() >= 2) last2Pt = this._ptList.get(this._ptList.size() - 2)
  if (startPt.equals(lastPt)) { return null }
  this._ptList.add(startPt);
};
OffsetSegmentString.prototype.setMinimumVertexDistance = function setMinimumVertexDistance (minimimVertexDistance) {
  this._minimimVertexDistance = minimimVertexDistance;
};
OffsetSegmentString.prototype.interfaces_ = function interfaces_ () {
  return []
};
OffsetSegmentString.prototype.getClass = function getClass () {
  return OffsetSegmentString
};
staticAccessors$28.COORDINATE_ARRAY_TYPE.get = function () { return new Array(0).fill(null) };

Object.defineProperties( OffsetSegmentString, staticAccessors$28 );

var Angle = function Angle () {};

var staticAccessors$29 = { PI_TIMES_2: { configurable: true },PI_OVER_2: { configurable: true },PI_OVER_4: { configurable: true },COUNTERCLOCKWISE: { configurable: true },CLOCKWISE: { configurable: true },NONE: { configurable: true } };

Angle.prototype.interfaces_ = function interfaces_ () {
  return []
};
Angle.prototype.getClass = function getClass () {
  return Angle
};
Angle.toDegrees = function toDegrees (radians) {
  return radians * 180 / Math.PI
};
Angle.normalize = function normalize (angle) {
  while (angle > Math.PI) { angle -= Angle.PI_TIMES_2; }
  while (angle <= -Math.PI) { angle += Angle.PI_TIMES_2; }
  return angle
};
Angle.angle = function angle () {
  if (arguments.length === 1) {
    var p = arguments[0];
    return Math.atan2(p.y, p.x)
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    var dx = p1.x - p0.x;
    var dy = p1.y - p0.y;
    return Math.atan2(dy, dx)
  }
};
Angle.isAcute = function isAcute (p0, p1, p2) {
  var dx0 = p0.x - p1.x;
  var dy0 = p0.y - p1.y;
  var dx1 = p2.x - p1.x;
  var dy1 = p2.y - p1.y;
  var dotprod = dx0 * dx1 + dy0 * dy1;
  return dotprod > 0
};
Angle.isObtuse = function isObtuse (p0, p1, p2) {
  var dx0 = p0.x - p1.x;
  var dy0 = p0.y - p1.y;
  var dx1 = p2.x - p1.x;
  var dy1 = p2.y - p1.y;
  var dotprod = dx0 * dx1 + dy0 * dy1;
  return dotprod < 0
};
Angle.interiorAngle = function interiorAngle (p0, p1, p2) {
  var anglePrev = Angle.angle(p1, p0);
  var angleNext = Angle.angle(p1, p2);
  return Math.abs(angleNext - anglePrev)
};
Angle.normalizePositive = function normalizePositive (angle) {
  if (angle < 0.0) {
    while (angle < 0.0) { angle += Angle.PI_TIMES_2; }
    if (angle >= Angle.PI_TIMES_2) { angle = 0.0; }
  } else {
    while (angle >= Angle.PI_TIMES_2) { angle -= Angle.PI_TIMES_2; }
    if (angle < 0.0) { angle = 0.0; }
  }
  return angle
};
Angle.angleBetween = function angleBetween (tip1, tail, tip2) {
  var a1 = Angle.angle(tail, tip1);
  var a2 = Angle.angle(tail, tip2);
  return Angle.diff(a1, a2)
};
Angle.diff = function diff (ang1, ang2) {
  var delAngle = null;
  if (ang1 < ang2) {
    delAngle = ang2 - ang1;
  } else {
    delAngle = ang1 - ang2;
  }
  if (delAngle > Math.PI) {
    delAngle = 2 * Math.PI - delAngle;
  }
  return delAngle
};
Angle.toRadians = function toRadians (angleDegrees) {
  return angleDegrees * Math.PI / 180.0
};
Angle.getTurn = function getTurn (ang1, ang2) {
  var crossproduct = Math.sin(ang2 - ang1);
  if (crossproduct > 0) {
    return Angle.COUNTERCLOCKWISE
  }
  if (crossproduct < 0) {
    return Angle.CLOCKWISE
  }
  return Angle.NONE
};
Angle.angleBetweenOriented = function angleBetweenOriented (tip1, tail, tip2) {
  var a1 = Angle.angle(tail, tip1);
  var a2 = Angle.angle(tail, tip2);
  var angDel = a2 - a1;
  if (angDel <= -Math.PI) { return angDel + Angle.PI_TIMES_2 }
  if (angDel > Math.PI) { return angDel - Angle.PI_TIMES_2 }
  return angDel
};
staticAccessors$29.PI_TIMES_2.get = function () { return 2.0 * Math.PI };
staticAccessors$29.PI_OVER_2.get = function () { return Math.PI / 2.0 };
staticAccessors$29.PI_OVER_4.get = function () { return Math.PI / 4.0 };
staticAccessors$29.COUNTERCLOCKWISE.get = function () { return CGAlgorithms.COUNTERCLOCKWISE };
staticAccessors$29.CLOCKWISE.get = function () { return CGAlgorithms.CLOCKWISE };
staticAccessors$29.NONE.get = function () { return CGAlgorithms.COLLINEAR };

Object.defineProperties( Angle, staticAccessors$29 );

var OffsetSegmentGenerator = function OffsetSegmentGenerator () {
  this._maxCurveSegmentError = 0.0;
  this._filletAngleQuantum = null;
  this._closingSegLengthFactor = 1;
  this._segList = null;
  this._distance = 0.0;
  this._precisionModel = null;
  this._bufParams = null;
  this._li = null;
  this._s0 = null;
  this._s1 = null;
  this._s2 = null;
  this._seg0 = new LineSegment();
  this._seg1 = new LineSegment();
  this._offset0 = new LineSegment();
  this._offset1 = new LineSegment();
  this._side = 0;
  this._hasNarrowConcaveAngle = false;
  var precisionModel = arguments[0];
  var bufParams = arguments[1];
  var distance = arguments[2];
  this._precisionModel = precisionModel;
  this._bufParams = bufParams;
  this._li = new RobustLineIntersector();
  this._filletAngleQuantum = Math.PI / 2.0 / bufParams.getQuadrantSegments();
  if (bufParams.getQuadrantSegments() >= 8 && bufParams.getJoinStyle() === BufferParameters.JOIN_ROUND) { this._closingSegLengthFactor = OffsetSegmentGenerator.MAX_CLOSING_SEG_LEN_FACTOR; }
  this.init(distance);
};

var staticAccessors$27 = { OFFSET_SEGMENT_SEPARATION_FACTOR: { configurable: true },INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR: { configurable: true },CURVE_VERTEX_SNAP_DISTANCE_FACTOR: { configurable: true },MAX_CLOSING_SEG_LEN_FACTOR: { configurable: true } };
OffsetSegmentGenerator.prototype.addNextSegment = function addNextSegment (p, addStartPoint) {
  this._s0 = this._s1;
  this._s1 = this._s2;
  this._s2 = p;
  this._seg0.setCoordinates(this._s0, this._s1);
  this.computeOffsetSegment(this._seg0, this._side, this._distance, this._offset0);
  this._seg1.setCoordinates(this._s1, this._s2);
  this.computeOffsetSegment(this._seg1, this._side, this._distance, this._offset1);
  if (this._s1.equals(this._s2)) { return null }
  var orientation = CGAlgorithms.computeOrientation(this._s0, this._s1, this._s2);
  var outsideTurn = (orientation === CGAlgorithms.CLOCKWISE && this._side === Position.LEFT) || (orientation === CGAlgorithms.COUNTERCLOCKWISE && this._side === Position.RIGHT);
  if (orientation === 0) {
    this.addCollinear(addStartPoint);
  } else if (outsideTurn) {
    this.addOutsideTurn(orientation, addStartPoint);
  } else {
    this.addInsideTurn(orientation, addStartPoint);
  }
};
OffsetSegmentGenerator.prototype.addLineEndCap = function addLineEndCap (p0, p1) {
  var seg = new LineSegment(p0, p1);
  var offsetL = new LineSegment();
  this.computeOffsetSegment(seg, Position.LEFT, this._distance, offsetL);
  var offsetR = new LineSegment();
  this.computeOffsetSegment(seg, Position.RIGHT, this._distance, offsetR);
  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  var angle = Math.atan2(dy, dx);
  switch (this._bufParams.getEndCapStyle()) {
    case BufferParameters.CAP_ROUND:
      this._segList.addPt(offsetL.p1);
      this.addFilletArc(p1, angle + Math.PI / 2, angle - Math.PI / 2, CGAlgorithms.CLOCKWISE, this._distance);
      this._segList.addPt(offsetR.p1);
      break
    case BufferParameters.CAP_FLAT:
      this._segList.addPt(offsetL.p1);
      this._segList.addPt(offsetR.p1);
      break
    case BufferParameters.CAP_SQUARE:
      var squareCapSideOffset = new Coordinate();
      squareCapSideOffset.x = Math.abs(this._distance) * Math.cos(angle);
      squareCapSideOffset.y = Math.abs(this._distance) * Math.sin(angle);
      var squareCapLOffset = new Coordinate(offsetL.p1.x + squareCapSideOffset.x, offsetL.p1.y + squareCapSideOffset.y);
      var squareCapROffset = new Coordinate(offsetR.p1.x + squareCapSideOffset.x, offsetR.p1.y + squareCapSideOffset.y);
      this._segList.addPt(squareCapLOffset);
      this._segList.addPt(squareCapROffset);
      break
    default:
  }
};
OffsetSegmentGenerator.prototype.getCoordinates = function getCoordinates () {
  var pts = this._segList.getCoordinates();
  return pts
};
OffsetSegmentGenerator.prototype.addMitreJoin = function addMitreJoin (p, offset0, offset1, distance) {
  var isMitreWithinLimit = true;
  var intPt = null;
  try {
    intPt = HCoordinate.intersection(offset0.p0, offset0.p1, offset1.p0, offset1.p1);
    var mitreRatio = distance <= 0.0 ? 1.0 : intPt.distance(p) / Math.abs(distance);
    if (mitreRatio > this._bufParams.getMitreLimit()) { isMitreWithinLimit = false; }
  } catch (ex) {
    if (ex instanceof NotRepresentableException) {
      intPt = new Coordinate(0, 0);
      isMitreWithinLimit = false;
    } else { throw ex }
  } finally {}
  if (isMitreWithinLimit) {
    this._segList.addPt(intPt);
  } else {
    this.addLimitedMitreJoin(offset0, offset1, distance, this._bufParams.getMitreLimit());
  }
};
OffsetSegmentGenerator.prototype.addFilletCorner = function addFilletCorner (p, p0, p1, direction, radius) {
  var dx0 = p0.x - p.x;
  var dy0 = p0.y - p.y;
  var startAngle = Math.atan2(dy0, dx0);
  var dx1 = p1.x - p.x;
  var dy1 = p1.y - p.y;
  var endAngle = Math.atan2(dy1, dx1);
  if (direction === CGAlgorithms.CLOCKWISE) {
    if (startAngle <= endAngle) { startAngle += 2.0 * Math.PI; }
  } else {
    if (startAngle >= endAngle) { startAngle -= 2.0 * Math.PI; }
  }
  this._segList.addPt(p0);
  this.addFilletArc(p, startAngle, endAngle, direction, radius);
  this._segList.addPt(p1);
};
OffsetSegmentGenerator.prototype.addOutsideTurn = function addOutsideTurn (orientation, addStartPoint) {
  if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.OFFSET_SEGMENT_SEPARATION_FACTOR) {
    this._segList.addPt(this._offset0.p1);
    return null
  }
  if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
    this.addMitreJoin(this._s1, this._offset0, this._offset1, this._distance);
  } else if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL) {
    this.addBevelJoin(this._offset0, this._offset1);
  } else {
    if (addStartPoint) { this._segList.addPt(this._offset0.p1); }
    this.addFilletCorner(this._s1, this._offset0.p1, this._offset1.p0, orientation, this._distance);
    this._segList.addPt(this._offset1.p0);
  }
};
OffsetSegmentGenerator.prototype.createSquare = function createSquare (p) {
  this._segList.addPt(new Coordinate(p.x + this._distance, p.y + this._distance));
  this._segList.addPt(new Coordinate(p.x + this._distance, p.y - this._distance));
  this._segList.addPt(new Coordinate(p.x - this._distance, p.y - this._distance));
  this._segList.addPt(new Coordinate(p.x - this._distance, p.y + this._distance));
  this._segList.closeRing();
};
OffsetSegmentGenerator.prototype.addSegments = function addSegments (pt, isForward) {
  this._segList.addPts(pt, isForward);
};
OffsetSegmentGenerator.prototype.addFirstSegment = function addFirstSegment () {
  this._segList.addPt(this._offset1.p0);
};
OffsetSegmentGenerator.prototype.addLastSegment = function addLastSegment () {
  this._segList.addPt(this._offset1.p1);
};
OffsetSegmentGenerator.prototype.initSideSegments = function initSideSegments (s1, s2, side) {
  this._s1 = s1;
  this._s2 = s2;
  this._side = side;
  this._seg1.setCoordinates(s1, s2);
  this.computeOffsetSegment(this._seg1, side, this._distance, this._offset1);
};
OffsetSegmentGenerator.prototype.addLimitedMitreJoin = function addLimitedMitreJoin (offset0, offset1, distance, mitreLimit) {
  var basePt = this._seg0.p1;
  var ang0 = Angle.angle(basePt, this._seg0.p0);
  // const ang1 = Angle.angle(basePt, this._seg1.p1)
  var angDiff = Angle.angleBetweenOriented(this._seg0.p0, basePt, this._seg1.p1);
  var angDiffHalf = angDiff / 2;
  var midAng = Angle.normalize(ang0 + angDiffHalf);
  var mitreMidAng = Angle.normalize(midAng + Math.PI);
  var mitreDist = mitreLimit * distance;
  var bevelDelta = mitreDist * Math.abs(Math.sin(angDiffHalf));
  var bevelHalfLen = distance - bevelDelta;
  var bevelMidX = basePt.x + mitreDist * Math.cos(mitreMidAng);
  var bevelMidY = basePt.y + mitreDist * Math.sin(mitreMidAng);
  var bevelMidPt = new Coordinate(bevelMidX, bevelMidY);
  var mitreMidLine = new LineSegment(basePt, bevelMidPt);
  var bevelEndLeft = mitreMidLine.pointAlongOffset(1.0, bevelHalfLen);
  var bevelEndRight = mitreMidLine.pointAlongOffset(1.0, -bevelHalfLen);
  if (this._side === Position.LEFT) {
    this._segList.addPt(bevelEndLeft);
    this._segList.addPt(bevelEndRight);
  } else {
    this._segList.addPt(bevelEndRight);
    this._segList.addPt(bevelEndLeft);
  }
};
OffsetSegmentGenerator.prototype.computeOffsetSegment = function computeOffsetSegment (seg, side, distance, offset) {
  var sideSign = side === Position.LEFT ? 1 : -1;
  var dx = seg.p1.x - seg.p0.x;
  var dy = seg.p1.y - seg.p0.y;
  var len = Math.sqrt(dx * dx + dy * dy);
  var ux = sideSign * distance * dx / len;
  var uy = sideSign * distance * dy / len;
  offset.p0.x = seg.p0.x - uy;
  offset.p0.y = seg.p0.y + ux;
  offset.p1.x = seg.p1.x - uy;
  offset.p1.y = seg.p1.y + ux;
};
OffsetSegmentGenerator.prototype.addFilletArc = function addFilletArc (p, startAngle, endAngle, direction, radius) {
    var this$1 = this;

  var directionFactor = direction === CGAlgorithms.CLOCKWISE ? -1 : 1;
  var totalAngle = Math.abs(startAngle - endAngle);
  var nSegs = Math.trunc(totalAngle / this._filletAngleQuantum + 0.5);
  if (nSegs < 1) { return null }
  var initAngle = 0.0;
  var currAngleInc = totalAngle / nSegs;
  var currAngle = initAngle;
  var pt = new Coordinate();
  while (currAngle < totalAngle) {
    var angle = startAngle + directionFactor * currAngle;
    pt.x = p.x + radius * Math.cos(angle);
    pt.y = p.y + radius * Math.sin(angle);
    this$1._segList.addPt(pt);
    currAngle += currAngleInc;
  }
};
OffsetSegmentGenerator.prototype.addInsideTurn = function addInsideTurn (orientation, addStartPoint) {
  this._li.computeIntersection(this._offset0.p0, this._offset0.p1, this._offset1.p0, this._offset1.p1);
  if (this._li.hasIntersection()) {
    this._segList.addPt(this._li.getIntersection(0));
  } else {
    this._hasNarrowConcaveAngle = true;
    if (this._offset0.p1.distance(this._offset1.p0) < this._distance * OffsetSegmentGenerator.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR) {
      this._segList.addPt(this._offset0.p1);
    } else {
      this._segList.addPt(this._offset0.p1);
      if (this._closingSegLengthFactor > 0) {
        var mid0 = new Coordinate((this._closingSegLengthFactor * this._offset0.p1.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset0.p1.y + this._s1.y) / (this._closingSegLengthFactor + 1));
        this._segList.addPt(mid0);
        var mid1 = new Coordinate((this._closingSegLengthFactor * this._offset1.p0.x + this._s1.x) / (this._closingSegLengthFactor + 1), (this._closingSegLengthFactor * this._offset1.p0.y + this._s1.y) / (this._closingSegLengthFactor + 1));
        this._segList.addPt(mid1);
      } else {
        this._segList.addPt(this._s1);
      }
      this._segList.addPt(this._offset1.p0);
    }
  }
};
OffsetSegmentGenerator.prototype.createCircle = function createCircle (p) {
  var pt = new Coordinate(p.x + this._distance, p.y);
  this._segList.addPt(pt);
  this.addFilletArc(p, 0.0, 2.0 * Math.PI, -1, this._distance);
  this._segList.closeRing();
};
OffsetSegmentGenerator.prototype.addBevelJoin = function addBevelJoin (offset0, offset1) {
  this._segList.addPt(offset0.p1);
  this._segList.addPt(offset1.p0);
};
OffsetSegmentGenerator.prototype.init = function init (distance) {
  this._distance = distance;
  this._maxCurveSegmentError = distance * (1 - Math.cos(this._filletAngleQuantum / 2.0));
  this._segList = new OffsetSegmentString();
  this._segList.setPrecisionModel(this._precisionModel);
  this._segList.setMinimumVertexDistance(distance * OffsetSegmentGenerator.CURVE_VERTEX_SNAP_DISTANCE_FACTOR);
};
OffsetSegmentGenerator.prototype.addCollinear = function addCollinear (addStartPoint) {
  this._li.computeIntersection(this._s0, this._s1, this._s1, this._s2);
  var numInt = this._li.getIntersectionNum();
  if (numInt >= 2) {
    if (this._bufParams.getJoinStyle() === BufferParameters.JOIN_BEVEL || this._bufParams.getJoinStyle() === BufferParameters.JOIN_MITRE) {
      if (addStartPoint) { this._segList.addPt(this._offset0.p1); }
      this._segList.addPt(this._offset1.p0);
    } else {
      this.addFilletCorner(this._s1, this._offset0.p1, this._offset1.p0, CGAlgorithms.CLOCKWISE, this._distance);
    }
  }
};
OffsetSegmentGenerator.prototype.closeRing = function closeRing () {
  this._segList.closeRing();
};
OffsetSegmentGenerator.prototype.hasNarrowConcaveAngle = function hasNarrowConcaveAngle () {
  return this._hasNarrowConcaveAngle
};
OffsetSegmentGenerator.prototype.interfaces_ = function interfaces_ () {
  return []
};
OffsetSegmentGenerator.prototype.getClass = function getClass () {
  return OffsetSegmentGenerator
};
staticAccessors$27.OFFSET_SEGMENT_SEPARATION_FACTOR.get = function () { return 1.0E-3 };
staticAccessors$27.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR.get = function () { return 1.0E-3 };
staticAccessors$27.CURVE_VERTEX_SNAP_DISTANCE_FACTOR.get = function () { return 1.0E-6 };
staticAccessors$27.MAX_CLOSING_SEG_LEN_FACTOR.get = function () { return 80 };

Object.defineProperties( OffsetSegmentGenerator, staticAccessors$27 );

var OffsetCurveBuilder = function OffsetCurveBuilder () {
  this._distance = 0.0;
  this._precisionModel = null;
  this._bufParams = null;
  var precisionModel = arguments[0];
  var bufParams = arguments[1];
  this._precisionModel = precisionModel;
  this._bufParams = bufParams;
};
OffsetCurveBuilder.prototype.getOffsetCurve = function getOffsetCurve (inputPts, distance) {
  this._distance = distance;
  if (distance === 0.0) { return null }
  var isRightSide = distance < 0.0;
  var posDistance = Math.abs(distance);
  var segGen = this.getSegGen(posDistance);
  if (inputPts.length <= 1) {
    this.computePointCurve(inputPts[0], segGen);
  } else {
    this.computeOffsetCurve(inputPts, isRightSide, segGen);
  }
  var curvePts = segGen.getCoordinates();
  if (isRightSide) { CoordinateArrays.reverse(curvePts); }
  return curvePts
};
OffsetCurveBuilder.prototype.computeSingleSidedBufferCurve = function computeSingleSidedBufferCurve (inputPts, isRightSide, segGen) {
  var distTol = this.simplifyTolerance(this._distance);
  if (isRightSide) {
    segGen.addSegments(inputPts, true);
    var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
    var n2 = simp2.length - 1;
    segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
    segGen.addFirstSegment();
    for (var i = n2 - 2; i >= 0; i--) {
      segGen.addNextSegment(simp2[i], true);
    }
  } else {
    segGen.addSegments(inputPts, false);
    var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
    var n1 = simp1.length - 1;
    segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
    segGen.addFirstSegment();
    for (var i$1 = 2; i$1 <= n1; i$1++) {
      segGen.addNextSegment(simp1[i$1], true);
    }
  }
  segGen.addLastSegment();
  segGen.closeRing();
};
OffsetCurveBuilder.prototype.computeRingBufferCurve = function computeRingBufferCurve (inputPts, side, segGen) {
  var distTol = this.simplifyTolerance(this._distance);
  if (side === Position.RIGHT) { distTol = -distTol; }
  var simp = BufferInputLineSimplifier.simplify(inputPts, distTol);
  var n = simp.length - 1;
  segGen.initSideSegments(simp[n - 1], simp[0], side);
  for (var i = 1; i <= n; i++) {
    var addStartPoint = i !== 1;
    segGen.addNextSegment(simp[i], addStartPoint);
  }
  segGen.closeRing();
};
OffsetCurveBuilder.prototype.computeLineBufferCurve = function computeLineBufferCurve (inputPts, segGen) {
  var distTol = this.simplifyTolerance(this._distance);
  var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
  var n1 = simp1.length - 1;
  segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
  for (var i = 2; i <= n1; i++) {
    segGen.addNextSegment(simp1[i], true);
  }
  segGen.addLastSegment();
  segGen.addLineEndCap(simp1[n1 - 1], simp1[n1]);
  var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
  var n2 = simp2.length - 1;
  segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
  for (var i$1 = n2 - 2; i$1 >= 0; i$1--) {
    segGen.addNextSegment(simp2[i$1], true);
  }
  segGen.addLastSegment();
  segGen.addLineEndCap(simp2[1], simp2[0]);
  segGen.closeRing();
};
OffsetCurveBuilder.prototype.computePointCurve = function computePointCurve (pt, segGen) {
  switch (this._bufParams.getEndCapStyle()) {
    case BufferParameters.CAP_ROUND:
      segGen.createCircle(pt);
      break
    case BufferParameters.CAP_SQUARE:
      segGen.createSquare(pt);
      break
    default:
  }
};
OffsetCurveBuilder.prototype.getLineCurve = function getLineCurve (inputPts, distance) {
  this._distance = distance;
  if (distance < 0.0 && !this._bufParams.isSingleSided()) { return null }
  if (distance === 0.0) { return null }
  var posDistance = Math.abs(distance);
  var segGen = this.getSegGen(posDistance);
  if (inputPts.length <= 1) {
    this.computePointCurve(inputPts[0], segGen);
  } else {
    if (this._bufParams.isSingleSided()) {
      var isRightSide = distance < 0.0;
      this.computeSingleSidedBufferCurve(inputPts, isRightSide, segGen);
    } else { this.computeLineBufferCurve(inputPts, segGen); }
  }
  var lineCoord = segGen.getCoordinates();
  return lineCoord
};
OffsetCurveBuilder.prototype.getBufferParameters = function getBufferParameters () {
  return this._bufParams
};
OffsetCurveBuilder.prototype.simplifyTolerance = function simplifyTolerance (bufDistance) {
  return bufDistance * this._bufParams.getSimplifyFactor()
};
OffsetCurveBuilder.prototype.getRingCurve = function getRingCurve (inputPts, side, distance) {
  this._distance = distance;
  if (inputPts.length <= 2) { return this.getLineCurve(inputPts, distance) }
  if (distance === 0.0) {
    return OffsetCurveBuilder.copyCoordinates(inputPts)
  }
  var segGen = this.getSegGen(distance);
  this.computeRingBufferCurve(inputPts, side, segGen);
  return segGen.getCoordinates()
};
OffsetCurveBuilder.prototype.computeOffsetCurve = function computeOffsetCurve (inputPts, isRightSide, segGen) {
  var distTol = this.simplifyTolerance(this._distance);
  if (isRightSide) {
    var simp2 = BufferInputLineSimplifier.simplify(inputPts, -distTol);
    var n2 = simp2.length - 1;
    segGen.initSideSegments(simp2[n2], simp2[n2 - 1], Position.LEFT);
    segGen.addFirstSegment();
    for (var i = n2 - 2; i >= 0; i--) {
      segGen.addNextSegment(simp2[i], true);
    }
  } else {
    var simp1 = BufferInputLineSimplifier.simplify(inputPts, distTol);
    var n1 = simp1.length - 1;
    segGen.initSideSegments(simp1[0], simp1[1], Position.LEFT);
    segGen.addFirstSegment();
    for (var i$1 = 2; i$1 <= n1; i$1++) {
      segGen.addNextSegment(simp1[i$1], true);
    }
  }
  segGen.addLastSegment();
};
OffsetCurveBuilder.prototype.getSegGen = function getSegGen (distance) {
  return new OffsetSegmentGenerator(this._precisionModel, this._bufParams, distance)
};
OffsetCurveBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
OffsetCurveBuilder.prototype.getClass = function getClass () {
  return OffsetCurveBuilder
};
OffsetCurveBuilder.copyCoordinates = function copyCoordinates (pts) {
  var copy = new Array(pts.length).fill(null);
  for (var i = 0; i < copy.length; i++) {
    copy[i] = new Coordinate(pts[i]);
  }
  return copy
};

var SubgraphDepthLocater = function SubgraphDepthLocater () {
  this._subgraphs = null;
  this._seg = new LineSegment();
  this._cga = new CGAlgorithms();
  var subgraphs = arguments[0];
  this._subgraphs = subgraphs;
};

var staticAccessors$30 = { DepthSegment: { configurable: true } };
SubgraphDepthLocater.prototype.findStabbedSegments = function findStabbedSegments () {
    var this$1 = this;

  if (arguments.length === 1) {
    var stabbingRayLeftPt = arguments[0];
    var stabbedSegments = new ArrayList();
    for (var i = this._subgraphs.iterator(); i.hasNext();) {
      var bsg = i.next();
      var env = bsg.getEnvelope();
      if (stabbingRayLeftPt.y < env.getMinY() || stabbingRayLeftPt.y > env.getMaxY()) { continue }
      this$1.findStabbedSegments(stabbingRayLeftPt, bsg.getDirectedEdges(), stabbedSegments);
    }
    return stabbedSegments
  } else if (arguments.length === 3) {
    if (hasInterface(arguments[2], List) && (arguments[0] instanceof Coordinate && arguments[1] instanceof DirectedEdge)) {
      var stabbingRayLeftPt$1 = arguments[0];
      var dirEdge = arguments[1];
      var stabbedSegments$1 = arguments[2];
      var pts = dirEdge.getEdge().getCoordinates();
      for (var i$1 = 0; i$1 < pts.length - 1; i$1++) {
        this$1._seg.p0 = pts[i$1];
        this$1._seg.p1 = pts[i$1 + 1];
        if (this$1._seg.p0.y > this$1._seg.p1.y) { this$1._seg.reverse(); }
        var maxx = Math.max(this$1._seg.p0.x, this$1._seg.p1.x);
        if (maxx < stabbingRayLeftPt$1.x) { continue }
        if (this$1._seg.isHorizontal()) { continue }
        if (stabbingRayLeftPt$1.y < this$1._seg.p0.y || stabbingRayLeftPt$1.y > this$1._seg.p1.y) { continue }
        if (CGAlgorithms.computeOrientation(this$1._seg.p0, this$1._seg.p1, stabbingRayLeftPt$1) === CGAlgorithms.RIGHT) { continue }
        var depth = dirEdge.getDepth(Position.LEFT);
        if (!this$1._seg.p0.equals(pts[i$1])) { depth = dirEdge.getDepth(Position.RIGHT); }
        var ds = new DepthSegment(this$1._seg, depth);
        stabbedSegments$1.add(ds);
      }
    } else if (hasInterface(arguments[2], List) && (arguments[0] instanceof Coordinate && hasInterface(arguments[1], List))) {
      var stabbingRayLeftPt$2 = arguments[0];
      var dirEdges = arguments[1];
      var stabbedSegments$2 = arguments[2];
      for (var i$2 = dirEdges.iterator(); i$2.hasNext();) {
        var de = i$2.next();
        if (!de.isForward()) { continue }
        this$1.findStabbedSegments(stabbingRayLeftPt$2, de, stabbedSegments$2);
      }
    }
  }
};
SubgraphDepthLocater.prototype.getDepth = function getDepth (p) {
  var stabbedSegments = this.findStabbedSegments(p);
  if (stabbedSegments.size() === 0) { return 0 }
  var ds = Collections.min(stabbedSegments);
  return ds._leftDepth
};
SubgraphDepthLocater.prototype.interfaces_ = function interfaces_ () {
  return []
};
SubgraphDepthLocater.prototype.getClass = function getClass () {
  return SubgraphDepthLocater
};
staticAccessors$30.DepthSegment.get = function () { return DepthSegment };

Object.defineProperties( SubgraphDepthLocater, staticAccessors$30 );

var DepthSegment = function DepthSegment () {
  this._upwardSeg = null;
  this._leftDepth = null;
  var seg = arguments[0];
  var depth = arguments[1];
  this._upwardSeg = new LineSegment(seg);
  this._leftDepth = depth;
};
DepthSegment.prototype.compareTo = function compareTo (obj) {
  var other = obj;
  if (this._upwardSeg.minX() >= other._upwardSeg.maxX()) { return 1 }
  if (this._upwardSeg.maxX() <= other._upwardSeg.minX()) { return -1 }
  var orientIndex = this._upwardSeg.orientationIndex(other._upwardSeg);
  if (orientIndex !== 0) { return orientIndex }
  orientIndex = -1 * other._upwardSeg.orientationIndex(this._upwardSeg);
  if (orientIndex !== 0) { return orientIndex }
  return this._upwardSeg.compareTo(other._upwardSeg)
};
DepthSegment.prototype.compareX = function compareX (seg0, seg1) {
  var compare0 = seg0.p0.compareTo(seg1.p0);
  if (compare0 !== 0) { return compare0 }
  return seg0.p1.compareTo(seg1.p1)
};
DepthSegment.prototype.toString = function toString () {
  return this._upwardSeg.toString()
};
DepthSegment.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
DepthSegment.prototype.getClass = function getClass () {
  return DepthSegment
};

var Triangle = function Triangle (p0, p1, p2) {
  this.p0 = p0 || null;
  this.p1 = p1 || null;
  this.p2 = p2 || null;
};
Triangle.prototype.area = function area () {
  return Triangle.area(this.p0, this.p1, this.p2)
};
Triangle.prototype.signedArea = function signedArea () {
  return Triangle.signedArea(this.p0, this.p1, this.p2)
};
Triangle.prototype.interpolateZ = function interpolateZ (p) {
  if (p === null) { throw new IllegalArgumentException('Supplied point is null.') }
  return Triangle.interpolateZ(p, this.p0, this.p1, this.p2)
};
Triangle.prototype.longestSideLength = function longestSideLength () {
  return Triangle.longestSideLength(this.p0, this.p1, this.p2)
};
Triangle.prototype.isAcute = function isAcute () {
  return Triangle.isAcute(this.p0, this.p1, this.p2)
};
Triangle.prototype.circumcentre = function circumcentre () {
  return Triangle.circumcentre(this.p0, this.p1, this.p2)
};
Triangle.prototype.area3D = function area3D () {
  return Triangle.area3D(this.p0, this.p1, this.p2)
};
Triangle.prototype.centroid = function centroid () {
  return Triangle.centroid(this.p0, this.p1, this.p2)
};
Triangle.prototype.inCentre = function inCentre () {
  return Triangle.inCentre(this.p0, this.p1, this.p2)
};
Triangle.prototype.interfaces_ = function interfaces_ () {
  return []
};
Triangle.prototype.getClass = function getClass () {
  return Triangle
};
Triangle.area = function area (a, b, c) {
  return Math.abs(((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2)
};
Triangle.signedArea = function signedArea (a, b, c) {
  return ((c.x - a.x) * (b.y - a.y) - (b.x - a.x) * (c.y - a.y)) / 2
};
Triangle.det = function det (m00, m01, m10, m11) {
  return m00 * m11 - m01 * m10
};
Triangle.interpolateZ = function interpolateZ (p, v0, v1, v2) {
  var x0 = v0.x;
  var y0 = v0.y;
  var a = v1.x - x0;
  var b = v2.x - x0;
  var c = v1.y - y0;
  var d = v2.y - y0;
  var det = a * d - b * c;
  var dx = p.x - x0;
  var dy = p.y - y0;
  var t = (d * dx - b * dy) / det;
  var u = (-c * dx + a * dy) / det;
  var z = v0.z + t * (v1.z - v0.z) + u * (v2.z - v0.z);
  return z
};
Triangle.longestSideLength = function longestSideLength (a, b, c) {
  var lenAB = a.distance(b);
  var lenBC = b.distance(c);
  var lenCA = c.distance(a);
  var maxLen = lenAB;
  if (lenBC > maxLen) { maxLen = lenBC; }
  if (lenCA > maxLen) { maxLen = lenCA; }
  return maxLen
};
Triangle.isAcute = function isAcute (a, b, c) {
  if (!Angle.isAcute(a, b, c)) { return false }
  if (!Angle.isAcute(b, c, a)) { return false }
  if (!Angle.isAcute(c, a, b)) { return false }
  return true
};
Triangle.circumcentre = function circumcentre (a, b, c) {
  var cx = c.x;
  var cy = c.y;
  var ax = a.x - cx;
  var ay = a.y - cy;
  var bx = b.x - cx;
  var by = b.y - cy;
  var denom = 2 * Triangle.det(ax, ay, bx, by);
  var numx = Triangle.det(ay, ax * ax + ay * ay, by, bx * bx + by * by);
  var numy = Triangle.det(ax, ax * ax + ay * ay, bx, bx * bx + by * by);
  var ccx = cx - numx / denom;
  var ccy = cy + numy / denom;
  return new Coordinate(ccx, ccy)
};
Triangle.perpendicularBisector = function perpendicularBisector (a, b) {
  var dx = b.x - a.x;
  var dy = b.y - a.y;
  var l1 = new HCoordinate(a.x + dx / 2.0, a.y + dy / 2.0, 1.0);
  var l2 = new HCoordinate(a.x - dy + dx / 2.0, a.y + dx + dy / 2.0, 1.0);
  return new HCoordinate(l1, l2)
};
Triangle.angleBisector = function angleBisector (a, b, c) {
  var len0 = b.distance(a);
  var len2 = b.distance(c);
  var frac = len0 / (len0 + len2);
  var dx = c.x - a.x;
  var dy = c.y - a.y;
  var splitPt = new Coordinate(a.x + frac * dx, a.y + frac * dy);
  return splitPt
};
Triangle.area3D = function area3D (a, b, c) {
  var ux = b.x - a.x;
  var uy = b.y - a.y;
  var uz = b.z - a.z;
  var vx = c.x - a.x;
  var vy = c.y - a.y;
  var vz = c.z - a.z;
  var crossx = uy * vz - uz * vy;
  var crossy = uz * vx - ux * vz;
  var crossz = ux * vy - uy * vx;
  var absSq = crossx * crossx + crossy * crossy + crossz * crossz;
  var area3D = Math.sqrt(absSq) / 2;
  return area3D
};
Triangle.centroid = function centroid (a, b, c) {
  var x = (a.x + b.x + c.x) / 3;
  var y = (a.y + b.y + c.y) / 3;
  return new Coordinate(x, y)
};
Triangle.inCentre = function inCentre (a, b, c) {
  var len0 = b.distance(c);
  var len1 = a.distance(c);
  var len2 = a.distance(b);
  var circum = len0 + len1 + len2;
  var inCentreX = (len0 * a.x + len1 * b.x + len2 * c.x) / circum;
  var inCentreY = (len0 * a.y + len1 * b.y + len2 * c.y) / circum;
  return new Coordinate(inCentreX, inCentreY)
};

var OffsetCurveSetBuilder = function OffsetCurveSetBuilder () {
  this._inputGeom = null;
  this._distance = null;
  this._curveBuilder = null;
  this._curveList = new ArrayList();
  var inputGeom = arguments[0];
  var distance = arguments[1];
  var curveBuilder = arguments[2];
  this._inputGeom = inputGeom;
  this._distance = distance;
  this._curveBuilder = curveBuilder;
};
OffsetCurveSetBuilder.prototype.addPoint = function addPoint (p) {
  if (this._distance <= 0.0) { return null }
  var coord = p.getCoordinates();
  var curve = this._curveBuilder.getLineCurve(coord, this._distance);
  this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
};
OffsetCurveSetBuilder.prototype.addPolygon = function addPolygon (p) {
    var this$1 = this;

  var offsetDistance = this._distance;
  var offsetSide = Position.LEFT;
  if (this._distance < 0.0) {
    offsetDistance = -this._distance;
    offsetSide = Position.RIGHT;
  }
  var shell = p.getExteriorRing();
  var shellCoord = CoordinateArrays.removeRepeatedPoints(shell.getCoordinates());
  if (this._distance < 0.0 && this.isErodedCompletely(shell, this._distance)) { return null }
  if (this._distance <= 0.0 && shellCoord.length < 3) { return null }
  this.addPolygonRing(shellCoord, offsetDistance, offsetSide, Location.EXTERIOR, Location.INTERIOR);
  for (var i = 0; i < p.getNumInteriorRing(); i++) {
    var hole = p.getInteriorRingN(i);
    var holeCoord = CoordinateArrays.removeRepeatedPoints(hole.getCoordinates());
    if (this$1._distance > 0.0 && this$1.isErodedCompletely(hole, -this$1._distance)) { continue }
    this$1.addPolygonRing(holeCoord, offsetDistance, Position.opposite(offsetSide), Location.INTERIOR, Location.EXTERIOR);
  }
};
OffsetCurveSetBuilder.prototype.isTriangleErodedCompletely = function isTriangleErodedCompletely (triangleCoord, bufferDistance) {
  var tri = new Triangle(triangleCoord[0], triangleCoord[1], triangleCoord[2]);
  var inCentre = tri.inCentre();
  var distToCentre = CGAlgorithms.distancePointLine(inCentre, tri.p0, tri.p1);
  return distToCentre < Math.abs(bufferDistance)
};
OffsetCurveSetBuilder.prototype.addLineString = function addLineString (line) {
  if (this._distance <= 0.0 && !this._curveBuilder.getBufferParameters().isSingleSided()) { return null }
  var coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
  var curve = this._curveBuilder.getLineCurve(coord, this._distance);
  this.addCurve(curve, Location.EXTERIOR, Location.INTERIOR);
};
OffsetCurveSetBuilder.prototype.addCurve = function addCurve (coord, leftLoc, rightLoc) {
  if (coord === null || coord.length < 2) { return null }
  var e = new NodedSegmentString(coord, new Label(0, Location.BOUNDARY, leftLoc, rightLoc));
  this._curveList.add(e);
};
OffsetCurveSetBuilder.prototype.getCurves = function getCurves () {
  this.add(this._inputGeom);
  return this._curveList
};
OffsetCurveSetBuilder.prototype.addPolygonRing = function addPolygonRing (coord, offsetDistance, side, cwLeftLoc, cwRightLoc) {
  if (offsetDistance === 0.0 && coord.length < LinearRing.MINIMUM_VALID_SIZE) { return null }
  var leftLoc = cwLeftLoc;
  var rightLoc = cwRightLoc;
  if (coord.length >= LinearRing.MINIMUM_VALID_SIZE && CGAlgorithms.isCCW(coord)) {
    leftLoc = cwRightLoc;
    rightLoc = cwLeftLoc;
    side = Position.opposite(side);
  }
  var curve = this._curveBuilder.getRingCurve(coord, side, offsetDistance);
  this.addCurve(curve, leftLoc, rightLoc);
};
OffsetCurveSetBuilder.prototype.add = function add (g) {
  if (g.isEmpty()) { return null }
  if (g instanceof Polygon) { this.addPolygon(g); }
  else if (g instanceof LineString) { this.addLineString(g); }
  else if (g instanceof Point) { this.addPoint(g); }
  else if (g instanceof MultiPoint) { this.addCollection(g); }
  else if (g instanceof MultiLineString) { this.addCollection(g); }
  else if (g instanceof MultiPolygon) { this.addCollection(g); }
  else if (g instanceof GeometryCollection) { this.addCollection(g); }
  // else throw new UnsupportedOperationException(g.getClass().getName())
};
OffsetCurveSetBuilder.prototype.isErodedCompletely = function isErodedCompletely (ring, bufferDistance) {
  var ringCoord = ring.getCoordinates();
  // const minDiam = 0.0
  if (ringCoord.length < 4) { return bufferDistance < 0 }
  if (ringCoord.length === 4) { return this.isTriangleErodedCompletely(ringCoord, bufferDistance) }
  var env = ring.getEnvelopeInternal();
  var envMinDimension = Math.min(env.getHeight(), env.getWidth());
  if (bufferDistance < 0.0 && 2 * Math.abs(bufferDistance) > envMinDimension) { return true }
  return false
};
OffsetCurveSetBuilder.prototype.addCollection = function addCollection (gc) {
    var this$1 = this;

  for (var i = 0; i < gc.getNumGeometries(); i++) {
    var g = gc.getGeometryN(i);
    this$1.add(g);
  }
};
OffsetCurveSetBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
OffsetCurveSetBuilder.prototype.getClass = function getClass () {
  return OffsetCurveSetBuilder
};

var PointOnGeometryLocator = function PointOnGeometryLocator () {};

PointOnGeometryLocator.prototype.locate = function locate (p) {};
PointOnGeometryLocator.prototype.interfaces_ = function interfaces_ () {
  return []
};
PointOnGeometryLocator.prototype.getClass = function getClass () {
  return PointOnGeometryLocator
};

var GeometryCollectionIterator = function GeometryCollectionIterator () {
  this._parent = null;
  this._atStart = null;
  this._max = null;
  this._index = null;
  this._subcollectionIterator = null;
  var parent = arguments[0];
  this._parent = parent;
  this._atStart = true;
  this._index = 0;
  this._max = parent.getNumGeometries();
};
GeometryCollectionIterator.prototype.next = function next () {
  if (this._atStart) {
    this._atStart = false;
    if (GeometryCollectionIterator.isAtomic(this._parent)) { this._index++; }
    return this._parent
  }
  if (this._subcollectionIterator !== null) {
    if (this._subcollectionIterator.hasNext()) {
      return this._subcollectionIterator.next()
    } else {
      this._subcollectionIterator = null;
    }
  }
  if (this._index >= this._max) {
    throw new NoSuchElementException()
  }
  var obj = this._parent.getGeometryN(this._index++);
  if (obj instanceof GeometryCollection) {
    this._subcollectionIterator = new GeometryCollectionIterator(obj);
    return this._subcollectionIterator.next()
  }
  return obj
};
GeometryCollectionIterator.prototype.remove = function remove () {
  throw new Error(this.getClass().getName())
};
GeometryCollectionIterator.prototype.hasNext = function hasNext () {
  if (this._atStart) {
    return true
  }
  if (this._subcollectionIterator !== null) {
    if (this._subcollectionIterator.hasNext()) {
      return true
    }
    this._subcollectionIterator = null;
  }
  if (this._index >= this._max) {
    return false
  }
  return true
};
GeometryCollectionIterator.prototype.interfaces_ = function interfaces_ () {
  return [Iterator]
};
GeometryCollectionIterator.prototype.getClass = function getClass () {
  return GeometryCollectionIterator
};
GeometryCollectionIterator.isAtomic = function isAtomic (geom) {
  return !(geom instanceof GeometryCollection)
};

var SimplePointInAreaLocator = function SimplePointInAreaLocator () {
  this._geom = null;
  var geom = arguments[0];
  this._geom = geom;
};
SimplePointInAreaLocator.prototype.locate = function locate (p) {
  return SimplePointInAreaLocator.locate(p, this._geom)
};
SimplePointInAreaLocator.prototype.interfaces_ = function interfaces_ () {
  return [PointOnGeometryLocator]
};
SimplePointInAreaLocator.prototype.getClass = function getClass () {
  return SimplePointInAreaLocator
};
SimplePointInAreaLocator.isPointInRing = function isPointInRing (p, ring) {
  if (!ring.getEnvelopeInternal().intersects(p)) { return false }
  return CGAlgorithms.isPointInRing(p, ring.getCoordinates())
};
SimplePointInAreaLocator.containsPointInPolygon = function containsPointInPolygon (p, poly) {
  if (poly.isEmpty()) { return false }
  var shell = poly.getExteriorRing();
  if (!SimplePointInAreaLocator.isPointInRing(p, shell)) { return false }
  for (var i = 0; i < poly.getNumInteriorRing(); i++) {
    var hole = poly.getInteriorRingN(i);
    if (SimplePointInAreaLocator.isPointInRing(p, hole)) { return false }
  }
  return true
};
SimplePointInAreaLocator.containsPoint = function containsPoint (p, geom) {
  if (geom instanceof Polygon) {
    return SimplePointInAreaLocator.containsPointInPolygon(p, geom)
  } else if (geom instanceof GeometryCollection) {
    var geomi = new GeometryCollectionIterator(geom);
    while (geomi.hasNext()) {
      var g2 = geomi.next();
      if (g2 !== geom) { if (SimplePointInAreaLocator.containsPoint(p, g2)) { return true } }
    }
  }
  return false
};
SimplePointInAreaLocator.locate = function locate (p, geom) {
  if (geom.isEmpty()) { return Location.EXTERIOR }
  if (SimplePointInAreaLocator.containsPoint(p, geom)) { return Location.INTERIOR }
  return Location.EXTERIOR
};

var EdgeEndStar = function EdgeEndStar () {
  this._edgeMap = new TreeMap();
  this._edgeList = null;
  this._ptInAreaLocation = [Location.NONE, Location.NONE];
};
EdgeEndStar.prototype.getNextCW = function getNextCW (ee) {
  this.getEdges();
  var i = this._edgeList.indexOf(ee);
  var iNextCW = i - 1;
  if (i === 0) { iNextCW = this._edgeList.size() - 1; }
  return this._edgeList.get(iNextCW)
};
EdgeEndStar.prototype.propagateSideLabels = function propagateSideLabels (geomIndex) {
  var startLoc = Location.NONE;
  for (var it = this.iterator(); it.hasNext();) {
    var e = it.next();
    var label = e.getLabel();
    if (label.isArea(geomIndex) && label.getLocation(geomIndex, Position.LEFT) !== Location.NONE) { startLoc = label.getLocation(geomIndex, Position.LEFT); }
  }
  if (startLoc === Location.NONE) { return null }
  var currLoc = startLoc;
  for (var it$1 = this.iterator(); it$1.hasNext();) {
    var e$1 = it$1.next();
    var label$1 = e$1.getLabel();
    if (label$1.getLocation(geomIndex, Position.ON) === Location.NONE) { label$1.setLocation(geomIndex, Position.ON, currLoc); }
    if (label$1.isArea(geomIndex)) {
      var leftLoc = label$1.getLocation(geomIndex, Position.LEFT);
      var rightLoc = label$1.getLocation(geomIndex, Position.RIGHT);
      if (rightLoc !== Location.NONE) {
        if (rightLoc !== currLoc) { throw new TopologyException('side location conflict', e$1.getCoordinate()) }
        if (leftLoc === Location.NONE) {
          Assert.shouldNeverReachHere('found single null side (at ' + e$1.getCoordinate() + ')');
        }
        currLoc = leftLoc;
      } else {
        Assert.isTrue(label$1.getLocation(geomIndex, Position.LEFT) === Location.NONE, 'found single null side');
        label$1.setLocation(geomIndex, Position.RIGHT, currLoc);
        label$1.setLocation(geomIndex, Position.LEFT, currLoc);
      }
    }
  }
};
EdgeEndStar.prototype.getCoordinate = function getCoordinate () {
  var it = this.iterator();
  if (!it.hasNext()) { return null }
  var e = it.next();
  return e.getCoordinate()
};
EdgeEndStar.prototype.print = function print (out) {
  System.out.println('EdgeEndStar:   ' + this.getCoordinate());
  for (var it = this.iterator(); it.hasNext();) {
    var e = it.next();
    e.print(out);
  }
};
EdgeEndStar.prototype.isAreaLabelsConsistent = function isAreaLabelsConsistent (geomGraph) {
  this.computeEdgeEndLabels(geomGraph.getBoundaryNodeRule());
  return this.checkAreaLabelsConsistent(0)
};
EdgeEndStar.prototype.checkAreaLabelsConsistent = function checkAreaLabelsConsistent (geomIndex) {
  var edges = this.getEdges();
  if (edges.size() <= 0) { return true }
  var lastEdgeIndex = edges.size() - 1;
  var startLabel = edges.get(lastEdgeIndex).getLabel();
  var startLoc = startLabel.getLocation(geomIndex, Position.LEFT);
  Assert.isTrue(startLoc !== Location.NONE, 'Found unlabelled area edge');
  var currLoc = startLoc;
  for (var it = this.iterator(); it.hasNext();) {
    var e = it.next();
    var label = e.getLabel();
    Assert.isTrue(label.isArea(geomIndex), 'Found non-area edge');
    var leftLoc = label.getLocation(geomIndex, Position.LEFT);
    var rightLoc = label.getLocation(geomIndex, Position.RIGHT);
    if (leftLoc === rightLoc) {
      return false
    }
    if (rightLoc !== currLoc) {
      return false
    }
    currLoc = leftLoc;
  }
  return true
};
EdgeEndStar.prototype.findIndex = function findIndex (eSearch) {
    var this$1 = this;

  this.iterator();
  for (var i = 0; i < this._edgeList.size(); i++) {
    var e = this$1._edgeList.get(i);
    if (e === eSearch) { return i }
  }
  return -1
};
EdgeEndStar.prototype.iterator = function iterator () {
  return this.getEdges().iterator()
};
EdgeEndStar.prototype.getEdges = function getEdges () {
  if (this._edgeList === null) {
    this._edgeList = new ArrayList(this._edgeMap.values());
  }
  return this._edgeList
};
EdgeEndStar.prototype.getLocation = function getLocation (geomIndex, p, geom) {
  if (this._ptInAreaLocation[geomIndex] === Location.NONE) {
    this._ptInAreaLocation[geomIndex] = SimplePointInAreaLocator.locate(p, geom[geomIndex].getGeometry());
  }
  return this._ptInAreaLocation[geomIndex]
};
EdgeEndStar.prototype.toString = function toString () {
  var buf = new StringBuffer();
  buf.append('EdgeEndStar:   ' + this.getCoordinate());
  buf.append('\n');
  for (var it = this.iterator(); it.hasNext();) {
    var e = it.next();
    buf.append(e);
    buf.append('\n');
  }
  return buf.toString()
};
EdgeEndStar.prototype.computeEdgeEndLabels = function computeEdgeEndLabels (boundaryNodeRule) {
  for (var it = this.iterator(); it.hasNext();) {
    var ee = it.next();
    ee.computeLabel(boundaryNodeRule);
  }
};
EdgeEndStar.prototype.computeLabelling = function computeLabelling (geomGraph) {
    var this$1 = this;

  this.computeEdgeEndLabels(geomGraph[0].getBoundaryNodeRule());
  this.propagateSideLabels(0);
  this.propagateSideLabels(1);
  var hasDimensionalCollapseEdge = [false, false];
  for (var it = this.iterator(); it.hasNext();) {
    var e = it.next();
    var label = e.getLabel();
    for (var geomi = 0; geomi < 2; geomi++) {
      if (label.isLine(geomi) && label.getLocation(geomi) === Location.BOUNDARY) { hasDimensionalCollapseEdge[geomi] = true; }
    }
  }
  for (var it$1 = this.iterator(); it$1.hasNext();) {
    var e$1 = it$1.next();
    var label$1 = e$1.getLabel();
    for (var geomi$1 = 0; geomi$1 < 2; geomi$1++) {
      if (label$1.isAnyNull(geomi$1)) {
        var loc = Location.NONE;
        if (hasDimensionalCollapseEdge[geomi$1]) {
          loc = Location.EXTERIOR;
        } else {
          var p = e$1.getCoordinate();
          loc = this$1.getLocation(geomi$1, p, geomGraph);
        }
        label$1.setAllLocationsIfNull(geomi$1, loc);
      }
    }
  }
};
EdgeEndStar.prototype.getDegree = function getDegree () {
  return this._edgeMap.size()
};
EdgeEndStar.prototype.insertEdgeEnd = function insertEdgeEnd (e, obj) {
  this._edgeMap.put(e, obj);
  this._edgeList = null;
};
EdgeEndStar.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeEndStar.prototype.getClass = function getClass () {
  return EdgeEndStar
};

var DirectedEdgeStar = (function (EdgeEndStar$$1) {
  function DirectedEdgeStar () {
    EdgeEndStar$$1.call(this);
    this._resultAreaEdgeList = null;
    this._label = null;
    this._SCANNING_FOR_INCOMING = 1;
    this._LINKING_TO_OUTGOING = 2;
  }

  if ( EdgeEndStar$$1 ) DirectedEdgeStar.__proto__ = EdgeEndStar$$1;
  DirectedEdgeStar.prototype = Object.create( EdgeEndStar$$1 && EdgeEndStar$$1.prototype );
  DirectedEdgeStar.prototype.constructor = DirectedEdgeStar;
  DirectedEdgeStar.prototype.linkResultDirectedEdges = function linkResultDirectedEdges () {
    var this$1 = this;

    this.getResultAreaEdges();
    var firstOut = null;
    var incoming = null;
    var state = this._SCANNING_FOR_INCOMING;
    for (var i = 0; i < this._resultAreaEdgeList.size(); i++) {
      var nextOut = this$1._resultAreaEdgeList.get(i);
      var nextIn = nextOut.getSym();
      if (!nextOut.getLabel().isArea()) { continue }
      if (firstOut === null && nextOut.isInResult()) { firstOut = nextOut; }
      switch (state) {
        case this$1._SCANNING_FOR_INCOMING:
          if (!nextIn.isInResult()) { continue }
          incoming = nextIn;
          state = this$1._LINKING_TO_OUTGOING;
          break
        case this$1._LINKING_TO_OUTGOING:
          if (!nextOut.isInResult()) { continue }
          incoming.setNext(nextOut);
          state = this$1._SCANNING_FOR_INCOMING;
          break
        default:
      }
    }
    if (state === this._LINKING_TO_OUTGOING) {
      if (firstOut === null) { throw new TopologyException('no outgoing dirEdge found', this.getCoordinate()) }
      Assert.isTrue(firstOut.isInResult(), 'unable to link last incoming dirEdge');
      incoming.setNext(firstOut);
    }
  };
  DirectedEdgeStar.prototype.insert = function insert (ee) {
    var de = ee;
    this.insertEdgeEnd(de, de);
  };
  DirectedEdgeStar.prototype.getRightmostEdge = function getRightmostEdge () {
    var edges = this.getEdges();
    var size = edges.size();
    if (size < 1) { return null }
    var de0 = edges.get(0);
    if (size === 1) { return de0 }
    var deLast = edges.get(size - 1);
    var quad0 = de0.getQuadrant();
    var quad1 = deLast.getQuadrant();
    if (Quadrant.isNorthern(quad0) && Quadrant.isNorthern(quad1)) { return de0; } else if (!Quadrant.isNorthern(quad0) && !Quadrant.isNorthern(quad1)) { return deLast; } else {
      // const nonHorizontalEdge = null
      if (de0.getDy() !== 0) { return de0; } else if (deLast.getDy() !== 0) { return deLast }
    }
    Assert.shouldNeverReachHere('found two horizontal edges incident on node');
    return null
  };
  DirectedEdgeStar.prototype.print = function print (out) {
    System.out.println('DirectedEdgeStar: ' + this.getCoordinate());
    for (var it = this.iterator(); it.hasNext();) {
      var de = it.next();
      out.print('out ');
      de.print(out);
      out.println();
      out.print('in ');
      de.getSym().print(out);
      out.println();
    }
  };
  DirectedEdgeStar.prototype.getResultAreaEdges = function getResultAreaEdges () {
    var this$1 = this;

    if (this._resultAreaEdgeList !== null) { return this._resultAreaEdgeList }
    this._resultAreaEdgeList = new ArrayList();
    for (var it = this.iterator(); it.hasNext();) {
      var de = it.next();
      if (de.isInResult() || de.getSym().isInResult()) { this$1._resultAreaEdgeList.add(de); }
    }
    return this._resultAreaEdgeList
  };
  DirectedEdgeStar.prototype.updateLabelling = function updateLabelling (nodeLabel) {
    for (var it = this.iterator(); it.hasNext();) {
      var de = it.next();
      var label = de.getLabel();
      label.setAllLocationsIfNull(0, nodeLabel.getLocation(0));
      label.setAllLocationsIfNull(1, nodeLabel.getLocation(1));
    }
  };
  DirectedEdgeStar.prototype.linkAllDirectedEdges = function linkAllDirectedEdges () {
    var this$1 = this;

    this.getEdges();
    var prevOut = null;
    var firstIn = null;
    for (var i = this._edgeList.size() - 1; i >= 0; i--) {
      var nextOut = this$1._edgeList.get(i);
      var nextIn = nextOut.getSym();
      if (firstIn === null) { firstIn = nextIn; }
      if (prevOut !== null) { nextIn.setNext(prevOut); }
      prevOut = nextOut;
    }
    firstIn.setNext(prevOut);
  };
  DirectedEdgeStar.prototype.computeDepths = function computeDepths () {
    var this$1 = this;

    if (arguments.length === 1) {
      var de = arguments[0];
      var edgeIndex = this.findIndex(de);
      // const label = de.getLabel()
      var startDepth = de.getDepth(Position.LEFT);
      var targetLastDepth = de.getDepth(Position.RIGHT);
      var nextDepth = this.computeDepths(edgeIndex + 1, this._edgeList.size(), startDepth);
      var lastDepth = this.computeDepths(0, edgeIndex, nextDepth);
      if (lastDepth !== targetLastDepth) { throw new TopologyException('depth mismatch at ' + de.getCoordinate()) }
    } else if (arguments.length === 3) {
      var startIndex = arguments[0];
      var endIndex = arguments[1];
      var startDepth$1 = arguments[2];
      var currDepth = startDepth$1;
      for (var i = startIndex; i < endIndex; i++) {
        var nextDe = this$1._edgeList.get(i);
        // const label = nextDe.getLabel()
        nextDe.setEdgeDepths(Position.RIGHT, currDepth);
        currDepth = nextDe.getDepth(Position.LEFT);
      }
      return currDepth
    }
  };
  DirectedEdgeStar.prototype.mergeSymLabels = function mergeSymLabels () {
    for (var it = this.iterator(); it.hasNext();) {
      var de = it.next();
      var label = de.getLabel();
      label.merge(de.getSym().getLabel());
    }
  };
  DirectedEdgeStar.prototype.linkMinimalDirectedEdges = function linkMinimalDirectedEdges (er) {
    var this$1 = this;

    var firstOut = null;
    var incoming = null;
    var state = this._SCANNING_FOR_INCOMING;
    for (var i = this._resultAreaEdgeList.size() - 1; i >= 0; i--) {
      var nextOut = this$1._resultAreaEdgeList.get(i);
      var nextIn = nextOut.getSym();
      if (firstOut === null && nextOut.getEdgeRing() === er) { firstOut = nextOut; }
      switch (state) {
        case this$1._SCANNING_FOR_INCOMING:
          if (nextIn.getEdgeRing() !== er) { continue }
          incoming = nextIn;
          state = this$1._LINKING_TO_OUTGOING;
          break
        case this$1._LINKING_TO_OUTGOING:
          if (nextOut.getEdgeRing() !== er) { continue }
          incoming.setNextMin(nextOut);
          state = this$1._SCANNING_FOR_INCOMING;
          break
        default:
      }
    }
    if (state === this._LINKING_TO_OUTGOING) {
      Assert.isTrue(firstOut !== null, 'found null for first outgoing dirEdge');
      Assert.isTrue(firstOut.getEdgeRing() === er, 'unable to link last incoming dirEdge');
      incoming.setNextMin(firstOut);
    }
  };
  DirectedEdgeStar.prototype.getOutgoingDegree = function getOutgoingDegree () {
    if (arguments.length === 0) {
      var degree = 0;
      for (var it = this.iterator(); it.hasNext();) {
        var de = it.next();
        if (de.isInResult()) { degree++; }
      }
      return degree
    } else if (arguments.length === 1) {
      var er = arguments[0];
      var degree$1 = 0;
      for (var it$1 = this.iterator(); it$1.hasNext();) {
        var de$1 = it$1.next();
        if (de$1.getEdgeRing() === er) { degree$1++; }
      }
      return degree$1
    }
  };
  DirectedEdgeStar.prototype.getLabel = function getLabel () {
    return this._label
  };
  DirectedEdgeStar.prototype.findCoveredLineEdges = function findCoveredLineEdges () {
    var startLoc = Location.NONE;
    for (var it = this.iterator(); it.hasNext();) {
      var nextOut = it.next();
      var nextIn = nextOut.getSym();
      if (!nextOut.isLineEdge()) {
        if (nextOut.isInResult()) {
          startLoc = Location.INTERIOR;
          break
        }
        if (nextIn.isInResult()) {
          startLoc = Location.EXTERIOR;
          break
        }
      }
    }
    if (startLoc === Location.NONE) { return null }
    var currLoc = startLoc;
    for (var it$1 = this.iterator(); it$1.hasNext();) {
      var nextOut$1 = it$1.next();
      var nextIn$1 = nextOut$1.getSym();
      if (nextOut$1.isLineEdge()) {
        nextOut$1.getEdge().setCovered(currLoc === Location.INTERIOR);
      } else {
        if (nextOut$1.isInResult()) { currLoc = Location.EXTERIOR; }
        if (nextIn$1.isInResult()) { currLoc = Location.INTERIOR; }
      }
    }
  };
  DirectedEdgeStar.prototype.computeLabelling = function computeLabelling (geom) {
    var this$1 = this;

    EdgeEndStar$$1.prototype.computeLabelling.call(this, geom);
    this._label = new Label(Location.NONE);
    for (var it = this.iterator(); it.hasNext();) {
      var ee = it.next();
      var e = ee.getEdge();
      var eLabel = e.getLabel();
      for (var i = 0; i < 2; i++) {
        var eLoc = eLabel.getLocation(i);
        if (eLoc === Location.INTERIOR || eLoc === Location.BOUNDARY) { this$1._label.setLocation(i, Location.INTERIOR); }
      }
    }
  };
  DirectedEdgeStar.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  DirectedEdgeStar.prototype.getClass = function getClass () {
    return DirectedEdgeStar
  };

  return DirectedEdgeStar;
}(EdgeEndStar));

var OverlayNodeFactory = (function (NodeFactory$$1) {
  function OverlayNodeFactory () {
    NodeFactory$$1.apply(this, arguments);
  }

  if ( NodeFactory$$1 ) OverlayNodeFactory.__proto__ = NodeFactory$$1;
  OverlayNodeFactory.prototype = Object.create( NodeFactory$$1 && NodeFactory$$1.prototype );
  OverlayNodeFactory.prototype.constructor = OverlayNodeFactory;

  OverlayNodeFactory.prototype.createNode = function createNode (coord) {
    return new Node(coord, new DirectedEdgeStar())
  };
  OverlayNodeFactory.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  OverlayNodeFactory.prototype.getClass = function getClass () {
    return OverlayNodeFactory
  };

  return OverlayNodeFactory;
}(NodeFactory));

var OrientedCoordinateArray = function OrientedCoordinateArray () {
  this._pts = null;
  this._orientation = null;
  var pts = arguments[0];
  this._pts = pts;
  this._orientation = OrientedCoordinateArray.orientation(pts);
};
OrientedCoordinateArray.prototype.compareTo = function compareTo (o1) {
  var oca = o1;
  var comp = OrientedCoordinateArray.compareOriented(this._pts, this._orientation, oca._pts, oca._orientation);
  return comp
};
OrientedCoordinateArray.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
OrientedCoordinateArray.prototype.getClass = function getClass () {
  return OrientedCoordinateArray
};
OrientedCoordinateArray.orientation = function orientation (pts) {
  return CoordinateArrays.increasingDirection(pts) === 1
};
OrientedCoordinateArray.compareOriented = function compareOriented (pts1, orientation1, pts2, orientation2) {
  var dir1 = orientation1 ? 1 : -1;
  var dir2 = orientation2 ? 1 : -1;
  var limit1 = orientation1 ? pts1.length : -1;
  var limit2 = orientation2 ? pts2.length : -1;
  var i1 = orientation1 ? 0 : pts1.length - 1;
  var i2 = orientation2 ? 0 : pts2.length - 1;
  // const comp = 0
  while (true) {
    var compPt = pts1[i1].compareTo(pts2[i2]);
    if (compPt !== 0) { return compPt }
    i1 += dir1;
    i2 += dir2;
    var done1 = i1 === limit1;
    var done2 = i2 === limit2;
    if (done1 && !done2) { return -1 }
    if (!done1 && done2) { return 1 }
    if (done1 && done2) { return 0 }
  }
};

var EdgeList = function EdgeList () {
  this._edges = new ArrayList();
  this._ocaMap = new TreeMap();
};
EdgeList.prototype.print = function print (out) {
    var this$1 = this;

  out.print('MULTILINESTRING ( ');
  for (var j = 0; j < this._edges.size(); j++) {
    var e = this$1._edges.get(j);
    if (j > 0) { out.print(','); }
    out.print('(');
    var pts = e.getCoordinates();
    for (var i = 0; i < pts.length; i++) {
      if (i > 0) { out.print(','); }
      out.print(pts[i].x + ' ' + pts[i].y);
    }
    out.println(')');
  }
  out.print(')  ');
};
EdgeList.prototype.addAll = function addAll (edgeColl) {
    var this$1 = this;

  for (var i = edgeColl.iterator(); i.hasNext();) {
    this$1.add(i.next());
  }
};
EdgeList.prototype.findEdgeIndex = function findEdgeIndex (e) {
    var this$1 = this;

  for (var i = 0; i < this._edges.size(); i++) {
    if (this$1._edges.get(i).equals(e)) { return i }
  }
  return -1
};
EdgeList.prototype.iterator = function iterator () {
  return this._edges.iterator()
};
EdgeList.prototype.getEdges = function getEdges () {
  return this._edges
};
EdgeList.prototype.get = function get (i) {
  return this._edges.get(i)
};
EdgeList.prototype.findEqualEdge = function findEqualEdge (e) {
  var oca = new OrientedCoordinateArray(e.getCoordinates());
  var matchEdge = this._ocaMap.get(oca);
  return matchEdge
};
EdgeList.prototype.add = function add (e) {
  this._edges.add(e);
  var oca = new OrientedCoordinateArray(e.getCoordinates());
  this._ocaMap.put(oca, e);
};
EdgeList.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeList.prototype.getClass = function getClass () {
  return EdgeList
};

var SegmentIntersector = function SegmentIntersector () {};

SegmentIntersector.prototype.processIntersections = function processIntersections (e0, segIndex0, e1, segIndex1) {};
SegmentIntersector.prototype.isDone = function isDone () {};
SegmentIntersector.prototype.interfaces_ = function interfaces_ () {
  return []
};
SegmentIntersector.prototype.getClass = function getClass () {
  return SegmentIntersector
};

var IntersectionAdder = function IntersectionAdder () {
  this._hasIntersection = false;
  this._hasProper = false;
  this._hasProperInterior = false;
  this._hasInterior = false;
  this._properIntersectionPoint = null;
  this._li = null;
  this._isSelfIntersection = null;
  this.numIntersections = 0;
  this.numInteriorIntersections = 0;
  this.numProperIntersections = 0;
  this.numTests = 0;
  var li = arguments[0];
  this._li = li;
};
IntersectionAdder.prototype.isTrivialIntersection = function isTrivialIntersection (e0, segIndex0, e1, segIndex1) {
  if (e0 === e1) {
    if (this._li.getIntersectionNum() === 1) {
      if (IntersectionAdder.isAdjacentSegments(segIndex0, segIndex1)) { return true }
      if (e0.isClosed()) {
        var maxSegIndex = e0.size() - 1;
        if ((segIndex0 === 0 && segIndex1 === maxSegIndex) ||
            (segIndex1 === 0 && segIndex0 === maxSegIndex)) {
          return true
        }
      }
    }
  }
  return false
};
IntersectionAdder.prototype.getProperIntersectionPoint = function getProperIntersectionPoint () {
  return this._properIntersectionPoint
};
IntersectionAdder.prototype.hasProperInteriorIntersection = function hasProperInteriorIntersection () {
  return this._hasProperInterior
};
IntersectionAdder.prototype.getLineIntersector = function getLineIntersector () {
  return this._li
};
IntersectionAdder.prototype.hasProperIntersection = function hasProperIntersection () {
  return this._hasProper
};
IntersectionAdder.prototype.processIntersections = function processIntersections (e0, segIndex0, e1, segIndex1) {
  if (e0 === e1 && segIndex0 === segIndex1) { return null }
  this.numTests++;
  var p00 = e0.getCoordinates()[segIndex0];
  var p01 = e0.getCoordinates()[segIndex0 + 1];
  var p10 = e1.getCoordinates()[segIndex1];
  var p11 = e1.getCoordinates()[segIndex1 + 1];
  this._li.computeIntersection(p00, p01, p10, p11);
  if (this._li.hasIntersection()) {
    this.numIntersections++;
    if (this._li.isInteriorIntersection()) {
      this.numInteriorIntersections++;
      this._hasInterior = true;
    }
    if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
      this._hasIntersection = true;
      e0.addIntersections(this._li, segIndex0, 0);
      e1.addIntersections(this._li, segIndex1, 1);
      if (this._li.isProper()) {
        this.numProperIntersections++;
        this._hasProper = true;
        this._hasProperInterior = true;
      }
    }
  }
};
IntersectionAdder.prototype.hasIntersection = function hasIntersection () {
  return this._hasIntersection
};
IntersectionAdder.prototype.isDone = function isDone () {
  return false
};
IntersectionAdder.prototype.hasInteriorIntersection = function hasInteriorIntersection () {
  return this._hasInterior
};
IntersectionAdder.prototype.interfaces_ = function interfaces_ () {
  return [SegmentIntersector]
};
IntersectionAdder.prototype.getClass = function getClass () {
  return IntersectionAdder
};
IntersectionAdder.isAdjacentSegments = function isAdjacentSegments (i1, i2) {
  return Math.abs(i1 - i2) === 1
};

var EdgeIntersection = function EdgeIntersection () {
  this.coord = null;
  this.segmentIndex = null;
  this.dist = null;
  var coord = arguments[0];
  var segmentIndex = arguments[1];
  var dist = arguments[2];
  this.coord = new Coordinate(coord);
  this.segmentIndex = segmentIndex;
  this.dist = dist;
};
EdgeIntersection.prototype.getSegmentIndex = function getSegmentIndex () {
  return this.segmentIndex
};
EdgeIntersection.prototype.getCoordinate = function getCoordinate () {
  return this.coord
};
EdgeIntersection.prototype.print = function print (out) {
  out.print(this.coord);
  out.print(' seg # = ' + this.segmentIndex);
  out.println(' dist = ' + this.dist);
};
EdgeIntersection.prototype.compareTo = function compareTo (obj) {
  var other = obj;
  return this.compare(other.segmentIndex, other.dist)
};
EdgeIntersection.prototype.isEndPoint = function isEndPoint (maxSegmentIndex) {
  if (this.segmentIndex === 0 && this.dist === 0.0) { return true }
  if (this.segmentIndex === maxSegmentIndex) { return true }
  return false
};
EdgeIntersection.prototype.toString = function toString () {
  return this.coord + ' seg # = ' + this.segmentIndex + ' dist = ' + this.dist
};
EdgeIntersection.prototype.getDistance = function getDistance () {
  return this.dist
};
EdgeIntersection.prototype.compare = function compare (segmentIndex, dist) {
  if (this.segmentIndex < segmentIndex) { return -1 }
  if (this.segmentIndex > segmentIndex) { return 1 }
  if (this.dist < dist) { return -1 }
  if (this.dist > dist) { return 1 }
  return 0
};
EdgeIntersection.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
EdgeIntersection.prototype.getClass = function getClass () {
  return EdgeIntersection
};

var EdgeIntersectionList = function EdgeIntersectionList () {
  this._nodeMap = new TreeMap();
  this.edge = null;
  var edge = arguments[0];
  this.edge = edge;
};
EdgeIntersectionList.prototype.print = function print (out) {
  out.println('Intersections:');
  for (var it = this.iterator(); it.hasNext();) {
    var ei = it.next();
    ei.print(out);
  }
};
EdgeIntersectionList.prototype.iterator = function iterator () {
  return this._nodeMap.values().iterator()
};
EdgeIntersectionList.prototype.addSplitEdges = function addSplitEdges (edgeList) {
    var this$1 = this;

  this.addEndpoints();
  var it = this.iterator();
  var eiPrev = it.next();
  while (it.hasNext()) {
    var ei = it.next();
    var newEdge = this$1.createSplitEdge(eiPrev, ei);
    edgeList.add(newEdge);
    eiPrev = ei;
  }
};
EdgeIntersectionList.prototype.addEndpoints = function addEndpoints () {
  var maxSegIndex = this.edge.pts.length - 1;
  this.add(this.edge.pts[0], 0, 0.0);
  this.add(this.edge.pts[maxSegIndex], maxSegIndex, 0.0);
};
EdgeIntersectionList.prototype.createSplitEdge = function createSplitEdge (ei0, ei1) {
    var this$1 = this;

  var npts = ei1.segmentIndex - ei0.segmentIndex + 2;
  var lastSegStartPt = this.edge.pts[ei1.segmentIndex];
  var useIntPt1 = ei1.dist > 0.0 || !ei1.coord.equals2D(lastSegStartPt);
  if (!useIntPt1) {
    npts--;
  }
  var pts = new Array(npts).fill(null);
  var ipt = 0;
  pts[ipt++] = new Coordinate(ei0.coord);
  for (var i = ei0.segmentIndex + 1; i <= ei1.segmentIndex; i++) {
    pts[ipt++] = this$1.edge.pts[i];
  }
  if (useIntPt1) { pts[ipt] = ei1.coord; }
  return new Edge(pts, new Label(this.edge._label))
};
EdgeIntersectionList.prototype.add = function add (intPt, segmentIndex, dist) {
  var eiNew = new EdgeIntersection(intPt, segmentIndex, dist);
  var ei = this._nodeMap.get(eiNew);
  if (ei !== null) {
    return ei
  }
  this._nodeMap.put(eiNew, eiNew);
  return eiNew
};
EdgeIntersectionList.prototype.isIntersection = function isIntersection (pt) {
  for (var it = this.iterator(); it.hasNext();) {
    var ei = it.next();
    if (ei.coord.equals(pt)) { return true }
  }
  return false
};
EdgeIntersectionList.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeIntersectionList.prototype.getClass = function getClass () {
  return EdgeIntersectionList
};

var MonotoneChainIndexer = function MonotoneChainIndexer () {};

MonotoneChainIndexer.prototype.getChainStartIndices = function getChainStartIndices (pts) {
    var this$1 = this;

  var start = 0;
  var startIndexList = new ArrayList();
  startIndexList.add(new Integer(start));
  do {
    var last = this$1.findChainEnd(pts, start);
    startIndexList.add(new Integer(last));
    start = last;
  } while (start < pts.length - 1)
  var startIndex = MonotoneChainIndexer.toIntArray(startIndexList);
  return startIndex
};
MonotoneChainIndexer.prototype.findChainEnd = function findChainEnd (pts, start) {
  var chainQuad = Quadrant.quadrant(pts[start], pts[start + 1]);
  var last = start + 1;
  while (last < pts.length) {
    var quad = Quadrant.quadrant(pts[last - 1], pts[last]);
    if (quad !== chainQuad) { break }
    last++;
  }
  return last - 1
};
MonotoneChainIndexer.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChainIndexer.prototype.getClass = function getClass () {
  return MonotoneChainIndexer
};
MonotoneChainIndexer.toIntArray = function toIntArray (list) {
  var array = new Array(list.size()).fill(null);
  for (var i = 0; i < array.length; i++) {
    array[i] = list.get(i).intValue();
  }
  return array
};

var MonotoneChainEdge = function MonotoneChainEdge () {
  this.e = null;
  this.pts = null;
  this.startIndex = null;
  this.env1 = new Envelope();
  this.env2 = new Envelope();
  var e = arguments[0];
  this.e = e;
  this.pts = e.getCoordinates();
  var mcb = new MonotoneChainIndexer();
  this.startIndex = mcb.getChainStartIndices(this.pts);
};
MonotoneChainEdge.prototype.getCoordinates = function getCoordinates () {
  return this.pts
};
MonotoneChainEdge.prototype.getMaxX = function getMaxX (chainIndex) {
  var x1 = this.pts[this.startIndex[chainIndex]].x;
  var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
  return x1 > x2 ? x1 : x2
};
MonotoneChainEdge.prototype.getMinX = function getMinX (chainIndex) {
  var x1 = this.pts[this.startIndex[chainIndex]].x;
  var x2 = this.pts[this.startIndex[chainIndex + 1]].x;
  return x1 < x2 ? x1 : x2
};
MonotoneChainEdge.prototype.computeIntersectsForChain = function computeIntersectsForChain () {
  if (arguments.length === 4) {
    var chainIndex0 = arguments[0];
    var mce = arguments[1];
    var chainIndex1 = arguments[2];
    var si = arguments[3];
    this.computeIntersectsForChain(this.startIndex[chainIndex0], this.startIndex[chainIndex0 + 1], mce, mce.startIndex[chainIndex1], mce.startIndex[chainIndex1 + 1], si);
  } else if (arguments.length === 6) {
    var start0 = arguments[0];
    var end0 = arguments[1];
    var mce$1 = arguments[2];
    var start1 = arguments[3];
    var end1 = arguments[4];
    var ei = arguments[5];
    var p00 = this.pts[start0];
    var p01 = this.pts[end0];
    var p10 = mce$1.pts[start1];
    var p11 = mce$1.pts[end1];
    if (end0 - start0 === 1 && end1 - start1 === 1) {
      ei.addIntersections(this.e, start0, mce$1.e, start1);
      return null
    }
    this.env1.init(p00, p01);
    this.env2.init(p10, p11);
    if (!this.env1.intersects(this.env2)) { return null }
    var mid0 = Math.trunc((start0 + end0) / 2);
    var mid1 = Math.trunc((start1 + end1) / 2);
    if (start0 < mid0) {
      if (start1 < mid1) { this.computeIntersectsForChain(start0, mid0, mce$1, start1, mid1, ei); }
      if (mid1 < end1) { this.computeIntersectsForChain(start0, mid0, mce$1, mid1, end1, ei); }
    }
    if (mid0 < end0) {
      if (start1 < mid1) { this.computeIntersectsForChain(mid0, end0, mce$1, start1, mid1, ei); }
      if (mid1 < end1) { this.computeIntersectsForChain(mid0, end0, mce$1, mid1, end1, ei); }
    }
  }
};
MonotoneChainEdge.prototype.getStartIndexes = function getStartIndexes () {
  return this.startIndex
};
MonotoneChainEdge.prototype.computeIntersects = function computeIntersects (mce, si) {
    var this$1 = this;

  for (var i = 0; i < this.startIndex.length - 1; i++) {
    for (var j = 0; j < mce.startIndex.length - 1; j++) {
      this$1.computeIntersectsForChain(i, mce, j, si);
    }
  }
};
MonotoneChainEdge.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChainEdge.prototype.getClass = function getClass () {
  return MonotoneChainEdge
};

var Depth = function Depth () {
  var this$1 = this;

  this._depth = Array(2).fill().map(function () { return Array(3); });
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < 3; j++) {
      this$1._depth[i][j] = Depth.NULL_VALUE;
    }
  }
};

var staticAccessors$31 = { NULL_VALUE: { configurable: true } };
Depth.prototype.getDepth = function getDepth (geomIndex, posIndex) {
  return this._depth[geomIndex][posIndex]
};
Depth.prototype.setDepth = function setDepth (geomIndex, posIndex, depthValue) {
  this._depth[geomIndex][posIndex] = depthValue;
};
Depth.prototype.isNull = function isNull () {
    var this$1 = this;

  if (arguments.length === 0) {
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        if (this$1._depth[i][j] !== Depth.NULL_VALUE) { return false }
      }
    }
    return true
  } else if (arguments.length === 1) {
    var geomIndex = arguments[0];
    return this._depth[geomIndex][1] === Depth.NULL_VALUE
  } else if (arguments.length === 2) {
    var geomIndex$1 = arguments[0];
    var posIndex = arguments[1];
    return this._depth[geomIndex$1][posIndex] === Depth.NULL_VALUE
  }
};
Depth.prototype.normalize = function normalize () {
    var this$1 = this;

  for (var i = 0; i < 2; i++) {
    if (!this$1.isNull(i)) {
      var minDepth = this$1._depth[i][1];
      if (this$1._depth[i][2] < minDepth) { minDepth = this$1._depth[i][2]; }
      if (minDepth < 0) { minDepth = 0; }
      for (var j = 1; j < 3; j++) {
        var newValue = 0;
        if (this$1._depth[i][j] > minDepth) { newValue = 1; }
        this$1._depth[i][j] = newValue;
      }
    }
  }
};
Depth.prototype.getDelta = function getDelta (geomIndex) {
  return this._depth[geomIndex][Position.RIGHT] - this._depth[geomIndex][Position.LEFT]
};
Depth.prototype.getLocation = function getLocation (geomIndex, posIndex) {
  if (this._depth[geomIndex][posIndex] <= 0) { return Location.EXTERIOR }
  return Location.INTERIOR
};
Depth.prototype.toString = function toString () {
  return 'A: ' + this._depth[0][1] + ',' + this._depth[0][2] + ' B: ' + this._depth[1][1] + ',' + this._depth[1][2]
};
Depth.prototype.add = function add () {
    var this$1 = this;

  if (arguments.length === 1) {
    var lbl = arguments[0];
    for (var i = 0; i < 2; i++) {
      for (var j = 1; j < 3; j++) {
        var loc = lbl.getLocation(i, j);
        if (loc === Location.EXTERIOR || loc === Location.INTERIOR) {
          if (this$1.isNull(i, j)) {
            this$1._depth[i][j] = Depth.depthAtLocation(loc);
          } else { this$1._depth[i][j] += Depth.depthAtLocation(loc); }
        }
      }
    }
  } else if (arguments.length === 3) {
    var geomIndex = arguments[0];
    var posIndex = arguments[1];
    var location = arguments[2];
    if (location === Location.INTERIOR) { this._depth[geomIndex][posIndex]++; }
  }
};
Depth.prototype.interfaces_ = function interfaces_ () {
  return []
};
Depth.prototype.getClass = function getClass () {
  return Depth
};
Depth.depthAtLocation = function depthAtLocation (location) {
  if (location === Location.EXTERIOR) { return 0 }
  if (location === Location.INTERIOR) { return 1 }
  return Depth.NULL_VALUE
};
staticAccessors$31.NULL_VALUE.get = function () { return -1 };

Object.defineProperties( Depth, staticAccessors$31 );

var Edge = (function (GraphComponent$$1) {
  function Edge () {
    GraphComponent$$1.call(this);
    this.pts = null;
    this._env = null;
    this.eiList = new EdgeIntersectionList(this);
    this._name = null;
    this._mce = null;
    this._isIsolated = true;
    this._depth = new Depth();
    this._depthDelta = 0;
    if (arguments.length === 1) {
      var pts = arguments[0];
      Edge.call(this, pts, null);
    } else if (arguments.length === 2) {
      var pts$1 = arguments[0];
      var label = arguments[1];
      this.pts = pts$1;
      this._label = label;
    }
  }

  if ( GraphComponent$$1 ) Edge.__proto__ = GraphComponent$$1;
  Edge.prototype = Object.create( GraphComponent$$1 && GraphComponent$$1.prototype );
  Edge.prototype.constructor = Edge;
  Edge.prototype.getDepth = function getDepth () {
    return this._depth
  };
  Edge.prototype.getCollapsedEdge = function getCollapsedEdge () {
    var newPts = new Array(2).fill(null);
    newPts[0] = this.pts[0];
    newPts[1] = this.pts[1];
    var newe = new Edge(newPts, Label.toLineLabel(this._label));
    return newe
  };
  Edge.prototype.isIsolated = function isIsolated () {
    return this._isIsolated
  };
  Edge.prototype.getCoordinates = function getCoordinates () {
    return this.pts
  };
  Edge.prototype.setIsolated = function setIsolated (isIsolated) {
    this._isIsolated = isIsolated;
  };
  Edge.prototype.setName = function setName (name) {
    this._name = name;
  };
  Edge.prototype.equals = function equals (o) {
    var this$1 = this;

    if (!(o instanceof Edge)) { return false }
    var e = o;
    if (this.pts.length !== e.pts.length) { return false }
    var isEqualForward = true;
    var isEqualReverse = true;
    var iRev = this.pts.length;
    for (var i = 0; i < this.pts.length; i++) {
      if (!this$1.pts[i].equals2D(e.pts[i])) {
        isEqualForward = false;
      }
      if (!this$1.pts[i].equals2D(e.pts[--iRev])) {
        isEqualReverse = false;
      }
      if (!isEqualForward && !isEqualReverse) { return false }
    }
    return true
  };
  Edge.prototype.getCoordinate = function getCoordinate () {
    if (arguments.length === 0) {
      if (this.pts.length > 0) { return this.pts[0] }
      return null
    } else if (arguments.length === 1) {
      var i = arguments[0];
      return this.pts[i]
    }
  };
  Edge.prototype.print = function print (out) {
    var this$1 = this;

    out.print('edge ' + this._name + ': ');
    out.print('LINESTRING (');
    for (var i = 0; i < this.pts.length; i++) {
      if (i > 0) { out.print(','); }
      out.print(this$1.pts[i].x + ' ' + this$1.pts[i].y);
    }
    out.print(')  ' + this._label + ' ' + this._depthDelta);
  };
  Edge.prototype.computeIM = function computeIM (im) {
    Edge.updateIM(this._label, im);
  };
  Edge.prototype.isCollapsed = function isCollapsed () {
    if (!this._label.isArea()) { return false }
    if (this.pts.length !== 3) { return false }
    if (this.pts[0].equals(this.pts[2])) { return true }
    return false
  };
  Edge.prototype.isClosed = function isClosed () {
    return this.pts[0].equals(this.pts[this.pts.length - 1])
  };
  Edge.prototype.getMaximumSegmentIndex = function getMaximumSegmentIndex () {
    return this.pts.length - 1
  };
  Edge.prototype.getDepthDelta = function getDepthDelta () {
    return this._depthDelta
  };
  Edge.prototype.getNumPoints = function getNumPoints () {
    return this.pts.length
  };
  Edge.prototype.printReverse = function printReverse (out) {
    var this$1 = this;

    out.print('edge ' + this._name + ': ');
    for (var i = this.pts.length - 1; i >= 0; i--) {
      out.print(this$1.pts[i] + ' ');
    }
    out.println('');
  };
  Edge.prototype.getMonotoneChainEdge = function getMonotoneChainEdge () {
    if (this._mce === null) { this._mce = new MonotoneChainEdge(this); }
    return this._mce
  };
  Edge.prototype.getEnvelope = function getEnvelope () {
    var this$1 = this;

    if (this._env === null) {
      this._env = new Envelope();
      for (var i = 0; i < this.pts.length; i++) {
        this$1._env.expandToInclude(this$1.pts[i]);
      }
    }
    return this._env
  };
  Edge.prototype.addIntersection = function addIntersection (li, segmentIndex, geomIndex, intIndex) {
    var intPt = new Coordinate(li.getIntersection(intIndex));
    var normalizedSegmentIndex = segmentIndex;
    var dist = li.getEdgeDistance(geomIndex, intIndex);
    var nextSegIndex = normalizedSegmentIndex + 1;
    if (nextSegIndex < this.pts.length) {
      var nextPt = this.pts[nextSegIndex];
      if (intPt.equals2D(nextPt)) {
        normalizedSegmentIndex = nextSegIndex;
        dist = 0.0;
      }
    }
    this.eiList.add(intPt, normalizedSegmentIndex, dist);
  };
  Edge.prototype.toString = function toString () {
    var this$1 = this;

    var buf = new StringBuffer();
    buf.append('edge ' + this._name + ': ');
    buf.append('LINESTRING (');
    for (var i = 0; i < this.pts.length; i++) {
      if (i > 0) { buf.append(','); }
      buf.append(this$1.pts[i].x + ' ' + this$1.pts[i].y);
    }
    buf.append(')  ' + this._label + ' ' + this._depthDelta);
    return buf.toString()
  };
  Edge.prototype.isPointwiseEqual = function isPointwiseEqual (e) {
    var this$1 = this;

    if (this.pts.length !== e.pts.length) { return false }
    for (var i = 0; i < this.pts.length; i++) {
      if (!this$1.pts[i].equals2D(e.pts[i])) {
        return false
      }
    }
    return true
  };
  Edge.prototype.setDepthDelta = function setDepthDelta (depthDelta) {
    this._depthDelta = depthDelta;
  };
  Edge.prototype.getEdgeIntersectionList = function getEdgeIntersectionList () {
    return this.eiList
  };
  Edge.prototype.addIntersections = function addIntersections (li, segmentIndex, geomIndex) {
    var this$1 = this;

    for (var i = 0; i < li.getIntersectionNum(); i++) {
      this$1.addIntersection(li, segmentIndex, geomIndex, i);
    }
  };
  Edge.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  Edge.prototype.getClass = function getClass () {
    return Edge
  };
  Edge.updateIM = function updateIM () {
    if (arguments.length === 2) {
      var label = arguments[0];
      var im = arguments[1];
      im.setAtLeastIfValid(label.getLocation(0, Position.ON), label.getLocation(1, Position.ON), 1);
      if (label.isArea()) {
        im.setAtLeastIfValid(label.getLocation(0, Position.LEFT), label.getLocation(1, Position.LEFT), 2);
        im.setAtLeastIfValid(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), 2);
      }
    } else { return GraphComponent$$1.prototype.updateIM.apply(this, arguments) }
  };

  return Edge;
}(GraphComponent));

var BufferBuilder = function BufferBuilder (bufParams) {
  this._workingPrecisionModel = null;
  this._workingNoder = null;
  this._geomFact = null;
  this._graph = null;
  this._edgeList = new EdgeList();
  this._bufParams = bufParams || null;
};
BufferBuilder.prototype.setWorkingPrecisionModel = function setWorkingPrecisionModel (pm) {
  this._workingPrecisionModel = pm;
};
BufferBuilder.prototype.insertUniqueEdge = function insertUniqueEdge (e) {
  var existingEdge = this._edgeList.findEqualEdge(e);
  if (existingEdge !== null) {
    var existingLabel = existingEdge.getLabel();
    var labelToMerge = e.getLabel();
    if (!existingEdge.isPointwiseEqual(e)) {
      labelToMerge = new Label(e.getLabel());
      labelToMerge.flip();
    }
    existingLabel.merge(labelToMerge);
    var mergeDelta = BufferBuilder.depthDelta(labelToMerge);
    var existingDelta = existingEdge.getDepthDelta();
    var newDelta = existingDelta + mergeDelta;
    existingEdge.setDepthDelta(newDelta);
  } else {
    this._edgeList.add(e);
    e.setDepthDelta(BufferBuilder.depthDelta(e.getLabel()));
  }
};
BufferBuilder.prototype.buildSubgraphs = function buildSubgraphs (subgraphList, polyBuilder) {
  var processedGraphs = new ArrayList();
  for (var i = subgraphList.iterator(); i.hasNext();) {
    var subgraph = i.next();
    var p = subgraph.getRightmostCoordinate();
    var locater = new SubgraphDepthLocater(processedGraphs);
    var outsideDepth = locater.getDepth(p);
    subgraph.computeDepth(outsideDepth);
    subgraph.findResultEdges();
    processedGraphs.add(subgraph);
    polyBuilder.add(subgraph.getDirectedEdges(), subgraph.getNodes());
  }
};
BufferBuilder.prototype.createSubgraphs = function createSubgraphs (graph) {
  var subgraphList = new ArrayList();
  for (var i = graph.getNodes().iterator(); i.hasNext();) {
    var node = i.next();
    if (!node.isVisited()) {
      var subgraph = new BufferSubgraph();
      subgraph.create(node);
      subgraphList.add(subgraph);
    }
  }
  Collections.sort(subgraphList, Collections.reverseOrder());
  return subgraphList
};
BufferBuilder.prototype.createEmptyResultGeometry = function createEmptyResultGeometry () {
  var emptyGeom = this._geomFact.createPolygon();
  return emptyGeom
};
BufferBuilder.prototype.getNoder = function getNoder (precisionModel) {
  if (this._workingNoder !== null) { return this._workingNoder }
  var noder = new MCIndexNoder();
  var li = new RobustLineIntersector();
  li.setPrecisionModel(precisionModel);
  noder.setSegmentIntersector(new IntersectionAdder(li));
  return noder
};
BufferBuilder.prototype.buffer = function buffer (g, distance) {
  var precisionModel = this._workingPrecisionModel;
  if (precisionModel === null) { precisionModel = g.getPrecisionModel(); }
  this._geomFact = g.getFactory();
  var curveBuilder = new OffsetCurveBuilder(precisionModel, this._bufParams);
  var curveSetBuilder = new OffsetCurveSetBuilder(g, distance, curveBuilder);
  var bufferSegStrList = curveSetBuilder.getCurves();
  if (bufferSegStrList.size() <= 0) {
    return this.createEmptyResultGeometry()
  }
  this.computeNodedEdges(bufferSegStrList, precisionModel);
  this._graph = new PlanarGraph(new OverlayNodeFactory());
  this._graph.addEdges(this._edgeList.getEdges());
  var subgraphList = this.createSubgraphs(this._graph);
  var polyBuilder = new PolygonBuilder(this._geomFact);
  this.buildSubgraphs(subgraphList, polyBuilder);
  var resultPolyList = polyBuilder.getPolygons();
  if (resultPolyList.size() <= 0) {
    return this.createEmptyResultGeometry()
  }
  var resultGeom = this._geomFact.buildGeometry(resultPolyList);
  return resultGeom
};
BufferBuilder.prototype.computeNodedEdges = function computeNodedEdges (bufferSegStrList, precisionModel) {
    var this$1 = this;

  var noder = this.getNoder(precisionModel);
  noder.computeNodes(bufferSegStrList);
  var nodedSegStrings = noder.getNodedSubstrings();
  for (var i = nodedSegStrings.iterator(); i.hasNext();) {
    var segStr = i.next();
    var pts = segStr.getCoordinates();
    if (pts.length === 2 && pts[0].equals2D(pts[1])) { continue }
    var oldLabel = segStr.getData();
    var edge = new Edge(segStr.getCoordinates(), new Label(oldLabel));
    this$1.insertUniqueEdge(edge);
  }
};
BufferBuilder.prototype.setNoder = function setNoder (noder) {
  this._workingNoder = noder;
};
BufferBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferBuilder.prototype.getClass = function getClass () {
  return BufferBuilder
};
BufferBuilder.depthDelta = function depthDelta (label) {
  var lLoc = label.getLocation(0, Position.LEFT);
  var rLoc = label.getLocation(0, Position.RIGHT);
  if (lLoc === Location.INTERIOR && rLoc === Location.EXTERIOR) { return 1; } else if (lLoc === Location.EXTERIOR && rLoc === Location.INTERIOR) { return -1 }
  return 0
};
BufferBuilder.convertSegStrings = function convertSegStrings (it) {
  var fact = new GeometryFactory();
  var lines = new ArrayList();
  while (it.hasNext()) {
    var ss = it.next();
    var line = fact.createLineString(ss.getCoordinates());
    lines.add(line);
  }
  return fact.buildGeometry(lines)
};

var ScaledNoder = function ScaledNoder () {
  this._noder = null;
  this._scaleFactor = null;
  this._offsetX = null;
  this._offsetY = null;
  this._isScaled = false;
  if (arguments.length === 2) {
    var noder = arguments[0];
    var scaleFactor = arguments[1];
    this._noder = noder;
    this._scaleFactor = scaleFactor;
    this._offsetX = 0.0;
    this._offsetY = 0.0;
    this._isScaled = !this.isIntegerPrecision();
  } else if (arguments.length === 4) {
    var noder$1 = arguments[0];
    var scaleFactor$1 = arguments[1];
    var offsetX = arguments[2];
    var offsetY = arguments[3];
    this._noder = noder$1;
    this._scaleFactor = scaleFactor$1;
    this._offsetX = offsetX;
    this._offsetY = offsetY;
    this._isScaled = !this.isIntegerPrecision();
  }
};
ScaledNoder.prototype.rescale = function rescale () {
    var this$1 = this;

  if (hasInterface(arguments[0], Collection)) {
    var segStrings = arguments[0];
    for (var i = segStrings.iterator(); i.hasNext();) {
      var ss = i.next();
      this$1.rescale(ss.getCoordinates());
    }
  } else if (arguments[0] instanceof Array) {
    var pts = arguments[0];
    // let p0 = null
    // let p1 = null
    // if (pts.length === 2) {
    // p0 = new Coordinate(pts[0])
    // p1 = new Coordinate(pts[1])
    // }
    for (var i$1 = 0; i$1 < pts.length; i$1++) {
      pts[i$1].x = pts[i$1].x / this$1._scaleFactor + this$1._offsetX;
      pts[i$1].y = pts[i$1].y / this$1._scaleFactor + this$1._offsetY;
    }
    if (pts.length === 2 && pts[0].equals2D(pts[1])) {
      System.out.println(pts);
    }
  }
};
ScaledNoder.prototype.scale = function scale () {
    var this$1 = this;

  if (hasInterface(arguments[0], Collection)) {
    var segStrings = arguments[0];
    var nodedSegmentStrings = new ArrayList();
    for (var i = segStrings.iterator(); i.hasNext();) {
      var ss = i.next();
      nodedSegmentStrings.add(new NodedSegmentString(this$1.scale(ss.getCoordinates()), ss.getData()));
    }
    return nodedSegmentStrings
  } else if (arguments[0] instanceof Array) {
    var pts = arguments[0];
    var roundPts = new Array(pts.length).fill(null);
    for (var i$1 = 0; i$1 < pts.length; i$1++) {
      roundPts[i$1] = new Coordinate(Math.round((pts[i$1].x - this$1._offsetX) * this$1._scaleFactor), Math.round((pts[i$1].y - this$1._offsetY) * this$1._scaleFactor), pts[i$1].z);
    }
    var roundPtsNoDup = CoordinateArrays.removeRepeatedPoints(roundPts);
    return roundPtsNoDup
  }
};
ScaledNoder.prototype.isIntegerPrecision = function isIntegerPrecision () {
  return this._scaleFactor === 1.0
};
ScaledNoder.prototype.getNodedSubstrings = function getNodedSubstrings () {
  var splitSS = this._noder.getNodedSubstrings();
  if (this._isScaled) { this.rescale(splitSS); }
  return splitSS
};
ScaledNoder.prototype.computeNodes = function computeNodes (inputSegStrings) {
  var intSegStrings = inputSegStrings;
  if (this._isScaled) { intSegStrings = this.scale(inputSegStrings); }
  this._noder.computeNodes(intSegStrings);
};
ScaledNoder.prototype.interfaces_ = function interfaces_ () {
  return [Noder]
};
ScaledNoder.prototype.getClass = function getClass () {
  return ScaledNoder
};

var NodingValidator = function NodingValidator () {
  this._li = new RobustLineIntersector();
  this._segStrings = null;
  var segStrings = arguments[0];
  this._segStrings = segStrings;
};

var staticAccessors$33 = { fact: { configurable: true } };
NodingValidator.prototype.checkEndPtVertexIntersections = function checkEndPtVertexIntersections () {
    var this$1 = this;

  if (arguments.length === 0) {
    for (var i = this._segStrings.iterator(); i.hasNext();) {
      var ss = i.next();
      var pts = ss.getCoordinates();
      this$1.checkEndPtVertexIntersections(pts[0], this$1._segStrings);
      this$1.checkEndPtVertexIntersections(pts[pts.length - 1], this$1._segStrings);
    }
  } else if (arguments.length === 2) {
    var testPt = arguments[0];
    var segStrings = arguments[1];
    for (var i$1 = segStrings.iterator(); i$1.hasNext();) {
      var ss$1 = i$1.next();
      var pts$1 = ss$1.getCoordinates();
      for (var j = 1; j < pts$1.length - 1; j++) {
        if (pts$1[j].equals(testPt)) { throw new RuntimeException('found endpt/interior pt intersection at index ' + j + ' :pt ' + testPt) }
      }
    }
  }
};
NodingValidator.prototype.checkInteriorIntersections = function checkInteriorIntersections () {
    var this$1 = this;

  if (arguments.length === 0) {
    for (var i = this._segStrings.iterator(); i.hasNext();) {
      var ss0 = i.next();
      for (var j = this._segStrings.iterator(); j.hasNext();) {
        var ss1 = j.next();
        this$1.checkInteriorIntersections(ss0, ss1);
      }
    }
  } else if (arguments.length === 2) {
    var ss0$1 = arguments[0];
    var ss1$1 = arguments[1];
    var pts0 = ss0$1.getCoordinates();
    var pts1 = ss1$1.getCoordinates();
    for (var i0 = 0; i0 < pts0.length - 1; i0++) {
      for (var i1 = 0; i1 < pts1.length - 1; i1++) {
        this$1.checkInteriorIntersections(ss0$1, i0, ss1$1, i1);
      }
    }
  } else if (arguments.length === 4) {
    var e0 = arguments[0];
    var segIndex0 = arguments[1];
    var e1 = arguments[2];
    var segIndex1 = arguments[3];
    if (e0 === e1 && segIndex0 === segIndex1) { return null }
    var p00 = e0.getCoordinates()[segIndex0];
    var p01 = e0.getCoordinates()[segIndex0 + 1];
    var p10 = e1.getCoordinates()[segIndex1];
    var p11 = e1.getCoordinates()[segIndex1 + 1];
    this._li.computeIntersection(p00, p01, p10, p11);
    if (this._li.hasIntersection()) {
      if (this._li.isProper() || this.hasInteriorIntersection(this._li, p00, p01) || this.hasInteriorIntersection(this._li, p10, p11)) {
        throw new RuntimeException('found non-noded intersection at ' + p00 + '-' + p01 + ' and ' + p10 + '-' + p11)
      }
    }
  }
};
NodingValidator.prototype.checkValid = function checkValid () {
  this.checkEndPtVertexIntersections();
  this.checkInteriorIntersections();
  this.checkCollapses();
};
NodingValidator.prototype.checkCollapses = function checkCollapses () {
    var this$1 = this;

  if (arguments.length === 0) {
    for (var i = this._segStrings.iterator(); i.hasNext();) {
      var ss = i.next();
      this$1.checkCollapses(ss);
    }
  } else if (arguments.length === 1) {
    var ss$1 = arguments[0];
    var pts = ss$1.getCoordinates();
    for (var i$1 = 0; i$1 < pts.length - 2; i$1++) {
      this$1.checkCollapse(pts[i$1], pts[i$1 + 1], pts[i$1 + 2]);
    }
  }
};
NodingValidator.prototype.hasInteriorIntersection = function hasInteriorIntersection (li, p0, p1) {
  for (var i = 0; i < li.getIntersectionNum(); i++) {
    var intPt = li.getIntersection(i);
    if (!(intPt.equals(p0) || intPt.equals(p1))) { return true }
  }
  return false
};
NodingValidator.prototype.checkCollapse = function checkCollapse (p0, p1, p2) {
  if (p0.equals(p2)) { throw new RuntimeException('found non-noded collapse at ' + NodingValidator.fact.createLineString([p0, p1, p2])) }
};
NodingValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
NodingValidator.prototype.getClass = function getClass () {
  return NodingValidator
};
staticAccessors$33.fact.get = function () { return new GeometryFactory() };

Object.defineProperties( NodingValidator, staticAccessors$33 );

var HotPixel = function HotPixel () {
  this._li = null;
  this._pt = null;
  this._originalPt = null;
  this._ptScaled = null;
  this._p0Scaled = null;
  this._p1Scaled = null;
  this._scaleFactor = null;
  this._minx = null;
  this._maxx = null;
  this._miny = null;
  this._maxy = null;
  this._corner = new Array(4).fill(null);
  this._safeEnv = null;
  var pt = arguments[0];
  var scaleFactor = arguments[1];
  var li = arguments[2];
  this._originalPt = pt;
  this._pt = pt;
  this._scaleFactor = scaleFactor;
  this._li = li;
  if (scaleFactor <= 0) { throw new IllegalArgumentException('Scale factor must be non-zero') }
  if (scaleFactor !== 1.0) {
    this._pt = new Coordinate(this.scale(pt.x), this.scale(pt.y));
    this._p0Scaled = new Coordinate();
    this._p1Scaled = new Coordinate();
  }
  this.initCorners(this._pt);
};

var staticAccessors$34 = { SAFE_ENV_EXPANSION_FACTOR: { configurable: true } };
HotPixel.prototype.intersectsScaled = function intersectsScaled (p0, p1) {
  var segMinx = Math.min(p0.x, p1.x);
  var segMaxx = Math.max(p0.x, p1.x);
  var segMiny = Math.min(p0.y, p1.y);
  var segMaxy = Math.max(p0.y, p1.y);
  var isOutsidePixelEnv = this._maxx < segMinx || this._minx > segMaxx || this._maxy < segMiny || this._miny > segMaxy;
  if (isOutsidePixelEnv) { return false }
  var intersects = this.intersectsToleranceSquare(p0, p1);
  Assert.isTrue(!(isOutsidePixelEnv && intersects), 'Found bad envelope test');
  return intersects
};
HotPixel.prototype.initCorners = function initCorners (pt) {
  var tolerance = 0.5;
  this._minx = pt.x - tolerance;
  this._maxx = pt.x + tolerance;
  this._miny = pt.y - tolerance;
  this._maxy = pt.y + tolerance;
  this._corner[0] = new Coordinate(this._maxx, this._maxy);
  this._corner[1] = new Coordinate(this._minx, this._maxy);
  this._corner[2] = new Coordinate(this._minx, this._miny);
  this._corner[3] = new Coordinate(this._maxx, this._miny);
};
HotPixel.prototype.intersects = function intersects (p0, p1) {
  if (this._scaleFactor === 1.0) { return this.intersectsScaled(p0, p1) }
  this.copyScaled(p0, this._p0Scaled);
  this.copyScaled(p1, this._p1Scaled);
  return this.intersectsScaled(this._p0Scaled, this._p1Scaled)
};
HotPixel.prototype.scale = function scale (val) {
  return Math.round(val * this._scaleFactor)
};
HotPixel.prototype.getCoordinate = function getCoordinate () {
  return this._originalPt
};
HotPixel.prototype.copyScaled = function copyScaled (p, pScaled) {
  pScaled.x = this.scale(p.x);
  pScaled.y = this.scale(p.y);
};
HotPixel.prototype.getSafeEnvelope = function getSafeEnvelope () {
  if (this._safeEnv === null) {
    var safeTolerance = HotPixel.SAFE_ENV_EXPANSION_FACTOR / this._scaleFactor;
    this._safeEnv = new Envelope(this._originalPt.x - safeTolerance, this._originalPt.x + safeTolerance, this._originalPt.y - safeTolerance, this._originalPt.y + safeTolerance);
  }
  return this._safeEnv
};
HotPixel.prototype.intersectsPixelClosure = function intersectsPixelClosure (p0, p1) {
  this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1]);
  if (this._li.hasIntersection()) { return true }
  this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2]);
  if (this._li.hasIntersection()) { return true }
  this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3]);
  if (this._li.hasIntersection()) { return true }
  this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0]);
  if (this._li.hasIntersection()) { return true }
  return false
};
HotPixel.prototype.intersectsToleranceSquare = function intersectsToleranceSquare (p0, p1) {
  var intersectsLeft = false;
  var intersectsBottom = false;
  this._li.computeIntersection(p0, p1, this._corner[0], this._corner[1]);
  if (this._li.isProper()) { return true }
  this._li.computeIntersection(p0, p1, this._corner[1], this._corner[2]);
  if (this._li.isProper()) { return true }
  if (this._li.hasIntersection()) { intersectsLeft = true; }
  this._li.computeIntersection(p0, p1, this._corner[2], this._corner[3]);
  if (this._li.isProper()) { return true }
  if (this._li.hasIntersection()) { intersectsBottom = true; }
  this._li.computeIntersection(p0, p1, this._corner[3], this._corner[0]);
  if (this._li.isProper()) { return true }
  if (intersectsLeft && intersectsBottom) { return true }
  if (p0.equals(this._pt)) { return true }
  if (p1.equals(this._pt)) { return true }
  return false
};
HotPixel.prototype.addSnappedNode = function addSnappedNode (segStr, segIndex) {
  var p0 = segStr.getCoordinate(segIndex);
  var p1 = segStr.getCoordinate(segIndex + 1);
  if (this.intersects(p0, p1)) {
    segStr.addIntersection(this.getCoordinate(), segIndex);
    return true
  }
  return false
};
HotPixel.prototype.interfaces_ = function interfaces_ () {
  return []
};
HotPixel.prototype.getClass = function getClass () {
  return HotPixel
};
staticAccessors$34.SAFE_ENV_EXPANSION_FACTOR.get = function () { return 0.75 };

Object.defineProperties( HotPixel, staticAccessors$34 );

var MonotoneChainSelectAction = function MonotoneChainSelectAction () {
  this.tempEnv1 = new Envelope();
  this.selectedSegment = new LineSegment();
};
MonotoneChainSelectAction.prototype.select = function select () {
  if (arguments.length === 1) {
    // const seg = arguments[0]
  } else if (arguments.length === 2) {
    var mc = arguments[0];
    var startIndex = arguments[1];
    mc.getLineSegment(startIndex, this.selectedSegment);
    this.select(this.selectedSegment);
  }
};
MonotoneChainSelectAction.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChainSelectAction.prototype.getClass = function getClass () {
  return MonotoneChainSelectAction
};

var MCIndexPointSnapper = function MCIndexPointSnapper () {
  this._index = null;
  var index = arguments[0];
  this._index = index;
};

var staticAccessors$35 = { HotPixelSnapAction: { configurable: true } };
MCIndexPointSnapper.prototype.snap = function snap () {
  if (arguments.length === 1) {
    var hotPixel = arguments[0];
    return this.snap(hotPixel, null, -1)
  } else if (arguments.length === 3) {
    var hotPixel$1 = arguments[0];
    var parentEdge = arguments[1];
    var hotPixelVertexIndex = arguments[2];
    var pixelEnv = hotPixel$1.getSafeEnvelope();
    var hotPixelSnapAction = new HotPixelSnapAction(hotPixel$1, parentEdge, hotPixelVertexIndex);
    this._index.query(pixelEnv, {
      interfaces_: function () {
        return [ItemVisitor]
      },
      visitItem: function (item) {
        var testChain = item;
        testChain.select(pixelEnv, hotPixelSnapAction);
      }
    });
    return hotPixelSnapAction.isNodeAdded()
  }
};
MCIndexPointSnapper.prototype.interfaces_ = function interfaces_ () {
  return []
};
MCIndexPointSnapper.prototype.getClass = function getClass () {
  return MCIndexPointSnapper
};
staticAccessors$35.HotPixelSnapAction.get = function () { return HotPixelSnapAction };

Object.defineProperties( MCIndexPointSnapper, staticAccessors$35 );

var HotPixelSnapAction = (function (MonotoneChainSelectAction$$1) {
  function HotPixelSnapAction () {
    MonotoneChainSelectAction$$1.call(this);
    this._hotPixel = null;
    this._parentEdge = null;
    this._hotPixelVertexIndex = null;
    this._isNodeAdded = false;
    var hotPixel = arguments[0];
    var parentEdge = arguments[1];
    var hotPixelVertexIndex = arguments[2];
    this._hotPixel = hotPixel;
    this._parentEdge = parentEdge;
    this._hotPixelVertexIndex = hotPixelVertexIndex;
  }

  if ( MonotoneChainSelectAction$$1 ) HotPixelSnapAction.__proto__ = MonotoneChainSelectAction$$1;
  HotPixelSnapAction.prototype = Object.create( MonotoneChainSelectAction$$1 && MonotoneChainSelectAction$$1.prototype );
  HotPixelSnapAction.prototype.constructor = HotPixelSnapAction;
  HotPixelSnapAction.prototype.isNodeAdded = function isNodeAdded () {
    return this._isNodeAdded
  };
  HotPixelSnapAction.prototype.select = function select () {
    if (arguments.length === 2) {
      var mc = arguments[0];
      var startIndex = arguments[1];
      var ss = mc.getContext();
      if (this._parentEdge !== null) {
        if (ss === this._parentEdge && startIndex === this._hotPixelVertexIndex) { return null }
      }
      this._isNodeAdded = this._hotPixel.addSnappedNode(ss, startIndex);
    } else { return MonotoneChainSelectAction$$1.prototype.select.apply(this, arguments) }
  };
  HotPixelSnapAction.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  HotPixelSnapAction.prototype.getClass = function getClass () {
    return HotPixelSnapAction
  };

  return HotPixelSnapAction;
}(MonotoneChainSelectAction));

var InteriorIntersectionFinderAdder = function InteriorIntersectionFinderAdder () {
  this._li = null;
  this._interiorIntersections = null;
  var li = arguments[0];
  this._li = li;
  this._interiorIntersections = new ArrayList();
};
InteriorIntersectionFinderAdder.prototype.processIntersections = function processIntersections (e0, segIndex0, e1, segIndex1) {
    var this$1 = this;

  if (e0 === e1 && segIndex0 === segIndex1) { return null }
  var p00 = e0.getCoordinates()[segIndex0];
  var p01 = e0.getCoordinates()[segIndex0 + 1];
  var p10 = e1.getCoordinates()[segIndex1];
  var p11 = e1.getCoordinates()[segIndex1 + 1];
  this._li.computeIntersection(p00, p01, p10, p11);
  if (this._li.hasIntersection()) {
    if (this._li.isInteriorIntersection()) {
      for (var intIndex = 0; intIndex < this._li.getIntersectionNum(); intIndex++) {
        this$1._interiorIntersections.add(this$1._li.getIntersection(intIndex));
      }
      e0.addIntersections(this._li, segIndex0, 0);
      e1.addIntersections(this._li, segIndex1, 1);
    }
  }
};
InteriorIntersectionFinderAdder.prototype.isDone = function isDone () {
  return false
};
InteriorIntersectionFinderAdder.prototype.getInteriorIntersections = function getInteriorIntersections () {
  return this._interiorIntersections
};
InteriorIntersectionFinderAdder.prototype.interfaces_ = function interfaces_ () {
  return [SegmentIntersector]
};
InteriorIntersectionFinderAdder.prototype.getClass = function getClass () {
  return InteriorIntersectionFinderAdder
};

var MCIndexSnapRounder = function MCIndexSnapRounder () {
  this._pm = null;
  this._li = null;
  this._scaleFactor = null;
  this._noder = null;
  this._pointSnapper = null;
  this._nodedSegStrings = null;
  var pm = arguments[0];
  this._pm = pm;
  this._li = new RobustLineIntersector();
  this._li.setPrecisionModel(pm);
  this._scaleFactor = pm.getScale();
};
MCIndexSnapRounder.prototype.checkCorrectness = function checkCorrectness (inputSegmentStrings) {
  var resultSegStrings = NodedSegmentString.getNodedSubstrings(inputSegmentStrings);
  var nv = new NodingValidator(resultSegStrings);
  try {
    nv.checkValid();
  } catch (ex) {
    if (ex instanceof Exception) {
      ex.printStackTrace();
    } else { throw ex }
  } finally {}
};
MCIndexSnapRounder.prototype.getNodedSubstrings = function getNodedSubstrings () {
  return NodedSegmentString.getNodedSubstrings(this._nodedSegStrings)
};
MCIndexSnapRounder.prototype.snapRound = function snapRound (segStrings, li) {
  var intersections = this.findInteriorIntersections(segStrings, li);
  this.computeIntersectionSnaps(intersections);
  this.computeVertexSnaps(segStrings);
};
MCIndexSnapRounder.prototype.findInteriorIntersections = function findInteriorIntersections (segStrings, li) {
  var intFinderAdder = new InteriorIntersectionFinderAdder(li);
  this._noder.setSegmentIntersector(intFinderAdder);
  this._noder.computeNodes(segStrings);
  return intFinderAdder.getInteriorIntersections()
};
MCIndexSnapRounder.prototype.computeVertexSnaps = function computeVertexSnaps () {
    var this$1 = this;

  if (hasInterface(arguments[0], Collection)) {
    var edges = arguments[0];
    for (var i0 = edges.iterator(); i0.hasNext();) {
      var edge0 = i0.next();
      this$1.computeVertexSnaps(edge0);
    }
  } else if (arguments[0] instanceof NodedSegmentString) {
    var e = arguments[0];
    var pts0 = e.getCoordinates();
    for (var i = 0; i < pts0.length; i++) {
      var hotPixel = new HotPixel(pts0[i], this$1._scaleFactor, this$1._li);
      var isNodeAdded = this$1._pointSnapper.snap(hotPixel, e, i);
      if (isNodeAdded) {
        e.addIntersection(pts0[i], i);
      }
    }
  }
};
MCIndexSnapRounder.prototype.computeNodes = function computeNodes (inputSegmentStrings) {
  this._nodedSegStrings = inputSegmentStrings;
  this._noder = new MCIndexNoder();
  this._pointSnapper = new MCIndexPointSnapper(this._noder.getIndex());
  this.snapRound(inputSegmentStrings, this._li);
};
MCIndexSnapRounder.prototype.computeIntersectionSnaps = function computeIntersectionSnaps (snapPts) {
    var this$1 = this;

  for (var it = snapPts.iterator(); it.hasNext();) {
    var snapPt = it.next();
    var hotPixel = new HotPixel(snapPt, this$1._scaleFactor, this$1._li);
    this$1._pointSnapper.snap(hotPixel);
  }
};
MCIndexSnapRounder.prototype.interfaces_ = function interfaces_ () {
  return [Noder]
};
MCIndexSnapRounder.prototype.getClass = function getClass () {
  return MCIndexSnapRounder
};

var BufferOp = function BufferOp () {
  this._argGeom = null;
  this._distance = null;
  this._bufParams = new BufferParameters();
  this._resultGeometry = null;
  this._saveException = null;
  if (arguments.length === 1) {
    var g = arguments[0];
    this._argGeom = g;
  } else if (arguments.length === 2) {
    var g$1 = arguments[0];
    var bufParams = arguments[1];
    this._argGeom = g$1;
    this._bufParams = bufParams;
  }
};

var staticAccessors$32 = { CAP_ROUND: { configurable: true },CAP_BUTT: { configurable: true },CAP_FLAT: { configurable: true },CAP_SQUARE: { configurable: true },MAX_PRECISION_DIGITS: { configurable: true } };
BufferOp.prototype.bufferFixedPrecision = function bufferFixedPrecision (fixedPM) {
  var noder = new ScaledNoder(new MCIndexSnapRounder(new PrecisionModel(1.0)), fixedPM.getScale());
  var bufBuilder = new BufferBuilder(this._bufParams);
  bufBuilder.setWorkingPrecisionModel(fixedPM);
  bufBuilder.setNoder(noder);
  this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance);
};
BufferOp.prototype.bufferReducedPrecision = function bufferReducedPrecision () {
    var this$1 = this;

  if (arguments.length === 0) {
    for (var precDigits = BufferOp.MAX_PRECISION_DIGITS; precDigits >= 0; precDigits--) {
      try {
        this$1.bufferReducedPrecision(precDigits);
      } catch (ex) {
        if (ex instanceof TopologyException) {
          this$1._saveException = ex;
        } else { throw ex }
      } finally {}
      if (this$1._resultGeometry !== null) { return null }
    }
    throw this._saveException
  } else if (arguments.length === 1) {
    var precisionDigits = arguments[0];
    var sizeBasedScaleFactor = BufferOp.precisionScaleFactor(this._argGeom, this._distance, precisionDigits);
    var fixedPM = new PrecisionModel(sizeBasedScaleFactor);
    this.bufferFixedPrecision(fixedPM);
  }
};
BufferOp.prototype.computeGeometry = function computeGeometry () {
  this.bufferOriginalPrecision();
  if (this._resultGeometry !== null) { return null }
  var argPM = this._argGeom.getFactory().getPrecisionModel();
  if (argPM.getType() === PrecisionModel.FIXED) { this.bufferFixedPrecision(argPM); } else { this.bufferReducedPrecision(); }
};
BufferOp.prototype.setQuadrantSegments = function setQuadrantSegments (quadrantSegments) {
  this._bufParams.setQuadrantSegments(quadrantSegments);
};
BufferOp.prototype.bufferOriginalPrecision = function bufferOriginalPrecision () {
  try {
    var bufBuilder = new BufferBuilder(this._bufParams);
    this._resultGeometry = bufBuilder.buffer(this._argGeom, this._distance);
  } catch (ex) {
    if (ex instanceof RuntimeException) {
      this._saveException = ex;
    } else { throw ex }
  } finally {}
};
BufferOp.prototype.getResultGeometry = function getResultGeometry (distance) {
  this._distance = distance;
  this.computeGeometry();
  return this._resultGeometry
};
BufferOp.prototype.setEndCapStyle = function setEndCapStyle (endCapStyle) {
  this._bufParams.setEndCapStyle(endCapStyle);
};
BufferOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferOp.prototype.getClass = function getClass () {
  return BufferOp
};
BufferOp.bufferOp = function bufferOp () {
  if (arguments.length === 2) {
    var g = arguments[0];
    var distance = arguments[1];
    var gBuf = new BufferOp(g);
    var geomBuf = gBuf.getResultGeometry(distance);
    return geomBuf
  } else if (arguments.length === 3) {
    if (Number.isInteger(arguments[2]) && (arguments[0] instanceof Geometry && typeof arguments[1] === 'number')) {
      var g$1 = arguments[0];
      var distance$1 = arguments[1];
      var quadrantSegments = arguments[2];
      var bufOp = new BufferOp(g$1);
      bufOp.setQuadrantSegments(quadrantSegments);
      var geomBuf$1 = bufOp.getResultGeometry(distance$1);
      return geomBuf$1
    } else if (arguments[2] instanceof BufferParameters && (arguments[0] instanceof Geometry && typeof arguments[1] === 'number')) {
      var g$2 = arguments[0];
      var distance$2 = arguments[1];
      var params = arguments[2];
      var bufOp$1 = new BufferOp(g$2, params);
      var geomBuf$2 = bufOp$1.getResultGeometry(distance$2);
      return geomBuf$2
    }
  } else if (arguments.length === 4) {
    var g$3 = arguments[0];
    var distance$3 = arguments[1];
    var quadrantSegments$1 = arguments[2];
    var endCapStyle = arguments[3];
    var bufOp$2 = new BufferOp(g$3);
    bufOp$2.setQuadrantSegments(quadrantSegments$1);
    bufOp$2.setEndCapStyle(endCapStyle);
    var geomBuf$3 = bufOp$2.getResultGeometry(distance$3);
    return geomBuf$3
  }
};
BufferOp.precisionScaleFactor = function precisionScaleFactor (g, distance, maxPrecisionDigits) {
  var env = g.getEnvelopeInternal();
  var envMax = MathUtil.max(Math.abs(env.getMaxX()), Math.abs(env.getMaxY()), Math.abs(env.getMinX()), Math.abs(env.getMinY()));
  var expandByDistance = distance > 0.0 ? distance : 0.0;
  var bufEnvMax = envMax + 2 * expandByDistance;
  var bufEnvPrecisionDigits = Math.trunc(Math.log(bufEnvMax) / Math.log(10) + 1.0);
  var minUnitLog10 = maxPrecisionDigits - bufEnvPrecisionDigits;
  var scaleFactor = Math.pow(10.0, minUnitLog10);
  return scaleFactor
};
staticAccessors$32.CAP_ROUND.get = function () { return BufferParameters.CAP_ROUND };
staticAccessors$32.CAP_BUTT.get = function () { return BufferParameters.CAP_FLAT };
staticAccessors$32.CAP_FLAT.get = function () { return BufferParameters.CAP_FLAT };
staticAccessors$32.CAP_SQUARE.get = function () { return BufferParameters.CAP_SQUARE };
staticAccessors$32.MAX_PRECISION_DIGITS.get = function () { return 12 };

Object.defineProperties( BufferOp, staticAccessors$32 );

var PointPairDistance = function PointPairDistance () {
  this._pt = [new Coordinate(), new Coordinate()];
  this._distance = Double.NaN;
  this._isNull = true;
};
PointPairDistance.prototype.getCoordinates = function getCoordinates () {
  return this._pt
};
PointPairDistance.prototype.getCoordinate = function getCoordinate (i) {
  return this._pt[i]
};
PointPairDistance.prototype.setMinimum = function setMinimum () {
  if (arguments.length === 1) {
    var ptDist = arguments[0];
    this.setMinimum(ptDist._pt[0], ptDist._pt[1]);
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    if (this._isNull) {
      this.initialize(p0, p1);
      return null
    }
    var dist = p0.distance(p1);
    if (dist < this._distance) { this.initialize(p0, p1, dist); }
  }
};
PointPairDistance.prototype.initialize = function initialize () {
  if (arguments.length === 0) {
    this._isNull = true;
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    this._pt[0].setCoordinate(p0);
    this._pt[1].setCoordinate(p1);
    this._distance = p0.distance(p1);
    this._isNull = false;
  } else if (arguments.length === 3) {
    var p0$1 = arguments[0];
    var p1$1 = arguments[1];
    var distance = arguments[2];
    this._pt[0].setCoordinate(p0$1);
    this._pt[1].setCoordinate(p1$1);
    this._distance = distance;
    this._isNull = false;
  }
};
PointPairDistance.prototype.getDistance = function getDistance () {
  return this._distance
};
PointPairDistance.prototype.setMaximum = function setMaximum () {
  if (arguments.length === 1) {
    var ptDist = arguments[0];
    this.setMaximum(ptDist._pt[0], ptDist._pt[1]);
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    if (this._isNull) {
      this.initialize(p0, p1);
      return null
    }
    var dist = p0.distance(p1);
    if (dist > this._distance) { this.initialize(p0, p1, dist); }
  }
};
PointPairDistance.prototype.interfaces_ = function interfaces_ () {
  return []
};
PointPairDistance.prototype.getClass = function getClass () {
  return PointPairDistance
};

var DistanceToPointFinder = function DistanceToPointFinder () {};

DistanceToPointFinder.prototype.interfaces_ = function interfaces_ () {
  return []
};
DistanceToPointFinder.prototype.getClass = function getClass () {
  return DistanceToPointFinder
};
DistanceToPointFinder.computeDistance = function computeDistance () {
  if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineString && arguments[1] instanceof Coordinate)) {
    var line = arguments[0];
    var pt = arguments[1];
    var ptDist = arguments[2];
    var coords = line.getCoordinates();
    var tempSegment = new LineSegment();
    for (var i = 0; i < coords.length - 1; i++) {
      tempSegment.setCoordinates(coords[i], coords[i + 1]);
      var closestPt = tempSegment.closestPoint(pt);
      ptDist.setMinimum(closestPt, pt);
    }
  } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Polygon && arguments[1] instanceof Coordinate)) {
    var poly = arguments[0];
    var pt$1 = arguments[1];
    var ptDist$1 = arguments[2];
    DistanceToPointFinder.computeDistance(poly.getExteriorRing(), pt$1, ptDist$1);
    for (var i$1 = 0; i$1 < poly.getNumInteriorRing(); i$1++) {
      DistanceToPointFinder.computeDistance(poly.getInteriorRingN(i$1), pt$1, ptDist$1);
    }
  } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof Geometry && arguments[1] instanceof Coordinate)) {
    var geom = arguments[0];
    var pt$2 = arguments[1];
    var ptDist$2 = arguments[2];
    if (geom instanceof LineString) {
      DistanceToPointFinder.computeDistance(geom, pt$2, ptDist$2);
    } else if (geom instanceof Polygon) {
      DistanceToPointFinder.computeDistance(geom, pt$2, ptDist$2);
    } else if (geom instanceof GeometryCollection) {
      var gc = geom;
      for (var i$2 = 0; i$2 < gc.getNumGeometries(); i$2++) {
        var g = gc.getGeometryN(i$2);
        DistanceToPointFinder.computeDistance(g, pt$2, ptDist$2);
      }
    } else {
      ptDist$2.setMinimum(geom.getCoordinate(), pt$2);
    }
  } else if (arguments[2] instanceof PointPairDistance && (arguments[0] instanceof LineSegment && arguments[1] instanceof Coordinate)) {
    var segment = arguments[0];
    var pt$3 = arguments[1];
    var ptDist$3 = arguments[2];
    var closestPt$1 = segment.closestPoint(pt$3);
    ptDist$3.setMinimum(closestPt$1, pt$3);
  }
};

var BufferCurveMaximumDistanceFinder = function BufferCurveMaximumDistanceFinder (inputGeom) {
  this._maxPtDist = new PointPairDistance();
  this._inputGeom = inputGeom || null;
};

var staticAccessors$36 = { MaxPointDistanceFilter: { configurable: true },MaxMidpointDistanceFilter: { configurable: true } };
BufferCurveMaximumDistanceFinder.prototype.computeMaxMidpointDistance = function computeMaxMidpointDistance (curve) {
  var distFilter = new MaxMidpointDistanceFilter(this._inputGeom);
  curve.apply(distFilter);
  this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
};
BufferCurveMaximumDistanceFinder.prototype.computeMaxVertexDistance = function computeMaxVertexDistance (curve) {
  var distFilter = new MaxPointDistanceFilter(this._inputGeom);
  curve.apply(distFilter);
  this._maxPtDist.setMaximum(distFilter.getMaxPointDistance());
};
BufferCurveMaximumDistanceFinder.prototype.findDistance = function findDistance (bufferCurve) {
  this.computeMaxVertexDistance(bufferCurve);
  this.computeMaxMidpointDistance(bufferCurve);
  return this._maxPtDist.getDistance()
};
BufferCurveMaximumDistanceFinder.prototype.getDistancePoints = function getDistancePoints () {
  return this._maxPtDist
};
BufferCurveMaximumDistanceFinder.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferCurveMaximumDistanceFinder.prototype.getClass = function getClass () {
  return BufferCurveMaximumDistanceFinder
};
staticAccessors$36.MaxPointDistanceFilter.get = function () { return MaxPointDistanceFilter };
staticAccessors$36.MaxMidpointDistanceFilter.get = function () { return MaxMidpointDistanceFilter };

Object.defineProperties( BufferCurveMaximumDistanceFinder, staticAccessors$36 );

var MaxPointDistanceFilter = function MaxPointDistanceFilter (geom) {
  this._maxPtDist = new PointPairDistance();
  this._minPtDist = new PointPairDistance();
  this._geom = geom || null;
};
MaxPointDistanceFilter.prototype.filter = function filter (pt) {
  this._minPtDist.initialize();
  DistanceToPointFinder.computeDistance(this._geom, pt, this._minPtDist);
  this._maxPtDist.setMaximum(this._minPtDist);
};
MaxPointDistanceFilter.prototype.getMaxPointDistance = function getMaxPointDistance () {
  return this._maxPtDist
};
MaxPointDistanceFilter.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateFilter]
};
MaxPointDistanceFilter.prototype.getClass = function getClass () {
  return MaxPointDistanceFilter
};

var MaxMidpointDistanceFilter = function MaxMidpointDistanceFilter (geom) {
  this._maxPtDist = new PointPairDistance();
  this._minPtDist = new PointPairDistance();
  this._geom = geom || null;
};
MaxMidpointDistanceFilter.prototype.filter = function filter (seq, index) {
  if (index === 0) { return null }
  var p0 = seq.getCoordinate(index - 1);
  var p1 = seq.getCoordinate(index);
  var midPt = new Coordinate((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
  this._minPtDist.initialize();
  DistanceToPointFinder.computeDistance(this._geom, midPt, this._minPtDist);
  this._maxPtDist.setMaximum(this._minPtDist);
};
MaxMidpointDistanceFilter.prototype.isDone = function isDone () {
  return false
};
MaxMidpointDistanceFilter.prototype.isGeometryChanged = function isGeometryChanged () {
  return false
};
MaxMidpointDistanceFilter.prototype.getMaxPointDistance = function getMaxPointDistance () {
  return this._maxPtDist
};
MaxMidpointDistanceFilter.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateSequenceFilter]
};
MaxMidpointDistanceFilter.prototype.getClass = function getClass () {
  return MaxMidpointDistanceFilter
};

var PolygonExtracter = function PolygonExtracter (comps) {
  this._comps = comps || null;
};
PolygonExtracter.prototype.filter = function filter (geom) {
  if (geom instanceof Polygon) { this._comps.add(geom); }
};
PolygonExtracter.prototype.interfaces_ = function interfaces_ () {
  return [GeometryFilter]
};
PolygonExtracter.prototype.getClass = function getClass () {
  return PolygonExtracter
};
PolygonExtracter.getPolygons = function getPolygons () {
  if (arguments.length === 1) {
    var geom = arguments[0];
    return PolygonExtracter.getPolygons(geom, new ArrayList())
  } else if (arguments.length === 2) {
    var geom$1 = arguments[0];
    var list = arguments[1];
    if (geom$1 instanceof Polygon) {
      list.add(geom$1);
    } else if (geom$1 instanceof GeometryCollection) {
      geom$1.apply(new PolygonExtracter(list));
    }
    return list
  }
};

var LinearComponentExtracter = function LinearComponentExtracter () {
  this._lines = null;
  this._isForcedToLineString = false;
  if (arguments.length === 1) {
    var lines = arguments[0];
    this._lines = lines;
  } else if (arguments.length === 2) {
    var lines$1 = arguments[0];
    var isForcedToLineString = arguments[1];
    this._lines = lines$1;
    this._isForcedToLineString = isForcedToLineString;
  }
};
LinearComponentExtracter.prototype.filter = function filter (geom) {
  if (this._isForcedToLineString && geom instanceof LinearRing) {
    var line = geom.getFactory().createLineString(geom.getCoordinateSequence());
    this._lines.add(line);
    return null
  }
  if (geom instanceof LineString) { this._lines.add(geom); }
};
LinearComponentExtracter.prototype.setForceToLineString = function setForceToLineString (isForcedToLineString) {
  this._isForcedToLineString = isForcedToLineString;
};
LinearComponentExtracter.prototype.interfaces_ = function interfaces_ () {
  return [GeometryComponentFilter]
};
LinearComponentExtracter.prototype.getClass = function getClass () {
  return LinearComponentExtracter
};
LinearComponentExtracter.getGeometry = function getGeometry () {
  if (arguments.length === 1) {
    var geom = arguments[0];
    return geom.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom))
  } else if (arguments.length === 2) {
    var geom$1 = arguments[0];
    var forceToLineString = arguments[1];
    return geom$1.getFactory().buildGeometry(LinearComponentExtracter.getLines(geom$1, forceToLineString))
  }
};
LinearComponentExtracter.getLines = function getLines () {
  if (arguments.length === 1) {
    var geom = arguments[0];
    return LinearComponentExtracter.getLines(geom, false)
  } else if (arguments.length === 2) {
    if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection)) {
      var geoms = arguments[0];
      var lines$1 = arguments[1];
      for (var i = geoms.iterator(); i.hasNext();) {
        var g = i.next();
        LinearComponentExtracter.getLines(g, lines$1);
      }
      return lines$1
    } else if (arguments[0] instanceof Geometry && typeof arguments[1] === 'boolean') {
      var geom$1 = arguments[0];
      var forceToLineString = arguments[1];
      var lines = new ArrayList();
      geom$1.apply(new LinearComponentExtracter(lines, forceToLineString));
      return lines
    } else if (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection)) {
      var geom$2 = arguments[0];
      var lines$2 = arguments[1];
      if (geom$2 instanceof LineString) {
        lines$2.add(geom$2);
      } else {
        geom$2.apply(new LinearComponentExtracter(lines$2));
      }
      return lines$2
    }
  } else if (arguments.length === 3) {
    if (typeof arguments[2] === 'boolean' && (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], Collection))) {
      var geoms$1 = arguments[0];
      var lines$3 = arguments[1];
      var forceToLineString$1 = arguments[2];
      for (var i$1 = geoms$1.iterator(); i$1.hasNext();) {
        var g$1 = i$1.next();
        LinearComponentExtracter.getLines(g$1, lines$3, forceToLineString$1);
      }
      return lines$3
    } else if (typeof arguments[2] === 'boolean' && (arguments[0] instanceof Geometry && hasInterface(arguments[1], Collection))) {
      var geom$3 = arguments[0];
      var lines$4 = arguments[1];
      var forceToLineString$2 = arguments[2];
      geom$3.apply(new LinearComponentExtracter(lines$4, forceToLineString$2));
      return lines$4
    }
  }
};

var PointLocator = function PointLocator () {
  this._boundaryRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
  this._isIn = null;
  this._numBoundaries = null;
  if (arguments.length === 0) {} else if (arguments.length === 1) {
    var boundaryRule = arguments[0];
    if (boundaryRule === null) { throw new IllegalArgumentException('Rule must be non-null') }
    this._boundaryRule = boundaryRule;
  }
};
PointLocator.prototype.locateInternal = function locateInternal () {
    var this$1 = this;

  if (arguments[0] instanceof Coordinate && arguments[1] instanceof Polygon) {
    var p = arguments[0];
    var poly = arguments[1];
    if (poly.isEmpty()) { return Location.EXTERIOR }
    var shell = poly.getExteriorRing();
    var shellLoc = this.locateInPolygonRing(p, shell);
    if (shellLoc === Location.EXTERIOR) { return Location.EXTERIOR }
    if (shellLoc === Location.BOUNDARY) { return Location.BOUNDARY }
    for (var i = 0; i < poly.getNumInteriorRing(); i++) {
      var hole = poly.getInteriorRingN(i);
      var holeLoc = this$1.locateInPolygonRing(p, hole);
      if (holeLoc === Location.INTERIOR) { return Location.EXTERIOR }
      if (holeLoc === Location.BOUNDARY) { return Location.BOUNDARY }
    }
    return Location.INTERIOR
  } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof LineString) {
    var p$1 = arguments[0];
    var l = arguments[1];
    if (!l.getEnvelopeInternal().intersects(p$1)) { return Location.EXTERIOR }
    var pt = l.getCoordinates();
    if (!l.isClosed()) {
      if (p$1.equals(pt[0]) || p$1.equals(pt[pt.length - 1])) {
        return Location.BOUNDARY
      }
    }
    if (CGAlgorithms.isOnLine(p$1, pt)) { return Location.INTERIOR }
    return Location.EXTERIOR
  } else if (arguments[0] instanceof Coordinate && arguments[1] instanceof Point) {
    var p$2 = arguments[0];
    var pt$1 = arguments[1];
    var ptCoord = pt$1.getCoordinate();
    if (ptCoord.equals2D(p$2)) { return Location.INTERIOR }
    return Location.EXTERIOR
  }
};
PointLocator.prototype.locateInPolygonRing = function locateInPolygonRing (p, ring) {
  if (!ring.getEnvelopeInternal().intersects(p)) { return Location.EXTERIOR }
  return CGAlgorithms.locatePointInRing(p, ring.getCoordinates())
};
PointLocator.prototype.intersects = function intersects (p, geom) {
  return this.locate(p, geom) !== Location.EXTERIOR
};
PointLocator.prototype.updateLocationInfo = function updateLocationInfo (loc) {
  if (loc === Location.INTERIOR) { this._isIn = true; }
  if (loc === Location.BOUNDARY) { this._numBoundaries++; }
};
PointLocator.prototype.computeLocation = function computeLocation (p, geom) {
    var this$1 = this;

  if (geom instanceof Point) {
    this.updateLocationInfo(this.locateInternal(p, geom));
  }
  if (geom instanceof LineString) {
    this.updateLocationInfo(this.locateInternal(p, geom));
  } else if (geom instanceof Polygon) {
    this.updateLocationInfo(this.locateInternal(p, geom));
  } else if (geom instanceof MultiLineString) {
    var ml = geom;
    for (var i = 0; i < ml.getNumGeometries(); i++) {
      var l = ml.getGeometryN(i);
      this$1.updateLocationInfo(this$1.locateInternal(p, l));
    }
  } else if (geom instanceof MultiPolygon) {
    var mpoly = geom;
    for (var i$1 = 0; i$1 < mpoly.getNumGeometries(); i$1++) {
      var poly = mpoly.getGeometryN(i$1);
      this$1.updateLocationInfo(this$1.locateInternal(p, poly));
    }
  } else if (geom instanceof GeometryCollection) {
    var geomi = new GeometryCollectionIterator(geom);
    while (geomi.hasNext()) {
      var g2 = geomi.next();
      if (g2 !== geom) { this$1.computeLocation(p, g2); }
    }
  }
};
PointLocator.prototype.locate = function locate (p, geom) {
  if (geom.isEmpty()) { return Location.EXTERIOR }
  if (geom instanceof LineString) {
    return this.locateInternal(p, geom)
  } else if (geom instanceof Polygon) {
    return this.locateInternal(p, geom)
  }
  this._isIn = false;
  this._numBoundaries = 0;
  this.computeLocation(p, geom);
  if (this._boundaryRule.isInBoundary(this._numBoundaries)) { return Location.BOUNDARY }
  if (this._numBoundaries > 0 || this._isIn) { return Location.INTERIOR }
  return Location.EXTERIOR
};
PointLocator.prototype.interfaces_ = function interfaces_ () {
  return []
};
PointLocator.prototype.getClass = function getClass () {
  return PointLocator
};

var GeometryLocation = function GeometryLocation () {
  this._component = null;
  this._segIndex = null;
  this._pt = null;
  if (arguments.length === 2) {
    var component = arguments[0];
    var pt = arguments[1];
    GeometryLocation.call(this, component, GeometryLocation.INSIDE_AREA, pt);
  } else if (arguments.length === 3) {
    var component$1 = arguments[0];
    var segIndex = arguments[1];
    var pt$1 = arguments[2];
    this._component = component$1;
    this._segIndex = segIndex;
    this._pt = pt$1;
  }
};

var staticAccessors$38 = { INSIDE_AREA: { configurable: true } };
GeometryLocation.prototype.isInsideArea = function isInsideArea () {
  return this._segIndex === GeometryLocation.INSIDE_AREA
};
GeometryLocation.prototype.getCoordinate = function getCoordinate () {
  return this._pt
};
GeometryLocation.prototype.getGeometryComponent = function getGeometryComponent () {
  return this._component
};
GeometryLocation.prototype.getSegmentIndex = function getSegmentIndex () {
  return this._segIndex
};
GeometryLocation.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryLocation.prototype.getClass = function getClass () {
  return GeometryLocation
};
staticAccessors$38.INSIDE_AREA.get = function () { return -1 };

Object.defineProperties( GeometryLocation, staticAccessors$38 );

var PointExtracter = function PointExtracter (pts) {
  this._pts = pts || null;
};
PointExtracter.prototype.filter = function filter (geom) {
  if (geom instanceof Point) { this._pts.add(geom); }
};
PointExtracter.prototype.interfaces_ = function interfaces_ () {
  return [GeometryFilter]
};
PointExtracter.prototype.getClass = function getClass () {
  return PointExtracter
};
PointExtracter.getPoints = function getPoints () {
  if (arguments.length === 1) {
    var geom = arguments[0];
    if (geom instanceof Point) {
      return Collections.singletonList(geom)
    }
    return PointExtracter.getPoints(geom, new ArrayList())
  } else if (arguments.length === 2) {
    var geom$1 = arguments[0];
    var list = arguments[1];
    if (geom$1 instanceof Point) {
      list.add(geom$1);
    } else if (geom$1 instanceof GeometryCollection) {
      geom$1.apply(new PointExtracter(list));
    }
    return list
  }
};

var ConnectedElementLocationFilter = function ConnectedElementLocationFilter () {
  this._locations = null;
  var locations = arguments[0];
  this._locations = locations;
};
ConnectedElementLocationFilter.prototype.filter = function filter (geom) {
  if (geom instanceof Point || geom instanceof LineString || geom instanceof Polygon) { this._locations.add(new GeometryLocation(geom, 0, geom.getCoordinate())); }
};
ConnectedElementLocationFilter.prototype.interfaces_ = function interfaces_ () {
  return [GeometryFilter]
};
ConnectedElementLocationFilter.prototype.getClass = function getClass () {
  return ConnectedElementLocationFilter
};
ConnectedElementLocationFilter.getLocations = function getLocations (geom) {
  var locations = new ArrayList();
  geom.apply(new ConnectedElementLocationFilter(locations));
  return locations
};

var DistanceOp = function DistanceOp () {
  this._geom = null;
  this._terminateDistance = 0.0;
  this._ptLocator = new PointLocator();
  this._minDistanceLocation = null;
  this._minDistance = Double.MAX_VALUE;
  if (arguments.length === 2) {
    var g0 = arguments[0];
    var g1 = arguments[1];
    this._geom = [g0, g1];
    this._terminateDistance = 0.0;
  } else if (arguments.length === 3) {
    var g0$1 = arguments[0];
    var g1$1 = arguments[1];
    var terminateDistance = arguments[2];
    this._geom = new Array(2).fill(null);
    this._geom[0] = g0$1;
    this._geom[1] = g1$1;
    this._terminateDistance = terminateDistance;
  }
};
DistanceOp.prototype.computeContainmentDistance = function computeContainmentDistance () {
    var this$1 = this;

  if (arguments.length === 0) {
    var locPtPoly = new Array(2).fill(null);
    this.computeContainmentDistance(0, locPtPoly);
    if (this._minDistance <= this._terminateDistance) { return null }
    this.computeContainmentDistance(1, locPtPoly);
  } else if (arguments.length === 2) {
    var polyGeomIndex = arguments[0];
    var locPtPoly$1 = arguments[1];
    var locationsIndex = 1 - polyGeomIndex;
    var polys = PolygonExtracter.getPolygons(this._geom[polyGeomIndex]);
    if (polys.size() > 0) {
      var insideLocs = ConnectedElementLocationFilter.getLocations(this._geom[locationsIndex]);
      this.computeContainmentDistance(insideLocs, polys, locPtPoly$1);
      if (this._minDistance <= this._terminateDistance) {
        this._minDistanceLocation[locationsIndex] = locPtPoly$1[0];
        this._minDistanceLocation[polyGeomIndex] = locPtPoly$1[1];
        return null
      }
    }
  } else if (arguments.length === 3) {
    if (arguments[2] instanceof Array && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
      var locs = arguments[0];
      var polys$1 = arguments[1];
      var locPtPoly$2 = arguments[2];
      for (var i = 0; i < locs.size(); i++) {
        var loc = locs.get(i);
        for (var j = 0; j < polys$1.size(); j++) {
          this$1.computeContainmentDistance(loc, polys$1.get(j), locPtPoly$2);
          if (this$1._minDistance <= this$1._terminateDistance) { return null }
        }
      }
    } else if (arguments[2] instanceof Array && (arguments[0] instanceof GeometryLocation && arguments[1] instanceof Polygon)) {
      var ptLoc = arguments[0];
      var poly = arguments[1];
      var locPtPoly$3 = arguments[2];
      var pt = ptLoc.getCoordinate();
      if (Location.EXTERIOR !== this._ptLocator.locate(pt, poly)) {
        this._minDistance = 0.0;
        locPtPoly$3[0] = ptLoc;
        locPtPoly$3[1] = new GeometryLocation(poly, pt);

        return null
      }
    }
  }
};
DistanceOp.prototype.computeMinDistanceLinesPoints = function computeMinDistanceLinesPoints (lines, points, locGeom) {
    var this$1 = this;

  for (var i = 0; i < lines.size(); i++) {
    var line = lines.get(i);
    for (var j = 0; j < points.size(); j++) {
      var pt = points.get(j);
      this$1.computeMinDistance(line, pt, locGeom);
      if (this$1._minDistance <= this$1._terminateDistance) { return null }
    }
  }
};
DistanceOp.prototype.computeFacetDistance = function computeFacetDistance () {
  var locGeom = new Array(2).fill(null);
  var lines0 = LinearComponentExtracter.getLines(this._geom[0]);
  var lines1 = LinearComponentExtracter.getLines(this._geom[1]);
  var pts0 = PointExtracter.getPoints(this._geom[0]);
  var pts1 = PointExtracter.getPoints(this._geom[1]);
  this.computeMinDistanceLines(lines0, lines1, locGeom);
  this.updateMinDistance(locGeom, false);
  if (this._minDistance <= this._terminateDistance) { return null }
  locGeom[0] = null;
  locGeom[1] = null;
  this.computeMinDistanceLinesPoints(lines0, pts1, locGeom);
  this.updateMinDistance(locGeom, false);
  if (this._minDistance <= this._terminateDistance) { return null }
  locGeom[0] = null;
  locGeom[1] = null;
  this.computeMinDistanceLinesPoints(lines1, pts0, locGeom);
  this.updateMinDistance(locGeom, true);
  if (this._minDistance <= this._terminateDistance) { return null }
  locGeom[0] = null;
  locGeom[1] = null;
  this.computeMinDistancePoints(pts0, pts1, locGeom);
  this.updateMinDistance(locGeom, false);
};
DistanceOp.prototype.nearestLocations = function nearestLocations () {
  this.computeMinDistance();
  return this._minDistanceLocation
};
DistanceOp.prototype.updateMinDistance = function updateMinDistance (locGeom, flip) {
  if (locGeom[0] === null) { return null }
  if (flip) {
    this._minDistanceLocation[0] = locGeom[1];
    this._minDistanceLocation[1] = locGeom[0];
  } else {
    this._minDistanceLocation[0] = locGeom[0];
    this._minDistanceLocation[1] = locGeom[1];
  }
};
DistanceOp.prototype.nearestPoints = function nearestPoints () {
  this.computeMinDistance();
  var nearestPts = [this._minDistanceLocation[0].getCoordinate(), this._minDistanceLocation[1].getCoordinate()];
  return nearestPts
};
DistanceOp.prototype.computeMinDistance = function computeMinDistance () {
    var this$1 = this;

  if (arguments.length === 0) {
    if (this._minDistanceLocation !== null) { return null }
    this._minDistanceLocation = new Array(2).fill(null);
    this.computeContainmentDistance();
    if (this._minDistance <= this._terminateDistance) { return null }
    this.computeFacetDistance();
  } else if (arguments.length === 3) {
    if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof Point)) {
      var line = arguments[0];
      var pt = arguments[1];
      var locGeom = arguments[2];
      if (line.getEnvelopeInternal().distance(pt.getEnvelopeInternal()) > this._minDistance) { return null }
      var coord0 = line.getCoordinates();
      var coord = pt.getCoordinate();
      for (var i = 0; i < coord0.length - 1; i++) {
        var dist = CGAlgorithms.distancePointLine(coord, coord0[i], coord0[i + 1]);
        if (dist < this$1._minDistance) {
          this$1._minDistance = dist;
          var seg = new LineSegment(coord0[i], coord0[i + 1]);
          var segClosestPoint = seg.closestPoint(coord);
          locGeom[0] = new GeometryLocation(line, i, segClosestPoint);
          locGeom[1] = new GeometryLocation(pt, 0, coord);
        }
        if (this$1._minDistance <= this$1._terminateDistance) { return null }
      }
    } else if (arguments[2] instanceof Array && (arguments[0] instanceof LineString && arguments[1] instanceof LineString)) {
      var line0 = arguments[0];
      var line1 = arguments[1];
      var locGeom$1 = arguments[2];
      if (line0.getEnvelopeInternal().distance(line1.getEnvelopeInternal()) > this._minDistance) { return null }
      var coord0$1 = line0.getCoordinates();
      var coord1 = line1.getCoordinates();
      for (var i$1 = 0; i$1 < coord0$1.length - 1; i$1++) {
        for (var j = 0; j < coord1.length - 1; j++) {
          var dist$1 = CGAlgorithms.distanceLineLine(coord0$1[i$1], coord0$1[i$1 + 1], coord1[j], coord1[j + 1]);
          if (dist$1 < this$1._minDistance) {
            this$1._minDistance = dist$1;
            var seg0 = new LineSegment(coord0$1[i$1], coord0$1[i$1 + 1]);
            var seg1 = new LineSegment(coord1[j], coord1[j + 1]);
            var closestPt = seg0.closestPoints(seg1);
            locGeom$1[0] = new GeometryLocation(line0, i$1, closestPt[0]);
            locGeom$1[1] = new GeometryLocation(line1, j, closestPt[1]);
          }
          if (this$1._minDistance <= this$1._terminateDistance) { return null }
        }
      }
    }
  }
};
DistanceOp.prototype.computeMinDistancePoints = function computeMinDistancePoints (points0, points1, locGeom) {
    var this$1 = this;

  for (var i = 0; i < points0.size(); i++) {
    var pt0 = points0.get(i);
    for (var j = 0; j < points1.size(); j++) {
      var pt1 = points1.get(j);
      var dist = pt0.getCoordinate().distance(pt1.getCoordinate());
      if (dist < this$1._minDistance) {
        this$1._minDistance = dist;
        locGeom[0] = new GeometryLocation(pt0, 0, pt0.getCoordinate());
        locGeom[1] = new GeometryLocation(pt1, 0, pt1.getCoordinate());
      }
      if (this$1._minDistance <= this$1._terminateDistance) { return null }
    }
  }
};
DistanceOp.prototype.distance = function distance () {
  if (this._geom[0] === null || this._geom[1] === null) { throw new IllegalArgumentException('null geometries are not supported') }
  if (this._geom[0].isEmpty() || this._geom[1].isEmpty()) { return 0.0 }
  this.computeMinDistance();
  return this._minDistance
};
DistanceOp.prototype.computeMinDistanceLines = function computeMinDistanceLines (lines0, lines1, locGeom) {
    var this$1 = this;

  for (var i = 0; i < lines0.size(); i++) {
    var line0 = lines0.get(i);
    for (var j = 0; j < lines1.size(); j++) {
      var line1 = lines1.get(j);
      this$1.computeMinDistance(line0, line1, locGeom);
      if (this$1._minDistance <= this$1._terminateDistance) { return null }
    }
  }
};
DistanceOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
DistanceOp.prototype.getClass = function getClass () {
  return DistanceOp
};
DistanceOp.distance = function distance (g0, g1) {
  var distOp = new DistanceOp(g0, g1);
  return distOp.distance()
};
DistanceOp.isWithinDistance = function isWithinDistance (g0, g1, distance) {
  var distOp = new DistanceOp(g0, g1, distance);
  return distOp.distance() <= distance
};
DistanceOp.nearestPoints = function nearestPoints (g0, g1) {
  var distOp = new DistanceOp(g0, g1);
  return distOp.nearestPoints()
};

var PointPairDistance$2 = function PointPairDistance () {
  this._pt = [new Coordinate(), new Coordinate()];
  this._distance = Double.NaN;
  this._isNull = true;
};
PointPairDistance$2.prototype.getCoordinates = function getCoordinates () {
  return this._pt
};
PointPairDistance$2.prototype.getCoordinate = function getCoordinate (i) {
  return this._pt[i]
};
PointPairDistance$2.prototype.setMinimum = function setMinimum () {
  if (arguments.length === 1) {
    var ptDist = arguments[0];
    this.setMinimum(ptDist._pt[0], ptDist._pt[1]);
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    if (this._isNull) {
      this.initialize(p0, p1);
      return null
    }
    var dist = p0.distance(p1);
    if (dist < this._distance) { this.initialize(p0, p1, dist); }
  }
};
PointPairDistance$2.prototype.initialize = function initialize () {
  if (arguments.length === 0) {
    this._isNull = true;
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    this._pt[0].setCoordinate(p0);
    this._pt[1].setCoordinate(p1);
    this._distance = p0.distance(p1);
    this._isNull = false;
  } else if (arguments.length === 3) {
    var p0$1 = arguments[0];
    var p1$1 = arguments[1];
    var distance = arguments[2];
    this._pt[0].setCoordinate(p0$1);
    this._pt[1].setCoordinate(p1$1);
    this._distance = distance;
    this._isNull = false;
  }
};
PointPairDistance$2.prototype.toString = function toString () {
  return WKTWriter.toLineString(this._pt[0], this._pt[1])
};
PointPairDistance$2.prototype.getDistance = function getDistance () {
  return this._distance
};
PointPairDistance$2.prototype.setMaximum = function setMaximum () {
  if (arguments.length === 1) {
    var ptDist = arguments[0];
    this.setMaximum(ptDist._pt[0], ptDist._pt[1]);
  } else if (arguments.length === 2) {
    var p0 = arguments[0];
    var p1 = arguments[1];
    if (this._isNull) {
      this.initialize(p0, p1);
      return null
    }
    var dist = p0.distance(p1);
    if (dist > this._distance) { this.initialize(p0, p1, dist); }
  }
};
PointPairDistance$2.prototype.interfaces_ = function interfaces_ () {
  return []
};
PointPairDistance$2.prototype.getClass = function getClass () {
  return PointPairDistance$2
};

var DistanceToPoint = function DistanceToPoint () {};

DistanceToPoint.prototype.interfaces_ = function interfaces_ () {
  return []
};
DistanceToPoint.prototype.getClass = function getClass () {
  return DistanceToPoint
};
DistanceToPoint.computeDistance = function computeDistance () {
  if (arguments[2] instanceof PointPairDistance$2 && (arguments[0] instanceof LineString && arguments[1] instanceof Coordinate)) {
    var line = arguments[0];
    var pt = arguments[1];
    var ptDist = arguments[2];
    var tempSegment = new LineSegment();
    var coords = line.getCoordinates();
    for (var i = 0; i < coords.length - 1; i++) {
      tempSegment.setCoordinates(coords[i], coords[i + 1]);
      var closestPt = tempSegment.closestPoint(pt);
      ptDist.setMinimum(closestPt, pt);
    }
  } else if (arguments[2] instanceof PointPairDistance$2 && (arguments[0] instanceof Polygon && arguments[1] instanceof Coordinate)) {
    var poly = arguments[0];
    var pt$1 = arguments[1];
    var ptDist$1 = arguments[2];
    DistanceToPoint.computeDistance(poly.getExteriorRing(), pt$1, ptDist$1);
    for (var i$1 = 0; i$1 < poly.getNumInteriorRing(); i$1++) {
      DistanceToPoint.computeDistance(poly.getInteriorRingN(i$1), pt$1, ptDist$1);
    }
  } else if (arguments[2] instanceof PointPairDistance$2 && (arguments[0] instanceof Geometry && arguments[1] instanceof Coordinate)) {
    var geom = arguments[0];
    var pt$2 = arguments[1];
    var ptDist$2 = arguments[2];
    if (geom instanceof LineString) {
      DistanceToPoint.computeDistance(geom, pt$2, ptDist$2);
    } else if (geom instanceof Polygon) {
      DistanceToPoint.computeDistance(geom, pt$2, ptDist$2);
    } else if (geom instanceof GeometryCollection) {
      var gc = geom;
      for (var i$2 = 0; i$2 < gc.getNumGeometries(); i$2++) {
        var g = gc.getGeometryN(i$2);
        DistanceToPoint.computeDistance(g, pt$2, ptDist$2);
      }
    } else {
      ptDist$2.setMinimum(geom.getCoordinate(), pt$2);
    }
  } else if (arguments[2] instanceof PointPairDistance$2 && (arguments[0] instanceof LineSegment && arguments[1] instanceof Coordinate)) {
    var segment = arguments[0];
    var pt$3 = arguments[1];
    var ptDist$3 = arguments[2];
    var closestPt$1 = segment.closestPoint(pt$3);
    ptDist$3.setMinimum(closestPt$1, pt$3);
  }
};

var DiscreteHausdorffDistance = function DiscreteHausdorffDistance () {
  this._g0 = null;
  this._g1 = null;
  this._ptDist = new PointPairDistance$2();
  this._densifyFrac = 0.0;
  var g0 = arguments[0];
  var g1 = arguments[1];
  this._g0 = g0;
  this._g1 = g1;
};

var staticAccessors$39 = { MaxPointDistanceFilter: { configurable: true },MaxDensifiedByFractionDistanceFilter: { configurable: true } };
DiscreteHausdorffDistance.prototype.getCoordinates = function getCoordinates () {
  return this._ptDist.getCoordinates()
};
DiscreteHausdorffDistance.prototype.setDensifyFraction = function setDensifyFraction (densifyFrac) {
  if (densifyFrac > 1.0 || densifyFrac <= 0.0) { throw new IllegalArgumentException('Fraction is not in range (0.0 - 1.0]') }
  this._densifyFrac = densifyFrac;
};
DiscreteHausdorffDistance.prototype.compute = function compute (g0, g1) {
  this.computeOrientedDistance(g0, g1, this._ptDist);
  this.computeOrientedDistance(g1, g0, this._ptDist);
};
DiscreteHausdorffDistance.prototype.distance = function distance () {
  this.compute(this._g0, this._g1);
  return this._ptDist.getDistance()
};
DiscreteHausdorffDistance.prototype.computeOrientedDistance = function computeOrientedDistance (discreteGeom, geom, ptDist) {
  var distFilter = new MaxPointDistanceFilter$1(geom);
  discreteGeom.apply(distFilter);
  ptDist.setMaximum(distFilter.getMaxPointDistance());
  if (this._densifyFrac > 0) {
    var fracFilter = new MaxDensifiedByFractionDistanceFilter(geom, this._densifyFrac);
    discreteGeom.apply(fracFilter);
    ptDist.setMaximum(fracFilter.getMaxPointDistance());
  }
};
DiscreteHausdorffDistance.prototype.orientedDistance = function orientedDistance () {
  this.computeOrientedDistance(this._g0, this._g1, this._ptDist);
  return this._ptDist.getDistance()
};
DiscreteHausdorffDistance.prototype.interfaces_ = function interfaces_ () {
  return []
};
DiscreteHausdorffDistance.prototype.getClass = function getClass () {
  return DiscreteHausdorffDistance
};
DiscreteHausdorffDistance.distance = function distance () {
  if (arguments.length === 2) {
    var g0 = arguments[0];
    var g1 = arguments[1];
    var dist = new DiscreteHausdorffDistance(g0, g1);
    return dist.distance()
  } else if (arguments.length === 3) {
    var g0$1 = arguments[0];
    var g1$1 = arguments[1];
    var densifyFrac = arguments[2];
    var dist$1 = new DiscreteHausdorffDistance(g0$1, g1$1);
    dist$1.setDensifyFraction(densifyFrac);
    return dist$1.distance()
  }
};
staticAccessors$39.MaxPointDistanceFilter.get = function () { return MaxPointDistanceFilter$1 };
staticAccessors$39.MaxDensifiedByFractionDistanceFilter.get = function () { return MaxDensifiedByFractionDistanceFilter };

Object.defineProperties( DiscreteHausdorffDistance, staticAccessors$39 );

var MaxPointDistanceFilter$1 = function MaxPointDistanceFilter () {
  this._maxPtDist = new PointPairDistance$2();
  this._minPtDist = new PointPairDistance$2();
  this._euclideanDist = new DistanceToPoint();
  this._geom = null;
  var geom = arguments[0];
  this._geom = geom;
};
MaxPointDistanceFilter$1.prototype.filter = function filter (pt) {
  this._minPtDist.initialize();
  DistanceToPoint.computeDistance(this._geom, pt, this._minPtDist);
  this._maxPtDist.setMaximum(this._minPtDist);
};
MaxPointDistanceFilter$1.prototype.getMaxPointDistance = function getMaxPointDistance () {
  return this._maxPtDist
};
MaxPointDistanceFilter$1.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateFilter]
};
MaxPointDistanceFilter$1.prototype.getClass = function getClass () {
  return MaxPointDistanceFilter$1
};

var MaxDensifiedByFractionDistanceFilter = function MaxDensifiedByFractionDistanceFilter () {
  this._maxPtDist = new PointPairDistance$2();
  this._minPtDist = new PointPairDistance$2();
  this._geom = null;
  this._numSubSegs = 0;
  var geom = arguments[0];
  var fraction = arguments[1];
  this._geom = geom;
  this._numSubSegs = Math.trunc(Math.round(1.0 / fraction));
};
MaxDensifiedByFractionDistanceFilter.prototype.filter = function filter (seq, index) {
    var this$1 = this;

  if (index === 0) { return null }
  var p0 = seq.getCoordinate(index - 1);
  var p1 = seq.getCoordinate(index);
  var delx = (p1.x - p0.x) / this._numSubSegs;
  var dely = (p1.y - p0.y) / this._numSubSegs;
  for (var i = 0; i < this._numSubSegs; i++) {
    var x = p0.x + i * delx;
    var y = p0.y + i * dely;
    var pt = new Coordinate(x, y);
    this$1._minPtDist.initialize();
    DistanceToPoint.computeDistance(this$1._geom, pt, this$1._minPtDist);
    this$1._maxPtDist.setMaximum(this$1._minPtDist);
  }
};
MaxDensifiedByFractionDistanceFilter.prototype.isDone = function isDone () {
  return false
};
MaxDensifiedByFractionDistanceFilter.prototype.isGeometryChanged = function isGeometryChanged () {
  return false
};
MaxDensifiedByFractionDistanceFilter.prototype.getMaxPointDistance = function getMaxPointDistance () {
  return this._maxPtDist
};
MaxDensifiedByFractionDistanceFilter.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateSequenceFilter]
};
MaxDensifiedByFractionDistanceFilter.prototype.getClass = function getClass () {
  return MaxDensifiedByFractionDistanceFilter
};

var BufferDistanceValidator = function BufferDistanceValidator (input, bufDistance, result) {
  this._minValidDistance = null;
  this._maxValidDistance = null;
  this._minDistanceFound = null;
  this._maxDistanceFound = null;
  this._isValid = true;
  this._errMsg = null;
  this._errorLocation = null;
  this._errorIndicator = null;
  this._input = input || null;
  this._bufDistance = bufDistance || null;
  this._result = result || null;
};

var staticAccessors$37 = { VERBOSE: { configurable: true },MAX_DISTANCE_DIFF_FRAC: { configurable: true } };
BufferDistanceValidator.prototype.checkMaximumDistance = function checkMaximumDistance (input, bufCurve, maxDist) {
  var haus = new DiscreteHausdorffDistance(bufCurve, input);
  haus.setDensifyFraction(0.25);
  this._maxDistanceFound = haus.orientedDistance();
  if (this._maxDistanceFound > maxDist) {
    this._isValid = false;
    var pts = haus.getCoordinates();
    this._errorLocation = pts[1];
    this._errorIndicator = input.getFactory().createLineString(pts);
    this._errMsg = 'Distance between buffer curve and input is too large (' + this._maxDistanceFound + ' at ' + WKTWriter.toLineString(pts[0], pts[1]) + ')';
  }
};
BufferDistanceValidator.prototype.isValid = function isValid () {
  var posDistance = Math.abs(this._bufDistance);
  var distDelta = BufferDistanceValidator.MAX_DISTANCE_DIFF_FRAC * posDistance;
  this._minValidDistance = posDistance - distDelta;
  this._maxValidDistance = posDistance + distDelta;
  if (this._input.isEmpty() || this._result.isEmpty()) { return true }
  if (this._bufDistance > 0.0) {
    this.checkPositiveValid();
  } else {
    this.checkNegativeValid();
  }
  if (BufferDistanceValidator.VERBOSE) {
    System.out.println('Min Dist= ' + this._minDistanceFound + '  err= ' + (1.0 - this._minDistanceFound / this._bufDistance) + '  Max Dist= ' + this._maxDistanceFound + '  err= ' + (this._maxDistanceFound / this._bufDistance - 1.0));
  }
  return this._isValid
};
BufferDistanceValidator.prototype.checkNegativeValid = function checkNegativeValid () {
  if (!(this._input instanceof Polygon || this._input instanceof MultiPolygon || this._input instanceof GeometryCollection)) {
    return null
  }
  var inputCurve = this.getPolygonLines(this._input);
  this.checkMinimumDistance(inputCurve, this._result, this._minValidDistance);
  if (!this._isValid) { return null }
  this.checkMaximumDistance(inputCurve, this._result, this._maxValidDistance);
};
BufferDistanceValidator.prototype.getErrorIndicator = function getErrorIndicator () {
  return this._errorIndicator
};
BufferDistanceValidator.prototype.checkMinimumDistance = function checkMinimumDistance (g1, g2, minDist) {
  var distOp = new DistanceOp(g1, g2, minDist);
  this._minDistanceFound = distOp.distance();
  if (this._minDistanceFound < minDist) {
    this._isValid = false;
    var pts = distOp.nearestPoints();
    this._errorLocation = distOp.nearestPoints()[1];
    this._errorIndicator = g1.getFactory().createLineString(pts);
    this._errMsg = 'Distance between buffer curve and input is too small (' + this._minDistanceFound + ' at ' + WKTWriter.toLineString(pts[0], pts[1]) + ' )';
  }
};
BufferDistanceValidator.prototype.checkPositiveValid = function checkPositiveValid () {
  var bufCurve = this._result.getBoundary();
  this.checkMinimumDistance(this._input, bufCurve, this._minValidDistance);
  if (!this._isValid) { return null }
  this.checkMaximumDistance(this._input, bufCurve, this._maxValidDistance);
};
BufferDistanceValidator.prototype.getErrorLocation = function getErrorLocation () {
  return this._errorLocation
};
BufferDistanceValidator.prototype.getPolygonLines = function getPolygonLines (g) {
  var lines = new ArrayList();
  var lineExtracter = new LinearComponentExtracter(lines);
  var polys = PolygonExtracter.getPolygons(g);
  for (var i = polys.iterator(); i.hasNext();) {
    var poly = i.next();
    poly.apply(lineExtracter);
  }
  return g.getFactory().buildGeometry(lines)
};
BufferDistanceValidator.prototype.getErrorMessage = function getErrorMessage () {
  return this._errMsg
};
BufferDistanceValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferDistanceValidator.prototype.getClass = function getClass () {
  return BufferDistanceValidator
};
staticAccessors$37.VERBOSE.get = function () { return false };
staticAccessors$37.MAX_DISTANCE_DIFF_FRAC.get = function () { return 0.012 };

Object.defineProperties( BufferDistanceValidator, staticAccessors$37 );

var BufferResultValidator = function BufferResultValidator (input, distance, result) {
  this._isValid = true;
  this._errorMsg = null;
  this._errorLocation = null;
  this._errorIndicator = null;
  this._input = input || null;
  this._distance = distance || null;
  this._result = result || null;
};

var staticAccessors$40 = { VERBOSE: { configurable: true },MAX_ENV_DIFF_FRAC: { configurable: true } };
BufferResultValidator.prototype.isValid = function isValid () {
  this.checkPolygonal();
  if (!this._isValid) { return this._isValid }
  this.checkExpectedEmpty();
  if (!this._isValid) { return this._isValid }
  this.checkEnvelope();
  if (!this._isValid) { return this._isValid }
  this.checkArea();
  if (!this._isValid) { return this._isValid }
  this.checkDistance();
  return this._isValid
};
BufferResultValidator.prototype.checkEnvelope = function checkEnvelope () {
  if (this._distance < 0.0) { return null }
  var padding = this._distance * BufferResultValidator.MAX_ENV_DIFF_FRAC;
  if (padding === 0.0) { padding = 0.001; }
  var expectedEnv = new Envelope(this._input.getEnvelopeInternal());
  expectedEnv.expandBy(this._distance);
  var bufEnv = new Envelope(this._result.getEnvelopeInternal());
  bufEnv.expandBy(padding);
  if (!bufEnv.contains(expectedEnv)) {
    this._isValid = false;
    this._errorMsg = 'Buffer envelope is incorrect';
    this._errorIndicator = this._input.getFactory().toGeometry(bufEnv);
  }
  this.report('Envelope');
};
BufferResultValidator.prototype.checkDistance = function checkDistance () {
  var distValid = new BufferDistanceValidator(this._input, this._distance, this._result);
  if (!distValid.isValid()) {
    this._isValid = false;
    this._errorMsg = distValid.getErrorMessage();
    this._errorLocation = distValid.getErrorLocation();
    this._errorIndicator = distValid.getErrorIndicator();
  }
  this.report('Distance');
};
BufferResultValidator.prototype.checkArea = function checkArea () {
  var inputArea = this._input.getArea();
  var resultArea = this._result.getArea();
  if (this._distance > 0.0 && inputArea > resultArea) {
    this._isValid = false;
    this._errorMsg = 'Area of positive buffer is smaller than input';
    this._errorIndicator = this._result;
  }
  if (this._distance < 0.0 && inputArea < resultArea) {
    this._isValid = false;
    this._errorMsg = 'Area of negative buffer is larger than input';
    this._errorIndicator = this._result;
  }
  this.report('Area');
};
BufferResultValidator.prototype.checkPolygonal = function checkPolygonal () {
  if (!(this._result instanceof Polygon || this._result instanceof MultiPolygon)) { this._isValid = false; }
  this._errorMsg = 'Result is not polygonal';
  this._errorIndicator = this._result;
  this.report('Polygonal');
};
BufferResultValidator.prototype.getErrorIndicator = function getErrorIndicator () {
  return this._errorIndicator
};
BufferResultValidator.prototype.getErrorLocation = function getErrorLocation () {
  return this._errorLocation
};
BufferResultValidator.prototype.checkExpectedEmpty = function checkExpectedEmpty () {
  if (this._input.getDimension() >= 2) { return null }
  if (this._distance > 0.0) { return null }
  if (!this._result.isEmpty()) {
    this._isValid = false;
    this._errorMsg = 'Result is non-empty';
    this._errorIndicator = this._result;
  }
  this.report('ExpectedEmpty');
};
BufferResultValidator.prototype.report = function report (checkName) {
  if (!BufferResultValidator.VERBOSE) { return null }
  System.out.println('Check ' + checkName + ': ' + (this._isValid ? 'passed' : 'FAILED'));
};
BufferResultValidator.prototype.getErrorMessage = function getErrorMessage () {
  return this._errorMsg
};
BufferResultValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
BufferResultValidator.prototype.getClass = function getClass () {
  return BufferResultValidator
};
BufferResultValidator.isValidMsg = function isValidMsg (g, distance, result) {
  var validator = new BufferResultValidator(g, distance, result);
  if (!validator.isValid()) { return validator.getErrorMessage() }
  return null
};
BufferResultValidator.isValid = function isValid (g, distance, result) {
  var validator = new BufferResultValidator(g, distance, result);
  if (validator.isValid()) { return true }
  return false
};
staticAccessors$40.VERBOSE.get = function () { return false };
staticAccessors$40.MAX_ENV_DIFF_FRAC.get = function () { return 0.012 };

Object.defineProperties( BufferResultValidator, staticAccessors$40 );

// operation.buffer

var BasicSegmentString = function BasicSegmentString () {
  this._pts = null;
  this._data = null;
  var pts = arguments[0];
  var data = arguments[1];
  this._pts = pts;
  this._data = data;
};
BasicSegmentString.prototype.getCoordinates = function getCoordinates () {
  return this._pts
};
BasicSegmentString.prototype.size = function size () {
  return this._pts.length
};
BasicSegmentString.prototype.getCoordinate = function getCoordinate (i) {
  return this._pts[i]
};
BasicSegmentString.prototype.isClosed = function isClosed () {
  return this._pts[0].equals(this._pts[this._pts.length - 1])
};
BasicSegmentString.prototype.getSegmentOctant = function getSegmentOctant (index) {
  if (index === this._pts.length - 1) { return -1 }
  return Octant.octant(this.getCoordinate(index), this.getCoordinate(index + 1))
};
BasicSegmentString.prototype.setData = function setData (data) {
  this._data = data;
};
BasicSegmentString.prototype.getData = function getData () {
  return this._data
};
BasicSegmentString.prototype.toString = function toString () {
  return WKTWriter.toLineString(new CoordinateArraySequence(this._pts))
};
BasicSegmentString.prototype.interfaces_ = function interfaces_ () {
  return [SegmentString]
};
BasicSegmentString.prototype.getClass = function getClass () {
  return BasicSegmentString
};

var InteriorIntersectionFinder = function InteriorIntersectionFinder () {
  this._findAllIntersections = false;
  this._isCheckEndSegmentsOnly = false;
  this._li = null;
  this._interiorIntersection = null;
  this._intSegments = null;
  this._intersections = new ArrayList();
  this._intersectionCount = 0;
  this._keepIntersections = true;
  var li = arguments[0];
  this._li = li;
  this._interiorIntersection = null;
};
InteriorIntersectionFinder.prototype.getInteriorIntersection = function getInteriorIntersection () {
  return this._interiorIntersection
};
InteriorIntersectionFinder.prototype.setCheckEndSegmentsOnly = function setCheckEndSegmentsOnly (isCheckEndSegmentsOnly) {
  this._isCheckEndSegmentsOnly = isCheckEndSegmentsOnly;
};
InteriorIntersectionFinder.prototype.getIntersectionSegments = function getIntersectionSegments () {
  return this._intSegments
};
InteriorIntersectionFinder.prototype.count = function count () {
  return this._intersectionCount
};
InteriorIntersectionFinder.prototype.getIntersections = function getIntersections () {
  return this._intersections
};
InteriorIntersectionFinder.prototype.setFindAllIntersections = function setFindAllIntersections (findAllIntersections) {
  this._findAllIntersections = findAllIntersections;
};
InteriorIntersectionFinder.prototype.setKeepIntersections = function setKeepIntersections (keepIntersections) {
  this._keepIntersections = keepIntersections;
};
InteriorIntersectionFinder.prototype.processIntersections = function processIntersections (e0, segIndex0, e1, segIndex1) {
  if (!this._findAllIntersections && this.hasIntersection()) { return null }
  if (e0 === e1 && segIndex0 === segIndex1) { return null }
  if (this._isCheckEndSegmentsOnly) {
    var isEndSegPresent = this.isEndSegment(e0, segIndex0) || this.isEndSegment(e1, segIndex1);
    if (!isEndSegPresent) { return null }
  }
  var p00 = e0.getCoordinates()[segIndex0];
  var p01 = e0.getCoordinates()[segIndex0 + 1];
  var p10 = e1.getCoordinates()[segIndex1];
  var p11 = e1.getCoordinates()[segIndex1 + 1];
  this._li.computeIntersection(p00, p01, p10, p11);
  if (this._li.hasIntersection()) {
    if (this._li.isInteriorIntersection()) {
      this._intSegments = new Array(4).fill(null);
      this._intSegments[0] = p00;
      this._intSegments[1] = p01;
      this._intSegments[2] = p10;
      this._intSegments[3] = p11;
      this._interiorIntersection = this._li.getIntersection(0);
      if (this._keepIntersections) { this._intersections.add(this._interiorIntersection); }
      this._intersectionCount++;
    }
  }
};
InteriorIntersectionFinder.prototype.isEndSegment = function isEndSegment (segStr, index) {
  if (index === 0) { return true }
  if (index >= segStr.size() - 2) { return true }
  return false
};
InteriorIntersectionFinder.prototype.hasIntersection = function hasIntersection () {
  return this._interiorIntersection !== null
};
InteriorIntersectionFinder.prototype.isDone = function isDone () {
  if (this._findAllIntersections) { return false }
  return this._interiorIntersection !== null
};
InteriorIntersectionFinder.prototype.interfaces_ = function interfaces_ () {
  return [SegmentIntersector]
};
InteriorIntersectionFinder.prototype.getClass = function getClass () {
  return InteriorIntersectionFinder
};
InteriorIntersectionFinder.createAllIntersectionsFinder = function createAllIntersectionsFinder (li) {
  var finder = new InteriorIntersectionFinder(li);
  finder.setFindAllIntersections(true);
  return finder
};
InteriorIntersectionFinder.createAnyIntersectionFinder = function createAnyIntersectionFinder (li) {
  return new InteriorIntersectionFinder(li)
};
InteriorIntersectionFinder.createIntersectionCounter = function createIntersectionCounter (li) {
  var finder = new InteriorIntersectionFinder(li);
  finder.setFindAllIntersections(true);
  finder.setKeepIntersections(false);
  return finder
};

var FastNodingValidator = function FastNodingValidator () {
  this._li = new RobustLineIntersector();
  this._segStrings = null;
  this._findAllIntersections = false;
  this._segInt = null;
  this._isValid = true;
  var segStrings = arguments[0];
  this._segStrings = segStrings;
};
FastNodingValidator.prototype.execute = function execute () {
  if (this._segInt !== null) { return null }
  this.checkInteriorIntersections();
};
FastNodingValidator.prototype.getIntersections = function getIntersections () {
  return this._segInt.getIntersections()
};
FastNodingValidator.prototype.isValid = function isValid () {
  this.execute();
  return this._isValid
};
FastNodingValidator.prototype.setFindAllIntersections = function setFindAllIntersections (findAllIntersections) {
  this._findAllIntersections = findAllIntersections;
};
FastNodingValidator.prototype.checkInteriorIntersections = function checkInteriorIntersections () {
  this._isValid = true;
  this._segInt = new InteriorIntersectionFinder(this._li);
  this._segInt.setFindAllIntersections(this._findAllIntersections);
  var noder = new MCIndexNoder();
  noder.setSegmentIntersector(this._segInt);
  noder.computeNodes(this._segStrings);
  if (this._segInt.hasIntersection()) {
    this._isValid = false;
    return null
  }
};
FastNodingValidator.prototype.checkValid = function checkValid () {
  this.execute();
  if (!this._isValid) { throw new TopologyException(this.getErrorMessage(), this._segInt.getInteriorIntersection()) }
};
FastNodingValidator.prototype.getErrorMessage = function getErrorMessage () {
  if (this._isValid) { return 'no intersections found' }
  var intSegs = this._segInt.getIntersectionSegments();
  return 'found non-noded intersection between ' + WKTWriter.toLineString(intSegs[0], intSegs[1]) + ' and ' + WKTWriter.toLineString(intSegs[2], intSegs[3])
};
FastNodingValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
FastNodingValidator.prototype.getClass = function getClass () {
  return FastNodingValidator
};
FastNodingValidator.computeIntersections = function computeIntersections (segStrings) {
  var nv = new FastNodingValidator(segStrings);
  nv.setFindAllIntersections(true);
  nv.isValid();
  return nv.getIntersections()
};

var EdgeNodingValidator = function EdgeNodingValidator () {
  this._nv = null;
  var edges = arguments[0];
  this._nv = new FastNodingValidator(EdgeNodingValidator.toSegmentStrings(edges));
};
EdgeNodingValidator.prototype.checkValid = function checkValid () {
  this._nv.checkValid();
};
EdgeNodingValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeNodingValidator.prototype.getClass = function getClass () {
  return EdgeNodingValidator
};
EdgeNodingValidator.toSegmentStrings = function toSegmentStrings (edges) {
  var segStrings = new ArrayList();
  for (var i = edges.iterator(); i.hasNext();) {
    var e = i.next();
    segStrings.add(new BasicSegmentString(e.getCoordinates(), e));
  }
  return segStrings
};
EdgeNodingValidator.checkValid = function checkValid (edges) {
  var validator = new EdgeNodingValidator(edges);
  validator.checkValid();
};

var GeometryCollectionMapper = function GeometryCollectionMapper (mapOp) {
  this._mapOp = mapOp;
};
GeometryCollectionMapper.prototype.map = function map (gc) {
    var this$1 = this;

  var mapped = new ArrayList();
  for (var i = 0; i < gc.getNumGeometries(); i++) {
    var g = this$1._mapOp.map(gc.getGeometryN(i));
    if (!g.isEmpty()) { mapped.add(g); }
  }
  return gc.getFactory().createGeometryCollection(GeometryFactory.toGeometryArray(mapped))
};
GeometryCollectionMapper.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryCollectionMapper.prototype.getClass = function getClass () {
  return GeometryCollectionMapper
};
GeometryCollectionMapper.map = function map (gc, op) {
  var mapper = new GeometryCollectionMapper(op);
  return mapper.map(gc)
};

var LineBuilder = function LineBuilder () {
  this._op = null;
  this._geometryFactory = null;
  this._ptLocator = null;
  this._lineEdgesList = new ArrayList();
  this._resultLineList = new ArrayList();
  var op = arguments[0];
  var geometryFactory = arguments[1];
  var ptLocator = arguments[2];
  this._op = op;
  this._geometryFactory = geometryFactory;
  this._ptLocator = ptLocator;
};
LineBuilder.prototype.collectLines = function collectLines (opCode) {
    var this$1 = this;

  for (var it = this._op.getGraph().getEdgeEnds().iterator(); it.hasNext();) {
    var de = it.next();
    this$1.collectLineEdge(de, opCode, this$1._lineEdgesList);
    this$1.collectBoundaryTouchEdge(de, opCode, this$1._lineEdgesList);
  }
};
LineBuilder.prototype.labelIsolatedLine = function labelIsolatedLine (e, targetIndex) {
  var loc = this._ptLocator.locate(e.getCoordinate(), this._op.getArgGeometry(targetIndex));
  e.getLabel().setLocation(targetIndex, loc);
};
LineBuilder.prototype.build = function build (opCode) {
  this.findCoveredLineEdges();
  this.collectLines(opCode);
  this.buildLines(opCode);
  return this._resultLineList
};
LineBuilder.prototype.collectLineEdge = function collectLineEdge (de, opCode, edges) {
  var label = de.getLabel();
  var e = de.getEdge();
  if (de.isLineEdge()) {
    if (!de.isVisited() && OverlayOp.isResultOfOp(label, opCode) && !e.isCovered()) {
      edges.add(e);
      de.setVisitedEdge(true);
    }
  }
};
LineBuilder.prototype.findCoveredLineEdges = function findCoveredLineEdges () {
    var this$1 = this;

  for (var nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext();) {
    var node = nodeit.next();
    node.getEdges().findCoveredLineEdges();
  }
  for (var it = this._op.getGraph().getEdgeEnds().iterator(); it.hasNext();) {
    var de = it.next();
    var e = de.getEdge();
    if (de.isLineEdge() && !e.isCoveredSet()) {
      var isCovered = this$1._op.isCoveredByA(de.getCoordinate());
      e.setCovered(isCovered);
    }
  }
};
LineBuilder.prototype.labelIsolatedLines = function labelIsolatedLines (edgesList) {
    var this$1 = this;

  for (var it = edgesList.iterator(); it.hasNext();) {
    var e = it.next();
    var label = e.getLabel();
    if (e.isIsolated()) {
      if (label.isNull(0)) { this$1.labelIsolatedLine(e, 0); } else { this$1.labelIsolatedLine(e, 1); }
    }
  }
};
LineBuilder.prototype.buildLines = function buildLines (opCode) {
    var this$1 = this;

  for (var it = this._lineEdgesList.iterator(); it.hasNext();) {
    var e = it.next();
    // const label = e.getLabel()
    var line = this$1._geometryFactory.createLineString(e.getCoordinates());
    this$1._resultLineList.add(line);
    e.setInResult(true);
  }
};
LineBuilder.prototype.collectBoundaryTouchEdge = function collectBoundaryTouchEdge (de, opCode, edges) {
  var label = de.getLabel();
  if (de.isLineEdge()) { return null }
  if (de.isVisited()) { return null }
  if (de.isInteriorAreaEdge()) { return null }
  if (de.getEdge().isInResult()) { return null }
  Assert.isTrue(!(de.isInResult() || de.getSym().isInResult()) || !de.getEdge().isInResult());
  if (OverlayOp.isResultOfOp(label, opCode) && opCode === OverlayOp.INTERSECTION) {
    edges.add(de.getEdge());
    de.setVisitedEdge(true);
  }
};
LineBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
LineBuilder.prototype.getClass = function getClass () {
  return LineBuilder
};

var PointBuilder = function PointBuilder () {
  this._op = null;
  this._geometryFactory = null;
  this._resultPointList = new ArrayList();
  var op = arguments[0];
  var geometryFactory = arguments[1];
  // const ptLocator = arguments[2]
  this._op = op;
  this._geometryFactory = geometryFactory;
};
PointBuilder.prototype.filterCoveredNodeToPoint = function filterCoveredNodeToPoint (n) {
  var coord = n.getCoordinate();
  if (!this._op.isCoveredByLA(coord)) {
    var pt = this._geometryFactory.createPoint(coord);
    this._resultPointList.add(pt);
  }
};
PointBuilder.prototype.extractNonCoveredResultNodes = function extractNonCoveredResultNodes (opCode) {
    var this$1 = this;

  for (var nodeit = this._op.getGraph().getNodes().iterator(); nodeit.hasNext();) {
    var n = nodeit.next();
    if (n.isInResult()) { continue }
    if (n.isIncidentEdgeInResult()) { continue }
    if (n.getEdges().getDegree() === 0 || opCode === OverlayOp.INTERSECTION) {
      var label = n.getLabel();
      if (OverlayOp.isResultOfOp(label, opCode)) {
        this$1.filterCoveredNodeToPoint(n);
      }
    }
  }
};
PointBuilder.prototype.build = function build (opCode) {
  this.extractNonCoveredResultNodes(opCode);
  return this._resultPointList
};
PointBuilder.prototype.interfaces_ = function interfaces_ () {
  return []
};
PointBuilder.prototype.getClass = function getClass () {
  return PointBuilder
};

var GeometryTransformer = function GeometryTransformer () {
  this._inputGeom = null;
  this._factory = null;
  this._pruneEmptyGeometry = true;
  this._preserveGeometryCollectionType = true;
  this._preserveCollections = false;
  this._preserveType = false;
};
GeometryTransformer.prototype.transformPoint = function transformPoint (geom, parent) {
  return this._factory.createPoint(this.transformCoordinates(geom.getCoordinateSequence(), geom))
};
GeometryTransformer.prototype.transformPolygon = function transformPolygon (geom, parent) {
    var this$1 = this;

  var isAllValidLinearRings = true;
  var shell = this.transformLinearRing(geom.getExteriorRing(), geom);
  if (shell === null || !(shell instanceof LinearRing) || shell.isEmpty()) { isAllValidLinearRings = false; }
  var holes = new ArrayList();
  for (var i = 0; i < geom.getNumInteriorRing(); i++) {
    var hole = this$1.transformLinearRing(geom.getInteriorRingN(i), geom);
    if (hole === null || hole.isEmpty()) {
      continue
    }
    if (!(hole instanceof LinearRing)) { isAllValidLinearRings = false; }
    holes.add(hole);
  }
  if (isAllValidLinearRings) { return this._factory.createPolygon(shell, holes.toArray([])); } else {
    var components = new ArrayList();
    if (shell !== null) { components.add(shell); }
    components.addAll(holes);
    return this._factory.buildGeometry(components)
  }
};
GeometryTransformer.prototype.createCoordinateSequence = function createCoordinateSequence (coords) {
  return this._factory.getCoordinateSequenceFactory().create(coords)
};
GeometryTransformer.prototype.getInputGeometry = function getInputGeometry () {
  return this._inputGeom
};
GeometryTransformer.prototype.transformMultiLineString = function transformMultiLineString (geom, parent) {
    var this$1 = this;

  var transGeomList = new ArrayList();
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var transformGeom = this$1.transformLineString(geom.getGeometryN(i), geom);
    if (transformGeom === null) { continue }
    if (transformGeom.isEmpty()) { continue }
    transGeomList.add(transformGeom);
  }
  return this._factory.buildGeometry(transGeomList)
};
GeometryTransformer.prototype.transformCoordinates = function transformCoordinates (coords, parent) {
  return this.copy(coords)
};
GeometryTransformer.prototype.transformLineString = function transformLineString (geom, parent) {
  return this._factory.createLineString(this.transformCoordinates(geom.getCoordinateSequence(), geom))
};
GeometryTransformer.prototype.transformMultiPoint = function transformMultiPoint (geom, parent) {
    var this$1 = this;

  var transGeomList = new ArrayList();
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var transformGeom = this$1.transformPoint(geom.getGeometryN(i), geom);
    if (transformGeom === null) { continue }
    if (transformGeom.isEmpty()) { continue }
    transGeomList.add(transformGeom);
  }
  return this._factory.buildGeometry(transGeomList)
};
GeometryTransformer.prototype.transformMultiPolygon = function transformMultiPolygon (geom, parent) {
    var this$1 = this;

  var transGeomList = new ArrayList();
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var transformGeom = this$1.transformPolygon(geom.getGeometryN(i), geom);
    if (transformGeom === null) { continue }
    if (transformGeom.isEmpty()) { continue }
    transGeomList.add(transformGeom);
  }
  return this._factory.buildGeometry(transGeomList)
};
GeometryTransformer.prototype.copy = function copy (seq) {
  return seq.copy()
};
GeometryTransformer.prototype.transformGeometryCollection = function transformGeometryCollection (geom, parent) {
    var this$1 = this;

  var transGeomList = new ArrayList();
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var transformGeom = this$1.transform(geom.getGeometryN(i));
    if (transformGeom === null) { continue }
    if (this$1._pruneEmptyGeometry && transformGeom.isEmpty()) { continue }
    transGeomList.add(transformGeom);
  }
  if (this._preserveGeometryCollectionType) { return this._factory.createGeometryCollection(GeometryFactory.toGeometryArray(transGeomList)) }
  return this._factory.buildGeometry(transGeomList)
};
GeometryTransformer.prototype.transform = function transform (inputGeom) {
  this._inputGeom = inputGeom;
  this._factory = inputGeom.getFactory();
  if (inputGeom instanceof Point) { return this.transformPoint(inputGeom, null) }
  if (inputGeom instanceof MultiPoint) { return this.transformMultiPoint(inputGeom, null) }
  if (inputGeom instanceof LinearRing) { return this.transformLinearRing(inputGeom, null) }
  if (inputGeom instanceof LineString) { return this.transformLineString(inputGeom, null) }
  if (inputGeom instanceof MultiLineString) { return this.transformMultiLineString(inputGeom, null) }
  if (inputGeom instanceof Polygon) { return this.transformPolygon(inputGeom, null) }
  if (inputGeom instanceof MultiPolygon) { return this.transformMultiPolygon(inputGeom, null) }
  if (inputGeom instanceof GeometryCollection) { return this.transformGeometryCollection(inputGeom, null) }
  throw new IllegalArgumentException('Unknown Geometry subtype: ' + inputGeom.getClass().getName())
};
GeometryTransformer.prototype.transformLinearRing = function transformLinearRing (geom, parent) {
  var seq = this.transformCoordinates(geom.getCoordinateSequence(), geom);
  if (seq === null) { return this._factory.createLinearRing(null) }
  var seqSize = seq.size();
  if (seqSize > 0 && seqSize < 4 && !this._preserveType) { return this._factory.createLineString(seq) }
  return this._factory.createLinearRing(seq)
};
GeometryTransformer.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryTransformer.prototype.getClass = function getClass () {
  return GeometryTransformer
};

var LineStringSnapper = function LineStringSnapper () {
  this._snapTolerance = 0.0;
  this._srcPts = null;
  this._seg = new LineSegment();
  this._allowSnappingToSourceVertices = false;
  this._isClosed = false;
  if (arguments[0] instanceof LineString && typeof arguments[1] === 'number') {
    var srcLine = arguments[0];
    var snapTolerance = arguments[1];
    LineStringSnapper.call(this, srcLine.getCoordinates(), snapTolerance);
  } else if (arguments[0] instanceof Array && typeof arguments[1] === 'number') {
    var srcPts = arguments[0];
    var snapTolerance$1 = arguments[1];
    this._srcPts = srcPts;
    this._isClosed = LineStringSnapper.isClosed(srcPts);
    this._snapTolerance = snapTolerance$1;
  }
};
LineStringSnapper.prototype.snapVertices = function snapVertices (srcCoords, snapPts) {
    var this$1 = this;

  var end = this._isClosed ? srcCoords.size() - 1 : srcCoords.size();
  for (var i = 0; i < end; i++) {
    var srcPt = srcCoords.get(i);
    var snapVert = this$1.findSnapForVertex(srcPt, snapPts);
    if (snapVert !== null) {
      srcCoords.set(i, new Coordinate(snapVert));
      if (i === 0 && this$1._isClosed) { srcCoords.set(srcCoords.size() - 1, new Coordinate(snapVert)); }
    }
  }
};
LineStringSnapper.prototype.findSnapForVertex = function findSnapForVertex (pt, snapPts) {
    var this$1 = this;

  for (var i = 0; i < snapPts.length; i++) {
    if (pt.equals2D(snapPts[i])) { return null }
    if (pt.distance(snapPts[i]) < this$1._snapTolerance) { return snapPts[i] }
  }
  return null
};
LineStringSnapper.prototype.snapTo = function snapTo (snapPts) {
  var coordList = new CoordinateList(this._srcPts);
  this.snapVertices(coordList, snapPts);
  this.snapSegments(coordList, snapPts);
  var newPts = coordList.toCoordinateArray();
  return newPts
};
LineStringSnapper.prototype.snapSegments = function snapSegments (srcCoords, snapPts) {
    var this$1 = this;

  if (snapPts.length === 0) { return null }
  var distinctPtCount = snapPts.length;
  if (snapPts[0].equals2D(snapPts[snapPts.length - 1])) { distinctPtCount = snapPts.length - 1; }
  for (var i = 0; i < distinctPtCount; i++) {
    var snapPt = snapPts[i];
    var index = this$1.findSegmentIndexToSnap(snapPt, srcCoords);
    if (index >= 0) {
      srcCoords.add(index + 1, new Coordinate(snapPt), false);
    }
  }
};
LineStringSnapper.prototype.findSegmentIndexToSnap = function findSegmentIndexToSnap (snapPt, srcCoords) {
    var this$1 = this;

  var minDist = Double.MAX_VALUE;
  var snapIndex = -1;
  for (var i = 0; i < srcCoords.size() - 1; i++) {
    this$1._seg.p0 = srcCoords.get(i);
    this$1._seg.p1 = srcCoords.get(i + 1);
    if (this$1._seg.p0.equals2D(snapPt) || this$1._seg.p1.equals2D(snapPt)) {
      if (this$1._allowSnappingToSourceVertices) { continue; } else { return -1 }
    }
    var dist = this$1._seg.distance(snapPt);
    if (dist < this$1._snapTolerance && dist < minDist) {
      minDist = dist;
      snapIndex = i;
    }
  }
  return snapIndex
};
LineStringSnapper.prototype.setAllowSnappingToSourceVertices = function setAllowSnappingToSourceVertices (allowSnappingToSourceVertices) {
  this._allowSnappingToSourceVertices = allowSnappingToSourceVertices;
};
LineStringSnapper.prototype.interfaces_ = function interfaces_ () {
  return []
};
LineStringSnapper.prototype.getClass = function getClass () {
  return LineStringSnapper
};
LineStringSnapper.isClosed = function isClosed (pts) {
  if (pts.length <= 1) { return false }
  return pts[0].equals2D(pts[pts.length - 1])
};

var GeometrySnapper = function GeometrySnapper (srcGeom) {
  this._srcGeom = srcGeom || null;
};

var staticAccessors$41 = { SNAP_PRECISION_FACTOR: { configurable: true } };
GeometrySnapper.prototype.snapTo = function snapTo (snapGeom, snapTolerance) {
  var snapPts = this.extractTargetCoordinates(snapGeom);
  var snapTrans = new SnapTransformer(snapTolerance, snapPts);
  return snapTrans.transform(this._srcGeom)
};
GeometrySnapper.prototype.snapToSelf = function snapToSelf (snapTolerance, cleanResult) {
  var snapPts = this.extractTargetCoordinates(this._srcGeom);
  var snapTrans = new SnapTransformer(snapTolerance, snapPts, true);
  var snappedGeom = snapTrans.transform(this._srcGeom);
  var result = snappedGeom;
  if (cleanResult && hasInterface(result, Polygonal)) {
    result = snappedGeom.buffer(0);
  }
  return result
};
GeometrySnapper.prototype.computeSnapTolerance = function computeSnapTolerance (ringPts) {
  var minSegLen = this.computeMinimumSegmentLength(ringPts);
  var snapTol = minSegLen / 10;
  return snapTol
};
GeometrySnapper.prototype.extractTargetCoordinates = function extractTargetCoordinates (g) {
  var ptSet = new TreeSet();
  var pts = g.getCoordinates();
  for (var i = 0; i < pts.length; i++) {
    ptSet.add(pts[i]);
  }
  return ptSet.toArray(new Array(0).fill(null))
};
GeometrySnapper.prototype.computeMinimumSegmentLength = function computeMinimumSegmentLength (pts) {
  var minSegLen = Double.MAX_VALUE;
  for (var i = 0; i < pts.length - 1; i++) {
    var segLen = pts[i].distance(pts[i + 1]);
    if (segLen < minSegLen) { minSegLen = segLen; }
  }
  return minSegLen
};
GeometrySnapper.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometrySnapper.prototype.getClass = function getClass () {
  return GeometrySnapper
};
GeometrySnapper.snap = function snap (g0, g1, snapTolerance) {
  var snapGeom = new Array(2).fill(null);
  var snapper0 = new GeometrySnapper(g0);
  snapGeom[0] = snapper0.snapTo(g1, snapTolerance);
  var snapper1 = new GeometrySnapper(g1);
  snapGeom[1] = snapper1.snapTo(snapGeom[0], snapTolerance);
  return snapGeom
};
GeometrySnapper.computeOverlaySnapTolerance = function computeOverlaySnapTolerance () {
  if (arguments.length === 1) {
    var g = arguments[0];
    var snapTolerance = GeometrySnapper.computeSizeBasedSnapTolerance(g);
    var pm = g.getPrecisionModel();
    if (pm.getType() === PrecisionModel.FIXED) {
      var fixedSnapTol = 1 / pm.getScale() * 2 / 1.415;
      if (fixedSnapTol > snapTolerance) { snapTolerance = fixedSnapTol; }
    }
    return snapTolerance
  } else if (arguments.length === 2) {
    var g0 = arguments[0];
    var g1 = arguments[1];
    return Math.min(GeometrySnapper.computeOverlaySnapTolerance(g0), GeometrySnapper.computeOverlaySnapTolerance(g1))
  }
};
GeometrySnapper.computeSizeBasedSnapTolerance = function computeSizeBasedSnapTolerance (g) {
  var env = g.getEnvelopeInternal();
  var minDimension = Math.min(env.getHeight(), env.getWidth());
  var snapTol = minDimension * GeometrySnapper.SNAP_PRECISION_FACTOR;
  return snapTol
};
GeometrySnapper.snapToSelf = function snapToSelf (geom, snapTolerance, cleanResult) {
  var snapper0 = new GeometrySnapper(geom);
  return snapper0.snapToSelf(snapTolerance, cleanResult)
};
staticAccessors$41.SNAP_PRECISION_FACTOR.get = function () { return 1e-9 };

Object.defineProperties( GeometrySnapper, staticAccessors$41 );

var SnapTransformer = (function (GeometryTransformer$$1) {
  function SnapTransformer (snapTolerance, snapPts, isSelfSnap) {
    GeometryTransformer$$1.call(this);
    this._snapTolerance = snapTolerance || null;
    this._snapPts = snapPts || null;
    this._isSelfSnap = (isSelfSnap !== undefined) ? isSelfSnap : false;
  }

  if ( GeometryTransformer$$1 ) SnapTransformer.__proto__ = GeometryTransformer$$1;
  SnapTransformer.prototype = Object.create( GeometryTransformer$$1 && GeometryTransformer$$1.prototype );
  SnapTransformer.prototype.constructor = SnapTransformer;
  SnapTransformer.prototype.snapLine = function snapLine (srcPts, snapPts) {
    var snapper = new LineStringSnapper(srcPts, this._snapTolerance);
    snapper.setAllowSnappingToSourceVertices(this._isSelfSnap);
    return snapper.snapTo(snapPts)
  };
  SnapTransformer.prototype.transformCoordinates = function transformCoordinates (coords, parent) {
    var srcPts = coords.toCoordinateArray();
    var newPts = this.snapLine(srcPts, this._snapPts);
    return this._factory.getCoordinateSequenceFactory().create(newPts)
  };
  SnapTransformer.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  SnapTransformer.prototype.getClass = function getClass () {
    return SnapTransformer
  };

  return SnapTransformer;
}(GeometryTransformer));

var CommonBits = function CommonBits () {
  this._isFirst = true;
  this._commonMantissaBitsCount = 53;
  this._commonBits = 0;
  this._commonSignExp = null;
};
CommonBits.prototype.getCommon = function getCommon () {
  return Double.longBitsToDouble(this._commonBits)
};
CommonBits.prototype.add = function add (num) {
  var numBits = Double.doubleToLongBits(num);
  if (this._isFirst) {
    this._commonBits = numBits;
    this._commonSignExp = CommonBits.signExpBits(this._commonBits);
    this._isFirst = false;
    return null
  }
  var numSignExp = CommonBits.signExpBits(numBits);
  if (numSignExp !== this._commonSignExp) {
    this._commonBits = 0;
    return null
  }
  this._commonMantissaBitsCount = CommonBits.numCommonMostSigMantissaBits(this._commonBits, numBits);
  this._commonBits = CommonBits.zeroLowerBits(this._commonBits, 64 - (12 + this._commonMantissaBitsCount));
};
CommonBits.prototype.toString = function toString () {
  if (arguments.length === 1) {
    var bits = arguments[0];
    var x = Double.longBitsToDouble(bits);
    var numStr = Double.toBinaryString(bits);
    var padStr = '0000000000000000000000000000000000000000000000000000000000000000' + numStr;
    var bitStr = padStr.substring(padStr.length - 64);
    var str = bitStr.substring(0, 1) + '  ' + bitStr.substring(1, 12) + '(exp) ' + bitStr.substring(12) + ' [ ' + x + ' ]';
    return str
  }
};
CommonBits.prototype.interfaces_ = function interfaces_ () {
  return []
};
CommonBits.prototype.getClass = function getClass () {
  return CommonBits
};
CommonBits.getBit = function getBit (bits, i) {
  var mask = 1 << i;
  return (bits & mask) !== 0 ? 1 : 0
};
CommonBits.signExpBits = function signExpBits (num) {
  return num >> 52
};
CommonBits.zeroLowerBits = function zeroLowerBits (bits, nBits) {
  var invMask = (1 << nBits) - 1;
  var mask = ~invMask;
  var zeroed = bits & mask;
  return zeroed
};
CommonBits.numCommonMostSigMantissaBits = function numCommonMostSigMantissaBits (num1, num2) {
  var count = 0;
  for (var i = 52; i >= 0; i--) {
    if (CommonBits.getBit(num1, i) !== CommonBits.getBit(num2, i)) { return count }
    count++;
  }
  return 52
};

var CommonBitsRemover = function CommonBitsRemover () {
  this._commonCoord = null;
  this._ccFilter = new CommonCoordinateFilter();
};

var staticAccessors$42 = { CommonCoordinateFilter: { configurable: true },Translater: { configurable: true } };
CommonBitsRemover.prototype.addCommonBits = function addCommonBits (geom) {
  var trans = new Translater(this._commonCoord);
  geom.apply(trans);
  geom.geometryChanged();
};
CommonBitsRemover.prototype.removeCommonBits = function removeCommonBits (geom) {
  if (this._commonCoord.x === 0.0 && this._commonCoord.y === 0.0) { return geom }
  var invCoord = new Coordinate(this._commonCoord);
  invCoord.x = -invCoord.x;
  invCoord.y = -invCoord.y;
  var trans = new Translater(invCoord);
  geom.apply(trans);
  geom.geometryChanged();
  return geom
};
CommonBitsRemover.prototype.getCommonCoordinate = function getCommonCoordinate () {
  return this._commonCoord
};
CommonBitsRemover.prototype.add = function add (geom) {
  geom.apply(this._ccFilter);
  this._commonCoord = this._ccFilter.getCommonCoordinate();
};
CommonBitsRemover.prototype.interfaces_ = function interfaces_ () {
  return []
};
CommonBitsRemover.prototype.getClass = function getClass () {
  return CommonBitsRemover
};
staticAccessors$42.CommonCoordinateFilter.get = function () { return CommonCoordinateFilter };
staticAccessors$42.Translater.get = function () { return Translater };

Object.defineProperties( CommonBitsRemover, staticAccessors$42 );

var CommonCoordinateFilter = function CommonCoordinateFilter () {
  this._commonBitsX = new CommonBits();
  this._commonBitsY = new CommonBits();
};
CommonCoordinateFilter.prototype.filter = function filter (coord) {
  this._commonBitsX.add(coord.x);
  this._commonBitsY.add(coord.y);
};
CommonCoordinateFilter.prototype.getCommonCoordinate = function getCommonCoordinate () {
  return new Coordinate(this._commonBitsX.getCommon(), this._commonBitsY.getCommon())
};
CommonCoordinateFilter.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateFilter]
};
CommonCoordinateFilter.prototype.getClass = function getClass () {
  return CommonCoordinateFilter
};

var Translater = function Translater () {
  this.trans = null;
  var trans = arguments[0];
  this.trans = trans;
};
Translater.prototype.filter = function filter (seq, i) {
  var xp = seq.getOrdinate(i, 0) + this.trans.x;
  var yp = seq.getOrdinate(i, 1) + this.trans.y;
  seq.setOrdinate(i, 0, xp);
  seq.setOrdinate(i, 1, yp);
};
Translater.prototype.isDone = function isDone () {
  return false
};
Translater.prototype.isGeometryChanged = function isGeometryChanged () {
  return true
};
Translater.prototype.interfaces_ = function interfaces_ () {
  return [CoordinateSequenceFilter]
};
Translater.prototype.getClass = function getClass () {
  return Translater
};

var SnapOverlayOp = function SnapOverlayOp (g1, g2) {
  this._geom = new Array(2).fill(null);
  this._snapTolerance = null;
  this._cbr = null;
  this._geom[0] = g1;
  this._geom[1] = g2;
  this.computeSnapTolerance();
};
SnapOverlayOp.prototype.selfSnap = function selfSnap (geom) {
  var snapper0 = new GeometrySnapper(geom);
  var snapGeom = snapper0.snapTo(geom, this._snapTolerance);
  return snapGeom
};
SnapOverlayOp.prototype.removeCommonBits = function removeCommonBits (geom) {
  this._cbr = new CommonBitsRemover();
  this._cbr.add(geom[0]);
  this._cbr.add(geom[1]);
  var remGeom = new Array(2).fill(null);
  remGeom[0] = this._cbr.removeCommonBits(geom[0].copy());
  remGeom[1] = this._cbr.removeCommonBits(geom[1].copy());
  return remGeom
};
SnapOverlayOp.prototype.prepareResult = function prepareResult (geom) {
  this._cbr.addCommonBits(geom);
  return geom
};
SnapOverlayOp.prototype.getResultGeometry = function getResultGeometry (opCode) {
  var prepGeom = this.snap(this._geom);
  var result = OverlayOp.overlayOp(prepGeom[0], prepGeom[1], opCode);
  return this.prepareResult(result)
};
SnapOverlayOp.prototype.checkValid = function checkValid (g) {
  if (!g.isValid()) {
    System.out.println('Snapped geometry is invalid');
  }
};
SnapOverlayOp.prototype.computeSnapTolerance = function computeSnapTolerance () {
  this._snapTolerance = GeometrySnapper.computeOverlaySnapTolerance(this._geom[0], this._geom[1]);
};
SnapOverlayOp.prototype.snap = function snap (geom) {
  var remGeom = this.removeCommonBits(geom);
  var snapGeom = GeometrySnapper.snap(remGeom[0], remGeom[1], this._snapTolerance);
  return snapGeom
};
SnapOverlayOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
SnapOverlayOp.prototype.getClass = function getClass () {
  return SnapOverlayOp
};
SnapOverlayOp.overlayOp = function overlayOp (g0, g1, opCode) {
  var op = new SnapOverlayOp(g0, g1);
  return op.getResultGeometry(opCode)
};
SnapOverlayOp.union = function union (g0, g1) {
  return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.UNION)
};
SnapOverlayOp.intersection = function intersection (g0, g1) {
  return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION)
};
SnapOverlayOp.symDifference = function symDifference (g0, g1) {
  return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE)
};
SnapOverlayOp.difference = function difference (g0, g1) {
  return SnapOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE)
};

var SnapIfNeededOverlayOp = function SnapIfNeededOverlayOp (g1, g2) {
  this._geom = new Array(2).fill(null);
  this._geom[0] = g1;
  this._geom[1] = g2;
};
SnapIfNeededOverlayOp.prototype.getResultGeometry = function getResultGeometry (opCode) {
  var result = null;
  var isSuccess = false;
  var savedException = null;
  try {
    result = OverlayOp.overlayOp(this._geom[0], this._geom[1], opCode);
    var isValid = true;
    if (isValid) { isSuccess = true; }
  } catch (ex) {
    if (ex instanceof RuntimeException) {
      savedException = ex;
    } else { throw ex }
  } finally {}
  if (!isSuccess) {
    try {
      result = SnapOverlayOp.overlayOp(this._geom[0], this._geom[1], opCode);
    } catch (ex) {
      if (ex instanceof RuntimeException) {
        throw savedException
      } else { throw ex }
    } finally {}
  }
  return result
};
SnapIfNeededOverlayOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
SnapIfNeededOverlayOp.prototype.getClass = function getClass () {
  return SnapIfNeededOverlayOp
};
SnapIfNeededOverlayOp.overlayOp = function overlayOp (g0, g1, opCode) {
  var op = new SnapIfNeededOverlayOp(g0, g1);
  return op.getResultGeometry(opCode)
};
SnapIfNeededOverlayOp.union = function union (g0, g1) {
  return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.UNION)
};
SnapIfNeededOverlayOp.intersection = function intersection (g0, g1) {
  return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.INTERSECTION)
};
SnapIfNeededOverlayOp.symDifference = function symDifference (g0, g1) {
  return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.SYMDIFFERENCE)
};
SnapIfNeededOverlayOp.difference = function difference (g0, g1) {
  return SnapIfNeededOverlayOp.overlayOp(g0, g1, OverlayOp.DIFFERENCE)
};

var MonotoneChain$2 = function MonotoneChain () {
  this.mce = null;
  this.chainIndex = null;
  var mce = arguments[0];
  var chainIndex = arguments[1];
  this.mce = mce;
  this.chainIndex = chainIndex;
};
MonotoneChain$2.prototype.computeIntersections = function computeIntersections (mc, si) {
  this.mce.computeIntersectsForChain(this.chainIndex, mc.mce, mc.chainIndex, si);
};
MonotoneChain$2.prototype.interfaces_ = function interfaces_ () {
  return []
};
MonotoneChain$2.prototype.getClass = function getClass () {
  return MonotoneChain$2
};

var SweepLineEvent = function SweepLineEvent () {
  this._label = null;
  this._xValue = null;
  this._eventType = null;
  this._insertEvent = null;
  this._deleteEventIndex = null;
  this._obj = null;
  if (arguments.length === 2) {
    var x = arguments[0];
    var insertEvent = arguments[1];
    this._eventType = SweepLineEvent.DELETE;
    this._xValue = x;
    this._insertEvent = insertEvent;
  } else if (arguments.length === 3) {
    var label = arguments[0];
    var x$1 = arguments[1];
    var obj = arguments[2];
    this._eventType = SweepLineEvent.INSERT;
    this._label = label;
    this._xValue = x$1;
    this._obj = obj;
  }
};

var staticAccessors$43 = { INSERT: { configurable: true },DELETE: { configurable: true } };
SweepLineEvent.prototype.isDelete = function isDelete () {
  return this._eventType === SweepLineEvent.DELETE
};
SweepLineEvent.prototype.setDeleteEventIndex = function setDeleteEventIndex (deleteEventIndex) {
  this._deleteEventIndex = deleteEventIndex;
};
SweepLineEvent.prototype.getObject = function getObject () {
  return this._obj
};
SweepLineEvent.prototype.compareTo = function compareTo (o) {
  var pe = o;
  if (this._xValue < pe._xValue) { return -1 }
  if (this._xValue > pe._xValue) { return 1 }
  if (this._eventType < pe._eventType) { return -1 }
  if (this._eventType > pe._eventType) { return 1 }
  return 0
};
SweepLineEvent.prototype.getInsertEvent = function getInsertEvent () {
  return this._insertEvent
};
SweepLineEvent.prototype.isInsert = function isInsert () {
  return this._eventType === SweepLineEvent.INSERT
};
SweepLineEvent.prototype.isSameLabel = function isSameLabel (ev) {
  if (this._label === null) { return false }
  return this._label === ev._label
};
SweepLineEvent.prototype.getDeleteEventIndex = function getDeleteEventIndex () {
  return this._deleteEventIndex
};
SweepLineEvent.prototype.interfaces_ = function interfaces_ () {
  return [Comparable]
};
SweepLineEvent.prototype.getClass = function getClass () {
  return SweepLineEvent
};
staticAccessors$43.INSERT.get = function () { return 1 };
staticAccessors$43.DELETE.get = function () { return 2 };

Object.defineProperties( SweepLineEvent, staticAccessors$43 );

var EdgeSetIntersector = function EdgeSetIntersector () {};

EdgeSetIntersector.prototype.interfaces_ = function interfaces_ () {
  return []
};
EdgeSetIntersector.prototype.getClass = function getClass () {
  return EdgeSetIntersector
};

var SegmentIntersector$2 = function SegmentIntersector () {
  this._hasIntersection = false;
  this._hasProper = false;
  this._hasProperInterior = false;
  this._properIntersectionPoint = null;
  this._li = null;
  this._includeProper = null;
  this._recordIsolated = null;
  this._isSelfIntersection = null;
  this._numIntersections = 0;
  this.numTests = 0;
  this._bdyNodes = null;
  this._isDone = false;
  this._isDoneWhenProperInt = false;
  var li = arguments[0];
  var includeProper = arguments[1];
  var recordIsolated = arguments[2];
  this._li = li;
  this._includeProper = includeProper;
  this._recordIsolated = recordIsolated;
};
SegmentIntersector$2.prototype.isTrivialIntersection = function isTrivialIntersection (e0, segIndex0, e1, segIndex1) {
  if (e0 === e1) {
    if (this._li.getIntersectionNum() === 1) {
      if (SegmentIntersector$2.isAdjacentSegments(segIndex0, segIndex1)) { return true }
      if (e0.isClosed()) {
        var maxSegIndex = e0.getNumPoints() - 1;
        if ((segIndex0 === 0 && segIndex1 === maxSegIndex) ||
            (segIndex1 === 0 && segIndex0 === maxSegIndex)) {
          return true
        }
      }
    }
  }
  return false
};
SegmentIntersector$2.prototype.getProperIntersectionPoint = function getProperIntersectionPoint () {
  return this._properIntersectionPoint
};
SegmentIntersector$2.prototype.setIsDoneIfProperInt = function setIsDoneIfProperInt (isDoneWhenProperInt) {
  this._isDoneWhenProperInt = isDoneWhenProperInt;
};
SegmentIntersector$2.prototype.hasProperInteriorIntersection = function hasProperInteriorIntersection () {
  return this._hasProperInterior
};
SegmentIntersector$2.prototype.isBoundaryPointInternal = function isBoundaryPointInternal (li, bdyNodes) {
  for (var i = bdyNodes.iterator(); i.hasNext();) {
    var node = i.next();
    var pt = node.getCoordinate();
    if (li.isIntersection(pt)) { return true }
  }
  return false
};
SegmentIntersector$2.prototype.hasProperIntersection = function hasProperIntersection () {
  return this._hasProper
};
SegmentIntersector$2.prototype.hasIntersection = function hasIntersection () {
  return this._hasIntersection
};
SegmentIntersector$2.prototype.isDone = function isDone () {
  return this._isDone
};
SegmentIntersector$2.prototype.isBoundaryPoint = function isBoundaryPoint (li, bdyNodes) {
  if (bdyNodes === null) { return false }
  if (this.isBoundaryPointInternal(li, bdyNodes[0])) { return true }
  if (this.isBoundaryPointInternal(li, bdyNodes[1])) { return true }
  return false
};
SegmentIntersector$2.prototype.setBoundaryNodes = function setBoundaryNodes (bdyNodes0, bdyNodes1) {
  this._bdyNodes = new Array(2).fill(null);
  this._bdyNodes[0] = bdyNodes0;
  this._bdyNodes[1] = bdyNodes1;
};
SegmentIntersector$2.prototype.addIntersections = function addIntersections (e0, segIndex0, e1, segIndex1) {
  if (e0 === e1 && segIndex0 === segIndex1) { return null }
  this.numTests++;
  var p00 = e0.getCoordinates()[segIndex0];
  var p01 = e0.getCoordinates()[segIndex0 + 1];
  var p10 = e1.getCoordinates()[segIndex1];
  var p11 = e1.getCoordinates()[segIndex1 + 1];
  this._li.computeIntersection(p00, p01, p10, p11);
  if (this._li.hasIntersection()) {
    if (this._recordIsolated) {
      e0.setIsolated(false);
      e1.setIsolated(false);
    }
    this._numIntersections++;
    if (!this.isTrivialIntersection(e0, segIndex0, e1, segIndex1)) {
      this._hasIntersection = true;
      if (this._includeProper || !this._li.isProper()) {
        e0.addIntersections(this._li, segIndex0, 0);
        e1.addIntersections(this._li, segIndex1, 1);
      }
      if (this._li.isProper()) {
        this._properIntersectionPoint = this._li.getIntersection(0).copy();
        this._hasProper = true;
        if (this._isDoneWhenProperInt) {
          this._isDone = true;
        }
        if (!this.isBoundaryPoint(this._li, this._bdyNodes)) { this._hasProperInterior = true; }
      }
    }
  }
};
SegmentIntersector$2.prototype.interfaces_ = function interfaces_ () {
  return []
};
SegmentIntersector$2.prototype.getClass = function getClass () {
  return SegmentIntersector$2
};
SegmentIntersector$2.isAdjacentSegments = function isAdjacentSegments (i1, i2) {
  return Math.abs(i1 - i2) === 1
};

var SimpleMCSweepLineIntersector = (function (EdgeSetIntersector$$1) {
  function SimpleMCSweepLineIntersector () {
    EdgeSetIntersector$$1.call(this);
    this.events = new ArrayList();
    this.nOverlaps = null;
  }

  if ( EdgeSetIntersector$$1 ) SimpleMCSweepLineIntersector.__proto__ = EdgeSetIntersector$$1;
  SimpleMCSweepLineIntersector.prototype = Object.create( EdgeSetIntersector$$1 && EdgeSetIntersector$$1.prototype );
  SimpleMCSweepLineIntersector.prototype.constructor = SimpleMCSweepLineIntersector;
  SimpleMCSweepLineIntersector.prototype.prepareEvents = function prepareEvents () {
    var this$1 = this;

    Collections.sort(this.events);
    for (var i = 0; i < this.events.size(); i++) {
      var ev = this$1.events.get(i);
      if (ev.isDelete()) {
        ev.getInsertEvent().setDeleteEventIndex(i);
      }
    }
  };
  SimpleMCSweepLineIntersector.prototype.computeIntersections = function computeIntersections () {
    var this$1 = this;

    if (arguments.length === 1) {
      var si = arguments[0];
      this.nOverlaps = 0;
      this.prepareEvents();
      for (var i = 0; i < this.events.size(); i++) {
        var ev = this$1.events.get(i);
        if (ev.isInsert()) {
          this$1.processOverlaps(i, ev.getDeleteEventIndex(), ev, si);
        }
        if (si.isDone()) {
          break
        }
      }
    } else if (arguments.length === 3) {
      if (arguments[2] instanceof SegmentIntersector$2 && (hasInterface(arguments[0], List) && hasInterface(arguments[1], List))) {
        var edges0 = arguments[0];
        var edges1 = arguments[1];
        var si$1 = arguments[2];
        this.addEdges(edges0, edges0);
        this.addEdges(edges1, edges1);
        this.computeIntersections(si$1);
      } else if (typeof arguments[2] === 'boolean' && (hasInterface(arguments[0], List) && arguments[1] instanceof SegmentIntersector$2)) {
        var edges = arguments[0];
        var si$2 = arguments[1];
        var testAllSegments = arguments[2];
        if (testAllSegments) { this.addEdges(edges, null); } else { this.addEdges(edges); }
        this.computeIntersections(si$2);
      }
    }
  };
  SimpleMCSweepLineIntersector.prototype.addEdge = function addEdge (edge, edgeSet) {
    var this$1 = this;

    var mce = edge.getMonotoneChainEdge();
    var startIndex = mce.getStartIndexes();
    for (var i = 0; i < startIndex.length - 1; i++) {
      var mc = new MonotoneChain$2(mce, i);
      var insertEvent = new SweepLineEvent(edgeSet, mce.getMinX(i), mc);
      this$1.events.add(insertEvent);
      this$1.events.add(new SweepLineEvent(mce.getMaxX(i), insertEvent));
    }
  };
  SimpleMCSweepLineIntersector.prototype.processOverlaps = function processOverlaps (start, end, ev0, si) {
    var this$1 = this;

    var mc0 = ev0.getObject();
    for (var i = start; i < end; i++) {
      var ev1 = this$1.events.get(i);
      if (ev1.isInsert()) {
        var mc1 = ev1.getObject();
        if (!ev0.isSameLabel(ev1)) {
          mc0.computeIntersections(mc1, si);
          this$1.nOverlaps++;
        }
      }
    }
  };
  SimpleMCSweepLineIntersector.prototype.addEdges = function addEdges () {
    var this$1 = this;

    if (arguments.length === 1) {
      var edges = arguments[0];
      for (var i = edges.iterator(); i.hasNext();) {
        var edge = i.next();
        this$1.addEdge(edge, edge);
      }
    } else if (arguments.length === 2) {
      var edges$1 = arguments[0];
      var edgeSet = arguments[1];
      for (var i$1 = edges$1.iterator(); i$1.hasNext();) {
        var edge$1 = i$1.next();
        this$1.addEdge(edge$1, edgeSet);
      }
    }
  };
  SimpleMCSweepLineIntersector.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  SimpleMCSweepLineIntersector.prototype.getClass = function getClass () {
    return SimpleMCSweepLineIntersector
  };

  return SimpleMCSweepLineIntersector;
}(EdgeSetIntersector));

var IntervalRTreeNode = function IntervalRTreeNode () {
  this._min = Double.POSITIVE_INFINITY;
  this._max = Double.NEGATIVE_INFINITY;
};

var staticAccessors$45 = { NodeComparator: { configurable: true } };
IntervalRTreeNode.prototype.getMin = function getMin () {
  return this._min
};
IntervalRTreeNode.prototype.intersects = function intersects (queryMin, queryMax) {
  if (this._min > queryMax || this._max < queryMin) { return false }
  return true
};
IntervalRTreeNode.prototype.getMax = function getMax () {
  return this._max
};
IntervalRTreeNode.prototype.toString = function toString () {
  return WKTWriter.toLineString(new Coordinate(this._min, 0), new Coordinate(this._max, 0))
};
IntervalRTreeNode.prototype.interfaces_ = function interfaces_ () {
  return []
};
IntervalRTreeNode.prototype.getClass = function getClass () {
  return IntervalRTreeNode
};
staticAccessors$45.NodeComparator.get = function () { return NodeComparator };

Object.defineProperties( IntervalRTreeNode, staticAccessors$45 );

var NodeComparator = function NodeComparator () {};

NodeComparator.prototype.compare = function compare (o1, o2) {
  var n1 = o1;
  var n2 = o2;
  var mid1 = (n1._min + n1._max) / 2;
  var mid2 = (n2._min + n2._max) / 2;
  if (mid1 < mid2) { return -1 }
  if (mid1 > mid2) { return 1 }
  return 0
};
NodeComparator.prototype.interfaces_ = function interfaces_ () {
  return [Comparator]
};
NodeComparator.prototype.getClass = function getClass () {
  return NodeComparator
};

var IntervalRTreeLeafNode = (function (IntervalRTreeNode$$1) {
  function IntervalRTreeLeafNode () {
    IntervalRTreeNode$$1.call(this);
    this._item = null;
    var min = arguments[0];
    var max = arguments[1];
    var item = arguments[2];
    this._min = min;
    this._max = max;
    this._item = item;
  }

  if ( IntervalRTreeNode$$1 ) IntervalRTreeLeafNode.__proto__ = IntervalRTreeNode$$1;
  IntervalRTreeLeafNode.prototype = Object.create( IntervalRTreeNode$$1 && IntervalRTreeNode$$1.prototype );
  IntervalRTreeLeafNode.prototype.constructor = IntervalRTreeLeafNode;
  IntervalRTreeLeafNode.prototype.query = function query (queryMin, queryMax, visitor) {
    if (!this.intersects(queryMin, queryMax)) { return null }
    visitor.visitItem(this._item);
  };
  IntervalRTreeLeafNode.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  IntervalRTreeLeafNode.prototype.getClass = function getClass () {
    return IntervalRTreeLeafNode
  };

  return IntervalRTreeLeafNode;
}(IntervalRTreeNode));

var IntervalRTreeBranchNode = (function (IntervalRTreeNode$$1) {
  function IntervalRTreeBranchNode () {
    IntervalRTreeNode$$1.call(this);
    this._node1 = null;
    this._node2 = null;
    var n1 = arguments[0];
    var n2 = arguments[1];
    this._node1 = n1;
    this._node2 = n2;
    this.buildExtent(this._node1, this._node2);
  }

  if ( IntervalRTreeNode$$1 ) IntervalRTreeBranchNode.__proto__ = IntervalRTreeNode$$1;
  IntervalRTreeBranchNode.prototype = Object.create( IntervalRTreeNode$$1 && IntervalRTreeNode$$1.prototype );
  IntervalRTreeBranchNode.prototype.constructor = IntervalRTreeBranchNode;
  IntervalRTreeBranchNode.prototype.buildExtent = function buildExtent (n1, n2) {
    this._min = Math.min(n1._min, n2._min);
    this._max = Math.max(n1._max, n2._max);
  };
  IntervalRTreeBranchNode.prototype.query = function query (queryMin, queryMax, visitor) {
    if (!this.intersects(queryMin, queryMax)) {
      return null
    }
    if (this._node1 !== null) { this._node1.query(queryMin, queryMax, visitor); }
    if (this._node2 !== null) { this._node2.query(queryMin, queryMax, visitor); }
  };
  IntervalRTreeBranchNode.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  IntervalRTreeBranchNode.prototype.getClass = function getClass () {
    return IntervalRTreeBranchNode
  };

  return IntervalRTreeBranchNode;
}(IntervalRTreeNode));

var SortedPackedIntervalRTree = function SortedPackedIntervalRTree () {
  this._leaves = new ArrayList();
  this._root = null;
  this._level = 0;
};
SortedPackedIntervalRTree.prototype.buildTree = function buildTree () {
    var this$1 = this;

  Collections.sort(this._leaves, new IntervalRTreeNode.NodeComparator());
  var src = this._leaves;
  var temp = null;
  var dest = new ArrayList();
  while (true) {
    this$1.buildLevel(src, dest);
    if (dest.size() === 1) { return dest.get(0) }
    temp = src;
    src = dest;
    dest = temp;
  }
};
SortedPackedIntervalRTree.prototype.insert = function insert (min, max, item) {
  if (this._root !== null) { throw new Error('Index cannot be added to once it has been queried') }
  this._leaves.add(new IntervalRTreeLeafNode(min, max, item));
};
SortedPackedIntervalRTree.prototype.query = function query (min, max, visitor) {
  this.init();
  this._root.query(min, max, visitor);
};
SortedPackedIntervalRTree.prototype.buildRoot = function buildRoot () {
  if (this._root !== null) { return null }
  this._root = this.buildTree();
};
SortedPackedIntervalRTree.prototype.printNode = function printNode (node) {
  System.out.println(WKTWriter.toLineString(new Coordinate(node._min, this._level), new Coordinate(node._max, this._level)));
};
SortedPackedIntervalRTree.prototype.init = function init () {
  if (this._root !== null) { return null }
  this.buildRoot();
};
SortedPackedIntervalRTree.prototype.buildLevel = function buildLevel (src, dest) {
  this._level++;
  dest.clear();
  for (var i = 0; i < src.size(); i += 2) {
    var n1 = src.get(i);
    var n2 = i + 1 < src.size() ? src.get(i) : null;
    if (n2 === null) {
      dest.add(n1);
    } else {
      var node = new IntervalRTreeBranchNode(src.get(i), src.get(i + 1));
      dest.add(node);
    }
  }
};
SortedPackedIntervalRTree.prototype.interfaces_ = function interfaces_ () {
  return []
};
SortedPackedIntervalRTree.prototype.getClass = function getClass () {
  return SortedPackedIntervalRTree
};

var ArrayListVisitor = function ArrayListVisitor () {
  this._items = new ArrayList();
};
ArrayListVisitor.prototype.visitItem = function visitItem (item) {
  this._items.add(item);
};
ArrayListVisitor.prototype.getItems = function getItems () {
  return this._items
};
ArrayListVisitor.prototype.interfaces_ = function interfaces_ () {
  return [ItemVisitor]
};
ArrayListVisitor.prototype.getClass = function getClass () {
  return ArrayListVisitor
};

var IndexedPointInAreaLocator = function IndexedPointInAreaLocator () {
  this._index = null;
  var g = arguments[0];
  if (!hasInterface(g, Polygonal)) { throw new IllegalArgumentException('Argument must be Polygonal') }
  this._index = new IntervalIndexedGeometry(g);
};

var staticAccessors$44 = { SegmentVisitor: { configurable: true },IntervalIndexedGeometry: { configurable: true } };
IndexedPointInAreaLocator.prototype.locate = function locate (p) {
  var rcc = new RayCrossingCounter(p);
  var visitor = new SegmentVisitor(rcc);
  this._index.query(p.y, p.y, visitor);
  return rcc.getLocation()
};
IndexedPointInAreaLocator.prototype.interfaces_ = function interfaces_ () {
  return [PointOnGeometryLocator]
};
IndexedPointInAreaLocator.prototype.getClass = function getClass () {
  return IndexedPointInAreaLocator
};
staticAccessors$44.SegmentVisitor.get = function () { return SegmentVisitor };
staticAccessors$44.IntervalIndexedGeometry.get = function () { return IntervalIndexedGeometry };

Object.defineProperties( IndexedPointInAreaLocator, staticAccessors$44 );

var SegmentVisitor = function SegmentVisitor () {
  this._counter = null;
  var counter = arguments[0];
  this._counter = counter;
};
SegmentVisitor.prototype.visitItem = function visitItem (item) {
  var seg = item;
  this._counter.countSegment(seg.getCoordinate(0), seg.getCoordinate(1));
};
SegmentVisitor.prototype.interfaces_ = function interfaces_ () {
  return [ItemVisitor]
};
SegmentVisitor.prototype.getClass = function getClass () {
  return SegmentVisitor
};

var IntervalIndexedGeometry = function IntervalIndexedGeometry () {
  this._index = new SortedPackedIntervalRTree();
  var geom = arguments[0];
  this.init(geom);
};
IntervalIndexedGeometry.prototype.init = function init (geom) {
    var this$1 = this;

  var lines = LinearComponentExtracter.getLines(geom);
  for (var i = lines.iterator(); i.hasNext();) {
    var line = i.next();
    var pts = line.getCoordinates();
    this$1.addLine(pts);
  }
};
IntervalIndexedGeometry.prototype.addLine = function addLine (pts) {
    var this$1 = this;

  for (var i = 1; i < pts.length; i++) {
    var seg = new LineSegment(pts[i - 1], pts[i]);
    var min = Math.min(seg.p0.y, seg.p1.y);
    var max = Math.max(seg.p0.y, seg.p1.y);
    this$1._index.insert(min, max, seg);
  }
};
IntervalIndexedGeometry.prototype.query = function query () {
  if (arguments.length === 2) {
    var min = arguments[0];
    var max = arguments[1];
    var visitor = new ArrayListVisitor();
    this._index.query(min, max, visitor);
    return visitor.getItems()
  } else if (arguments.length === 3) {
    var min$1 = arguments[0];
    var max$1 = arguments[1];
    var visitor$1 = arguments[2];
    this._index.query(min$1, max$1, visitor$1);
  }
};
IntervalIndexedGeometry.prototype.interfaces_ = function interfaces_ () {
  return []
};
IntervalIndexedGeometry.prototype.getClass = function getClass () {
  return IntervalIndexedGeometry
};

var GeometryGraph = (function (PlanarGraph$$1) {
  function GeometryGraph () {
    PlanarGraph$$1.call(this);
    this._parentGeom = null;
    this._lineEdgeMap = new HashMap();
    this._boundaryNodeRule = null;
    this._useBoundaryDeterminationRule = true;
    this._argIndex = null;
    this._boundaryNodes = null;
    this._hasTooFewPoints = false;
    this._invalidPoint = null;
    this._areaPtLocator = null;
    this._ptLocator = new PointLocator();
    if (arguments.length === 2) {
      var argIndex = arguments[0];
      var parentGeom = arguments[1];
      var boundaryNodeRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
      this._argIndex = argIndex;
      this._parentGeom = parentGeom;
      this._boundaryNodeRule = boundaryNodeRule;
      if (parentGeom !== null) {
        this.add(parentGeom);
      }
    } else if (arguments.length === 3) {
      var argIndex$1 = arguments[0];
      var parentGeom$1 = arguments[1];
      var boundaryNodeRule$1 = arguments[2];
      this._argIndex = argIndex$1;
      this._parentGeom = parentGeom$1;
      this._boundaryNodeRule = boundaryNodeRule$1;
      if (parentGeom$1 !== null) {
        this.add(parentGeom$1);
      }
    }
  }

  if ( PlanarGraph$$1 ) GeometryGraph.__proto__ = PlanarGraph$$1;
  GeometryGraph.prototype = Object.create( PlanarGraph$$1 && PlanarGraph$$1.prototype );
  GeometryGraph.prototype.constructor = GeometryGraph;
  GeometryGraph.prototype.insertBoundaryPoint = function insertBoundaryPoint (argIndex, coord) {
    var n = this._nodes.addNode(coord);
    var lbl = n.getLabel();
    var boundaryCount = 1;
    var loc = Location.NONE;
    loc = lbl.getLocation(argIndex, Position.ON);
    if (loc === Location.BOUNDARY) { boundaryCount++; }
    var newLoc = GeometryGraph.determineBoundary(this._boundaryNodeRule, boundaryCount);
    lbl.setLocation(argIndex, newLoc);
  };
  GeometryGraph.prototype.computeSelfNodes = function computeSelfNodes () {
    if (arguments.length === 2) {
      var li = arguments[0];
      var computeRingSelfNodes = arguments[1];
      return this.computeSelfNodes(li, computeRingSelfNodes, false)
    } else if (arguments.length === 3) {
      var li$1 = arguments[0];
      var computeRingSelfNodes$1 = arguments[1];
      var isDoneIfProperInt = arguments[2];
      var si = new SegmentIntersector$2(li$1, true, false);
      si.setIsDoneIfProperInt(isDoneIfProperInt);
      var esi = this.createEdgeSetIntersector();
      var isRings = this._parentGeom instanceof LinearRing || this._parentGeom instanceof Polygon || this._parentGeom instanceof MultiPolygon;
      var computeAllSegments = computeRingSelfNodes$1 || !isRings;
      esi.computeIntersections(this._edges, si, computeAllSegments);
      this.addSelfIntersectionNodes(this._argIndex);
      return si
    }
  };
  GeometryGraph.prototype.computeSplitEdges = function computeSplitEdges (edgelist) {
    for (var i = this._edges.iterator(); i.hasNext();) {
      var e = i.next();
      e.eiList.addSplitEdges(edgelist);
    }
  };
  GeometryGraph.prototype.computeEdgeIntersections = function computeEdgeIntersections (g, li, includeProper) {
    var si = new SegmentIntersector$2(li, includeProper, true);
    si.setBoundaryNodes(this.getBoundaryNodes(), g.getBoundaryNodes());
    var esi = this.createEdgeSetIntersector();
    esi.computeIntersections(this._edges, g._edges, si);
    return si
  };
  GeometryGraph.prototype.getGeometry = function getGeometry () {
    return this._parentGeom
  };
  GeometryGraph.prototype.getBoundaryNodeRule = function getBoundaryNodeRule () {
    return this._boundaryNodeRule
  };
  GeometryGraph.prototype.hasTooFewPoints = function hasTooFewPoints () {
    return this._hasTooFewPoints
  };
  GeometryGraph.prototype.addPoint = function addPoint () {
    if (arguments[0] instanceof Point) {
      var p = arguments[0];
      var coord = p.getCoordinate();
      this.insertPoint(this._argIndex, coord, Location.INTERIOR);
    } else if (arguments[0] instanceof Coordinate) {
      var pt = arguments[0];
      this.insertPoint(this._argIndex, pt, Location.INTERIOR);
    }
  };
  GeometryGraph.prototype.addPolygon = function addPolygon (p) {
    var this$1 = this;

    this.addPolygonRing(p.getExteriorRing(), Location.EXTERIOR, Location.INTERIOR);
    for (var i = 0; i < p.getNumInteriorRing(); i++) {
      var hole = p.getInteriorRingN(i);
      this$1.addPolygonRing(hole, Location.INTERIOR, Location.EXTERIOR);
    }
  };
  GeometryGraph.prototype.addEdge = function addEdge (e) {
    this.insertEdge(e);
    var coord = e.getCoordinates();
    this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY);
    this.insertPoint(this._argIndex, coord[coord.length - 1], Location.BOUNDARY);
  };
  GeometryGraph.prototype.addLineString = function addLineString (line) {
    var coord = CoordinateArrays.removeRepeatedPoints(line.getCoordinates());
    if (coord.length < 2) {
      this._hasTooFewPoints = true;
      this._invalidPoint = coord[0];
      return null
    }
    var e = new Edge(coord, new Label(this._argIndex, Location.INTERIOR));
    this._lineEdgeMap.put(line, e);
    this.insertEdge(e);
    Assert.isTrue(coord.length >= 2, 'found LineString with single point');
    this.insertBoundaryPoint(this._argIndex, coord[0]);
    this.insertBoundaryPoint(this._argIndex, coord[coord.length - 1]);
  };
  GeometryGraph.prototype.getInvalidPoint = function getInvalidPoint () {
    return this._invalidPoint
  };
  GeometryGraph.prototype.getBoundaryPoints = function getBoundaryPoints () {
    var coll = this.getBoundaryNodes();
    var pts = new Array(coll.size()).fill(null);
    var i = 0;
    for (var it = coll.iterator(); it.hasNext();) {
      var node = it.next();
      pts[i++] = node.getCoordinate().copy();
    }
    return pts
  };
  GeometryGraph.prototype.getBoundaryNodes = function getBoundaryNodes () {
    if (this._boundaryNodes === null) { this._boundaryNodes = this._nodes.getBoundaryNodes(this._argIndex); }
    return this._boundaryNodes
  };
  GeometryGraph.prototype.addSelfIntersectionNode = function addSelfIntersectionNode (argIndex, coord, loc) {
    if (this.isBoundaryNode(argIndex, coord)) { return null }
    if (loc === Location.BOUNDARY && this._useBoundaryDeterminationRule) { this.insertBoundaryPoint(argIndex, coord); } else { this.insertPoint(argIndex, coord, loc); }
  };
  GeometryGraph.prototype.addPolygonRing = function addPolygonRing (lr, cwLeft, cwRight) {
    if (lr.isEmpty()) { return null }
    var coord = CoordinateArrays.removeRepeatedPoints(lr.getCoordinates());
    if (coord.length < 4) {
      this._hasTooFewPoints = true;
      this._invalidPoint = coord[0];
      return null
    }
    var left = cwLeft;
    var right = cwRight;
    if (CGAlgorithms.isCCW(coord)) {
      left = cwRight;
      right = cwLeft;
    }
    var e = new Edge(coord, new Label(this._argIndex, Location.BOUNDARY, left, right));
    this._lineEdgeMap.put(lr, e);
    this.insertEdge(e);
    this.insertPoint(this._argIndex, coord[0], Location.BOUNDARY);
  };
  GeometryGraph.prototype.insertPoint = function insertPoint (argIndex, coord, onLocation) {
    var n = this._nodes.addNode(coord);
    var lbl = n.getLabel();
    if (lbl === null) {
      n._label = new Label(argIndex, onLocation);
    } else { lbl.setLocation(argIndex, onLocation); }
  };
  GeometryGraph.prototype.createEdgeSetIntersector = function createEdgeSetIntersector () {
    return new SimpleMCSweepLineIntersector()
  };
  GeometryGraph.prototype.addSelfIntersectionNodes = function addSelfIntersectionNodes (argIndex) {
    var this$1 = this;

    for (var i = this._edges.iterator(); i.hasNext();) {
      var e = i.next();
      var eLoc = e.getLabel().getLocation(argIndex);
      for (var eiIt = e.eiList.iterator(); eiIt.hasNext();) {
        var ei = eiIt.next();
        this$1.addSelfIntersectionNode(argIndex, ei.coord, eLoc);
      }
    }
  };
  GeometryGraph.prototype.add = function add () {
    if (arguments.length === 1) {
      var g = arguments[0];
      if (g.isEmpty()) { return null }
      if (g instanceof MultiPolygon) { this._useBoundaryDeterminationRule = false; }
      if (g instanceof Polygon) { this.addPolygon(g); }
      else if (g instanceof LineString) { this.addLineString(g); }
      else if (g instanceof Point) { this.addPoint(g); }
      else if (g instanceof MultiPoint) { this.addCollection(g); }
      else if (g instanceof MultiLineString) { this.addCollection(g); }
      else if (g instanceof MultiPolygon) { this.addCollection(g); }
      else if (g instanceof GeometryCollection) { this.addCollection(g); }
      else { throw new Error(g.getClass().getName()) }
    } else { return PlanarGraph$$1.prototype.add.apply(this, arguments) }
  };
  GeometryGraph.prototype.addCollection = function addCollection (gc) {
    var this$1 = this;

    for (var i = 0; i < gc.getNumGeometries(); i++) {
      var g = gc.getGeometryN(i);
      this$1.add(g);
    }
  };
  GeometryGraph.prototype.locate = function locate (pt) {
    if (hasInterface(this._parentGeom, Polygonal) && this._parentGeom.getNumGeometries() > 50) {
      if (this._areaPtLocator === null) {
        this._areaPtLocator = new IndexedPointInAreaLocator(this._parentGeom);
      }
      return this._areaPtLocator.locate(pt)
    }
    return this._ptLocator.locate(pt, this._parentGeom)
  };
  GeometryGraph.prototype.findEdge = function findEdge () {
    if (arguments.length === 1) {
      var line = arguments[0];
      return this._lineEdgeMap.get(line)
    } else { return PlanarGraph$$1.prototype.findEdge.apply(this, arguments) }
  };
  GeometryGraph.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  GeometryGraph.prototype.getClass = function getClass () {
    return GeometryGraph
  };
  GeometryGraph.determineBoundary = function determineBoundary (boundaryNodeRule, boundaryCount) {
    return boundaryNodeRule.isInBoundary(boundaryCount) ? Location.BOUNDARY : Location.INTERIOR
  };

  return GeometryGraph;
}(PlanarGraph));

var GeometryGraphOp = function GeometryGraphOp () {
  this._li = new RobustLineIntersector();
  this._resultPrecisionModel = null;
  this._arg = null;
  if (arguments.length === 1) {
    var g0 = arguments[0];
    this.setComputationPrecision(g0.getPrecisionModel());
    this._arg = new Array(1).fill(null);
    this._arg[0] = new GeometryGraph(0, g0);
  } else if (arguments.length === 2) {
    var g0$1 = arguments[0];
    var g1 = arguments[1];
    var boundaryNodeRule = BoundaryNodeRule.OGC_SFS_BOUNDARY_RULE;
    if (g0$1.getPrecisionModel().compareTo(g1.getPrecisionModel()) >= 0) { this.setComputationPrecision(g0$1.getPrecisionModel()); } else { this.setComputationPrecision(g1.getPrecisionModel()); }
    this._arg = new Array(2).fill(null);
    this._arg[0] = new GeometryGraph(0, g0$1, boundaryNodeRule);
    this._arg[1] = new GeometryGraph(1, g1, boundaryNodeRule);
  } else if (arguments.length === 3) {
    var g0$2 = arguments[0];
    var g1$1 = arguments[1];
    var boundaryNodeRule$1 = arguments[2];
    if (g0$2.getPrecisionModel().compareTo(g1$1.getPrecisionModel()) >= 0) { this.setComputationPrecision(g0$2.getPrecisionModel()); } else { this.setComputationPrecision(g1$1.getPrecisionModel()); }
    this._arg = new Array(2).fill(null);
    this._arg[0] = new GeometryGraph(0, g0$2, boundaryNodeRule$1);
    this._arg[1] = new GeometryGraph(1, g1$1, boundaryNodeRule$1);
  }
};
GeometryGraphOp.prototype.getArgGeometry = function getArgGeometry (i) {
  return this._arg[i].getGeometry()
};
GeometryGraphOp.prototype.setComputationPrecision = function setComputationPrecision (pm) {
  this._resultPrecisionModel = pm;
  this._li.setPrecisionModel(this._resultPrecisionModel);
};
GeometryGraphOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryGraphOp.prototype.getClass = function getClass () {
  return GeometryGraphOp
};

// operation.geometrygraph

var GeometryMapper = function GeometryMapper () {};

GeometryMapper.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryMapper.prototype.getClass = function getClass () {
  return GeometryMapper
};
GeometryMapper.map = function map () {
  if (arguments[0] instanceof Geometry && hasInterface(arguments[1], GeometryMapper.MapOp)) {
    var geom = arguments[0];
    var op = arguments[1];
    var mapped = new ArrayList();
    for (var i = 0; i < geom.getNumGeometries(); i++) {
      var g = op.map(geom.getGeometryN(i));
      if (g !== null) { mapped.add(g); }
    }
    return geom.getFactory().buildGeometry(mapped)
  } else if (hasInterface(arguments[0], Collection) && hasInterface(arguments[1], GeometryMapper.MapOp)) {
    var geoms = arguments[0];
    var op$1 = arguments[1];
    var mapped$1 = new ArrayList();
    for (var i$1 = geoms.iterator(); i$1.hasNext();) {
      var g$1 = i$1.next();
      var gr = op$1.map(g$1);
      if (gr !== null) { mapped$1.add(gr); }
    }
    return mapped$1
  }
};
GeometryMapper.MapOp = function MapOp () {};

var OverlayOp = (function (GeometryGraphOp) {
  function OverlayOp () {
    var g0 = arguments[0];
    var g1 = arguments[1];
    GeometryGraphOp.call(this, g0, g1);
    this._ptLocator = new PointLocator();
    this._geomFact = null;
    this._resultGeom = null;
    this._graph = null;
    this._edgeList = new EdgeList();
    this._resultPolyList = new ArrayList();
    this._resultLineList = new ArrayList();
    this._resultPointList = new ArrayList();
    this._graph = new PlanarGraph(new OverlayNodeFactory());
    this._geomFact = g0.getFactory();
  }

  if ( GeometryGraphOp ) OverlayOp.__proto__ = GeometryGraphOp;
  OverlayOp.prototype = Object.create( GeometryGraphOp && GeometryGraphOp.prototype );
  OverlayOp.prototype.constructor = OverlayOp;
  OverlayOp.prototype.insertUniqueEdge = function insertUniqueEdge (e) {
    var existingEdge = this._edgeList.findEqualEdge(e);
    if (existingEdge !== null) {
      var existingLabel = existingEdge.getLabel();
      var labelToMerge = e.getLabel();
      if (!existingEdge.isPointwiseEqual(e)) {
        labelToMerge = new Label(e.getLabel());
        labelToMerge.flip();
      }
      var depth = existingEdge.getDepth();
      if (depth.isNull()) {
        depth.add(existingLabel);
      }
      depth.add(labelToMerge);
      existingLabel.merge(labelToMerge);
    } else {
      this._edgeList.add(e);
    }
  };
  OverlayOp.prototype.getGraph = function getGraph () {
    return this._graph
  };
  OverlayOp.prototype.cancelDuplicateResultEdges = function cancelDuplicateResultEdges () {
    for (var it = this._graph.getEdgeEnds().iterator(); it.hasNext();) {
      var de = it.next();
      var sym = de.getSym();
      if (de.isInResult() && sym.isInResult()) {
        de.setInResult(false);
        sym.setInResult(false);
      }
    }
  };
  OverlayOp.prototype.isCoveredByLA = function isCoveredByLA (coord) {
    if (this.isCovered(coord, this._resultLineList)) { return true }
    if (this.isCovered(coord, this._resultPolyList)) { return true }
    return false
  };
  OverlayOp.prototype.computeGeometry = function computeGeometry (resultPointList, resultLineList, resultPolyList, opcode) {
    var geomList = new ArrayList();
    geomList.addAll(resultPointList);
    geomList.addAll(resultLineList);
    geomList.addAll(resultPolyList);
    if (geomList.isEmpty()) { return OverlayOp.createEmptyResult(opcode, this._arg[0].getGeometry(), this._arg[1].getGeometry(), this._geomFact) }
    return this._geomFact.buildGeometry(geomList)
  };
  OverlayOp.prototype.mergeSymLabels = function mergeSymLabels () {
    for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
      var node = nodeit.next();
      node.getEdges().mergeSymLabels();
    }
  };
  OverlayOp.prototype.isCovered = function isCovered (coord, geomList) {
    var this$1 = this;

    for (var it = geomList.iterator(); it.hasNext();) {
      var geom = it.next();
      var loc = this$1._ptLocator.locate(coord, geom);
      if (loc !== Location.EXTERIOR) { return true }
    }
    return false
  };
  OverlayOp.prototype.replaceCollapsedEdges = function replaceCollapsedEdges () {
    var newEdges = new ArrayList();
    for (var it = this._edgeList.iterator(); it.hasNext();) {
      var e = it.next();
      if (e.isCollapsed()) {
        it.remove();
        newEdges.add(e.getCollapsedEdge());
      }
    }
    this._edgeList.addAll(newEdges);
  };
  OverlayOp.prototype.updateNodeLabelling = function updateNodeLabelling () {
    for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
      var node = nodeit.next();
      var lbl = node.getEdges().getLabel();
      node.getLabel().merge(lbl);
    }
  };
  OverlayOp.prototype.getResultGeometry = function getResultGeometry (overlayOpCode) {
    this.computeOverlay(overlayOpCode);
    return this._resultGeom
  };
  OverlayOp.prototype.insertUniqueEdges = function insertUniqueEdges (edges) {
    var this$1 = this;

    for (var i = edges.iterator(); i.hasNext();) {
      var e = i.next();
      this$1.insertUniqueEdge(e);
    }
  };
  OverlayOp.prototype.computeOverlay = function computeOverlay (opCode) {
    this.copyPoints(0);
    this.copyPoints(1);
    this._arg[0].computeSelfNodes(this._li, false);
    this._arg[1].computeSelfNodes(this._li, false);
    this._arg[0].computeEdgeIntersections(this._arg[1], this._li, true);
    var baseSplitEdges = new ArrayList();
    this._arg[0].computeSplitEdges(baseSplitEdges);
    this._arg[1].computeSplitEdges(baseSplitEdges);
    // const splitEdges = baseSplitEdges
    this.insertUniqueEdges(baseSplitEdges);
    this.computeLabelsFromDepths();
    this.replaceCollapsedEdges();
    EdgeNodingValidator.checkValid(this._edgeList.getEdges());
    this._graph.addEdges(this._edgeList.getEdges());
    this.computeLabelling();
    this.labelIncompleteNodes();
    this.findResultAreaEdges(opCode);
    this.cancelDuplicateResultEdges();
    var polyBuilder = new PolygonBuilder(this._geomFact);
    polyBuilder.add(this._graph);
    this._resultPolyList = polyBuilder.getPolygons();
    var lineBuilder = new LineBuilder(this, this._geomFact, this._ptLocator);
    this._resultLineList = lineBuilder.build(opCode);
    var pointBuilder = new PointBuilder(this, this._geomFact, this._ptLocator);
    this._resultPointList = pointBuilder.build(opCode);
    this._resultGeom = this.computeGeometry(this._resultPointList, this._resultLineList, this._resultPolyList, opCode);
  };
  OverlayOp.prototype.labelIncompleteNode = function labelIncompleteNode (n, targetIndex) {
    var loc = this._ptLocator.locate(n.getCoordinate(), this._arg[targetIndex].getGeometry());
    n.getLabel().setLocation(targetIndex, loc);
  };
  OverlayOp.prototype.copyPoints = function copyPoints (argIndex) {
    var this$1 = this;

    for (var i = this._arg[argIndex].getNodeIterator(); i.hasNext();) {
      var graphNode = i.next();
      var newNode = this$1._graph.addNode(graphNode.getCoordinate());
      newNode.setLabel(argIndex, graphNode.getLabel().getLocation(argIndex));
    }
  };
  OverlayOp.prototype.findResultAreaEdges = function findResultAreaEdges (opCode) {
    for (var it = this._graph.getEdgeEnds().iterator(); it.hasNext();) {
      var de = it.next();
      var label = de.getLabel();
      if (label.isArea() && !de.isInteriorAreaEdge() && OverlayOp.isResultOfOp(label.getLocation(0, Position.RIGHT), label.getLocation(1, Position.RIGHT), opCode)) {
        de.setInResult(true);
      }
    }
  };
  OverlayOp.prototype.computeLabelsFromDepths = function computeLabelsFromDepths () {
    for (var it = this._edgeList.iterator(); it.hasNext();) {
      var e = it.next();
      var lbl = e.getLabel();
      var depth = e.getDepth();
      if (!depth.isNull()) {
        depth.normalize();
        for (var i = 0; i < 2; i++) {
          if (!lbl.isNull(i) && lbl.isArea() && !depth.isNull(i)) {
            if (depth.getDelta(i) === 0) {
              lbl.toLine(i);
            } else {
              Assert.isTrue(!depth.isNull(i, Position.LEFT), 'depth of LEFT side has not been initialized');
              lbl.setLocation(i, Position.LEFT, depth.getLocation(i, Position.LEFT));
              Assert.isTrue(!depth.isNull(i, Position.RIGHT), 'depth of RIGHT side has not been initialized');
              lbl.setLocation(i, Position.RIGHT, depth.getLocation(i, Position.RIGHT));
            }
          }
        }
      }
    }
  };
  OverlayOp.prototype.computeLabelling = function computeLabelling () {
    var this$1 = this;

    for (var nodeit = this._graph.getNodes().iterator(); nodeit.hasNext();) {
      var node = nodeit.next();
      node.getEdges().computeLabelling(this$1._arg);
    }
    this.mergeSymLabels();
    this.updateNodeLabelling();
  };
  OverlayOp.prototype.labelIncompleteNodes = function labelIncompleteNodes () {
    var this$1 = this;

    // let nodeCount = 0
    for (var ni = this._graph.getNodes().iterator(); ni.hasNext();) {
      var n = ni.next();
      var label = n.getLabel();
      if (n.isIsolated()) {
        // nodeCount++
        if (label.isNull(0)) { this$1.labelIncompleteNode(n, 0); } else { this$1.labelIncompleteNode(n, 1); }
      }
      n.getEdges().updateLabelling(label);
    }
  };
  OverlayOp.prototype.isCoveredByA = function isCoveredByA (coord) {
    if (this.isCovered(coord, this._resultPolyList)) { return true }
    return false
  };
  OverlayOp.prototype.interfaces_ = function interfaces_ () {
    return []
  };
  OverlayOp.prototype.getClass = function getClass () {
    return OverlayOp
  };

  return OverlayOp;
}(GeometryGraphOp));

OverlayOp.overlayOp = function (geom0, geom1, opCode) {
  var gov = new OverlayOp(geom0, geom1);
  var geomOv = gov.getResultGeometry(opCode);
  return geomOv
};
OverlayOp.intersection = function (g, other) {
  if (g.isEmpty() || other.isEmpty()) { return OverlayOp.createEmptyResult(OverlayOp.INTERSECTION, g, other, g.getFactory()) }
  if (g.isGeometryCollection()) {
    var g2 = other;
    return GeometryCollectionMapper.map(g, {
      interfaces_: function () {
        return [GeometryMapper.MapOp]
      },
      map: function (g) {
        return g.intersection(g2)
      }
    })
  }
  g.checkNotGeometryCollection(g);
  g.checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.INTERSECTION)
};
OverlayOp.symDifference = function (g, other) {
  if (g.isEmpty() || other.isEmpty()) {
    if (g.isEmpty() && other.isEmpty()) { return OverlayOp.createEmptyResult(OverlayOp.SYMDIFFERENCE, g, other, g.getFactory()) }
    if (g.isEmpty()) { return other.copy() }
    if (other.isEmpty()) { return g.copy() }
  }
  g.checkNotGeometryCollection(g);
  g.checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.SYMDIFFERENCE)
};
OverlayOp.resultDimension = function (opCode, g0, g1) {
  var dim0 = g0.getDimension();
  var dim1 = g1.getDimension();
  var resultDimension = -1;
  switch (opCode) {
    case OverlayOp.INTERSECTION:
      resultDimension = Math.min(dim0, dim1);
      break
    case OverlayOp.UNION:
      resultDimension = Math.max(dim0, dim1);
      break
    case OverlayOp.DIFFERENCE:
      resultDimension = dim0;
      break
    case OverlayOp.SYMDIFFERENCE:
      resultDimension = Math.max(dim0, dim1);
      break
    default:
  }
  return resultDimension
};
OverlayOp.createEmptyResult = function (overlayOpCode, a, b, geomFact) {
  var result = null;
  switch (OverlayOp.resultDimension(overlayOpCode, a, b)) {
    case -1:
      result = geomFact.createGeometryCollection(new Array(0).fill(null));
      break
    case 0:
      result = geomFact.createPoint();
      break
    case 1:
      result = geomFact.createLineString();
      break
    case 2:
      result = geomFact.createPolygon();
      break
    default:
  }
  return result
};
OverlayOp.difference = function (g, other) {
  if (g.isEmpty()) { return OverlayOp.createEmptyResult(OverlayOp.DIFFERENCE, g, other, g.getFactory()) }
  if (other.isEmpty()) { return g.copy() }
  g.checkNotGeometryCollection(g);
  g.checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.DIFFERENCE)
};
OverlayOp.isResultOfOp = function () {
  if (arguments.length === 2) {
    var label = arguments[0];
    var opCode = arguments[1];
    var loc0 = label.getLocation(0);
    var loc1 = label.getLocation(1);
    return OverlayOp.isResultOfOp(loc0, loc1, opCode)
  } else if (arguments.length === 3) {
    var loc0$1 = arguments[0];
    var loc1$1 = arguments[1];
    var overlayOpCode = arguments[2];
    if (loc0$1 === Location.BOUNDARY) { loc0$1 = Location.INTERIOR; }
    if (loc1$1 === Location.BOUNDARY) { loc1$1 = Location.INTERIOR; }
    switch (overlayOpCode) {
      case OverlayOp.INTERSECTION:
        return loc0$1 === Location.INTERIOR && loc1$1 === Location.INTERIOR
      case OverlayOp.UNION:
        return loc0$1 === Location.INTERIOR || loc1$1 === Location.INTERIOR
      case OverlayOp.DIFFERENCE:
        return loc0$1 === Location.INTERIOR && loc1$1 !== Location.INTERIOR
      case OverlayOp.SYMDIFFERENCE:
        return (loc0$1 === Location.INTERIOR && loc1$1 !== Location.INTERIOR) || (loc0$1 !== Location.INTERIOR && loc1$1 === Location.INTERIOR)
      default:
    }
    return false
  }
};
OverlayOp.INTERSECTION = 1;
OverlayOp.UNION = 2;
OverlayOp.DIFFERENCE = 3;
OverlayOp.SYMDIFFERENCE = 4;

var FuzzyPointLocator = function FuzzyPointLocator () {
  this._g = null;
  this._boundaryDistanceTolerance = null;
  this._linework = null;
  this._ptLocator = new PointLocator();
  this._seg = new LineSegment();
  var g = arguments[0];
  var boundaryDistanceTolerance = arguments[1];
  this._g = g;
  this._boundaryDistanceTolerance = boundaryDistanceTolerance;
  this._linework = this.extractLinework(g);
};
FuzzyPointLocator.prototype.isWithinToleranceOfBoundary = function isWithinToleranceOfBoundary (pt) {
    var this$1 = this;

  for (var i = 0; i < this._linework.getNumGeometries(); i++) {
    var line = this$1._linework.getGeometryN(i);
    var seq = line.getCoordinateSequence();
    for (var j = 0; j < seq.size() - 1; j++) {
      seq.getCoordinate(j, this$1._seg.p0);
      seq.getCoordinate(j + 1, this$1._seg.p1);
      var dist = this$1._seg.distance(pt);
      if (dist <= this$1._boundaryDistanceTolerance) { return true }
    }
  }
  return false
};
FuzzyPointLocator.prototype.getLocation = function getLocation (pt) {
  if (this.isWithinToleranceOfBoundary(pt)) { return Location.BOUNDARY }
  return this._ptLocator.locate(pt, this._g)
};
FuzzyPointLocator.prototype.extractLinework = function extractLinework (g) {
  var extracter = new PolygonalLineworkExtracter();
  g.apply(extracter);
  var linework = extracter.getLinework();
  var lines = GeometryFactory.toLineStringArray(linework);
  return g.getFactory().createMultiLineString(lines)
};
FuzzyPointLocator.prototype.interfaces_ = function interfaces_ () {
  return []
};
FuzzyPointLocator.prototype.getClass = function getClass () {
  return FuzzyPointLocator
};

var PolygonalLineworkExtracter = function PolygonalLineworkExtracter () {
  this._linework = null;
  this._linework = new ArrayList();
};
PolygonalLineworkExtracter.prototype.getLinework = function getLinework () {
  return this._linework
};
PolygonalLineworkExtracter.prototype.filter = function filter (g) {
    var this$1 = this;

  if (g instanceof Polygon) {
    var poly = g;
    this._linework.add(poly.getExteriorRing());
    for (var i = 0; i < poly.getNumInteriorRing(); i++) {
      this$1._linework.add(poly.getInteriorRingN(i));
    }
  }
};
PolygonalLineworkExtracter.prototype.interfaces_ = function interfaces_ () {
  return [GeometryFilter]
};
PolygonalLineworkExtracter.prototype.getClass = function getClass () {
  return PolygonalLineworkExtracter
};

var OffsetPointGenerator = function OffsetPointGenerator () {
  this._g = null;
  this._doLeft = true;
  this._doRight = true;
  var g = arguments[0];
  this._g = g;
};
OffsetPointGenerator.prototype.extractPoints = function extractPoints (line, offsetDistance, offsetPts) {
    var this$1 = this;

  var pts = line.getCoordinates();
  for (var i = 0; i < pts.length - 1; i++) {
    this$1.computeOffsetPoints(pts[i], pts[i + 1], offsetDistance, offsetPts);
  }
};
OffsetPointGenerator.prototype.setSidesToGenerate = function setSidesToGenerate (doLeft, doRight) {
  this._doLeft = doLeft;
  this._doRight = doRight;
};
OffsetPointGenerator.prototype.getPoints = function getPoints (offsetDistance) {
    var this$1 = this;

  var offsetPts = new ArrayList();
  var lines = LinearComponentExtracter.getLines(this._g);
  for (var i = lines.iterator(); i.hasNext();) {
    var line = i.next();
    this$1.extractPoints(line, offsetDistance, offsetPts);
  }
  return offsetPts
};
OffsetPointGenerator.prototype.computeOffsetPoints = function computeOffsetPoints (p0, p1, offsetDistance, offsetPts) {
  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;
  var len = Math.sqrt(dx * dx + dy * dy);
  var ux = offsetDistance * dx / len;
  var uy = offsetDistance * dy / len;
  var midX = (p1.x + p0.x) / 2;
  var midY = (p1.y + p0.y) / 2;
  if (this._doLeft) {
    var offsetLeft = new Coordinate(midX - uy, midY + ux);
    offsetPts.add(offsetLeft);
  }
  if (this._doRight) {
    var offsetRight = new Coordinate(midX + uy, midY - ux);
    offsetPts.add(offsetRight);
  }
};
OffsetPointGenerator.prototype.interfaces_ = function interfaces_ () {
  return []
};
OffsetPointGenerator.prototype.getClass = function getClass () {
  return OffsetPointGenerator
};

var OverlayResultValidator = function OverlayResultValidator () {
  this._geom = null;
  this._locFinder = null;
  this._location = new Array(3).fill(null);
  this._invalidLocation = null;
  this._boundaryDistanceTolerance = OverlayResultValidator.TOLERANCE;
  this._testCoords = new ArrayList();
  var a = arguments[0];
  var b = arguments[1];
  var result = arguments[2];
  this._boundaryDistanceTolerance = OverlayResultValidator.computeBoundaryDistanceTolerance(a, b);
  this._geom = [a, b, result];
  this._locFinder = [new FuzzyPointLocator(this._geom[0], this._boundaryDistanceTolerance), new FuzzyPointLocator(this._geom[1], this._boundaryDistanceTolerance), new FuzzyPointLocator(this._geom[2], this._boundaryDistanceTolerance)];
};

var staticAccessors$46 = { TOLERANCE: { configurable: true } };
OverlayResultValidator.prototype.reportResult = function reportResult (overlayOp, location, expectedInterior) {
  System.out.println('Overlay result invalid - A:' + Location.toLocationSymbol(location[0]) + ' B:' + Location.toLocationSymbol(location[1]) + ' expected:' + (expectedInterior ? 'i' : 'e') + ' actual:' + Location.toLocationSymbol(location[2]));
};
OverlayResultValidator.prototype.isValid = function isValid (overlayOp) {
  this.addTestPts(this._geom[0]);
  this.addTestPts(this._geom[1]);
  var isValid = this.checkValid(overlayOp);
  return isValid
};
OverlayResultValidator.prototype.checkValid = function checkValid () {
    var this$1 = this;

  if (arguments.length === 1) {
    var overlayOp = arguments[0];
    for (var i = 0; i < this._testCoords.size(); i++) {
      var pt = this$1._testCoords.get(i);
      if (!this$1.checkValid(overlayOp, pt)) {
        this$1._invalidLocation = pt;
        return false
      }
    }
    return true
  } else if (arguments.length === 2) {
    var overlayOp$1 = arguments[0];
    var pt$1 = arguments[1];
    this._location[0] = this._locFinder[0].getLocation(pt$1);
    this._location[1] = this._locFinder[1].getLocation(pt$1);
    this._location[2] = this._locFinder[2].getLocation(pt$1);
    if (OverlayResultValidator.hasLocation(this._location, Location.BOUNDARY)) { return true }
    return this.isValidResult(overlayOp$1, this._location)
  }
};
OverlayResultValidator.prototype.addTestPts = function addTestPts (g) {
  var ptGen = new OffsetPointGenerator(g);
  this._testCoords.addAll(ptGen.getPoints(5 * this._boundaryDistanceTolerance));
};
OverlayResultValidator.prototype.isValidResult = function isValidResult (overlayOp, location) {
  var expectedInterior = OverlayOp.isResultOfOp(location[0], location[1], overlayOp);
  var resultInInterior = location[2] === Location.INTERIOR;
  var isValid = !(expectedInterior ^ resultInInterior);
  if (!isValid) { this.reportResult(overlayOp, location, expectedInterior); }
  return isValid
};
OverlayResultValidator.prototype.getInvalidLocation = function getInvalidLocation () {
  return this._invalidLocation
};
OverlayResultValidator.prototype.interfaces_ = function interfaces_ () {
  return []
};
OverlayResultValidator.prototype.getClass = function getClass () {
  return OverlayResultValidator
};
OverlayResultValidator.hasLocation = function hasLocation (location, loc) {
  for (var i = 0; i < 3; i++) {
    if (location[i] === loc) { return true }
  }
  return false
};
OverlayResultValidator.computeBoundaryDistanceTolerance = function computeBoundaryDistanceTolerance (g0, g1) {
  return Math.min(GeometrySnapper.computeSizeBasedSnapTolerance(g0), GeometrySnapper.computeSizeBasedSnapTolerance(g1))
};
OverlayResultValidator.isValid = function isValid (a, b, overlayOp, result) {
  var validator = new OverlayResultValidator(a, b, result);
  return validator.isValid(overlayOp)
};
staticAccessors$46.TOLERANCE.get = function () { return 0.000001 };

Object.defineProperties( OverlayResultValidator, staticAccessors$46 );

// operation.overlay

var GeometryCombiner = function GeometryCombiner (geoms) {
  this._geomFactory = null;
  this._skipEmpty = false;
  this._inputGeoms = null;
  this._geomFactory = GeometryCombiner.extractFactory(geoms);
  this._inputGeoms = geoms;
};
GeometryCombiner.prototype.extractElements = function extractElements (geom, elems) {
    var this$1 = this;

  if (geom === null) { return null }
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var elemGeom = geom.getGeometryN(i);
    if (this$1._skipEmpty && elemGeom.isEmpty()) { continue }
    elems.add(elemGeom);
  }
};
GeometryCombiner.prototype.combine = function combine () {
    var this$1 = this;

  var elems = new ArrayList();
  for (var i = this._inputGeoms.iterator(); i.hasNext();) {
    var g = i.next();
    this$1.extractElements(g, elems);
  }
  if (elems.size() === 0) {
    if (this._geomFactory !== null) {
      return this._geomFactory.createGeometryCollection(null)
    }
    return null
  }
  return this._geomFactory.buildGeometry(elems)
};
GeometryCombiner.prototype.interfaces_ = function interfaces_ () {
  return []
};
GeometryCombiner.prototype.getClass = function getClass () {
  return GeometryCombiner
};
GeometryCombiner.combine = function combine () {
  if (arguments.length === 1) {
    var geoms = arguments[0];
    var combiner = new GeometryCombiner(geoms);
    return combiner.combine()
  } else if (arguments.length === 2) {
    var g0 = arguments[0];
    var g1 = arguments[1];
    var combiner$1 = new GeometryCombiner(GeometryCombiner.createList(g0, g1));
    return combiner$1.combine()
  } else if (arguments.length === 3) {
    var g0$1 = arguments[0];
    var g1$1 = arguments[1];
    var g2 = arguments[2];
    var combiner$2 = new GeometryCombiner(GeometryCombiner.createList(g0$1, g1$1, g2));
    return combiner$2.combine()
  }
};
GeometryCombiner.extractFactory = function extractFactory (geoms) {
  if (geoms.isEmpty()) { return null }
  return geoms.iterator().next().getFactory()
};
GeometryCombiner.createList = function createList () {
  if (arguments.length === 2) {
    var obj0 = arguments[0];
    var obj1 = arguments[1];
    var list = new ArrayList();
    list.add(obj0);
    list.add(obj1);
    return list
  } else if (arguments.length === 3) {
    var obj0$1 = arguments[0];
    var obj1$1 = arguments[1];
    var obj2 = arguments[2];
    var list$1 = new ArrayList();
    list$1.add(obj0$1);
    list$1.add(obj1$1);
    list$1.add(obj2);
    return list$1
  }
};

var CascadedPolygonUnion = function CascadedPolygonUnion () {
  this._inputPolys = null;
  this._geomFactory = null;
  var polys = arguments[0];
  this._inputPolys = polys;
  if (this._inputPolys === null) { this._inputPolys = new ArrayList(); }
};

var staticAccessors$47 = { STRTREE_NODE_CAPACITY: { configurable: true } };
CascadedPolygonUnion.prototype.reduceToGeometries = function reduceToGeometries (geomTree) {
    var this$1 = this;

  var geoms = new ArrayList();
  for (var i = geomTree.iterator(); i.hasNext();) {
    var o = i.next();
    var geom = null;
    if (hasInterface(o, List)) {
      geom = this$1.unionTree(o);
    } else if (o instanceof Geometry) {
      geom = o;
    }
    geoms.add(geom);
  }
  return geoms
};
CascadedPolygonUnion.prototype.extractByEnvelope = function extractByEnvelope (env, geom, disjointGeoms) {
  var intersectingGeoms = new ArrayList();
  for (var i = 0; i < geom.getNumGeometries(); i++) {
    var elem = geom.getGeometryN(i);
    if (elem.getEnvelopeInternal().intersects(env)) { intersectingGeoms.add(elem); } else { disjointGeoms.add(elem); }
  }
  return this._geomFactory.buildGeometry(intersectingGeoms)
};
CascadedPolygonUnion.prototype.unionOptimized = function unionOptimized (g0, g1) {
  var g0Env = g0.getEnvelopeInternal();
  var g1Env = g1.getEnvelopeInternal();
  if (!g0Env.intersects(g1Env)) {
    var combo = GeometryCombiner.combine(g0, g1);
    return combo
  }
  if (g0.getNumGeometries() <= 1 && g1.getNumGeometries() <= 1) { return this.unionActual(g0, g1) }
  var commonEnv = g0Env.intersection(g1Env);
  return this.unionUsingEnvelopeIntersection(g0, g1, commonEnv)
};
CascadedPolygonUnion.prototype.union = function union () {
  if (this._inputPolys === null) { throw new Error('union() method cannot be called twice') }
  if (this._inputPolys.isEmpty()) { return null }
  this._geomFactory = this._inputPolys.iterator().next().getFactory();
  var index = new STRtree(CascadedPolygonUnion.STRTREE_NODE_CAPACITY);
  for (var i = this._inputPolys.iterator(); i.hasNext();) {
    var item = i.next();
    index.insert(item.getEnvelopeInternal(), item);
  }
  this._inputPolys = null;
  var itemTree = index.itemsTree();
  var unionAll = this.unionTree(itemTree);
  return unionAll
};
CascadedPolygonUnion.prototype.binaryUnion = function binaryUnion () {
  if (arguments.length === 1) {
    var geoms = arguments[0];
    return this.binaryUnion(geoms, 0, geoms.size())
  } else if (arguments.length === 3) {
    var geoms$1 = arguments[0];
    var start = arguments[1];
    var end = arguments[2];
    if (end - start <= 1) {
      var g0 = CascadedPolygonUnion.getGeometry(geoms$1, start);
      return this.unionSafe(g0, null)
    } else if (end - start === 2) {
      return this.unionSafe(CascadedPolygonUnion.getGeometry(geoms$1, start), CascadedPolygonUnion.getGeometry(geoms$1, start + 1))
    } else {
      var mid = Math.trunc((end + start) / 2);
      var g0$1 = this.binaryUnion(geoms$1, start, mid);
      var g1 = this.binaryUnion(geoms$1, mid, end);
      return this.unionSafe(g0$1, g1)
    }
  }
};
CascadedPolygonUnion.prototype.repeatedUnion = function repeatedUnion (geoms) {
  var union = null;
  for (var i = geoms.iterator(); i.hasNext();) {
    var g = i.next();
    if (union === null) { union = g.copy(); } else { union = union.union(g); }
  }
  return union
};
CascadedPolygonUnion.prototype.unionSafe = function unionSafe (g0, g1) {
  if (g0 === null && g1 === null) { return null }
  if (g0 === null) { return g1.copy() }
  if (g1 === null) { return g0.copy() }
  return this.unionOptimized(g0, g1)
};
CascadedPolygonUnion.prototype.unionActual = function unionActual (g0, g1) {
  return CascadedPolygonUnion.restrictToPolygons(g0.union(g1))
};
CascadedPolygonUnion.prototype.unionTree = function unionTree (geomTree) {
  var geoms = this.reduceToGeometries(geomTree);
  var union = this.binaryUnion(geoms);
  return union
};
CascadedPolygonUnion.prototype.unionUsingEnvelopeIntersection = function unionUsingEnvelopeIntersection (g0, g1, common) {
  var disjointPolys = new ArrayList();
  var g0Int = this.extractByEnvelope(common, g0, disjointPolys);
  var g1Int = this.extractByEnvelope(common, g1, disjointPolys);
  var union = this.unionActual(g0Int, g1Int);
  disjointPolys.add(union);
  var overallUnion = GeometryCombiner.combine(disjointPolys);
  return overallUnion
};
CascadedPolygonUnion.prototype.bufferUnion = function bufferUnion () {
  if (arguments.length === 1) {
    var geoms = arguments[0];
    var factory = geoms.get(0).getFactory();
    var gColl = factory.buildGeometry(geoms);
    var unionAll = gColl.buffer(0.0);
    return unionAll
  } else if (arguments.length === 2) {
    var g0 = arguments[0];
    var g1 = arguments[1];
    var factory$1 = g0.getFactory();
    var gColl$1 = factory$1.createGeometryCollection([g0, g1]);
    var unionAll$1 = gColl$1.buffer(0.0);
    return unionAll$1
  }
};
CascadedPolygonUnion.prototype.interfaces_ = function interfaces_ () {
  return []
};
CascadedPolygonUnion.prototype.getClass = function getClass () {
  return CascadedPolygonUnion
};
CascadedPolygonUnion.restrictToPolygons = function restrictToPolygons (g) {
  if (hasInterface(g, Polygonal)) {
    return g
  }
  var polygons = PolygonExtracter.getPolygons(g);
  if (polygons.size() === 1) { return polygons.get(0) }
  return g.getFactory().createMultiPolygon(GeometryFactory.toPolygonArray(polygons))
};
CascadedPolygonUnion.getGeometry = function getGeometry (list, index) {
  if (index >= list.size()) { return null }
  return list.get(index)
};
CascadedPolygonUnion.union = function union (polys) {
  var op = new CascadedPolygonUnion(polys);
  return op.union()
};
staticAccessors$47.STRTREE_NODE_CAPACITY.get = function () { return 4 };

Object.defineProperties( CascadedPolygonUnion, staticAccessors$47 );

var UnionOp = function UnionOp () {};

UnionOp.prototype.interfaces_ = function interfaces_ () {
  return []
};
UnionOp.prototype.getClass = function getClass () {
  return UnionOp
};
UnionOp.union = function union (g, other) {
  if (g.isEmpty() || other.isEmpty()) {
    if (g.isEmpty() && other.isEmpty()) { return OverlayOp.createEmptyResult(OverlayOp.UNION, g, other, g.getFactory()) }
    if (g.isEmpty()) { return other.copy() }
    if (other.isEmpty()) { return g.copy() }
  }
  g.checkNotGeometryCollection(g);
  g.checkNotGeometryCollection(other);
  return SnapIfNeededOverlayOp.overlayOp(g, other, OverlayOp.UNION)
};

// operation.union

// operation

/**
 * Polyfill for IE support
 */

exports.GeoJSONReader = GeoJSONReader;
exports.GeoJSONWriter = GeoJSONWriter;
exports.OverlayOp = OverlayOp;
exports.UnionOp = UnionOp;
exports.BufferOp = BufferOp;
