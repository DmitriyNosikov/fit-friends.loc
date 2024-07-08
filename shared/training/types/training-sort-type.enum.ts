export const TrainingSortTypeEnum = {
  CREATED_AT: 'createdAt',
  PRICE: 'price',
  CALORIES: 'calories',
  RATING: 'rating',
  TYPE: 'type',
} as const;

export type TrainingSortType = (typeof TrainingSortTypeEnum)[keyof typeof TrainingSortTypeEnum];
