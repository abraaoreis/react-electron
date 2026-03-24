import { defineConfig } from 'vitebook/config'

export default defineConfig({
  include: ['src/**/*.story.tsx', 'src/**/*.stories.tsx'],
  theme: {
    colors: {
      primary: '#1976d2',
      secondary: '#dc004e',
    },
  },
})
