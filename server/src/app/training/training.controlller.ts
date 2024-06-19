import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTrainingDTO, CreateTrainingRDO, UpdateTrainingDTO } from '@shared/training';
import { TrainingMessage } from './training.constant';
import { TrainingService } from './training.service';
import { fillDTO } from '@server/libs/helpers';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';

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

  // TODO: Реализовать с пагинацией
  // public async index(): Promise<PaginationResult<TrainingEntity>> {

  // }

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