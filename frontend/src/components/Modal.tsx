import { IconButton } from '@mui/material'
import { Modal, Box } from '@mui/material'
import { useTheme } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'

interface BasicModalProps {
  children: React.ReactNode
  handleClose: () => void
  title: string
}

const BasicModal = ({ children, handleClose, title }: BasicModalProps) => {
  const theme = useTheme()

  return (
    <Modal
      open
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        sx={{
          width: '80%',
          maxWidth: '500px',
          height: 'auto',
          maxHeight: '80vh',
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: 2,
          borderRadius: 1,
        }}
      >
        <div className='modal-header'>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className='modal-content'>
          <h1 className='modal-title'>{title}</h1>
          {children}
        </div>
      </Box>
    </Modal>
  )
}

export default BasicModal
