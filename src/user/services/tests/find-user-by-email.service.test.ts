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

describe('find-user-by-email service test', () => {
  const userService = Container.get(UserService)

  it('유저 조회 성공 시, 유저 객체 반환', async () => {
    const email = 'ehgks0083@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    await userService.createUser(data)

    const spy = jest.spyOn(userService, 'findUserByEmail')

    const found = await userService.findUserByEmail({ email })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ email })

    expect(found!.email).toBe(email)
  })

  it('유저 조회 성공 실패 시, null 반환', async () => {
    const email = 'ehgks0083@gmail.com'
    const spy = jest.spyOn(userService, 'findUserByEmail')

    const found = await userService.findUserByEmail({ email })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ email })

    expect(found).toBeNull()
  })
})
