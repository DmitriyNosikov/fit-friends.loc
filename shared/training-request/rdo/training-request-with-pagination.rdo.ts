import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { CreateTrainingRequestRDO } from './create-training-request.rdo';

export class TrainingRequestsWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateTrainingRequestRDO,
  })
  @Type(() => CreateTrainingRequestRDO)
  public entities!: CreateTrainingRequestRDO[];
}