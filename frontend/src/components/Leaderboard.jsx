import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { initializeUsers } from '../reducers/usersReducer'

import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Leaderboard = ({ setShowLeaderboard }) => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  console.log(users)

  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <div className='modal-header'>
          <IconButton
            onClick={() => setShowLeaderboard(false)}
            className='modal-close-button'
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className='modal-leaderboard'>
          <h1>Leaderboard</h1>
          {users.map((user) => (
            <p key={user.username}>{user.username}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
