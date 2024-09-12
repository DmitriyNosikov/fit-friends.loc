import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { CreateRequestRDO } from './create-request.rdo';

export class RequestsWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateRequestRDO,
  })
  @Type(() => CreateRequestRDO)
  public entities!: CreateRequestRDO[];
}