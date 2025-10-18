import numeral from 'numeral'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Stock, StockGuess } from '../types'

interface FeedbackProps {
  guess: StockGuess
}

const Feedback = (solution: StockGuess) => {
  const formatNum = (num: number) => {
    return numeral(num).format('0.0a')
  }

  const Correct = () => {
    return <CheckIcon sx={{ color: 'green' }} />
  }

  const Incorrect = () => {
    return <ClearIcon sx={{ color: 'red' }} />
  }

  const Higher = () => {
    return <ArrowCircleUpIcon sx={{ color: 'green' }} />
  }

  const Lower = () => {
    return <ArrowCircleDownIcon sx={{ color: 'red' }} />
  }

  const NameFeedback = ({ guess }: FeedbackProps) => {
    return (
      <span className='guess-cell'>
        {guess.id === solution.id ? <Correct /> : <Incorrect />}
        {`${guess.name} (${guess.ticker})`}
      </span>
    )
  }

  const SectorFeedback = ({ guess }: FeedbackProps) => {
    return (
      <span className='guess-cell'>
        {guess.sector === solution.sector ? <Correct /> : <Incorrect />}
        {guess.sector}
      </span>
    )
  }

  const MarketCapFeedback = ({ guess }: FeedbackProps) => {
    const guessNum = guess.marketCap
    const solNum = solution.marketCap
    const formattedNum = formatNum(guessNum)
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <Lower />
        ) : guessNum < solNum ? (
          <Higher />
        ) : (
          <Correct />
        )}
        ${formattedNum}
      </span>
    )
  }

  const SharePriceFeedback = ({ guess }: FeedbackProps) => {
    const guessNum = guess.sharePrice
    const solNum = solution.sharePrice
    const formattedNumber = numeral(guessNum).format('0.00')
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <Lower />
        ) : guessNum < solNum ? (
          <Higher />
        ) : (
          <Correct />
        )}
        ${formattedNumber}
      </span>
    )
  }

  const RevenueFeedback = ({ guess }: FeedbackProps) => {
    const guessNum = guess.revenue
    const solNum = solution.revenue
    const formattedNum = formatNum(guessNum)
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <Lower />
        ) : guessNum < solNum ? (
          <Higher />
        ) : (
          <Correct />
        )}
        ${formattedNum}
      </span>
    )
  }

  const VolumeFeedback = ({ guess }: FeedbackProps) => {
    const guessNum = guess.volume
    const solNum = solution.volume
    const formattedNumber = formatNum(guessNum)
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <Lower />
        ) : guessNum < solNum ? (
          <Higher />
        ) : (
          <Correct />
        )}
        {formattedNumber}
      </span>
    )
  }

  return {
    NameFeedback,
    SectorFeedback,
    MarketCapFeedback,
    SharePriceFeedback,
    RevenueFeedback,
    VolumeFeedback,
  }
}

export default Feedback
