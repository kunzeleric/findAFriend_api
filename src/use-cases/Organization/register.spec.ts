import { RegisterUseCase } from './register'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'
import { compare } from 'bcryptjs'

let organizationRepository: InMemoryOrganizationRepository
let sut: RegisterUseCase

describe('Register Organization Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new RegisterUseCase(organizationRepository)
  })
  it('should be able to register an organization', async () => {
    const { organization } = await sut.execute({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password: '123456789',
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to register an organization with the same email', async () => {
    await sut.execute({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password: '123456789',
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    await expect(() =>
      sut.execute({
        name: 'Teste 123',
        name_responsible: 'Testandoooo',
        password: '123456789',
        address: 'Rua Teste 123',
        city: 'Cidade Teste 123',
        email: 'teste@teste.com',
        image: 'https://example.com/image.png',
        postal_code: '123456789',
        whatsapp: '123456789',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should be able to hash an organization password', async () => {
    const { organization } = await sut.execute({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password: '123456789',
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456789',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })
})
