import { PrismaClient } from '@prisma/client'
import { getOrders, getRandomIntInclusive, getReviews, getTrainingRequests, getTrainings, getUsers } from './mock-data';
import { RequestTypeEnum, RequestStatusEnum, UserRoleEnum } from '../../types';

async function seedDB(prismaClient: PrismaClient) {
  // Add users
  const users = await getUsers();

  await prismaClient.user.createMany({
    data: users
  });

  // Connect friends to users
  for (const currentUser of users) {
    if(currentUser.role !== UserRoleEnum.ADMIN) {
      continue;
    }
    // Add random friends to user
    const randomIndex = getRandomIntInclusive(0, users.length);
    const randomUser = users[randomIndex];
    
    if (!randomUser || randomUser.id == currentUser.id) {
      continue;
    }

    const randomUserId = users[randomIndex].id

    // Update current user
    currentUser.friendsList.push(randomUserId);

    await prismaClient.user.update({
      where: { id: currentUser.id },
      data: {
        friendsList: currentUser.friendsList,
        friends: (currentUser.friendsList.length > 0) ? {
          connect: currentUser.friendsList.map((friend) => ({ id: friend }))
        } : undefined
      }
    });

    // Update opposite user
    randomUser.friendsList.push(currentUser.id);

    await prismaClient.user.update({
      where: { id: randomUserId },
      data: {
        friendsList: randomUser.friendsList,
        friends: (randomUser.friendsList.length > 0) ? {
          connect: randomUser.friendsList.map((friend) => ({ id: friend }))
        } : undefined
      }
    });

    // Add friendship request
    const friendshipRequestData = {
      requestType: RequestTypeEnum.FRIENDSHIP,
      initiatorUserId: currentUser.id,
      targetUserId: randomUserId,
      status: RequestStatusEnum.ACCEPTED
    };

    await prismaClient.request.create({
      data: friendshipRequestData
    })
  }

  // Add trainings
  const trainings = getTrainings();

  trainings.map((training) => {
    const randomIndex = getRandomIntInclusive(0, users.length - 1);
    training.userId = users[randomIndex].id;
    training.trainersName = users[randomIndex].name
  });

  await prismaClient.training.createMany({
    data: trainings,
  });

  // Add orders + balance
  const orders = getOrders(users, trainings);
  for (const order of orders) {
    // Order
    await prismaClient.order.create({
      data: order
    });

    // Balance
    const balance = {
      userId: order.userId,
      trainingId: order.trainingId,
      remainingTrainingsCount: order.trainingsCount,
      hasTrainingStarted: Math.random() < 0.5 // Random boolean
    };

    await prismaClient.balance.create({
      data: balance
    });
  }

  // Add reviews
  const reviews = getReviews(users, trainings);
  await prismaClient.trainingReview.createMany({
    data: reviews
  })

  // Recount trainings rating via reviews
  for (const training of trainings) {
    const reviews = await prismaClient.trainingReview.findMany({
      where: { trainingId: training.id }
    });

    if (!reviews) {
      continue;
    }

    const generalRating: number = reviews.reduce((accumulator, item) => {
      return accumulator += item.rating;
    }, 0);

    const ratingAverage = Math.round(generalRating / reviews.length);

    await prismaClient.training.update({
      where: { id: training.id },
      data: { rating: ratingAverage }
    })
  }

  // Add training requests
  const trainingRequests = getTrainingRequests(users);
  await prismaClient.request.createMany({
    data: trainingRequests
  })

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
