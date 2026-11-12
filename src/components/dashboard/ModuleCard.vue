<script setup>
defineProps({
  label: { type: String, required: true },
  desc: { type: String, default: '' },
  icon: { type: String, required: true },
  to: { type: String, default: '' },
  ready: { type: Boolean, default: false },
})
</script>

<template>
  <component
    :is="ready ? 'router-link' : 'div'"
    :to="ready ? to : undefined"
    class="flex items-start gap-4 rounded-xl border border-surface-200 bg-white p-5 no-underline shadow-sm transition"
    :class="ready ? 'cursor-pointer hover:border-primary-900 hover:shadow-md' : 'opacity-70'"
  >
    <span class="pi flex-none text-2xl text-primary-900" :class="icon" />
    <div class="min-w-0">
      <div class="flex items-center gap-2">
        <span class="font-medium text-surface-900">{{ label }}</span>
        <span v-if="!ready" class="rounded-full bg-surface-100 px-2 py-0.5 text-xs text-surface-500">
          Soon
        </span>
      </div>
      <p class="m-0 mt-1 text-sm text-surface-500">{{ desc }}</p>
    </div>
  </component>
</template>