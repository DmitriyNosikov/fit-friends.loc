import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from '@server/user/interfaces';
import { TrainingRequestStatus, TrainingRequestStatusEnum, trainingRequestStatusList } from '@shared/types/training-request-status.enum';

import {
  IsIn,
  IsString,
  IsOptional
} from 'class-validator';

export class CreateTrainingRequestDTO {
    @ApiProperty({
      description: 'Request initiator id',
      example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    })
    @IsString()
    initiatorId: UserInterface['id']

    @ApiProperty({
      description: 'Request trainer id',
      example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    })
    @IsString()
    trainerId: UserInterface['id']

    @ApiProperty({
      description: 'Request status',
      example: 'На рассмотрении',
      enum: TrainingRequestStatusEnum
    })
    @IsIn(trainingRequestStatusList)
    @IsString()
    @IsOptional()
    status?: TrainingRequestStatus
}