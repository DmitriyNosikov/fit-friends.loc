import { ApiProperty } from '@nestjs/swagger';
import { TrainingReviewValidation } from '@server/training-review/training-review.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { UserInterface } from '@server/user/interfaces';
import {
  IsInt,
  Max,
  Min,
  IsString,
  MinLength,
  MaxLength,
  IsOptional
} from 'class-validator';

export class UpdateTrainingReviewDTO {
  @ApiProperty({
    description: 'Review author id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @IsString()
  @IsOptional()
  userId?: UserInterface['id'];

  @ApiProperty({
    description: 'Training id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @IsString()
  @IsOptional()
  trainingId?: TrainingInterface['id'];

  @ApiProperty({
    description: 'Author`s training rate',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    minimum: TrainingReviewValidation.RATING.MIN,
    maximum: TrainingReviewValidation.RATING.MAX
  })
  @Min(TrainingReviewValidation.RATING.MIN)
  @Max(TrainingReviewValidation.RATING.MAX)
  @IsInt()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Author review`s text',
    example: 'it was amazing training',
  })
  @MinLength(TrainingReviewValidation.TEXT.MIN_LENGTH)
  @MaxLength(TrainingReviewValidation.TEXT.MAX_LENGTH)
  @IsString()
  @IsOptional()
  text?: String;
}
