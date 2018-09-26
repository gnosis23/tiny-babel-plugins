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

