import { IconButton } from '@mui/material'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import Tooltip from '@mui/material/Tooltip'
import Leaderboard from './Leaderboard'
import Statistics from './Statistics'
import Rules from './Rules'
import AccountMenu from './AccountMenu'
import GuestForm from './GuestForm'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetIsGuest } from '../reducers/guestReducer'
import { logoutUser } from '../reducers/userReducer'

const Header = ({
  darkMode,
  toggleTheme,
  resetGame,
  showStats,
  setShowStats,
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showRules, setShowRules] = useState(false)

  const closeRules = () => setShowRules(false)
  const closeLeaderboard = () => setShowLeaderboard(false)
  const closeStats = () => setShowStats(false)

  const returnHome = () => {
    user ? dispatch(logoutUser()) : null
    dispatch(resetIsGuest())
    resetGame()
  }

  return (
    <header className='header-container'>
      <div className='left-header-icons'>
        <Tooltip title='Rules'>
          <IconButton onClick={() => setShowRules(true)}>
            <HelpOutlineRoundedIcon />
          </IconButton>
        </Tooltip>
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
      </div>

      <h1 className='header-title' onClick={returnHome}>
        Stockle
      </h1>

      <div className='right-header-icons'>
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

      {showRules && <Rules handleClose={closeRules} />}
      {user && showLeaderboard && (
        <Leaderboard handleClose={closeLeaderboard} />
      )}
      {!user && showLeaderboard && <GuestForm handleClose={closeLeaderboard} />}
      {user && showStats && <Statistics handleClose={closeStats} />}
      {!user && showStats && <GuestForm handleClose={closeStats} />}
    </header>
  )
}

export default Header
