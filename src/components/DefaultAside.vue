<template>
  <aside>
    <div class="flex flex-col items-center my-3">
      <h2 class="text-xl text-primary font-semibold">Li-Admin</h2>
      <img class="mask mask-hexagon h-16 w-16" src="/logo.jpg" alt="logo" />
    </div>
    <MenuMain :menus="menus" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BanknotesIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'
import MenuMain from '@/components/Menu/MenuMain.vue'
import { type Menu } from './Menu/types'

const menus = ref<Menu[]>([
  {
    title: 'apps',
    items: [
      {
        title: 'app1',
        href: '/app1',
        Icon: BanknotesIcon,
        children: [
          {
            title: 'son1',
            href: '/app1/son1',
            Icon: ArchiveBoxIcon,
            children: [
              {
                title: 'son1',
                href: '/app1/son1',
                Icon: ArchiveBoxIcon,
              },
            ],
          },
          { title: 'son2', href: '/app1/son2', Icon: ArchiveBoxIcon },
        ],
      },
      {
        title: 'app2',
        href: '/app2',
        Icon: ArchiveBoxIcon,
        children: [
          {
            title: 'son2',
            href: '/app2/son2',
            Icon: BanknotesIcon,
          },
        ],
      },
    ],
  },
])
</script>
