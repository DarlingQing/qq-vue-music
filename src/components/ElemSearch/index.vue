<template>
  <div>
    <el-button @click="clickHandle">默认按钮</el-button>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';

export default {
  components: {
    Toast,
  },

  data () {
    return {};
  },

  methods: {
    clickHandle() {
      Toast('This is a toast message!');
    },
  },

  mounted() {
  },
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
