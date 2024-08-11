// material ui (dark mode!)
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

// redux
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'
import { resetGuesses } from './reducers/guessReducer'

// services
import loginService from './services/login'
import historyService from './services/history'

// components
import Header from './components/Header'
import Board from './components/Board'
import SearchBar from './components/SearchBar'
import GameOver from './components/GameOver'
import LoginForm from './components/LoginForm'
import StockChart from './components/StockChart'

const App = () => {
  // redux store
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)

  // solution states
  const [solution, setSolution] = useState(null)
  const [solutionHistory, setSolutionHistory] = useState(null)

  // component states
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // user login
  const [user, setUser] = useState(null)

  // theme
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode === 'true'
  })

  // update local storage on theme toggle
  useEffect(() => {
    window.localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // restore user on refresh
  useEffect(() => {
    // get user
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  // fetch stocks from server
  useEffect(() => {
    dispatch(initializeStocks())
  }, [dispatch])

  const fetchSolution = useCallback(() => {
    if (stocks.length === 0) return
    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    console.log('solution:', randomSolution)
    setSolution(randomSolution)
    historyService
      .getHistory(randomSolution.historyId)
      .then((historyObject) => {
        setSolutionHistory(historyObject.stockHistory)
      })
  }, [stocks])

  // set solution
  useEffect(() => {
    fetchSolution()
  }, [fetchSolution])

  useEffect(() => {
    gameOver ? setTimeout(() => setShowModal(true), 1000) : null
  }, [gameOver])

  // login/logout user
  const loginUser = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      console.log('successful!')
      setUser(user)
    } catch {
      console.log('wrong credentials')
    }
  }

  const refreshGame = () => {
    setSolution(null)
    setSolutionHistory(null)
    setGameOver(false)
    setWon(false)
    setAttempts(0)
    dispatch(resetGuesses())
    fetchSolution()
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const theme = darkMode ? darkTheme : lightTheme

  // login/signup forms
  if (user === null) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginForm loginUser={loginUser} />
      </ThemeProvider>
    )
  }

  // actual game
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='game'>
        <Header
          user={user}
          logoutUser={logoutUser}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          refreshGame={refreshGame}
        />
        {solutionHistory && <StockChart data={solutionHistory} />}
        <Board guesses={guesses} solution={solution} />
        <SearchBar
          solution={solution}
          gameOver={gameOver}
          setGameOver={setGameOver}
          attempts={attempts}
          setAttempts={setAttempts}
          won={won}
          setWon={setWon}
          user={user}
          setUser={setUser}
        />
        {showModal && (
          <GameOver
            won={won}
            attempts={attempts}
            solution={solution}
            handleClose={() => setShowModal(false)}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
