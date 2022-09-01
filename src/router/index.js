import Vue from 'vue';
import Router from 'vue-router';

import ComponentDemo from '@/components/ComponentDemo/index.vue';
import VueCode from '@/components/VueCode/index.vue';
import VueCodeRender from '@/components/VueCode/render.vue';
import ElemSearch from '@/components/ElemSearch/index.vue';

//  注册组件
Vue.use(Router);

const Recommend = () => import('@/components/recommend/recommend');
const Search = () => import('@/components/search/search');
const UserCenter = () => import('@/components/user-center/user-center');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/component-demo',
    },
    {
      path: '/component-demo',
      component: ComponentDemo,
    },
    {
      path: '/vue-code',
      component: VueCode,
      // children: [{
      //   path: 'render',
      //   component: VueCodeRender,
      // }],
    },
    {
      path: '/render',
      component: VueCodeRender,
    },
    {
      path: '/js-code',
      component: Recommend,
    },
    {
      path: '/elem-search',
      component: ElemSearch,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/user',
      component: UserCenter,
    },
  ],
})
