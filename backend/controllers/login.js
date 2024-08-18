const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // verify password for user
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  // create token
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

  // send user object with token
  const userObject = {
    token,
    username: user.username,
    name: user.name,
    id: user.id,
    gamesPlayed: user.gamesPlayed,
    gamesWon: user.gamesWon,
    currentStreak: user.currentStreak,
    maxStreak: user.maxStreak,
    wonLastGame: user.wonLastGame,
    guessDistribution: user.guessDistribution,
  }
  response.status(200).send(userObject)
})

module.exports = loginRouter
