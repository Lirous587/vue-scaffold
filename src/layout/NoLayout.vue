<template>
  <ThemeSwitch light-theme="light" dark-theme="dark" class="sr-only" />
  <router-view />
</template>

<script setup>
import { ThemeSwitch } from 'li-daisy'
</script>
