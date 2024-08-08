import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGuess } from '../reducers/guessReducer'

// material ui
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

const SearchBar = ({
  solution,
  gameOver,
  setGameOver,
  attempts,
  setAttempts,
}) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)
  const [guess, setGuess] = useState('')

  const handleGuess = (e) => {
    e.preventDefault()

    // validate guess input
    if (!guess) {
      console.log('please select stock')
      return
    }

    // correct guess
    if (solution.id === guess.id) {
      setGameOver(true)
    }

    // duplicate guess
    if (guesses.some((g) => g && g.id === guess.id)) {
      console.log('already guessed')
      return false
    }

    dispatch(addGuess({ guess, attempts }))
    setAttempts(attempts + 1)
    setGuess('')
  }

  return (
    <div>
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
          {!gameOver && (
            <Button type='submit' variant='contained' endIcon={<SendIcon />}>
              Guess
            </Button>
          )}
          {gameOver && (
            <Button variant='contained' disabled endIcon={<SendIcon />}>
              Guess
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default SearchBar
