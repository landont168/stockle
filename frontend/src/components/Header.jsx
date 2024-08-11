import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'
import { IconButton } from '@mui/material'
import { useState } from 'react'

// components
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'

const Header = ({ user, logoutUser, darkMode, toggleTheme, refreshGame }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showStats, setShowStats] = useState(false)

  return (
    <header className='header-container'>
      <h1 className='title'>Stockle</h1>
      <div className='icons'>
        <IconButton onClick={() => toggleTheme()}>
          {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
        </IconButton>
        <IconButton onClick={() => setShowStats(true)}>
          <InsightsRoundedIcon />
        </IconButton>
        <IconButton onClick={() => setShowLeaderboard(true)}>
          <LeaderboardRoundedIcon />
        </IconButton>
        <IconButton onClick={() => refreshGame()}>
          <ReplayRoundedIcon />
        </IconButton>
        <IconButton onClick={() => logoutUser()}>
          <LogoutRoundedIcon />
        </IconButton>
      </div>

      {showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} />
      )}
      {showStats && <Statistics user={user} setShowStats={setShowStats} />}
    </header>
  )
}

export default Header
