import { playMode } from 'common/js/config';

const state = {
  // 歌手
  singer: {},
  // 是否播放
  palying: false,
  // 是否全凭
  fullScreen: false,
  // 歌曲列表
  playlist: [],
  // 顺序列表
  sequenceList: [],
  // 播放模式
  mode: playMode.sequence,
  // 播放歌曲索引
  currentIndex: -1
}

export default state;
