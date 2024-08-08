import { configureStore } from '@reduxjs/toolkit'

import stockReducer from './reducers/stockReducer'
import guessReducer from './reducers/guessReducer'

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    guesses: guessReducer,
  },
})

export default store
