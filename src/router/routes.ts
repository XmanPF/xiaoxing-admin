// +---------------------------------
// | 本地路由表
// +---------------------------------

import type { RouteObjectType } from '@/router/types';

export const DEFAULT_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';

const routes: RouteObjectType[] = [
  {
    path: DEFAULT_ROUTE,
    key: 'root',
    name: 'Root',
    component: '/layouts',
    children: [
      {
        key: 'index',
        index: true,
        name: 'Home',
        fullPath: '/',
        hideInMenu: true,
        redirect: '/settings',
      },
      {
        name: '用户管理',
        key: 'pages.user',
        icon: 'contacts-tones',
        path: 'user',
        children: [
          {
            name: '用户管理列表',
            key: 'pages.user.list',
            path: 'list',
            fullPath: '/user/list',
            component: '/pages/user/list',
          },
        ],
      },
      {
        name: '业务管理',
        key: 'pages.settings',
        icon: 'gear-2-tones',
        path: 'settings',
        children: [
          {
            key: 'pages.settings.account',
            name: '业务操作',
            path: 'account',
            fullPath: '/settings/account',
            component: '/pages/settings/account',
          },
        ],
      },

    ],
  },

  {
    key: 'auth',
    component: '/layouts/auth',
    hideInMenu: true,
    children: [
      {
        path: LOGIN_ROUTE,
        key: 'auth.login',
        component: '/pages/auth/login',
      },
      {
        path: SIGNUP_ROUTE,
        key: 'auth.signup',
        component: '/pages/auth/signup',
      },
      {
        path: '/forgot-password',
        key: 'auth.forgot-password',
        component: '/pages/auth/forgot-password',
      },
    ],
  },
  {
    key: 'exception',
    component: '/layouts/frame',
    hideInMenu: true,
    children: [
      {
        path: 'error',
        key: 'exception.error',
        component: '/pages/exception/500',
      },
      {
        path: 'forbidden',
        key: 'exception.forbidden',
        component: '/pages/exception/403',
      },
      {
        path: '*',
        key: 'exception.not-found',
        component: '/pages/exception/404',
      },
    ],
  },
];

export default routes;
