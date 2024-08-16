import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGuess } from '../reducers/guessReducer'

const useGame = (solution) => {
  const dispatch = useDispatch()
  const [attempts, setAttempts] = useState(0)
  const [guess, setGuess] = useState(null)
  const [guesses] = useSelector((state) => state.guesses)
  const [won, setWon] = useState(false)

  // process a valid guess - add to guesses state, update won if correct, increment attempts
  const addNewGuess = () => {
    if (solution.id === guess.id) {
      setWon(true)
    }
    dispatch(addGuess({ guess, attempts }))
    setAttempts(attempts + 1)
    setGuess(null)
  }

  // handle a guess - validate input, check for duplicates, add valid guess
  const handleGuess = (e) => {
    e.preventDefault()

    if (!guess) {
      console.log('Please select a stock.')
      return
    }

    if (attempts > 5) {
      console.log('Game over. You have used all your guesses.')
      return
    }

    if (guesses.some((g) => g && g.id === guess.id)) {
      console.log('Already guessed. Guess a different stock.')
      return
    }
    addNewGuess()
  }

  return { attempts, guess, guesses, won, handleGuess }
}

export default useGame
