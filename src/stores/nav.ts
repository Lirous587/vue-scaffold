import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface NavItem {
  href: string
  title: string
}

export const useMyNavStore = defineStore('myNavsStore', () => {
  const navs = ref<NavItem[]>([])

  const navsKey = 'navs'

  const init = () => {
    const storedNavs = localStorage.getItem(navsKey)
    if (storedNavs) {
      const parsedNavs = JSON.parse(storedNavs) as NavItem[]
      if (Array.isArray(parsedNavs)) {
        navs.value = parsedNavs
      } else {
        console.warn('Stored "navs" is not an array, resetting to empty.')
        localStorage.removeItem(navsKey)
      }
    }
  }

  const push = (item: NavItem) => {
    const exist = navs.value.find((n) => n.title === item.title)

    if (!exist) {
      navs.value.push(item)
      localStorage.setItem(navsKey, JSON.stringify(navs.value))
    }
  }

  const deleteIndex = (index: number) => {
    navs.value?.splice(index, 1)
    localStorage.setItem(navsKey, JSON.stringify(navs.value))
  }

  const clear = () => {
    navs.value = []
    localStorage.removeItem(navsKey)
  }

  return {
    navs,
    init,
    push,
    deleteIndex,
    clear,
  }
})
