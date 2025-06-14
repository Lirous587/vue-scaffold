<template>
  <aside>
    <!-- <div class="flex flex-col items-center my-3 space-y-2">
      <h2 class="text-xl text-primary font-semibold">Li-Admin</h2>
      <img class="mask mask-hexagon h-16 w-16" src="/logo.jpg" alt="logo" />
    </div> -->
    <MenuMain :menus="menus" @change="handleMenuChange" />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  BanknotesIcon,
  HomeModernIcon,
  UsersIcon,
  Bars3Icon,
  FingerPrintIcon,
  Square3Stack3DIcon,
} from '@heroicons/vue/24/outline'
import MenuMain from '@/components/Menu/MenuMain.vue'
import { type Menu } from '../Menu/types'
import { useMyNavStore, type NavItem } from '@/stores/nav'
// square-3-stack-3d
const menus = ref<Menu[]>([
  {
    // title: 'apps',
    items: [
      {
        title: '主页',
        path: '/home',
        Icon: HomeModernIcon,
      },
      {
        title: '权限配置',
        path: '/auth',
        Icon: BanknotesIcon,
        children: [
          {
            title: '角色管理',
            path: '/auth/role',
            Icon: UsersIcon,
          },
          {
            title: '菜单管理',
            path: '/auth/menu',
            Icon: Bars3Icon,
          },
          {
            title: '接口管理',
            path: '/auth/permission',
            Icon: FingerPrintIcon,
          },
          {
            title: '按钮管理',
            path: '/auth/button',
            Icon: Square3Stack3DIcon,
          },
        ],
      },
    ],
  },
])

const store = useMyNavStore()

const handleMenuChange = (item: NavItem) => {
  if (item.title !== '/home') {
    const nav: NavItem = item
    store.push(nav)
  }
}
</script>
