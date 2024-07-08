export const SortTypeEnum = {
  CREATED_AT: 'createdAt',
} as const;

export type SortType = (typeof SortTypeEnum)[keyof typeof SortTypeEnum];
