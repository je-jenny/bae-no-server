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

describe('delete user api test', () => {
  describe('DELETE /api/v1/users', () => {
    const URL = '/api/v1/users'
    it('URL 파라미터가 유효하지 않으면, 400 반환', async () => {
      const params = 'In-valid'
      const res = await request(await createApp()).delete(`${URL}/${params}`)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('URL 파라미터와 user.id가 다르면, 401 반환', async () => {
      const params = 2
      const res = await request(await createApp()).delete(`${URL}/${params}`)

      expect(res.status).toBe(StatusCodes.UNAUTHORIZED)
    })

    it('삭제된 유저가 없으면, 400 반환', async () => {
      const res = await request(await createApp()).delete(`${URL}/1`)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('성공 시, 200 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      const user = await userService.createUser(data)

      const res = await request(await createApp()).delete(`${URL}/${user.id}`)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
