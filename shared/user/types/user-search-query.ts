import {
  IsString,
  IsBoolean,
  IsIn,
  IsOptional,
  IsArray,
  ArrayMaxSize,
  IsDateString,
  IsNumber,
  Max
} from 'class-validator';
import { Expose, Transform } from 'class-transformer';

import {
  Location,
  TrainingType,
  UserLevel,
  UserRole,
  locationList,
  trainingTypeList,
  userLevelList,
} from '@server/libs/types';
import { SortDirection, SortDirectionEnum, userRolesListWithoutAdmin } from '@shared/types';
import { UserValidation } from '@server/user/user.constant';
import { TransformValueToArray, TransformValueToBoolean } from '@shared/utils/common';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { UserSortType, UserSortTypeEnum } from './user-sort-type.enum';

export class UserSearchQuery {
  @Expose()
  @TransformValueToArray()
  @IsIn(locationList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  location?: Location[];
  
  @Expose()
  @TransformValueToArray()
  @ArrayMaxSize(UserValidation.TRAINING_TYPE.MAX_COUNT)
  @IsArray()
  @IsIn(trainingTypeList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  trainingType?: TrainingType[];

  @Expose()
  @TransformValueToArray()
  @IsIn(userLevelList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  level?: UserLevel[];

  @Expose()
  @TransformValueToArray()
  @IsIn(userRolesListWithoutAdmin, { each: true })
  @IsString({ each: true })
  @IsOptional()
  role?: UserRole[];

  @TransformValueToBoolean()
  @IsBoolean()
  @IsOptional()
  isReadyToTraining?: boolean;

  // Пока так и не получилось extends от BaseSearchQuery
  // из за того, что нельзя переопределять sortType в классе-наследнике
  // (не соответствует тип TypeScript)
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
  @IsIn(Object.values(UserSortTypeEnum))
  @IsOptional()
  public sortType?: UserSortType = DefaultSearchParam.SORT.TYPE;

  @Expose()
  @IsIn(Object.values(SortDirectionEnum))
  @IsOptional()
  public sortDirection?: SortDirection = DefaultSearchParam.SORT.DIRECTION;

  @Expose()
  @Transform(({ value }) => Number(value) || DefaultSearchParam.PAGE)
  @IsOptional()
  public page?: number = DefaultSearchParam.PAGE;
}