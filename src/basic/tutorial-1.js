//
// 教程一
// 1. 使用 babylon 生成抽象语法树
// 2. 使用 babel-traverse 遍历 ast ，并且变换 ast
// 3. 使用 babel-generator 生成代码
//
const babylon = require('babylon');
const babelTraverse = require('babel-traverse').default;
const generate = require('babel-generator').default;

const sampleCode = `
  function square(n) {
    return n * n;
  }
  n;`;

// code => ast
const ast = babylon.parse(sampleCode);


// ast => ast2
// 重命名变量
// 递归遍历
const updateParamNameVisitor = {
  Identifier(path) {
    if (path.node.name === this.paramName) {
      path.node.name = "x";
    }
  }
};

const MyVisitor = {
  FunctionDeclaration(path) {
    const param = path.node.params[0];
    const paramName = param.name;
    param.name = "x";

    path.traverse(updateParamNameVisitor, { paramName })
  },
};

babelTraverse(ast, {
  // WTF is path ???
  enter(path) {
    path.traverse(MyVisitor)
  }
});


// ast2 => code
const output = generate(ast);
console.log(output.code);
