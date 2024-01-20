import { MakeAuthenticateUseCase } from '@/use-cases/Organization/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateOrganizationBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateOrganizationBodySchema.parse(
    request.body,
  )

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ error: error.message })
    }

    throw error
  }
}
