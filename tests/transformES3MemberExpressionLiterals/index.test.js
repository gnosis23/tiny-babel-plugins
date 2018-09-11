const babel = require('babel-core');
const plugin = require('../../src/transformES3MemberExpressionLiterals');
const assert = require('assert');

const example = `
test.catch;
test.catch.foo;
test["catch"];
test["catch"].foo;`;

it('transform es3 member expression literals', () => {
  var {code} = babel.transform(example, {plugins: [plugin]});
  const expected = `
test["catch"];
test["catch"].foo;
test["catch"];
test["catch"].foo;`;
  assert(code === expected, 'es3 member');
});

