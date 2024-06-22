import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { IsNumber, Min, Max, IsString, IsIn, IsOptional, IsDateString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { Gender, TrainingType, genderTypeList, trainingTypeList } from '@server/libs/types';
import { TrainingValidation } from '@server/training/training.constant';
import { TrainingSortType, TrainingSortTypeEnum } from './training-sort-type.enum';
import { SortDirection, SortDirectionEnum } from '@shared/types';

export const DefaultTrainingSearchParam = {
  PRICE_FROM: 0,
} as const ;

export class TrainingSearchQuery {
  @Expose()
  @IsString()
  @IsOptional()
  public title?: string;

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
  public trainingType?: TrainingType | TrainingType[];

  @Expose()
  @IsIn(genderTypeList)
  @IsString()
  @IsOptional()
  public gender?: Gender;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  public priceFrom?: number = DefaultTrainingSearchParam.PRICE_FROM;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  public priceTo?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  public caloriesFrom?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @IsNumber()
  @IsOptional()
  public  caloriesTo?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Min(TrainingValidation.RATING.MIN)
  @IsNumber()
  @IsOptional()
  public ratingFrom?: number;

  @Expose()
  @Transform((field) => {
    if(field.value) {
      return Number(field.value);
    }
  })
  @Max(TrainingValidation.RATING.MAX)
  @IsNumber()
  @IsOptional()
  public ratingTo?: number;

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
  @IsIn(Object.values(TrainingSortType))
  @IsOptional()
  public sortType?: TrainingSortTypeEnum = DefaultSearchParam.SORT.TYPE;

  @Expose()
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection?: SortDirectionEnum = DefaultSearchParam.SORT.DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.PAGE)
  @IsOptional()
  public page?: number = DefaultSearchParam.PAGE;
}