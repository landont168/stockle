import Modal from './Modal'
import LoginForm from './LoginForm'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const GuestForm = ({ handleClose }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(
      setNotification(
        'Please log in or create an account to access game features.',
        'warning'
      )
    )
  }, [dispatch])

  return (
    <Modal handleClose={handleClose}>
      <LoginForm />
    </Modal>
  )
}

export default GuestForm
