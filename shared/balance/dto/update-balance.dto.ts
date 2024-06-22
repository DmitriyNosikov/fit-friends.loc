import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsOptional
} from 'class-validator';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { OrderInterface } from '@server/order/interfaces';
import { UserInterface } from '@server/user/interfaces';

export class UpdateBalanceDTO {
  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  serviceId?: TrainingInterface['id'];

  @ApiProperty({
    description: 'Order ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  orderId?: OrderInterface['id'];

  @ApiProperty({
    description: 'Remaining trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Min(OrderValidation.TRAININGS_COUNT.MIN)
  @Max(OrderValidation.TRAININGS_COUNT.MAX)
  @IsNumber()
  @IsOptional()
  remainingTrainingsCount?: number;

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  userId?: UserInterface['id'];
}