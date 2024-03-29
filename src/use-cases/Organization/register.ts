import {
  OrganizationRegisterRequest,
  OrganizationRegisterResponse,
} from '@/@types/organizations'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from '../errors/organization-already-exists-error'

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    name,
    name_responsible,
    password,
    address,
    city,
    email,
    image,
    postal_code,
    whatsapp,
  }: OrganizationRegisterRequest): Promise<OrganizationRegisterResponse> {
    const password_hash = await hash(password, 10)

    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      name_responsible,
      email,
      password_hash,
      address,
      city,
      image,
      postal_code,
      whatsapp,
    })

    return { organization }
  }
}
