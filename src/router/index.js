import Vue from 'vue';
import Router from 'vue-router';

import ComponentDemo from '@/components/ComponentDemo/index.vue';
import VueCode from '@/components/VueCode/index.vue';
import VueCodeRender from '@/components/VueCode/render.vue';
// import ElemSearch from '@/components/ElemSearch/index.vue';

//  注册组件
Vue.use(Router);

const Search = () => import('@/components/search/search');

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
      path: '/search',
      component: Search,
    },
  ],
})
