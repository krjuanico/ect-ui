<script setup>
import Dialog from 'primevue/dialog'

const visible = defineModel({ type: Boolean, default: false })
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Privacy Policy"
    :style="{ width: '34rem' }"
    :breakpoints="{ '640px': '92vw' }"
  >
    <!-- Replace this paragraph with the DRMD privacy statement. -->
    <p class="text-sm leading-relaxed text-surface-600">
      The privacy statement for the DRMD System will be added here.
    </p>
  </Dialog>
</template>