import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useState } from 'react'
import { removeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Notification = ({ notification }) => {
  const dispatch = useDispatch()
  const { message, type } = notification
  const [open, setOpen] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(removeNotification())
    setOpen(false)
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
