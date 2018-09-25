// =============================================================================
//                                    Class
// =============================================================================
const log = console.log;



// Constructor
class Polygon {
  constructor() {
    this.name = "Polygon";
  }
}

const poly1 = new Polygon();

log(poly1.name); 


class Square extends Polygon {
  constructor() {
    super();
  }
}

class Rectangle {}

Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype);   // false
log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); // true

let newInstance = new Square();
log(newInstance.name);



// extends
