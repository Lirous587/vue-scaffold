<template>
  <div class="flex flex-col w-full items-center h-screen px-8 py-3">
    <header class="text-xl flex items-center justify-between w-full h-[72px]">
      <div class="tooltip tooltip-right" data-tip="源码">
        <a href="https://github.com/Lirous587/vue-admin" target="_blank">
          <IconGithub />
        </a>
      </div>

      <RouterLink to="/signup" class="btn btn-sm btn-outline flex items-center justify-center"
        >注册</RouterLink
      >
    </header>
    <main class="flex-1 flex flex-col justify-center items-center gap-y-6 px-5">
      <h2 class="text-xl font-bold font-mono">Log in to Li-Admin</h2>

      <a
        :href="`https://github.com/login/oauth/authorize?client_id=${gitub_login_config.client_id}&redirect_uri=${gitub_login_config.redirect_uri}`"
        class="btn btn-primary btn-outline w-[320px] flex items-center justify-center"
      >
        <IconGithub />
        使用GitHub登录
      </a>

      <div class="w-[320px] h-[1px] bg-base-300 my-2"></div>

      <RouterLink to="/login/email" class="hover:link link-info">使用邮箱登录 &rarr;</RouterLink>
    </main>

    <div class="h-[72px] w-full flex justify-end items-center">
      <a class="link link-primary" href="https://Lirous.com" target="_blank">blog </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gitub_login_config } from '@/config'
import IconGithub from '@/components/Icon/github.vue'
</script>
