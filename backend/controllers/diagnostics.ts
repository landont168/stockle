import { Request, Response, Router } from 'express'

const diagnosticsRouter = Router()

diagnosticsRouter.get('/slow', async (request: Request, response: Response) => {
  const delayMs = Number(request.query.delayMs ?? 1000)

  if (!Number.isInteger(delayMs) || delayMs < 0 || delayMs > 5000) {
    return response.status(400).json({ error: 'delayMs must be an integer from 0 to 5000' })
  }

  await new Promise((resolve) => setTimeout(resolve, delayMs))
  response.json({ status: 'ok', delayMs })
})

diagnosticsRouter.get('/error', (_: Request, __: Response) => {
  const error = new Error('Intentional diagnostic failure')
  error.name = 'DiagnosticError'
  throw error
})

export default diagnosticsRouter
