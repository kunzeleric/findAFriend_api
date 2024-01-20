import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { RegisterUseCase } from '../register'

export function MakeRegisterUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const registerUseCase = new RegisterUseCase(organizationsRepository)

  return registerUseCase
}
