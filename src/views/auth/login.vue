<template>
  <div
    class="flex flex-col lg:!flex-row w-full justify-between h-screen bg-[url('/login-bg.jpg')] bg-center bg-cover login-container"
  >
    <div class="h-1/4 lg:h-full lg:w-3/5 flex flex-col justify-center items-center border-r-2">
      <h2 class="text-base-content text-shadow-base-content text-shadow-sm text-2xl font-bold">
        Li-Admin 后台管理系统
      </h2>
      <AuthFooter class="hidden lg:!block" />
    </div>
    <div class="px-3 flex-1 flex flex-col justify-center items-center">
      <Form
        v-model="form"
        ref="formRef"
        :schema="schema"
        class="w-full lg:w-2/3 bg-base-200 px-8 py-2 rounded-xl"
        align="vertical"
        label-width="80px"
      >
        <FormItem class="text-center font-bold font-mono"> 登录表单 </FormItem>
        <FormItem label="email" name="email">
          <TextInput v-model="form.email" />
        </FormItem>
        <FormItem label="password" name="password">
          <TextInput v-model="form.password" type="password" />
        </FormItem>
        <FormItem>
          <button class="btn btn-primary w-full" type="button" @click="handleLogin">登录</button>
          <div class="flex w-full justify-between mt-2">
            <small class="link link-warning" @click="handleResetPwd">忘记密码？</small>
            <small class="link link-primary" @click="handleRegister">注册</small>
          </div>
        </FormItem>
      </Form>
      <AuthFooter class="lg:hidden" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, TextInput, useYup, type FormRef, toast } from 'li-daisy'
import { reactive } from 'vue'

import AuthFooter from './components/AuthFooter.vue'
import { ref } from 'vue'
import router from '@/router'

const form = reactive({
  email: '',
  password: '',
})

const formRef = ref<FormRef>()

const yup = useYup()

const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup
    .string()
    .required('请输入密码')
    .min(8, '密码不得少于八位')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      '密码必须包含大小写字母、数字和特殊字符',
    )
    .trim(),
  // re_password: yup
  //   .string()
  //   .required('请再次输入密码')
  //   .oneOf([yup.ref('password')], '两次密码输入不一致'),
})

const handleLogin = () => {
  formRef.value?.validate().then((status) => {
    if (status) {
      // request
      router.push('/')
      return
    }
    toast.warning('表单填写错误')
  })
}

const handleResetPwd = () => {}
const handleRegister = () => {}
</script>

<style scoped>
.login-container {
  position: relative;
}
.login-container::before {
  content: '';
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
:root.dark .login-container::before {
  display: block;
}
/* 确保所有内容在遮罩层上方 */
.login-container > * {
  position: relative;
  z-index: 2;
}
</style>
