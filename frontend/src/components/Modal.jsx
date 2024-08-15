import { IconButton } from '@mui/material'
import { Modal, Box } from '@mui/material'
import { useTheme } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'

const Popup = ({ children, handleClose }) => {
  const theme = useTheme()
  return (
    <Modal open onClose={handleClose}>
      <Box
        className='modal-container'
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: 2,
          borderRadius: 1,
          boxShadow: theme.shadows[5],
        }}
      >
        <div className='modal-header'>
          <IconButton onClick={handleClose} className='modal-close-button'>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='modal-content'>{children}</div>
      </Box>
    </Modal>
  )
}

export default Popup
