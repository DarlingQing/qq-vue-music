<template>
  <div class="player" v-show="playlist.length>0">
    <!--全屏播放-->
    <transition name="normal"
                @enter="enter"
                @after-enter="afterEnter"
                @leave="leave"
                @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle" ref="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
            <div class="lyric-wrapper">
            </div>
          </div>
        </div>
        <!--底部按钮操作-->
        <div class="bottom">
          <div class="dot-wrapper">
          </div>
          <div class="progress-wrapper">
            <span class="time time-l"></span>
            <div class="progress-bar-wrapper"></div>
            <div class="time time-r"></div>
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon i-center">
              <i class="needsclick"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--小屏播放-->
    <transition name="mini" ref="mini">
      <div class="mini-player" @click="open" ref="miniPlayer" v-show="!fullScreen">
        <div class="icon" ref="miniIcon">
          <div class="imgWrapper">
            <img width="40" height="40" :src="currentSong.image">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex';
import animations from 'create-keyframe-animation';
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'playlist',
      'currentSong',
      'currentIndex',
      'fullScreen',
      'playing'
    ])
  },
  created() {
  },
  mounted() {
    console.log(this.currentSong);
    console.log(window.getComputedStyle(this.$refs.miniIcon).width);
    console.log(window.getComputedStyle(this.$refs.miniIcon).paddingLeft);
    console.log(window.getComputedStyle(this.$refs.middle).top);
    console.log(((parseInt(window.getComputedStyle(this.$refs.miniPlayer).height) - parseInt(window.getComputedStyle(this.$refs.miniIcon).height))) / 2);
  },
  methods: {
    // 返回操作
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    // 动画设置
    enter(el, done) {
      const {x, y, scale} = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0, 0, 0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0, 0, 0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },
    afterEnter() {
      // 动画完成后清空动画
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      const {x, y, scale} = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      const timer = setTimeout(done, 400);
      this.$refs.cdWrapper.addEventListener('transitioned', () => {
        clearTimeout(timer);
      })
    },
    // 动画完成后清空动画
    afterLeave() {
      this.$refs.cdWrapper.style.transition = '';
      this.$refs.cdWrapper.style[transform] = '';
    },
    // 最初的坐标值
    _getPosAndScale() {
      // 小icon：miniIcon
      const targetWidth = parseInt(window.getComputedStyle(this.$refs.miniIcon).width);
      const paddingLeft = parseInt(window.getComputedStyle(this.$refs.miniIcon).paddingLeft);
      const paddingBottom = ((parseInt(window.getComputedStyle(this.$refs.miniPlayer).height) - parseInt(window.getComputedStyle(this.$refs.miniIcon).height))) / 2;
      const paddingTop = parseInt(window.getComputedStyle(this.$refs.middle).top);
      const width = window.innerWidth * 0.8;
      const scale = targetWidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom - targetWidth / 2;
      return {
        x,
        y,
        scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCEREEN'
    })
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
