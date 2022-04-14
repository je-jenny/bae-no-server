import express, { Response, NextFunction, Request } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { logger } from './logger'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/health', (_, res) => {
    res.send(ReasonPhrases.OK)
  })

  app.use('*', (_, res) => {
    res.status(StatusCodes.NOT_FOUND)
    res.send(ReasonPhrases.NOT_FOUND)
  })

  app.use((err: any, _: Request, res: Response, __: NextFunction) => {
    logger.error(JSON.stringify(err))
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: `SERVER_ERROR` })
  })

  return app
}
