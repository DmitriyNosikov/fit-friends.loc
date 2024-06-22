import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDTO, UpdateOrderDTO, CreateOrderRDO } from '@shared/order';

import { fillDTO } from '@server/libs/helpers';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';

import { OrderService } from './order.service';
import { OrderMessage } from './order.constant';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JWTAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) { }

  @Post('')
  @ApiOperation({ summary: 'Add new order' })
  @ApiResponse({
    type: CreateOrderDTO,
    status: HttpStatus.CREATED,
    description: OrderMessage.SUCCESS.CREATED
  })
  public async create(@Body() dto: CreateOrderDTO) {
    const newOrder = await this.orderService.create(dto);

    return fillDTO(CreateOrderDTO, newOrder.toPOJO());
  }

  @Get('/')
  @ApiOperation({ summary: 'Get orders list by passed params (or without it)' })
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