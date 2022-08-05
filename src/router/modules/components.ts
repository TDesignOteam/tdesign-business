import {
  ViewModuleIcon,
  Edit1Icon,
  LayersIcon,
  InternetIcon,
  DashboardIcon,
  BrowseIcon,
  CreditcardIcon,
  RootListIcon,
  ViewListIcon,
  UsergroupIcon,
  UserIcon,
  NotificationIcon,
  FilePasteIcon
} from 'tdesign-icons-vue';
import Layout from '@/layouts';

export default [
  {
    path: '/list',
    name: 'list',
    component: Layout,
    redirect: '/list/base',
    meta: { title: '列表页', icon: ViewModuleIcon },
    children: [
      {
        path: 'base',
        name: 'ListBase',
        component: () => import('@/pages/index/views/list/base/index.vue'),
        meta: { title: '基础列表' },
      },
      {
        path: 'card-form',
        name: 'CardForm',
        component: () => import('@/pages/index/views/card-form/index.vue'),
        meta: { title: '卡片列表' },
      },
      {
        path: 'tree',
        name: 'ListTree',
        component: () => import('@/pages/index/views/list/tree/index.vue'),
        meta: { title: '树状列表' },
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    component: Layout,
    redirect: '/form/base',
    meta: { title: '表单页', icon: Edit1Icon },
    children: [
      {
        path: 'base',
        name: 'FormBase',
        component: () => import('@/pages/index/views/form/base/index.vue'),
        meta: { title: '基础表单' },
      },
      {
        path: 'step',
        name: 'FormStep',
        component: () => import('@/pages/index/views/form/step/index.vue'),
        meta: { title: '分步表单' },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Layout,
    redirect: '/result/success',
    meta: { title: '结果页', icon: 'check-circle' },
    children: [
      {
        path: 'success',
        name: 'ResultSuccess',
        component: () => import('@/pages/index/views/result/success/index.vue'),
        meta: { title: '成功页' },
      },
      {
        path: 'fail',
        name: 'ResultFail',
        component: () => import('@/pages/index/views/result/fail/index.vue'),
        meta: { title: '失败页' },
      },
      {
        path: 'network-error',
        name: 'ResultNetworkError',
        component: () => import('@/pages/index/views/result/network-error/index.vue'),
        meta: { title: '网络异常' },
      },
      {
        path: '403',
        name: 'Result403',
        component: () => import('@/pages/index/views/result/403/index.vue'),
        meta: { title: '无权限' },
      },
      {
        path: '404',
        name: 'Result404',
        component: () => import('@/pages/index/views/result/404/index.vue'),
        meta: { title: '访问页面不存在页' },
      },
      {
        path: '500',
        name: 'Result500',
        component: () => import('@/pages/index/views/result/500/index.vue'),
        meta: { title: '服务器出错页' },
      },
      {
        path: 'browser-incompatible',
        name: 'ResultBrowserIncompatible',
        component: () => import('@/pages/index/views/result/browser-incompatible/index.vue'),
        meta: { title: '浏览器不兼容页' },
      },
      {
        path: 'maintenance',
        name: 'ResultMaintenance',
        component: () => import('@/pages/index/views/result/maintenance/index.vue'),
        meta: { title: '系统维护页' },
      },
    ],
  },
];
