import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import stockService from '../services/stocks'
import { Stock } from 'types'
import { AppDispatch } from '../store'

const initialState: Stock[] = []

const BILLION = 1000000000
const MARKET_CAP_THRESHOLD = 25 * BILLION // $25B

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
    const filteredStocks = stocks.filter((stock: Stock) => stock.marketCap > MARKET_CAP_THRESHOLD)
    dispatch(setStocks(filteredStocks))
  }
}

export default stockSlice.reducer
