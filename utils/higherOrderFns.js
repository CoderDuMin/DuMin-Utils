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

// 防抖函数
function debounce(fn, delay, immediate = false, resultCallback) {
  // 1.用于记录上一次事件触发的timer
  let timer = null
  let isInvoke = false

  // 2.触发事件时执行的函数
  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      try {
        // 2.1.如果有再次触发(更多次触发)事件, 那么取消上一次的事件
        if (timer) clearTimeout(timer)

        // 第一次操作是不需要延迟
        let res = undefined
        if (immediate && !isInvoke) {
          res = fn.apply(this, args)
          if (resultCallback) resultCallback(res)
          resolve(res)
          isInvoke = true
          return
        }

        // 2.2.延迟去执行对应的fn函数(传入的回调函数)
        timer = setTimeout(() => {
          res = fn.apply(this, args)
          if (resultCallback) resultCallback(res)
          resolve(res)
          timer = null // 执行过函数之后, 将timer重新置null
          isInvoke = false
        }, delay);
      } catch (error) {
        reject(error)
      }
    })
  }

  // 3.给_debounce绑定一个取消的函数
  _debounce.cancel = function() {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  // 返回一个新的函数
  return _debounce
}

// 节流
function throttle(fn,interval,{leading=true,trailing=false}={}){
  let startTime = 0
  let timer = null
  const _throttle = function(...args){
    return new Promise((resolve,reject)=>{
      try {
         // 1.获取当前时间
        let nowTime = new Date().getTime()

        // 对立即执行进行控制
        if(!leading && startTime === 0){
          startTime = nowTime
        }

        // 2.计算需要等待的时间执行函数
        let waitTime = interval - (nowTime - startTime)

        if(waitTime <= 0){
          if(timer)clearTimeout(timer);
          const res = fn.apply(this,args)
          resolve(res)
          startTime = nowTime
        }

        // 3.判断是否需要执行尾部
        if(trailing && !timer){
          if(timer)clearTimeout(timer);
          timer = setTimeout(()=>{
            const res = fn.apply(this,args)
            resolve(res)
            startTime = new Date().getTime()
            timer = null
          },waitTime)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  _throttle.cancel = function(){
    if(timer)clearTimeout(timer)
    startTime = 0
    timer = null
  }
  return _throttle
}

// 对象判断
function isObject(obj){
  return obj !== null && (typeof obj === 'object' || typeof obj === 'function')
}

// 深拷贝
function deepCopy(obj){
  const newObj = {}

  for(const key in obj){
    const value = obj[key]

    if(value instanceof Map){
      newObj[key] = new Map(value)
      continue
    }
    if(value instanceof Set){
      newObj[key] = new Set(value)
      continue
    }
    if(typeof value === 'function'){
      newObj[key] = value
      continue
    }
    if(Array.isArray(value)){
      newObj[key] = new Array(value)
      continue
    }
    if(isObject(value)){
      newObj[key] = deepCopy(value)
      continue
    }
    newObj[key] = value
  }

  return newObj
  
}

export {
  currying,
  debounce,
  throttle,
  isObject,
  deepCopy
}