const historyRouter = require('express').Router()
const History = require('../models/history')

historyRouter.get('/', async (request, response) => {
  const history = await History.find({})
  response.json(history)
})

historyRouter.get('/:id', async (request, response) => {
  const history = await History.findById(request.params.id)
  response.json(history)
})

module.exports = historyRouter
