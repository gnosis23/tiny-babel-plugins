const babel = require('babel-core');

// 普通遍历
function plugin({ types: t }) {
  return {
    visitor: {
      // Note: Identifier() { ... } is shorthand for Identifier: { enter() { ... } }
      FunctionExpression(path) {
        path.node.shadow = true;
      }
    }
  };
}


let example = `
const a = function(x){this.x = x}`;
code = babel.transform(example, {plugins: [plugin]}).code;
let answer = `
var _this = this;

const a = function (x) {
  _this.x = x;
};
`;


