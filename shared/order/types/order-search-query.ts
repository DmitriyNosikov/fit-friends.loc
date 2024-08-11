import { BaseSearchQuery } from '@shared/types';
import { IsString, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class OrderSearchQuery extends BaseSearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  userId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  trainerId?: string;

  @Expose()
  @IsString()
  @IsOptional()
  trainingId?: string;
}