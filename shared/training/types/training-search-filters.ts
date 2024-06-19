import { Prisma } from '@prisma/client';

export type TrainingSearchFilters = {
  where: Prisma.TrainingWhereInput,
  orderBy: Prisma.TrainingOrderByWithRelationInput
};
