import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseItemsWithPaginationRDO } from '@shared/types';
import { CreateTrainingReviewRDO } from './create-training-review.rdo';
import { UserInterface } from '@server/user/interfaces';

export class TrainingReviewsWithPaginationRDO extends BaseItemsWithPaginationRDO {
  @Expose()
  @ApiProperty({
    description: 'Item entities array',
    type: CreateTrainingReviewRDO,
  })
  @Type(() => CreateTrainingReviewRDO)
  public entities!: CreateTrainingReviewRDO[] & { userInfo?: UserInterface };
}