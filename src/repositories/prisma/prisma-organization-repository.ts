import { Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const user = await prisma.organization.create({
      data,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
