<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'
import { useSidebar } from '../../composables/useSidebar'
import logo from '../../assets/images/drmd-logo-full.png'

const auth = useAuthStore()
const router = useRouter()
const { openMobile } = useSidebar()

const signingOut = ref(false)

const initials = computed(() =>
  (auth.user?.name ?? '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

async function signOut() {
  signingOut.value = true
  await auth.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <header class="flex h-14 flex-none items-center justify-between border-b border-surface-200 bg-white px-4 sm:px-6">
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="cursor-pointer rounded border-0 bg-transparent p-2 text-surface-700 hover:bg-surface-100 md:hidden"
        aria-label="Open menu"
        @click="openMobile"
      >
        <span class="pi pi-bars" />
      </button>

      <img :src="logo" alt="SAGIP logo" class="h-9 w-auto flex-none object-contain" />
      <div class="leading-tight">
      </div>
    </div>

    <div class="flex items-center gap-3">
      <div class="text-right leading-tight">
        <div class="text-sm font-medium text-surface-900">{{ auth.user?.name }}</div>
        <div class="text-xs text-surface-500">{{ auth.user?.email }}</div>
      </div>
      <div
        class="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-sm font-semibold text-surface"
      >
        {{ initials }}
      </div>
      <button
        type="button"
        class="cursor-pointer rounded border border-surface-300 bg-transparent px-3 py-1.5 text-sm text-surface-700 hover:bg-surface-100 disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="signingOut"
        @click="signOut"
      >
        {{ signingOut ? 'Signing out…' : 'Sign out' }}
      </button>
    </div>
  </header>
</template>