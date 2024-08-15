import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addGuess } from '../reducers/guessReducer'
import { setUser } from '../reducers/userReducer'
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer'
import usersService from '../services/users'

const SearchBar = ({
  solution,
  gameOver,
  setGameOver,
  attempts,
  setAttempts,
  setWon,
}) => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks)
  const guesses = useSelector((state) => state.guesses)
  const user = useSelector((state) => state.user)
  const [guess, setGuess] = useState(null)

  // update user stats after game ends
  const updateStats = async (result) => {
    const updatedUser = await usersService.updateUser(user.id, {
      wonGame: result,
      attempts,
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(updatedUser))
    dispatch(setUser(updatedUser))
  }

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
      setGameOver(true)
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
      setGameOver(true)
      updateStats(false)
    }

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
            value={guess}
            onChange={(e, newValue) => setGuess(newValue)}
            renderInput={(params) => <TextField {...params} label='Stock' />}
            disabled={gameOver}
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          endIcon={<SendIcon />}
          disabled={gameOver}
        >
          Guess
        </Button>
      </form>
    </div>
  )
}

export default SearchBar
