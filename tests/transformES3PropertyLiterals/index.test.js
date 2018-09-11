const babel = require('babel-core');
const plugin = require('../../src/transformES3PropertyLiterals');
const assert = require('assert');

const example = `
var foo = {
  catch: function () {}
};`;

it('transform es3 member expression literals', () => {
  var {code} = babel.transform(example, {plugins: [plugin]});
  const expected = `
var foo = {
  "catch": function () {}
};`;
  assert(code === expected, 'es3 member');
});

