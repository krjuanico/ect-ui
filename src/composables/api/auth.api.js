import { ref } from 'vue'

import api from './api'

/**
 * API calls for sign in, sign out and the current user.
 * Each module gets its own file in this folder, e.g. composables/api/<module>.api.js.
 */
export function useAuthApi() {
  const isLoading = ref(false)
  const errors = ref({})
  const message = ref('')

  /**
   * Returns { success: true, data: { token, user } } or { success: false }.
   * On failure, field errors are in `errors` and any general message is in `message`.
   */
  async function login(email, password) {
    isLoading.value = true
    errors.value = {}
    message.value = ''

    try {
      const { data } = await api.post('/tokens', {
        email,
        password,
        device_name: 'drmd-ui',
      })
      return { success: true, data }
    } catch (error) {
      const status = error.response?.status

      if (status === 422) {
        errors.value = error.response.data.errors ?? {}
      } else if (status === 429) {
        message.value = 'Too many attempts. Wait a minute, then try again.'
      } else if (!error.response) {
        message.value = 'Can\u2019t reach the server. Check that the API is running.'
      } else {
        message.value = 'Something went wrong on the server. Try again.'
      }

      return { success: false }
    } finally {
      isLoading.value = false
    }
  }

  async function fetchUser() {
    const { data } = await api.get('/user')
    return data
  }

  function logout() {
    return api.delete('/tokens')
  }

  return { isLoading, errors, message, login, fetchUser, logout }
}