<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs" :key="index">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    // 歌曲列表
    songs: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 歌曲排名
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {
    // 获取歌手歌曲名称信息
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },
    // 获取拍民图标样式
    getRankCls(index) {
      if (index <= 2) {
        return `icon icon${index}`;
      } else {
        return 'text';
      }
    },
    selectItem(item, index) {
      this.$emit('select', item, index);
    }
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
