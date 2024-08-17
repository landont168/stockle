import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGuess, resetGuesses } from '../reducers/guessReducer'
import { updateUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const useGame = (solution) => {
  const dispatch = useDispatch()
  const guesses = useSelector((state) => state.guesses)
  const [attempts, setAttempts] = useState(0)
  const [guess, setGuess] = useState(null)
  const [won, setWon] = useState(null)
  const user = useSelector((state) => state.user)

  // validate original guess
  const handleGuess = (e) => {
    e.preventDefault()
    dispatch(removeNotification())

    // validate guess input
    if (!guess) {
      dispatch(setNotification('Please select a stock.', 'warning'))
      return
    }

    // check for duplicate guesses
    if (guesses.some((g) => g && g.id === guess.id)) {
      dispatch(
        setNotification('Already guessed. Guess a different stock.', 'warning')
      )
      return
    }
    addNewGuess()
  }

  // process a valid guess and updates stats on game end
  const addNewGuess = () => {
    const currentAttempt = attempts + 1
    if (solution.id === guess.id) {
      setWon(true)
      dispatch(updateUser(user.id, { won: true, attempts: currentAttempt }))
    } else if (currentAttempt === 6) {
      setWon(false)
      dispatch(updateUser(user.id, { won: false, attempts: currentAttempt }))
    }
    dispatch(addGuess({ guess, attempts }))
    setAttempts(currentAttempt)
    setGuess(null)
  }

  const resetGame = () => {
    dispatch(resetGuesses())
    setAttempts(0)
    setWon(null)
  }

  return { guess, setGuess, won, handleGuess, resetGame }
}

export default useGame
