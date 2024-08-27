import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'
dotenv.config()
const API_TARGET_URL = process.env.VITE_API_URL

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/x-data-grid'],
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET_URL,
        changeOrigin: true,
      },
    },
  },
})
