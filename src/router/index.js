import Vue from 'vue';
import Router from 'vue-router';
//  注册组件
Vue.use(Router);

const Recommend = () => import('components/recommend/recommend');
const Singer = () => import('components/singer/singer');
const SingerDetail = () => import('components/singer-detail/singer-detail');
const Rank = () => import('components/rank/rank');
const Search = () => import('components/search/search');
const UserCenter = () => import('components/user-center/user-center');

// import HelloWorld from '@/components/HelloWorld'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
