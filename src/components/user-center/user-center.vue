<template>
  <div>user center</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
  },
  mounted() {
    // 当对象的属性 key 是动态的时候, 用解构语法
    const pick = (target, idKey, valueKey) => {
      // const id = target[idKey];
      // const value = target[valueKey];
      const { [idKey]: id, [valueKey]: value } = target;
      return { id, value };
    }

    const result = pick(
      {
        myId: 'foo',
        myValue: 'bar',
      },
      'myId',
      'myValue',
    );
    console.log(111, result);
  },
};
</script>
<style>

</style>
