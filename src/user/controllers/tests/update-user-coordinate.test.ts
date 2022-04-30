import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db'
import { PROFILE_PROVIDER } from '../../entities'
import { CreateUserDto, UpdateUserProfileCoordinateDto } from '../../dtos'
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

describe('update-user-profile-coordinate api test', () => {
  describe('PATCH /api/v1/users/coordinate', () => {
    const URL = '/api/v1/users/coordinate'

    it('Req Body가 유효하지 않으면, 400 반환', async () => {
      const body = { longitude: '12글자넘는닉네임입니다.' }
      const res = await request(await createApp())
        .patch(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('수정된 유저가 없으면, 404 반환', async () => {
      const body: UpdateUserProfileCoordinateDto = { longitude: 1, latitude: 2 }

      const res = await request(await createApp())
        .patch(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })

    it('성공 시, 200 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      await userService.createUser(data)

      const body: UpdateUserProfileCoordinateDto = { longitude: 1, latitude: 2 }
      const res = await request(await createApp())
        .patch(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
