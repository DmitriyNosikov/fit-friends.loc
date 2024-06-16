import { ApiProperty } from '@nestjs/swagger';
import { Location, UserRole, UserRoleEnum, userRolesList } from '@server/libs/types';
import { Gender, GenderEnum, genderTypeList } from '@server/libs/types/gender.enum';
import { LocationEnum, locationList } from '@server/libs/types/location.enum';
import { TrainingTime, TrainingTimeEnum, trainingTimeList } from '@server/libs/types/training-time.enum';
import { TrainingType, TrainingTypeEnum, trainingTypeList } from '@server/libs/types/training-type.enum';
import { UserLevel, UserLevelEnum, userLevelList } from '@server/libs/types/user-level.enum';
import { DEFAULT_USER_ROLE, UserValidation } from '@server/user/user.constant';
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
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    description: 'User password',
    example: 'jarvis-iron-hearth123',
    minimum: UserValidation.PASSWORD.MAX_LENGTH,
    maximum: UserValidation.PASSWORD.MIN_LENGTH,
  })
  @MaxLength(UserValidation.PASSWORD.MAX_LENGTH)
  @MinLength(UserValidation.PASSWORD.MIN_LENGTH)
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
    enum: UserRoleEnum
  })
  @IsIn(userRolesList)
  @IsString()
  @IsOptional()
  role: UserRole = DEFAULT_USER_ROLE;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
    enum: GenderEnum
  })
  @IsIn(genderTypeList)
  @IsString()
  gender: Gender;

  @ApiProperty({
    description: 'User birth date',
    example: '26.09.1993',
  })
  @IsDateString()
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    description: 'User profile description',
    example: 'Some interesting profile description',
  })
  @MaxLength(UserValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(UserValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  @IsOptional()
  description: Date;

  @ApiProperty({
    description: 'User metro station',
    example: 'звездная',
    enum: LocationEnum
  })
  @IsIn(locationList)
  @IsString()
  location: Location;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  pageBackground: string;

  // Опросник (TODO: все полня временно @IsOptional() пока не решим, где их оставить)
  @ApiProperty({
    description: 'User training level',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @IsIn(userLevelList)
  @IsString()
  @IsOptional()
  level: UserLevel;

  @ApiProperty({
    description: 'User trainings type',
    example: '["box", "crossfit", "running"]',
    enum: TrainingTypeEnum
  })
  @ArrayMaxSize(UserValidation.TRAINING_TYPE.MAX_COUNT)
  @IsArray()
  @IsIn(trainingTypeList, { each: true })
  @IsString({ each: true })
  @IsOptional()
  trainingType: TrainingType;

  @ApiProperty({
    description: 'User training time periods (in minutes)',
    example: '10-30',
    enum: TrainingTimeEnum
  })
  @IsIn(trainingTimeList)
  @IsString()
  @IsOptional()
  trainingTime: TrainingTime;

  @ApiProperty({
    description: 'User lose calories aim',
    example: '1000',
    minimum: UserValidation.LOSE_CALORIES.MIN,
    maximum: UserValidation.LOSE_CALORIES.MAX,
  })
  @Max(UserValidation.LOSE_CALORIES.MAX)
  @Min(UserValidation.LOSE_CALORIES.MIN)
  @IsNumber()
  @IsOptional()
  loseCalories: number;

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
  dayCalories: number;

  @ApiProperty({
    description: 'Is user ready to training',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isReadyToTraining: boolean;
}
