import {
  IsString,
  IsBoolean,
  IsIn,
  IsOptional,
  IsArray,
  ArrayMaxSize
} from 'class-validator';
import { Expose } from 'class-transformer';

import {
  Location,
  TrainingType,
  UserLevel,
  UserRole,
  locationList,
  trainingTypeList,
  userLevelList,
  userRolesList
} from '@server/libs/types';
import { BaseSearchQuery, userRolesListWithoutAdmin } from '@shared/types';
import { USER_DEFAULT, UserValidation } from '@server/user/user.constant';
import { TransformValueToArray, TransformValueToBoolean } from '@shared/utils/common';

export class UserSearchQuery extends BaseSearchQuery {
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
}