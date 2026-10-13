// set up express app
import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './utils/config'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware'
import stocksRouter from './controllers/stocks'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import diagnosticsRouter from './controllers/diagnostics'

const app = express()

// db connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(() => {
    console.error('Failed to connect to MongoDB')
  })

// middleware
app.use(cors())
app.use(requestLogger)
app.use(express.json())

app.get('/health/live', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/health/ready', (_request, response) => {
  if (mongoose.connection.readyState === 1) {
    return response.json({ status: 'ready' })
  }

  return response.status(503).json({ status: 'not ready' })
})

app.get('/', (req, res) => {
  res.send('Testing backend deployment...')
})

// routes
app.use('/api/stocks', stocksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (config.NODE_ENV !== 'production' && config.OBSERVABILITY_DEMO_ENABLED) {
  app.use('/api/diagnostics', diagnosticsRouter)
}

// error handling middleware
app.use(unknownEndpoint)
app.use(errorHandler)

export default app
