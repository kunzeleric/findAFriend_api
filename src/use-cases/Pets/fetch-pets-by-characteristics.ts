import { PetsRepository } from '@/repositories/pets-repository'
import {
  FindByCharacteristicsRequest,
  FindByCharacteristicsResponse,
} from '@/@types/pets'
import { PetsNotFoundError } from '../errors/pets-not-found-error'

export class FetchPetsByCharacteristicUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    type,
    independent,
    environment,
  }: FindByCharacteristicsRequest): Promise<FindByCharacteristicsResponse> {
    const pets = await this.petsRepository.findByCharacteristics({
      city,
      age,
      energy,
      type,
      independent,
      environment,
    })

    if (pets.length === 0) {
      throw new PetsNotFoundError()
    }

    return { pets }
  }
}
