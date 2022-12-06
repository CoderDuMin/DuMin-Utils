function debounce(fn, delay, isImmediate, resultCallback) {
  let timer = null;
  let isInvoke = false;

  function _debounce(...args) {
    clearTimeout(timer);
    if (isImmediate && !isInvoke) {
      const result = fn.apply(this, args);
      //如果有传回调函数,则把执行结果带入回调函数
      if (resultCallback) {
        resultCallback(result);
      }
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        const result = fn.apply(this, args);
        //如果有传回调函数,则把执行结果带入回调函数
        if (resultCallback) {
          resultCallback(result);
        }
        isInvoke = false;
      }, delay);
    }
  }

  //取消事件
  _debounce.cancle = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    isInvoke = false;
  };

  return _debounce;
}

module.exports = {
  debounce,
};
