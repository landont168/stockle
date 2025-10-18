import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'
import { Stock } from '../types'

interface BasicAlertProps {
  solution: Stock | null
}

interface GrowTransitionProps {
  in?: boolean;
  children: React.ReactElement;
  timeout?: number | { enter?: number; exit?: number };
}

const GrowTransition = (props: GrowTransitionProps) => {
  return <Grow {...props} />
}

const BasicAlert = ({ solution }: BasicAlertProps) => {
  if (!solution) return null

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
