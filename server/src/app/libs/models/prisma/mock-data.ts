import { PaymentTypeEnum } from '../../../../../../shared/types/';
import { BCryptHasher } from '../../helpers/hasher/bcrypt.hasher';
import {
  GenderEnum,
  LocationEnum,
  TrainingDurationEnum,
  TrainingTypeEnum,
  trainingTypeList,
  UserLevelEnum,
  UserRoleEnum
} from '../../types';
import { TrainingInterface } from '../../../training/interfaces';
import { AuthUserInterface } from '../../../user/interfaces';

const ADMIN_USER_ID = "dg34gdf5-dfh4-gh46-wef4-gfl78gn5hfh5";
const SERVICE_ID_ONE = "u8320e27-cb56-4c74-b633-kfd093d812n4";
const SERVICE_ID_TWO = "b3110e27-df4g-j456-3gf4-d71d697f03e9";
const SERVICE_ID_THREE = "md98229j-k4g7-hd94-k4cj-fj45f34gdf68";
const SERVICE_ID_FOUR = "kf98229j-tgg7-hp92-hy5f-ht45f34gdf35";
const SERVICE_ID_FIVE = "rt9825ki-68gt-st28-g8d9-2t545tggj723";

export async function getAdminUser(): Promise<AuthUserInterface> {
  const hasher = new BCryptHasher();
  const password = "jarvis-123";
  const passwordHash = await hasher.getHash(password);;
  // const passwordHash = "$2b$10$lN0OTYWz8V9Bl4UA/Pr5z.xCbLL63fQ71B/jtAV96yrwuDFtBJhhO";

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

export async function getUsers(): Promise<AuthUserInterface[]> {
  const hasher = new BCryptHasher();
  const password = "123456";
  const passwordHash = await hasher.getHash(password);

  return [
    {
      email: "test1@test.ru",
      name: "Alex",
      passwordHash,
      gender: GenderEnum.MALE,
      location: LocationEnum.PETROGRADSKAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.REGULAR,
      dayCaloriesLimit: 2500,
      loseCaloriesLimit: 3800,
      trainingType: trainingTypeList.slice(2)
    },
    {
      email: "test2@test.ru",
      name: "Maria",
      passwordHash,
      gender: GenderEnum.FEMALE,
      location: LocationEnum.UDELNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.NEWBIE,
      dayCaloriesLimit: 1200,
      loseCaloriesLimit: 5000,
      trainingType: trainingTypeList.slice(3)
    },
    {
      email: "test3@test.ru",
      name: "Rick",
      passwordHash,
      gender: GenderEnum.MALE,
      location: LocationEnum.ZVEZDNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.PRO,
      dayCaloriesLimit: 4800,
      loseCaloriesLimit: 3000,
      trainingType: trainingTypeList
    },
    {
      email: "test4@test.ru",
      name: "Lina",
      passwordHash,
      gender: GenderEnum.FEMALE,
      location: LocationEnum.SPORTIVNAYA,
      role: UserRoleEnum.CLIENT,
      level: UserLevelEnum.REGULAR,
      dayCaloriesLimit: 2300,
      loseCaloriesLimit: 4800,
      trainingType: trainingTypeList.slice(4)
    },
  ]
}

export function getTrainings() {
  return [
    {
      id: SERVICE_ID_ONE,
      title: "fitball",
      background: "img/content/thumbnails/training-01.jpg",
      userLevel: UserLevelEnum.NEWBIE,
      trainingType: TrainingTypeEnum.YOGA,
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
      discount: 600,
      calories: 1450,
      description: "Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.",
      gender: GenderEnum.MALE,
      video: "test/video/later.avi",
      trainersName: "Alexa",
      rating: 0,
      isSpecial: true
    },
    {
      id: SERVICE_ID_THREE,
      title: "full body stretch",
      background: "img/content/thumbnails/training-03.jpg",
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
      isSpecial: true
    },
    {
      id: SERVICE_ID_FOUR,
      title: "devil's cindy",
      background: "img/content/thumbnails/training-04.jpg",
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
      isSpecial: false
    },
    {
      id: SERVICE_ID_FIVE,
      title: "Suffer",
      background: "img/content/thumbnails/training-05.jpg",
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
