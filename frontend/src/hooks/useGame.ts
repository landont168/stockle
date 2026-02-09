import { useState, useCallback, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './reduxHooks'
import { addGuess, resetGuesses } from '../reducers/guessReducer'
import { updateUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import stockService from '../services/stocks'
import { Stock, StockGuess } from 'types'

const useGame = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const stocks = useAppSelector((state) => state.stocks)
  const guesses = useAppSelector((state) => state.guesses)
  const [solution, setSolution] = useState<Stock | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [guess, setGuess] = useState<StockGuess | null>(null)
  const [won, setWon] = useState<boolean | null>(null)

  // fetch solution and history
  const getSolution = useCallback(async () => {
    if (stocks.length === 0) return

    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    const solutionHistory = await stockService.getStock(randomSolution.id)
    console.log(solutionHistory)
    setSolution(solutionHistory)
  }, [stocks])

  // get initial solution
  useEffect(() => {
    getSolution()
  }, [getSolution])

  // validate guess input
  const handleGuess = (e: React.FormEvent<HTMLFormElement>) => {
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

    if (!solution || !guess) return

    if (solution.id === guess.id) {
      setWon(true)
      if (user) {
        dispatch(updateUser(user.id, { won: true, attempts: currentAttempt }))
      }
    } else if (currentAttempt === 6) {
      setWon(false)
      if (user) {
        dispatch(updateUser(user.id, { won: false, attempts: currentAttempt }))
      }
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
