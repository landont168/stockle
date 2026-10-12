import { Config } from '../types'
import 'dotenv/config'

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const NODE_ENV = process.env.NODE_ENV ?? 'development'
const OBSERVABILITY_DEMO_ENABLED = process.env.OBSERVABILITY_DEMO_ENABLED === 'true'

if (!PORT || !MONGODB_URI || !SECRET) {
  throw new Error('Missing required environment variables: PORT, MONGODB_URI, SECRET')
}

const config: Config = {
  MONGODB_URI,
  PORT,
  SECRET,
  NODE_ENV,
  OBSERVABILITY_DEMO_ENABLED,
}

export default config
