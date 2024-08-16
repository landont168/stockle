import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

import numeral from 'numeral'
import { useSelector } from 'react-redux'

const GameBoard = ({ solution }) => {
  const guesses = useSelector((state) => state.guesses)

  // format big numbers to readable number
  const formatNum = (num) => {
    const formattedNum = numeral(num).format('0.0a')
    return formattedNum
  }

  // provide number feedback
  const numFeedback = (guessNum, solNum) => {
    const formattedNum = formatNum(guessNum)
    return (
      <span className='guess-cell'>
        {guessNum > solNum ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : guessNum < solNum ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        ${formattedNum}
      </span>
    )
  }

  const sharePriceFeedback = (guessSharePrice, solSharePrice) => {
    const formattedNumber = numeral(guessSharePrice).format('0.00')
    return (
      <span className='guess-cell'>
        {guessSharePrice < solSharePrice ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : guessSharePrice > solSharePrice ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
        ${formattedNumber}
      </span>
    )
  }

  const stringFeedback = (guessStr, solStr) => {
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

  const nameFeedback = (guess) => {
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

  const volumeFeedback = (guessVolume, solVolume) => {
    const formattedNumber = formatNum(guessVolume)
    return (
      <span className='guess-cell'>
        {formattedNumber}
        {guessVolume > solVolume ? (
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
        ) : guessVolume < solVolume ? (
          <ArrowCircleUpIcon sx={{ color: 'orange' }} />
        ) : (
          <CheckIcon sx={{ color: 'green' }} />
        )}
      </span>
    )
  }

  return (
    <div className='game-board'>
      <TableContainer component={Paper}>
        <Table sx={{ Width: 750 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: '8px', paddingLeft: '16px' }}>
                Name
              </TableCell>
              <TableCell sx={{ padding: '8px' }}>Sector</TableCell>
              <TableCell sx={{ padding: '8px' }}>Market Cap</TableCell>
              <TableCell sx={{ padding: '8px' }}>Share Price</TableCell>
              <TableCell sx={{ padding: '8px' }}>Revenue</TableCell>
              <TableCell sx={{ padding: '8px' }}>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guesses.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  height: '50px',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  sx={{ width: '200px', padding: '8px', paddingLeft: '16px' }}
                >
                  {row && nameFeedback(row)}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ width: '150px', padding: '8px' }}
                >
                  {row && stringFeedback(row.sector, solution.sector)}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ width: '100px', padding: '8px' }}
                >
                  {row && numFeedback(row.marketCap, solution.marketCap)}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ width: '100px', padding: '8px' }}
                >
                  {row &&
                    sharePriceFeedback(row.sharePrice, solution.sharePrice)}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ width: '100px', padding: '8px' }}
                >
                  {row && numFeedback(row.revenue, solution.revenue)}
                </TableCell>
                <TableCell
                  align='right'
                  sx={{ width: '100px', padding: '8px' }}
                >
                  {row && volumeFeedback(row.volume, solution.volume)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GameBoard
