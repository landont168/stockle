import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Modal from './Modal'

const columns = [
  { field: 'id', headerName: 'Rank', width: 100 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'score', headerName: 'Won', width: 90 },
]

const Leaderboard = ({ setShowLeaderboard }) => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const [sortedUsers, setSortedUsers] = useState([])

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

  // display leaderboard with mui datagrid
  return (
    <Modal handleClose={() => setShowLeaderboard(false)}>
      <h1 className='modal-title'>Leaderboard</h1>
      <div style={{ height: '100%', width: '100%' }}>
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
      </div>
    </Modal>
  )
}

export default Leaderboard
