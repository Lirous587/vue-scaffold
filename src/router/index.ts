import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/index.vue'
import { setupRouterGuards } from '@/routerGuards'
import { homePage, loginByEmailPage, loginByGithubPage, loginPage } from './const'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: { name: homePage },
    },
    {
      path: '/home',
      name: homePage,
      component: HomePage,
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
      name: loginByEmailPage,
      component: () => import('../pages/login/email.vue'),
      meta: { layout: 'AuthLayout' },
    },
  ],
})

setupRouterGuards(router)

export default router
