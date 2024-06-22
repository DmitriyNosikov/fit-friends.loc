import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTrainingDTO,
  CreateTrainingRDO,
  UpdateTrainingDTO,
  TrainingSearchQuery,
  TrainingSortType,
  TrainingsWithPaginationRDO
} from '@shared/training';
import { TrainingMessage } from './training.constant';
import { TrainingService } from './training.service';
import { fillDTO } from '@server/libs/helpers';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';
import { DefaultSearchParam } from '@shared/types/search/base-search-query.type';
import { SortDirection } from '@shared/types/sort/sort-direction.enum';
import { genderTypeList, trainingTypeList } from '@server/libs/types';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingController {
  constructor(
    private readonly trainingService: TrainingService
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Add new training' })
  @ApiResponse({
    type: CreateTrainingDTO,
    status: HttpStatus.CREATED,
    description: TrainingMessage.SUCCESS.CREATED
  })

  public async create(@Body() dto: CreateTrainingDTO) {
    const newTraining = await this.trainingService.create(dto);

    return fillDTO(CreateTrainingRDO, newTraining.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: 'Get trainings list by passed params (or without it)' })
  @ApiQuery({
    name: "title",
    description: `Training title`,
    example: "Run, Forest, run",
    required: false
  })
  @ApiQuery({
    name: "trainingType",
    description: `Training type  (or types array)`,
    enum: Object.values(trainingTypeList),
    example: "кроссфит",
    required: false
  })
  @ApiQuery({
    name: "gender",
    description: `Gender for who this training`,
    enum: Object.values(genderTypeList),
    example: "мужской",
    required: false
  })
  @ApiQuery({
    name: "priceForm",
    description: `Prisa start value`,
    example: 1000,
    required: false
  })
  @ApiQuery({
    name: "priceTo",
    description: `Prisa end value`,
    example: 5000,
    required: false
  })
  @ApiQuery({
    name: "caloriesFrom",
    description: `Calories start value`,
    example: 1000,
    required: false
  })
  @ApiQuery({
    name: "caloriesTo",
    description: `Calories end value`,
    example: 2200,
    required: false
  })
  @ApiQuery({
    name: "ratingFrom",
    description: `Rating start value`,
    example: 1,
    required: false
  })
  @ApiQuery({
    name: "ratingTo",
    description: `Rating end value`,
    example: 5,
    required: false
  })
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
    enum: TrainingSortType,
    example: "createdAt",
    required: false
  })
  @ApiQuery({
    name: "sortDirection",
    description: `Sorting direction. Default direction: ${DefaultSearchParam.SORT.DIRECTION}`,
    enum: SortDirection,
    example: " desc",
    required: false
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TrainingMessage.SUCCESS.FOUND,
    type: TrainingsWithPaginationRDO
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingMessage.ERROR.NOT_FOUND
  })
  public async index(@Query() query?: TrainingSearchQuery): Promise<TrainingsWithPaginationRDO | null> {
    const preparedQuery = this.trainingService.filterQuery(query);
    const documents = await this.trainingService.search(preparedQuery);

    if(!documents.entities || documents.entities.length <= 0) {
      return;
    }

    const trainings = {
      ...documents,
      entities: documents.entities.map((document) => document.toPOJO())
    }

    return trainings;
  }

  @Get(':trainingId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Get detail info about training' })
  @ApiResponse({
    type: CreateTrainingRDO,
    status: HttpStatus.OK,
    description: TrainingMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TrainingMessage.ERROR.NOT_FOUND
  })
  public async show(@Param('trainingId') trainingId: string): Promise<CreateTrainingRDO> {
    const trainingDetail = await this.trainingService.getTrainingDetail(trainingId);

    return fillDTO(CreateTrainingRDO, trainingDetail.toPOJO());
  }

  @Patch(':trainingId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Update training info' })
  @ApiResponse({
    type: CreateTrainingRDO,
    status: HttpStatus.CREATED,
    description: TrainingMessage.SUCCESS.UPDATED
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: TrainingMessage.ERROR.CANT_UPDATE
  })
  public async updateTraining(
    @Param('trainingId') trainingId: string,
    @Body() dto: UpdateTrainingDTO
  ): Promise<CreateTrainingRDO | null> {
    const updatedTraining = await this.trainingService.updateById(trainingId, dto);

    return fillDTO(CreateTrainingRDO, updatedTraining.toPOJO());
  }

  
  @Delete(':trainingId')
  @UseGuards(JWTAuthGuard)
  @ApiOperation({ summary: 'Delete training' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: TrainingMessage.SUCCESS.DELETED
  })
  public async deleteTraining(@Param('trainingId') trainingId: string): Promise<void> {
    await this.trainingService.deleteTraining(trainingId);
  }
}