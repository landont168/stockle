import app from './app'
import config from './utils/config'

// listen to requests from port
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}!`)
})
