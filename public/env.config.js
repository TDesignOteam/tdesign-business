
try {
/**
* 前端运行时配置 */
  window.STATIC_ENV_CONFIG = {
 // 前端路由前缀，末尾不能带"/"
    "ROUTER_PREFIX": "/dev",
 // api资源路由前缀，末尾不能带"/"
    "API_PREFIX": "/dev/api",
 // 资源路由前缀，末尾不能带"/"
    "RESOURCE_PREFIX": "/dev",
 // axios实例默认超时时间，单位ms
    "VUE_APP_API_TIMEOUT": "15000",
    "VUE_APP_ENV": "dev",
    "VUE_APP_MODEL": "local",
    "VUE_APP_DEV_SERVER_PORT": "9001",
    "VUE_APP_RUM_ID": "PJ37jT1pQJmPPl6pYy"
};
  document.STATIC_ENV_CONFIG = window.STATIC_ENV_CONFIG;
} catch (error) {
  console.error(error.message);
}