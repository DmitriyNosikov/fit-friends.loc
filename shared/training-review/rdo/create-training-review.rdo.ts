import { ApiProperty } from '@nestjs/swagger';
import { TrainingReviewValidation } from '@server/training-review/training-review.constant';
import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { UserInterface } from '@server/user/interfaces';
import { Expose } from 'class-transformer';

export class CreateTrainingReviewRDO {
  @ApiProperty({
    description: 'Uniq review ID',
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
    description: 'Review author id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  userId: UserInterface['id'];

  @ApiProperty({
    description: 'Training id',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
  })
  @Expose()
  trainingId: TrainingInterface['id'];

  @ApiProperty({
    description: 'Author`s training rate',
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    minimum: TrainingReviewValidation.RATING.MIN,
    maximum: TrainingReviewValidation.RATING.MAX
  })
  @Expose()
  rating: number;

  @ApiProperty({
    description: 'Author review`s text',
    example: 'it was amazing training',
  })
  @Expose()
  text: String;
}
