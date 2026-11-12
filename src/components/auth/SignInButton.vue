<script setup>
import Button from 'primevue/button'

defineProps({
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <Button type="button" label="Login" :loading="loading" class="w-full" />
</template>