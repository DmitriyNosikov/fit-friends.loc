import { Module } from '@nestjs/common';
import { TrainingRequestController } from './training-request.controller';
import { TrainingRequestService } from './training-request.service';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestRepository } from './training-request.repository';

@Module({
  imports: [],
  controllers: [TrainingRequestController],
  providers: [TrainingRequestService, TrainingRequestFactory, TrainingRequestRepository],
  exports: [TrainingRequestService]
})
export class TrainingRequestModule {}