import { Prisma } from '@prisma/client';

export type BalanceSearchFilters = {
  where: Prisma.BalanceWhereInput,
  orderBy: Prisma.BalanceOrderByWithRelationInput
};
