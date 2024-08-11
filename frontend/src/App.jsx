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
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'

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

  // set solution
  useEffect(() => {
    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    console.log(randomSolution)
    setSolution(randomSolution)
  }, [stocks])

  // fetch history for solution
  useEffect(() => {
    if (!solution) return
    historyService.getHistory(solution.historyId).then((historyObject) => {
      setSolutionHistory(historyObject.stockHistory)
    })
  }, [solution])

  useEffect(() => {
    if (gameOver) {
      console.log('game over')
      if (won) {
        console.log('win')
      } else {
        console.log('lose')
      }
      setTimeout(() => setShowModal(true), 1000)
    }
  }, [gameOver, won])

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

  const logoutUser = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // toggle dark mode
  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const theme = darkMode ? darkTheme : lightTheme

  if (user === null) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginForm loginUser={loginUser} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='game'>
        <Header
          user={user}
          logoutUser={logoutUser}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
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
