import { UserValidation } from '@server/user/user.constant';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsArray,
  ArrayMaxSize,
  IsDateString,
  IsBoolean
} from 'class-validator';
import { Gender, GenderEnum } from '@server/libs/types/gender.enum';
import { Location } from '@server/libs/types';
import { LocationEnum } from '@server/libs/types/location.enum';
import { UserLevel, UserLevelEnum } from '@server/libs/types/user-level.enum';
import { TrainingType, TrainingTypeEnum } from '@server/libs/types/training-type.enum';
import { TrainingTime, TrainingTimeEnum } from '@server/libs/types/training-time.enum';

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
  avatar!: string;

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
    description: 'User gender',
    example: 'мужской',
    enum: GenderEnum
  })
  @IsString()
  gender!: Gender;

  @ApiProperty({
    description: 'User birth date',
    example: '26.09.1993',
  })
  @IsDateString()
  @IsOptional()
  birthDate!: Date;

  @ApiProperty({
    description: 'User profile description',
    example: 'Some interesting profile description',
  })
  @MaxLength(UserValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(UserValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  @IsOptional()
  description!: Date;

  @ApiProperty({
    description: 'User metro station',
    example: 'звездная',
    enum: LocationEnum
  })
  @IsString()
  location!: Location;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  pageBackground!: string;

  // Опросник (TODO: все полня временно @IsOptional() пока не решим, где их оставить)
  @ApiProperty({
    description: 'User training level',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @IsString()
  @IsOptional()
  level!: UserLevel;

  @ApiProperty({
    description: 'User trainings type',
    example: '["box", "crossfit", "running"]',
    enum: TrainingTypeEnum
  })
  @ArrayMaxSize(UserValidation.TRAINING_TYPE.MAX_COUNT)
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  trainingType!: TrainingType;

  @ApiProperty({
    description: 'User training time periods (in minutes)',
    example: '10-30',
    enum: TrainingTimeEnum
  })
  @IsString()
  @IsOptional()
  trainingTime!: TrainingTime;

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
  loseCalories!: Number;

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
  dayCalories!: Number;

  @ApiProperty({
    description: 'Is user ready to training',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  isReadyToTraining!: Boolean;
}
