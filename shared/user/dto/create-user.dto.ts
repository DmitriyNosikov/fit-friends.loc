import { ApiProperty } from '@nestjs/swagger';
import { Location, UserRole, UserRoleEnum, userRolesList } from '@server/libs/types';
import { Gender, GenderEnum, genderTypeList } from '@server/libs/types/gender.enum';
import { LocationEnum, locationList } from '@server/libs/types/location.enum';
import { TrainingDuration, TrainingDurationEnum, trainingDurationList } from '@shared/types/training-duration.enum';
import { TrainingType, TrainingTypeEnum, trainingTypeList } from '@shared/types/training-type.enum';
import { UserLevel, UserLevelEnum, userLevelList } from '@shared/types/user-level.enum';

import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { USER_DEFAULT, UserValidation } from '@server/user/user.constant';

export class CreateUserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'Tony',
    minimum: UserValidation.NAME.MIN_LENGTH,
    maximum: UserValidation.NAME.MAX_LENGTH,
  })
  @MaxLength(UserValidation.NAME.MAX_LENGTH)
  @MinLength(UserValidation.NAME.MIN_LENGTH)
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsOptional()
  avatar!: FormData | string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: UserValidation.PASSWORD.MAX_LENGTH,
    maximum: UserValidation.PASSWORD.MIN_LENGTH,
  })
  @MaxLength(UserValidation.PASSWORD.MAX_LENGTH)
  @MinLength(UserValidation.PASSWORD.MIN_LENGTH)
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: UserRoleEnum
  })
  @IsIn(userRolesList)
  @IsString()
  @IsOptional()
  role?: UserRole = USER_DEFAULT.ROLE;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
    enum: GenderEnum
  })
  @IsIn(genderTypeList)
  @IsString()
  gender!: Gender;

  @ApiProperty({
    description: 'User birth date',
    example: '1993-09-26',
  })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'User profile description',
    example: 'Some interesting profile description',
  })
  @MaxLength(UserValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(UserValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  @IsOptional()
  description?: Date;

  @ApiProperty({
    description: 'User metro station',
    example: 'звездная',
    enum: LocationEnum
  })
  @IsIn(locationList)
  @IsString()
  location!: Location;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsString()
  @IsOptional() // TODO: Должно быть обязательным для заполнения (будет реализовано вместе с загрузкой файлов)
  pageBackground?: FormData | string;

  // Опросник (TODO: все полня временно @IsOptional() пока не решим, где их оставить)
  @ApiProperty({
    description: 'User training level',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @IsIn(userLevelList)
  @IsString()
  @IsOptional()
  level?: UserLevel = USER_DEFAULT.LEVEL;

  @ApiProperty({
    description: 'User trainings type',
    example: '["бокс", "кроссфит", "бег"]',
    enum: TrainingTypeEnum
  })
  @ArrayMaxSize(UserValidation.TRAINING_TYPE.MAX_COUNT)
  @IsArray()
  @IsIn(trainingTypeList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  trainingType?: TrainingType[] = USER_DEFAULT.TRAINING_TYPE;

  @ApiProperty({
    description: 'User training time periods (duration in minutes)',
    example: '10-30',
    enum: TrainingDurationEnum
  })
  @IsIn(trainingDurationList)
  @IsString()
  @IsOptional()
  trainingDuration?: TrainingDuration;

  @ApiProperty({
    description: 'User lose calories aim',
    example: 1000,
    minimum: UserValidation.LOSE_CALORIES.MIN,
    maximum: UserValidation.LOSE_CALORIES.MAX,
  })
  @Max(UserValidation.LOSE_CALORIES.MAX)
  @Min(UserValidation.LOSE_CALORIES.MIN)
  @IsNumber()
  @IsOptional()
  loseCaloriesLimit?: number;

  @ApiProperty({
    description: 'User calories per day limit',
    example: '5000',
    minimum: UserValidation.DAY_CALORIES.MIN,
    maximum: UserValidation.DAY_CALORIES.MAX,
  })
  @Max(UserValidation.DAY_CALORIES.MAX)
  @Min(UserValidation.DAY_CALORIES.MIN)
  @IsNumber()
  @IsOptional()
  dayCaloriesLimit?: number;

  @ApiProperty({
    description: 'Is user ready to training',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isReadyToTraining?: boolean = false;
}
