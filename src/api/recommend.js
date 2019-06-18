// import jsonp from 'common/js/jsonp'
import { commonParams } from './config';
import axios from 'axios';

/**
 * 获取轮播图相关数据API
 */
export function getRecommend() {
  const url = '/api/getRecommend'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  // return axios.get(url, {
  //   params: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    }).then((res) => {
      // console.log(res.data);
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  })
}

/**
 * 歌单数据
 */
export function getDiscList() {
  // 线上环境地址，同学们根据自己的需要配置修改
  const url = '/api/getDiscList';

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
