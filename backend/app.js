// express app
const express = require('express')
const app = express()

// imports
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const cors = require('cors')

// controllers

// connect to db
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
app.get('/', (request, response) => {
  response.json({ msg: 'hello world!' })
})

// unknown endpoint
app.use(middleware.unknownEndpoint)

module.exports = app
