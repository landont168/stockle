import { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGuess, resetGuesses } from '../reducers/guessReducer'
import { updateUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import stockService from '../services/stocks'

const useGame = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)
  const [solution, setSolution] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [guess, setGuess] = useState(null)
  const [won, setWon] = useState(null)

  // fetch solution and history
  const getSolution = useCallback(async () => {
    if (stocks.length === 0) return

    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    const solutionHistory = await stockService.getStock(randomSolution.id)
    console.log('Solution:', solutionHistory)
    setSolution(solutionHistory)
  }, [stocks])

  // get initial solution
  useEffect(() => {
    getSolution()
  }, [getSolution])

  // validate guess input
  const handleGuess = (e) => {
    e.preventDefault()
    setGuess(null)
    dispatch(removeNotification())

    if (!guess) {
      dispatch(setNotification('Please select a stock.', 'warning'))
      return
    }

    if (guesses.some((g) => g && g.id === guess.id)) {
      dispatch(
        setNotification('Already guessed. Guess a different stock.', 'warning')
      )
      return
    }
    addNewGuess()
  }

  // process valid guess and updates stats on game end
  const addNewGuess = () => {
    const currentAttempt = attempts + 1
    if (solution.id === guess.id) {
      setWon(true)
      user
        ? dispatch(updateUser(user.id, { won: true, attempts: currentAttempt }))
        : null
    } else if (currentAttempt === 6) {
      setWon(false)
      user
        ? dispatch(
            updateUser(user.id, { won: false, attempts: currentAttempt })
          )
        : null
    }
    dispatch(addGuess({ guess, attempts }))
    setAttempts(currentAttempt)
  }

  // reset game
  const resetGame = () => {
    dispatch(resetGuesses())
    setSolution(null)
    setAttempts(0)
    setWon(null)
    getSolution()
  }

  return { solution, guess, setGuess, won, handleGuess, resetGame }
}

export default useGame
