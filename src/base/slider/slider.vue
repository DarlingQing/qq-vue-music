<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
       <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  name: 'Slider',
  props: {
    //  是否轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 间隔时间
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      // 小圆点
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted () {
    setTimeout(() => {
      // 设置轮播图宽度
      this._setSliderWidth()
      //  初始化小圆圈
      this._initDots()
      // 初始化轮播图
      this._initSlider()
    }, 20)
    // 视图改变重新计算宽度
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      // 重新刷新一下better-scroll
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      //  可视宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // console.log(sliderWidth)
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      //  若支持循环播放，则宽度为2倍
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      // console.log(width)
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider () {
      //  初始化slider组件
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    // 滚动结束后
    _onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX
      // console.log(pageIndex)
      this.currentPageIndex = pageIndex
      if (this.autoPlay) {
        clearTimeout(this.timer)
        // 自动播放
        this._play()
      }
    },
    //  自动播放
    _play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    // 初始化小圆点
    _initDots () {
      this.dots = new Array(this.children.length)
      // console.log(this.dots)
    }
  },
  destoryed () {
    clearTimeout(this.timer)
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>