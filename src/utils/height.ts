// 获取浏览器窗口高度
export const getClientHeight = () => {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
};

// 获取页面内容高度
export const getPageContentHeight = (hasPageHeader = true, extraHeight = 0) => {
  const windowHeight = getClientHeight();
  // const header = 57;
  const footer = 36;
  const pageHeader = hasPageHeader ? 64 : 0;
  const margin = 40;
  const result = windowHeight - pageHeader - margin - extraHeight - footer;
  // console.log('getPageContentHeight', result);
  return result > 300 ? result : 300;
};

// 获取一级页面表格高度
export const getFirstLevelTableHeight = (options) => {
  const config = options || {};
  const padding = 26;
  const pagination = 60;
  const condition = 48;
  const title = 44;
  const minHeight = 200;
  const tableExtra = 24;
  let firstLevelPageHeight = getPageContentHeight() - padding - tableExtra;
  if (config.hasPagination !== false) {
    firstLevelPageHeight -= pagination;
  }
  if (config.hasCondition !== false) {
    firstLevelPageHeight -= condition;
  }
  if (config.hastitle !== false) {
    firstLevelPageHeight -= title;
  }
  if (config.extraHeight && typeof config.extraHeight === 'number') {
    firstLevelPageHeight -= config.extraHeight;
  }
  // console.log('firstLevelPageHeight', firstLevelPageHeight);
  return firstLevelPageHeight > minHeight ? firstLevelPageHeight : minHeight;
};
