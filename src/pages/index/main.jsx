import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import TDesign from 'tdesign-vue';
import Aegis from 'aegis-web-sdk';
import VueClipboard from 'vue-clipboard2';
import zhConfig from 'tdesign-vue/es/locale/zh_CN';
import axiosInstance from '@/utils/request';
import App from './App.vue';
import router from '@/router';
import'@wecity/tdesign-gov-vue/dist/index.css';
import { getPageContentHeight, getFirstLevelTableHeight } from '@/utils/height';


// import enConfig from 'tdesign-vue/es/locale/en_US'; // 英文多语言配置

import 'tdesign-vue/es/style/index.css';
import '@/style/index.less';

import '@/permission';
import store from '@/store';
// Aegis初始化
// eslint-disable-next-line no-prototype-builtins
if (window.STATIC_ENV_CONFIG.hasOwnProperty('VUE_APP_RUM_ID')) {
  const aegis = new Aegis({
    id: window.STATIC_ENV_CONFIG.VUE_APP_RUM_ID, // 上报 id
    reportApiSpeed: true, // 接口测速
    reportAssetSpeed: true, // 静态资源测速
    // spa 应用页面跳转的时候开启 pv 计算
    spa: true,
    // 上报接口错误详情
    api: {
      apiDetail: true,
    },
    // 测速不抽样，api监控数据的来源，关闭之后才能跟日志数据一致
    speedSample: false,
  });
  // vue错误上报
  Vue.config.errorHandler = function (err, vm, info) {
    console.log(`Error: ${err.toString()}\nInfo: ${info}`);
    aegis.error(`Error: ${err.toString()}\nInfo: ${info}`);
  };
  window.runAegis = aegis;
  Vue.prototype.$aegis = aegis;
}
Vue.use(VueRouter);
Vue.use(TDesign);
Vue.use(VueClipboard);

Vue.component('t-page-header');

Vue.prototype.$request = axiosInstance;

Vue.prototype.$getPageContentHeight = getPageContentHeight;
Vue.prototype.$getFirstLevelTableHeight = getFirstLevelTableHeight;

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};

const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};

Vue.config.productionTip = false;
sync(store, router);
new Vue({
  router,
  store,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (h) => (
    <div  class="tdgv-wrapper">
      {/* 可以通过config-provider提供全局（多语言、全局属性）配置，如
      <t-config-provider globalConfig={enConfig}> */}
      <t-config-provider globalConfig={zhConfig}>
        <App />
      </t-config-provider>
    </div>
  ),
}).$mount('#app');
