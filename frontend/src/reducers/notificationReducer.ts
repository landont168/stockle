import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationInfo } from 'types'
import { AppDispatch } from '../store'

const initialState = null as NotificationInfo | null
let timeout: NodeJS.Timeout | null = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(_, action: PayloadAction<NotificationInfo>) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message: string, type?: NotificationInfo['type']) => {
  return (dispatch: AppDispatch) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    dispatch(addNotification({ message, type }))

    timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, 8000)
  }
}

export default notificationSlice.reducer
