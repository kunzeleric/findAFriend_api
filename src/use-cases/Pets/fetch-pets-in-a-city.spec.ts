import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchPetsInACityUseCase } from './fetch-pets-in-a-city'

let petRepository: InMemoryPetRepository
let sut: FetchPetsInACityUseCase

describe('Find All Pets In a City Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetsInACityUseCase(petRepository)
  })
  it('should be able to fetch all pets within a city', async () => {
    await petRepository.create({
      id: 'pet-01',
      name: 'Test pet',
      about: 'Just a test pet',
      city: 'São Paulo',
      age: 'young',
      energy: 5,
      environment: 'indoor',
      independent: 'very much',
      org_id: 'org-02',
      type: 'cat',
      photo: 'test-pet-url',
    })

    await petRepository.create({
      id: 'pet-02',
      name: 'Test pet',
      about: 'Just a test pet',
      city: 'Curitiba',
      age: 'young',
      energy: 5,
      environment: 'indoor',
      independent: 'a little',
      org_id: 'org-02',
      type: 'cat',
      photo: 'test-pet-url',
    })

    const paramsCitySearch = 'Curitiba'

    const { pets } = await sut.execute({ city: paramsCitySearch })

    expect(pets).toHaveLength(1)
    console.log(pets)
    expect(pets).toEqual([expect.objectContaining({ city: 'Curitiba' })])
  })
})
