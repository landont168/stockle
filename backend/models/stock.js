const mongoose = require('mongoose')

const stockHistorySchema = new mongoose.Schema({
  _id: false,
  date: { type: String, required: true },
  price: { type: Number, required: true },
})

const stockSchema = new mongoose.Schema({
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
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Stock', stockSchema)
