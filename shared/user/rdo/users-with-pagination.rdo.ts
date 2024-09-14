import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { UserRDO } from './user.rdo';

export class UsersWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: UserRDO,
  })
  @Type(() => UserRDO)
  public entities!: UserRDO[];
}