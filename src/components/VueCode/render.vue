<script>
export default {
  name: 'Vue-render',

  data () {
    return {
      message: 'hello Render Vue',
    }
  },

  methods: {
    handleRender() {
      // this._data是副本，相当于this.data中的数据都拷贝了一份到_data中
      console.log(111, this.message, this._data.message);
    },
  },

  mounted() {
  },

  // 手写render函数，不会执行从template编译成render的过程
  // 写了render不必写template，是会被template覆盖的过程
  // Demo  link: https://cn.vuejs.org/v2/guide/render-function.html?
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: 'app',
      },
      class: ['Vue-render'],
      ref: 'vueRender',
      on: {
        click: this.handleRender,
      },
    }, this.message);
  },
  // render() {
  //   return <div>message</div>
  // },
}
</script>
<style>

</style>
