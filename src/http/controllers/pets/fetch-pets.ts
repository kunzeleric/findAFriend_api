import { makeFetchPetsInACityUseCase } from '@/use-cases/Pets/factories/make-fetch-pets-use-case'
import { ResourceDoesNotExistError } from '@/use-cases/errors/resource-does-not-exist-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const findAllInACity = async (
  req: FastifyRequest<{ Params: { city: string } }>,
  reply: FastifyReply,
) => {
  const fetchAllPetsBodySchema = z.object({
    city: z.string(),
  })

  const { city } = fetchAllPetsBodySchema.parse(req.params)
  try {
    const fetchPetsUseCase = makeFetchPetsInACityUseCase()

    const pets = await fetchPetsUseCase.execute({ city })

    return reply.status(200).send(pets)
  } catch (error) {
    if (error instanceof ResourceDoesNotExistError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
