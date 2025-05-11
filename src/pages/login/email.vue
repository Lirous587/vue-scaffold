<template>
  <div class="flex flex-col w-full h-screen justify-center items-center px-8 py-3 gap-y-6">
    <h2 class="text-xl font-bold font-mono">Log in to Li-Admin</h2>

    <div class="w-[340px] h-[1px] bg-base-300 my-2"></div>

    <Form
      v-model="form"
      ref="formRef"
      :schema="schema"
      class="bg-base-200 rounded-xl w-[340px] px-3"
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

    <RouterLink to="/login" class="hover:link link-info">&larr; 返回登录界面</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, TextInput, useYup, type FormRef, toast } from 'li-daisy'

import { reactive } from 'vue'

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
