<template>
  <div class="flex items-center relative">
    <TransitionGroup
      name="tags"
      tag="div"
      class="flex-1 flex p-4 items-center overflow-x-auto no-scrollbar"
    >
      <RouterLink
        v-for="(tag, index) in tags"
        :key="tag.title + tag.href"
        class="flex items-center btn btn-secondary btn-xs mx-1.5 btn-dash py-4"
        :to="tag.href"
      >
        <span class="font-bold text-sm">
          {{ tag.title }}
        </span>
        <div @click="handleDelete(index)">
          <XMarkIcon class="h-5 w-5 btn btn-ghost btn-circle p-0.5 hover:text-secondary-content" />
        </div>
      </RouterLink>
    </TransitionGroup>
    <div
      class="absolute top-1/2 right-0 bottom-0 translate-y-[-50%] h-10 w-fit pl-[20px] pr-5 bg-linear-to-r from-transparent from-[10px] to-[20px] to-base-100 flex items-center"
    >
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-sm m-1 btn-outline btn-primary">
          <ChevronDoubleDownIcon class="w-5 h-5" />
        </div>

        <ul
          tabindex="0"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w p-2 shadow-sm space-y-1 w-30"
        >
          <li><span>关闭其他</span></li>
          <li><span>关闭全部</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMyNavStore } from '@/stores/nav'
import { XMarkIcon, ChevronDoubleDownIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { onMounted } from 'vue'

const tags = computed(() => store.navs)

const store = useMyNavStore()

const handleDelete = (index: number) => {
  store.deleteIndex(index)
}

onMounted(() => {
  store.init()
})
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
