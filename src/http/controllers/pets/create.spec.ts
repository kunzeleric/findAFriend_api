import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('E2E: Create Pet Route Test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { organization, token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test pet',
        about: 'Just a test pet',
        city: 'Curitiba',
        age: 'young',
        energy: 5,
        environment: 'indoor',
        independent: 'very much',
        org_id: organization.id,
        type: 'cat',
        photo: '',
        requirements: JSON.stringify(['Needs a cool place', 'Lots of whiskas']),
      })

    expect(response.status).toBe(201)
  })
})
