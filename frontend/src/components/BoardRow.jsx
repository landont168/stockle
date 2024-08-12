import numeral from 'numeral'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const BoardRow = ({ guess, solution }) => {
  // format to readable number
  const formatNum = (num) => {
    const formattedNum = numeral(num).format('0.0a')
    return formattedNum
  }

  // provide feedback for number characteristics
  const numberFeedback = (guessNum, solNumber) => {
    const formattedNum = `$${formatNum(guessNum)}`
    return (
      <div className='entry'>
        {guessNum > solNumber ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : guessNum < solNumber ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        {formattedNum}
      </div>
    )
  }

  // provide feedback for string characteristics
  const stringFeedback = (guessStr, solStr) => {
    return (
      <div className='entry'>
        {guessStr === solStr ? (
          <CheckIcon sx={{ color: 'green' }} />
        ) : (
          <ClearIcon sx={{ color: 'red' }} />
        )}
        {guessStr}
      </div>
    )
  }

  const nameFeedback = (guessStr, solStr, guessTicker) => {
    return (
      <div className='entry'>
        {guessStr === solStr ? (
          <CheckIcon sx={{ color: 'green' }} />
        ) : (
          <ClearIcon sx={{ color: 'red' }} />
        )}
        {`${guessStr} (${guessTicker})`}
      </div>
    )
  }

  const volumeFeedback = (guessVolume, solVolume) => {
    const formattedNumber = formatNum(guessVolume)
    return (
      <div className='entry'>
        {guessVolume < solVolume ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : guessVolume > solVolume ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        {formattedNumber}
      </div>
    )
  }

  const sharePriceFeedback = (guessSharePrice, solSharePrice) => {
    const formattedNumber = `$${numeral(guessSharePrice).format('0.00')}`
    return (
      <div className='entry'>
        {guessSharePrice < solSharePrice ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : guessSharePrice > solSharePrice ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        {formattedNumber}
      </div>
    )
  }

  return (
    <div className='row'>
      <div className='row-name'>
        {guess && nameFeedback(guess.name, solution.name, guess.ticker)}
      </div>
      <div className='row-sector'>
        {guess && stringFeedback(guess.sector, solution.sector)}
      </div>
      <div>{guess && numberFeedback(guess.marketCap, solution.marketCap)}</div>
      <div>
        {guess && sharePriceFeedback(guess.sharePrice, solution.sharePrice)}
      </div>
      <div>{guess && numberFeedback(guess.revenue, solution.revenue)}</div>
      <div>{guess && volumeFeedback(guess.volume, solution.volume)}</div>
    </div>
  )
}

export default BoardRow
