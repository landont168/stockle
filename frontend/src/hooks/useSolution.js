import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import historyService from '../services/history'

const useSolution = () => {
  const stocks = useSelector((state) => state.stocks)
  const [solution, setSolution] = useState(null)

  // fetch solution and history
  const getSolution = useCallback(async () => {
    if (stocks.length === 0) return

    const randomSolution = stocks[Math.floor(Math.random() * stocks.length)]
    console.log('solution', randomSolution)
    const solutionHistory = await historyService.getHistory(
      randomSolution.historyId
    )
    setSolution({
      ...randomSolution,
      history: solutionHistory.stockHistory,
    })
  }, [stocks])

  // get initial solution
  useEffect(() => {
    getSolution()
  }, [getSolution])

  return {
    solution,
    setSolution,
    getSolution,
  }
}

export default useSolution
