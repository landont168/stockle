import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { IconButton } from '@mui/material'

import Leaderboard from './Leaderboard'

import { useState } from 'react'

const Header = ({ logoutUser }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return (
    <header className='header-container'>
      <h1 className='title'>Stockle</h1>
      <div className='icons'>
        <IconButton onClick={() => setShowLeaderboard(true)}>
          <LeaderboardIcon />
        </IconButton>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => logoutUser()}>
          <LogoutIcon />
        </IconButton>
      </div>
      {showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} />
      )}
    </header>
  )
}

export default Header
