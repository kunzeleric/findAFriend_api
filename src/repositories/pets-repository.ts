import { FindByCharacteristicsParams } from '@/@types/pets'
import { Prisma, Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findAllInACity(query: string, page: number): Promise<Pet[]>
  findByCharacteristics(params: FindByCharacteristicsParams): Promise<Pet[]>
}
