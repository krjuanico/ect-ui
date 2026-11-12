<script setup>
import { reactive, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

import FormInput from '@/components/FormInput.vue'
import SignInButton from '@/components/auth/SignInButton.vue'
import PrivacyStatement from '@/components/auth/PrivacyStatement.vue'
import { useAuthApi } from '@/composables/api/auth.api'
import { useFormRules, useFormValidator } from '@/composables/form-validator'
import { useAuthStore } from '@/stores/auth.store'

const supportWebsite =
  import.meta.env.VITE_SUPPORT_WEBSITE ?? 'https://ictsupport.dswd.gov.ph'

const router = useRouter()
const route = useRoute()
const authApi = useAuthApi()
const authStore = useAuthStore()

const { getErrorMessages } = useFormRules()
const credentials = reactive({
  email: '',
  password: '',
})

const accepted = ref(false)
const showPrivacy = ref(false)
const privacyError = ref('')

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(getErrorMessages('email').required(), required),
    email: helpers.withMessage(getErrorMessages('email').email(), email),
  },
  password: {
    required: helpers.withMessage(getErrorMessages('password').required(), required),
  },
}))

const validator = useVuelidate(rules, credentials)
const formValidator = useFormValidator(validator)

watch(accepted, (isChecked) => {
  if (isChecked) {
    privacyError.value = ''
  }
})

// Remove the server's error as soon as the person edits the form again.
watch(credentials, () => formValidator.clearApiErrors())

function redirectTarget() {
  const redirect = route.query.redirect
  // Only follow redirects that stay inside this app.
  if (typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect
  }
  return { name: 'dashboard' }
}

const handleLogin = async () => {
  if (authApi.isLoading.value) return

  authStore.accountStatusMessage = ''
  formValidator.clearApiErrors()

  const valid = await validator.value.$validate()
  if (!valid) return

  if (!accepted.value) {
    privacyError.value = 'Please check this box if you want to proceed.'
    return
  }

  const response = await authApi.login(credentials.email, credentials.password)

  if (response.success) {
    authStore.setSession(response.data.token, response.data.user)
    await router.replace(redirectTarget())
  } else {
    formValidator.setApiErrors(authApi.errors.value)
    authStore.accountStatusMessage = authApi.message.value
  }
}
</script>

<template>
  <div class="mb-8 mt-5 text-center">
    <h3 class="text-xl font-semibold text-surface-900">Welcome</h3>
    <p class="mt-2 text-sm text-black">Please login to your account to continue</p>
  </div>
  <form @submit.prevent="handleLogin" class="w-full max-w-md">
    <div
      v-if="authStore.accountStatusMessage"
      class="mb-4 flex items-start gap-2 rounded border border-error-300 bg-error-50 px-3 py-2"
      role="alert"
    >
      <i class="pi pi-exclamation-circle mt-0.5 text-error-500"></i>
      <span class="text-sm text-error-700">{{ authStore.accountStatusMessage }}</span>
    </div>
    <div class="mb-3">
      <FormInput for="email" label="Email" :errors="formValidator.getErrors('email')">
        <InputText
          v-model="credentials.email"
          id="email"
          name="email"
          inputId="email"
          type="email"
          autocomplete="username"
          class="w-full text-[13px]"
          placeholder="Email"
          :invalid="formValidator.isInvalid('email')"
          @keyup.enter="handleLogin"
        />
      </FormInput>
    </div>
    <div class="mb-5">
      <FormInput for="password" label="Password" :errors="formValidator.getErrors('password')">
        <Password
          v-model="credentials.password"
          inputId="password"
          toggleMask
          :feedback="false"
          class="w-full"
          inputClass="text-[13px]"
          placeholder="Password"
          :invalid="formValidator.isInvalid('password')"
          fluid
          @keyup.enter="handleLogin"
        />
      </FormInput>
    </div>
    <PrivacyStatement v-model="showPrivacy" />
    <div class="mt-2 flex items-start gap-1">
      <Checkbox
        v-model="accepted"
        :binary="true"
        inputId="privacy"
        :class="{ 'p-invalid': privacyError }"
      />
      <label
        for="privacy"
        class="text-[13px] font-normal leading-relaxed tracking-[0.1px] text-surface-400"
      >
        I have read and agree to the
        <button
          type="button"
          class="cursor-pointer text-[13px] font-semibold tracking-[0.1px] text-primary-900 hover:underline"
          @click="showPrivacy = true"
        >
          Privacy Policy
        </button>
      </label>
    </div>
    <div class="relative mt-1">
      <transition name="tooltip-pop">
        <div v-if="privacyError" class="absolute -top-1 z-20 w-60">
          <div
            class="absolute -top-1 left-1.5 h-2 w-2 rotate-45 border-l border-t border-l-error-300 border-t-error-300 bg-warn-50"
          ></div>
          <div
            class="flex items-start gap-2 rounded border border-error-300 bg-warn-50 px-3 py-2 shadow-md"
          >
            <span class="-mt-1 text-base text-warn-700">⚠</span>
            <span class="text-sm">{{ privacyError }}</span>
          </div>
        </div>
      </transition>
      <SignInButton :loading="authApi.isLoading.value" @click="handleLogin" />
    </div>
  </form>

  <p class="mt-6 text-center text-xs text-surface-400">
    Need help? Send a ticket at
    <a :href="supportWebsite" target="_blank" rel="noopener" class="underline hover:text-primary-900">
      {{ supportWebsite }}
    </a>
  </p>
</template>

<style scoped>
.tooltip-pop-enter-active,
.tooltip-pop-leave-active {
  transition:
    opacity 0.15s,
    transform 0.15s;
}

.tooltip-pop-enter-from,
.tooltip-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>