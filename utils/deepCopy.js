function isObject(obj){
  return obj !== null && (typeof obj === 'object' || typeof obj === 'function')
}
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


module.exports = {
  deepCopy
}