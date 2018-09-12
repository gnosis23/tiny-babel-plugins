const babel = require('babel-core');
const plugin = require('../../src/transformES2015ArrowFunctions');
const assert = require('assert');

const transform = text => babel.transform(text, {plugins: [plugin]});

it('empty arguments', () => {
  const example = `
var t = () => 5 + 5;`;
  var {code} = transform(example);
  const expected = `
var t = function () {
  return 5 + 5;
};`;
  assert(code === expected, 'empty arguments');
});

it('single argument', () => {
  const example = `
var t = (i) => i * 5;`;
  var {code} = transform(example);
  const expected = `
var t = function (i) {
  return i * 5;
};`;
  assert(code === expected, 'single argument');
});

it('multiple arguments', () => {
  const example = `
var t = (i, x) => i * x;`;
  var {code} = transform(example);
  const expected = `
var t = function (i, x) {
  return i * x;
};`;
  assert(code === expected, 'multiple arguments');
});

it('statement', () => {
  const example = `
nums.forEach(v => {
  if (v % 5 === 0) {
    fives.push(v);
  }
});`;
  var {code} = transform(example);
  const expected = `
nums.forEach(function (v) {
  if (v % 5 === 0) {
    fives.push(v);
  }
});`;
  assert(code === expected, 'statement');
});

it('paran insertion', () => {
  const example = `
var t = i => i * 5;`;
  var {code} = transform(example);
  const expected = `
var t = function (i) {
  return i * 5;
};`;
  assert(code === expected, 'statement');
});

it('empty block', () => {
  const example = `
var t = () => {};`;
  var {code} = transform(example);
  const expected = `
var t = function () {};`;
  assert(code === expected, 'empty block');
});

it('expressions', () => {
  const example = `
arr.map(x => x * x);`;
  var {code} = transform(example);
  const expected = `
arr.map(function (x) {
  return x * x;
});`;
  assert(code === expected, 'expressions');
});

it('inside-call', () => {
  const example = `
arr.map(i => i + 1);`;
  var {code} = transform(example);
  const expected = `
arr.map(function (i) {
  return i + 1;
});`;
  assert(code === expected, 'expressions');
});

it('inside-call', () => {
  const example = `
arr.map(i => i + 1);`;
  var {code} = transform(example);
  const expected = `
arr.map(function (i) {
  return i + 1;
});`;
  assert(code === expected, 'expressions');
});

// it('default parameters', () => {
//   const example = `
// var some = (count = "30") => {
//   console.log("count", count);
// };
//
// var collect = (since = 0, userid) => {
//   console.log(userid);
// };`;
//   var {code} = transform(example);
//   const expected = `
// var some = function () {
//   let count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "30";
//
//   console.log("count", count);
// };
//
// var collect = function () {
//   let since = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
//   let userid = arguments[1];
//
//   console.log(userid);
// };`;
//   console.log(code);
//   assert(code === expected, 'default parameters');
// });



it('this', () => {
  const example = `
function b() {
  var t = x => this.x + x;
}

class Foo extends (function(){}) {
  constructor(){
    var foo = () => this;

    if (true){
        console.log(super(), foo());
    } else {
        super();
        console.log(foo());
    }
  }
}`;
  var {code} = transform(example);
  const expected = `
function b() {
  var _this = this;

  var t = function (x) {
    return _this.x + x;
  };
}

class Foo extends function () {} {
  constructor() {
    var _this2;

    var foo = function () {
      return _this2;
    };

    if (true) {
      console.log(_this2 = super(), foo());
    } else {
      _this2 = super();
      console.log(foo());
    }
  }
}`;
  assert(code === expected, 'this');
});

