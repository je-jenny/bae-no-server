import request from 'supertest'
import { createApp } from './app'

describe('app test', () => {
  it('GET /In-valid-url return 404', async () => {
    const res = await request(await createApp()).get('/un-valid-url')

    expect(res.status).toBe(404)
  })

  it('GET /health check, return 200', async () => {
    const res = await request(await createApp()).get('/health')

    expect(res.status).toBe(200)
  })
})
