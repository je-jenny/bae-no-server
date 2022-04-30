import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db'
import { PROFILE_PROVIDER } from '../../entities'
import {
  CreateUserAddressDto,
  CreateUserDto,
  UpdateUserAddressDto,
} from '../../dtos'
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

describe('update-user-address api test', () => {
  describe('PATCH /api/v1/users/address', () => {
    const URL = '/api/v1/users/address'

    it('Req Params가 유효하지 않으면, 400 반환', async () => {
      //   const body = { longitude: '12글자넘는닉네임입니다.' }
      const params = 'in-valid-id'
      const res = await request(await createApp()).patch(`${URL}/${params}`)
      // .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('Req Body가 유효하지 않으면, 400 반환', async () => {
      const params = 'in-valid-id'
      const body = { longitude: '12글자넘는닉네임입니다.' }
      const res = await request(await createApp())
        .patch(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('수정된 유저가 없으면, 404 반환', async () => {
      const params = 1
      const body: UpdateUserAddressDto = { longitude: 1, latitude: 2 }

      const res = await request(await createApp())
        .patch(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })

    it('성공 시, 200 반환', async () => {
      const userService = Container.get(UserService)
      const data: CreateUserDto = {
        email: 'tset@gmail.com',
        provider: PROFILE_PROVIDER.APPLE,
      }
      const user = await userService.createUser(data)
      const createdAddressData: CreateUserAddressDto = {
        name: '집',
        place: '서울시 강서구',
        latitude: 25,
        longitude: 25,
      }

      const address = await userService.createUserAddress(
        user.id,
        createdAddressData
      )

      //   expect(address).toBe({})

      const body: UpdateUserAddressDto = { longitude: 1, latitude: 2 }
      const res = await request(await createApp())
        .patch(`${URL}/${address.id}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
