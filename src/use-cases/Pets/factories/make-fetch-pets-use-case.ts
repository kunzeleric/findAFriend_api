import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsInACityUseCase } from '../fetch-pets-in-a-city'

export function makeFetchPetsInACityUseCase() {
  const petsRepository = new PrismaPetRepository()
  const makeFetchPetsInACityUseCase = new FetchPetsInACityUseCase(
    petsRepository,
  )

  return makeFetchPetsInACityUseCase
}
