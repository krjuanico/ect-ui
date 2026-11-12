<script setup>
import { useRoute } from 'vue-router'
import { useSidebar } from '../../composables/useSidebar'

const props = defineProps({
  item: { type: Object, required: true }, // { label, icon, to }
})

const route = useRoute()
const { collapsed, closeMobile } = useSidebar()

const isActive = () => route.path === props.item.to
</script>

<template>
  <router-link
    :to="item.to"
    :title="collapsed ? item.label : undefined"
    class="m-2 flex items-center gap-3 rounded-lg py-3 pl-[14px] pr-4 text-surface no-underline transition-colors hover:bg-white/10"
    :class="{ 'bg-white/15': isActive() }"
    @click="closeMobile"
  >
    <span class="pi flex-none text-lg" :class="item.icon" aria-hidden="true" />
    <span
      class="whitespace-nowrap text-sm font-medium transition-opacity duration-200"
      :class="collapsed ? 'md:opacity-0' : 'opacity-100'"
    >
      {{ item.label }}
    </span>
  </router-link>
</template>