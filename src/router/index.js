import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { guest: true },
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'dashboard' },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Signed-in users have no reason to see the login page.
  if (to.meta.guest) {
    return auth.isAuthenticated ? { name: 'dashboard' } : true
  }

  if (to.meta.requiresAuth) {
    if (!auth.isAuthenticated) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }

    // After a page reload the token is saved but the user is not loaded yet.
    if (!auth.user) {
      try {
        await auth.fetchUser()
      } catch {
        auth.clear()
        return { name: 'login', query: { redirect: to.fullPath } }
      }
    }
  }

  return true
})

export default router