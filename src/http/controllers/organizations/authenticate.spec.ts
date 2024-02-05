import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('E2E: Authenticate Route Test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a organization', async () => {
    await request(app.server).post('/organization').send({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password: '12345678',
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    const response = await request(app.server).post('/authenticate').send({
      email: 'teste@teste.com',
      password: '12345678',
    })

    expect(response.status).toBe(200)
  })
})
