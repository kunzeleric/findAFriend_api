import { PetsRepository } from '@/repositories/pets-repository'
import { PetsCreateRequest, PetsCreateResponse } from '@/@types/pets'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRequirementsRepository } from '@/repositories/pets-requirements-repository'
import { PetsGalleryRepository } from '@/repositories/pets-gallery-repository'
import { ResourceDoesNotExistError } from '../errors/resource-does-not-exist-error'
import { InvalidRequirementsError } from '../errors/invalid-requirements-error'

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationRepository,
    private petRequirementsRepository: PetRequirementsRepository,
    private petsGalleryRepository: PetsGalleryRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    energy,
    environment,
    independent,
    org_id,
    city,
    images,
    requirements,
    type,
  }: PetsCreateRequest): Promise<PetsCreateResponse> {
    const organization = await this.organizationsRepository.findById(org_id)

    if (!organization) {
      throw new ResourceDoesNotExistError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy,
      independent,
      environment,
      photo: images.length > 0 ? images[0].image : '',
      city,
      org_id: organization.id,
      type,
    })

    const requirementArray = JSON.parse(requirements)
    const checkRequirementsLength = requirementArray.length > 0

    if (!checkRequirementsLength) {
      throw new InvalidRequirementsError()
    }

    for (const requirement of requirementArray) {
      await this.petRequirementsRepository.create({
        title: requirement,
        pet_id: pet.id,
      })
    }

    if (images && images.length > 0) {
      for (const pic of images) {
        await this.petsGalleryRepository.create({
          image: pic.image,
          pet_id: pet.id,
          base64: pic.base64,
        })
      }
    }

    return { pet }
  }
}
