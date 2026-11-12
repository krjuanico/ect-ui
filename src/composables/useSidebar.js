import { ref, watch } from 'vue'

// Module-level state, so the sidebar, header and layout all share the same values
const collapsed = ref(localStorage.getItem('sidebarCollapsed') === '1')
const mobileOpen = ref(false)

watch(collapsed, (v) => localStorage.setItem('sidebarCollapsed', v ? '1' : '0'))

export function useSidebar() {
  return {
    collapsed,
    mobileOpen,
    toggleCollapsed: () => (collapsed.value = !collapsed.value),
    openMobile: () => (mobileOpen.value = true),
    closeMobile: () => (mobileOpen.value = false),
  }
}