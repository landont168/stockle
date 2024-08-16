import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

const GrowTransition = (props) => {
  return <Grow {...props} />
}

const BasicAlert = ({ solution }) => {
  return (
    <Snackbar
      open={true}
      TransitionComponent={GrowTransition}
      key={GrowTransition.name}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ marginTop: '55px' }}
    >
      <Alert severity='info' sx={{ width: '100%', fontWeight: 'bold' }}>
        Answer: {solution.name} ({solution.ticker})
      </Alert>
    </Snackbar>
  )
}

export default BasicAlert
