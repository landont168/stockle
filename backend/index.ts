import { shutdownTelemetry } from './utils/telemetry'
import app from './app'
import config from './utils/config'

// listen to requests from port
const server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}!`)
})

const shutdown = () => {
  server.close(() => {
    shutdownTelemetry()
      .catch(() => {
        // The process is already terminating; telemetry must not block shutdown.
      })
      .finally(() => process.exit(0))
  })
}

process.once('SIGTERM', shutdown)
process.once('SIGINT', shutdown)
