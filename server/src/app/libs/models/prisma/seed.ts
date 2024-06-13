import { PrismaClient } from '@prisma/client'

async function seedDB(prismaClient: PrismaClient) {
  console.log('Method for database filling not implemented yet. Prisma client: ', prismaClient);

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDB(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
