import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderTypeEnum, orderTypeList } from '@server/libs/types';
import {
  IsIn,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { PaymentType, PaymentTypeEnum, paymentTypeList } from '@shared/types/payment-type.enum';
import { UserInterface } from '@server/user/interfaces';

export class CreateOrderDTO {
  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
    enum: OrderTypeEnum
  })
  @IsIn(orderTypeList)
  @IsString()
  type: OrderType;

  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  trainingId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Min(OrderValidation.TRAININGS_COUNT.MIN)
  @Max(OrderValidation.TRAININGS_COUNT.MAX)
  @IsNumber()
  trainingsCount: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'mir',
    enum: PaymentTypeEnum
  })
  @IsIn(paymentTypeList)
  @IsString()
  paymentType: PaymentType;

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  userId: UserInterface['id'];
}