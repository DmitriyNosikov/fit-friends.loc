import { PrismaClient } from '@prisma/client'
import { getAdminUser, getOrders, getTrainings, getUsers } from './mock-data';

async function seedDB(prismaClient: PrismaClient) {
  // Add users
  const admin = await getAdminUser();
  const users = await getUsers();
  users.push(admin);
  await prismaClient.user.createMany({
    data: users
  });

  // Add trainings
  const trainings = getTrainings();
  await prismaClient.training.createMany({
    data: trainings
  });

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
