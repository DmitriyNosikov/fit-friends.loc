import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from '@server/user/interfaces';
import { RequestStatus, RequestStatusEnum, requestStatusList } from '@shared/request/types/request-status.enum';
import { RequestType, RequestTypeEnum, requestTypeList } from '../types/request-type.enum';

import {
  IsIn,
  IsString,
  IsOptional
} from 'class-validator';

export class CreateRequestDTO {
    @ApiProperty({
      description: 'Request type',
      example: 'friendship',
      enum: RequestTypeEnum
    })
    @IsIn(requestTypeList)
    @IsString()
    requestType: RequestType

    @ApiProperty({
      description: 'Request initiator user id',
      example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    })
    @IsString()
    initiatorUserId?: UserInterface['id']

    @ApiProperty({
      description: 'Request target user id',
      example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    })
    @IsString()
    targetUserId: UserInterface['id']

    @ApiProperty({
      description: 'Request status',
      example: 'На рассмотрении',
      enum: RequestStatusEnum
    })
    @IsIn(requestStatusList)
    @IsString()
    @IsOptional()
    status?: RequestStatus
}