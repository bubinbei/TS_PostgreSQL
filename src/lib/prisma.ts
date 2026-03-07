import { PrismaPg } from '@prisma/adapter-pg'
import type { MiddlewareHandler } from 'hono'
import { PrismaClient } from '../generated/prisma/client.js'

export type AppBindings = {
  Variables: {
    prisma: PrismaClient
  }
}

const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined')
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
})

const prisma = new PrismaClient({
  adapter,
})

const withPrisma: MiddlewareHandler<AppBindings> = async (c, next) => {
  if (!c.get('prisma')) {
    c.set('prisma', prisma)
  }
  await next()
}

export default withPrisma
