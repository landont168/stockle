import { configureStore } from '@reduxjs/toolkit'
import stockReducer from './reducers/stockReducer'
import guessReducer from './reducers/guessReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

// set up redux store
const store = configureStore({
  reducer: {
    stocks: stockReducer,
    guesses: guessReducer,
    user: userReducer,
    users: usersReducer,
    notification: notificationReducer,
  },
})

export default store
