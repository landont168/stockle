import { Box, Button, Typography } from '@mui/material'
import { setIsGuest } from '../reducers/guestReducer'
import { useDispatch, useSelector } from 'react-redux'

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
          <Typography>Made by Landon Trinh</Typography>
        </Box>
      </div>
    )
  )
}

export default Home
