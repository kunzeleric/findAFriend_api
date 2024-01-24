import { Prisma, AdoptionRequirements } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  create(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput,
  ): Promise<AdoptionRequirements>
}
