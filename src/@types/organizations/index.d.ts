import { Organization } from '@prisma/client'

export interface OrganizationRegisterRequest {
  name: string
  name_responsible: string
  email: string
  password: string
  address: string
  city: string
  postal_code: string
  image: string
  role?: 'admin' | 'member'
}

export interface OrganizationRegisterResponse {
  organization: Organization
}
