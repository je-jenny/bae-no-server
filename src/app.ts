import 'reflect-metadata'
import express from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import passport from 'passport'
import session from 'express-session'
import Container from 'typedi'
import cors from 'cors'
import helmet from 'helmet'
import { userRouter } from './user/routes'
import {
  logHttpErrorMiddleware,
  logDBErrorMiddleware,
  logInternalServerErrorMiddleware,
} from './middlewares'
import passportConfig from './passports'
import { CLIENT_DOMAIN, SESSION_OPTION } from './config'
import { authRouter } from './auth'
import { Redis } from './db'

export function createApp() {
  const redis = Container.get(Redis)
  const RedisStore = redis.getRedisStore()
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: [CLIENT_DOMAIN], credentials: true }))
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  passportConfig()
  app.use(
    session({
      ...SESSION_OPTION,
      store: RedisStore,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/health', (_, res) => {
    res.send(ReasonPhrases.OK)
  })

  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/auths', authRouter)

  app.use('*', (_, res) => {
    res.status(StatusCodes.NOT_FOUND)
    res.send(ReasonPhrases.NOT_FOUND)
  })

  app.use(logHttpErrorMiddleware)
  app.use(logDBErrorMiddleware)
  app.use(logInternalServerErrorMiddleware)

  return app
}
