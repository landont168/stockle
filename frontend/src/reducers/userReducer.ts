import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'
import { User, UserCredentials, UserRegister } from 'types'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch: any) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      userService.setToken(user.token)
    }
  }
}

export const loginUser = (credentials: UserCredentials) => {
  return async (dispatch: any) => {
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
  return async (dispatch: any) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
    userService.setToken(null)
    dispatch(setNotification('Successfully logged out!', 'success'))
  }
}

export const signupUser = (newUser: UserRegister) => {
  return async (dispatch: any) => {
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

export const updateUser = (id: number, gameInfo: User) => {
  return async (dispatch: any) => {
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
