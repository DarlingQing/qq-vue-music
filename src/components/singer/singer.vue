<!--歌手页面-->
<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>
<script>
import {getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/list-view/list-view'
// 定义常量
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  components: {
    ListView
  },
  data () {
    return {
      singers: []
    }
  },
  created () {
    // 获取歌手数据
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        console.log(res)
        this.singers = this._normalizeSinger(res.data.list)
        console.log(this.singers)
      })
    },
    // 处理歌手列表数据，进行热门以及字母排序
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      // 得到热门歌手数据
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_id
          }))
        }
        // 二位数组的字母数组添加
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_id
        }))
      })
      // 处理map,得到有序列表
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 字母从小到大排列
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
