<template>
  <div class="music-list">
    <!--头部-->
    <div @click="back" class="back">
      <i class="icon-back" />
    </div>
    <h2 v-html="title" class="title" />
    <div :style="bgStyle" class="bg-image" ref="bgImage">
      <div class="play-wrapper">
        <div v-show="songs.length > 0 && playFlag" ref="playBtn" class="play">
          <i class="icon-play" />
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter" />
    </div>
    <!--歌曲列表部分-->
    <div class="bg-layer" ref="layer" />
    <scroll
      :data="songs"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      @scroll="scroll"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem" />
      </div>
      <div v-show="!songs.length" class="loading-container">
        <loading />
      </div>
    </scroll>
  </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list';
import { prefixStyle } from 'common/js/dom';
import { mapActions } from 'vuex';

// 头部高度
const RESERVED_HEIGHT = 40;
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

export default {
  props: {
    // 背景图片
    bgImage: {
      type: String,
      default: ''
    },
    // 歌曲列表
    songs: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      // 滚动的距离
      scrollY: 0,
      playFlag: true
    }
  },

  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },

  created() {
    // console.log(this.bgStyle);
    this.probeType = 3;
    this.listenScroll = true;
  },

  mounted() {
    // console.log(this.$refs.bgImage.clientHeight);
    // 图片高度，不同屏幕下高度不一样
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
    // console.log(this.minTranslateY);
  },

  methods: {
    // 返回上一级路由
    back() {
      this.$router.back();
    },

    scroll(pos) {
      this.scrollY = pos.y;
    },

    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },

    ...mapActions([
      'selectPlay'
    ])
  },

  watch: {
    // 监听scrollY的值
    scrollY(newVal) {
      // console.log(newVal);
      let translateY = Math.max(this.minTranslateY, newVal);
      let zIndex = 0;
      let scale = 1;
      let blur = 0;
      let percent = Math.abs(newVal / this.minTranslateY);
      if (newVal > 0) {
        scale = 1 + percent;
      } else {
        blur = Math.min(20, percent * 20);
      }
      this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`;
      if (newVal < this.minTranslateY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        // this.$refs.playBtn.style.display = 'none';
        this.playFlag = false;
      } else {
        zIndex = 0;
        this.$refs.bgImage.style.paddingTop = '70%';
        this.$refs.bgImage.style.height = 0;
        // this.$refs.playBtn.style.display = '';
        this.playFlag = true;
      }
      this.$refs.bgImage.style.zIndex = zIndex;
      this.$refs.bgImage.style[transform] = `scale(${scale})`;
    }
  },

  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
