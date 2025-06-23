import type { Router } from 'vue-router'

import { toast } from 'li-daisy'

import { getAccessToken, removeAccessToken } from './utils/auth'
import { validateAuth } from './api/user'

import { homePage, loginPage, loginByEmailPage, loginByGithubPage } from './router/const'

const publicRoutes = [loginPage, loginByEmailPage, loginByGithubPage]

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getAccessToken()

    // 检查是否是 404 页面（通配符路由匹配的情况）
    if (to.name === 'NotFound') {
      next()
      return
    }

    if (token) {
      await validateAuth().catch((error) => {
        removeAccessToken()
        toast.error(error.msg)
        next({ name: loginPage })
      })

      if (to.name === loginPage || to.name === loginByEmailPage || to.name === loginByGithubPage) {
        // 如果已登录且目标是登录页，则重定向到首页或之前尝试访问的页面
        next({ name: homePage })
      } else {
        // 正常导航到目标页面
        next()
      }
    } else {
      if (publicRoutes.includes(to.name as string) || publicRoutes.includes(to.path)) {
        // 公开路由允许访问
        next()
      } else {
        const redirectPath = to.fullPath !== '/' ? to.fullPath : '/home'

        next({
          name: loginPage,
          query: { redirect: redirectPath },
        })
      }
    }
  })

  // router.afterEach((to, from) => {})

  router.onError((error) => {
    console.log('Router error', error)
  })
}
