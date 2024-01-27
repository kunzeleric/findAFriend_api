import { PetGallery, Prisma } from '@prisma/client'
import { PetsGalleryRepository } from '../pets-gallery-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetGalleryRepository implements PetsGalleryRepository {
  public items: PetGallery[] = []
  async create(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = {
      id: data.id ?? randomUUID(),
      image: data.image,
      base64: data.base64 ?? null,
      pet_id: data.pet_id,
    }

    this.items.push(petGallery)

    return petGallery
  }
}
