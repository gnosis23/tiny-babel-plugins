const log = console.log;

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
  log(x);
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
  log(x);
}

// Example 3
// generator
function *createIterator(items) {
  for (let i = 0; i < items.length; i++) {
    yield items[i];
  }
}
// iterator = function *(items) {}

let iterator = createIterator([1, 2, 3]);
log(iterator.next().value); // 1
log(iterator.next().value); // 2
log(iterator.next().value); // 3
log(iterator.next());

// default iterator
let values = [1, 2, 3];
iterator = values[Symbol.iterator]();

log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());


// create iterable
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for (let item of this.items) {
      yield item;
    }
  }
};

collection.items.push('a');
collection.items.push('b');
collection.items.push('c');

for (let x of collection) {
  log(x)
}

// =============================================================================
//                                委托生成器
// =============================================================================
function *createNumberIterator() {
  yield 1;
  yield 2;
}

function *createColorIterator() {
  yield "red";
  yield "green";
}

function *createCombinedIterator() {
  yield *createNumberIterator();
  yield *createColorIterator();
  yield true;
}

iterator = createCombinedIterator();

log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());
log(iterator.next());


// =============================================================================
//                                异步任务执行器
// =============================================================================
function run(taskDef) {

  // 创建一个无使用限制的迭代器
  let task = taskDef();

  // 开始执行
  let result = task.next();

  // 循环调用 next() 函数
  function step() {
    if (!result.done) {
      if (typeof result.value === "function") {
        result.value(function(err, data) {
          if (err) {
            result = task.throw(err);
            return;
          }

          result = task.next(data);
          step();
        });
      } else {
        result = task.next(result.value);
        step();
      }
    }
  }

  // 开始执行
  step();
}

const fs = require('fs');

function readFile(filename) {
  return function(callback) {
    fs.readFile(filename, callback);
  };
}

run(function *() {
  let contents = yield readFile("package.json");
  log(contents.length);
  log("Done");
});
