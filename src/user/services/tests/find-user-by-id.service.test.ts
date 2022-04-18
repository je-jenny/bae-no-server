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

describe('find-user-by-id service test', () => {
  const userService = Container.get(UserService)

  it('유저 조회 성공 시, 유저 객체 반환', async () => {
    const email = 'ehgks0083@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    const createdUser = await userService.createUser(data)

    const spy = jest.spyOn(userService, 'findUserById')

    const user = await userService.findUserById(createdUser.id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(createdUser.id)

    expect(user).not.toBeNull()
    expect(user!.email).toBe(email)
  })

  it('유저 조회 성공 실패 시, null 반환', async () => {
    const spy = jest.spyOn(userService, 'findUserById')

    const id = 1
    const user = await userService.findUserById(id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(id)

    expect(user).toBeNull()
  })
})
