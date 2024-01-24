import { PetsRepository } from '@/repositories/pets-repository'
import { PetsCreateRequest, PetsCreateResponse } from '@/@types/pets'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { AdoptionRequirementsRepository } from '@/repositories/pets-requirements-repository'
import { PetsGalleryRepository } from '@/repositories/pets-gallery-repository'
import { ResourceDoesNotExistError } from '../errors/resource-does-not-exist-error'
import { InvalidRequirementsError } from '../errors/invalid-requirements-error'

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
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
    image,
    requirements,
  }: PetsCreateRequest): Promise<PetsCreateResponse> {
    const organization = await this.organizationsRepository.findById(org_id)

    if (!organization) {
      throw new ResourceDoesNotExistError()
    }

    const petPhoto = image ? image[0].filename : null

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      energy,
      independent,
      environment,
      image: petPhoto,
      city,
      org_id: organization.id,
    })

    const requirementsJSON = JSON.parse(requirements)
    const checkRequirementsLength = requirementsJSON.length <= 0

    if (!checkRequirementsLength) {
      throw new InvalidRequirementsError()
    }

    for (const requirement of requirementsJSON) {
      await this.adoptionRequirementsRepository.create({
        title: requirement,
        pet_id: pet.id,
      })
    }

    if (image) {
      for (const pic of image) {
        await this.petsGalleryRepository.create({
          image: pic.filename,
          pet_id: pet.id,
        })
      }
    }

    return { pet }
  }
}
