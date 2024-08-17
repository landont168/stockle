import Modal from './Modal'
import LoginForm from './LoginForm'

const CreateAccount = ({ setShow }) => {
  return (
    <Modal handleClose={() => setShow(false)}>
      <LoginForm />
    </Modal>
  )
}

export default CreateAccount
