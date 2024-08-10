import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import Modal from './ModalTemplate'

const Leaderboard = ({ setShowLeaderboard }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(users)

  return (
    <Modal handleClose={() => setShowLeaderboard(false)}>
      <div className='modal-leaderboard'>
        <h1>Leaderboard</h1>
        {users.map((user) => (
          <p key={user.username}>{user.username}</p>
        ))}
      </div>
    </Modal>
  )
}

export default Leaderboard
