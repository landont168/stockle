import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'
import { User, UserCredentials, UserRegister, GameResult } from 'types'
import { AppDispatch } from '../store'

const initialState = null as User | null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<User | null>) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch: AppDispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON) as User & { token: string }
        dispatch(setUser(user))
        userService.setToken(user.token)
      } catch {
        window.localStorage.removeItem('loggedUser')
      }
    }
  }
}

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      userService.setToken(user.token)
      dispatch(setNotification('Successfully logged in!', 'success'))
    } catch {
      dispatch(
        setNotification(
          'Failed to log in. Invalid username or password.',
          'error'
        )
      )
    }
  }
}

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    userService.setToken(null)
    dispatch(setNotification('Successfully logged out!', 'success'))
  }
}

export const signupUser = (newUser: UserRegister) => {
  return async (dispatch: AppDispatch) => {
    try {
      await userService.createUser(newUser)
      dispatch(setNotification('Account created successfully!', 'success'))
    } catch (error) {
      dispatch(
        setNotification(
          'Invalid password or username. Please try again.',
          'error'
        )
      )
      throw error
    }
  }
}

export const updateUser = (id: string, gameInfo: GameResult) => {
  return async (dispatch: AppDispatch) => {
    try {
      const updatedUser = await userService.updateUser(id, gameInfo)
      window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
      dispatch(setUser(updatedUser))
    } catch {
      dispatch(
        setNotification('Your session has expired. Please re-log in.', 'error')
      )
    }
  }
}

export default userSlice.reducer
