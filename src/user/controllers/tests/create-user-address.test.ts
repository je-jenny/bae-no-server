import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db'
import { PROFILE_PROVIDER } from '../../entities'
import { CreateUserAddressDto, CreateUserDto } from '../../dtos'
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

describe('create-user-address api test', () => {
  describe('POST /api/v1/users/address', () => {
    const URL = '/api/v1/users/address'

    it('Req Body가 유효하지 않으면, 400 반환', async () => {
      const body = { longitude: 'in valid type' }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('Req Body longitude 소숫점이 14자리 넘으면, 400 반환', async () => {
      const body: CreateUserAddressDto = {
        name: '집',
        place: '서울시 강서구',
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        longitude: 1.1234123412341234,
        latitude: 2.123,
      }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('성공 시, 200 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      await userService.createUser(data)

      const body: CreateUserAddressDto = {
        name: '집',
        place: '서울시 강서구',
        longitude: 1.123,
        latitude: 2.123,
      }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
