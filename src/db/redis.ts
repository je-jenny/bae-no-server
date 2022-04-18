/* eslint-disable consistent-return */
import { Service } from 'typedi'
import Session from 'express-session'
import connectRedis from 'connect-redis'
import { createClient, RedisClientType } from 'redis'
import { logger } from '../logger'
import { REDIS_URL } from '../config'

@Service()
export class Redis {
  private redisStore: connectRedis.RedisStore | undefined

  private redisClient!: RedisClientType

  //   session!: typeof Session

  async initialize(session: typeof Session) {
    this.setRedisClient()
    await this.getRedisConnection()
    this.setRedisStore(session)
  }

  private setRedisClient() {
    this.redisClient = createClient({ legacyMode: true, url: REDIS_URL })
  }

  private setRedisStore(session: typeof Session) {
    this.redisStore = connectRedis(session)
  }

  getRedisStore() {
    if (process.env.NODE_ENV === 'test') {
      return
    }
    return new this.redisStore!({ client: this.getRedisClient() })
  }

  private getRedisClient() {
    if (!this.redisClient) {
      throw new Error('Not Found Redis Client')
    }
    return this.redisClient
  }

  private async getRedisConnection() {
    if (process.env.NODE_ENV === 'test') {
      return
    }
    return this.getRedisClient()
      .connect()
      .then(() => logger.info('REDIS CONNECTED'))
      .catch(async (err) => {
        logger.error('REDIS CONNECTED FAILED', JSON.stringify(err))
        logger.info('Retry Redis Connection')
        await this.getRedisConnection()
      })
  }
}
