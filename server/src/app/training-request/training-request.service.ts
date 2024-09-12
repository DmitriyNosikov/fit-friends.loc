import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';
import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestMessage } from './training-request.constant';

import { CreateTrainingRequestDTO, UpdateTrainingRequestDTO } from '@shared/training-request';
import { UserIdPayload } from '@shared/types';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly trainingRequestRepository: TrainingRequestRepository,
    private readonly trainingRequestFactory: TrainingRequestFactory
  ) {}

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

  public async create(dto: CreateTrainingRequestDTO) {
    const { initiatorId, trainerId } = dto;
    const existsRequest = await this.trainingRequestRepository.findByUserAndTrainerId(initiatorId, trainerId);

    if(existsRequest) {
      throw new BadRequestException(TrainingRequestMessage.ERROR.ALREADY_EXISTS);
    }

    const requestEntity = this.trainingRequestFactory.create(dto);
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

  // Сервисные методы
  private async checkAccess(requestId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToBalance = await this.trainingRequestRepository.checkAccess(requestId, userId);

    if (!isUserHaveAccessToBalance) {
      throw new UnauthorizedException(`${TrainingRequestMessage.ERROR.HAVENT_ACCESS}. Request id: ${requestId}`);
    }

    return true;
  }
}