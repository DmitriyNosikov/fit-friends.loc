import { Module } from '@nestjs/common';
import { TrainingController } from './training.controlller';
import { TrainingService } from './training.service';
import { TrainingFactory } from './training.factory';
import { TrainingRepository } from './training.repository';

@Module({
    imports: [],
    controllers: [TrainingController],
    providers: [TrainingService, TrainingFactory, TrainingRepository],
    exports: []
})
export class TrainingModule {}