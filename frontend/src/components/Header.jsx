import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LoopRoundedIcon from '@mui/icons-material/LoopRounded'
import { IconButton } from '@mui/material'
import { useState } from 'react'

// components
import Tooltip from '@mui/material/Tooltip'
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import AccountMenu from './AccountMenu'

const Header = ({ user, logoutUser, darkMode, toggleTheme, refreshGame }) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showStats, setShowStats] = useState(false)

  return (
    <header className='header-container'>
      <h1 className='title'>Stockle</h1>
      <div className='icons'>
        <Tooltip title='Theme'>
          <IconButton onClick={() => toggleTheme()}>
            {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title='Leaderboard'>
          <IconButton onClick={() => setShowLeaderboard(true)}>
            <LeaderboardRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='New Game'>
          <IconButton onClick={() => refreshGame()}>
            <LoopRoundedIcon />
          </IconButton>
        </Tooltip>
        <AccountMenu
          setShowStats={setShowStats}
          initial={user.username[0]}
          logoutUser={logoutUser}
        />
      </div>
      {showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} userId={user.id} />
      )}
      {showStats && <Statistics setShowStats={setShowStats} />}
    </header>
  )
}

export default Header
