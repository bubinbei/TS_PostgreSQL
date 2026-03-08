import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
}
const adapter = new PrismaPg({
    connectionString: databaseUrl,
});
const prisma = new PrismaClient({
    adapter,
});
const withPrisma = async (c, next) => {
    if (!c.get('prisma')) {
        c.set('prisma', prisma);
    }
    await next();
};
export default withPrisma;
