import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { Environment } from 'vitest'
import { prisma } from '@/lib/prisma'

// generate database link (in postgres for example, it creates a new schema, a different environment)
function generateDataBaseURL(schema: string) {
  const envDatabaseURL = process.env.DATABASE_URL
  if (!envDatabaseURL) {
    throw new Error('Fill in environment variable DATABASE_URL')
  }

  const url = new URL(envDatabaseURL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDataBaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    // roda as migrations já existentes e criar as tabelas
    execSync('npx prisma migrate deploy')

    return {
      // dropa o schema do prisma para eliminar o schema depois dos testes rodarem
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema} CASCADE"`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
