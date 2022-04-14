import { PORT } from './config'
import { createApp } from './app'
import { logger } from './logger'
import { typeOrmInitialize } from './db'

async function main() {
  await typeOrmInitialize()

  createApp().listen(PORT, () => {
    logger.info(`HTTP Server is listening on ${PORT}`)
  })
}

main()
