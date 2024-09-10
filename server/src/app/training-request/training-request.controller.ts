import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '@server/user/guards/jwt-auth.guard';

import { TrainingRequestService } from './training-request.service';
import { CreateTrainingRequestDTO, CreateTrainingRequestRDO } from '@shared/training-request';
import { TrainingRequestMessage } from './training-request.constant';
import { fillDTO } from '@server/libs/helpers';

@ApiTags('training requests')
@Controller('training requests')
@UseGuards(JWTAuthGuard)
export class TrainingRequestController {
  constructor(
    private readonly trainingRequestService: TrainingRequestService
  ) {}

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
}