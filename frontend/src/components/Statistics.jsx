import Modal from './Modal'

const Statistics = ({ user, setShowStats }) => {
  return (
    <Modal handleClose={() => setShowStats(false)}>
      <h1>Statistics</h1>
      <div>Username: {user.username}</div>
      <div>Name: {user.name}</div>
    </Modal>
  )
}

export default Statistics
