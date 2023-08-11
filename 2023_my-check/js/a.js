class CustomPromise {
  constructor(executor) {
    this.status = 'pending'; // Promise 状态：pending/fulfilled/rejected
    this.value = undefined; // Promise 的最终结果值
    this.onResolvedCallbacks = []; // 存储成功回调的数组
    this.onRejectedCallbacks = []; // 存储失败回调的数组

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onResolvedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    };

    const reject = (reason) => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.value = reason;
        this.onRejectedCallbacks.forEach((callback) => {
          callback(reason);
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 处理参数默认值，使 then 方法可选
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    return new CustomPromise((resolve, reject) => {
      const fulfilledCallback = () => {
        try {
          const x = onFulfilled(this.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };

      const rejectedCallback = () => {
        try {
          const x = onRejected(this.value);
          resolvePromise(newPromise, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };

      if (this.status === 'fulfilled') {
        // 如果状态已经是 fulfilled，则直接执行成功回调，并返回新的 Promise
        setTimeout(fulfilledCallback, 0);
      } else if (this.status === 'rejected') {
        // 如果状态已经是 rejected，则直接执行失败回调，并返回新的 Promise
        setTimeout(rejectedCallback, 0);
      } else if (this.status === 'pending') {
        // 如果状态仍然是 pending，将回调函数存储起来，等待状态改变后再执行对应的回调
        this.onResolvedCallbacks.push(fulfilledCallback);
        this.onRejectedCallbacks.push(rejectedCallback);
      }
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    // 如果返回的结果和当前 Promise 是同一个对象，抛出类型错误
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  let called = false; // 确保 resolve 或 reject 只被调用一次

  if (x instanceof CustomPromise) {
    // 如果返回的是一个 Promise 对象，递归地执行它
    if (x.status === 'pending') {
      x.then((value) => {
        resolvePromise(promise, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 如果返回的是一个对象或函数，且有 then 方法，则将其视为 Promise-like 对象调用 then 方法
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (!called) {
              called = true;
              resolvePromise(promise, value, resolve, reject);
            }
          },
          (reason) => {
            if (!called) {
              called = true;
              reject(reason);
            }
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (!called) {
        called = true;
        reject(e);
      }
    }
  } else {
    // 返回的是普通值，直接 resolve
    resolve(x);
  }
}
