import { Request, Response, NextFunction } from 'express'
import { User as UserType } from '../types'
import jwt from 'jsonwebtoken'
import User from '../models/user'

interface RequestWithUser extends Request {
  user?: UserType
}

const requestLogger = (request: Request, _: Response, next: NextFunction) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (_: Request, response: Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error: Error, _: Request, response: Response, next: NextFunction) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    return response
      .status(400)
      .json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    })
  }
  next(error)
}

// extract token from request header
const getTokenFrom = (request: Request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// extract user based on token
const userExtractor = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const token = getTokenFrom(request)

  if (!token) {
    return response.status(401).json({ error: 'token missimg' })
  }

  const secret = process.env.SECRET

  if (!secret) {
    return response.status(401).json({ error: 'secret missing' })
  }

  const decodedToken = jwt.verify(token, secret) as jwt.JwtPayload
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // find user with decoded token
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'user not found' })
  }

  request.user = user as UserType
  next()
}

export { requestLogger, unknownEndpoint, errorHandler, userExtractor }