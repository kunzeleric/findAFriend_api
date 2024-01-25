import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'
import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { PrismaPetGalleryRepository } from '@/repositories/prisma/prisma-pet-gallery-repository'
import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { CreatePetUseCase } from '../create'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const galleryRepository = new PrismaPetGalleryRepository()
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()
  const organizationRepository = new PrismaOrganizationRepository()

  const makeCreatePetUseCase = new CreatePetUseCase(
    petsRepository,
    organizationRepository,
    adoptionRequirementsRepository,
    galleryRepository,
  )

  return makeCreatePetUseCase
}
