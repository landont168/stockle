import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'http://localhost:4000'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: { include: ['@mui/x-data-grid'] },
  server: {
    host: true,
    port: 5173,
    proxy: { '/api': { target: apiProxyTarget, changeOrigin: true } }
  }
})
