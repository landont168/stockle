const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    required: true,
  },
  gamesWon: {
    type: Number,
    required: true,
  },
  currentStreak: {
    type: Number,
    required: true,
  },
  maxStreak: {
    type: Number,
    required: true,
  },
  wonLastGame: {
    type: Boolean,
    required: true,
  },
  guessDistribution: {
    type: Array,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
