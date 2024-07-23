import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  Max,
  Min,
  IsOptional
} from 'class-validator';

import { OrderValidation } from '@server/order/order.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { UserInterface } from '@server/user/interfaces';

export class ChangeBalanceDTO {
  @ApiProperty({
    description: 'Training ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  @IsOptional()
  trainingId: TrainingInterface['id'];

  @ApiProperty({
    description: 'User ID',
    example: 'd61ef04e-295a-41cb-a230-7e9e4570f14b',
  })
  @IsString()
  userId: UserInterface['id'];

  @ApiProperty({
    description: 'How much trainings you want to add/remove from balance',
    example: 15,
  })
  @IsNumber()
  amount?: number;
}