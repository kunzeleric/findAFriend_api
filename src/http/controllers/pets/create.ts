import { FileName } from '@/@types/pets'
import { makeCreatePetUseCase } from '@/use-cases/Pets/factories/make-create-pet-use-case'
import { InvalidRequirementsError } from '@/use-cases/errors/invalid-requirements-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { File } from 'fastify-multer/lib/interfaces'
import { z } from 'zod'

declare module 'fastify' {
  export interface FastifyRequest {
    files: File[]
  }
}

export const create = async (req: FastifyRequest, reply: FastifyReply) => {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    energy: z.coerce.number(),
    independent: z.string(),
    environment: z.string(),
    type: z.string(),
    city: z.string(),
    requirements: z.string(),
    photo: z.string(),
  })

  const {
    name,
    about,
    age,
    city,
    energy,
    environment,
    independent,
    type,
    requirements,
    photo,
  } = createPetBodySchema.parse(req.body)

  const org_id = req.user.sub

  try {
    const createPetUseCase = makeCreatePetUseCase()
    const base64EncodedPaths = req.files
      ? req.files.map((item) =>
          btoa(item.buffer ? item.buffer.toString('base64') : ''),
        )
      : null

    const images: FileName[] = req.files.map((file, index) => ({
      image: file.originalname ?? '',
      base64: base64EncodedPaths ? base64EncodedPaths[index] : '',
    }))

    const { pet } = await createPetUseCase.execute({
      name,
      about,
      age,
      city,
      energy,
      environment,
      independent,
      type,
      images,
      org_id,
      requirements,
      photo,
    })

    return reply.status(201).send({ pet })
  } catch (error) {
    console.log(error)
    if (error instanceof InvalidRequirementsError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
