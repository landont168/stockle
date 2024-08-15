import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import loginService from '../services/login'

import SignupForm from './SignupForm'
import Notification from './Notification'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const [showSignupForm, setShowSignupForm] = useState(false)

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(setNotification('Successfully logged in!', 'success'))
    } catch {
      dispatch(
        setNotification(
          'Failed to log in. Invalid username or password.',
          'error'
        )
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    loginUser({
      username: data.get('username'),
      password: data.get('password'),
    })
  }

  const handleClick = () => {
    setShowSignupForm(true)
    dispatch(removeNotification())
  }

  if (showSignupForm) {
    return <SignupForm setShowSignUpForm={setShowSignupForm} />
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LoginRoundedIcon />
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
                onClick={handleClick}
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
      {notification && <Notification notification={notification} />}
    </Container>
  )
}

export default LoginForm
