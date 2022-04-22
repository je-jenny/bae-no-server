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

describe('create-user service test', () => {
  const userService = Container.get(UserService)

  it('유저 생성 성공 시, 유저 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }
    const { email, ...restProfile } = data

    const spy = jest.spyOn(userService, 'createUser')

    const { profile, ...restUser } = await userService.createUser(data)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(data)

    expect(profile).toEqual(expect.objectContaining(restProfile))
    expect(restUser).toEqual(expect.objectContaining({ email }))
  })

  it('유저 email 중복 생성 시, QueryFailedError 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      provider: 'google',
    }

    const spy = jest.spyOn(userService, 'createUser')

    await userService.createUser(data)

    try {
      await userService.createUser(data)
    } catch (e) {
      expect(spy).toBeCalledTimes(2)
      expect(spy).toBeCalledWith(data)

      expect(e instanceof QueryFailedError).toBeTruthy()
    }
  })
})
