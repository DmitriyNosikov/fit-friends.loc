import { TrainingInterface } from '@server/training/interfaces/training.interface';
import { CreatedUpdatedDatesInterface } from '../../libs/interfaces';
import { UserInterface } from '../../user/interfaces';

export interface TrainingReviewInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  userId: UserInterface['id'];
  trainingId: TrainingInterface['id'];
  rating: number;
  text: string;
}