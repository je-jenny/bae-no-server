import 'reflect-metadata'
import Container from 'typedi'
import { UserService } from '..'
import { DB } from '../../../db'
import { CreateUserDto } from '../../dtos'

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

describe('update-user-coordinate service test', () => {
  const userService = Container.get(UserService)

  it('userProfile Coordinate 업데이트 성공 시, longitude, latitude 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }
    const user = await userService.createUser(data)

    const spy = jest.spyOn(userService, 'updateUserProfileCoordinate')

    const updatedData = { latitude: 12, longitude: 12 }

    const updatedUser = await userService.updateUserProfileCoordinate(
      user.id,
      updatedData
    )

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(user.id, updatedData)

    expect(updatedUser).toEqual(expect.objectContaining(updatedData))
  })
})
