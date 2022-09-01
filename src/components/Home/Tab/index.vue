<template>
  <div class="tab">
    <router-link
      tag="div"
      class="tab-item"
      to="/component-demo"
    >
      <span class="tab-link">组件</span>
    </router-link>
    <router-link
      tag="div"
      class="tab-item"
      to="/vue-code"
    >
      <span class="tab-link">vue-code</span>
    </router-link>
    <router-link
      tag="div"
      class="tab-item"
      to="/elem-search"
    >
      <span class="tab-link">Elem相关</span>
    </router-link>
    <router-link
      tag="div"
      class="tab-item"
      to="/search"
    >
      <span class="tab-link">Graphql.js</span>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      text-align: center
      width: 25%
      flex: 1
      .tab-link
        padding-bottom: 5px
        color: $color-text-l
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
