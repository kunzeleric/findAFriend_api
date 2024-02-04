import { makeFetchPetsByCharacteristicsUseCase } from '@/use-cases/Pets/factories/make-fetch-pets-by-characteristic-use-case'
import { PetsNotFoundError } from '@/use-cases/errors/pets-not-found-error'
import { ResourceDoesNotExistError } from '@/use-cases/errors/resource-does-not-exist-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const findAllByCharacteristics = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  const fetchAllPetsBodySchema = z.object({
    city: z.string(),
    age: z.string(),
    energy: z.coerce.number(),
    type: z.string(),
    independent: z.string(),
    environment: z.string(),
  })

  const { city, age, energy, environment, independent, type } =
    fetchAllPetsBodySchema.parse(req.query)
  try {
    const fetchPetsUseCase = makeFetchPetsByCharacteristicsUseCase()

    const pets = await fetchPetsUseCase.execute({
      city,
      age,
      energy,
      environment,
      independent,
      type,
    })

    return reply.status(200).send(pets)
  } catch (error) {
    if (error instanceof PetsNotFoundError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
