import 'reflect-metadata'
import Container from 'typedi'
import { QueryFailedError } from 'typeorm'
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

describe('update-user service test', () => {
  const userService = Container.get(UserService)

  it('nickname이 최대 길이 초과 시, 에러 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }
    const user = await userService.createUser(data)

    const spy = jest.spyOn(userService, 'updateUserProfile')

    // 최대길이 12 초과
    const nickname = 'inserted Nick'

    try {
      await userService.updateUserProfile(user.id, {
        nickname,
      })
    } catch (e) {
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith(user.id, { nickname })

      expect(e instanceof QueryFailedError).toBeTruthy()
    }
  })

  it('유저 업데이트 성공 시, 유저 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }
    const user = await userService.createUser(data)

    const spy = jest.spyOn(userService, 'updateUserProfile')

    const nickname = 'insertedNick'

    const updatedUser = await userService.updateUserProfile(user.id, {
      nickname,
    })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(user.id, { nickname })

    expect(updatedUser.affected).toBe(1)
  })
})
