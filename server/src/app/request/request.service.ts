import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';

import { RequestFactory } from './request.factory';
import { RequestRepository } from './request.repository';
import { RequestMessage } from './request.constant';

import { CreateRequestDTO, RequestTypeEnum, UpdateRequestDTO, UserAndTargetUserIdsPayload } from '@shared/request';
import { BaseSearchQuery, RequestStatusEnum, UserIdPayload } from '@shared/types';
import { RequestEntity } from './request.entity';
import { UserService } from '@server/user/user.service';
import { RequestInterface } from './interfaces/request.interface';
import { RequestType } from '@server/libs/types';

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly requestFactory: RequestFactory,
    
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService
  ) {}
  public async create(dto: CreateRequestDTO & UserIdPayload) {
    const { targetUserId } = dto;
    const initiatorUser = dto.initiatorUserId ?? dto.userId;

    if(initiatorUser === targetUserId) {
      throw new BadRequestException(`Request User-initiator and User-target can't be same person.`);
    }
      
    const isInitiatorUserExists = await this.userService.exists(initiatorUser);
    const isTargetUserExists = await this.userService.exists(targetUserId);

    if(!isInitiatorUserExists || !isTargetUserExists) {
      throw new BadRequestException(`${RequestMessage.ERROR.USERS_DOES_NOT_EXIST}:
        User-initiator: ${isInitiatorUserExists},
        User-target: ${isTargetUserExists}`
      );
    }

    const existsRequest = await this.requestRepository
      .findByInitiatorAndTargetUserId(initiatorUser, targetUserId, dto.requestType);

    // Можно делать только по одному запросу каждого типа
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
    const { userId, ...updatedFields } = fieldsToUpdate;

    await this.checkAccess(requestId, userId);

    if(updatedFields.initiatorUserId) {
      const isInitiatorUserExists = await this.userService.exists(updatedFields.initiatorUserId);
  
      if(!isInitiatorUserExists) {
        throw new BadRequestException(`User ${updatedFields.initiatorUserId} doesn't exist`);
      }
    }

    if(updatedFields.targetUserId) {
      const isTargetUserExists = await this.userService.exists(updatedFields.targetUserId);
  
      if(!isTargetUserExists) {
        throw new BadRequestException(`User ${updatedFields.targetUserId} doesn't exist`);
      }
    }

    const updatedRequest = await this.requestRepository.updateById(requestId, updatedFields);

    return updatedRequest;
  }

  public async delete(requestId: string, userId: string): Promise<void> {
    await this.checkAccess(requestId, userId);

    return await this.requestRepository.deleteById(requestId);
  }

  public async deleteAllByUsers(initiatorUserId: string, targetUserId: string): Promise<void> {
    return await this.requestRepository.deleteAllUserRequests(initiatorUserId, targetUserId);
  }

  public async search(query?: BaseSearchQuery & UserAndTargetUserIdsPayload) {
    const requests = await this.requestRepository.search(query);

    if (!requests && query) {
      throw new NotFoundException(`Can't find requests by passed params " ${query}"`);
    }

    return requests;
  }

  public async getAllUserRequests(userId: string, requestType?: RequestType) {
    const requests = await this.requestRepository.getAllUserRequests(userId, requestType);

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
      throw new BadRequestException(`${RequestMessage.ERROR.HAVENT_ACCESS}. Request id: ${requestId}`);
    }

    return true;
  }
}