// =============================================================================
//                                    Class
// =============================================================================
// from https://github.com/GoogleChrome/samples/blob/gh-pages/classes-es6/demo.js

const ChromeSamples = console;


// Example 1: Creating a new class (declaration-form)
// =============================================================================

// A base class is defined using the new reserved 'class' keyword
class Polygon {
  // ..and an (optional) custom class constructor. If one is
  // not supplied, a default constructor is used instead:
  // constructor() { }
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width  = width;
  }

  // Simple class instance methods using short-hand method
  // declaration
  sayName() {
    ChromeSamples.log('Hi, I am a ', this.name + '.');
  }

  sayHistory() {
    ChromeSamples.log('"Polygon" is derived from the Greek polus (many) ' +
      'and gonia (angle).');
  }

  // We will look at static and subclassed methods shortly
}

// Classes are used just like ES5 constructor functions:
let p = new Polygon(300, 400);
p.sayName();
ChromeSamples.log('The width of this polygon is ' + p.width);


// Example 3: Extending an existing class
// =============================================================================

// Classes support extending other classes, but can also extend
// other objects. Whatever you extend must be a constructor.
//
// Let's extend the Polygon class to create a new derived class
// called Square.
class Square extends Polygon {
  constructor (length) {
    // The reserved 'super' keyword is for making super-constructor
    // calls and allows access to parent methods.
    //
    // Here, it will call the parent class' constructor with lengths
    // provided for the Polygon's width and height
    super(length, length);
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }

  // Getter/setter methods are supported in classes.
  // similar to their ES5 equivalents
  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  }
}

let s = new Square(5);

s.sayName();
ChromeSamples.log('The area of this square is ' + s.area);


// Example 4: Subclassing methods of a parent class
// =============================================================================

class Rectangle extends Polygon {
  constructor(height, width) {
    super(height, width);
    this.name = 'Rectangle';
  }

  // Here, sayName() is a subclassed method which
  // overrides their superclass method of the same name.
  sayName() {
    ChromeSamples.log('Sup! My name is ', this.name + '.');
    super.sayHistory();
  }
}

let r = new Rectangle(50, 60);
r.sayName();


// Example 5: Defining static methods
// ===============================================================

// Classes support static members which can be accesses without an
// instance being present.
class Triple {
  // Using the 'static' keyword creates a method which is associated
  // with a class, but not with an instance of the class.
  static triple(n) {
    n = n || 1;
    return n * 3;
  }
}

// super.prop in this example is used for accessing super-properties from
// a parent class. This works fine in static methods too:
class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

ChromeSamples.log(Triple.triple());
ChromeSamples.log(Triple.triple(6));
ChromeSamples.log(BiggerTriple.triple(3));


// Example 6: Subclassing built-in classes and DOM
// ===============================================================

// Extend Date built-in
class MyDate extends Date {
  constructor() {
    super();
  }

  getFormattedDate() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return this.getDate() + '-' + months[this.getMonth()] + '-' +
      this.getFullYear();
  }
}

var aDate = new MyDate();
ChromeSamples.log(aDate.getTime());
ChromeSamples.log(aDate.getFormattedDate());


class Stack extends Array {
  constructor() {
    super();
  }

  top() {
    return this[this.length - 1];
  }
}

var stack = new Stack();
stack.push('world');
stack.push('hello');
ChromeSamples.log(stack.top());
ChromeSamples.log(stack.length);
