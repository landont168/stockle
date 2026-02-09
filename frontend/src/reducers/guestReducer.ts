import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = null as boolean | null

const guestSlice = createSlice({
  name: 'isGuest',
  initialState,
  reducers: {
    setIsGuest(_, action: PayloadAction<boolean>) {
      return action.payload
    },
    resetIsGuest() {
      return initialState
    },
  },
})

export const { setIsGuest, resetIsGuest } = guestSlice.actions
export default guestSlice.reducer
