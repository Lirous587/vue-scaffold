<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
    <div class="text-center">
      <span class="loading loading-spinner loading-lg text-primary mb-4"></span>
      <p class="text-xl font-semibold">正在通过 GitHub 授权并登录...</p>
      <p class="text-base-content/70">请稍候，这通常只需要几秒钟。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { githubLogin } from '@/api/user'
import {
  setAccessToken,
  setRefreshToken,
  getOAuthCsrfToken,
  removeOAuthCsrfToken,
} from '@/utils/auth'
import { toast } from 'li-daisy'
import { onMounted } from 'vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { homePage, loginPage } from '@/router/const'

const route = useRoute()

const router = useRouter()

const code = computed(() => route.query['code'])

const stateQueryParam = computed(() => route.query.state as string | undefined)

const togoLoginIndex = () => {
  router.push({
    name: homePage,
  })
}

const handleGithubLogin = async () => {
  if (!code.value) {
    toast.warn({
      title: '非法登录方式',
      message: '请正常登录!',
    })

    togoLoginIndex()
    return
  }

  let decodedState: { csrf?: string; redirect?: string } = {}
  let finalRedirectPath = '/' // 默认重定向路径

  if (stateQueryParam.value) {
    decodedState = JSON.parse(decodeURIComponent(stateQueryParam.value))

    // 1.CSRF Token 验证
    const csrfToken = getOAuthCsrfToken()
    // 一次性使用
    removeOAuthCsrfToken()

    if (!decodedState.csrf || decodedState.csrf !== csrfToken) {
      toast.error({
        title: '危险操作',
        message: '无效的 state 参数，可能存在 CSRF 风险。',
      })
      router.push({ name: loginPage })
      return
    }

    // 2. 获取重定向路径
    if (decodedState.redirect) {
      finalRedirectPath = decodedState.redirect
    }

    // 3. 后端交互 获取token
    await githubLogin(code.value as string)
      .then((res) => {
        const data = res
        setAccessToken(data.access_token)
        setRefreshToken(data.refresh_token)
        router.push(finalRedirectPath)
      })
      .catch((err) => {
        router.push({ name: loginPage })
        toast.error(err)
      })
  } else {
    toast.error({
      title: '危险操作',
      message: '当前登录方式不安全!',
    })
    togoLoginIndex()
    return
  }
}

onMounted(() => {
  handleGithubLogin()
})
</script>
