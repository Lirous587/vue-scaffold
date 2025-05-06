<template>
  <div class="flex h-screen">
    <DefaultAside
      class="fixed w-[250px] h-screen border-r border-r-base-300 translate-x-[-250px] lg:translate-x-[0] transition-[translate] duration-300"
    />
    <div class="flex-1 flex flex-col">
      <DefaultHeader
        class="fixed left-0 lg:left-[250px] right-[0] top-0 z-10 h-[64px] transition-[left] duration-300 bg-base-100 border-b border-b-base-300 shadow"
      />
      <main class="flex-1 pt-[64px] pl-0 lg:pl-[250px] transition-[padding] duration-300">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultAside from '@/components/DefaultAside.vue'
import DefaultHeader from '@/components/DefaultHeader.vue'
</script>
