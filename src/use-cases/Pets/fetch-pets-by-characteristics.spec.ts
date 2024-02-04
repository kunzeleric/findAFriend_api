import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { FetchPetsByCharacteristicUseCase } from './fetch-pets-by-characteristics'

let petRepository: InMemoryPetRepository
let sut: FetchPetsByCharacteristicUseCase

describe('Find All PetsBy Characteristic in a City Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetsByCharacteristicUseCase(petRepository)
  })
  it('should be able to fetch all pets within a city with informed characteristics', async () => {
    await petRepository.create({
      id: 'pet-01',
      name: 'Test pet',
      about: 'Just a test pet',
      city: 'Curitiba',
      age: 'old',
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

    console.log(petRepository.items)

    const { pets } = await sut.execute({ city: paramsCitySearch, age: 'old' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ age: 'old' })])
  })
})
