const path = require('path');
const fs = require('fs');
const glob = require('glob');

/**
 * 获取页面入口集合
 */
function getPagesEntities(pagePath) {
  const entities = {};
  glob.sync(pagePath).forEach((entity) => {
    const moduleName = entity.split('/').slice(-1);
    entities[moduleName] = entity;
  });
  // eg:
  // {
  //  apply_admin: './src/pages/admin_manage/index',
  //  test: './src/pages/test/index'
  // }
  return entities;
}

/**
 * 跳转规则
 * @param fromPrefix
 * @param to
 * @returns {[{from: RegExp, to}, {from: RegExp, to}, {from: RegExp, to}, {from: RegExp, to}, {from: RegExp, to}]}
 */
function setCommonReg(fromPrefix, to) {
  return [
    // handle html5 history mode fallback
    {
      from: new RegExp(`^${fromPrefix}/index.html/*`),
      to,
    },
    // support pageName/index.html
    {
      from: new RegExp(`^${fromPrefix}/index.html$`),
      to,
    },
    // support pageName.html, not recommended
    {
      from: new RegExp(`^${fromPrefix}.html$`),
      to,
    },
    {
      from: new RegExp(`^${fromPrefix}$`),
      to,
    },
    {
      from: new RegExp(`^${fromPrefix}/*`),
      to,
    },
  ];
}

const PAGE_PATH = path.resolve(process.cwd(), './src/pages');

const pages = getPagesEntities(`${PAGE_PATH}/*`);

module.exports = {
  multiPage: (model) => {
    const template = model === 'development' ? 'public/local.html' : 'public/index.html';
    const multiPage = {};
    const rewrites = [
      {
        from: /^.*?(?<!(\.hot-update\.json))$/,
        to: `${process.env.VUE_APP_ROUTER_BASE}/index.html`,
      },
    ];
    Object.keys(pages).forEach((page) => {
      console.log(page,template,'page');
      if (!Object.prototype.hasOwnProperty.call(pages, page)) {
        return;
      }
      const configFile = `${PAGE_PATH}/${page}/config.js`;
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const config = fs.existsSync(configFile) ? require(configFile) : {};
      const prefix = `${process.env.VUE_APP_ROUTER_BASE}/`;
      const filename = page === 'index' ? `${page}.html` : `${page}/index.html`;
      const to = `${prefix}${filename}`;
      const fromPrefix = `${process.env.VUE_APP_ROUTER_BASE}/${page}`;
      rewrites.splice(0, 0, ...setCommonReg(fromPrefix, to));
      multiPage[page] = {
        // page 的入口
        entry: `src/pages/${page}/main.jsx`,
        // 模板来源
        template,
        // 在 dist/index.html 的输出
        filename,
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: process.env.VUE_APP_NAME || 'TDesign Starter',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        chunks: ['chunk-vendors', 'chunk-common', page],
        ...config,
      };
    });
    rewrites.push({
      from: new RegExp(`(^${process.env.VUE_APP_ROUTER_BASE}/$)|(${process.env.VUE_APP_ROUTER_BASE}/)`),
      to: `${process.env.VUE_APP_ROUTER_BASE}/index.html`,
    });
    return {
      pages: multiPage,
      rewrites,
    };
  },
  setCommonReg,
};
