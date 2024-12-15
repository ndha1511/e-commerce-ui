import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {

    include: [
      '@emotion/react', 
    ],
    exclude: ['js-big-decimal']
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  define: {
    global: 'window'
  },
})
