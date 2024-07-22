import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { OrderInterface } from '@server/order/interfaces';

export class CreateBalanceRDO {
  @ApiProperty({
    description: 'Uniq balance ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    description: 'Created at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  trainingId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Order ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  orderId: OrderInterface['id'];

  @ApiProperty({
    description: 'Remaining trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Expose()
  remainingTrainingsCount: number;
}