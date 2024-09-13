export const RequestTypeEnum = {
  FRIENDSHIP: 'friendship', // запросы дружбы
  TRAINING: 'training', // запросы на тренировку
} as const;

export type RequestType = (typeof RequestTypeEnum)[keyof typeof RequestTypeEnum];
export const requestTypeList: RequestType[] = ['friendship', 'training'];