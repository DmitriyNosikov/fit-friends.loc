import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { AuthUserInterface } from '@server/user/interfaces';

const ADMIN_USER_ID = "dg34gdf5-dfh4-gh46-wef4-gfl78gn5hfh5";
const SERVICE_ID_ONE = "u8320e27-cb56-4c74-b633-kfd093d812n4";
const SERVICE_ID_TWO = "b3110e27-df4g-j456-3gf4-d71d697f03e9";
const SERVICE_ID_THREE = "md98229j-k4g7-hd94-k4cj-fj45f34gdf68";
const SERVICE_ID_FOUR = "kf98229j-tgg7-hp92-hy5f-ht45f34gdf35";

const UserRoleEnum = {
  ADMIN: 'admin',
  CLIENT: 'client',
  TRAINER: 'trainer'
} as const;

const UserLevelEnum = {
  NEWBIE: 'новичок',
  REGULAR: 'любитель',
  PRO: 'профессионал',
} as const;

const TrainingTypeEnum = {
  YOGA: 'йога',
  RUNNING: 'бег',
  BOX: 'бокс',
  STRETCHING: 'стрейчинг',
  CROSSFIT: 'кроссфит',
  AEROBICS: 'аэробика',
  PILATES: 'пилатес',
} as const;

type TrainingType = (typeof TrainingTypeEnum)[keyof typeof TrainingTypeEnum];
const trainingTypeList: TrainingType[] = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];

const TrainingDurationEnum = {
  HALF_HOUR: '10-30',
  HOUR: '30-50',
  HOUR_AND_HALF: '50-80',
  TWO_HOURS: '80-100',
} as const;

const GenderEnum = {
  MALE: 'мужской',
  FEMALE: 'женский',
  NEVERMIND: 'неважно',
} as const;

const PaymentTypeEnum = {
  VISA: 'visa',
  MIR: 'mir',
  UMONEY: 'umoney',
} as const;

export function getAdminUser(): AuthUserInterface {
  // const password = "jarvis-123";
  const passwordHash = "$2b$10$lN0OTYWz8V9Bl4UA/Pr5z.xCbLL63fQ71B/jtAV96yrwuDFtBJhhO";

  return {
    id: ADMIN_USER_ID,
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

export function getTrainings() {
  return [
    {
      id: SERVICE_ID_ONE,
      title: "fitball",
      background: "img/content/thumbnails/training-01.jpg",
      userLevel: UserLevelEnum.NEWBIE,
      trainingType: TrainingTypeEnum.STRETCHING,
      trainingDuration: TrainingDurationEnum.HALF_HOUR,
      price: 1000,
      calories: 1100,
      description: "Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Johny",
      rating: 0,
      isSpecial: false
    },
    {
      id: SERVICE_ID_TWO,
      title: "run, forrest",
      background: "img/content/thumbnails/training-02.jpg",
      userLevel: UserLevelEnum.REGULAR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.HALF_HOUR,
      price: 1500,
      calories: 1450,
      description: "Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.",
      gender: GenderEnum.MALE,
      video: "test/video/later.avi",
      trainersName: "Alexa",
      rating: 0,
      isSpecial: false
    },
    {
      id: SERVICE_ID_THREE,
      title: "full body stretch",
      background: "img/content/thumbnails/training-03.jpg",
      userLevel: UserLevelEnum.REGULAR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.TWO_HOURS,
      price: 2500,
      discount: 500,
      calories: 2000,
      description: "Комплекс упражнений на растяжку всего тела для новичков. Плавное погружение в стретчинг и умеренная нагрузка.",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Evil",
      rating: 0,
      isSpecial: true
    },
    {
      id: SERVICE_ID_FOUR,
      title: "devil's cindy",
      background: "img/content/thumbnails/training-03.jpg",
      userLevel: UserLevelEnum.PRO,
      trainingType: TrainingTypeEnum.CROSSFIT,
      trainingDuration: TrainingDurationEnum.HOUR,
      price: 2200,
      calories: 2700,
      description: "Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.",
      gender: GenderEnum.FEMALE,
      video: "test/video/later.avi",
      trainersName: "Cindy",
      rating: 0,
      isSpecial: true
    }
  ];
}

export function getOrders() {
  const trainings: TrainingInterface[] = getTrainings();
  const orders = [];

  trainings.forEach((training) => {
    const trainingsCount = Math.floor(Math.random() * 10);
    const totalPrice = training.price * trainingsCount;

    orders.push({
      userId: ADMIN_USER_ID,
      type: "абонемент",
      serviceId: training.id,
      trainingsCount: trainingsCount,
      paymentType: PaymentTypeEnum.MIR,
      price: training.price,
      totalPrice: totalPrice
    });
  });

  return orders;
}
