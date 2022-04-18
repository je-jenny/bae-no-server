import 'reflect-metadata'
import Container from 'typedi'
import { QueryFailedError } from 'typeorm'
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

describe('find-verification-by-phone-number-and-code service test', () => {
  const authService = Container.get(AuthService)

  it('생성 성공 시, verification 객체 반환', async () => {
    const phoneNumber = '01012345678'
    const createdVerification = await authService.createVerification({
      phoneNumber,
    })

    const spy = jest.spyOn(authService, 'findVerificationByPhoneNumberAndCode')

    const data = { phoneNumber, code: createdVerification.code }

    const found = await authService.findVerificationByPhoneNumberAndCode(data)

    expect(spy).toBeCalledTimes(1)
    expect(spy).toBeCalledWith(data)

    expect(found!.phone_number).toBe(phoneNumber)
  })

  //   it('삭제된 것을 조회 시, null 반환', async () => {
  //     const phoneNumber = '01012345678'
  //     const createdVerification = await authService.createVerification({
  //       phoneNumber,
  //     })
  //     await authService.deleteVerificationById(createdVerification.id)

  //     const spy = jest.spyOn(authService, 'findVerificationByPhoneNumberAndCode')

  //     const data = { phoneNumber, code: createdVerification.code }

  //     const found = await authService.findVerificationByPhoneNumberAndCode(data)

  //     expect(spy).toBeCalledTimes(1)
  //     expect(spy).toBeCalledWith(data)

  //     expect(found).toBeNull()
  //   })

  it('번호가 13자 이상이면, 에러 반환', async () => {
    const phoneNumber = '0101234567891'
    const spy = jest.spyOn(authService, 'createVerification')

    try {
      await authService.createVerification({ phoneNumber })
    } catch (e) {
      expect(spy).toBeCalledTimes(1)
      expect(spy).toBeCalledWith({ phoneNumber })

      expect(e instanceof QueryFailedError).toBeTruthy()
    }
  })
})
