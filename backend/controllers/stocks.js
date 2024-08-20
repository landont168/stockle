const stocksRouter = require('express').Router()
const Stock = require('../models/stock')

stocksRouter.get('/', async (request, response) => {
  const stocks = await Stock.find({}).select('-history')
  response.json(stocks)
})

stocksRouter.get('/:id', async (request, response) => {
  const stock = await Stock.findById(request.params.id)
  response.json(stock)
})

stocksRouter.delete('/', async (request, response) => {
  await Stock.deleteMany({})
  response.status(204).end()
})

module.exports = stocksRouter
