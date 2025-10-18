import { Request, Response } from 'express'
const stocksRouter = require('express').Router()
import Stock from '../models/stock'
import { Stock as StockType } from '../types'

stocksRouter.get('/', async (_: Request, response: Response<StockType[]>) => {
  const stocks = await Stock.find({}).select('-history')
  response.json(stocks)
})

stocksRouter.get('/:id', async (request: Request<{ id: string }>, response: Response<StockType | null>) => {
  const stock = await Stock.findById(request.params.id)
  response.json(stock)
})

stocksRouter.delete('/', async (_: Request, response: Response<unknown>) => {
  await Stock.deleteMany({})
  response.status(204).send()
})

export default stocksRouter
