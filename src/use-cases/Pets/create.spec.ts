import { describe, beforeEach, it, expect } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryPetRequirementsRepository } from '@/repositories/in-memory/in-memory-pets-requirements-repository'
import { InMemoryPetGalleryRepository } from '@/repositories/in-memory/in-memory-pet-gallery-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let petRequirementsRepository: InMemoryPetRequirementsRepository
let petGalleryRepository: InMemoryPetGalleryRepository
let sut: CreatePetUseCase

describe('Create Pet Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    petRequirementsRepository = new InMemoryPetRequirementsRepository()
    petGalleryRepository = new InMemoryPetGalleryRepository()

    sut = new CreatePetUseCase(
      petRepository,
      organizationRepository,
      petRequirementsRepository,
      petGalleryRepository,
    )
  })
  it('should be able to register a pet', async () => {
    const organization = await organizationRepository.create({
      id: 'org-01',
      name: 'The dudes of the green world',
      name_responsible: '2Pac',
      email: 'dudes@green.com',
      address: '123 Main St',
      city: 'Rio de Janeiro',
      password_hash: '123456',
      postal_code: '80540290',
      whatsapp: '123456789',
    })

    const imagesData = [
      {
        image: 'image1.jpg',
        pet_id: 'pet-01',
        base64: 'io21o32sdy08s9y078y78ssa',
      },
      {
        image: 'image2.jpg',
        pet_id: 'pet-01',
        base64: 'd87sats678t967sa67as6s8as',
      },
    ]

    const createdPet = await sut.execute({
      name: 'Test pet',
      about: 'Just a test pet',
      city: organization.city,
      age: 'young',
      energy: 5,
      environment: 'indoor',
      independent: 'very much',
      org_id: organization.id,
      type: 'cat',
      images: imagesData,
      photo: imagesData[0].image,
      requirements: JSON.stringify(['Needs a cool place', 'Lots of whiskas']),
    })

    expect(createdPet).toBeDefined()
    expect(createdPet.pet.id).toEqual(expect.any(String))
  })
})
