import { DataGrid } from '@mui/x-data-grid'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { initializeUsers } from '../reducers/usersReducer'
import Modal from './Modal'
import { User, UserLeaderboard } from '../types'

interface LeaderboardProps {
  handleClose: () => void
}

const columns = [
  { field: 'id', headerName: 'Rank', flex: 1 },
  { field: 'username', headerName: 'Username', flex: 2 },
  { field: 'score', headerName: 'Won', flex: 1 },
]

const Leaderboard = ({ handleClose }: LeaderboardProps) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<User | null>((state) => state.user)
  const users = useAppSelector<User[]>((state) => state.users)
  const [sortedUsers, setSortedUsers] = useState<UserLeaderboard[]>([])

  if (!user || !users) return null

  // refetch users
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // sort users by games won
  useEffect(() => {
    const sortedUsers = [...users].sort((a, b) => b.gamesWon - a.gamesWon)
    setSortedUsers(
      sortedUsers.map((u, index) => {
        return {
          id: index + 1,
          username: u.id === user.id ? `${u.username} (You)` : u.username,
          score: u.gamesWon,
          isCurrentUser: u.id === user.id,
        }
      })
    )
  }, [users, user])

  return (
    <Modal handleClose={handleClose} title='Leaderboard'>
      <DataGrid
        rows={sortedUsers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableColumnMenu
        hideFooterSelectedRowCount
        disableColumnResize={true}
        isRowSelectable={(params) => params.row.isCurrentUser}
        getRowClassName={(params) =>
          params.row.isCurrentUser ? 'Mui-selected' : ''
        }
      />
    </Modal>
  )
}

export default Leaderboard
