<template>
  <div class="flex h-screen">
    <DefaultAside
      class="fixed w-[250px] h-screen border-r border-r-base-300 translate-x-[-250px] lg:translate-x-[0] transition-[translate] duration-300 overflow-auto"
      :class="asideClsss"
    />
    <div class="flex-1 flex flex-col">
      <DefaultHeader
        class="fixed left-0 lg:left-[250px] right-[0] top-0 z-10 h-[64px] transition-[left] duration-300 bg-base-100 border-b border-b-base-300"
        :class="headerClass"
      />
      <main
        class="flex-1 pt-[64px] ml-0 lg:ml-[250px] transition-[margin] duration-300 bg-base-300"
        :class="mainClass"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultAside from '@/components/Default/DefaultAside.vue'
import DefaultHeader from '@/components/Default/DefaultHeader.vue'
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
