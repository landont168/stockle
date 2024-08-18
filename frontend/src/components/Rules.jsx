import Modal from './Modal'
import SampleBoard from './SampleBoard'

import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const Rules = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose} title='Rules'>
      <h3>Guess the stock in 6 tries</h3>
      <ul>
        <li>Each guess must be a valid stock from the dropdown</li>
        <li>Feedback will be provided for each guess</li>
      </ul>
      <h3>Example</h3>
      <SampleBoard />
      <h4>Guess Feedback:</h4>
      <span className='guess-cell'>
        <CheckIcon sx={{ color: 'green' }} />
        <em>Correct market characteristic</em>
      </span>
      <span className='guess-cell'>
        <ClearIcon sx={{ color: 'red' }} />
        <em>Incorrect market characteristic</em>
      </span>
      <span className='guess-cell'>
        <ArrowCircleUpIcon sx={{ color: 'green' }} />
        <em>Solution has higher market characteristic</em>
      </span>
      <span className='guess-cell'>
        <ArrowCircleDownIcon sx={{ color: 'red' }} />
        <em>Solution has lower market characteristic</em>
      </span>
    </Modal>
  )
}

export default Rules
