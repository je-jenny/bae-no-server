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

describe('create-user service test', () => {
  const userService = Container.get(UserService)

  it('유저 생성 성공 시, 유저 객체 반환', async () => {
    const data: CreateUserDto = {
      email: 'ehgks0083@gmail.com',
      nickname: 'dohan',
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
})
