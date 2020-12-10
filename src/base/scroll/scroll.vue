<template>
  <div ref="wrapper">
    <slot />
  </div>
</template>

<script>
import BSCroll from 'better-scroll';

const DIRECTION_H = 'horizontal';
const DIRECTION_V = 'vertical';

export default {
  props: {
    probeType: {
      type: Number,
      default: 1 // 默认是1，会截流，只有在滚动结束的时候才会派发scroll事件
    },

    click: {
      type: Boolean,
      default: true
    },

    //  是否派发滚动事件
    listenScroll: {
      type: Boolean,
      default: false
    },

    //  列表数据
    data: {
      type: Array,
      default: function () {
        return [];
      }
    },

    //  是否派发顶部下拉的事件，用于下拉刷新
    pullup: {
      type: Boolean,
      default: false
    },

    //  是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },

    //  当数据更新后，刷新scroll的延时
    refreshDelay: {
      type: Number,
      default: 20
    },

    // 滚动方向
    direction: {
      type: String,
      default: DIRECTION_V
    }
  },

  mounted () {
    //  异步加载，确保DOM已经渲染后在初始化better-scroll
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    // 初始化Scroll组件
    _initScroll () {
      // 如果没有初始化，则退出
      if (!this.$refs.wrapper) return;
      // 初始化scroll组件
      this.scroll = new BSCroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
      });
      //  是否派发滚动事件,滚动的时候派发事件
      if (this.listenScroll) {
        let me = this;
        // 外层是better-scroll事件，内层是当前vue实例派发一个scroll事件
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos);
        });
      }
      //  是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollEnd');
          }
        });
      }
      //  是否派发滚动开始的事件
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll');
        });
      }
    },

    //  代理better-scroll的disable事件
    disable () {
      this.scroll && this.scroll.disable();
    },

    //  代理better-scroll的enable事件
    enable () {
      this.scroll && this.scroll.enable();
    },

    // 代理better-scroll的refresh事件
    refresh () {
      this.scroll && this.scroll.refresh();
    },

    // 代理better-scroll的scrollTo事件
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },

    // 代理better-scroll的scrollToElement事件
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },

  watch: {
    // 数据变化scroll组件重新更新
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay);
    }
  }
}
</script>
