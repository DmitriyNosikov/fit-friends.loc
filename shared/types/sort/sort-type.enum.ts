export const SortType = {
  CREATED_AT: 'createdAt',
} as const;

export type SortTypeEnum = (typeof SortType)[keyof typeof SortType];
