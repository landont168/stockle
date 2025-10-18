import { Config } from '../types'
import 'dotenv/config'

const PORT = process.env.PORT as string
const MONGODB_URI = process.env.MONGODB_URI as string
const SECRET = process.env.SECRET as string

const config: Config = {
  MONGODB_URI,
  PORT,
  SECRET,
}

export default config
