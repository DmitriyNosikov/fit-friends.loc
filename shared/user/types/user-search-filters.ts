import { Prisma } from '@prisma/client';

export type UserSearchFilters = {
  where: Prisma.UserWhereInput,
  orderBy: Prisma.UserOrderByWithRelationInput
};
