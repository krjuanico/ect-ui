<script setup>
import Dswdlogo from '../../assets/images/dswd-logo-white.png'
import { navItems } from '../../config/navigation'
import { useSidebar } from '../../composables/useSidebar'
import SidebarNavItem from './SidebarNavItem.vue'

const { collapsed, mobileOpen, toggleCollapsed } = useSidebar()
</script>

<template>
  <aside
    class="fixed inset-y-0 left-0 z-40 flex flex-col overflow-hidden bg-primary-900 text-surface shadow-md transition-[width,transform] duration-200 ease-in-out md:static md:translate-x-0"
    :class="[
      collapsed ? 'md:w-16' : 'md:w-45',
      mobileOpen ? 'w-56 translate-x-0' : 'w-56 -translate-x-full',
    ]"
    aria-label="Main navigation"
  >
    <!-- Logo and system name, centered -->
    <div class="flex flex-none flex-col items-center justify-center">
      <img
        :src="Dswdlogo"
        alt="DSWD logo"
        class="h-18  w-auto max-w-full flex-none object-contain"
      />
      <strong
        class="whitespace-nowrap text-base tracking-wide"
        :class="collapsed ? 'md:hidden' : ''"
      >
      </strong>
    </div>

    <nav class="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <SidebarNavItem v-for="item in navItems" :key="item.to" :item="item" />
    </nav>

    <!-- Collapse toggle (desktop only) -->
    <div class="hidden flex-none border-t border-white/10 py-2 md:block">
      <button
        type="button"
        class="m-2 flex w-[calc(100%-1rem)] cursor-pointer items-center justify-center rounded-lg bg-transparent py-3 text-surface transition-colors hover:bg-white/10"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        :aria-expanded="!collapsed"
        @click="toggleCollapsed"
      >
        <span
          class="pi pi-angle-double-left transition-transform duration-200"
          :class="{ 'rotate-180': collapsed }"
          aria-hidden="true"
        />
      </button>
    </div>
  </aside>
</template>