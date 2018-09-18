// let
function order(x, y) {
  if (x > y) {
    let tmp = x;
    x = y;
    y = tmp;
  }
  console.log(tmp === x); // ReferenceError: tmp is not defined
  return [x, y]
}

// const
function shadow() {
  const foo = 5;
  if (foo) {
    const foo = 10;   // shadows outer foo
    console.log(foo); // 10
  }
  console.log(foo);   // 5
}

// Pitfall: Object.freeze() is shallow
