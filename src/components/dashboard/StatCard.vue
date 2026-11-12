<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '—' },
  icon: { type: String, required: true }, // e.g. 'pi-folder'
  tone: { type: String, default: 'bg-blue-100 text-blue-700' },
})
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-5 shadow-sm">
    <div class="flex h-12 w-12 flex-none items-center justify-center rounded-lg" :class="tone">
      <span class="pi text-xl" :class="icon" />
    </div>
    <div>
      <div class="text-2xl font-semibold text-surface-900">{{ value }}</div>
      <div class="text-sm text-surface-500">{{ label }}</div>
    </div>
  </div>
</template>