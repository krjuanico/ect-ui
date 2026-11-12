import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { TOKEN_KEY } from '@/composables/api/api'
import { useAuthApi } from '@/composables/api/auth.api'

export const useAuthStore = defineStore('auth', () => {
  const authApi = useAuthApi()

  const token = ref(localStorage.getItem(TOKEN_KEY))
  const user = ref(null)
  // Shown above the login form, e.g. "Too many attempts" or a disabled-account notice.
  const accountStatusMessage = ref('')

  const isAuthenticated = computed(() => Boolean(token.value))

  function setSession(newToken, newUser) {
    token.value = newToken
    user.value = newUser
    localStorage.setItem(TOKEN_KEY, newToken)
  }

  function clear() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  async function fetchUser() {
    user.value = await authApi.fetchUser()
  }

  async function logout() {
    try {
      await authApi.logout()
    } catch {
      // The token may already be invalid on the server. Sign out locally either way.
    } finally {
      clear()
    }
  }

  return {
    token,
    user,
    accountStatusMessage,
    isAuthenticated,
    setSession,
    fetchUser,
    logout,
    clear,
  }
})