import ModalTemplate from './ModalTemplate'

const GameOver = ({ won, attempts, solution, handleClose }) => {
  return (
    <ModalTemplate handleClose={handleClose}>
      {won && (
        <div className='modal-content'>
          <h1>Congratulations!</h1>
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
    </ModalTemplate>
  )
}

export default GameOver
