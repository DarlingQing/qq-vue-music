<template>
  <div class="recommend">
    <!-- 必须传数据，重新计算scroll组件的高度 -->
    <scroll :data="discList" ref="scroll" class="recommend-content">
      <!-- 子元素，需要轮播图和歌单数据都要 -->
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <!-- slider轮播组件 -->
            <slider ref="slider">
              <div v-for="(item, index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" @load="loadImage">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <!-- 歌单数据 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 v-html="item.creator.name" class="name" />
                <p v-html="item.dissname" class="desc" />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- loading组件非全局状态，应该放在每个对应的组件中，根据数据驱动它的显示和影藏 -->
      <div class="loading-container" v-show="!discList.length">
        <loading />
      </div>
    </scroll>
  </div>
</template>
<script>
import Slider from 'base/slider/slider';
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading';
import { getRecommend, getDiscList } from 'api/recommend';
import { ERR_OK } from 'api/config';
export default {
  components: {
    Slider,
    Scroll,
    Loading
  },

  data() {
    return {
      // 推荐轮播图数据
      recommends: [],
      // 推荐轮播图小圆点
      discList: []
    }
  },

  created() {
    // 获取轮播图数据
    this._getRecommend();
    // 获取推荐歌单数据
    this._getDiscList();
  },

  methods: {
    // 确保图片被加载出来占位，bs能正确计算出高度，保证能滚动到底部
    loadImage() {
      // 标志位，直接挂载到vue实例中，不需要观测这个值的变化，无需定义在data或者prop中
      if (!this.checkloaded) {
        this.checkloaded = true;
        setTimeout(() => {
          this.$refs.scroll.refresh();
        }, 20)
      }
    },

    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      })
    },

    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list;
        }
      })
    }
  }
}
</script>
<style>
</style>
