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
import CreateAccount from './CreateAccount'

const Header = ({
  darkMode,
  toggleTheme,
  resetGame,
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
          <IconButton onClick={() => resetGame()}>
            <ShuffleRoundedIcon />
          </IconButton>
        </Tooltip>
        <AccountMenu setShowStats={setShowStats} resetGame={resetGame} />
      </div>
      {user && showLeaderboard && (
        <Leaderboard setShowLeaderboard={setShowLeaderboard} />
      )}
      {!user && showLeaderboard && (
        <CreateAccount setShow={setShowLeaderboard} />
      )}
      {user && showStats && (
        <Statistics setShowStats={setShowStats} text='History' />
      )}
      {!user && showStats && <CreateAccount setShow={setShowStats} />}
    </header>
  )
}

export default Header
