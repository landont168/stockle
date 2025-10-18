import { Request, Response } from 'express'
import { User as UserType, UserRegister, ErrorResponse, UserLogin } from '../types'

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

interface UserPutRequest extends Request<{ id: string }, {}, { won: boolean, attempts: number }> {
  user: UserType
}

usersRouter.get('/', async (_: Request, response: Response<UserType[]>) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request: Request<{}, {}, UserRegister>, response: Response<UserType | ErrorResponse>) => {
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

usersRouter.put('/:id', userExtractor, async (request: UserPutRequest, response: Response<UserLogin | ErrorResponse>) => {
  const user = request.user
  const { won, attempts } = request.body

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

usersRouter.delete('/', async (_: Request, response: Response<unknown>) => {
  await User.deleteMany({})
  response.status(204).end()
})

export default usersRouter
