import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeout: NodeJS.Timeout | null = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(_, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message: string, type?: string) => {
  return async (dispatch: any) => {
    // cancel previous timeout
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
