import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { Stock, StockGuess } from 'types'
import { useAppSelector } from 'hooks/reduxHooks'

interface SearchBarProps {
  guess: StockGuess
  setGuess: (guess: StockGuess) => void
  won: boolean | null
  handleGuess: (e: React.FormEvent<HTMLFormElement>) => void
}

const SearchBar = ({ guess, setGuess, won, handleGuess }: SearchBarProps) => {
  const stocks = useAppSelector<Stock[]>((state) => state.stocks)

  return (
    <form className='search-container' onSubmit={handleGuess}>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={stocks}
        getOptionLabel={(option) => `${option.name} (${option.ticker})`}
        sx={{ width: 350, marginRight: '5px' }}
        value={guess}
        onChange={(_, newValue) => setGuess(newValue)}
        renderInput={(params) => <TextField {...params} label='Stock' />}
        disabled={won !== null}
      />
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
