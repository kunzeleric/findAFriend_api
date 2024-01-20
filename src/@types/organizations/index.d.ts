import { Organization } from '@prisma/client'

export interface OrganizationRegisterRequest {
  name: string
  name_responsible: string
  email: string
  password: string
  address: string
  city: string
  postal_code: string
  image?: string
}

export interface OrganizationRegisterResponse {
  organization: Organization
}

export interface OrganizationAuthenticationRequest {
  email: string
  password: string
}

export interface OrganizationAuthenticationResponse {
  organization: Organization
}
