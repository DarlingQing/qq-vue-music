import originJsonp from 'jsonp';

/**
 * 对原来的jsonp进行一层封装：封装成自定义的jsonp形式
 * @param {*} url 请求的url
 * @param {*} data 请求的data参数
 * @param {*} option 请求的options
 */
export default function jsonp(url, data, option) {
  // 拼接url的data，到url上
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    // 第三个参数支持一个回调函数，改成promise形式
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}

// 参数data拼接方法
export function param(data) {
  let url = '';
  for (let k in data) {
    let value = data[k] === undefined ? '' : data[k];
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}
