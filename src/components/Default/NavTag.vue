<template>
  <div class="flex items-center relative">
    <TransitionGroup
      name="tags"
      tag="div"
      class="flex-1 flex p-4 items-center overflow-x-auto no-scrollbar"
    >
      <div
        v-for="(tag, index) in tags"
        :key="tag.title + tag.href"
        class="flex items-center h-10 gap-x-1 border border-base-300 mx-2 px-2.5 bg-base-200 rounded-md hover:cursor-pointer transition-all duration-150"
      >
        <span class="font-bold text-sm">
          {{ tag.title }}
        </span>
        <div @click="handleDelete(index)">
          <XMarkIcon
            class="h-6 w-6 btn btn-ghost btn-circle p-0.5"
            :class="tag.noClose ? 'hidden' : ''"
          />
        </div>
      </div>
    </TransitionGroup>
    <div class="absolute top-1/2 right-0 bottom-0 translate-y-[-50%] bg-base-100 h-10">
      <div class="mx-4 btn">删除除开当前</div>
      <div class="mx-4 btn">清除全部</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'

import { ref } from 'vue'

interface TagType {
  title: string
  href: string
  noClose?: boolean
}

const tags = ref<TagType[]>([
  { title: 'Home', href: '/', noClose: true },
  { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
  // { title: 'tag1', href: '/tag1' },
  // { title: 'tag2', href: '/tag2' },
])

const handleDelete = (index: number) => {
  tags.value.splice(index, 1)
}
</script>

<style scoped>
.tags-move,
.tags-enter-active,
.tags-leave-active {
  transition: all 0.5s ease;
}

.tags-enter-from,
.tags-leave-to {
  opacity: 0;
  scale: 0;
}

.tags-leave-active {
  display: none;
}
</style>
