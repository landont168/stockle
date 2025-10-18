import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Fade from '@mui/material/Fade'
import { NotificationInfo } from '../types'

interface NotificationProps {
  notification: NotificationInfo
}
const Notification = ({ notification }: NotificationProps) => {
  const { message, type } = notification

  return (
    <Fade in={true} timeout={500}>
      <Snackbar open={true}>
        <Alert severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Fade>
  )
}

export default Notification
