// =============================================================================
//                                prototype
// =============================================================================

const log = console.log;


// inherit
//
// inherit() 返回了一个继承自原型对象 p 的属性的新对象
// 这里使用 ECMAScript 5 中的 Object.create[1] 函数（如果存在的话）
// 如果不存在，那就 GG
//
// [1]: The Object.create() method creates a new object, using an existing
//      object to provide the newly created object's __proto__ .
//
function inherit(p) {
  if (Object.create)
    return Object.create(p);

  if (p === null) {
    throw new TypeError(
      "This browser's implementation of Object.create is a shim and doesn't " +
      "support 'null' as the first argument."
    );
  }

  var t = typeof p;
  if (t !== 'object' && t !== 'function') {
    throw new TypeError('Object prototype may only be an Object: ' + t);
  }

  // 防止对象 p 的属性被随意修改
  function F() {}
  F.prototype = p;

  return new F();
}



// range.js
// 实现一个能表示值的范围的类
function Range(from, to) {
  this.from = from;
  this.to = to;
}

Range.prototype = {
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },

  foreach: function (f) {
    for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
  },

  toString: function () { return "(" + this.from + "..." + this.to + ")"; }
}

var r = new Range(1, 3);
r.includes(2);
r.foreach(log);
log(r);



// extend
/**
 * 把 p 中的可枚举属性复制到 o 中，并返回 o
 * 如果 o 和 p 中含有相同的属性，则覆盖o中的属性
 * 这个函数并不处理 getter 和 setter 以及复制属性
 */
function extend(o, p) {
  for (prop in p) {
    o[prop] = p[prop];
  }
  return o;
}



// defineClass
function defineClass(constructor, // 用以设置实例的属性的函数
                     methods,     // 实例的方法，复制至原型中
                     statics)     // 类属性，复制至构造函数中
{
  if (methods) extend(constructor.prototype, methods);
  if (statics) extend(constructor, statics);
  return constructor;
}

var SimpleRange = defineClass(
  function(f, t) { this.f = f; this.t = t; },
  {
    includes: function (x) { return this.f <= x && x <= this.t; },
    toString: function () { return this.f + "..." + this.t; }
  },
  { upto: function (t) { return new SimpleRange(o, t); }}
);



// =============================================================================
//                      Babel transforms class
// =============================================================================
const _createClass = (function() {
  // TODO: vs extend
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
      typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}



// Demo from https://github.com/GoogleChrome/samples/blob/gh-pages/classes-es6/demo.js


// Example 1: Creating a new class (declaration-form)
// ===============================================================

// A base class is defined using the new reserved 'class' keyword
var Polygon = (function() {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  function Polygon(height, width) {
    _classCallCheck(this, Polygon);

    this.name = "Polygon";
    this.height = height;
    this.width = width;
  }

  // Simple class instance methods using short-hand method
  // declaration

  _createClass(Polygon, [
    {
      key: "sayName",
      value: function sayName() {
        log("Hi, I am a ", this.name + ".");
      }
    },
    {
      key: "sayHistory",
      value: function sayHistory() {
        log(
          '"Polygon" is derived from the Greek polus (many) ' +
          "and gonia (angle)."
        );
      }

      // We will look at static and subclassed methods shortly
    }
  ]);

  return Polygon;
})();

// Classes are used just like ES5 constructor functions:
let p = new Polygon(300, 400);
p.sayName();
log('The width of this polygon is ' + p.width);

// Example 3: Extending an existing class
// ===============================================================

// Classes support extending other classes, but can also extend
// other objects. Whatever you extend must be a constructor.
//
// Let's extend the Polygon class to create a new derived class
// called Square.

var Square = (function(_Polygon) {
  _inherits(Square, _Polygon);

  function Square(length) {
    _classCallCheck(this, Square);

    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    var _this = _possibleConstructorReturn(
      this,
      (Square.__proto__ || Object.getPrototypeOf(Square)).call(
        this,
        length,
        length
      )
    );
    // The reserved 'super' keyword is for making super-constructor
    // calls and allows access to parent methods.
    //
    // Here, it will call the parent class' constructor with lengths
    // provided for the Polygon's width and height

    _this.name = "Square";
    return _this;
  }

  // Getter/setter methods are supported in classes,
  // similar to their ES5 equivalents

  _createClass(Square, [
    {
      key: "area",
      get: function get() {
        return this.height * this.width;
      },
      set: function set(value) {
        this.area = value;
      }
    }
  ]);

  return Square;
})(Polygon);

let s = new Square(5);

s.sayName();
log('The area of this square is ' + s.area);
