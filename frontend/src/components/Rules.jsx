import Modal from './Modal'
import SampleBoard from './SampleBoard'

import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

const Rules = ({ handleClose }) => {
  return (
    <Modal handleClose={handleClose} title='Rules'>
      <div className='rules-container'>
        <h3>Guess the stock in 6 tries.</h3>
        <ul>
          <li>Each guess must be a valid US stock from the dropdown form.</li>
          <li>Feedback will be provided for each guess.</li>
        </ul>
        <h3>Example</h3>
        <SampleBoard />
        <span className='guess-cell'>
          <CheckIcon sx={{ color: 'green' }} />
          Correct market characteristic
        </span>
        <span className='guess-cell'>
          <ClearIcon sx={{ color: 'red' }} />
          Incorrect market characteristic
        </span>
        <span className='guess-cell'>
          <ArrowCircleUpIcon sx={{ color: 'green' }} />
          Higher market characteristic
        </span>
        <span className='guess-cell'>
          <ArrowCircleDownIcon sx={{ color: 'red' }} />
          Lower market characteristic
        </span>
      </div>
    </Modal>
  )
}

export default Rules
