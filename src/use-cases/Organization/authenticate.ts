import {
  OrganizationAuthenticationRequest,
  OrganizationAuthenticationResponse,
} from '@/@types/organizations'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: OrganizationAuthenticationRequest): Promise<OrganizationAuthenticationResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
