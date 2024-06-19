import { BaseSearchQuery } from '@shared/types/search/base-search-query.type';
import { IsNumber, Min, Max, IsString, IsIn, IsOptional } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { Gender, TrainingType, genderTypeList, trainingTypeList } from '@server/libs/types';
import { TrainingValidation } from '@server/training/training.constant';

export const DefaultTrainingSearchParam = {
  PRICE_FROM: 0,
} as const ;

export class TrainingSearchQuery extends BaseSearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @Transform(({ value }) => {
    if(value && !Array.isArray(value)) {
      value = [value];
    }

    return value;
  })
  @IsIn(trainingTypeList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  trainingType?: TrainingType | TrainingType[];

  @Expose()
  @IsIn(genderTypeList)
  @IsString()
  @IsOptional()
  gender?: Gender;

  @Expose()
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  priceFrom?: number = DefaultTrainingSearchParam.PRICE_FROM;

  @Expose()
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

  @Expose()
  @Min(TrainingValidation.RATING.MIN)
  @IsNumber()
  @IsOptional()
  ratingFrom?: number;

  @Expose()
  @Max(TrainingValidation.RATING.MAX)
  @IsNumber()
  @IsOptional()
  ratingTo?: number;
}