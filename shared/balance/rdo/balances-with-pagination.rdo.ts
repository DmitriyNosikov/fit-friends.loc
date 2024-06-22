import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { CreateBalanceRDO } from './create-balance.rdo';

export class BalancesWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateBalanceRDO,
  })
  @Type(() => CreateBalanceRDO)
  public entities!: CreateBalanceRDO[];
}