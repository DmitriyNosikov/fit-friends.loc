import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderFactory } from './order.factory';
import { OrderRepository } from './order.repository';
import { TrainingModule } from '@server/training/training.module';
import { OrderController } from './order.controlller';

@Module({
    imports: [TrainingModule],
    controllers: [OrderController],
    providers: [OrderService, OrderFactory, OrderRepository],
    exports: []
})
export class OrderModule {}