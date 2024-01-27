import { Prisma, AdoptionRequirements } from '@prisma/client'

export interface PetRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements>
}
