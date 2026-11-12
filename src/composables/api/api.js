import axios from 'axios'

export const TOKEN_KEY = 'drmd_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: { Accept: 'application/json' },
})

// Attach the saved token to every request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the server says the token is no longer valid, drop it and go to the login page.
// Sign-in attempts (POST /tokens) are skipped so their errors reach the login form.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const isSignIn = error.config?.method === 'post' && error.config?.url?.startsWith('/tokens')

    if (status === 401 && !isSignIn) {
      localStorage.removeItem(TOKEN_KEY)
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }

    return Promise.reject(error)
  },
)

export default api