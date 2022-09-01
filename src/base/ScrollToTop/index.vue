<template>
  <div
    v-show="shown"
    :style="{
      right: styleRight,
      bottom:  styleBottom,
    }"
    @click="handleClick"
    class="ScrollTopTop"
  >
    <slot>
      <div class="ScrollTopTop-content" />
    </slot>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import { getScrollTop } from '@/util/styles';
import './index.styl';

const cubic = value => Math.pow(value, 3);
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;

export default {
  name: 'scroll-top-top',

  props: {
    // 滚动高度达到次参数值才出现
    visibilityHeight: {
      type: Number,
      default: 200,
    },

    // 控制其显示位置, 距离页面右边距
    right: {
      type: Number,
      default: 20,
    },

    // 控制其显示位置, 距离页面底部距离
    bottom: {
      type: Number,
      default: 40,
    },
  },

  data () {
    return {
      el: null,
      container: null,
      shown: false,
    };
  },

  computed: {
    styleBottom() {
      return `${this.bottom}px`;
    },

    styleRight() {
      return `${this.right}px`;
    },
  },

  methods: {
    init() {
      this.container = document;
      this.el = document.documentElement;
    },

    handleScroll() {
      this.shown = getScrollTop() > this.visibilityHeight;
    },

    handleClick(e) {
      // window.scrollTo(0, 0);
      this.scrollToTop();
      this.$emit('click', e);
    },

    scrollToTop() {
      const el = this.el;
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));
      const frameFunc = () => {
        const progress = (Date.now() - beginTime) / 500;
        if (progress < 1) {
          el.scrollTop = beginValue * (1 - easeInOutCubic(progress));
          rAF(frameFunc);
        } else {
          el.scrollTop = 0;
        }
      };
      rAF(frameFunc);
    },
  },

  mounted() {
    this.init();
    this.doScroll = throttle(this.handleScroll, 250);
    this.container.addEventListener('scroll', this.doScroll, false);
  },

  beforeDestroy() {
    this.container.removeEventListener('scroll', this.doScroll, false);
  },
}
</script>
<style>

</style>
