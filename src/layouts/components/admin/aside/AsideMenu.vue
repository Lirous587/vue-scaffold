<template>
  <div v-for="(menu, index) in menus" :key="menu.title + menu.path">
    <li
      class="p-2 hover:bg-base-300 hover:cursor-pointer duration-300 transition-[background] rounded-md flex items-center justify-start"
      :class="[route.path === menu.path ? 'bg-base-300' : '']"
      @click="handleMenuClick(menu)"
    >
      <Popover position="right" :z-index="20">
        <template #trigger>
          <div class="flex items-center gap-x-3">
            <component :is="menu.Icon" v-if="menu.Icon" class="w-5 h-5"></component>
            <span v-show="!isCollapsed" class="truncate text-sm">{{ menu.title }}</span>
          </div>
        </template>
        <template #content>
          <div
            v-show="isCollapsed"
            class="ml-2 px-2 py-1.5 border border-base-200 shadow-md rounded-lg bg-base-200"
          >
            <p class="text-xs font-semibold">
              {{ menu.title }}
            </p>
          </div>
        </template>
      </Popover>
    </li>

    <div
      v-if="index === 0 || index === 2 || index === 4 || index === 5"
      class="h-5 flex items-center w-full"
    >
      <div class="bg-base-300 w-full h-[1px]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { Popover } from 'li-daisy'
import {
  HomeModernIcon,
  BookmarkIcon,
  TagIcon,
  PlayCircleIcon,
  HeartIcon,
  FaceSmileIcon,
  PhotoIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'

import { useRoute, useRouter } from 'vue-router'
import { useMyAsideBarStore } from '@/stores/asideBar'

const asideBarStore = useMyAsideBarStore()

const isCollapsed = computed(() => asideBarStore.isCollapsed)

interface asideItem {
  title: string
  Icon: Component
  path: string
}

const menus = ref<asideItem[]>([
  {
    title: '主页',
    path: '/home',
    Icon: HomeModernIcon,
  },
  {
    title: '文章',
    path: '/article',
    Icon: BookmarkIcon,
  },
  {
    title: '标签',
    path: '/label',
    Icon: TagIcon,
  },
  {
    title: '格言',
    path: '/record/maxim',
    Icon: HeartIcon,
  },
  {
    title: '瞬间',
    path: '/record/moment',
    Icon: PlayCircleIcon,
  },
  {
    title: '友链',
    path: '/friend',
    Icon: FaceSmileIcon,
  },
  {
    title: '图库',
    path: '/img',
    Icon: PhotoIcon,
  },
  {
    title: '回收站',
    path: '/img/recycle',
    Icon: TrashIcon,
  },
])

const route = useRoute()
const router = useRouter()

const handleMenuClick = (menu: asideItem) => {
  router.push(menu.path)
}
</script>
