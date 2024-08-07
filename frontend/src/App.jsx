import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { initializeStocks } from './reducers/stockReducer'

// components
import Header from './components/Header'
import Board from './components/Board'
import SearchBar from './components/SearchBar'

const App = () => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const [solution, setSolution] = useState(null)
  const [guesses, setGuesses] = useState([...Array(6)])

  // fetch stocks from server
  useEffect(() => {
    dispatch(initializeStocks())
  }, [dispatch])

  // set solution
  useEffect(() => {
    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    setSolution(randomSolution)
  }, [stocks])

  return (
    <div>
      <Header />
      {solution && <div>solution: {solution.name}</div>}
      <Board guesses={guesses} />
      <SearchBar />
    </div>
  )
}

export default App
