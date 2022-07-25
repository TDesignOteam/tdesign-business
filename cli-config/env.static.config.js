const fs = require('fs');
const path = require('path');

const setStaticEnvConfig = () => {
  const notes = [
    ' // 前端路由前缀，末尾不能带"/"',
    ' // api资源路由前缀，末尾不能带"/"',
    ' // 资源路由前缀，末尾不能带"/"',
    ' // axios实例默认超时时间，单位ms',
  ];
  const filterKeys = ['VUE_APP_ROUTER_BASE', 'VUE_APP_API_BASE_URL', 'VUE_APP_CDN_PATH'];
  const vueAppEnv = {};
  Object.keys(process.env).forEach((key) => {
    if (key.indexOf('VUE_APP_') > -1 && !filterKeys.includes(key)) {
      vueAppEnv[key] = process.env[key];
    }
  });
  const staticEnvConfig = {
    // 前端路由前缀，末尾不能带"/"
    ROUTER_PREFIX: process.env.VUE_APP_ROUTER_BASE || '', // api资源路由前缀，末尾不能带"/"

    API_PREFIX: process.env.VUE_APP_API_BASE_URL || '', // 资源路由前缀，末尾不能带"/"
    RESOURCE_PREFIX: process.env.VUE_APP_CDN_PATH || '', // axios实例默认超时时间，单位ms
    VUE_APP_API_TIMEOUT: '15000',
    ...vueAppEnv,
  };
  const staticEnvConfigStr = JSON.stringify(staticEnvConfig, null, 4);
  const strFormat = staticEnvConfigStr.split('\n');
  notes.forEach((item, index) => {
    strFormat.splice(index * 2 + 1, 0, item);
  });
  const staticEnvData = `
try {
/**
* 前端运行时配置 */
  window.STATIC_ENV_CONFIG = ${strFormat.join('\n')};
  document.STATIC_ENV_CONFIG = window.STATIC_ENV_CONFIG;
} catch (error) {
  console.error(error.message);
}`;
  // console.log(staticEnvData);
  fs.writeFileSync(path.resolve(__dirname, '../public/env.config.js'), staticEnvData, 'utf-8');
};
module.exports = setStaticEnvConfig;
