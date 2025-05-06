<template>
  <div class="flex">
    <DefaultAside />
    <div class="flex-1">
      <DefaultHeader />
      <main class="bg-accent">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultAside from '@/components/DefaultAside.vue'
import DefaultHeader from '@/components/DefaultHeader.vue'
</script>
