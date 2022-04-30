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

describe('delete user address api test', () => {
  describe('DELETE /api/v1/users/address', () => {
    const URL = '/api/v1/users/address'
    it('URL 파라미터가 유효하지 않으면, 400 반환', async () => {
      const params = 'In-valid'
      const res = await request(await createApp()).delete(`${URL}/${params}`)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('삭제된 Address가 없으면, 400 반환', async () => {
      const params = 1
      const res = await request(await createApp()).delete(`${URL}/${params}`)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('성공 시, 200 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      const user = await userService.createUser(data)
      const addressData: CreateUserAddressDto = {
        name: '집',
        place: '서울시 강서구',
        latitude: 25.666666,
        longitude: 29.3333,
      }
      const address = await userService.createUserAddress(user.id, addressData)

      const res = await request(await createApp()).delete(
        `${URL}/${address.id}`
      )

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
