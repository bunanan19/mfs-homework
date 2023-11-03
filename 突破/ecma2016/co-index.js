/**
 * slice() 引用.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * 将给定的生成器“fn”包装成返回promise的函数。
 * 当调用被包装后的函数时，它会在内部调用co函数，
 * 并将生成器函数的执行结果作为参数传递给co函数。
 * co函数会负责执行生成器函数，并返回一个 Promise 对象。 
 * 这是一个单独的功能，因此每个“co（）”调用都不会创建新的，不必要的关闭。
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function (fn) {
  // 将传入的生成器函数设置为 createPromise 函数的 __generatorFunction__ 属性
  createPromise.__generatorFunction__ = fn;
  // 返回 createPromise 函数作为包装后的生成器函数
  return createPromise;
  function createPromise() {
    // 在 createPromise 函数内部，调用 co 函数并传入生成器函数的执行结果
    // co 函数会处理生成器函数的执行，并返回一个 Promise 对象
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * 执行生成器功能或生成器并回报承诺
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  // 我们将所有内容都封装在promise中以避免promise链接，
  // 这导致存储器泄漏错误。
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    // 检查 gen 是否为函数，如果是，则调用它，并将结果赋给 gen
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    // 检查 gen 是否为一个迭代器对象，如果不是，则直接将其解析为已解决的 Promise 并返回
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();//调用  onFulfilled  函数开始迭代生成器函数的执行。

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        // 调用生成器函数的 next 方法，传入上一次 yield 表达式的结果
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      // 调用 next 函数，处理生成器函数返回的结果
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */
    //处理生成器函数中的异常情况
    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * 获取生成器中的下一个值，回报承诺。
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      if (ret.done) return resolve(ret.value);// 如果生成器函数执行完成，返回 Promise 对象并解析结果
      var value = toPromise.call(ctx, ret.value);// 将生成器函数返回的值转换为 Promise 对象
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);// 如果转换后的值是一个 Promise 对象，返回该 Promise 对象并处理解决和拒绝情况
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));// 如果转换后的值不是一个 Promise 对象，调用 onRejected 函数并传递一个 TypeError
    }
  });
}

/**
 * 将“yield”值转换为promise。
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */
//toPromise  函数用于将不同类型的值转换为 Promise 对象。
function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  // 如果 obj 是一个生成器函数或生成器对象，则调用 co 函数来处理它
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
   // 如果 obj 是一个函数，则将其转换为 Promise 对象
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  // 如果 obj 是一个数组，则将其转换为 Promise 对象
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  // 如果 obj 是一个对象，则将其转换为 Promise 对象
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * 将thunk转换为promise。
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * 将一个“yieldables”数组转换为promise。
 * 在内部使用“Promise.all（）”。
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * 将“yieldables”对象转换为promise。
 * 在内部使用“Promise.all（）”。
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj){
  var results = new obj.constructor(); // 创建一个与原始对象相同构造函数的结果对象
  var keys = Object.keys(obj);// 获取对象的所有键
  var promises = [];// 创建一个存储 Promise 的数组
  for (var i = 0; i < keys.length; i++) {// 遍历对象的键
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);// 将值转换为 Promise
    if (promise && isPromise(promise)) defer(promise, key);// 如果值是 Promise，则延迟处理结果
    else results[key] = obj[key];// 否则直接赋值给结果对象
  }
  return Promise.all(promises).then(function () {// 返回 Promise.all 来等待所有 Promise 的解决
    return results;
  });
  // 延迟处理 Promise 结果的函数
  function defer(promise, key) {
    // 在结果对象中预定义键，并设为 undefined
    results[key] = undefined;
     // 将 Promise 添加到数组中，并在解决后将结果赋值给结果对象
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

/**
 * 检查“obj”是否为promise。
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * 检查“obj”是否为generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * 检查“obj”是否为generator函数.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */
 
function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
  return isGenerator(constructor.prototype);
}

/**
 * 检查普通对象。
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}