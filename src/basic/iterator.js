// Example 1
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    const iterator = {
      next() {
        if (step <= 2) {
          step++;
        }
        switch (step) {
          case 1:
            return { value: 'hello', done: false };
          case 2:
            return { value: 'world', done: false };
          default:
            return { value: undefined, done: true };
        }
      }
    };
    return iterator;
  }
};

for (const x of iterable) {
  console.log(x);
}

// Example 2
function iterateOver(...args) {
  let index = 0;
  return {
    [Symbol.iterator]() {
      const it = {
        next() {
          if (index < args.length) {
            return { value: args[index++] };
          } else {
            return { done: true };
          }
        }
      };
      return it;
    }
  }
}

for (const x of iterateOver('fee', 'fi', 'fo', 'fum')) {
  console.log(x);
}
