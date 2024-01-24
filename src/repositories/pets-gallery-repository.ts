import { Prisma, PetGallery } from '@prisma/client'

export interface PetsGalleryRepository {
  create(data: Prisma.PetGalleryUncheckedCreateInput): Promise<PetGallery>
}
