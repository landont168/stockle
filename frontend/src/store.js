import { configureStore } from '@reduxjs/toolkit'

import stockReducer from './reducers/stockReducer'
import guessReducer from './reducers/guessReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    guesses: guessReducer,
    users: usersReducer,
  },
})

export default store
