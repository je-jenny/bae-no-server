import 'reflect-metadata'
import Container from 'typedi'
import { UserService } from '..'
import { DB } from '../../../db'
import { CreateUserAddressDto, CreateUserDto } from '../../dtos'

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

describe('create-user-address service test', () => {
  const userService = Container.get(UserService)

  it('유저 Address 생성 성공 시, Address 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }

    const user = await userService.createUser(data)
    const spy = jest.spyOn(userService, 'createUserAddress')

    const address: CreateUserAddressDto = {
      name: '집',
      place: '서울시 강서구',
      latitude: 12,
      longitude: 14,
    }
    const result = await userService.createUserAddress(user.id, address)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(user.id, address)

    // expect(result).toEqual({})
    expect(result).toEqual(expect.objectContaining(address))
  })

  it('유저 Address를 유저의 defalut로 생성 성공 시, Address 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }

    const user = await userService.createUser(data)
    const spy = jest.spyOn(userService, 'createUserAddress')

    const address: CreateUserAddressDto = {
      name: '집',
      place: '서울시 강서구',
      latitude: 12,
      longitude: 14,
      isDefault: true,
    }
    const { isDefault, ...rest } = address
    const result = await userService.createUserAddress(user.id, address)
    const user2 = await userService.findUserById(user.id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(user.id, address)

    expect(result).toEqual(expect.objectContaining(rest))
    expect(user2!.defaultAddressId).toEqual(result.id)
  })
})
