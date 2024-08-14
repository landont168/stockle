const stocksRouter = require('express').Router()
const Stock = require('../models/stock')

stocksRouter.get('/', async (request, response) => {
  const stocks = await Stock.find({})
  response.json(stocks)
})

stocksRouter.get('/:id', async (request, response) => {
  const stock = await Stock.findById(request.params.id)
  response.json(stock)
})

module.exports = stocksRouter
