import 'reflect-metadata'
import express from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { userRouter } from './user/routes'
import {
  logExErrorMiddleware,
  logInternalServerErrorMiddleware,
} from './middlewares'

export function createApp() {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get('/health', (_, res) => {
    res.send(ReasonPhrases.OK)
  })

  app.use('/api/v1/users', userRouter)

  app.use('*', (_, res) => {
    res.status(StatusCodes.NOT_FOUND)
    res.send(ReasonPhrases.NOT_FOUND)
  })

  app.use(logExErrorMiddleware)
  app.use(logInternalServerErrorMiddleware)

  return app
}
