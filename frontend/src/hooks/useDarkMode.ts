import { useState, useEffect } from 'react'
import { createTheme } from '@mui/material/styles'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const useDarkMode = () => {
  const [theme, setTheme] = useState(lightTheme)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    setTheme(darkMode ? darkTheme : lightTheme)
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    window.localStorage.setItem('darkMode', JSON.stringify(!darkMode))
  }

  return { darkMode, theme, toggleTheme }
}

export default useDarkMode
