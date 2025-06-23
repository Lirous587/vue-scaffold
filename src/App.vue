<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const layouts = {
  NoLayout: defineAsyncComponent(() => import('./layout/NoLayout.vue')),
  AdminLayout: defineAsyncComponent(() => import('./layout/AdminLayout.vue')),
  AuthLayout: defineAsyncComponent(() => import('./layout/AuthLayout.vue')),
}

const route = useRoute()

const currentLayout = computed(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'AdminLayout'
  return layouts[layoutName]
})
</script>

<template>
  <component :is="currentLayout"> </component>
</template>
