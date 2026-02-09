import { Box, Button, Typography, Fade } from '@mui/material'
import { setIsGuest } from '../reducers/guestReducer'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const isGuest = useAppSelector((state) => state.isGuest)

  const handleGuestPlay = () => {
    dispatch(setIsGuest(true))
  }

  const handleUserPlay = () => {
    dispatch(setIsGuest(false))
  }

  const getDate = () => {
    const now = new Date()
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const }
    const formattedDate = now.toLocaleDateString('en-US', options)
    return formattedDate
  }

  return (
    user === null &&
    isGuest === null && (
      <div className='home-container'>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography variant='h2' sx={{ fontWeight: 'bold', mb: 2 }}>
              Stockle 📈
            </Typography>
            <Typography variant='h5' sx={{ mb: 4 }}>
              Get 6 chances to guess a stock
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
            <Typography>Made by Landon Trinh 🙂</Typography>
          </Box>
        </Fade>
      </div>
    )
  )
}

export default Home
