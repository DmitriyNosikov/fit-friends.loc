import { Module } from '@nestjs/common';
import { TrainingController } from './training.controlller';
import { TrainingService } from './training.service';
import { TrainingFactory } from './training.factory';
import { TrainingRepository } from './training.repository';
import { UserModule } from '@server/user/user.module';

@Module({
    imports: [UserModule],
    controllers: [TrainingController],
    providers: [TrainingService, TrainingFactory, TrainingRepository],
    exports: [TrainingService]
})
export class TrainingModule {}