import { useState } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

const GrowTransition = (props) => {
  return <Grow {...props} />
}

const BasicAlert = ({ solution }) => {
  const [state, setState] = useState({
    open: true,
    Transition: GrowTransition,
  })

  return (
    <div>
      <Snackbar
        open={state.open}
        TransitionComponent={state.Transition}
        key={state.Transition.name}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ marginTop: '45px' }}
      >
        <Alert severity='info' sx={{ width: '100%' }}>
          Answer: {solution.name} ({solution.ticker})
        </Alert>
      </Snackbar>
    </div>
  )
}

export default BasicAlert
