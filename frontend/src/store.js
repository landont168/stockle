import { configureStore } from '@reduxjs/toolkit'

import stockReducer from './reducers/stockReducer'
import guessReducer from './reducers/guessReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    stocks: stockReducer,
    guesses: guessReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
})

export default store
