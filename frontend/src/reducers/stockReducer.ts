import { createSlice } from '@reduxjs/toolkit'
import stockService from '../services/stocks'

const stockSlice = createSlice({
  name: 'stocks',
  initialState: [],
  reducers: {
    setStocks(_, action) {
      return action.payload
    },
  },
})

export const { setStocks } = stockSlice.actions

export const initializeStocks = () => {
  return async (dispatch: any) => {
    const stocks = await stockService.getAll()
    dispatch(setStocks(stocks))
  }
}

export default stockSlice.reducer
