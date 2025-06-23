<template>
  <div>
    <div class="btn btn-ghost" @click="handleToggleExpand">
      <Bars3Icon class="w-6 h-6" />
    </div>

    <Drawer title="导航栏" ref="drawerRef" class="lg:hidden" @close="handleDrawerClose">
      <DefaultAside />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { useMyExpandStore } from '@/stores/expand'
import DefaultAside from './DefaultAside.vue'
import { Drawer, type DrawerRef } from 'li-daisy'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
import { debounce } from '@/utils'
const store = useMyExpandStore()

const handleToggleExpand = () => {
  store.toggleStatus()
  const w = window.innerWidth
  if (w >= 1024) {
    return
  }
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

// 记录上一次的屏幕状态
const wasLargeScreen = ref(false)

const handleResize = () => {
  const w = window.innerWidth
  const isLargeScreen = w >= 1024

  // 从大屏幕变成小屏幕时，关闭侧边栏
  if (wasLargeScreen.value && !isLargeScreen) {
    store.setStatus('close')
    drawerRef.value?.close()
  }

  // 从小屏幕变成大屏幕时，打开侧边栏
  if (!wasLargeScreen.value && isLargeScreen) {
    store.setStatus('expand')
    drawerRef.value?.open()
  }

  // 更新屏幕状态记录
  wasLargeScreen.value = isLargeScreen
}

const debouncedHandleResize = debounce(handleResize, 200)

onMounted(() => {
  const w = window.innerWidth
  // 初始化屏幕状态记录
  wasLargeScreen.value = w >= 1024

  // 大屏幕下默认设置为展开
  if (w >= 1024) {
    store.setStatus('expand')
  } else {
    // 小屏幕下默认设置为关闭
    store.setStatus('close')
  }

  // 添加 resize 事件监听器
  window.addEventListener('resize', debouncedHandleResize)
})

onUnmounted(() => {
  // 清理事件监听器
  window.removeEventListener('resize', debouncedHandleResize)
})
</script>
