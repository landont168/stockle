import numeral from 'numeral'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const Feedback = (solution) => {
  const formatNum = (num) => {
    return numeral(num).format('0.0a')
  }

  const NameFeedback = ({ guess }) => {
    return (
      <span className='guess-cell'>
        {guess.id === solution.id ? (
          <CheckIcon sx={{ color: 'green' }} />
        ) : (
          <ClearIcon sx={{ color: 'red' }} />
        )}
        {`${guess.name} (${guess.ticker})`}
      </span>
    )
  }

  const SectorFeedback = ({ guessStr }) => {
    const solStr = solution.sector
    return (
      <span className='guess-cell'>
        {guessStr === solStr ? (
          <CheckIcon sx={{ color: 'green' }} />
        ) : (
          <ClearIcon sx={{ color: 'red' }} />
        )}
        {guessStr}
      </span>
    )
  }

  const NumFeedback = ({ guessNum, solNum }) => {
    const formattedNum = formatNum(guessNum)
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : guessNum < solNum ? (
          <ArrowCircleUpIcon sx={{ color: 'green' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        ${formattedNum}
      </span>
    )
  }

  const SharePriceFeedback = ({ guessSharePrice }) => {
    const solSharePrice = solution.sharePrice
    const formattedNumber = numeral(guessSharePrice).format('0.00')
    return (
      <span className='guess-cell'>
        {guessSharePrice < solSharePrice ? (
          <ArrowCircleUpIcon sx={{ color: 'green' }} />
        ) : guessSharePrice > solSharePrice ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        ${formattedNumber}
      </span>
    )
  }

  const VolumeFeedback = ({ guessVolume }) => {
    const formattedNumber = formatNum(guessVolume)
    const solVolume = solution.volume
    return (
      <span className='guess-cell'>
        {guessVolume > solVolume ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : guessVolume < solVolume ? (
          <ArrowCircleUpIcon sx={{ color: 'green' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        {formattedNumber}
      </span>
    )
  }

  return {
    NameFeedback,
    SectorFeedback,
    NumFeedback,
    SharePriceFeedback,
    VolumeFeedback,
  }
}

export default Feedback
