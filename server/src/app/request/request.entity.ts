import { StorableEntityInterface } from '@server/libs/interfaces';
import { RequestInterface } from './interfaces/request.interface';
import { UserInterface } from '@server/user/interfaces';
import { RequestStatus } from '@shared/types';
import { RequestType } from '@shared/request';
import { Entity } from '@server/libs/entities';

export class RequestEntity extends Entity implements StorableEntityInterface<RequestInterface> {
  public createdAt?: Date;
  public updatedAt?: Date;

  public requestType: RequestType;
  public initiatorUserId: UserInterface['id']
  public targetUserId: UserInterface['id']
  public status: RequestStatus

  public initiatorUserInfo?: UserInterface;
  public targetUserInfo?: UserInterface;

  constructor(request?: RequestInterface) {
    super();
    this.populate(request);
  }

  populate(request?: RequestInterface & {
    initiatorUser?: UserInterface,
    targetUser?: UserInterface
  }) {
    if(!request) {
      return;
    }

    this.id = request.id;
    this.createdAt = request.createdAt;
    this.updatedAt = request.updatedAt;

    this.requestType = request.requestType;
    this.initiatorUserId = request.initiatorUserId;
    this.targetUserId = request.targetUserId;
    this.status = request.status;

    this.initiatorUserInfo = request.initiatorUser;
    this.targetUserInfo = request.targetUser;
  }

  toPOJO(): RequestInterface & {
    initiatorUserInfo?: UserInterface,
    targetUserInfo?: UserInterface
  } {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      requestType: this.requestType,
      initiatorUserId: this.initiatorUserId,
      targetUserId: this.targetUserId,
      status: this.status,

      initiatorUserInfo: this.initiatorUserInfo,
      targetUserInfo: this.targetUserInfo,
    };
  }
}