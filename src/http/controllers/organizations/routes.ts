import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'

export const organizationRoutes = async (app: FastifyInstance) => {
  app.post('/organization', register)
  app.post('/authenticate', authenticate)
}
