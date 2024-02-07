import path from 'node:path'
import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyStatic from '@fastify/static'
import multer from 'fastify-multer'
import { organizationRoutes } from './http/controllers/organizations/routes'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(multer.contentParser)

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'tmp'),
  prefix: '/images/',
})

app.register(organizationRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    console.error(error)
    return reply
      .status(400)
      .send({ message: 'Validation error', error: error.message })
  }

  return reply.status(500).send({ message: 'Internal error' })
})
