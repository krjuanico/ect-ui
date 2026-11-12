<script setup>
defineProps({
  items: { type: Array, default: () => [] }, // [{ id, text, time }]
})
</script>

<template>
  <div class="rounded-xl border border-surface-200 bg-white p-5 shadow-sm">
    <ul v-if="items.length" class="m-0 list-none space-y-4 p-0">
      <li v-for="a in items" :key="a.id" class="text-sm">
        <div class="text-surface-900">{{ a.text }}</div>
        <div class="text-xs text-surface-500">{{ a.time }}</div>
      </li>
    </ul>
    <div v-else class="py-6 text-center text-sm text-surface-500">
      <span class="pi pi-inbox mb-2 block text-3xl" />
      Nothing yet
    </div>
  </div>
</template>