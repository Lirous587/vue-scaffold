<template>
  <li class="my-1">
    <template v-if="props.children && props.children.length > 0">
      <details @toggle="handleToggle" ref="detailsRef">
        <summary class="flex items-center cursor-pointer justify-between after:hidden">
          <div class="flex items-center gap-x-3">
            <component v-if="props.Icon" class="w-5 h-5" :is="props.Icon"></component>
            <span>{{ props.title }}</span>
          </div>
          <ChevronRightIcon
            class="w-5 h-5 transition-all duration-200"
            :class="isOpen ? 'rotate-90' : ''"
          />
        </summary>
        <ul>
          <MenuItem
            v-for="child in props.children"
            :key="child.title + child.path"
            :title="child.title"
            :path="child.path"
            :Icon="child.Icon"
            :children="child.children"
            @change="handleChildChange"
          />
        </ul>
      </details>
    </template>
    <template v-else>
      <div
        class="py-0 cursor-pointer"
        :class="route.path === props.path ? 'bg-base-300' : ''"
        @click="handleMenuClick"
      >
        <div class="flex items-center gap-x-3 py-2">
          <component v-if="props.Icon" class="w-5 h-5" :is="props.Icon"></component>
          <span>{{ props.title }}</span>
        </div>
      </div>
    </template>
  </li>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { type MenuItemProps } from './types'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type NavItem } from '@/stores/nav'
import { onMounted } from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'
import { nextTick } from 'vue'

const props = defineProps<MenuItemProps>()

const isOpen = ref(false)

const handleToggle = (event: Event) => {
  isOpen.value = (event.target as HTMLDetailsElement).open
}

const route = useRoute()

const emit = defineEmits<{
  (e: 'change', item: NavItem): void
}>()

const router = useRouter()

const handleMenuClick = () => {
  emit('change', { title: props.title, path: props.path })
  router.push(props.path)
}

const handleChildChange = (item: NavItem) => {
  emit('change', item)
}

const detailsRef = ref<HTMLDetailsElement>()

// 使用 computed 缓存计算结果，只有路由变化时才重新计算
const hasActiveChild = computed(() => {
  if (!props.children || props.children.length === 0) {
    return false
  }

  const checkActive = (items: MenuItemProps[]): boolean => {
    for (const item of items) {
      if (item.path === route.path) {
        return true
      }
      if (item.children && item.children.length > 0 && checkActive(item.children)) {
        return true
      }
    }
    return false
  }

  return checkActive(props.children)
})

// 更新展开状态的函数
const updateOpenState = async (shouldOpen: boolean) => {
  if (!detailsRef.value) return

  await nextTick()

  if (shouldOpen !== isOpen.value) {
    detailsRef.value.open = shouldOpen
    isOpen.value = shouldOpen
  }
}

// 监听路由变化时的展开状态
watch(hasActiveChild, (shouldOpen) => {
  updateOpenState(shouldOpen)
})

// 确保初始化时能正确展开
onMounted(async () => {
  await nextTick()
  updateOpenState(hasActiveChild.value)
})
</script>
