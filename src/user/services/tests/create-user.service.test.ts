import 'reflect-metadata'
import Container from 'typedi'
import { UserService } from '..'
import { DB } from '../../../db'

import { CreateUser } from '../../types'

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
    const data: CreateUser = {
      user: { email: 'ehgks0083@gmail.com' },
      profile: { nickname: 'dohan', provider: 'google' },
    }

    const spy = jest.spyOn(userService, 'createUser')

    const { profile, ...restUser } = await userService.createUser(data)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(data)
    expect(restUser).toEqual(expect.objectContaining(data.user))
    expect(profile).toEqual(expect.objectContaining(data.profile))
  })
})
