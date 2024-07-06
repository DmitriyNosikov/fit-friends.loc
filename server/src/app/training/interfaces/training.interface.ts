import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { Gender, TrainingType, UserLevel } from '@server/libs/types';
import { TrainingDuration } from '@shared/types/training-duration.enum';

export interface TrainingInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  title: string;
  background: string;
  userLevel: UserLevel;
  trainingType: TrainingType;
  trainingDuration: TrainingDuration;
  price: number;
  discount?: number;
  calories: number;
  description: string;
  gender: Gender;
  video: string;
  rating?: number;
  trainersName: string;
  isSpecial?: boolean;
}