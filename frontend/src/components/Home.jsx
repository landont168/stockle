import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsGuest } from '../reducers/guestReducer'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isGuest = useSelector((state) => state.isGuest)

  const handleGuestPlay = () => {
    dispatch(setIsGuest(true))
  }

  const handleUserPlay = () => {
    dispatch(setIsGuest(false))
  }

  const getDate = () => {
    const now = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = now.toLocaleDateString('en-US', options)
    return formattedDate
  }

  return (
    user === null &&
    isGuest === null && (
      <div className='home-container'>
        <Box>
          <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 2 }}>
            Stockle
          </Typography>
          <Typography variant='h5' sx={{ mb: 4 }}>
            Get 6 chances to guess a stock.
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}
          >
            <Button
              variant='contained'
              sx={{ borderRadius: 2, width: 150 }}
              onClick={handleGuestPlay}
            >
              Play
            </Button>
            <Button
              variant='contained'
              sx={{ borderRadius: 2, width: 150 }}
              onClick={handleUserPlay}
            >
              Log in
            </Button>
          </Box>
          <Typography sx={{ fontWeight: 'bold' }}>{getDate()}</Typography>
          <Typography>Made by Landon Trinh</Typography>
        </Box>
      </div>
    )
  )
}

export default Home
