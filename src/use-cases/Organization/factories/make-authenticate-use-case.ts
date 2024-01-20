import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { AuthenticateUseCase } from '../authenticate'

export function MakeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}
