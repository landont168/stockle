const stocksRouter = require('express').Router()
const Stock = require('../models/stock')

stocksRouter.get('/', async (request, response) => {
  const stocks = await Stock.find({})
  response.json(stocks)
})

module.exports = stocksRouter
