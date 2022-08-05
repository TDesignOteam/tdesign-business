import {
  BrowseIcon,
  CreditcardIcon,
  DashboardIcon,
  FilePasteIcon,
  InternetIcon, NotificationIcon,
  RootListIcon,
  UsergroupIcon, UserIcon, ViewModuleIcon
} from 'tdesign-icons-vue';
import Layout from '@/layouts';

export default [
  {
    path: '/industry',
    name: 'Industry',
    component: Layout,
    redirect: '/industry/map-overview',
    meta: { title: '行业菜单', icon: InternetIcon },
    children: [
      {
        path: 'map-overview',
        name: 'MapOverview',
        component: () => import('@/pages/index/views/map-overview/index.vue'),
        meta: { title: '地图概括', icon: InternetIcon },
      },
      {
        path: 'operation-operation',
        name: 'OperationEfficacy',
        component: () => import('@/pages/index/views/operation-efficacy/index.vue'),
        meta: { title: '运营效能', icon: DashboardIcon },
      },
      {
        path: 'monitor-management',
        name: 'MonitorManagement',
        component: () => import('@/pages/index/views/monitor-manage/index.vue'),
        meta: { title: '监控管理', icon: BrowseIcon },
      },
      {
        path: 'card-form',
        name: 'CardForm',
        component: () => import('@/pages/index/views/card-form/index.vue'),
        meta: { title: '项目卡片', icon: CreditcardIcon },
      },
      {
        path: 'log-query',
        name: 'Log-Query',
        component: () => import('@/pages/index/views/log-query/index.vue'),
        meta: { title: '日志查询', icon: FilePasteIcon },
      },
      {
        path: 'form-stap',
        name: 'FormStep',
        component: () => import('@/pages/index/views/form/step/index.vue'),
        meta: { title: '分步表单', icon: RootListIcon },
      },
      {
        path: 'member-group',
        name: 'MemberGroup',
        component: () => import('@/pages/index/views/member-group/index.vue'),
        meta: { title: '用户分组', icon: UsergroupIcon },
      },
      {
        path: 'role-permissions',
        name: 'Role-Permissions',
        component: () => import('@/pages/index/views/role-permissions/index.vue'),
        meta: { title: '角色权限', icon: UserIcon },
      },
      {
        path: 'station-message',
        name: 'Station-Message',
        component: () => import('@/pages/index/views/station-message/index.vue'),
        meta: { title: '站内信', icon: NotificationIcon },
      },
    ],
  },
  {
    path: '/business-component',
    name: 'BusinessComponent',
    component: Layout,
    redirect: '/business-component/select-dialog',
    meta: { title: '组件菜单', icon: ViewModuleIcon },
    children: [
      {
        path: 'select-dialog',
        name: 'SelectDialog',
        component: () => import('@/pages/index/views/select-dialog/index.vue'),
        meta: { title: '选择器' },
      },
    ],
  },
  // {
  //   path: '/dashboard',
  //   component: Layout,
  //   redirect: '/dashboard/base',
  //   name: 'dashboard',
  //   meta: {
  //     title: '仪表盘',
  //     icon: DashboardIcon,
  //   },
  //   children: [
  //     {
  //       path: 'base',
  //       name: 'DashboardBase',
  //       component: () => import('@/pages/index/views/dashboard/base/index.vue'),
  //       meta: { title: '概览仪表盘' },
  //     },
  //     {
  //       path: 'detail',
  //       name: 'DashboardDetail',
  //       component: () => import('@/pages/index/views/dashboard/detail/index.vue'),
  //       meta: { title: '统计报表' },
  //     },
  //   ],
  // },
];
