import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CreateTrainingRDO } from './create-training.rdo';
import { BaseItemsWithPaginationRDO } from '@shared/types';

export class TrainingsWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateTrainingRDO,
  })
  @Type(() => CreateTrainingRDO)
  public entities!: CreateTrainingRDO[];
}
