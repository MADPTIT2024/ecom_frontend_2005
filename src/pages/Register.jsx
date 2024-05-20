import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function Register() {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const registerUser = {
      username: data.get('username'),
      password: data.get('password'),
      fname: data.get('fname'),
      lname: data.get('lname'),
      noHouse: data.get('noHouse'),
      street: data.get('street'),
      role: 'USER',
    }
    console.log(registerUser)
    const registerInfo = {
      account: {
        username: registerUser.username,
        password: registerUser.password,
      },
      fullname: {
        fname: registerUser.fname,
        lname: registerUser.lname,
      },
      address: {
        noHouse: registerUser.noHouse,
        street: registerUser.street,
      },
    }
    // setUser(registerUser)
    console.log(registerInfo)
    try {
      const res = await axios.post('http://localhost:8000/users/', registerInfo)
      console.log(res.data)
      const cartRes = await axios.post('http://localhost:8004/create-cart/', {
        user_id: res.data.id,
      })
      console.log(cartRes.data)
      setOpen(true)
      setTimeout(() => navigate('/login'), 1000)
    } catch (err) {
      console.log('register failure!!!')
    }
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='fname'
                    required
                    fullWidth
                    id='fname'
                    label='First name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='lname'
                    required
                    fullWidth
                    id='lname'
                    label='Last name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='noHouse'
                    required
                    fullWidth
                    id='noHouse'
                    label='noHouse'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='street'
                    required
                    fullWidth
                    id='street'
                    label='Street'
                    autoFocus
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
                {/* <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='tel'
                    label='Tel'
                    type='tel'
                    id='tel'
                    autoComplete='new-tel'
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value='allowExtraEmails' color='primary' />
                    }
                    label='I want to receive inspiration, marketing promotions and updates via email.'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={handleClick}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity='success'
            sx={{ width: '100%' }}
            anchororigin={{ vertical: 'top', horizontal: 'right' }}
          >
            Register successfully, Please log in!!!
          </Alert>
        </Snackbar>
        {/* <Alert severity='success'>This is a success message!</Alert> */}
      </Stack>
    </>
  )
}
