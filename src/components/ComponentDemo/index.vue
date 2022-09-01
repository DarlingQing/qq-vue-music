<template>
  <div class="recommend">
    <TabScrollFixed />
    <!-- 浮标组件 -->
    <!-- <buoy has-close-shown /> -->
    <!-- 打几🌟组件 -->
    <!-- <star
      :score="score"
    /> -->
    <!-- <notice-remind
      :data="noticeDatas"
    /> -->
    <!-- <scroll-to-top /> -->

    <!-- <ui-skeleton
      :loading="showSkelton"
      :rows="1"
      active
    >
      <div>Test Skeleton</div>
    </ui-skeleton> -->
    <!-- <mt-progress :value="60">
      <div slot="start">0%</div>
      <div slot="end">100%</div>
    </mt-progress> -->
  </div>
</template>

<script>
import TabScrollFixed from 'base/tabScrollFixed';
// import { mapState } from 'vuex';
// import Buoy from 'base/buoy';
// import Star from 'base/Star';
// import ScrollToTop from 'base/ScrollToTop';
// import NoticeRemind from 'base/NoticeRemind';
// import UiSkeleton from 'base/Skeleton';
import { getRecommend } from 'api/recommend';

export default {
  name: 'components-demo',

  components: {
    TabScrollFixed,
    // Buoy,
    // Star,
    // ScrollToTop,
    // NoticeRemind,
    // UiSkeleton,
  },

  data () {
    return {
      data: 'hello vue',
      score: 4,
      scrollDatas: [],
      noticeDatas: [
        {
          data: 'This is a remind info',
          restSecond: 300000,
        },
        {
          data: 'This is a remind info too',
          restSecond: 300000,
        },
      ],
      showSkelton: true,
    }
  },

  computed: {},

  methods: {
    async initScrollDatas() {
      const data = await getRecommend();
      console.log(111, data);
    },

    testHandle() {
      this.popupVisible = true;
    },

    initSkeleton() {
      setTimeout(() => {
        this.showSkelton = false;
      }, 3000);
    },
  },

  mounted() {
    this.initScrollDatas();
    this.initSkeleton();
  },
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
