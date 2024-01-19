import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    name_responsible: z.string(),
    email: z.string(),
    password_hash: z.string(),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    image: z.string(),
    role: z.enum(['ADMIN', 'USER']),
  })

  const {
    name,
    name_responsible,
    email,
    password_hash,
    address,
    city,
    postal_code,
    image,
    role,
  } = registerOrganizationBodySchema.parse(request.body)

  // use case factory comes in action
}
