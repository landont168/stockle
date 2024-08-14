import { Box, Typography, useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()

  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: theme.palette.divider,
        padding: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant='body2'>Stockle - Made by Landon Trinh</Typography>
    </Box>
  )
}

export default Footer
