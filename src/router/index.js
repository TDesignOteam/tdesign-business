import VueRouter from 'vue-router';

// import baseRouters from './modules/base';
import componentsRouters from './modules/components';
// import othersRouters from './modules/others';

// 存放动态路由
// export const asyncRouterList = [...baseRouters, ...componentsRouters, ...othersRouters];
export const asyncRouterList = [ ...componentsRouters];

// 存放固定的路由
const defaultRouterList = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('@/pages/login/views/index.vue'),
  // },
  {
    path: '*',
    redirect: '/result/success',
  },
  ...asyncRouterList,
];

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: defaultRouterList,
    base:`${window.STATIC_ENV_CONFIG.ROUTER_PREFIX}/`,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
