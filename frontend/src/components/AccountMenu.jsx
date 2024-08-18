import { IconButton } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import GuestForm from './GuestForm'
import { useState, Fragment } from 'react'
import { logoutUser } from '../reducers/userReducer'
import { resetIsGuest } from '../reducers/guestReducer'
import { useDispatch, useSelector } from 'react-redux'

const AccountMenu = ({ resetGame }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutGame = () => {
    dispatch(logoutUser())
    dispatch(resetIsGuest())
    resetGame()
  }

  return (
    <Fragment>
      <Box>
        <Tooltip title='Account'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              src='/broken-image.jpg'
              sx={{
                width: 30,
                height: 30,
                bgcolor: 'primary.main',
                fontSize: 18,
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {user && open && (
        <Menu
          anchorEl={anchorEl}
          id='account-menu'
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          sx={{ mt: 0.5 }}
        >
          <MenuItem onClick={() => logoutGame()}>
            <LogoutRoundedIcon sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      )}
      {!user && open && <GuestForm handleClose={handleClose} />}
    </Fragment>
  )
}

export default AccountMenu
