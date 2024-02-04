import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { FetchPetsByCharacteristicUseCase } from '../fetch-pets-by-characteristics'

export const makeFetchPetsByCharacteristicsUseCase = () => {
  const petsRepository = new PrismaPetRepository()
  const makeFetchPetsByCharacteristicsUseCase =
    new FetchPetsByCharacteristicUseCase(petsRepository)
  return makeFetchPetsByCharacteristicsUseCase
}
