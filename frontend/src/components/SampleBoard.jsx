import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Feedback from './Feedback'

const sampleGuess = {
  name: 'Apple Inc.',
  ticker: 'AAPL',
  sector: 'Technology',
  marketCap: 3436886884352,
  sharePrice: 226.05,
  revenue: 385603010560,
  volume: 65180064,
  id: '0',
}

const sampleSolution = {
  name: 'Nvidia',
  ticker: 'NVDA',
  sector: 'Technology',
  marketCap: 3064456282112,
  sharePrice: 124.58,
  revenue: 79773999104,
  volume: 375461212,
  id: '1',
}

const SampleBoard = () => {
  const {
    NameFeedback,
    SectorFeedback,
    NumFeedback,
    SharePriceFeedback,
    VolumeFeedback,
  } = Feedback(sampleSolution)

  return (
    <div className='sample-board'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
            <TableRow
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
                {<NameFeedback guess={sampleGuess} />}
              </TableCell>
              <TableCell sx={{ width: '150px', padding: '8px' }}>
                {<SectorFeedback guessStr={sampleGuess.sector} />}
              </TableCell>
              <TableCell sx={{ width: '100px', padding: '8px' }}>
                {
                  <NumFeedback
                    guessNum={sampleGuess.marketCap}
                    solNum={sampleSolution.marketCap}
                  />
                }
              </TableCell>
              <TableCell sx={{ width: '100px', padding: '8px' }}>
                {
                  <SharePriceFeedback
                    guessSharePrice={sampleGuess.sharePrice}
                  />
                }
              </TableCell>
              <TableCell sx={{ width: '100px', padding: '8px' }}>
                {
                  <NumFeedback
                    guessNum={sampleGuess.revenue}
                    solNum={sampleSolution.revenue}
                  />
                }
              </TableCell>
              <TableCell sx={{ width: '100px', padding: '8px' }}>
                {<VolumeFeedback guessVolume={sampleGuess.volume} />}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SampleBoard
