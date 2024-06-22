import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { CreateOrderRDO } from './create-order.rdo';

export class OrdersWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateOrderRDO,
  })
  @Type(() => CreateOrderRDO)
  public entities!: CreateOrderRDO[];
}