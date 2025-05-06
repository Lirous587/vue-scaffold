import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: { layout: 'DefaultLayout' },
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login.vue'),
      meta: { layout: 'AuthLayout' },
    },
  ],
})

export default router
