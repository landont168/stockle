import Modal from './Modal'
import LoginForm from './LoginForm'

const GuestForm = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <LoginForm />
    </Modal>
  )
}

export default GuestForm
