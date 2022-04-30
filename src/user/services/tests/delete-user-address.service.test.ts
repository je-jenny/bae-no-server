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

describe('delete-user-address service test', () => {
  const userService = Container.get(UserService)

  it('없는 Address 삭제 시도 시, false(0) 반환', async () => {
    const spy = jest.spyOn(userService, 'deleteUserAddress')

    const addressId = 1
    const userId = 1
    const deletedUser = await userService.deleteUserAddress(addressId, userId)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(addressId, userId)

    expect(deletedUser.affected).not.toBeTruthy()
  })

  it('delete 성공 시, true 반환', async () => {
    const email = 'ehgks83@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    const user = await userService.createUser(data)
    const addressData: CreateUserAddressDto = {
      name: '집',
      place: '서울시 마포구',
      latitude: 111.11111,
      longitude: 129.234523,
    }
    const address = await userService.createUserAddress(user.id, addressData)

    const spy = jest.spyOn(userService, 'deleteUserAddress')

    const deletedUser = await userService.deleteUserAddress(address.id, user.id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(address.id, user.id)

    expect(deletedUser.affected).toBeTruthy()
  })
})
