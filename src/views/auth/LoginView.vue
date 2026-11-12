<script setup>
import dswdLogo from '@/assets/images/dswd-logo.png'
import drmdLogo from '@/assets/images/drmd-logo-full.png'
import loginBg from '@/assets/images/login-bg.png'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-surface-100 p-6">
    <div
      class="grid min-h-120 w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl bg-surface shadow-xl md:grid-cols-2"
    >
      <div class="flex h-full w-full flex-col items-center justify-center sm:p-6 md:p-12">
        <div class="mb-3 flex flex-row items-center gap-5 mt-2">
          <img
            :src="dswdLogo"
            alt="DSWD Field Office 11 - Davao Region"
            class="h-10 object-contain sm:h-18 md:h-20"
          />
          <img
            :src="drmdLogo"
            alt="DSWD Field Office 11 - Davao Region"
            class="h-10 object-contain sm:h-8 md:h-10"
          />
        </div>

        <LoginForm />
      </div>

      <div class="hidden p-3 md:block">
        <div class="relative h-full min-h-80 overflow-hidden rounded-2xl">
          <img :src="loginBg" alt="" class="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</template>