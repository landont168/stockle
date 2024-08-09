const mongoose = require('mongoose')

const historiesSchema = new mongoose.Schema({
  stockHistory: [
    {
      date: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  // stockId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Stock',
  // },
})

historiesSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Histories', historiesSchema)
