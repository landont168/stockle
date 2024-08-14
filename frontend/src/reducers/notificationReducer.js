import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', success: null },
  reducers: {
    addNotification(state, action) {
      return {
        message: action.payload.message,
        success: action.payload.success,
      }
    },
    removeNotification() {
      return { message: '', success: null }
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, success) => {
  return async (dispatch) => {
    dispatch(addNotification({ message, success }))
  }
}

export default notificationSlice.reducer
