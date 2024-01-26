import { PetsRepository } from '@/repositories/pets-repository'
import {
  FindAllPetsInACityRequest,
  FindAllPetsInACityResponse,
} from '@/@types/pets'
import { ResourceDoesNotExistError } from '../errors/resource-does-not-exist-error'

export class FetchPetsInACityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FindAllPetsInACityRequest): Promise<FindAllPetsInACityResponse> {
    const pets = await this.petsRepository.findAllInACity(city)
    if (!pets) {
      throw new ResourceDoesNotExistError()
    }

    return { pets }
  }
}
