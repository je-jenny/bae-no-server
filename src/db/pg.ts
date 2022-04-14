import { DataSource } from 'typeorm'
import { ORM_CONFIG } from '../config'
import { logger } from '../logger'

export async function typeOrmInitialize() {
  const AppDataSource = new DataSource({
    ...ORM_CONFIG,
    entities: ['**/*.entity.js'],
  })

  return AppDataSource.initialize()
    .then(() => {
      logger.info('Data Source has been initialized!')
    })
    .catch((err) => {
      logger.error(
        `Error during Data Source initialization ${JSON.stringify(err)}`
      )
    })
}
