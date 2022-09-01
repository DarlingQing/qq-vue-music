<template>
  <div class="VueCode">
    <div
      @click="handleRender"
      class="VueCode-item"
    >render相关</div>
    <input type="textarea" />
    <div class="textarea"></div>
  </div>
</template>
<script>
import { arrayDeepFlatten } from '@/util/data';
import { isPrimitive } from '@/util/lang';
import mixinsDemo from '@/mixins/demo';

export default {
  mixins: [mixinsDemo],

  data () {
    return {
      message: 'hello Vue',
      // 数组降级测试数据
      arr: [
        222,
        ['h', 'e', 'l', 'l', 'o'],
        ['m', 'y'],
      ],
    }
  },

  methods: {
    handleRender() {
      this.$router.push({
        path: '/render',
      });
    },

    // 重名mixins test
    hello() {
      console.log(222, 'This is vue-code demo hello');
    },

    proxyMethods() {
      //  target包装的目标对象(对象、原生数组、函数)，handler
      // const p = new Proxy(target, handler);
      // const handler = {
      //   get: function(obj, prop) {
      //     return prop in obj ? obj[prop] : 37;
      //   }
      // };
      let target = {};

      const p = new Proxy(target, {});
      p.a = 37;
      console.log(p, target, p === target, target.a);

      let validator = {
        set: function(obj, prop, value) {
          if (prop === 'age') {
            if (!Number.isInteger(value)) throw new TypeError('The age is not an integer');
            if (value > 200) throw new RangeError('The age seems invalid');
          }

          // The default behavior to store the value
          obj[prop] = value;

          // 表示成功
          return true;
        }
      };

      let person = new Proxy(target, validator);

      person.age = 300;

      console.log(target.age);
      // 100
    },
  },

  mounted() {
    // 数组降级测试结果
    this.deepFlattenData = arrayDeepFlatten(this.arr);
    console.log(this.deepFlattenData, isPrimitive(123), this.mixinData1);
    this.hello();

    this.proxyMethods();
  },
}
</script>
<style>

</style>
