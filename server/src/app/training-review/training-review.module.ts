import { Module } from '@nestjs/common';
import { TrainingReviewController } from './training-review.controller';
import { TrainingReviewEntity } from './training-review.entity';
import { TrainingReviewFactory } from './training-reviews.factory';
import { TrainingReviewRepository } from './training-review.repository';
import { TrainingReviewService } from './training-review.service';
import { UserModule } from '@server/user/user.module';
import { TrainingModule } from '@server/training/training.module';
@Module({
  imports: [UserModule, TrainingModule],
  controllers: [TrainingReviewController],
  providers: [TrainingReviewEntity, TrainingReviewFactory, TrainingReviewService, TrainingReviewRepository],
  exports: [],
})
export class TrainingReviewModule {}