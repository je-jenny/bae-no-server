import Container from 'typedi'
import { PORT } from './config'
import { createApp } from './app'
import { logger } from './logger'
import { DB } from './db'

async function main() {
  const db = Container.get(DB)
  await db.typeOrmInitialize()

  createApp().listen(PORT, () => {
    logger.info(`HTTP Server is listening on ${PORT}`)
  })
}

main()
