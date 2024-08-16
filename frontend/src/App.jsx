import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'
import { initializeUsers } from './reducers/usersReducer'
import { resetGuesses } from './reducers/guessReducer'
import { setUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import historyService from './services/history'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Statistics from './components/Statistics'
import LoginForm from './components/LoginForm'
import StockChart from './components/StockChart'
import Notification from './components/Notification'
import Alert from './components/Alert'
import GameBoard from './components/GameBoard'

const App = () => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  const [solution, setSolution] = useState(null)
  const [solutionHistory, setSolutionHistory] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showStats, setShowStats] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    window.localStorage.setItem('darkMode', !darkMode)
  }

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  // fetch cached user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  // fetch stocks
  useEffect(() => {
    dispatch(initializeStocks())
    dispatch(initializeUsers())
  }, [dispatch])

  // fetch solution and history
  const getSolution = useCallback(() => {
    if (stocks.length === 0) return
    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    console.log('solution:', randomSolution)
    historyService
      .getHistory(randomSolution.historyId)
      .then((historyObject) => {
        setSolution(randomSolution)
        setSolutionHistory(historyObject.stockHistory)
      })
  }, [stocks])

  // fetch initial solution
  useEffect(() => {
    getSolution()
  }, [getSolution])

  // show stats after game over
  useEffect(() => {
    gameOver ? setTimeout(() => setShowStats(true), 2500) : null
  }, [gameOver])

  // refresh game
  const refreshGame = () => {
    dispatch(setNotification('Game refreshed!', 'success'))
    dispatch(resetGuesses())
    setSolution(null)
    setSolutionHistory(null)
    setGameOver(false)
    setWon(false)
    setAttempts(0)
    getSolution()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user && <LoginForm />}
      {user && (
        <>
          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            refreshGame={refreshGame}
            showStats={showStats}
            setShowStats={setShowStats}
          />
          {solutionHistory && <StockChart data={solutionHistory} />}
          <GameBoard solution={solution} />
          <SearchBar
            solution={solution}
            gameOver={gameOver}
            setGameOver={setGameOver}
            attempts={attempts}
            setAttempts={setAttempts}
            setWon={setWon}
          />
          {gameOver && <Alert solution={solution} />}
          {gameOver && showStats && (
            <Statistics
              setShowStats={setShowStats}
              text={won ? 'Congraulations!' : 'Thanks for playing!'}
            />
          )}
          {notification && <Notification notification={notification} />}
        </>
      )}
    </ThemeProvider>
  )
}

export default App
