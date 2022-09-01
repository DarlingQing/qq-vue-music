<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot />
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active: currentPageIndex === index}"
        v-for="(item, index) in dots"
        :key="index"
      />
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom';

export default {
  name: 'Slider',

  props: {
    //  是否轮播
    loop: {
      type: Boolean,
      default: true,
    },

    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true,
    },

    // 间隔时间
    interval: {
      type: Number,
      default: 4000,
    },
  },

  data () {
    return {
      // 小圆点
      dots: [],
      currentPageIndex: 0,
    };
  },

  mounted () {
    setTimeout(() => {
      // 设置轮播图宽度
      this.setSliderWidth();
      //  初始化小圆圈
      this.initDots();
      // 初始化轮播图
      this.initSlider();
    }, 20);

    // 视图改变重新计算宽度
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return;
      }
      this.setSliderWidth(true);
      // 重新刷新一下better-scroll
      this.slider.refresh();
    });
  },

  methods: {
    setSliderWidth (isResize) {
      this.children = this.$refs.sliderGroup.children;
      let width = 0;
      //  可视宽度
      let sliderWidth = this.$refs.slider.clientWidth;
      // console.log(sliderWidth)
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }
      //  若支持循环播放，则宽度为2倍
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      // console.log(width)
      this.$refs.sliderGroup.style.width = width + 'px';
    },

    initSlider () {
      //  初始化slider组件
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400,
        },
      })
      this.slider.on('scrollEnd', this.onScrollEnd);
    },

    // 滚动结束后
    onScrollEnd () {
      let pageIndex = this.slider.getCurrentPage().pageX;
      // console.log(pageIndex)
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        clearTimeout(this.timer);
        // 自动播放
        this.play();
      }
    },

    //  自动播放
    play () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next();
      }, this.interval);
    },

    // 初始化小圆点
    initDots () {
      this.dots = new Array(this.children.length);
      // console.log(this.dots)
    },
  },

  destoryed () {
    clearTimeout(this.timer);
  },
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
