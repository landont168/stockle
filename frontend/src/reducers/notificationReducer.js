import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, type) => {
  return async (dispatch) => {
    dispatch(addNotification({ message, type }))
  }
}

export default notificationSlice.reducer
