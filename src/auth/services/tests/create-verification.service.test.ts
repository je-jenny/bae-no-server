import 'reflect-metadata'
import Container from 'typedi'
import { QueryFailedError } from 'typeorm'
import { DB } from '../../../db'
import { AuthService } from '..'

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

describe('create-verification service test', () => {
  const authService = Container.get(AuthService)

  it('생성 성공 시, verification 객체 반환', async () => {
    const phoneNumber = '01012345678'
    const spy = jest.spyOn(authService, 'createVerification')

    const found = await authService.createVerification({ phoneNumber })

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith({ phoneNumber })

    expect(found.phone_number).toBe(phoneNumber)
  })

  it('번호가 13자 이상이면, 에러 반환', async () => {
    const phoneNumber = '0101234567891'
    const spy = jest.spyOn(authService, 'createVerification')

    try {
      await authService.createVerification({ phoneNumber })
    } catch (e) {
      //   expect(authService).toBe({})
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith({ phoneNumber })

      expect(e instanceof QueryFailedError).toBeTruthy()
    }
  })
})
