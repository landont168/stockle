import { configureStore } from '@reduxjs/toolkit'

import stockReducer from './reducers/stockReducer'

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
})

export default store
