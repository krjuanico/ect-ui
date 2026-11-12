<script setup>
defineProps({
  for: { type: String, required: true },
  label: { type: String, default: '' },
  errors: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="$props.for" class="text-sm font-semibold text-surface-900">{{ label }}</label>
    <slot />
    <small v-for="message in errors" :key="message" class="text-xs text-error-700">
      {{ message }}
    </small>
  </div>
</template>