import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: { include: ['@mui/x-data-grid'] },
  server: {
    host: true,
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:4000', changeOrigin: true } }
  }
})