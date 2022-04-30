/* eslint-disable camelcase */
import 'reflect-metadata'
import Container from 'typedi'
import { UserService } from '..'
import { DB } from '../../../db'
import {
  CreateUserAddressDto,
  CreateUserDto,
  UpdateUserAddressDto,
} from '../../dtos'

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

describe('update-user-address service test', () => {
  const userService = Container.get(UserService)

  it('유저 Address 업데이트 성공 시, Address 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }
    const user = await userService.createUser(data)

    const addressData: CreateUserAddressDto = {
      name: '회사',
      place: '서울시 강남구',
      latitude: 25,
      longitude: 25,
    }

    const address = await userService.createUserAddress(user.id, addressData)

    const spy = jest.spyOn(userService, 'updateUserAddress')

    const updatedData: UpdateUserAddressDto = {
      latitude: 12,
      longitude: 12,
      isDefault: true,
    }
    const { isDefault, ...rest } = updatedData
    const ids = { id: address.id, userId: user.id }
    const updatedAddress = await userService.updateUserAddress(ids, updatedData)

    const foundedUser = await userService.findUserById(user.id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(ids, updatedData)

    expect(updatedAddress).toEqual(expect.objectContaining(rest))
    expect(foundedUser!.defaultAddressId).toBe(address.id)
  })
})
