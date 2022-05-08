/* eslint-disable consistent-return */
import { Service } from 'typedi'
import Session from 'express-session'
import connectRedis from 'connect-redis'
import { createClient, RedisClientType } from 'redis'
import { logger } from '../logger'
import { REDIS_CONFIG } from '../config'

const REFRESH_TOKEN_EXPIRES = 60 * 60 * 24 * 14 // 초 단위

@Service()
export class Redis {
  private retry = 0

  private redisStore: connectRedis.RedisStore | undefined

  private redisClient!: RedisClientType

  async initialize(session: typeof Session) {
    this.setRedisClient()
    await this.getRedisConnection()
    this.setRedisStore(session)
  }

  redisGet(str: string) {
    return this.redisClient.v4.get(str)
  }

  redisSet(str: string, data: string) {
    this.redisClient.v4.set(str, data, { EX: REFRESH_TOKEN_EXPIRES }) // 2주
  }

  private setRedisClient() {
    this.redisClient = createClient(REDIS_CONFIG)
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
    if (this.retry > 3) {
      logger.info('Inaccessible Redis over 3 times')
      process.kill(process.pid, 'SIGINT')
      return
    }
    return this.getRedisClient()
      .connect()
      .then(() => logger.info('REDIS CONNECTED'))
      .catch(async (err) => {
        this.retry += 1
        logger.error('REDIS CONNECTED FAILED', JSON.stringify(err))
        logger.info('Retry Redis Connection')
        await this.getRedisConnection()
      })
  }
}
