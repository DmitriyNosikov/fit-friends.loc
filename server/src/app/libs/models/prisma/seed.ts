import { PrismaClient } from '@prisma/client'
import { getAdminUser, getOrders, getTrainings } from './mock-data';

async function seedDB(prismaClient: PrismaClient) {
  // Add default user (admin)
  const admin = getAdminUser();
  await prismaClient.user.create({
    data: admin
  });

  // Add trainings
  const trainings = getTrainings();
  for(const training of trainings) {
    await prismaClient.training.create({
      data: training
    });
  }

  // Add orders + balance
  const orders = getOrders();
  for(const order of orders) {
    // Order
    await prismaClient.order.create({
      data: {
        ...order,
        balance: {
          create: {
            remainingTrainingsCount: order.trainingsCount,
          }
        }
      }
    });
  }

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
