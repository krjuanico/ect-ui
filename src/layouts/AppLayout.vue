<script setup>
import { useSidebar } from '../composables/useSidebar'
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppHeader from '../components/layout/AppHeader.vue'

const { mobileOpen, closeMobile } = useSidebar()
</script>

<template>
  <div class="flex h-screen bg-surface-100">
    <!-- Mobile backdrop -->
    <div
      v-if="mobileOpen"
      class="fixed inset-0 z-30 bg-black/40 md:hidden"
      @click="closeMobile"
    />

    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-4 sm:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>