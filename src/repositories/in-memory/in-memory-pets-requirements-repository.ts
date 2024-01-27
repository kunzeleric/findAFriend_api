import { AdoptionRequirements, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PetRequirementsRepository } from '../pets-requirements-repository'

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public items: AdoptionRequirements[] = []
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const petRequirements = {
      id: randomUUID(),
      title: data.title,
      pet_id: data.pet_id,
    }

    this.items.push(petRequirements)

    return petRequirements
  }
}
