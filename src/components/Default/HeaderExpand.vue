<template>
  <div>
    <div class="btn btn-ghost" @click="handleExpand">
      <Bars3Icon class="w-6 h-6" />
    </div>

    <Drawer title="" ref="drawerRef" class="lg:hidden" @close="handleDrawerClose">
      <DefaultAside />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { useMyExpandStore, type expandStatus } from '@/stores/expand'
import DefaultAside from './DefaultAside.vue'
import { Drawer, type DrawerRef } from 'li-daisy'
import { ref } from 'vue'
import { onMounted } from 'vue'

const store = useMyExpandStore()

const expandStatus = ref<expandStatus>('close')

const handleExpand = () => {
  store.toggleStatus()

  if (store.status === 'expand') {
    drawerRef.value?.open()
    return
  }
  drawerRef.value?.close()
}

const drawerRef = ref<DrawerRef>()

const handleDrawerClose = () => {
  store.setStatus('close')
}

onMounted(() => {
  const w = window.innerWidth
  if (w < 1024) {
    store.setStatus('close')
  }
})
</script>
