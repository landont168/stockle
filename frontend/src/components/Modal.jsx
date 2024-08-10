import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Modal = ({ children, handleClose }) => {
  return (
    <div className='modal-background'>
      <div className='modal-container fade-in'>
        <div className='modal-header'>
          <IconButton onClick={handleClose} className='modal-close-button'>
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
