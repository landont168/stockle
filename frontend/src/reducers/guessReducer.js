import { createSlice } from '@reduxjs/toolkit'

const guessSlice = createSlice({
  name: 'guesses',
  initialState: [...Array(6)],
  reducers: {
    addGuess(state, action) {
      const { guess, attempts } = action.payload
      const newGuesses = [...state]
      newGuesses[attempts] = guess
      return newGuesses
    },
    resetGuesses() {
      return [...Array(6)]
    },
  },
})

export const { addGuess, resetGuesses } = guessSlice.actions
export default guessSlice.reducer
