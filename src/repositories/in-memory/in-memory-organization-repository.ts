import { Organization, Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = []
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      name_responsible: data.name_responsible,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      address: data.address,
      city: data.city,
      postal_code: data.postal_code,
      image: data.image ?? null,
    }

    this.items.push(organization)

    return organization
  }

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.items.find((item) => item.id === id)

    if (!organization) {
      return null
    }

    return organization
  }
}
