function throttle(fn, interval, options = { leading: true,trailing:true }) {
  let lastTime = 0;
  let timer = null;
  const {leading,trailing} = options

  const _throttle = function (...args) {
    const nowTime = new Date().getTime();
    if (lastTime == 0 && leading === false) {
      lastTime = nowTime;
    }
    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      if(timer){
        clearTimeout(timer)
        timer = null
      }
      fn.apply(this, args);
      lastTime = nowTime;
      return;
    }

    if(trailing){
      timer = setTimeout(()=>{
        fn.apply(this,args)
        timer = null
        lastTime = !leading ? 0 : new Date().getTime();
      },remainTime)
    }
  };

  return _throttle;
}

module.exports = {
  throttle,
};
