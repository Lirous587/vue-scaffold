import type { Router } from 'vue-router'

import { toast } from 'li-daisy'

import { getAccessToken, removeAccessToken } from './utils/auth'
import { validateAuth } from './api/user'
import { indexPage, loginPage } from './router/const'

const publicRoutes = ['loginIndex', 'loginEmail', 'loginGithub']

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getAccessToken()
    if (token) {
      await validateAuth().catch((error) => {
        removeAccessToken()
        toast.error(error.msg)
        next({ name: loginPage })
      })

      if (to.name === 'loginIndex' || to.name === 'loginGithub' || to.name === 'loginEmail') {
        // 如果已登录且目标是登录页，则重定向到首页或之前尝试访问的页面
        next({ name: indexPage })
      } else {
        // 正常导航到目标页面
        next()
      }
    } else {
      if (publicRoutes.includes(to.name as string) || publicRoutes.includes(to.path)) {
        // 公开路由允许访问
        next()
      } else {
        next({
          name: loginPage,
          query: { redirect: to.fullPath },
        })
      }
    }
  })

  // router.afterEach((to, from) => {})

  router.onError((error) => {
    console.log('Router error', error)
  })
}
