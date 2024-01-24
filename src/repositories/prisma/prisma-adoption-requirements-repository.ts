import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../pets-requirements-repository'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async create(data: Prisma.AdoptionRequirementsUncheckedCreateInput) {
    const adoptionRequirements = await prisma.adoptionRequirements.create({
      data,
    })

    return adoptionRequirements
  }
}
