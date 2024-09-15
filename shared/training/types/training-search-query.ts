import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { IsNumber, Min, Max, IsString, IsIn, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import {
  Gender,
  TrainingDuration,
  TrainingType,
  UserLevel,
  genderTypeList,
  trainingDurationList,
  trainingTypeList,
  userLevelList
} from '@server/libs/types';
import { TrainingValidation } from '@server/training/training.constant';
import { TrainingSortType, TrainingSortTypeEnum } from './training-sort-type.enum';
import { SortDirection, SortDirectionEnum } from '@shared/types';
import { TransformValueToArray, TransformValueToBoolean, TransformValueToNumber } from '@shared/utils/common';

export const DefaultTrainingSearchParam = {
  PRICE_FROM: 0,
} as const ;

export class TrainingSearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

  @Expose()
  @TransformValueToArray()
  @IsIn(trainingTypeList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  public trainingType?: TrainingType | TrainingType[];

  @Expose()
  @TransformValueToArray()
  @IsIn(trainingDurationList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  public trainingDuration?: TrainingDuration | TrainingDuration[];

  @Expose()
  @IsIn(userLevelList)
  @IsString()
  @IsOptional()
  public level?: UserLevel;

  @Expose()
  @IsIn(genderTypeList)
  @IsString()
  @IsOptional()
  public gender?: Gender;

  @Expose()
  @TransformValueToNumber()
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  public priceFrom?: number = DefaultTrainingSearchParam.PRICE_FROM;

  @Expose()
  @TransformValueToNumber()
  @IsNumber()
  @IsOptional()
  public priceTo?: number;

  @Expose()
  @TransformValueToNumber()
  @IsNumber()
  @IsOptional()
  public dayCaloriesFrom?: number;

  @Expose()
  @TransformValueToNumber()
  @IsNumber()
  @IsOptional()
  public dayCaloriesTo?: number;

  @Expose()
  @TransformValueToNumber()
  @Min(TrainingValidation.RATING.MIN)
  @IsNumber()
  @IsOptional()
  public ratingFrom?: number;

  @Expose()
  @TransformValueToNumber()
  @Max(TrainingValidation.RATING.MAX)
  @IsNumber()
  @IsOptional()
  public ratingTo?: number;

  @Expose()
  @TransformValueToBoolean()
  @IsBoolean()
  @IsOptional()
  public isSpecial?: boolean;

  @Expose()
  @IsString()
  @IsOptional()
  public userId?: string;

  @Expose()
  @TransformValueToBoolean()
  @IsBoolean()
  @IsOptional()
  public withDiscount?: boolean;

  // TODO: Если extends от BaseSearchQuery - возникают проблемы с полем
  // SortType и несоответстием типов. По этой причине пока полностью переносим
  // все свойства из BaseSearchQuery до разрешения данной проблемы
  @Expose()
  @IsDateString()
  @IsOptional()
  public createdAt?: Date;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.MAX_ITEMS_PER_PAGE)
  @Max(DefaultSearchParam.MAX_ITEMS_PER_PAGE)
  @IsNumber()
  @IsOptional()
  public limit?: number = DefaultSearchParam.MAX_ITEMS_PER_PAGE;

  @Expose()
  @IsIn(Object.values(TrainingSortTypeEnum))
  @IsOptional()
  public sortType?: TrainingSortType = DefaultSearchParam.SORT.TYPE;

  @Expose()
  @IsIn(Object.values(SortDirectionEnum))
  @IsOptional()
  public sortDirection?: SortDirection = DefaultSearchParam.SORT.DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.PAGE)
  @IsOptional()
  public page?: number = DefaultSearchParam.PAGE;
}