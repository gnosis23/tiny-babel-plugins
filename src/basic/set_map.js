// =============================================================================
//                                Map & Set
// =============================================================================


// set
//
// The Set object lets you store unique values of any type, whether primitive
// values or object references.
//

// example 1: key types
let set = new Set();
set.add(5);
set.add("5");
console.log(set.size); // 2


// example 2
const key1 = {};
const key2 = {};
set.add(key1);
set.add(key2);
console.log(set.size); // 4


// example 3
const set2 = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
console.log(set2.size);


// example 4: set to array
function eliminateDuplicates(items) {
  return [...new Set(items)];
}

let numbers = [1, 2, 3, 3, 3, 4, 5];
let noDuplicates = eliminateDuplicates(numbers);

console.log(noDuplicates);



// WeakMap
//
// The WeakMap object is a collection of key/value pairs in which the keys are
// weakly referenced.  The keys must be objects and the values can be arbitrary
// values.
//
//
let Person = (function() {

  let privateData = new WeakMap();

  function Person(name) {
    privateData.set(this, { name: name });
  }

  Person.prototype.getName = function() {
    return privateData.get(this).name;
  };

  return Person;
}());

