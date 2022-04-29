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

describe('find-user-by-nickname service test', () => {
  const userService = Container.get(UserService)

  it('nickname 조회 성공 시, userProfile 객체 반환', async () => {
    const email = 'ehgks0083@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    const nickname = 'kim'

    const createdUser = await userService.createUser(data)
    await userService.updateUserProfile(createdUser.id, { nickname })

    const spy = jest.spyOn(userService, 'findUserByNickName')

    const result = await userService.findUserByNickName({ nickname })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ nickname })

    expect(result).not.toBeNull()
    expect(result.nickname).toBe(nickname)
  })

  it('nickname 조회 실패 시, TypeORMError 반환', async () => {
    const email = 'ehgks0083@gmail.com'
    const data: CreateUserDto = {
      email,
      provider: 'google',
    }
    const nickname = 'kim'

    await userService.createUser(data)

    const spy = jest.spyOn(userService, 'findUserByNickName')

    const result = await userService.findUserByNickName({ nickname })
    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ nickname })

    expect(result).toBeNull()
  })
})
