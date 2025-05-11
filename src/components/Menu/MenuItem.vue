<template>
  <li class="my-1">
    <template v-if="props.children && props.children.length > 0">
      <details @toggle="handleToggle">
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
            :key="child.title + child.href"
            :title="child.title"
            :href="child.href"
            :Icon="child.Icon"
            :children="child.children"
            @change="handleChildChange"
          />
        </ul>
      </details>
    </template>
    <template v-else>
      <div
        class="py-0"
        :class="route.path === props.href ? 'bg-base-300' : ''"
        @click="handleClickLink"
      >
        <RouterLink :to="props.href" class="flex items-center gap-x-3 py-2">
          <component v-if="props.Icon" class="w-5 h-5" :is="props.Icon"></component>
          <span>{{ props.title }}</span>
        </RouterLink>
      </div>
    </template>
  </li>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { type MenuItemProps } from './types'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { type NavItem } from '@/stores/nav'

const props = defineProps<MenuItemProps>()

const isOpen = ref(false)

const handleToggle = (event: Event) => {
  isOpen.value = (event.target as HTMLDetailsElement).open
}

const route = useRoute()

const emit = defineEmits<{
  (e: 'change', item: NavItem): void
}>()

const handleClickLink = () => {
  emit('change', { title: props.title, href: props.href })
}

const handleChildChange = (item: NavItem) => {
  emit('change', item)
}
</script>
