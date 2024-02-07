import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const organization = await prisma.organization.create({
    data: {
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password_hash: await hash('12345678', 10),
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      postal_code: '123456789',
      whatsapp: '123456789',
    },
  })

  const authResponse = await request(app.server).post('/authenticate').send({
    email: 'teste@teste.com',
    password: '12345678',
  })

  const { token } = authResponse.body

  return { token, organization }
}
