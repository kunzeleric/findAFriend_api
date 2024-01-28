import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRequirementsRepository } from '../pets-requirements-repository'

export class PrismaPetRequirementsRepository
  implements PetRequirementsRepository
{
  async create(data: Prisma.PetRequirementsUncheckedCreateInput) {
    const petRequirements = await prisma.petRequirements.create({
      data,
    })

    return petRequirements
  }
}
