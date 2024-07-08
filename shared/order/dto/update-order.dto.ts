import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderTypeEnum, orderTypeList } from '@server/libs/types';
import {
  IsOptional,
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min
} from 'class-validator';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { PaymentType, PaymentTypeEnum } from '@shared/types/payment-type.enum';
import { UserInterface } from '@server/user/interfaces';

export class UpdateOrderDTO {
  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
    enum: OrderTypeEnum
  })
  @IsIn(orderTypeList)
  @IsString()
  @IsOptional()
  type?: OrderType;

  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  serviceId?: TrainingInterface['id'];

  @ApiProperty({
    description: 'Training price on create order moment',
    example: 1800,
  })
  @IsPositive()
  @IsOptional()
  price?: TrainingInterface['price'];

  @ApiProperty({
    description: 'Trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Min(OrderValidation.TRAININGS_COUNT.MIN)
  @Max(OrderValidation.TRAININGS_COUNT.MAX)
  @IsNumber()
  @IsOptional()
  trainingsCount?: number;

  @ApiProperty({
    description: 'Total order price (trainings count * price)',
    example: 27000,
  })
  @IsNumber()
  @IsOptional()
  totalPrice?: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'mir',
    enum: PaymentTypeEnum
  })
  @IsString()
  @IsOptional()
  paymentType?: PaymentType;

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  userId?: UserInterface['id'];
}