import 'reflect-metadata'
import Container from 'typedi'
// import { QueryFailedError } from 'typeorm'
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

describe('delete-user service test', () => {
  const userService = Container.get(UserService)

  it('없는 유저 삭제 시도 시, false(0) 반환', async () => {
    const spy = jest.spyOn(userService, 'deleteUser')

    const deletedUser = await userService.deleteUser(1)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(1)

    expect(deletedUser.affected).not.toBeTruthy()
  })

  it('soft-delete 성공 시, true 반환', async () => {
    const email = 'ehgks83@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    const user = await userService.createUser(data)

    const spy = jest.spyOn(userService, 'deleteUser')

    const deletedUser = await userService.deleteUser(user.id)
    const foundedUser = await userService.findUserByEmail({ email })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(user.id)

    expect(deletedUser.affected).toBeTruthy()
    expect(foundedUser).toBeNull()
  })

  //   it('유저 email 중복 생성 시, QueryFailedError 반환', async () => {
  //     const data: CreateUserDto = {
  //       email: 'ehgks0083@gmail.com',
  //       provider: 'google',
  //     }

  //     const spy = jest.spyOn(userService, 'createUser')

  //     await userService.createUser(data)

  //     try {
  //       await userService.createUser(data)
  //     } catch (e) {
  //       expect(spy).toBeCalledTimes(2)
  //       expect(spy).toBeCalledWith(data)

  //       expect(e instanceof QueryFailedError).toBeTruthy()
  //     }
  //   })
})
