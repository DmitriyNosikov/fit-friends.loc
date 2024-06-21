export const SortType = {
  CREATED_AT: 'createdAt',
  PRICE: 'price',
  CALORIES: 'calories',
  RATING: 'rating',
  TYPE: 'type',
} as const;

export const SortDirection = {
  ASC: 'asc', // По возрастанию
  DESC: 'desc' // По убыванию
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
export type SortDirectionEnum = (typeof SortDirection)[keyof typeof SortDirection];
