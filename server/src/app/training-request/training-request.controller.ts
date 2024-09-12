import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';

import { TrainingRequestService } from './training-request.service';
import { CreateTrainingRequestDTO, CreateTrainingRequestRDO, TrainingRequestsWithPaginationRDO, UpdateTrainingRequestDTO } from '@shared/training-request';
import { TrainingRequestMessage } from './training-request.constant';
import { fillDTO } from '@server/libs/helpers';
import { InjectUserIdInterceptor } from '@server/libs/interceptors/inject-user-id.interceptor';
import { SortDirectionEnum, SortTypeEnum, UserIdPayload } from '@shared/types';
import { BaseSearchQuery, DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { UserAndTrainerIdsPayload } from './training-request.repository';

@ApiTags('training requests')
@Controller('training-requests')
@UseGuards(JWTAuthGuard)
export class TrainingRequestController {
  constructor(
    private readonly trainingRequestService: TrainingRequestService
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Add new training request' })
  @ApiResponse({
    type: CreateTrainingRequestRDO,
    status: HttpStatus.CREATED,
    description: TrainingRequestMessage.SUCCESS.CREATED
  })
  public async create(@Body() dto: CreateTrainingRequestDTO) {
    const request = await this.trainingRequestService.create(dto);

    return fillDTO(CreateTrainingRequestRDO, request.toPOJO());
  }

  @Get(':trainerId')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Get trainer`s requests' })
  @ApiResponse({
    type: CreateTrainingRequestRDO,
    status: HttpStatus.CREATED,
    description: TrainingRequestMessage.SUCCESS.CREATED
  })
  // TODO: Переделать на метод с пагинацией и поиском
  public async index(@Param('trainerId') trainerId: string) {
    const requests = await this.trainingRequestService.getTrainersRequests(trainerId);

    const requestsPOJO = requests.map((request) => fillDTO(CreateTrainingRequestRDO, request.toPOJO()));

    return requestsPOJO;
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search by training requests' })
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
  @ApiResponse({
    type: TrainingRequestsWithPaginationRDO,
    status: HttpStatus.OK,
    description: TrainingRequestMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingRequestMessage.ERROR.NOT_FOUND
  })
  public async search(
    @Query() query: BaseSearchQuery,
    @Body() payload: UserAndTrainerIdsPayload
  ): Promise<TrainingRequestsWithPaginationRDO> {
    const { userId, trainerId } = payload;
    const searchQuery = {
      ...query,
      userId,
      trainerId
    };
    const requests = await this.trainingRequestService.search(searchQuery);

    const result = {
      ...requests,
      entities:  requests.entities.map((request) => fillDTO(CreateTrainingRequestRDO, request.toPOJO()))
    };

    return result;
  }

  @Get('/by-user')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Add new training request' })
  @ApiResponse({
    type: CreateTrainingRequestRDO,
    status: HttpStatus.CREATED,
    description: TrainingRequestMessage.SUCCESS.CREATED
  })
  // TODO: Переделать на метод с пагинацией и поиском
  public async findByUserAndTrainer(@Body() dto: { userId: string, trainerId: string }) {
    const { userId, trainerId } = dto;
    const request = await this.trainingRequestService.getRequestByUserAndTrainerId(userId, trainerId);

    return fillDTO(CreateTrainingRequestRDO, request.toPOJO());
  }

  @Patch(':requestId')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Update request info' })
  @ApiResponse({
    type: CreateTrainingRequestRDO,
    status: HttpStatus.CREATED,
    description: TrainingRequestMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TrainingRequestMessage.ERROR.CANT_UPDATE
  })
  public async update(
    @Param('requestId') requestId: string,
    @Body() dto: UpdateTrainingRequestDTO & UserIdPayload
  ): Promise<CreateTrainingRequestRDO | null> {
    const updatedRequest = await this.trainingRequestService.updateById(requestId, dto);

    return fillDTO(CreateTrainingRequestRDO, updatedRequest.toPOJO());
  }

  @Delete(':requestId')
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: 'Delete request' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TrainingRequestMessage.SUCCESS.DELETED
  })
  public async delete(
    @Param('requestId') requestId: string,
    @Body('userId') userId: string
  ): Promise<void> {
    await this.trainingRequestService.delete(requestId, userId);
  }
}