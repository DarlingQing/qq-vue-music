import {
  isString,
  isObject,
} from '@/util/lang';

// fix error when value is null
export const letPxGo = value => Number((value || '').replace('px', ''));

export const getComputedProp = (el, prop) => (el instanceof Element
  ? window.getComputedStyle(el, null)[prop] : null);

// 获取元素属性
export const getPropNumeric = (el, prop) => {
  if (!el) {
    return 0;
  }

  const value = letPxGo(getComputedProp(el, prop));

  return isNaN(value) ? 0 : value;
};

// 设置元素样式
export const setStyle = (el, styles, keepStyle = false) => {
  if (isObject(styles)) {
    styles = Object.keys(styles).reduce((style, key) => `${style} ${key}: ${styles[key]};`, '');
  }

  if (!isString(styles)) {
    // logger.warn('`styles` must be an object or string');
    return;
  }
  el.style.cssText = (keepStyle ? el.style.cssText : '') + styles;
};

export const getScrollTop = () => Math.max(
  document.body.scrollTop,
  document.documentElement.scrollTop,
  Math.abs(getPropNumeric(document.body, 'top')),
);
