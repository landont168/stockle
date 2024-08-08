import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import { IconButton } from '@mui/material'

const Header = ({ logoutUser }) => {
  return (
    <header className='header-container'>
      <h1 className='title'>Stockle</h1>
      <div className='icons'>
        <IconButton>
          <LeaderboardIcon />
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton onClick={() => logoutUser()}>
          <LogoutIcon />
        </IconButton>
      </div>
    </header>
  )
}

export default Header
