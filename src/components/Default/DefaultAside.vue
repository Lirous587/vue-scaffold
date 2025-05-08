<template>
  <aside>
    <div class="flex flex-col items-center my-3 space-y-2">
      <h2 class="text-xl text-primary font-semibold">Li-Admin</h2>
      <img class="mask mask-hexagon h-16 w-16" src="/logo.jpg" alt="logo" />
    </div>
    <MenuMain :menus="menus" @change="handleMenuChange" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BanknotesIcon, ArchiveBoxIcon, HomeModernIcon } from '@heroicons/vue/24/outline'
import MenuMain from '@/components/Menu/MenuMain.vue'
import { type Menu } from '../Menu/types'
import { useMyNavStore, type NavItem } from '@/stores/nav'

const menus = ref<Menu[]>([
  {
    title: 'apps',
    items: [
      {
        title: '主页',
        href: '/',
        Icon: HomeModernIcon,
      },
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
        ],
      },
    ],
  },
])

const store = useMyNavStore()

const handleMenuChange = (item: NavItem) => {
  const nav: NavItem = item
  store.push(nav)
}
</script>
