const babel = require('babel-core');
const plugin = require('./index');

let example = `
function b() {
  var t = x => this.x + x;
}`;
var {code} = babel.transform(example, {plugins: [plugin]});
console.log(code);


example = `
function b() {
  var t = x => x + x;
}`;
code = babel.transform(example, {plugins: [plugin]}).code;
console.log(code);

example = `
function b() {
  var t = x => y=> this.y + x;
  var s = z => this.z + x;
}`;
code = babel.transform(example, {plugins: [plugin]}).code;
console.log(code);

