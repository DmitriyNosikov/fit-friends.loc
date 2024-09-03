import { ApiProperty } from '@nestjs/swagger';
import { TrainingType, UserLevel, UserRole } from '@server/libs/types';
import { GenderEnum } from '@server/libs/types/gender.enum';
import { Location, LocationEnum } from '@server/libs/types/location.enum';
import { TrainingDuration, TrainingDurationEnum } from '@shared/types/training-duration.enum';
import { TrainingTypeEnum } from '@shared/types/training-type.enum';
import { UserLevelEnum } from '@shared/types/user-level.enum';
import { UserValidation } from '@server/user/user.constant';
import { Expose } from 'class-transformer';

export class UserRDO {
  @ApiProperty({
    description: 'Uniq user ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'Created at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    description: 'Updated at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  updatedAt!: Date;

  @ApiProperty({
    description: 'User name',
    example: 'Tony',
    minimum: UserValidation.NAME.MIN_LENGTH,
    maximum: UserValidation.NAME.MAX_LENGTH,
  })
  @Expose()
  name!: string;

  @ApiProperty({
    description: 'User email',
    example: 'iron-man@starkindustries.it',
  })
  @Expose()
  email!: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @Expose()
  avatar!: string;

  @ApiProperty({
    description: 'User role',
    example: 'admin',
  })
  @Expose()
  role!: UserRole;

  @ApiProperty({
    description: 'User gender',
    example: 'мужской',
    enum: GenderEnum
  })
  @Expose()
  gender!: string;

  @ApiProperty({
    description: 'User birth date',
    example: '26.09.1993',
  })
  @Expose()
  birthDate!: Date;

  @ApiProperty({
    description: 'User profile description',
    example: 'Some interesting profile description',
  })
  @Expose()
  description!: string;

  @ApiProperty({
    description: 'User metro station',
    example: 'звездная',
    enum: LocationEnum
  })
  @Expose()
  location!: Location;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @Expose()
  pageBackground!: string;

  // Опросник
  @ApiProperty({
    description: 'User training level',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @Expose()
  level!: UserLevel;

  @ApiProperty({
    description: 'User trainings type',
    example: '["box", "crossfit", "running"]',
    enum: TrainingTypeEnum
  })
  @Expose()
  trainingType!: TrainingType[];

  @ApiProperty({
    description: 'User training time periods (in minutes)',
    example: '10-30',
    enum: TrainingDurationEnum
  })
  @Expose()
  trainingDuration!: TrainingDuration;

  @ApiProperty({
    description: 'User lose calories aim',
    example: '1000',
    minimum: UserValidation.LOSE_CALORIES.MIN,
    maximum: UserValidation.LOSE_CALORIES.MAX,
  })
  @Expose()
  loseCaloriesLimit!: number;

  @ApiProperty({
    description: 'User calories per day limit',
    example: '5000',
    minimum: UserValidation.DAY_CALORIES.MIN,
    maximum: UserValidation.DAY_CALORIES.MAX,
  })
  @Expose()
  dayCaloriesLimit!: number;

  @ApiProperty({
    description: 'Is user ready to training',
    example: 'true',
  })
  @Expose()
  isReadyToTraining!: boolean;

  @ApiProperty({
    description: 'User certificates (for trainers only)',
    example: '["/static/2024/09/03/224297181810-6.pdf", "/static/2024/09/03/224297181810-1.pdf", "/static/2024/09/03/224297181810-3.pdf"]',
  })
  @Expose()
  certificates!: string[];
}
