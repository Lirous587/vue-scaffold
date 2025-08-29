<template>
  <ThemeSwitch light-theme="light" dark-theme="dark" class="sr-only" />
  <router-view />
</template>

<script setup lang="ts">
import { ThemeSwitch } from 'li-daisy'
</script>
