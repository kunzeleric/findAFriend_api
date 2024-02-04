import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetsRepository } from '../pets-repository'
import { FindByCharacteristicsParams } from '@/@types/pets'

export class PrismaPetRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findAllInACity(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findByCharacteristics(params: FindByCharacteristicsParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: {
          contains: params.age ?? '',
        },
        energy: params.energy
          ? {
              equals: params.energy,
            }
          : undefined,
        type: {
          contains: params.type ?? '',
        },
        independent: {
          contains: params.independent ?? '',
        },
        environment: {
          contains: params.environment ?? '',
        },
        city: {
          contains: params.city,
        },
      },
    })

    return pets
  }
}
