import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGuess } from '../reducers/guessReducer'
import { updateUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'

const SearchBar = ({ solution, attempts, setAttempts, won, setWon }) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)
  const user = useSelector((state) => state.user)
  const [guess, setGuess] = useState(null)

  // update user stats when game ends
  const updateStats = (wonGame) => {
    dispatch(updateUser(user.id, { wonGame, attempts }))
  }

  // handle user guesses
  const handleGuess = (e) => {
    e.preventDefault()
    dispatch(removeNotification())
    setGuess(null)

    // validate guess input
    if (!guess) {
      dispatch(setNotification('Please select a stock.', 'warning'))
      return
    }

    // correct guess
    if (solution.id === guess.id) {
      setWon(true)
      updateStats(true)
    }

    // duplicate guess
    if (guesses.some((g) => g && g.id === guess.id)) {
      dispatch(
        setNotification('Already guessed. Guess a different stock.', 'warning')
      )
      return
    }

    // incorrect guess on last guess
    if (attempts + 1 === 6) {
      setWon(false)
      updateStats(false)
    }

    dispatch(addGuess({ guess, attempts }))
    setAttempts(attempts + 1)
  }

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
