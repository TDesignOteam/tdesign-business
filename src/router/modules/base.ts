import { DashboardIcon } from 'tdesign-icons-vue';
import Layout from '@/layouts';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: '仪表盘',
      icon: DashboardIcon,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/index/views/dashboard/base/index.vue'),
        meta: { title: '概览仪表盘' },
      },
      {
        path: 'detail',
        name: 'DashboardDetail',
        component: () => import('@/pages/index/views/dashboard/detail/index.vue'),
        meta: { title: '统计报表' },
      },
    ],
  },
];
