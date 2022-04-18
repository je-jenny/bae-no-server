import 'reflect-metadata'
import Container from 'typedi'
// import { QueryFailedError } from 'typeorm'
import { DB } from '../../../db'
import { AuthService } from '../..'
import { generateRandomCode } from '../../../utils'

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

describe('delete-verification-by-id service test', () => {
  const authService = Container.get(AuthService)

  it('삭제 성공 시, verification 객체 반환', async () => {
    const createdVerification = await authService.createVerification({
      phoneNumber: '01012345678',
    })
    const data = { id: createdVerification.id, code: createdVerification.code }

    const spy = jest.spyOn(authService, 'deleteVerificationByIdAndCode')

    const found = await authService.deleteVerificationByIdAndCode(data)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(data)

    expect(found.affected).toBe(1)
  })

  it('없는 Verification 삭제 시도 시, 에러 반환', async () => {
    const spy = jest.spyOn(authService, 'deleteVerificationByIdAndCode')

    const data = { id: 1, code: generateRandomCode(6) }

    const found = await authService.deleteVerificationByIdAndCode(data)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(data)

    expect(found.affected).toBe(0)
  })
})
