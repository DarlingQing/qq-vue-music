// import axios from 'axios';
import { getRecommend } from '../api/recommend';

function pageModule() {
  return {
    namespaced: true,

    state: {
      recommendData: [],
    },

    mutations: {
      setRecommendData(state, data) {
        state.recommendData = data.slider;
      },
    },

    actions: {
      // 获取推荐数据
      async getRecommendInfo({commit}) {
        const { data } = await getRecommend();
        commit('setRecommendData', data);
      },
    },
  }
};

export default pageModule;
