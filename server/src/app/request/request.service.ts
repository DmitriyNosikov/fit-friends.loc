import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { RequestFactory } from './request.factory';
import { RequestRepository } from './request.repository';
import { RequestMessage } from './request.constant';

import { CreateRequestDTO, UpdateRequestDTO, UserAndTargetUserIdsPayload } from '@shared/request';
import { BaseSearchQuery, RequestStatusEnum, UserIdPayload } from '@shared/types';
import { RequestEntity } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestFactory: RequestFactory
  ) {}
  public async create(dto: CreateRequestDTO & UserIdPayload) {
    const { initiatorUserId, targetUserId } = dto;
    const existsRequest = await this.requestRepository
      .findByInitiatorAndTargetUserId(initiatorUserId ?? dto.userId, targetUserId);

    if(existsRequest) {
      throw new BadRequestException(RequestMessage.ERROR.ALREADY_EXISTS);
    }

    const preparedDto: CreateRequestDTO = {
      ...dto,
      initiatorUserId: dto.initiatorUserId ?? dto.userId,
      status: dto.status ?? RequestStatusEnum.PROCESSING,
    };

    const requestEntity = this.requestFactory.create(preparedDto);
    const request = await this.requestRepository.create(requestEntity);

    return request;
  }

  public async updateById(requestId: string, fieldsToUpdate: UpdateRequestDTO & UserIdPayload) {
    const { userId } = fieldsToUpdate;

    await this.checkAccess(requestId, userId);

    fieldsToUpdate.userId = undefined;

    const updatedRequest = await this.requestRepository.updateById(requestId, fieldsToUpdate);

    return updatedRequest;
  }

  public async delete(requestId: string, userId: string): Promise<void> {
    await this.checkAccess(requestId, userId);

    return await this.requestRepository.deleteById(requestId);
  }

  public async search(query?: BaseSearchQuery & UserAndTargetUserIdsPayload) {
    const requests = await this.requestRepository.search(query);

    if (!requests && query) {
      throw new NotFoundException(`Can't find products by passed params " ${query}"`);
    }

    return requests;
  }

  public async getTargetUserRequests(targetUserId: string): Promise<RequestEntity[] | null> {
    const requests = await this.requestRepository.findTargetRequests(targetUserId);

    if(!requests) {
      throw new NotFoundException(RequestMessage.ERROR.NOT_FOUND);
    }

    return requests;
  }

  public async getRequestByInitiatorAndTargetUserId(initiatorId: string, targetUserId: string) {
    const requests = await this.requestRepository.findByInitiatorAndTargetUserId(initiatorId, targetUserId);

    if(!requests) {
      throw new NotFoundException(RequestMessage.ERROR.NOT_FOUND);
    }

    return requests;
  }

  // Сервисные методы
  private async checkAccess(requestId: string, userId: string): Promise<boolean | void> {
    const isUserHaveAccessToRequest = await this.requestRepository.checkAccess(requestId, userId);

    if (!isUserHaveAccessToRequest) {
      throw new UnauthorizedException(`${RequestMessage.ERROR.HAVENT_ACCESS}. Request id: ${requestId}`);
    }

    return true;
  }
}