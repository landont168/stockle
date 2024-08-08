import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const Modal = ({ won, attempts, solution, handleClose }) => {
  return (
    <div className='modal-background'>
      <div className='modal-container fade-in'>
        <div className='modal-header'>
          <IconButton onClick={handleClose} className='modal-close-button'>
            <CloseIcon />
          </IconButton>
        </div>
        {won && (
          <div className='modal-content'>
            <h1>Congratulations, you won!</h1>
            <p>Answer: {solution.name}</p>
            <p>You guessed the stock in {attempts} guesses!</p>
          </div>
        )}
        {!won && (
          <div className='modal-content'>
            <h1>Sorry, you lost!</h1>
            <p>Answer: {solution.name}</p>
            <p>Better luck next time!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
