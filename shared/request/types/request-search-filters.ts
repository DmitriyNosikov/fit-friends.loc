import { Prisma } from '@prisma/client';

export type RequestSearchFilters = {
  where: Prisma.RequestWhereInput,
  orderBy: Prisma.RequestOrderByWithRelationInput
};
