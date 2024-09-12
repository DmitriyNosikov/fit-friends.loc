import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestRepository, UserAndTrainerIdsPayload } from './training-request.repository';
import { TrainingRequestMessage } from './training-request.constant';

import { CreateTrainingRequestDTO, UpdateTrainingRequestDTO } from '@shared/training-request';
import { BaseSearchQuery, UserIdPayload } from '@shared/types';
import { TrainingRequestStatusEnum } from '@shared/types/training-request-status.enum';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly trainingRequestRepository: TrainingRequestRepository,
    private readonly trainingRequestFactory: TrainingRequestFactory
  ) {}
  public async create(dto: CreateTrainingRequestDTO & UserIdPayload) {
    const { initiatorId, trainerId } = dto;
    const existsRequest = await this.trainingRequestRepository.findByUserAndTrainerId(initiatorId ?? dto.userId, trainerId);

    if(existsRequest) {
      throw new BadRequestException(TrainingRequestMessage.ERROR.ALREADY_EXISTS);
    }

    const preparedDto: CreateTrainingRequestDTO = {
      ...dto,
      initiatorId: dto.initiatorId ?? dto.userId,
      status: dto.status ?? TrainingRequestStatusEnum.PROCESSING,
    };

    const requestEntity = this.trainingRequestFactory.create(preparedDto);
    const request = await this.trainingRequestRepository.create(requestEntity);

    return request;
  }

  public async updateById(requestId: string, fieldsToUpdate: UpdateTrainingRequestDTO & UserIdPayload) {
    const { userId } = fieldsToUpdate;

    await this.checkAccess(requestId, userId);

    fieldsToUpdate.userId = undefined;

    const updatedRequest = await this.trainingRequestRepository.updateById(requestId, fieldsToUpdate);

    return updatedRequest;
  }

  public async delete(requestId: string, userId: string): Promise<void> {
    await this.checkAccess(requestId, userId);

    return await this.trainingRequestRepository.deleteById(requestId);
  }

  public async search(query?: BaseSearchQuery & UserAndTrainerIdsPayload) {
    const requests = await this.trainingRequestRepository.search(query);

    if (!requests && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return requests;
  }

  public async getTrainersRequests(trainerId: string): Promise<TrainingRequestEntity[] | null> {
    const requests = await this.trainingRequestRepository.findTrainersRequests(trainerId);

    if(!requests) {
      throw new NotFoundException(TrainingRequestMessage.ERROR.NOT_FOUND);
    }

    return requests;
  }

  public async getRequestByUserAndTrainerId(userId: string, trainerId: string) {
    const requests = await this.trainingRequestRepository.findByUserAndTrainerId(userId, trainerId);

    if(!requests) {
      throw new NotFoundException(TrainingRequestMessage.ERROR.NOT_FOUND);
    }

    return requests;
  }

  // Сервисные методы
  private async checkAccess(requestId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToBalance = await this.trainingRequestRepository.checkAccess(requestId, userId);

    if (!isUserHaveAccessToBalance) {
      throw new UnauthorizedException(`${TrainingRequestMessage.ERROR.HAVENT_ACCESS}. Request id: ${requestId}`);
    }

    return true;
  }
}