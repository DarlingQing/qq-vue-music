<template>
  <div class="NoticeRemind">
    <transition-group
      name="scroll"
      tag="div"
    >
      <div
        v-for="(item, index) in data"
        :key="item.data"
        class="NoticeRemind-item"
        v-show="currentIndex === index"
      >
        <div
          v-html="item.data"
          class="NoticeRemind-item-text"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import './index.styl';

const MIN_LENGTH = 1;

export default {
  name: 'notice-remind',

  watch: {
    hasEmptySecond(val) {
      if (val) {
        this.data = this.data.filter((item) => item.restSecond);
        this.hasNoneSecond = false;
        if (this.data.length) this.setTimer();
      }
    },
  },

  props: {
    data: {
      type: Array,
      required: true,
    },

    // 滚动时间
    autoplay: {
      type: Number,
      default: 3000,
    },

    // 是否能循环播放
    loop: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      currentIndex: 0,
      timer: null,
      hasEmptySecond: false,
      showNoticeDatas: [],
    };
  },

  methods: {
    initShowDatas() {
      this.showNoticeDatas = this.data.filter((item) => item.restSecond);
    },

    // 设置超过MIN_LENGTH 条的公告每3s向上滚动
    setTimer() {
      this.clearTimer();
      if (this.showNoticeDatas.length < MIN_LENGTH) return;

      this.timer = setInterval(() => {
        if (this.currentIndex === this.showNoticeDatas.length - 1) {
          if (!this.loop) return;
        }
        this.currentIndex += 1;
        if (this.currentIndex === this.showNoticeDatas.length) {
          this.currentIndex = 0;
        }
      }, this.autoplay);
    },

    clearTimer() {
      clearInterval(this.timer);
    },

    setCountDown() {
      this.showNoticeDatas.forEach((item) => {
        if (item.restSecond) this.countDown(item);
      })
    },

    countDown(item) {
      item.countDownFn = setInterval(() => {
        const second = Math.max(item.restSecond - 1, 0);
        item.restSecond = second;
        if (second === 0) {
          clearInterval(item.countDownFn);
          this.hasEmptySecond = true;
        }
      }, 1000);
    },
  },

  mounted() {
    this.initShowDatas();
    this.setCountDown();
    this.setTimer();
  },

  beforeDestroy() {
    this.clearTimer();
  },
}
</script>
<style>

</style>
