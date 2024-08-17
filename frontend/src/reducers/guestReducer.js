import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const guestSlice = createSlice({
  name: 'isGuest',
  initialState,
  reducers: {
    setIsGuest(state, action) {
      return action.payload
    },
  },
})

export const { setIsGuest } = guestSlice.actions
export default guestSlice.reducer
