import { ViewModuleIcon, Edit1Icon, LayersIcon } from 'tdesign-icons-vue';
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
        meta: { title: '基础列表页' },
      },
      {
        path: 'card',
        name: 'ListCard',
        component: () => import('@/pages/index/views/list/card/index.vue'),
        meta: { title: '卡片列表页' },
      },
      {
        path: 'filter',
        name: 'ListFilter',
        component: () => import('@/pages/index/views/list/filter/index.vue'),
        meta: { title: '筛选列表页' },
      },
      {
        path: 'tree',
        name: 'ListTree',
        component: () => import('@/pages/index/views/list/tree/index.vue'),
        meta: { title: '树状筛选列表页' },
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
        meta: { title: '基础表单页' },
      },
      {
        path: 'step',
        name: 'FormStep',
        component: () => import('@/pages/index/views/form/step/index.vue'),
        meta: { title: '分步表单页' },
      },
    ],
  },
  {
    path: '/detail',
    name: 'detail',
    component: Layout,
    redirect: '/detail/base',
    meta: { title: '详情页', icon: LayersIcon },
    children: [
      {
        path: 'base',
        name: 'DetailBase',
        component: () => import('@/pages/index/views/detail/base/index.vue'),
        meta: { title: '基础详情页' },
      },
      {
        path: 'advanced',
        name: 'DetailAdvanced',
        component: () => import('@/pages/index/views/detail/advanced/index.vue'),
        meta: { title: '多卡片详情页' },
      },
      {
        path: 'deploy',
        name: 'DetailDeploy',
        component: () => import('@/pages/index/views/detail/deploy/index.vue'),
        meta: { title: '数据详情页' },
      },
      {
        path: 'secondary',
        name: 'DetailSecondary',
        component: () => import('@/pages/index/views/detail/secondary/index.vue'),
        meta: { title: '二级详情页' },
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
  {
    path: '/business-component',
    name: 'BusinessComponent',
    component: Layout,
    redirect: '/business-component/select-dialog',
    meta: { title: '业务组件', icon: ViewModuleIcon },
    children: [
      {
        path: 'select-dialog',
        name: 'SelectDialog',
        component: () => import('@/pages/index/views/select-dialog/index.vue'),
        meta: { title: '选择器' },
      },
    ],
  },
];
