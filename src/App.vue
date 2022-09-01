<template>
  <div id="app">
    <!-- <m-header /> -->
    <!-- <tab /> -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import MHeader from '@/components/Home/MHeader';
// import Tab from '@/components/Home/Tab';

export default {
  name: 'App',
  components: {
    // MHeader,
    // Tab,
  }
}
</script>

<style lang="stylus" src="@/common/stylus/index.styl">
  @import "~common/stylus/variable"
</style>
