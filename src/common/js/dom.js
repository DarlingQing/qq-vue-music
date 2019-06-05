export function hasClass (el, className) {
  // h5新增的函数，会存在兼容性问题
  return el.classList.contains(className)
}

export function addClass (el, className) {
  el.classList.add(className)
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
