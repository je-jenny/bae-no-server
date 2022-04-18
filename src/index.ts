import Container from 'typedi'
import session from 'express-session'
import { PORT } from './config'
import { createApp } from './app'
import { logger } from './logger'
import { DB, Redis } from './db'

async function main() {
  const db = Container.get(DB)
  await Container.get(Redis).initialize(session)
  await db.typeOrmInitialize()

  createApp().listen(PORT, () => {
    logger.info(`HTTP Server is listening on ${PORT}, ${process.env.NODE_ENV}`)
  })
}

main()
