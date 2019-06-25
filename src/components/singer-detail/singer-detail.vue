<template>
  <transition name="slide" :appear="true">
    <music-list :bg-image="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getSingerDetail} from 'api/singer';
import {ERR_OK} from 'api/config';
import {createSong, isValidMusic, processSongsUrl} from 'common/js/song';
import {mapGetters} from 'vuex';
export default {
  computed: {
    // 标题
    title() {
      return this.singer.name
    },
    // 背景图片
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    // 获取歌手详情
    this._getDetail();
  },
  mounted() {
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs) => {
            this.songs = songs
          })
          console.log(this.songs);
        }
      })
    },
    // 过滤数据，得到想到的歌手列表信息
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((item) => {
        let {musicData} = item;
        if (isValidMusic(musicData)) {
          ret.push(createSong(musicData))
        }
      })
      return ret;
    }
  },
  components: {
    MusicList
  }
}
</script>
<style lang="stylus" src="./assets/index.styl" scoped></style>
