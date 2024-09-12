import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { UserInterface } from '@server/user/interfaces';
import { TrainingRequestStatus } from '@shared/types/training-request-status.enum';

export interface RequestInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  requestType: string;
  initiatorUserId: UserInterface['id'];
  targetUserId: UserInterface['id'];
  status?: TrainingRequestStatus
}