import { Module } from '@nestjs/common';
import { TrainingRequestController } from './request.controller';
import { TrainingRequestService } from './request.service';
import { TrainingRequestFactory } from './request.factory';
import { TrainingRequestRepository } from './request.repository';

@Module({
  imports: [],
  controllers: [TrainingRequestController],
  providers: [TrainingRequestService, TrainingRequestFactory, TrainingRequestRepository],
  exports: [TrainingRequestService]
})
export class TrainingRequestModule {}