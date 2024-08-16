import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import Tooltip from '@mui/material/Tooltip'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import AccountMenu from './AccountMenu'

const Header = ({
  darkMode,
  toggleTheme,
  refreshGame,
  showStats,
  setShowStats,
}) => {
  const user = useSelector((state) => state.user)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  return (
    <header className='header-container'>
      <h1 className='header-title'>Stockle</h1>
      <div className='header-icons'>
        <Tooltip title={'Theme'}>
          <IconButton onClick={() => toggleTheme()}>
            {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title='Leaderboard'>
          <IconButton onClick={() => setShowLeaderboard(true)}>
            <LeaderboardRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Shuffle'>
          <IconButton onClick={() => refreshGame()}>
            <ShuffleRoundedIcon />
          </IconButton>
        </Tooltip>
        <AccountMenu
          initial={user.username[0]}
          setShowStats={setShowStats}
          refreshGame={refreshGame}
        />
      </div>
      {showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} />
      )}
      {showStats && <Statistics setShowStats={setShowStats} text='History' />}
    </header>
  )
}

export default Header
