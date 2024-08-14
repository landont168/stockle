import Alert from '@mui/material/Alert'
import CheckIcon from '@mui/icons-material/Check'

const Notification = ({ notification }) => {
  const { message, success } = notification
  const type = success ? 'success' : 'error'

  return (
    <Alert
      // icon={<CheckIcon fontSize='inherit' />}
      severity={type}
      sx={{ mt: 1 }}
    >
      {message}
    </Alert>
  )
}

export default Notification
