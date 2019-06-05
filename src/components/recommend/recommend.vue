<template>
  <div class="recommend">
    <!-- 必须传数据，重新计算scroll组件的高度 -->
    <Scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <!-- slider轮播组件 -->
            <slider ref="slider">
              <div v-for="(item, index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="loadImage">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key=index class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- loading组件非全局状态，应该放在每个对应的组件中，根据数据驱动它的显示和影藏 -->
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {getRecommend, getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    // 获取轮播图数据
    this._getRecommend()
    // 获取推荐歌单数据
    this._getDiscList()
  },
  methods: {
    loadImage () {
      // 标志位，直接挂载到vue实例中，不需要观测这个值的变化，无需定义在data或者prop中
      if (!this.checkloaded) {
        this.checkloaded = true
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 20)
      }
    },
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
        // console.log(res)
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res)
          this.discList = res.data.list
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
