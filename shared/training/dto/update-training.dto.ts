import { ApiProperty } from '@nestjs/swagger';
import { Gender, GenderEnum, TrainingType, TrainingTypeEnum, UserLevel, UserLevelEnum, genderTypeList, trainingTypeList, userLevelList } from '@server/libs/types';
import { TrainingDuration, TrainingDurationEnum, trainingTimeList } from '@server/libs/types/training-duration.enum';
import { TrainingValidation } from '@server/training/training.constant';
import {
    IsBoolean,
    IsIn,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';


export class UpdateTrainingDTO {
  @ApiProperty({
    description: 'Training title',
    example: 'Fat Burner',
    minimum: TrainingValidation.TITLE.MIN_LENGTH,
    maximum: TrainingValidation.TITLE.MAX_LENGTH,
  })
  @MinLength(TrainingValidation.TITLE.MIN_LENGTH)
  @MaxLength(TrainingValidation.TITLE.MAX_LENGTH)
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  background?: string;

  @ApiProperty({
    description: 'Training level, that user have to have for this',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @IsIn(userLevelList)
  @IsString()
  @IsOptional()
  userLevel?: UserLevel;

  
  @ApiProperty({
    description: 'Training type',
    example: 'кроссфит',
    enum: TrainingTypeEnum
  })
  @IsIn(trainingTypeList)
  @IsString()
  @IsOptional()
  trainingType?: TrainingType;

  @ApiProperty({
    description: 'User training time periods (duration in minutes)',
    example: '10-30',
    enum: TrainingDurationEnum
  })
  @IsIn(trainingTimeList)
  @IsString()
  @IsOptional()
  trainingDuration?: TrainingDuration;

  @ApiProperty({
    description: 'Training price',
    example: 1522,
    minimum: TrainingValidation.PRICE.MIN,
  })
  @Min(TrainingValidation.PRICE.MIN)
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Calories count to lose with this training',
    example: 1000,
    minimum: TrainingValidation.CALORIES.MIN,
    maximum: TrainingValidation.CALORIES.MAX,
  })
  @Max(TrainingValidation.CALORIES.MAX)
  @Min(TrainingValidation.CALORIES.MIN)
  @IsNumber()
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'Training description',
    example: 'Some interesting training description',
  })
  @MaxLength(TrainingValidation.DESCRIPTION.MAX_LENGTH)
  @MinLength(TrainingValidation.DESCRIPTION.MIN_LENGTH)
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Gender for who this training',
    example: 'мужской',
    enum: GenderEnum
  })
  @IsIn(genderTypeList)
  @IsString()
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    description: 'Training video',
    example: 'some/interesting/video.avi',
  })
  @IsString()
  @IsOptional()
  video?: string;

  
  @ApiProperty({
    description: 'Training rating',
    example: 0,
  })
  @IsString()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Training creator`s name',
    example: 'Tony Stark',
  })
  @IsString()
  @IsOptional()
  trainersName?: string;

  @ApiProperty({
    description: 'Is special offer or simple training',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isSpecial?: boolean;
}