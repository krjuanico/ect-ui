import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import 'primeicons/primeicons.css'
import './assets/css/base.css'

import App from './App.vue'
import router from './router'
import { DrmdPreset } from './primevue/preset'

const app = createApp(App)

// Pinia must be installed before the router, because the router guard uses the auth store.
app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
  theme: {
    preset: DrmdPreset,
    options: {
      // Light theme only. Nothing sets this class, so dark mode never turns on.
      darkModeSelector: '.app-dark',
      // Lets Tailwind utility classes override PrimeVue's own styles.
      cssLayer: { name: 'primevue', order: 'theme, base, primevue' },
    },
  },
})

app.mount('#app')