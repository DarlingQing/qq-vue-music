<template>
  <div :class="[starType, 'star']">
    <span
      v-for="(item, index) in itemClasses"
      :key="index"
      :class="item"
      @click="clickHandle(item, index)"
      class="star-item"
    />
  </div>
</template>
<script>

const MAX_LENGTH = 5; // star最大数量
const CLS_ON = 'on'; // 整颗星
const CLS_HALF = 'half'; // 半颗星
const CLS_OFF = 'off'; // 零星

// 星级评价类型：小、中、大、默认default为middle
const STAR_TYPE_MAP = {
  small: 24,
  middle: 36,
  large: 48,
};

export default {
  // 评级
  name: 'Star',

  props: {
    // 类型,
    type: {
      type: String,
      default: 'middle',
    },

    // 分数
    score: {
      type: Number,
      default: 0,
    },

    // 是否不可点击，默认为false，可点击
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentScore: this.score,
    };
  },

  computed: {
    starType() {
      return `star-${STAR_TYPE_MAP[this.type]}`;
    },

    itemClasses() {
      // 根据评分显示几颗星
      let result = [];
      const score = Math.floor(this.currentScore * 2) / 2;
      const hasDecimal = score % 1 === 0;
      // const hasDecimal = score * 100 - Math.floor(score) * 100;
      const interger = Math.floor(score);
      for (let i = 0; i < interger; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < MAX_LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    },
  },

  methods: {
    clickHandle(item, index) {
      if (item === this.currentScore) return;
      this.currentScore = index + 1;
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"

  .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./assets/star48_on')
        &.half
          bg-image('./assets/star48_half')
        &.off
          bg-image('./assets/star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./assets/star36_on')
        &.half
          bg-image('./assets/star36_half')
        &.off
          bg-image('./assets/star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./assets/star24_on')
        &.half
          bg-image('./assets/star24_half')
        &.off
          bg-image('./assets/star24_off')
</style>
