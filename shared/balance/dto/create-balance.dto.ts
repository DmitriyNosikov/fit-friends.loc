import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { UserInterface } from '@server/user/interfaces';

export class CreateBalanceDTO {
  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  userId: UserInterface['id'];

  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  trainingId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Remaining trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Min(OrderValidation.TRAININGS_COUNT.MIN)
  @Max(OrderValidation.TRAININGS_COUNT.MAX)
  @IsNumber()
  remainingTrainingsCount: number;
}