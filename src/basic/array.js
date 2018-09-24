// =============================================================================
//                                    Array
// =============================================================================
const log = console.log;



// Array.of
log(Array.of(1));     // [1]
log(Array.of(1, 2));  // [1, 2]



// Array.from
//
// creates a new, shallow-copied Array instance from an array-like[1] or iterable
// object.
//
// [1]: indexed access to elements and the property length that tells us how many
//      elements the object has.
//      http://2ality.com/2013/05/quirk-array-like-objects.html
//

// example 1
const arrayLikeObj = {
  0: '1',
  1: '2',
  2: '3',
  length: 3
};
const toArrayObj = Array.from(arrayLikeObj);
log(toArrayObj);   // ['1', '2', '3']


// example 2
function translate(...args) {
  return Array.from(args, value => value + 1);
}

let numbers = translate(1, 2, 3);

log(numbers); // [2, 3, 4]


// example 3
numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

let numbers2 = Array.from(numbers, value => value + 1);

log(numbers2); // [2, 3, 4]



// Array.prototype.find & findIndex
//
// The find() method returns the value of the first element in the array that
// satisfies the provided testing function. Otherwise undefined is returned.
//

numbers = [25, 30, 35, 40, 45];

log(numbers.find(n => n > 33));        // 35
log(numbers.findIndex(n => n > 33));   // 2


// Compared with Array.prototype.index & indexOf
//
// returns the first index at which a given element can be found in the array,
// or -1 if it is not present.
// indexOf() compares searchElement to elements of the Array using strict
// equality (the same method used by the === or triple-equals operator).

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

log(beasts.indexOf('bison'));
// expected output: 1
