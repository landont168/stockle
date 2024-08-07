import { useState, useEffect } from 'react'
import stockService from './services/stocks'

import Stocks from './components/Stocks'

const App = () => {
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    stockService.getAll().then((data) => {
      console.log(data)
      setStocks(data)
    })
  }, [])

  return (
    <div>
      <h1>App</h1>
      <Stocks stocks={stocks} />
    </div>
  )
}

export default App
