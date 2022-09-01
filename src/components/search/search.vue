<template>
  <div class="search">
    <input
      v-model="keyword"
      @keyup.enter="handleSearch(keyword)"
      class="input"
    >
  </div>
</template>
<script>
// import gql from 'graphql-tag';
import { search, test } from '../../graphql/index';
// import server from '../../server.js';

export default {
  // apollo: {
  //   viewer: gql`query {
  //     hello
  //   }`
  // },

  data () {
    return {
      keyword: null,
      result: null,
    }
  },

  methods: {
    init() {
      test({ 'login': 'DarlingQing' }).then(res => {
        console.log(222, res);
      })

      var dice = 3;
      var sides = 6;
      var query = `query RollDice($dice: Int!, $sides: Int) {
        rollDice(numDice: $dice, numSides: $sides)
      }`;

      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { dice, sides },
        })
      })
        .then(r => r.json())
        .then(data => console.log('data returned:', data));
    },
    handleSearch (keyword) {
      search({ 'keyword': keyword, 'first': 10 }).then(res => {
        console.log(111, res);
        this.result = res.data.search;
      })
    },
  },

  mounted() {
    this.init();
  },
}
</script>
<style>

</style>
