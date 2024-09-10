import { randomUUID } from 'crypto';
import { PaymentTypeEnum } from '../../../../../../shared/types/';
import { BCryptHasher } from '../../helpers/hasher/bcrypt.hasher';
import {
  GenderEnum,
  LocationEnum,
  TrainingDurationEnum,
  TrainingTypeEnum,
  trainingTypeList,
  UserLevelEnum,
  UserRoleEnum,
  TrainingRequestStatusEnum
} from '../../types';
import { TrainingInterface } from '../../../training/interfaces';
import { AuthUserInterface } from '../../../user/interfaces';
import { TrainingReviewValidation } from '../../../training-review/training-review.constant';

export async function getAdminUser(): Promise<AuthUserInterface> {
  const hasher = new BCryptHasher();
  const password = "jarvis-123";
  const passwordHash = await hasher.getHash(password);;
  // const passwordHash = "$2b$10$lN0OTYWz8V9Bl4UA/Pr5z.xCbLL63fQ71B/jtAV96yrwuDFtBJhhO";

  return {
    id: randomUUID(),
    email: "iron-man@starkindustries.it",
    name: "Tony",
    passwordHash: passwordHash,
    gender: "мужской",
    location: "звездная",
    role: UserRoleEnum.ADMIN,
    level: UserLevelEnum.PRO,
    dayCaloriesLimit: 3300,
    loseCaloriesLimit: 7800,
    trainingType: trainingTypeList
  };
}

export async function getUsers(): Promise<AuthUserInterface[]> {
  const hasher = new BCryptHasher();
  const password = "123456";
  const passwordHash = await hasher.getHash(password);
  const users = [
    await getAdminUser(),

    {
      id: randomUUID(),
      email: "test0@test.ru",
      name: "Dwain",
      passwordHash,
      avatar: "/img/content/avatars/users/photo-1.png",
      gender: GenderEnum.MALE,
      location: LocationEnum.SPORTIVNAYA,
      role: UserRoleEnum.TRAINER,
      level: UserLevelEnum.PRO,
      dayCaloriesLimit: 3200,
      loseCaloriesLimit: 4800,
      trainingType: trainingTypeList.slice(1),
      certificates: [
        '/img/content/certificates/1.pdf',
        '/img/content/certificates/2.pdf',
        '/img/content/certificates/3.pdf',
        '/img/content/certificates/4.pdf'
      ]
    },

    {
      id: randomUUID(),
      email: "test1@test.ru",
      name: "Alex",
      passwordHash,
      avatar: "/img/content/avatars/users/photo-1.png",
      gender: GenderEnum.MALE,
      location: LocationEnum.PETROGRADSKAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.REGULAR,
      dayCaloriesLimit: 2500,
      loseCaloriesLimit: 3800,
      trainingType: trainingTypeList.slice(2)
    },
    {
      id: randomUUID(),
      email: "test2@test.ru",
      name: "Maria",
      passwordHash,
      avatar: "/img/content/avatars/users/photo-2.png",
      gender: GenderEnum.FEMALE,
      location: LocationEnum.UDELNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.NEWBIE,
      dayCaloriesLimit: 1200,
      loseCaloriesLimit: 5000,
      trainingType: trainingTypeList.slice(3)
    },
    {
      id: randomUUID(),
      email: "test3@test.ru",
      name: "Rick",
      passwordHash,
      avatar: "/img/content/avatars/users/photo-4.png",
      gender: GenderEnum.MALE,
      location: LocationEnum.ZVEZDNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.PRO,
      dayCaloriesLimit: 4800,
      loseCaloriesLimit: 3000,
      trainingType: trainingTypeList
    },
    {
      id: randomUUID(),
      email: "test4@test.ru",
      name: "Lina",
      passwordHash,
      avatar: "/img/content/avatars/users/photo-3.png",
      gender: GenderEnum.FEMALE,
      location: LocationEnum.SPORTIVNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.REGULAR,
      dayCaloriesLimit: 2300,
      loseCaloriesLimit: 4800,
      trainingType: trainingTypeList.slice(4)
    },
  ];

  return users;
}

