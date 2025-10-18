import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StockGuess } from 'types'

interface Guess {
  guess: StockGuess,
  attempts: number
}

const initialState: StockGuess[] = [...Array(6)]

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
