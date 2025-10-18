import { Request, Response, Router } from 'express'
import { ErrorResponse, UserCredentials, UserLogin } from '../types'
import config from '../utils/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'

const loginRouter = Router()

loginRouter.post('/', async (request: Request<{}, {}, UserCredentials>, response: Response<UserLogin | ErrorResponse>) => {
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

export default loginRouter
