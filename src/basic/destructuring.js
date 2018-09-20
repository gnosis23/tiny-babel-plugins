// object
let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    }
  }
};

let { loc: { start } } = node;

console.log(start);

// array
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);

// function params
function setCookie(name, value, { secure, path, domain, expires }) {

}
