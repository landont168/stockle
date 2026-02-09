import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import stockService from '../services/stocks'
import { Stock } from 'types'
import { AppDispatch } from '../store'

const initialState: Stock[] = []

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setStocks(_, action: PayloadAction<Stock[]>) {
      return action.payload
    },
  },
})

export const { setStocks } = stockSlice.actions

export const initializeStocks = () => {
  return async (dispatch: AppDispatch) => {
    const stocks = await stockService.getAll()
    dispatch(setStocks(stocks))
  }
}

export default stockSlice.reducer
