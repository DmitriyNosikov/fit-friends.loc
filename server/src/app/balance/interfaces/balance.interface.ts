import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { TrainingInterface } from '@server/training/interfaces';
import { UserInterface } from '@server/user/interfaces';

export interface BalanceInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  trainingId: TrainingInterface['id'];
  userId?: UserInterface['id'];
  remainingTrainingsCount: number;
  hasTrainingStarted?: boolean;
}