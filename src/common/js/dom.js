/**
 * 判断是否存在class类
 * @param {*} el 目标dom元素
 * @param {*} className 需要判断的className名
 */
export function hasClass (el, className) {
  // h5新增的函数，会存在兼容性问题
  return el.classList.contains(className);
  // 正则方法
  // let reg = new RegExp('^|\\s' + className + '\\s|$');
  // return reg.test(reg);
}

/**
 * 为某个el元素增加className名
 * @param {*} el 目标元素
 * @param {*} className 目标className名
 */
export function addClass (el, className) {
  el.classList.add(className);
}

// 取值
export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}
