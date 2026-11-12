<script setup>
import { computed } from 'vue'

defineProps({
  name: { type: String, default: '' },
})

const greeting = computed(() => {
  const h = new Date().getHours()
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
})

const today = new Date().toLocaleDateString('en-PH', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
</script>

<template>
  <section class="rounded-xl bg-primary-900 p-6 text-surface shadow-sm sm:p-8">
    <p class="m-0 text-sm text-surface/70">{{ today }}</p>
    <h1 class="mb-1 mt-1 text-3xl font-semibold">{{ greeting }}, {{ name }}</h1>
    <p class="m-0 text-surface/80">An overview of your activities and the system status.</p>
  </section>
</template>