export function getTrainings() {
  return [
    {
      id: randomUUID(),
      title: "fitball",
      background: "/img/content/thumbnails/training-01.jpg",
      userLevel: UserLevelEnum.NEWBIE,
      trainingType: TrainingTypeEnum.YOGA,
      trainingDuration: TrainingDurationEnum.HOUR,
      price: 1000,
      calories: 1100,
      description: "Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Johny",
      rating: 0,
      isSpecial: false,
      userId: ""
    },
    {
      id: randomUUID(),
      title: "run, forrest",
      background: "/img/content/thumbnails/training-02.jpg",
      userLevel: UserLevelEnum.REGULAR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.HALF_HOUR,
      price: 1500,
      discount: 600,
      calories: 1450,
      description: "Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.",
      gender: GenderEnum.MALE,
      video: "test/video/later.avi",
      trainersName: "Alexa",
      rating: 0,
      isSpecial: true,
      userId: ""
    },
    {
      id: randomUUID(),
      title: "full body stretch",
      background: "/img/content/thumbnails/training-03.jpg",
      userLevel: UserLevelEnum.REGULAR,
      trainingType: TrainingTypeEnum.STRETCHING,
      trainingDuration: TrainingDurationEnum.TWO_HOURS,
      price: 2500,
      discount: 500,
      calories: 2000,
      description: "Комплекс упражнений на растяжку всего тела для новичков. Плавное погружение в стретчинг и умеренная нагрузка.",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Evil",
      rating: 0,
      isSpecial: true,
      userId: ""
    },
    {
      id: randomUUID(),
      title: "devil's cindy",
      background: "/img/content/thumbnails/training-04.jpg",
      userLevel: UserLevelEnum.PRO,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.HOUR_AND_HALF,
      price: 2200,
      calories: 2700,
      description: "Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.",
      gender: GenderEnum.FEMALE,
      video: "test/video/later.avi",
      trainersName: "Cindy",
      rating: 0,
      isSpecial: false,
      userId: ""
    },
    {
      id: randomUUID(),
      title: "Suffer",
      background: "/img/content/thumbnails/training-05.jpg",
      userLevel: UserLevelEnum.PRO,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.TWO_HOURS,
      price: 5000,
      discount: 1200,
      calories: 3800,
      description: "Эта тренировка выжмет из вас все соки. Мощный, взрывной кроссфит-сплит для самых искушенных спортсменов",
      gender: GenderEnum.MALE,
      video: "test/video/later.avi",
      trainersName: "Alex",
      rating: 5,
      isSpecial: true,
      userId: ""
    }
  ];
}

export function getOrders(usersList: AuthUserInterface[], trainingsList: TrainingInterface[]) {
  const orders = [];

  trainingsList.forEach((training) => {
    const trainingsCount = getRandomIntInclusive(0, 10);
    const totalPrice = training.price * trainingsCount;

    const randomUserIdIndex = getRandomIntInclusive(0, usersList.length - 1);
    const randomUserId = usersList[randomUserIdIndex].id;

    orders.push({
      type: "абонемент",
      userId: randomUserId,
      trainingId: training.id,
      trainingsCount: trainingsCount,
      paymentType: PaymentTypeEnum.MIR,
      price: training.price,
      totalPrice: totalPrice
    });
  });

  return orders;
}

export function getTrainingRequests(usersList: AuthUserInterface[]) {
  const requests = {};
  const clients: AuthUserInterface[] = [];
  const trainers: AuthUserInterface[] = [];

  usersList.forEach((user) =>
      (user.role === UserRoleEnum.CLIENT)
      ? clients.push(user)
      : trainers.push(user)
  );

  trainers.forEach((trainer) => {
    const randomUserIdIndex = getRandomIntInclusive(0, clients.length - 1);
    const randomUserId = clients[randomUserIdIndex].id;

    if(!Object.keys(requests).includes(trainer.id) || requests[trainer.id].userId !== randomUserId) {
      requests[trainer.id] = {
        userId: randomUserId,
        trainerId: trainer.id,
        status: TrainingRequestStatusEnum.PROCESSING
      }
    }

    const result = Object.values(requests);

    return result;
  });
}

const loremText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown \
printer took a galley of type and scrambled it to make a type specimen book. It has survived \
not only five centuries, but also the leap into electronic typesetting, remaining essentially \
unchanged. It was popularised in the 1960s with the release of Letraset sheets containing \
Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

export function getReviews(
  usersList: AuthUserInterface[],
  trainingsList: TrainingInterface[],
  reviewsCount: number = 10
) {
  const reviews = [];

  for(let i = 0; i <= reviewsCount; i++) {
    // User ID
    const randomUserIdIndex = getRandomIntInclusive(0, usersList.length - 1);
    const randomUserId = usersList[randomUserIdIndex].id;

    // Training ID
    const randomTrainingIdIndex = getRandomIntInclusive(0, trainingsList.length - 1);
    const randomTrainingId = trainingsList[randomTrainingIdIndex].id;

    // Review rating
    const randomRating = getRandomIntInclusive(TrainingReviewValidation.RATING.MIN, TrainingReviewValidation.RATING.MAX);

    // Review text
    const loremStartIndex = getRandomIntInclusive(0, 20);
    const loremLength = getRandomIntInclusive(TrainingReviewValidation.TEXT.MIN_LENGTH, loremText.length);

    reviews.push({
      userId: randomUserId,
      trainingId: randomTrainingId,
      rating: randomRating,
      text: loremText.slice(loremStartIndex, loremLength)
    });
  }

  return reviews;
}

export function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
