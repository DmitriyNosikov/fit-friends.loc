import { Prisma } from '@prisma/client';

export type OrderSearchFilters = {
  where: Prisma.OrderWhereInput,
  orderBy: Prisma.OrderOrderByWithRelationInput
};
