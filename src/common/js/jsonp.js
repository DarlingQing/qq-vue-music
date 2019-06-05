import originJsonp from 'jsonp'

//  对原来的jsonp进行一层封装
export default function jsonp (url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] === undefined ? '' : data[k]
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}
