export const TrainingSortType = {
  CREATED_AT: 'createdAt',
  PRICE: 'price',
  CALORIES: 'calories',
  RATING: 'rating',
  TYPE: 'type',
} as const;

export type TrainingSortTypeEnum = (typeof TrainingSortType)[keyof typeof TrainingSortType];
