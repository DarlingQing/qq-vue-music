<template>
  <scroll @scroll="scroll"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="(group, index) in data" class="list-group" ref="listGroup" :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="(item, index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <!-- touchstart、touchmove阻止默认事件 -->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item" :class="{'current': currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'

const ANCHOR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    // 获取右侧列表属性
    shortcutList () {
      return this.data.map((group) => {
        return group.title.slice(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  data () {
    return {
      // 需要去观测scrolly的值
      scrollY: -1,
      currentIndex: 0 //  默认第一个值高亮
    }
  },
  created () {
    // 不需要去观测这个值的变化
    this.probeType = 3 // 要去监听滚动不节流的方法
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  methods: {
    selectItem (item) {
      // this.$emit('select', item)
    },
    // 实时获取scrolly的值
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 手指开始触发的时候，记录第一个手指的y位置，和当前右侧列表的index值
    onShortcutTouchStart (e) {
      // 获取当前的index值
      let anchorIndex = getData(e.target, 'index')
      console.log(anchorIndex)
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    // 手指停止时，记录一下滚动的y值相差，和当前的index值
    onShortcutTouchMove (e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    _scrollTo (index) {
      // 做一些index值的边界处理
      if (!index && index !== 0) {
        return
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // scrollToElement(el, time, offsetX, offsetY, easing):滚动到制定的目标元素
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      // this.scrollY = this.$refs.listview.scroll.y
    },
    // 计算高度
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data () {
      //  保证所有手机dom渲染之后再进行操作
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部:newY > 0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          console.log(this.currentIndex)
          return
        }
      }
      // 当滚动到底部,且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    Scroll
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>