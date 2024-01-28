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

  it('should be able to register the adoption requirements', async () => {
    const createdPet = {
      id: 'pet-03',
      name: 'Test pet',
      about: 'Just a test pet',
      city: 'Curitiba',
      age: 'young',
      energy: 5,
      environment: 'indoor',
      independent: 'very much',
      org_id: 'org-02',
      type: 'cat',
      photo: 'test-pet-url',
      requirements: JSON.stringify(['Huge castle for cats', 'Infinite food']),
    }

    const parsedRequirements = JSON.parse(createdPet.requirements)

    parsedRequirements.forEach(async (requirement: string) => {
      const petRequirements = await petRequirementsRepository.create({
        title: requirement,
        pet_id: createdPet.id,
      })

      expect(petRequirements).toBeDefined()
      expect(petRequirements.id).toEqual(expect.any(String))
      expect(petRequirements.pet_id).toEqual(createdPet.id)
    })
  })

  it('should be able to register the images', async () => {
    const imagesData = JSON.stringify([
      {
        image: 'image1.jpg',
        pet_id: 'pet-03',
        base64: 'io21o32sdy08s9y078y78ssa',
      },
      {
        image: 'image2.jpg',
        pet_id: 'pet-03',
        base64: 'd87sats678t967sa67as6s8as',
      },
    ])

    const createdPet = {
      id: 'pet-03',
      name: 'Test pet',
      about: 'Just a test pet',
      city: 'Curitiba',
      age: 'young',
      energy: 5,
      environment: 'indoor',
      independent: 'very much',
      org_id: 'org-02',
      type: 'cat',
      photo: 'test-pet-url',
      pet_gallery: imagesData,
    }

    const parsedGallery = JSON.parse(createdPet.pet_gallery)

    for (const pic of parsedGallery) {
      const petGallery = await petGalleryRepository.create({
        image: pic.image,
        pet_id: createdPet.id,
        base64: pic.base64,
      })

      expect(petGallery).toBeDefined()
      expect(petGallery.pet_id).toEqual(createdPet.id)
      expect(petGallery.image).toEqual(expect.any(String))
    }
  })
})
