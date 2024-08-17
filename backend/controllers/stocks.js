const stocksRouter = require('express').Router()
const Stock = require('../models/stock')
const History = require('../models/history')

stocksRouter.get('/', async (request, response) => {
  const stocks = await Stock.find({})
  response.json(stocks)
})

stocksRouter.get('/:id', async (request, response) => {
  const stock = await Stock.findById(request.params.id).populate({
    path: 'history',
    select: 'stockHistory',
    transform: (doc) => doc.stockHistory,
  })
  response.json(stock)
})

module.exports = stocksRouter
