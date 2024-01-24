import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Organization Case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })
  it('should be able to authenticate an organization', async () => {
    await organizationRepository.create({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password_hash: await hash('123456789', 10),
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    const { organization } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456789',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an organization with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an organization with wrong password', async () => {
    await organizationRepository.create({
      name: 'Teste 123',
      name_responsible: 'Testandoooo',
      password_hash: await hash('123456789', 10),
      address: 'Rua Teste 123',
      city: 'Cidade Teste 123',
      email: 'teste@teste.com',
      image: 'https://example.com/image.png',
      postal_code: '123456789',
      whatsapp: '123456789',
    })

    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: 'dasdsa',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
