import { ApiProperty } from '@nestjs/swagger';

import { UserInterface } from '@server/user/interfaces';
import { RequestStatus, RequestStatusEnum } from '@shared/types/request-status.enum';
import { UserRDO } from '@shared/user';

import { Expose, Type } from 'class-transformer';

export class CreateRequestRDO {
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
    description: 'Request type',
    example: 'friendship | training',
  })
  @Expose()
  requestType: string

  @ApiProperty({
    description: 'Request initiator user id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  initiatorUserId?: UserInterface['id']

  @ApiProperty({
    description: 'Request target user id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  targetUserId?: UserInterface['id']

  @ApiProperty({
    description: 'Request status',
    example: 'На рассмотрении',
    enum: RequestStatusEnum
  })
  @Expose()
  status?: RequestStatus

  @ApiProperty({
    description: 'Request`s initiator additional info',
  })
  @Expose()
  @Type(() => UserRDO)
  initiatorUserInfo?: UserRDO;

  @ApiProperty({
    description: 'Request`s trainer additional info',
  })
  @Expose()
  @Type(() => UserRDO)
  trainerUserInfo?: UserRDO;
}