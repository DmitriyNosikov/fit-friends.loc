import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingReviewService } from './training-review.service';
import { CreateTrainingReviewDTO, CreateTrainingReviewRDO } from '@shared/training-review';
import { TrainingReviewMessage } from './training-review.constant';
import { TrainingIdValidationPipe } from '@server/libs/pipes/training-id-validation.pipe';
import { fillDTO } from '@server/libs/helpers';

@ApiTags('reviews')
@Controller('reviews')
export class TrainingReviewController {
  constructor(
    private readonly reviewService: TrainingReviewService
  ) {}

  @Post(':trainingId')
  @ApiOperation({ summary: 'Add new review to training' })
  @ApiResponse({
    type: CreateTrainingReviewRDO,
    status: HttpStatus.CREATED,
    description: TrainingReviewMessage.SUCCESS.CREATED
  })
  public async create(@Param('trainingId', TrainingIdValidationPipe) trainingId: string,  @Body() dto: CreateTrainingReviewDTO) {
    console.log('New training review: ', trainingId, dto);
    // const review = await this.reviewService.create(dto);

    // return fillDTO(CreateTrainingReviewRDO, review.toPOJO());
  }
}