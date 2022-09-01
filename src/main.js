// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import fastclick from 'fastclick';
import PluginRem from 'lib/vueRemPlugins.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css';
import MintUI from 'mint-ui';
import router from './router';
// import VueLazyload from 'vue-lazyload';
import App from './App';
import store from './store';
// import apolloProvider from './libs/graphql';

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(PluginRem);

Vue.use(ElementUI);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // 像 vue-router 或 vuex 一样注入 apolloProvider
  // apolloProvider,
  components: { App },
  template: '<App/>',
})
