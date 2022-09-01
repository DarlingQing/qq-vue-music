// 检测类型
const { toString } = Object.prototype;
const is = type => obj => toString.call(obj) === `[object ${type}]`;

export const isObject = is('Object');

export const isString = is('String');

// 是否是基础类型
export const isPrimitive = (value) => {
  return typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
}
