import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeUser } from './reducers/userReducer'

import useDarkMode from './hooks/useDarkMode'
import useGame from './hooks/useGame'

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

  const [showStats, setShowStats] = useState(false)
  const { solution, guess, setGuess, won, handleGuess, resetGame } = useGame()
  const { darkMode, theme, toggleTheme } = useDarkMode()

  // fetch initial data
  useEffect(() => {
    dispatch(initializeStocks())
    dispatch(initializeUsers())
    dispatch(initializeUser())
  }, [dispatch])

  // handle game end
  useEffect(() => {
    if (won !== null) {
      setTimeout(() => setShowStats(true), 2000)
    }
  }, [won])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!user && <LoginForm />}
      {user && (
        <>
          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            resetGame={resetGame}
            showStats={showStats}
            setShowStats={setShowStats}
          />
          {solution && <StockChart data={solution.history} />}
          <GameBoard solution={solution} />
          <SearchBar
            solution={solution}
            won={won}
            guess={guess}
            setGuess={setGuess}
            handleGuess={handleGuess}
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
