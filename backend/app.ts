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

const app = express()

// db connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log(`connected to ${config.MONGODB_URI}`)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// middleware
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.get('/', (req, res) => {
  res.send('Testing backend deployment...')
})

// routes
app.use('/api/stocks', stocksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// error handling middleware
app.use(unknownEndpoint)
app.use(errorHandler)

export default app