<template>
  <div class="song-list">
    <ul>
      <li
        v-for="(song, index) in songs"
        :key="index"
        @click="selectItem(song, index)"
        class="item"
      >
        <div
          v-show="rank"
          class="rank"
        >
          <span :class="getRankCls(index)" />
        </div>
        <div class="content">
          <h2 class="name">{{ song.name }}</h2>
          <p class="desc">{{ getDesc(song) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },

  props: {
    // 歌曲列表
    songs: {
      type: Array,
      default: () => {
        return [];
      }
    },

    // 歌曲排名
    rank: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    // 获取歌手歌曲名称信息
    getDesc(song) {
      return `${song.singer}·${song.album}`
    },

    // 获取拍民图标样式
    getRankCls(index) {
      return index <= 2 ? `icon icon${index}` : 'text';
    },

    selectItem(item, index) {
      this.$emit('select', item, index);
    }
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
