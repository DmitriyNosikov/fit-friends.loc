import { Prisma } from '@prisma/client';

export type TrainingRequestSearchFilters = {
  where: Prisma.TrainingRequestWhereInput,
  orderBy: Prisma.TrainingRequestOrderByWithRelationInput
};
