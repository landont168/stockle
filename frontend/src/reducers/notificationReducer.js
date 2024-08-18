import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeout = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, type) => {
  return async (dispatch) => {
    // cancel previous timeout
    if (timeout) {
      clearTimeout(timeout)
    }

    dispatch(addNotification({ message, type }))

    timeout = setTimeout(() => {
      dispatch(removeNotification())
    }, 10000)
  }
}

export default notificationSlice.reducer
