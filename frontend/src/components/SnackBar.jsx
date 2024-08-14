import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useState } from 'react'

import { removeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const SnackBar = ({ notification }) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)

  console.log(notification)

  const type = notification.success ? 'success' : 'error'

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(removeNotification())
    setOpen(false)
  }

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          severity={type}
          // variant='filled'
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackBar
