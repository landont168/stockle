import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import SignupForm from './SignupForm'
import { loginUser } from '../reducers/userReducer'
import { setIsGuest } from '../reducers/guestReducer'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const isGuest = useSelector((state) => state.isGuest)
  const [showSignupForm, setShowSignupForm] = useState(false)

  const handleSubmit = (e) => {
    const data = new FormData(e.currentTarget)
    e.preventDefault()
    const userObject = {
      username: data.get('username'),
      password: data.get('password'),
    }
    dispatch(loginUser(userObject))
  }

  if (showSignupForm) {
    return <SignupForm showLoginForm={() => setShowSignupForm(false)} />
  }

  return (
    <div className='form-container'>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow:
              isGuest === false ? '0px 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
            padding: isGuest === false ? 3 : 0,
            borderRadius: isGuest === false ? 2 : 0,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LoginRoundedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
            Log in to Stockle
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
              <Grid item xs>
                {isGuest === false && (
                  <Button
                    variant='text'
                    onClick={() => dispatch(setIsGuest(true))}
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
                    {'Play as a guest'}
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  variant='text'
                  onClick={() => setShowSignupForm(true)}
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
      </Container>
    </div>
  )
}

export default LoginForm
