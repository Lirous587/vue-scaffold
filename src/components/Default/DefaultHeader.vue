<template>
  <div class="flex items-center justify-between px-5 gap-x-3">
    <HeaderExpand />
    <div class="flex items-center">
      <ThemeSwitch light-theme="light" dark-theme="dark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ThemeSwitch } from 'li-daisy'
import HeaderExpand from './HeaderExpand.vue'
</script>
