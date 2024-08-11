import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useState, useEffect } from 'react'
import ModalTemplate from './ModalTemplate'
import DataTable from './DataTable'

const Leaderboard = ({ setShowLeaderboard }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [sortedUsers, setSortedUsers] = useState([])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // sort users by score and format to display in the leaderboard
  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => b.gamesWon - a.gamesWon)
    setSortedUsers(
      sortedUsers.map((user, index) => {
        return {
          id: index + 1,
          username: user.username,
          score: user.gamesWon,
        }
      })
    )
  }, [users])

  console.log(sortedUsers)

  return (
    <ModalTemplate handleClose={() => setShowLeaderboard(false)}>
      <div>
        <h1 className='modal-title'>Leaderboard</h1>
        <DataTable rows={sortedUsers} />
      </div>
    </ModalTemplate>
  )
}

export default Leaderboard
