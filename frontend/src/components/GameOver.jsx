import Modal from './Modal'

const GameOver = ({ won, attempts, solution, handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
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
    </Modal>
  )
}

export default GameOver
