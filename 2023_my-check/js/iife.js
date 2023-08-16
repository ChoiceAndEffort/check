//定义逻辑+立即执行+独立的空间
const module1 = (() => {
  let count = 0;
  return {
    increase: () => ++count,
    reset: () => {
      count = 0;
    }
  };
})();

// module1.increase();
// module1.reset();
console.log(module1.increase(), module1.reset());
