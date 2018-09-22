
let firstName = Symbol('first name'); // optional params, debug purposes
let person = {};

person[firstName] = 'Nicholas';
console.log(person[firstName]); // Nicholas
console.log(firstName);         // Symbol(first name)

console.log(typeof firstName);  // symbol

person = {
  [firstName]: "Nicholas"
};

Object.defineProperty(person, firstName, { writable: false });

