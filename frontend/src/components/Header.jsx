import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import { IconButton } from '@mui/material'

import Leaderboard from './Leaderboard'
import { useState } from 'react'

const Header = ({ logoutUser, darkMode, toggleTheme }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return (
    <header className='header-container'>
      <h1 className='title'>Stockle</h1>
      <div className='icons'>
        <IconButton onClick={() => toggleTheme()}>
          {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
        <IconButton onClick={() => setShowLeaderboard(true)}>
          <QueryStatsRoundedIcon />
        </IconButton>
        <IconButton onClick={() => setShowLeaderboard(true)}>
          <LeaderboardRoundedIcon />
        </IconButton>
        <IconButton>
          <HelpOutlineRoundedIcon />
        </IconButton>
        <IconButton>
          <SettingsRoundedIcon />
        </IconButton>
        <IconButton onClick={() => logoutUser()}>
          <LogoutRoundedIcon />
        </IconButton>
      </div>
      {showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} />
      )}
    </header>
  )
}

export default Header
