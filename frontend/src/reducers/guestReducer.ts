import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const guestSlice = createSlice({
  name: 'isGuest',
  initialState,
  reducers: {
    setIsGuest(_, action) {
      return action.payload
    },
    resetIsGuest() {
      return initialState
    },
  },
})

export const { setIsGuest, resetIsGuest } = guestSlice.actions
export default guestSlice.reducer
