import 'reflect-metadata'
import Container from 'typedi'
import { DB } from '../../../db'
import { AuthService } from '../..'

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

describe('find-verification-by-id service test', () => {
  const authService = Container.get(AuthService)

  it('조회 실패 시, null 반환', async () => {
    const spy = jest.spyOn(authService, 'findVerificationById')

    const id = 1
    const found = await authService.findVerificationById(id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(id)

    expect(found).toBeNull()
  })

  it('조회 성공 시, verification 객체 반환', async () => {
    const phoneNumber = '01012345678'
    const { id } = await authService.createVerification({
      phoneNumber,
    })

    const spy = jest.spyOn(authService, 'findVerificationById')

    const found = await authService.findVerificationById(id)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(id)

    expect(found!.phone_number).toBeFalsy()
    expect(found!.code).not.toBeNull()
  })
})
