import { RiCloseLargeLine } from 'react-icons/ri'

const Modal = ({ won, attempts, solution, handleClose }) => {
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <div className='modal-header'>
          <button onClick={handleClose} className='modal-close-button'>
            <RiCloseLargeLine />
          </button>
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
