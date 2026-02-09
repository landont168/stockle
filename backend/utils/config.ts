import { Config } from '../types'
import 'dotenv/config'

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET

if (!PORT || !MONGODB_URI || !SECRET) {
  throw new Error('Missing required environment variables: PORT, MONGODB_URI, SECRET')
}

const config: Config = {
  MONGODB_URI,
  PORT,
  SECRET,
}

export default config
