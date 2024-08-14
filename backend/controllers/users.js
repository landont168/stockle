const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // validate password
  if (!(password && password.length >= 3)) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' })
  }

  // hash password with bcrypt
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // save user to db
  const user = new User({
    username,
    name,
    passwordHash,
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    wonLastGame: false,
    guessDistribution: Array(6).fill(0),
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { wonGame, attempts } = request.body

  // get user and update stats
  const user = await User.findById(id)
  const newCurrentStreak = wonGame ? user.currentStreak + 1 : 0
  const updatedFields = {
    gamesPlayed: user.gamesPlayed + 1,
    gamesWon: wonGame ? user.gamesWon + 1 : user.gamesWon,
    currentStreak: newCurrentStreak,
    maxStreak: Math.max(user.maxStreak, newCurrentStreak),
    wonLastGame: wonGame,
    guessDistribution: wonGame
      ? user.guessDistribution.map((freq, index) => {
          return index === attempts ? freq + 1 : freq
        })
      : user.guessDistribution,
  }

  // update user stats in db
  const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
    new: true,
  })
  response.json(updatedUser)
})

usersRouter.delete('/', async (request, response) => {
  await User.deleteMany({})
  response.status(204).end()
})

module.exports = usersRouter
