import { useState, Fragment } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'

// icons
import { IconButton } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'

const AccountMenu = ({ setShowStats, initial, logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account'>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: 'primary.main',
                fontSize: 18,
              }}
            >
              {initial.toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
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
        <MenuItem onClick={() => setShowStats(true)}>
          <InsightsRoundedIcon sx={{ mr: 1 }} />
          Statistics
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => logoutUser()}>
          <LogoutRoundedIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default AccountMenu
