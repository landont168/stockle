import { IconButton } from '@mui/material'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import Tooltip from '@mui/material/Tooltip'
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import AccountMenu from './AccountMenu'
import CreateAccount from './CreateAccount'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Header = ({
  darkMode,
  toggleTheme,
  resetGame,
  showStats,
  setShowStats,
}) => {
  const user = useSelector((state) => state.user)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const closeLeaderboard = () => setShowLeaderboard(false)
  const closeStats = () => setShowStats(false)

  return (
    <header className='header-container'>
      <h1 className='header-title'>Stockle</h1>
      <div className='header-icons'>
        <Tooltip title={'Theme'}>
          <IconButton onClick={() => toggleTheme()}>
            {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Tooltip>
        <Tooltip title='Shuffle'>
          <IconButton onClick={() => resetGame()}>
            <ShuffleRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Leaderboard'>
          <IconButton onClick={() => setShowLeaderboard(true)}>
            <LeaderboardRoundedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Statistics'>
          <IconButton onClick={() => setShowStats(true)}>
            <InsightsRoundedIcon />
          </IconButton>
        </Tooltip>
        <AccountMenu resetGame={resetGame} />
      </div>

      {user && showLeaderboard && (
        <Leaderboard handleClose={closeLeaderboard} />
      )}
      {!user && showLeaderboard && (
        <CreateAccount handleClose={closeLeaderboard} />
      )}

      {user && showStats && <Statistics handleClose={closeStats} />}
      {!user && showStats && <CreateAccount handleClose={closeStats} />}
    </header>
  )
}

export default Header
