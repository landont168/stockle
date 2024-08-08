import numeral from 'numeral'

const BoardRow = ({ guess, solution }) => {
  // note: refactor into custom hook??
  const formatNumber = (number) => {
    const formattedNumber = numeral(number).format('0.0a')
    return formattedNumber
  }

  const checkGuessNumber = (guessNumber, solNumber) => {
    const formattedNumber = `$${formatNumber(guessNumber)}`
    if (guessNumber < solNumber) {
      return `⬆️ ${formattedNumber}`
    } else if (guessNumber > solNumber) {
      return `⬇️ ${formattedNumber}`
    }
    return `✅ ${formattedNumber}`
  }

  const checkGuessString = (guessString, solString) => {
    if (guessString === solString) {
      return `✅ ${guessString}`
    }
    return `❌ ${guessString}`
  }

  const checkGuessVolume = (guessVolume, solVolume) => {
    const formattedNumber = `${formatNumber(guessVolume)}`
    if (guessVolume < solVolume) {
      return `⬆️ ${formattedNumber}`
    } else if (guessVolume > solVolume) {
      return `⬇️ ${formattedNumber}`
    }
    return `✅ ${formattedNumber}`
  }

  const checkGuessSharePrice = (guessSharePrice, solSharePrice) => {
    const formattedNumber = `$${numeral(guessSharePrice).format('0.00')}`
    if (guessSharePrice < solSharePrice) {
      return `⬆️ ${formattedNumber}`
    } else if (guessSharePrice > solSharePrice) {
      return `⬇️ ${formattedNumber}`
    }
    return `✅ ${formattedNumber}`
  }

  return (
    <div className='row'>
      <div className='row-name'>
        {guess &&
          `${checkGuessString(guess.name, solution.name)} (${guess.ticker})`}
      </div>
      <div className='row-sector'>
        {guess && `${checkGuessString(guess.sector, solution.sector)}`}
      </div>
      <div>
        {guess && `${checkGuessNumber(guess.marketCap, solution.marketCap)}`}
      </div>
      <div>
        {guess &&
          `${checkGuessSharePrice(guess.sharePrice, solution.sharePrice)}`}
      </div>
      <div>
        {guess && `${checkGuessNumber(guess.revenue, solution.revenue)}`}
      </div>
      <div>{guess && `${checkGuessVolume(guess.volume, solution.volume)}`}</div>
    </div>
  )
}

export default BoardRow
