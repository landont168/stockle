import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { initializeStocks } from './reducers/stockReducer'
import { initializeUser } from './reducers/userReducer'
import useDarkMode from './hooks/useDarkMode'
import useGame from './hooks/useGame'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Statistics from './components/Statistics'
import Header from './components/Header'
import StockChart from './components/StockChart'
import Progress from './components/Progress'
import GameBoard from './components/GameBoard'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'
import Alert from './components/Alert'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { User, NotificationInfo } from 'types'

const App = () => {
  const dispatch = useAppDispatch()
  const isGuest = useAppSelector<boolean | null>((state) => state.isGuest)
  const user = useAppSelector<User | null>((state) => state.user)
  const notification = useAppSelector<NotificationInfo | null>((state) => state.notification)

  const [showStats, setShowStats] = useState(false)
  const { solution, guess, setGuess, won, handleGuess, resetGame } = useGame()
  const { darkMode, theme, toggleTheme } = useDarkMode()

  // fetch initial data
  useEffect(() => {
    dispatch(initializeStocks())
    dispatch(initializeUser())
  }, [dispatch])

  // display stats modal when game ends
  useEffect(() => {
    if (won !== null) {
      setTimeout(() => setShowStats(true), 2000)
    }
  }, [won])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
      {isGuest === false && !user && <LoginForm handleClose={() => { }} />}
      {(isGuest || user) && (
        <>
          <Header
            darkMode={darkMode}
            toggleTheme={toggleTheme}
            resetGame={resetGame}
            showStats={showStats}
            setShowStats={setShowStats}
          />
          {solution ? <StockChart data={solution.history} /> : <Progress />}
          <GameBoard solution={solution} />
          <SearchBar
            guess={guess}
            setGuess={setGuess}
            won={won}
            handleGuess={handleGuess}
          />
          {won !== null && <Alert solution={solution} />}
          {won !== null && showStats && !isGuest && (
            <Statistics handleClose={() => setShowStats(false)} />
          )}
        </>
      )}
      {notification && <Notification notification={notification} />}
    </ThemeProvider>
  )
}

export default App
