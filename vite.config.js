import { loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { createVuePlugin } from 'vite-plugin-vue2';
import { createSvgPlugin } from 'vite-plugin-vue2-svg';
import htmlTemplate from 'vite-plugin-html-template';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import env from './cli-config/env.mode.config';
import mpa from './cli-config/vite-plugin-mpa';
import { multiPage } from './cli-config/mpa.config';
import setStaticEnvConfig from './cli-config/env.static.config';
import path from 'path';

const CWD = process.cwd();

export default ({ mode }) => {
  Object.assign(process.env,env(mode))
  setStaticEnvConfig();
  const { VUE_APP_CDN_PATH,VUE_APP_DEV_SERVER_PORT,VUE_APP_PROTOCOL_HTTPS,VUE_APP_ROUTER_BASE } = loadEnv(mode, CWD,'VUE_APP_');
  const { pages } = multiPage(mode);
  return {
    base: VUE_APP_CDN_PATH || '/',
    publicDir: path.resolve(__dirname, 'public'),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {},
        },
      },
    },

    plugins: [
      createVuePlugin({
        jsx: true,
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: true,
      }),
      createSvgPlugin(),
      mpa({
        open: VUE_APP_ROUTER_BASE,
        scanFile: 'main.jsx',
        scanDir: 'src/pages',
        filename: 'index.html',
      }),
      htmlTemplate({
        // 多页入口目录
        pagesDir: 'src/pages',
        // 页面入口数组
        pages,
        // 注入到模板中的变量配置
        data: {
          VUE_APP_CDN_PATH: '',
        },
      }),
      monacoEditorPlugin(
        {
          publicPath: 'https://static.govcloud.gtimg.com/static',
        }
      ),
    ],

    build: {
      cssCodeSplit: false,
      assetsDir: 'assets_res',
    },
    envPrefix: ['VUE_APP_', 'VITE_'],

    server: {
      host: '0.0.0.0',
      port: VUE_APP_DEV_SERVER_PORT||3001,
      https: VUE_APP_PROTOCOL_HTTPS === 'true',
      base: VUE_APP_ROUTER_BASE||'/',
      proxy: {
        '/api': {
          // 用于开发环境下的转发请求
          // 更多请参考：https://vitejs.dev/config/#server-proxy
          target: 'https://service-exndqyuk-1257786608.gz.apigw.tencentcs.com',
          changeOrigin: true,
        },
      },
    },
  };
};
