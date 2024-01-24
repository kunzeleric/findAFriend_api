import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsGalleryRepository } from '../pets-gallery-repository'

export class PrismaPetGalleryRepository implements PetsGalleryRepository {
  async create(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = await prisma.petGallery.create({
      data,
    })

    return petGallery
  }
}
