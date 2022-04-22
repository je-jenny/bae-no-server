import 'reflect-metadata'
import Container from 'typedi'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { createApp } from '../../../app'
import { DB } from '../../../db/pg'

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

describe('create verification api test', () => {
  describe('POST /api/v1/auths', () => {
    const URL = '/api/v1/auths'
    it('verification 생성 성공 시, 200 반환', async () => {
      const body = {
        phoneNumber: '01012345678',
      }
      const res = await request(await createApp())
        .post(URL)
        .send(body)

      expect(res.status).toBe(StatusCodes.OK)
    })
  })
})
