export const UserSortTypeEnum = {
  CREATED_AT: 'createdAt',
  ROLE: 'role',
} as const;

export type UserSortType = (typeof UserSortTypeEnum)[keyof typeof UserSortTypeEnum];
