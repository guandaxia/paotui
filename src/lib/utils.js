import md5 from 'vux/src/tools/md5'

function getQueryString (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

function sign (data) {
  if (data === undefined || data == null) {
    return ''
  }

  let newkey = Object.keys(data).sort() // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  let str = ''
  let value = ''
  for (let i = 0; i < newkey.length; i++) { // 遍历newkey数组
    value = data[newkey[i]]
    if (typeof value === 'object') {
      continue
    }
    str += newkey[i] + ':' + value + ',' // 向新创建的对象中按照排好的顺序依次增加键值对
  }
  str = str.slice(0, -1)
  return md5(str)
}

function setSessionStorage (key, value) {
  if (key === undefined || key == null) {
    return false
  }
  if (value) {
    value = window.JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value)
}

function getSessionStorage (key) {
  let value = window.sessionStorage.getItem(key)
  if (value) {
    value = window.JSON.parse(value)
  }
  return value
}

function setLocalStorage (key, value) {
  if (key === undefined || key == null) {
    return false
  }
  if (value) {
    value = window.JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

function getLocalStorage (key) {
  let value = window.localStorage.getItem(key)
  if (value) {
    value = window.JSON.parse(value)
  }
  return value
}

// module.exports = {
//   'getQueryString': getQueryString,
//   'getSessionStorage': getSessionStorage,
//   'setSessionStorage': setSessionStorage,
//   'getLocalStorage': getLocalStorage,
//   'setLocalStorage': setLocalStorage,
//   'sign': sign
// }
export default {
  getQueryString,
  getSessionStorage,
  setSessionStorage,
  getLocalStorage,
  setLocalStorage,
  sign
}
