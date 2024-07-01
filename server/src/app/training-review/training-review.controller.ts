import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TrainingReviewService } from './training-review.service';
import { CreateTrainingReviewDTO, CreateTrainingReviewRDO, UpdateTrainingReviewDTO } from '@shared/training-review';
import { TrainingReviewMessage } from './training-review.constant';
import { fillDTO } from '@server/libs/helpers';
import { UserIdValidationPipe } from '@server/libs/pipes/user-id-validation.pipe';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';
import { InjectTrainingIdInterceptor } from '@server/libs/interceptors/inject-training-id.interceptor';
import { TrainingReviewPermissionValidationPipe } from '@server/libs/pipes/training-review-permission.validation.pipe';
import { TrainingReviewCheckPermissionInterceptor } from '@server/libs/interceptors/training-review-check-permission.interceptor';

@ApiTags('training-reviews')
@Controller('training-reviews')
export class TrainingReviewController {
  constructor(
    private readonly reviewService: TrainingReviewService
  ) {}

  @Post(':trainingId')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(InjectTrainingIdInterceptor)
  @ApiOperation({ summary: 'Add new review to training' })
  @ApiQuery({
    name: 'Training id',
    description: `Correct training id`,
    example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    required: true
  })
  @ApiResponse({
    type: CreateTrainingReviewRDO,
    status: HttpStatus.CREATED,
    description: TrainingReviewMessage.SUCCESS.CREATED
  })
  public async create(@Body(UserIdValidationPipe) dto: CreateTrainingReviewDTO) {
    const review = await this.reviewService.create(dto);

    return fillDTO(CreateTrainingReviewRDO, review.toPOJO());
  }

  @Patch(':trainingId/:reviewId')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(TrainingReviewCheckPermissionInterceptor)
  @ApiOperation({ summary: 'Update training review' })
  @ApiResponse({
    type: CreateTrainingReviewRDO,
    status: HttpStatus.CREATED,
    description: TrainingReviewMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TrainingReviewMessage.ERROR.CANT_UPDATE
  })
  public async update(
    @Param('reviewId') reviewId: string,
    @Body() dto: UpdateTrainingReviewDTO
  ): Promise<CreateTrainingReviewRDO | null> {
    const updatedReview = await this.reviewService.update(reviewId, dto);

    return fillDTO(CreateTrainingReviewRDO, updatedReview.toPOJO());
  }

  @Delete(':trainingId/:reviewId')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(TrainingReviewCheckPermissionInterceptor)
  @ApiOperation({ summary: 'Delete training review' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TrainingReviewMessage.SUCCESS.DELETED
  })
  public async delete(@Param('reviewId') reviewId: string): Promise<void> {
    await this.reviewService.delete(reviewId);
  }
}