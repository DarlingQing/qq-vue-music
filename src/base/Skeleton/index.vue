<template>
  <div
    :class="{
      'UiSkeleton-active': active,
      UiSkeleton: true,
    }"
  >
    <template v-if="loading">
      <h3
        v-if="title"
        :style="{ width: `${titleWidth}%` }"
        class="UiSkeleton-title"
      />
      <ul class="UiSkeleton-paragraph">
        <li
          v-for="row in rows"
          :key="row"
          :style="{ width: row === rows && rows > 1 ? `${width}%` : '100%' }"
        />
      </ul>
    </template>
    <slot v-else />
  </div>
</template>

<script>
import './index.styl';

// 骨架屏组件，组件api参考antd skeleton https://ant.design/components/skeleton-cn
export default {
  name: 'ui-skeleton',

  props: {
    // 是否在加载中
    loading: {
      type: Boolean,
      default: true,
    },

    // 初始加载默认几行占位
    rows: {
      type: Number,
      default: 3,
    },

    title: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: false,
    },

    titleWidth: {
      type: Number,
      default: 38,
    },

    width: {
      type: Number,
      default: 61,
    },
  },
};
</script>
