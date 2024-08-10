import ModalTemplate from './ModalTemplate'

const Statistics = ({ user, setShowStats }) => {
  return (
    <ModalTemplate handleClose={() => setShowStats(false)}>
      <h1>Statistics</h1>
      <div>Username: {user.username}</div>
      <div>Name: {user.name}</div>
    </ModalTemplate>
  )
}

export default Statistics
