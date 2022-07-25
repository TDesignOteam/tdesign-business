const { loadEnv } = require('vite');

module.exports = function (mode) {
  return {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
    ...loadEnv(mode, process.cwd(), 'VUE_APP_'),
    NODE_ENV: mode,
  };
};
