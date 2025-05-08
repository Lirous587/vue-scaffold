<template>
  <div v-for="(menu, menuIndex) in props.menus" :key="menuIndex" class="mb-2">
    <h3 v-if="menu.title" class="menu-title px-4 py-1 opacity-80">{{ menu.title }}</h3>
    <ul class="menu w-full">
      <MenuItem
        v-for="item in menu.items"
        :key="item.title + item.href"
        :title="item.title"
        :href="item.href"
        :Icon="item.Icon"
        :children="item.children"
        @change="handleItemChange"
      />
    </ul>
    <!-- <MenuItem title="test" href="test" @change="handleItemChange" /> -->
  </div>
</template>

<script setup lang="ts">
import { type MenuProps } from './types'
const props = defineProps<MenuProps>()
import MenuItem from './MenuItem.vue'
import { type NavItem } from '@/stores/nav'

const emit = defineEmits<{
  change: [item: NavItem]
}>()

const handleItemChange = (item: NavItem) => {
  emit('change', item)
}
</script>
