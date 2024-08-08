import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGuess } from '../reducers/guessReducer'

// material ui
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

const SearchBar = () => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)

  const handleGuess = (e) => {
    e.preventDefault()
    dispatch(addGuess({ guess, attempts }))
    setAttempts(attempts + 1)
  }

  return (
    <div className='search-container'>
      <form className='search-form' onSubmit={handleGuess}>
        <div>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={stocks}
            getOptionLabel={(option) => `${option.name} (${option.ticker})`}
            sx={{ width: 350, marginRight: '5px' }}
            onChange={(event, newValue) => setGuess(newValue)}
            renderInput={(params) => <TextField {...params} label='Stock' />}
          />
        </div>
        <Button type='submit' variant='contained' endIcon={<SendIcon />}>
          Guess
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
