import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { RequestFactory } from './request.factory';
import { RequestRepository } from './request.repository';
import { RequestMessage } from './request.constant';

import { CreateRequestDTO, RequestTypeEnum, UpdateRequestDTO, UserAndTargetUserIdsPayload } from '@shared/request';
import { BaseSearchQuery, RequestStatusEnum, UserIdPayload } from '@shared/types';
import { RequestEntity } from './request.entity';
import { UserRepository } from '@server/user/user.repository';
import { RequestInterface } from './interfaces/request.interface';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestFactory: RequestFactory,
    private readonly userRepository: UserRepository
  ) {}
  public async create(dto: CreateRequestDTO & UserIdPayload) {
    const { targetUserId } = dto;
    const initiatorUser = dto.initiatorUserId ?? dto.userId;

    if(initiatorUser === targetUserId) {
      throw new BadRequestException(`Request User-initiator and User-target can't be same person.`);
    }
      
    const isInitiatorUserExists = await this.userRepository.exists(initiatorUser);
    const isTargetUserExists = await this.userRepository.exists(targetUserId);

    if(!isInitiatorUserExists || !isTargetUserExists) {
      throw new BadRequestException(`${RequestMessage.ERROR.USERS_DOES_NOT_EXIST}:
        User-initiator: ${isInitiatorUserExists},
        User-target: ${isTargetUserExists}`
      );
    }

    const existsRequest = await this.requestRepository
      .findByInitiatorAndTargetUserId(initiatorUser, targetUserId);

    if(existsRequest) {
      throw new BadRequestException(RequestMessage.ERROR.ALREADY_EXISTS);
    }

    const requestStatus = (dto.requestType === RequestTypeEnum.FRIENDSHIP)
      ? RequestStatusEnum.ACCEPTED // Запросы на дружбу автоматически принимаются
      : RequestStatusEnum.PROCESSING;

    const preparedDto: RequestInterface = {
      ...dto,
      initiatorUserId: initiatorUser,
      status: requestStatus,
    };

    const requestEntity = this.requestFactory.create(preparedDto);
    const request = await this.requestRepository.create(requestEntity);

    return request;
  }

  public async updateById(requestId: string, fieldsToUpdate: UpdateRequestDTO & UserIdPayload) {
    const { userId } = fieldsToUpdate;

    await this.checkAccess(requestId, userId);

    fieldsToUpdate.userId = undefined;

    if(fieldsToUpdate.initiatorUserId) {
      const isInitiatorUserExists = await this.userRepository.exists(fieldsToUpdate.initiatorUserId);
  
      if(!isInitiatorUserExists) {
        throw new BadRequestException(`User ${fieldsToUpdate.initiatorUserId} doesn't exist`);
      }
    }

    if(fieldsToUpdate.targetUserId) {
      const isTargetUserExists = await this.userRepository.exists(fieldsToUpdate.targetUserId);
  
      if(!isTargetUserExists) {
        throw new BadRequestException(`User ${fieldsToUpdate.targetUserId} doesn't exist`);
      }
    }

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
      throw new NotFoundException(`Can't find requests by passed params " ${query}"`);
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