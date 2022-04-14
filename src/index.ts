import { PORT } from './config'
import { createApp } from './app'
import { logger } from './logger'

function main() {
  createApp().listen(PORT, () => {
    logger.info(`HTTP Server is listening on ${PORT}`)
  })
}

main()
