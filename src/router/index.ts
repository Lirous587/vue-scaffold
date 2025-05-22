import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import { setupRouterGuards } from '@/routerGuards'
import { indexPage, loginByEmail, loginByGithubPage, loginPage } from './const'
import { githubLogin } from '@/api/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: indexPage,
      component: IndexPage,
      meta: { layout: 'DefaultLayout' },
    },
    {
      path: '/login',
      name: loginPage,
      component: () => import('../pages/login/index.vue'),
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/login/github',
      name: loginByGithubPage,
      component: () => import('../pages/login/github.vue'),
      meta: { layout: 'AuthLayout' },
    },
    {
      path: '/login/email',
      name: loginByEmail,
      component: () => import('../pages/login/email.vue'),
      meta: { layout: 'AuthLayout' },
    },
  ],
})

setupRouterGuards(router)

export default router
