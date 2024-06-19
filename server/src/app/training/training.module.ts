import { Module } from '@nestjs/common';
import { TrainingController } from './training.controlller';
import { TrainingService } from './training.service';

@Module({
    imports: [],
    controllers: [TrainingController],
    providers: [TrainingService],
    exports: []
})
export class TrainingModule {}