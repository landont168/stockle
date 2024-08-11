const mongoose = require('mongoose')

const historiesSchema = new mongoose.Schema({
  stockHistory: [
    {
      _id: false,
      date: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
})

historiesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Histories', historiesSchema)