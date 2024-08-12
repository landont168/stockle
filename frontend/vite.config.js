import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/x-data-grid'],
  },
  server: {
    // ensures vite listens to all network interfaces (not just localhost)
    host: true,
    port: 5173,
    // proxy api requests to backend server
    proxy: {
      '/api': {
        target: 'http://backend:4000',
        changeOrigin: true,
      },
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:4000',
    //     changeOrigin: true,
    //   },
  },
})
