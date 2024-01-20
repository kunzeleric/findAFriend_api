import fastify from 'fastify'
import { organizationRoutes } from './http/controllers/organizations/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(organizationRoutes)
