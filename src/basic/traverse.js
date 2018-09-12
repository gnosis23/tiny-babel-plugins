const babel = require('babel-core');

// =============================================================================
//                                  CASE 1
// =============================================================================
// 普通遍历
function traverse({ types: t }) {
  return {
    visitor: {
      // Note: Identifier() { ... } is shorthand for Identifier: { enter() { ... } }
      Identifier(path) {
        console.log('Visiting: ' + path.node.name);
      }
    }
  };
}

let example = `
  function square(n) {
    return n * n;
  }`;
var {code} = babel.transform(example, {plugins: [traverse]});
console.log(code);

// =============================================================================
//                                  CASE 2
// =============================================================================
// 递归遍历
function traverse2({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) {
        const param = path.node.params[0];
        const paramName = param.name;
        param.name = "x";

        path.traverse({
          Identifier(path) {
            if (path.node.name === this.paramName) {
              path.node.name = "x";
            }
          }
        }, { paramName })
      },

      Identifier(path) {
        if (path.node.name === this.paramName) {
          path.node.name = "x";
        }
      }
    }
  };
}


example = `
  function square(n) {
    return n * n;
  }
  n;`;
code = babel.transform(example, {plugins: [traverse2]}).code;
const expected = `
  function square(n) {
    return n * n;
  }
  n;`;
console.log(code);


