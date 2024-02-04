import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { FindByCharacteristicsParams } from '@/@types/pets'

export class InMemoryPetRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      energy: data.energy,
      environment: data.environment,
      independent: data.independent,
      city: data.city,
      type: data.type,
      photo: data.photo ?? null,
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      org_id: data.org_id,
    }

    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id) ?? null

    return pet
  }

  async findAllInACity(city: string) {
    return this.items.filter((item) => item.city === city) ?? null
  }

  async findByCharacteristics(params: FindByCharacteristicsParams) {
    return this.items.filter((item) => {
      return (
        item.city === params.city &&
        (params.age ? item.age === params.age : true) &&
        (params.energy ? item.energy === params.energy : true) &&
        (params.type ? item.type === params.type : true) &&
        (params.independent ? item.independent : true) &&
        (params.environment ? item.environment === params.environment : true)
      )
    })
  }
}
