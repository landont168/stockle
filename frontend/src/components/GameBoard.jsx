import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Feedback from './Feedback'
import { useSelector } from 'react-redux'

const GameBoard = ({ solution }) => {
  const guesses = useSelector((state) => state.guesses)
  const {
    NameFeedback,
    SectorFeedback,
    NumFeedback,
    SharePriceFeedback,
    VolumeFeedback,
  } = Feedback(solution)

  return (
    <div className='game-board'>
      <TableContainer component={Paper}>
        <Table sx={{ Width: 650 }} aria-label='simple table'>
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
                  height: '45px',
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component='th'
                  scope='row'
                  sx={{
                    width: '200px',
                    padding: '8px',
                    paddingLeft: '16px',
                  }}
                >
                  {row && <NameFeedback guess={row} />}
                </TableCell>
                <TableCell sx={{ width: '150px', padding: '8px' }}>
                  {row && <SectorFeedback guessStr={row.sector} />}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && (
                    <NumFeedback
                      guessNum={row.marketCap}
                      solNum={solution.marketCap}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && (
                    <SharePriceFeedback guessSharePrice={row.sharePrice} />
                  )}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && (
                    <NumFeedback
                      guessNum={row.revenue}
                      solNum={solution.revenue}
                    />
                  )}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && <VolumeFeedback guessVolume={row.volume} />}
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
