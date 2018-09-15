const babel = require('babel-core');
const plugin = require('../../src/checkES2015Constants');
const assert = require('assert');

const transform = text => babel.transform(text, {plugins: [plugin]});

it('block-scoped', () => {
  const example = `
const bar = 123;
{ const bar = 456; }
assert.equal(bar, 123);`;
  var {code} = transform(example);
  // console.log(code);
});

// it('block-statement', () => {
//   const example = `
// for (let i in arr) {
//   const MULTIPLIER = 5;
//   console.log(arr[i] * MULTIPLIER);
// }`;
//   var {code} = transform(example);
//   const expect = `
// for (var i in arr) {
//   var MULTIPLIER = 5;
//   console.log(arr[i] * MULTIPLIER);
// }`;
//   console.log(code);
//   assert(code === expect, 'block-statement');
// });

