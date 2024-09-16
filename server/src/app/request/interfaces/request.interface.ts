import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { UserInterface } from '@server/user/interfaces';
import { RequestType } from '@shared/request';
import { RequestStatus } from '@shared/types';

export interface RequestInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  requestType: RequestType;
  initiatorUserId: UserInterface['id'];
  targetUserId: UserInterface['id'];
  status?: RequestStatus
}