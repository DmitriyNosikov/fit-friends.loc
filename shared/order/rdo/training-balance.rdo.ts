import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '@server/user/interfaces';
import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { Expose } from 'class-transformer';

export class TrainingBalanceRDO {
  @ApiProperty({
    description: 'Uniq order ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id?: string;
  
  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  serviceId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Remaining trainings count on user balance',
    example: 4,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Expose()
  remainingTrainingsCount: number;

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  userId?: UserInterface['id'];
}