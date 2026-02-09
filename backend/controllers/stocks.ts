import { Request, Response, Router } from 'express'
import Stock from '../models/stock'
import { Stock as StockType, ErrorResponse } from '../types'

const stocksRouter = Router()

stocksRouter.get('/', async (_: Request, response: Response<StockType[]>) => {
  const stocks = await Stock.find({}).select('-history')
  response.json(stocks)
})

stocksRouter.get('/:id', async (request: Request<{ id: string }>, response: Response<StockType | ErrorResponse>) => {
  const stock = await Stock.findById(request.params.id)
  if (!stock) {
    return response.status(404).json({ error: 'stock not found' })
  }
  response.json(stock)
})

export default stocksRouter
