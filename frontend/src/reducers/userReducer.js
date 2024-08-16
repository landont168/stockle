import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
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

export const signupUser = (newUser) => {
  return async (dispatch) => {
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

export const updateUser = (id, gameInfo) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.updateUser(id, gameInfo)
      window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
      dispatch(setUser(updatedUser))
    } catch {
      dispatch(setNotification('Failed to update user.', 'error'))
    }
  }
}

export default userSlice.reducer
