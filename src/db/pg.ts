/* eslint-disable no-underscore-dangle */
import { Service } from 'typedi'
import { DataSource } from 'typeorm'
import { ORM_CONFIG, TEST_CONFIG } from '../config'
import { logger } from '../logger'

@Service()
export class DB {
  private _AppDataSource

  constructor() {
    this._AppDataSource = new DataSource(
      process.env.NODE_ENV === 'test' ? TEST_CONFIG : ORM_CONFIG
    )
  }

  async typeOrmInitialize() {
    await this._AppDataSource
      .initialize()
      .then(() => {
        logger.info('Data Source has been initialized!')
      })
      .catch((err) => {
        logger.error(
          `Error during Data Source initialization ${JSON.stringify(err)}`
        )
      })
  }

  typeOrmClose() {
    return this._AppDataSource.destroy()
  }

  async typeOrmClear() {
    const entities = this._AppDataSource.entityMetadatas

    for (const entity of entities) {
      const repository = this._AppDataSource.getRepository(entity.name)
      await repository.query(`DELETE FROM ${entity.tableName}`)
    }
  }

  get AppdataSource() {
    return this._AppDataSource
  }
}
