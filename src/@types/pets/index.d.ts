import { Pet } from '@prisma/client'

export interface FileName {
  id?: string
  filename: string
  filepath?: string
  type?: string
}

export interface PetsCreateRequest {
  id: string
  name: string
  about: string
  age: string
  energy: number
  independent: string
  environment: string
  image?: FileName[]
  requirements: string
  city: string
  adopted_at?: string
  org_id: string
}

export interface PetsCreateResponse {
  pet: Pet
}
