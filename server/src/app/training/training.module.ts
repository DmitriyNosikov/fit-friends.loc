import { Module } from '@nestjs/common';
import { TrainingController } from './training.controlller';
import { TrainintService } from './training.service';

@Module({
    imports: [],
    controllers: [TrainingController],
    providers: [TrainintService],
    exports: []
})
export class TrainingModule {}