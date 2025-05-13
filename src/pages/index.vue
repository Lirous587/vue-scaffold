<template>
  <div class="p-4 flex gap-x-4">
    <button class="btn btn-accent" @click="mockApi">mock 测试</button>
    <button class="btn btn-accent" @click="mockErrorApi">mock 测试</button>
  </div>
</template>

<script setup lang="ts">
import { mockApi, mockErrorApi } from '@/api/mock'
</script>
