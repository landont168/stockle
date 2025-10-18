import mongoose, { Schema } from 'mongoose'
import { Stock, StockHistory } from '../types'

const stockHistorySchema: Schema<StockHistory> = new mongoose.Schema({
  date: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
}, { _id: false })

const stockSchema: Schema<Stock> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  sharePrice: {
    type: Number,
    required: true,
  },
  revenue: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  history: {
    type: [stockHistorySchema],
    required: true,
  },
})

stockSchema.set('toJSON', {
  transform: (_, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model<Stock>('Stock', stockSchema)
