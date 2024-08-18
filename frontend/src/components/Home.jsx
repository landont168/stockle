import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

const Home = ({ setIsGuest }) => {
  const [showHome, setShowHome] = useState(true)

  const handleGuestPlay = () => {
    setShowHome(false)
    setIsGuest(true)
  }

  const handleUserPlay = () => {
    setShowHome(false)
    setIsGuest(false)
  }

  return (
    showHome && (
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
