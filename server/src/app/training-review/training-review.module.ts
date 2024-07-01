import { Module } from '@nestjs/common';
import { TrainingReviewController } from './training-review.controller';
import { TrainingReviewEntity } from './training-review.entity';
import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewRepository } from './training-review.repository';

@Module({
  imports: [],
  controllers: [TrainingReviewController],
  providers: [TrainingReviewEntity, TrainingReviewFactory, TrainingReviewRepository],
  exports: [],
})
export class TrainingReviewModule {}