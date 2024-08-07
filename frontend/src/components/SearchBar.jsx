import { useState } from 'react'
import { useSelector } from 'react-redux'

// material ui
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

const SearchBar = () => {
  const stocks = useSelector((state) => state.stocks)
  const [search, setSearch] = useState('')

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(search)
  }

  return (
    <div className='search-container'>
      <form className='search-form' onSubmit={handleSearchSubmit}>
        <div>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            options={stocks}
            getOptionLabel={(option) => `${option.name} (${option.ticker})`}
            sx={{ width: 350, marginRight: '5px' }}
            onChange={(event, newValue) => setSearch(newValue)}
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
