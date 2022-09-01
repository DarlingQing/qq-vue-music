/**
 * Singer接口类
 */
export default class Singer {
  constructor ({ id, name }) {
    this.id = id;
    this.name = name;
    this.avatar = require('common/image/default.png');
    // this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg`;
  }
}
