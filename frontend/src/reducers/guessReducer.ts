import { createSlice } from '@reduxjs/toolkit'

const initialState = [...Array(6)]

const guessSlice = createSlice({
  name: 'guesses',
  initialState,
  reducers: {
    addGuess(state, action) {
      const { guess, attempts } = action.payload
      const newGuesses = [...state]
      newGuesses[attempts] = guess
      return newGuesses
    },
    resetGuesses() {
      return initialState
    },
  },
})

export const { addGuess, resetGuesses } = guessSlice.actions
export default guessSlice.reducer
