import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { User } from 'types'
import { AppDispatch } from '../store'

const initialState: User[] = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(_, action: PayloadAction<User[]>) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch: AppDispatch) => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
