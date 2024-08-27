import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const API_URL = process.env.VITE_API_URL

const config = {
  rewrites: [
    {
      source: '/api/:path*',
      destination: `${API_URL}/api/:path*`,
    },
  ],
}

fs.writeFileSync('vercel.json', JSON.stringify(config, null, 2))
