import Layout from '@/layout/Layout.vue'

export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/profile-setup',
    meta: { title: '首页', keepAlive: true },
    children: [
      {
        path: '/home',
        name: 'HomeView',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'wap-home-o',
          keepAlive: true,
          tabShow: true,
          show: true,
        },
      },
      {
        path: '/center',
        name: 'CenterView',
        component: () => import('@/views/center/index.vue'),
        meta: {
          title: '关于',
          icon: 'user-o',
          keepAlive: true,
          tabShow: true,
          show: true,
        },
      },
    ],
  },
  {
    path: '/vue',
    name: 'VueView',
    component: () => import('@/views/vue/index.vue'),
    meta: { title: 'Vue', icon: '' },
  },
  {
    path: '/profile-setup',
    name: 'profileSetup',
    component: () => import('@/views/profile-setup/index.vue'),
    meta: { title: '资料填写', icon: '', keepAlive: true },
  },
  {
    path: '/chatbot',
    name: 'chatbot',
    component: () => import('@/views/chatbot/index.vue'),
    meta: { title: 'AI', icon: '', keepAlive: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error-page/NotFound.vue'),
  },
]
