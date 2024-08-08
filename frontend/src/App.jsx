import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'

// mu

// services
import loginService from './services/login'

// components
import Header from './components/Header'
import Board from './components/Board'
import SearchBar from './components/SearchBar'
import Modal from './components/Modal'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)
  const [solution, setSolution] = useState(null)

  // redux?
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // user login
  const [user, setUser] = useState(null)

  // restore user on refresh
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    // window.localStorage.removeItem('loggedUser')
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
    setSolution(randomSolution)
  }, [stocks])

  // game over
  useEffect(() => {
    if (gameOver) {
      console.log('game over')
      if (won) {
        console.log('you won')
      } else {
        console.log('you lost')
      }
      setTimeout(() => setShowModal(true), 3000)
    }
    if (attempts === 6) {
      setGameOver(true)
      setWon(false)
    }
  }, [gameOver, attempts, won])

  // login user
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

  if (user === null) {
    return (
      <div>
        <LoginForm loginUser={loginUser} />
      </div>
    )
  }

  return (
    <div className='game'>
      <Header logoutUser={logoutUser} />
      {solution && <div>solution: {solution.name}</div>}
      <Board guesses={guesses} solution={solution} />
      <SearchBar
        solution={solution}
        gameOver={gameOver}
        setGameOver={setGameOver}
        attempts={attempts}
        setAttempts={setAttempts}
      />
      {showModal && (
        <Modal
          won={won}
          attempts={attempts}
          solution={solution}
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default App
