import { MakeRegisterUseCase } from '@/use-cases/Organization/factories/make-register-use-case'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
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
    password: z.string(),
    address: z.string(),
    city: z.string(),
    postal_code: z.string(),
    image: z.string().default(''),
    whatsapp: z.string(),
  })

  const {
    name,
    name_responsible,
    email,
    password,
    address,
    city,
    postal_code,
    image,
    whatsapp,
  } = registerOrganizationBodySchema.parse(request.body)

  try {
    const registerUseCase = MakeRegisterUseCase()
    const organization = await registerUseCase.execute({
      name,
      name_responsible,
      email,
      password,
      address,
      city,
      postal_code,
      image,
      whatsapp,
    })

    return reply
      .status(201)
      .send({ message: 'Organization created!', organization })
  } catch (error) {
    if (error instanceof OrganizationAlreadyExistsError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
