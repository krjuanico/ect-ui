import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

// Aura theme using the same primary palette as assets/css/theme.css (DSWD indigo = primary.900).
export const DrmdPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#edf3ff',
      100: '#dee8ff',
      200: '#c4d4ff',
      300: '#a1b7ff',
      400: '#7b90fe',
      500: '#5c69f8',
      600: '#3e40ed',
      700: '#3231d1',
      800: '#2a2aa9',
      900: '#2e3192',
      950: '#19194d',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.900}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.950}',
          activeColor: '{primary.950}',
        },
      },
    },
  },
  components: {
    inputtext: {
      colorScheme: {
        light: {
          root: {
            background: '#e9effb',
            borderColor: '#d6e0f5',
          },
        },
      },
    },
  },
})