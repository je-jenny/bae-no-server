import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db'
import { PROFILE_PROVIDER } from '../../entities'
import { CreateUserDto } from '../../dtos'

const db = Container.get(DB)
beforeAll(async () => {
  await db.typeOrmInitialize()
})

afterEach(async () => {
  await db.typeOrmClear()
})

afterAll(async () => {
  await db.typeOrmClose()
})

describe('create user api test', () => {
  describe('POST /api/v1/users', () => {
    const URL = '/api/v1/users'
    it('In valid body', async () => {
      const res = await request(await createApp())
        .post(URL)
        .send({})

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('In valid email', async () => {
      const body = { email: '' }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('In valid provider (enum type)', async () => {
      const body = {
        email: 'test@gmail.com',
        nickname: 'nick',
        provider: 'in valid',
      }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('return user', async () => {
      const body: CreateUserDto = {
        email: 'tset@gmail.com',
        nickname: 'nick',
        provider: PROFILE_PROVIDER.APPLE,
      }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
