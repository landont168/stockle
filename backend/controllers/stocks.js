const stocksRouter = require('express').Router()
const Stock = require('../models/stock')

stocksRouter.get('/', async (request, response) => {
  // deselect history to prevent conserve redux store
  const stocks = await Stock.find({}).select('-history')
  response.json(stocks)
})

stocksRouter.get('/:id', async (request, response) => {
  const stock = await Stock.findById(request.params.id)
  response.json(stock)
})

module.exports = stocksRouter
