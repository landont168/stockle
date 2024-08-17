import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsGuest } from '../reducers/guestReducer'

const Home = () => {
  const [showHome, setShowHome] = useState(true)
  const dispatch = useDispatch()

  const handleGuestPlay = () => {
    setShowHome(false)
    dispatch(setIsGuest(true))
  }

  const handleUserPlay = () => {
    setShowHome(false)
    dispatch(setIsGuest(false))
  }

  return (
    showHome && (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 2 }}>
          Stockle
        </Typography>
        <Typography variant='h5' sx={{ mb: 4 }}>
          Get 6 chances to guess a stock.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button
            variant='contained'
            sx={{ borderRadius: 1, width: 150 }}
            onClick={handleGuestPlay}
          >
            Play
          </Button>
          <Button
            variant='contained'
            sx={{ borderRadius: 1, width: 150 }}
            onClick={handleUserPlay}
          >
            Log in
          </Button>
        </Box>
        <Typography>Made by Landon Trinh</Typography>
      </Box>
    )
  )
}

export default Home
