<template>
  <div class="main">
    <canvas id="the-canvas"></canvas>
  </div>
</template>

<script>
//  import PDFJS from 'pdfjs-dist'
export default {
  name: 'HelloWorld',
  components: {
  },
  data () {
    return {
      pdfDoc: null,
      pageNum: 1,
      pageRendering: false,
      pageNumPending: null,
      scale: 0.9,
      url: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
    }
  },
  methods: {
    showPDF () {}
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
