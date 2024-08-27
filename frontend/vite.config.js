import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const API_TARGET_URL = env.VITE_API_URL
  console.log(API_TARGET_URL)

  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['@mui/x-data-grid'],
    },
    server: {
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://ecs-lb-1832096966.us-east-1.elb.amazonaws.com/',
          changeOrigin: true,
        },
      },
    },
  }
})
