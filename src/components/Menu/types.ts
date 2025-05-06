import type { Component } from 'vue'

export interface MenuProps {
  menus: Menu[]
}

export interface MenuItemProps {
  title: string
  href: string
  Icon?: Component
  children?: MenuItem[]
}

export interface Menu {
  title?: string
  items: MenuItem[]
}

export interface MenuItem {
  title: string
  href: string
  Icon?: Component
  children?: MenuItem[]
}
