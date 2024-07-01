import { Prisma } from '@prisma/client';

export type TrainingReviewsSearchFilters = {
  where: Prisma.TrainingReviewWhereInput,
  orderBy: Prisma.TrainingReviewOrderByWithRelationInput
};
