import { Module } from '@nestjs/common';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestRepository } from './training-request.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [TrainingRequestFactory, TrainingRequestRepository],
  exports: []
})
export class TrainingRequestModule {}