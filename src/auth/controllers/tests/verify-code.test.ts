import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db/pg'
import { AuthService } from '../../services'
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

describe('verify code api test', () => {
  describe('DELETE /api/v1/auths', () => {
    const URL = '/api/v1/auths'
    const authService = Container.get(AuthService)
    it('URL 파라미터가 없으면, 400 반환', async () => {
      const params = 'in-valid-param'
      const res = await request(await createApp())
        .delete(`${URL}/${params}`)
        .send({})

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('In valid Body, 400 반환', async () => {
      const params = 1
      const body = {
        phoneNumber: '01012345678',
      }
      const res = await request(await createApp())
        .delete(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.BAD_REQUEST)
    })

    it('Verification이 없으면, 400 반환', async () => {
      const params = 1

      const body = {
        code: generateRandomCode(6),
      }
      const res = await request(await createApp())
        .delete(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })

    it('유저 업데이트 실패 시, 404 반환', async () => {
      const phoneNumber = '01012345678'
      const verification = await authService.createVerification({ phoneNumber })

      const params = verification.id
      const body = {
        code: verification.code,
      }
      const res = await request(await createApp())
        .delete(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })

    it('성공 시, 200 반환', async () => {
      const phoneNumber = '01012345678'
      const verification = await authService.createVerification({ phoneNumber })

      const params = verification.id
      const body = {
        phoneNumber,
        code: verification.code,
      }
      const res = await request(await createApp())
        .delete(`${URL}/${params}`)
        .send(body)

      expect(res.status).toBe(StatusCodes.NOT_FOUND)
    })
  })
})
