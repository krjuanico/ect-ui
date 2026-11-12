<script setup>
import { useAuthStore } from '../../stores/auth.store'
import AppLayout from '../../layouts/AppLayout.vue'
import WelcomeBanner from '../../components/dashboard/WelcomeBanner.vue'
import StatCard from '../../components/dashboard/StatCard.vue'
import ModuleCard from '../../components/dashboard/ModuleCard.vue'
import ActivityList from '../../components/dashboard/ActivityList.vue'

const auth = useAuthStore()

// Placeholder data: replace with API calls once your modules exist
const stats = [
  { label: 'Total Records', value: '—', icon: 'pi-folder', tone: 'bg-blue-100 text-blue-700' },
  { label: 'Pending', value: '—', icon: 'pi-clock', tone: 'bg-amber-100 text-amber-700' },
  { label: 'Completed', value: '—', icon: 'pi-check-circle', tone: 'bg-green-100 text-green-700' },
  { label: 'Users', value: '—', icon: 'pi-users', tone: 'bg-purple-100 text-purple-700' },
]

const modules = [
  { label: 'Records', desc: 'Browse and manage records', icon: 'pi-folder-open', to: '/records', ready: false },
  { label: 'Reports', desc: 'Generate and export reports', icon: 'pi-chart-bar', to: '/reports', ready: false },
  { label: 'Users', desc: 'Accounts and access', icon: 'pi-users', to: '/users', ready: false },
]

const activity = []
</script>

<template>
  <AppLayout>
    <div class="mx-auto max-w-auto space-y-6">
      <WelcomeBanner :name="auth.user?.name" />

      <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard v-for="s in stats" :key="s.label" v-bind="s" />
      </section>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section class="lg:col-span-2">
          <h2 class="mb-3 text-lg font-semibold text-surface-900">Modules</h2>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ModuleCard v-for="m in modules" :key="m.label" v-bind="m" />
          </div>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-semibold text-surface-900">Recent Activity</h2>
          <ActivityList :items="activity" />
        </section>
      </div>
    </div>
  </AppLayout>
</template>