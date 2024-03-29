import { makeFetchPetsInACityUseCase } from '@/use-cases/Pets/factories/make-fetch-pets-use-case'
import { ResourceDoesNotExistError } from '@/use-cases/errors/resource-does-not-exist-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const findAllInACity = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const fetchAllPetsQueryParams = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = fetchAllPetsQueryParams.parse(req.query)

  try {
    const fetchPetsUseCase = makeFetchPetsInACityUseCase()

    const pets = await fetchPetsUseCase.execute({ query, page })

    return reply.status(200).send(pets)
  } catch (error) {
    if (error instanceof ResourceDoesNotExistError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
