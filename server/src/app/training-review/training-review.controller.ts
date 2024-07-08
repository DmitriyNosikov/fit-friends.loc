import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO, filterQuery } from '@server/libs/helpers';

import { UserIdValidationPipe } from '@server/libs/pipes/user-id-validation.pipe';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';
import { InjectTrainingIdInterceptor } from '@server/libs/interceptors/inject-training-id.interceptor';
import { TrainingReviewCheckPermissionInterceptor } from '@server/libs/interceptors/training-review-check-permission.interceptor';

import { TrainingReviewService } from './training-review.service';
import { TrainingReviewMessage } from './training-review.constant';

import { CreateTrainingReviewDTO, CreateTrainingReviewRDO, TrainingReviewsWithPaginationRDO, UpdateTrainingReviewDTO } from '@shared/training-review';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { SortDirectionEnum, SortTypeEnum, TrainingIdPayload } from '@shared/types';

@ApiTags('training-reviews')
@Controller('training-reviews')
export class TrainingReviewController {
  constructor(
    private readonly reviewService: TrainingReviewService
  ) {}

  @Get(':trainingId')
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(InjectTrainingIdInterceptor)
  @ApiOperation({ summary: 'Get reviews list by passed params (or without it)' })
  @ApiQuery({
    name: "createdAt",
    description: `Item's creation date`,
    example: "2024-05-29",
    required: false
  })
  @ApiQuery({
    name: "limit",
    description: `Items per page (pagination). Max limit: ${DefaultSearchParam.MAX_ITEMS_PER_PAGE}`,
    example: "50",
    required: false
  })
  @ApiQuery({
    name: "page",
    description: `Current page in pagination (if items count more than "limit"). Default page: ${DefaultSearchParam.PAGE}`,
    example: "1",
    required: false
  })
  @ApiQuery({
    name: "sortType",
    description: `Sorting type. Default sort type: ${DefaultSearchParam.SORT.TYPE}`,
    enum: SortTypeEnum,
    example: "createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DefaultSearchParam.SORT.DIRECTION}`,
    enum: SortDirectionEnum,
    example: " desc",
    required: false
  })
  public async index(
    @Body('trainingId') trainingId: string,
    @Query() query?: BaseSearchQuery & TrainingIdPayload,
  ): Promise<TrainingReviewsWithPaginationRDO | null> {
    const preparedQuery = filterQuery(query);
    const documents = await this.reviewService.search({
      ...preparedQuery,
      trainingId
    });

    if(!documents.entities || documents.entities.length <= 0) {
      return;
    }

    const reviews = {
      ...documents,
      entities: documents.entities.map((document) => document.toPOJO())
    }

    return reviews;
  }

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