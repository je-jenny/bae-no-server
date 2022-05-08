/* eslint-disable no-underscore-dangle */
import { Service } from 'typedi'
import { DataSource } from 'typeorm'
import { ORM_CONFIG } from '../config'
import { logger } from '../logger'

@Service()
export class DB {
  private retry = 0

  private _AppDataSource

  constructor() {
    this._AppDataSource = new DataSource(ORM_CONFIG)
  }

  async typeOrmInitialize() {
    if (this.retry > 0) {
      logger.info('Inaccessible Pg over 3 times')
      process.kill(process.pid, 'SIGINT')
      return
    }
    await this._AppDataSource
      .initialize()
      .then(() => {
        logger.info('Data Source has been initialized!')
      })
      .catch(async (err) => {
        this.retry += 1
        logger.error(
          `Error during Data Source initialization ${JSON.stringify(err)}`
        )
        await this.typeOrmInitialize()
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
