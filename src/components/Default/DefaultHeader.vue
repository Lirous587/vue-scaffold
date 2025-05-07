<template>
  <div class="flex items-center justify-between px-5 gap-x-3">
    <HeaderExpand />
    <div class="flex items-center">
      <ThemeController />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeController from '@/components/ThemeController.vue'
import HeaderExpand from './HeaderExpand.vue'
</script>
