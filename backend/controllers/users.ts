import { Request, Response, Router } from 'express'
import { User as UserType, UserRegister, ErrorResponse, UserLogin, GameResult } from '../types'
import bcrypt from 'bcrypt'
import User from '../models/user'
import { userExtractor, RequestWithUser } from '../utils/middleware'

const usersRouter = Router()

usersRouter.get('/', async (_: Request, response: Response<UserType[]>) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request: Request<object, object, UserRegister>, response: Response<UserType | ErrorResponse>) => {
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

usersRouter.put('/:id', userExtractor, async (request: Request<{ id: string }, object, GameResult>, response: Response<UserLogin | ErrorResponse>) => {
  const user = (request as unknown as RequestWithUser).user

  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const { won, attempts } = request.body

  if (typeof won !== 'boolean' || typeof attempts !== 'number' || attempts < 1 || attempts > 6) {
    return response.status(400).json({ error: 'invalid game result' })
  }

  // get user and update stats
  const newCurrentStreak = won ? user.currentStreak + 1 : 0
  const updatedFields = {
    gamesPlayed: user.gamesPlayed + 1,
    gamesWon: won ? user.gamesWon + 1 : user.gamesWon,
    currentStreak: newCurrentStreak,
    maxStreak: Math.max(user.maxStreak, newCurrentStreak),
    wonLastGame: won,
    guessDistribution: won
      ? user.guessDistribution.map((freq: number, index: number) => {
        return index + 1 === attempts ? freq + 1 : freq
      })
      : user.guessDistribution,
  }
  // update user stats in db
  await User.findByIdAndUpdate(user.id, updatedFields, {
    new: true,
  })

  // format user object to send back to client
  const token = request.headers['authorization']?.split(' ')[1] || ''

  const newUser = {
    token,
    username: user.username,
    name: user.name,
    id: user.id,
    ...updatedFields,
  }
  response.json(newUser)
})

export default usersRouter
