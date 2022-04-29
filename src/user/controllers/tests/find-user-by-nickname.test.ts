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
    it('Body가 유효하지 않으면, 400 반환', async () => {
      const res = await request(await createApp()).get(`${URL}`)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('nickname이 없으면, 404 반환', async () => {
      const nickname = 'kim'
      const res = await request(await createApp())
        .get(`${URL}`)
        .send({ nickname })

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })

    it('성공 시, 200 반환', async () => {
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
        .send({ nickname })

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
