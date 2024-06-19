import { BaseSearchQuery } from '@shared/types/search/base-search-query.type';
import { IsNumber, Min, Max, IsString, IsIn, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gender, TrainingType, genderTypeList, trainingTypeList } from '@server/libs/types';
import { TrainingValidation } from '@server/training/training.constant';

export const DefaultTrainingSearchParam = {
  PRISE_FROM: 0,
} as const ;

export class TrainingSearchQuery extends BaseSearchQuery {
  @IsIn(trainingTypeList)
  @IsString()
  @IsOptional()
  trainingType?: TrainingType;

  @IsIn(genderTypeList)
  @IsString()
  gender?: Gender;

  @Expose()
  @IsNumber()
  @IsOptional()
  priceFrom?: number = DefaultTrainingSearchParam.PRISE_FROM;

  @Expose()
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  priceTo?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  caloriesFrom?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  caloriesTo?: number;

  @Min(TrainingValidation.RATING.MIN)
  @Max(TrainingValidation.RATING.MAX)
  @IsNumber()
  @IsOptional()
  rating?: number;
}