import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db'
import { PROFILE_PROVIDER } from '../../entities'
import { CreateUserDto } from '../../dtos'
import { UserService } from '../..'

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

describe('find user by id test', () => {
  describe('GET /api/v1/users', () => {
    const URL = '/api/v1/users'
    it('Query String이 유효하지 않으면, 400 반환', async () => {
      const nickname = null
      const res = await request(await createApp())
        .get(`${URL}`)
        .query({ nickname })

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('nickname 길이가 16 넘으면, 400 반환', async () => {
      const nickname = '12345678901234567'
      const res = await request(await createApp())
        .get(`${URL}`)
        .query({ nickname })

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('Nickname 없으면, 200 반환', async () => {
      const nickname = 'kim'
      const res = await request(await createApp())
        .get(`${URL}`)
        .query({ nickname })

      expect(res.status).toBe(StatusCodes.OK)
    })

    it('Nickname 이미 존재 시, 400 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      const nickname = 'kim'
      const user = await userService.createUser(data)
      await userService.updateUserProfile(user.id, { nickname })

      const res = await request(await createApp())
        .get(`${URL}`)
        .query({ nickname })

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })
  })
})
