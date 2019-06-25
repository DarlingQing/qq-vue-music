import * as types from './mutation-types';

const mutations = {
  // 设置歌手
  [types.SET_SINGER](state, singer) {
    state.singer = singer;
  },
  // 是否播放操作
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag;
  },
  // 是否全屏操作
  [types.SET_FULLSCEREEN](state, flag) {
    state.fullScreen = flag;
  },
  // 设置播放列表
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  // 设置播放顺序列表
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  // 设置播放模式
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  // 切换播放索引
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  }
}

export default mutations;
