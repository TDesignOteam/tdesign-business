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
    path: '/map-overview',
    name: 'MapOverview',
    component: Layout,
    redirect: '/map-overview',
    meta: { title: '地图概括', icon: InternetIcon },
    children: [
      {
        path: '/',
        name: 'overview',
        component: () => import('@/pages/index/views/map-overview/index.vue'),
      },
    ],
  },
  {
    path: '/operational-efficiency',
    name: 'OperationalEfficiency',
    component: Layout,
    redirect: '/operational-efficiency',
    meta: { title: '运营效能', icon: DashboardIcon },
    children: [
      {
        path: '/',
        name: 'efficiency',
        component: () => import('@/pages/index/views/operation-efficacy/index.vue'),
      },
    ],
  },
  {
    path: '/monitor-management',
    name: 'MonitorManagement',
    component: Layout,
    redirect: '/monitor-management',
    meta: { title: '监控管理', icon: BrowseIcon },
    children: [
      {
        path: '/',
        name: 'management',
        component: () => import('@/pages/index/views/monitor-manage/index.vue'),
      },
    ],
  },
  {
    path: '/card-form',
    name: 'CardForm',
    component: Layout,
    redirect: '/card-form',
    meta: { title: '卡片表单', icon: CreditcardIcon },
    children: [
      {
        path: '/',
        name: 'Form',
        component: () => import('@/pages/index/views/card-form/index.vue'),
      },
    ],
  },
  {
    path: '/form-stap',
    name: 'FormStep',
    component: Layout,
    meta: { title: '分步表单', icon: RootListIcon },
    children: [
      {
        path: '/',
        name: 'Step',
        component: () => import('@/pages/index/views/form/step/index.vue'),
      },
    ],
  },
  {
    path: '/list-tree',
    name: 'ListTree',
    component: Layout,
    meta: { title: '树状列表', icon: ViewListIcon },
    children: [
      {
        path: '/',
        name: 'Step',
        component: () => import('@/pages/index/views/list/tree/index.vue'),
      },
    ],
  },
  {
    path: '/member-group',
    name: 'MemberGroup',
    component: Layout,
    meta: { title: '成员分组', icon: UsergroupIcon },
    children: [
      {
        path: '/',
        name: 'group',
        component: () => import('@/pages/index/views/member-group/index.vue'),
      },
    ],
  },
  {
    path: '/role-permissions',
    name: 'Role-Permissions',
    component: Layout,
    meta: { title: '角色权限', icon: UserIcon },
    children: [
      {
        path: '/',
        name: 'permissions',
        component: () => import('@/pages/index/views/role-permissions/index.vue'),
      },
    ],
  },
  {
    path: '/station-message',
    name: 'Station-Message',
    component: Layout,
    meta: { title: '站内信', icon: NotificationIcon },
    children: [
      {
        path: '/',
        name: 'message',
        component: () => import('@/pages/index/views/station-message/index.vue'),
      },
    ],
  },
  {
    path: '/log-query',
    name: 'Log-Query',
    component: Layout,
    meta: { title: '日志查询', icon: FilePasteIcon },
    children: [
      {
        path: '/',
        name: 'query',
        component: () => import('@/pages/index/views/log-query/index.vue'),
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
