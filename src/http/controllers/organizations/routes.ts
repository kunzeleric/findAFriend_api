import { FastifyInstance } from 'fastify'
import { register } from './register'

export const organizationRoutes = async (app: FastifyInstance) => {
  app.post('/organization', register)
}
