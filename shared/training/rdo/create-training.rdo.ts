import { ApiProperty } from '@nestjs/swagger';
import { Gender, GenderEnum, TrainingType, TrainingTypeEnum, UserLevel, UserLevelEnum } from '@server/libs/types';
import { TrainingDuration, TrainingDurationEnum } from '@shared/types/training-duration.enum';
import { TrainingValidation } from '@server/training/training.constant';
import { Expose, Type } from 'class-transformer';
import { UserRDO } from '@shared/user';


export class CreateTrainingRDO {
  @ApiProperty({
    description: 'Uniq training ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    description: 'Created at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated at date',
    example: '2024-04-26 13:02:24.847'
  })
  @Expose()
  updatedAt?: Date;

  @ApiProperty({
    description: 'Training title',
    example: 'Fat Burner',
    minimum: TrainingValidation.TITLE.MIN_LENGTH,
    maximum: TrainingValidation.TITLE.MAX_LENGTH,
  })
  @Expose()
  title!: string;

  @ApiProperty({
    description: 'User profile background. If not passed = User avatar',
    example: 'some/interesting/avatar.jpg',
  })
  @Expose()
  background!: string;

  @ApiProperty({
    description: 'Training level, that user have to have for this',
    example: 'новичок',
    enum: UserLevelEnum
  })
  @Expose()
  userLevel!: UserLevel;

  @ApiProperty({
    description: 'Training type',
    example: 'кроссфит',
    enum: TrainingTypeEnum
  })
  @Expose()
  trainingType!: TrainingType;

  @ApiProperty({
    description: 'User training time periods (duration in minutes)',
    example: '10-30',
    enum: TrainingDurationEnum
  })
  @Expose()
  trainingDuration!: TrainingDuration;

  @ApiProperty({
    description: 'Training price',
    example: 1522,
    minimum: TrainingValidation.PRICE.MIN,
  })
  @Expose()
  price!: number;

  @ApiProperty({
    description: 'Discount value',
    example: 522,
  })
  @Expose()
  discount?: number;

  @ApiProperty({
    description: 'Calories count to lose with this training',
    example: 1000,
    minimum: TrainingValidation.CALORIES.MIN,
    maximum: TrainingValidation.CALORIES.MAX,
  })
  @Expose()
  calories!: number;

  @ApiProperty({
    description: 'Training description',
    example: 'Some interesting training description',
  })
  @Expose()
  description!: string;

  @ApiProperty({
    description: 'Gender for who this training',
    example: 'мужской',
    enum: GenderEnum
  })
  @Expose()
  gender!: Gender;

  @ApiProperty({
    description: 'Training video',
    example: 'some/interesting/video.avi',
  })
  @Expose()
  video!: string;

  
  @ApiProperty({
    description: 'Training rating',
    example: 0,
  })
  @Expose()
  rating?: number;

  @ApiProperty({
    description: 'Training creator`s name',
    example: 'Tony Stark',
  })
  @Expose()
  trainersName?: string;

  @ApiProperty({
    description: 'Training creator`s ID',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  userId!: string;

  @ApiProperty({
    description: 'Training creator`s detail info',
  })
  @Expose()
  @Type(() => UserRDO)
  userInfo?: UserRDO;

  @ApiProperty({
    description: 'Is special offer or simple training',
    example: false,
  })
  @Expose()
  isSpecial?: boolean;
}