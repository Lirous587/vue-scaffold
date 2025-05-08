<template>
  <div class="flex overflow-auto">
    <DefaultAside
      class="fixed w-[250px] h-screen border-r border-r-base-300 translate-x-[-250px] lg:translate-x-[0] transition-[translate] duration-300 overflow-y-auto"
      :class="asideClsss"
    />
    <div class="flex-1 flex flex-col overflow-y-auto">
      <div
        class="fixed z-10 left-0 lg:left-[250px] right-[0] top-0 transition-[left] duration-300"
        :class="headerClass"
      >
        <DefaultHeader class="h-[64px] bg-base-100 border-b border-b-base-300" />
        <DefaultNavTag class="h-[64px] bg-base-100 border-b border-b-base-300" />
      </div>
      <main
        class="pt-[128px] ml-0 lg:ml-[250px] transition-[margin] duration-300 bg-base-100 shrink-0"
        :class="mainClass"
      >
        <div class="h-screen">1</div>
        <div class="h-screen">2</div>
        <div class="h-screen">3</div>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultAside from '@/components/Default/DefaultAside.vue'
import DefaultHeader from '@/components/Default/DefaultHeader.vue'
import DefaultNavTag from '@/components/Default/NavTag.vue'
import { useMyExpandStore } from '@/stores/expand'
import { computed } from 'vue'

const store = useMyExpandStore()
const expandStatus = computed(() => store.status)
const asideClsss = computed(() => {
  if (expandStatus.value === 'expand') {
    return 'lg:translate-x-[0]!'
  } else {
    return 'lg:translate-x-[-250px]!'
  }
})

const headerClass = computed(() => {
  if (expandStatus.value === 'expand') {
    return 'lg:left-[250px]!'
  } else {
    return 'lg:left-0!'
  }
})

const mainClass = computed(() => {
  if (expandStatus.value === 'expand') {
    return 'lg:ml-[250px]!'
  } else {
    return 'lg:ml-0!'
  }
})
</script>
