//
// 任务一
// 列出model文件里的所有 reducer 和 effect
//
//
const fs = require('fs');
const babel = require('babel-core');
const Con = console;
// result
const effectsNames = [];
const reducerNames = [];

let inBuff = fs.readFileSync('resources/model.js');
const input = inBuff.toString();

const {ast} = babel.transform(input, {
  // TODO: 学习下源码
  "plugins": ["transform-object-rest-spread", travel],
  "presets": ["env"]
});


// =============================================================================
//                              plugins
// =============================================================================
// 普通遍历
function travel() {
  const objectVisitor1 = {
    ObjectProperty(path) {
      if (path.node.key.name === 'effects' && this.category === 'effects') {
        const { properties } = path.node.value;
        for (const property of properties) {
          effectsNames.push(property.key.name);
        }
        path.stop();
      }
    }
  };
  const objectVisitor2 = {
    ObjectProperty(path) {
      if (path.node.key.name === 'reducers' && this.category === 'reducers') {
        const { properties } = path.node.value;
        for (const property of properties) {
          reducerNames.push(property.key.name);
        }
        path.stop();
      }
    }
  };
  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const { declaration } = path.node;
        for (const property of declaration.properties) {
          if (property.key.name === 'effects') {
            path.traverse(objectVisitor1, {category: 'effects'})
          } else if (property.key.name === 'reducers') {
            path.traverse(objectVisitor2, {category: 'reducers'})
          }
        }
      }
    }
  };
}

// =============================================================================
//                              main
// =============================================================================
const { program } = ast;

Con.log(`Program has ${program.body.length} statements`);
Con.log(`effects: ${effectsNames}`);
Con.log(`reducers: ${reducerNames}`);
