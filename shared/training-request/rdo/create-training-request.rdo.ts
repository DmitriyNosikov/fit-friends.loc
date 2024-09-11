import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from '@server/user/interfaces';
import { TrainingRequestStatus, TrainingRequestStatusEnum, trainingRequestStatusList } from '@shared/types/training-request-status.enum';
import { UserRDO } from '@shared/user';

import { Expose, Type } from 'class-transformer';

export class CreateTrainingRequestRDO {
  @ApiProperty({
    description: 'Uniq request ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    description: 'Created at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Request initiator id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  initiatorId?: UserInterface['id']

  @ApiProperty({
    description: 'Request trainer id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  trainerId?: UserInterface['id']

  @ApiProperty({
    description: 'Request status',
    example: 'На рассмотрении',
    enum: TrainingRequestStatusEnum
  })
  @Expose()
  status?: TrainingRequestStatus

  @ApiProperty({
    description: 'Request`s initiator additional info',
  })
  @Expose()
  @Type(() => UserRDO)
  initiatorInfo?: UserRDO;

  @ApiProperty({
    description: 'Request`s trainer additional info',
  })
  @Expose()
  @Type(() => UserRDO)
  trainerInfo?: UserRDO;
}