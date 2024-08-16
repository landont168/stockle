import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser } from './reducers/userReducer'
import { resetGuesses } from './reducers/guessReducer'
import { setNotification } from './reducers/notificationReducer'

import useDarkMode from './hooks/useDarkMode'
import useSolution from './hooks/useSolution'

import LoginForm from './components/LoginForm'
import Statistics from './components/Statistics'
import Header from './components/Header'
import StockChart from './components/StockChart'
import GameBoard from './components/GameBoard'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'
import Alert from './components/Alert'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const notification = useSelector((state) => state.notification)

  const [won, setWon] = useState(null)
  const [attempts, setAttempts] = useState(0)

  const [showStats, setShowStats] = useState(false)
  const { solution, getSolution } = useSolution()
  const { darkMode, setDarkMode, theme, toggleTheme } = useDarkMode()

  // fetch initial data
  useEffect(() => {
    dispatch(initializeStocks())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [dispatch])

  // display stats modal when game ends
  useEffect(() => {
    won !== null ? setTimeout(() => setShowStats(true), 2500) : null
  }, [won])

  // refresh game
  const refreshGame = () => {
    dispatch(setNotification('Game refreshed!', 'success'))
    dispatch(resetGuesses())
    setWon(null)
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
            setDarkMode={setDarkMode}
            toggleTheme={toggleTheme}
            refreshGame={refreshGame}
            showStats={showStats}
            setShowStats={setShowStats}
          />
          {solution && <StockChart data={solution.history} />}
          <GameBoard solution={solution} />
          <SearchBar
            solution={solution}
            attempts={attempts}
            setAttempts={setAttempts}
            won={won}
            setWon={setWon}
          />
          {won !== null && <Alert solution={solution} />}
          {won !== null && showStats && (
            <Statistics
              setShowStats={setShowStats}
              text={won ? 'Congraulations!' : 'Thanks for playing!'}
            />
          )}
        </>
      )}
      {notification && <Notification notification={notification} />}
    </ThemeProvider>
  )
}

export default App
