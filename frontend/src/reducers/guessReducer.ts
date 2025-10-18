import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Stock } from 'types'

interface Guess {
  guess: Stock,
  attempts: number
}

const initialState: Stock[] = [...Array(6)]

const guessSlice = createSlice({
  name: 'guesses',
  initialState,
  reducers: {
    addGuess(state, action: PayloadAction<Guess>) {
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
