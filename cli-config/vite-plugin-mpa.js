import vitePluginMpa from 'vite-plugin-mpa';
import history from 'connect-history-api-fallback';
import { multiPage, setCommonReg } from './mpa.config';

const { pages } = multiPage(process.env.NODE_ENV);

function getHistoryReWriteRuleList(options, config) {
  const { scanDir, filename } = options;
  const list = [];
  const { server: configServer } = config;
  const prefix = `${configServer.base}/`;
  Object.keys(pages).forEach((pageName) => {
    const to = `${prefix}${scanDir}/${pageName}/${filename}`;
    const fromPrefix = `${configServer.base}/${pageName}`;
    // handle html5 history mode fallback
    list.splice(0, 0, ...setCommonReg(fromPrefix, to));
  });
  // 根目录路由
  list.push({
    from: new RegExp(`(^${configServer.base}/$)|(${configServer.base}/)`),
    to: `${prefix}${scanDir}/index/${filename}`,
  });
  return list;
}

// export function

export default function (userOptions) {
  const options = {
    open: '',
    scanDir: 'src/pages',
    scanFile: 'main.{js,ts,jsx,tsx}',
    defaultEntries: '',
    filename: 'index.html',
    ...userOptions,
  };
  return {
    ...vitePluginMpa(userOptions),
    configureServer({ middlewares: app, config }) {
      app.use(
        history({
          disableDotRule: undefined,
          htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          rewrites: getHistoryReWriteRuleList(options, config),
        }),
      );
    },
  };
}
