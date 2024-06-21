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
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  priceFrom?: number = DefaultTrainingSearchParam.PRICE_FROM;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  priceTo?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  caloriesFrom?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  caloriesTo?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Min(TrainingValidation.RATING.MIN)
  @IsNumber()
  @IsOptional()
  ratingFrom?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Max(TrainingValidation.RATING.MAX)
  @IsNumber()
  @IsOptional()
  ratingTo?: number;
}