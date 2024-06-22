import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderTypeEnum, orderTypeList } from '@server/libs/types';

import { Expose } from 'class-transformer';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { PaymentType, PaymentTypeEnum } from '@server/libs/types/payment-type.enum';
import { UserInterface } from '@server/libs/interfaces';

export class CreateOrderRDO {
  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
    enum: OrderTypeEnum
  })
  @Expose()
  type: OrderType;

  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  serviceId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Training price on create order moment',
    example: 1800,
  })
  @Expose()
  price: TrainingInterface['price'];

  @ApiProperty({
    description: 'Trainings count',
    example: 15,
    minimum: OrderValidation.TRAININGS_COUNT.MIN,
    maximum: OrderValidation.TRAININGS_COUNT.MAX
  })
  @Expose()
  trainingsCount: number;

  @ApiProperty({
    description: 'Total order price (trainings count * price)',
    example: 27000,
  })
  @Expose()
  totalPrice: number;

  @ApiProperty({
    description: 'Payment type',
    example: 'mir',
    enum: PaymentTypeEnum
  })
  @Expose()
  paymentType: PaymentType;

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @Expose()
  userId?: UserInterface['id'];
}