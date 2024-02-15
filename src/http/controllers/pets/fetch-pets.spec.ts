import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('E2E: Fetch Pets Route Test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { organization, token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test pet 2',
        about: 'Just a test pet 2',
        city: 'São Paulo',
        age: 'adult',
        energy: 5,
        environment: 'small places',
        independent: 'not at all',
        org_id: organization.id,
        type: 'dog',
        photo: 'image-pet-2-url',
        requirements: JSON.stringify(['Needs a needy owner', 'Lots of treats']),
      })

    const response = await request(app.server)
      .get('/pets/city')
      .set('Authorization', `Bearer ${token}`)
      .query({ query: 'Curitiba' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })
})
