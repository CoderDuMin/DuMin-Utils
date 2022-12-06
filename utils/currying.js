//柯里化函数实现
function currying(fn) {
  //获取原函数参数个数
  const length = fn.length;

  //返回的柯里化函数
  function _currying(...args) {
    //参数<原函数参数个数
    //返回一个新的函数接收剩余参数
    if (args.length < length) {
      function _currying2(...args2) {
        //递归调用检查参数
        return _currying.apply(this, args.concat(args2));
      }
      return _currying2;
    } else {
      //当已经传入的参数 大于等于 需要的参数时, 就执行函数
      return fn.apply(this, args);
    }
  }

  return _currying;
}

module.exports = {
  currying,
};
