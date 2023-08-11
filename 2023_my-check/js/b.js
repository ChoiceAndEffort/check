/**
 * 手动实现自己的Promise
 */
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始化状态
    this.value = undefined; // 记录成功的值
    this.reason = undefined; // 记录失败的值
    this.onResolvedCallback = []; // 存放当成功时执行的函数列表
    this.onRejectedCallback = []; // 存放当失败时执行的函数列表
    let resolve = (value) => {
      // 为了不被重复的调用改变状态，需要锁定状态
      if (this.state === 'pending') {
        // pending -> fulfilled
        // 将状态改为成功，记录成功的信息
        this.state = 'fulfilled'; // 更新状态
        this.value = value;

        // 调用缓存的成功数组的函数
        this.onResolvedCallback.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      // 为了不被重复的调用改变状态，需要锁定状态
      if (this.state === 'pending') {
        // pending -> rejected
        // 将状态改为失败，记录失败的信息
        this.state = 'rejected';
        this.reason = reason;

        // 调用失败数组的函数
        this.onRejectedCallback.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  /**
   * 解决链式调用的方法
   * @param {any} x
   * @param {resolve} reslove
   * @param {reject} reject
   * @param {MyPromise} promise2
   */
  resolvePormise(x, reslove, reject, promise2) {
    // 防止循环调用自己引发的死循环
    if (x === promise2) {
      return reject(new TypeError('不能循环调用同一个promise'));
    }
    // 如果成功搞得回调函数的返回值时promise
    if (x instanceof MyPromise) {
      x.then(
        (value) => reslove(value),
        (error) => reject(error)
      );
    } else {
      reslove(x);
    }
  }
  /**
   * @param {*} onFulFilled 成功时调用
   * @param {*} onRejected 失败后被调用
   */
  then(onFulFilled, onRejected) {
    // 为了实现链式调用
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          // 等待promise2生成
          // 当前成功时回调的返回值
          const x = onFulFilled(this.value);
          this.resolvePormise(x, resolve, reject, promise2);
        }, 0);
      }
      if (this.state === 'rejected') {
        onRejected(this.reason);
      }

      // 当异步调用时，状态为pending，需要处理一下
      if (this.state === 'pending') {
        // 成功的时候要干的事，将then成功的回调函数存入列表
        this.onResolvedCallback.push(() => {
          const x = onFulFilled(this.value);
          this.resolvePormise(x, resolve, reject, promise2);
        });
        // 失败时要干的事，将then失败的回调函数存入列表
        this.onRejectedCallback.push(() => {
          onRejected(this.reason);
        });
      }
    });
    return promise2;
  }
  // 实现静态方法
  static resolve(val) {
    return new MyPromise((resolve, reject) => {
      resolve(val);
    });
  }
  static reject(data) {
    return new MyPromise((resolve, reject) => {
      reject(data);
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      // 谁先满足条件（谁先修改状态）谁就先调用resolve
      // 运用了状态凝固的原理
      for (let index = 0; index < promises.length; index++) {
        const promise = promises[index];
        promise.then(resolve, reject);
      }
    });
  }
  static all(promises) {
    let arr = [];
    let i = 0; // 有多少个成功了，如果i === promises.length 则满足条件
    function procesData(index, data, resolve) {
      arr[index] = data; // 按顺序存结果
      i++;
      if (i === promises.length) {
        resolve(arr);
      }
    }
    return new MyPromise((resolve, reject) => {
      for (let j = 0; j < promises.legth; j++) {
        promises[j].then((data) => {
          procesData(j, data, resolve);
        }, reject);
      }
    });
  }
}
