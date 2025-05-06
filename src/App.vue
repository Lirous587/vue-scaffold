<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const layouts = {
  DefaultLayout: defineAsyncComponent(() => import('./layout/DefaultLayout.vue')),
  AuthLayout: defineAsyncComponent(() => import('./layout/AuthLayout.vue')),
}

const route = useRoute()

const currentLayout = computed(() => {
  const layoutName = (route.meta.layout as keyof typeof layouts) || 'DefaultLayout'
  return layouts[layoutName]
})
</script>

<template>
  <component :is="currentLayout"> </component>
</template>
