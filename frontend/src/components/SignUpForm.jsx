import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

import usersService from '../services/users'

const SignUp = ({ setShowSignUpForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowSignUpForm(false)

    const signupUser = async (newUser) => {
      try {
        const user = await usersService.createUser(newUser)
        console.log('success', user)
      } catch {
        console.log('bad input')
      }
    }

    const data = new FormData(e.currentTarget)
    signupUser({
      name: data.get('firstName') + ' ' + data.get('lastName'),
      username: data.get('username'),
      password: data.get('password'),
    })
  }

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ fontWeight: 'bold' }}>
          Sign up to Stockle
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='firstName'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                variant='text'
                onClick={() => setShowSignUpForm(false)}
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
                {"Don't have an account? Log in"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
