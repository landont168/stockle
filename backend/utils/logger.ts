import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  base: {
    service: 'stockle-backend',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: {
    paths: [
      'password',
      'token',
      'access_token',
      'refresh_token',
      'authorization',
      'cookie',
      'body.password',
      'headers.authorization',
      'headers.cookie',
      'req.body.password',
      'req.headers.authorization',
      'req.headers.cookie',
      'request.body.password',
      'request.headers.authorization',
      'request.headers.cookie',
      'MONGODB_URI',
      'SECRET',
    ],
    censor: '[REDACTED]',
  },
})

export default logger
