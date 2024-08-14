// material ui
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LoginIcon from '@mui/icons-material/Login'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import SnackBar from './SnackBar'

// react
import { useState } from 'react'
import SignUpForm from './SignUpForm'

// reset noti state
import { removeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const LoginForm = ({ loginUser }) => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    loginUser({
      username: data.get('username'),
      password: data.get('password'),
    })
  }

  if (showSignUpForm) {
    return (
      <SignUpForm
        setShowSignUpForm={setShowSignUpForm}
        setSignupSuccess={setSignupSuccess}
      />
    )
  }

  console.log(notification)

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LoginIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
          Log in to Stockle
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Button
                variant='text'
                onClick={() => {
                  setShowSignUpForm(true)
                  dispatch(removeNotification())
                }}
                sx={{
                  textTransform: 'none',
                  padding: 0,
                  color: 'primary',
                  '&:hover': {
                    textDecoration: 'underline',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {"Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {notification.message && <SnackBar notification={notification} />}
    </Container>
  )
}

export default LoginForm
