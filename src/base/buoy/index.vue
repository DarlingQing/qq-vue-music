<template>
  <div>
    <div
      @touchstart.stop="handleImageStart"
      @touchmove.stop.prevent="handleImageMove"
      class="Buoy"
      ref="buoyRef"
    >
      {{ content }}
      <image :src="url" />
      <div
        v-if="hasCloseShown"
        @click.stop="handleClose"
        class="Buoy-icon-close"
      >
        <i class="icon-mine" />
      </div>
    </div>
  </div>
</template>

<script>
import { setStyle, getPropNumeric } from '@/util/styles';
import './index.styl';

export default {
  // 浮标组件
  name: 'buoy',

  props: {
    // 浮标文本
    content: {
      type: String,
      default: 'This is a Buoy',
    },

    // 组件图片
    url: {
      type: String,
      default: '',
    },

    // 是否有关闭按钮
    hasCloseShown: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleImageStart() {
      const { buoyRef } = this.$refs;
      const targetRect = buoyRef.getBoundingClientRect();
      this.startX = targetRect.left;
      this.startY = targetRect.top;
      const { touches } = event;
      this.pageX = touches[0].pageX;
      this.pageY = touches[0].pageY;
    },

    handleImageMove(event) {
      const { touches } = event;
      const { pageX, pageY } = touches[0];
      const moveX = Math.max(0, Math.min(pageX - this.pageX + this.startX, this.canMoveMaxX));
      const moveY = Math.max(0, Math.min(pageY - this.pageY + this.startY, this.canMoveMaxY));
      setStyle(this.$refs.buoyRef, {
        left: `${moveX}px`,
        top: `${moveY}px`,
      }, true);
    },

    handleClose() {
      setStyle(this.$refs.buoyRef, {
        display: 'none',
      });
    }
  },

  mounted() {
    const { buoyRef } = this.$refs;
    this.canMoveMaxX = window.innerWidth - getPropNumeric(buoyRef, 'width');
    this.canMoveMaxY = window.innerHeight - getPropNumeric(buoyRef, 'height');
  },
}
</script>
