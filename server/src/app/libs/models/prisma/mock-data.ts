import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { AuthUserInterface } from '@server/user/interfaces';

const ADMIN_USER_ID = "dg34gdf5-dfh4-gh46-wef4-gfl78gn5hfh5";
const SERVICE_ID_ONE = "u8320e27-cb56-4c74-b633-kfd093d812n4";
const SERVICE_ID_TWO = "b3110e27-df4g-j456-3gf4-d71d697f03e9";
const SERVICE_ID_THREE = "md98229j-k4g7-hd94-k4cj-fj45f34gdf68";

export const UserRoleEnum = {
  ADMIN: 'admin',
  CLIENT: 'client',
  TRAINER: 'trainer'
} as const;

export const UserLevelEnum = {
  NEWBIE: 'новичок',
  REGULAR: 'любитель',
  PRO: 'профессионал',
} as const;

export const TrainingTypeEnum = {
  YOGA: 'йога',
  RUNNING: 'бег',
  BOX: 'бокс',
  STRETCHING: 'стрейчинг',
  CROSSFIT: 'кроссфит',
  AEROBICS: 'аэробика',
  PILATES: 'пилатес',
} as const;

export type TrainingType = (typeof TrainingTypeEnum)[keyof typeof TrainingTypeEnum];
export const trainingTypeList: TrainingType[] = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];

export const TrainingDurationEnum = {
  HALF_HOUR: '10-30',
  HOUR: '30-50',
  HOUR_AND_HALF: '50-80',
  TWO_HOUDS: '80-100',
} as const;

export const GenderEnum = {
  MALE: 'мужской',
  FEMALE: 'женский',
  NEVERMIND: 'неважно',
} as const;

export const PaymentTypeEnum = {
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
      title: "Run, Forest",
      background: "just/simple/training.jpg",
      userLevel: UserLevelEnum.NEWBIE,
      trainingType: TrainingTypeEnum.AEROBICS,
      trainingDuration: TrainingDurationEnum.HALF_HOUR,
      price: 1000,
      calories: 1100,
      description: "Simple training for simple person",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Johny",
      isSpecial: false
    },
    {
      id: SERVICE_ID_TWO,
      title: "Like a pro",
      background: "train/like/pro.png",
      userLevel: UserLevelEnum.REGULAR,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.HALF_HOUR,
      price: 1500,
      calories: 1450,
      description: "Regular running day",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Alexa",
      isSpecial: false
    },
    {
      id: SERVICE_ID_THREE,
      title: "Run, Forest!",
      background: "just/run/dont/stop.png",
      userLevel: UserLevelEnum.PRO,
      trainingType: TrainingTypeEnum.RUNNING,
      trainingDuration: TrainingDurationEnum.HOUR,
      price: 2500,
      calories: 2000,
      description: "Training for really running fans!",
      gender: GenderEnum.NEVERMIND,
      video: "test/video/later.avi",
      trainersName: "Evil",
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
