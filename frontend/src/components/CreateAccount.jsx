import Modal from './Modal'
import LoginForm from './LoginForm'

const CreateAccount = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <LoginForm />
    </Modal>
  )
}

export default CreateAccount
