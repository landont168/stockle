import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from 'react-redux'

const SearchBar = ({ guess, setGuess, won, handleGuess }) => {
  const stocks = useSelector((state) => state.stocks)

  return (
    <form className='search-container' onSubmit={handleGuess}>
      <div>
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={stocks}
          getOptionLabel={(option) => `${option.name} (${option.ticker})`}
          sx={{ width: 350, marginRight: '5px' }}
          value={guess}
          onChange={(e, newValue) => setGuess(newValue)}
          renderInput={(params) => <TextField {...params} label='Stock' />}
          disabled={won !== null}
        />
      </div>
      <Button
        type='submit'
        variant='contained'
        endIcon={<SendIcon />}
        disabled={won !== null}
      >
        Guess
      </Button>
    </form>
  )
}

export default SearchBar
