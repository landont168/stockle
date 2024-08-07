// express app
const express = require('express')
const app = express()

// imports
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const stocksRouter = require('./controllers/stocks')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

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
app.use(middleware.requestLogger)

// routes
app.use('/api/stocks', stocksRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

// error handling middleware
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
