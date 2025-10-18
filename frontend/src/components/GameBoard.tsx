import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Feedback from './Feedback'
import { useAppSelector } from '../hooks/reduxHooks'
import { StockGuess } from 'types'

interface GameBoardProps {
  solution: StockGuess
}

const GameBoard = ({ solution }: GameBoardProps) => {
  const guesses = useAppSelector<StockGuess[]>((state) => state.guesses)

  const {
    NameFeedback,
    SectorFeedback,
    MarketCapFeedback,
    SharePriceFeedback,
    RevenueFeedback,
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
                  {row && <SectorFeedback guess={row} />}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && <MarketCapFeedback guess={row} />}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && <SharePriceFeedback guess={row} />}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && <RevenueFeedback guess={row} />}
                </TableCell>
                <TableCell sx={{ width: '100px', padding: '8px' }}>
                  {row && <VolumeFeedback guess={row} />}
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
