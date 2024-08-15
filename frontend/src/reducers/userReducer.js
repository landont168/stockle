import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return initialState
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      dispatch(setNotification('welcome!', true))
    } catch {
      dispatch(setNotification('wrong username or password', false))
    }
  }
}

export default userSlice.reducer
