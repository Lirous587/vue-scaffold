import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import { setupRouterGuards } from '@/routerGuards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/login',
      name: 'loginIndex',
      component: () => import('../pages/login/index.vue'),
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/login/github',
      name: 'loginGithub',
      component: () => import('../pages/login/github.vue'),
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/login/email',
      name: 'loginEmail',
      component: () => import('../pages/login/email.vue'),
      meta: { layout: 'AuthLayout' },
    },
  ],
})

setupRouterGuards(router)

export default router
