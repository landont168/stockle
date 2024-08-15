import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

const GrowTransition = (props) => {
  return <Grow {...props} />
}

const BasicAlert = ({ solution }) => {
  const state = {
    open: true,
    Transition: GrowTransition,
  }

  return (
    <Snackbar
      open={state.open}
      TransitionComponent={state.Transition}
      key={state.Transition.name}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ marginTop: '55px' }}
    >
      <Alert severity='info' sx={{ width: '100%' }}>
        Answer: {solution.name} ({solution.ticker})
      </Alert>
    </Snackbar>
  )
}

export default BasicAlert
