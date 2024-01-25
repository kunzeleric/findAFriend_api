import { Pet } from '@prisma/client'

export interface FileName {
  id?: string
  filename: string
  type?: string
  base64: string
}

export interface PetsCreateRequest {
  name: string
  about: string
  age: string
  energy: number
  type: string
  independent: string
  environment: string
  images?: FileName[]
  photo: string
  requirements: string
  city: string
  adopted_at?: string
  org_id: string
}

export interface PetsCreateResponse {
  pet: Pet
}
