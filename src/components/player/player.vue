<template>
  <div v-show="playlist.length" class="player">
    <!--全屏播放-->
    <transition
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
      name="normal"
    >
      <div v-show="fullScreen" class="normal-player">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" />
        </div>
        <div class="top">
          <div @click="back" class="back">
            <i class="icon-back" />
          </div>
          <h1 v-html="currentSong.name" class="title" />
          <h2 v-html="currentSong.singer" class="subtitle" />
        </div>
        <div class="middle" ref="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric" />
            </div>
            <div class="lyric-wrapper" />
           </div>
        </div>
        <!--底部按钮操作-->
        <div class="bottom">
          <div class="dot-wrapper">
          </div>
          <div class="progress-wrapper">
            <span class="time time-l" />
            <div class="progress-bar-wrapper" />
            <div class="time time-r" />
          </div>
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-prev" />
            </div>
            <div class="icon i-center">
              <i class="needsclick" />
            </div>
            <div class="icon i-right">
              <i class="icon-next" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--小屏播放-->
    <transition name="mini" ref="mini">
      <div
        v-show="!fullScreen"
        @click="open"
        ref="miniPlayer"
        class="mini-player"
      >
        <div class="icon" ref="miniIcon">
          <div class="imgWrapper">
            <img width="40" height="40" :src="currentSong.image" />
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name" />
          <p class="desc" v-html="currentSong.singer" />
        </div>
        <div class="control">
          <i class="icon-playlist" />
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import animations from 'create-keyframe-animation';
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');

export default {
  watch: {
    currentSong(newVal) {
      this.$nextTick(() => {
        this.$refs.audio.play();
      })
    }
  },

  data () {
    return {};
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

  mounted() {
    console.log(this.currentSong);
    // console.log(window.getComputedStyle(this.$refs.miniIcon).width);
    // console.log(window.getComputedStyle(this.$refs.miniIcon).paddingLeft);
    // console.log(window.getComputedStyle(this.$refs.middle).top);
    // console.log(((parseInt(window.getComputedStyle(this.$refs.miniPlayer).height) - parseInt(window.getComputedStyle(this.$refs.miniIcon).height))) / 2);
  },

  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCEREEN'
    }),
    // 返回操作
    back() {
      this.setFullScreen(false);
    },

    // 设置全屏播放
    open() {
      this.setFullScreen(true);
    },

    // 动画设置
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
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
      };
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      });
      animations.runAnimation(this.$refs.cdWrapper, 'move', done);
    },

    afterEnter() {
      // 动画完成后清空动画
      animations.unregisterAnimation('move');
      this.$refs.cdWrapper.style.animation = '';
    },

    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.4s';
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
      const timer = setTimeout(done, 400);
      this.$refs.cdWrapper.addEventListener('transitioned', () => {
        clearTimeout(timer);
      });
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
    }
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
