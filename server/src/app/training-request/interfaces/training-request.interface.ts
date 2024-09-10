import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { UserInterface } from '@server/user/interfaces';
import { TrainingRequestStatus } from '@shared/types/training-request-status.enum';

export interface TrainingRequestInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  initiatorId?: UserInterface['id'];
  trainerId?: UserInterface['id'];
  status: TrainingRequestStatus
}