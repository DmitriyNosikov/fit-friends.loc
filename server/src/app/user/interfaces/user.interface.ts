import { Gender, Location, TrainingType, UserLevel, UserRole } from '../../libs/types';
import { CreatedUpdatedDatesInterface } from '../../libs/interfaces/created-updated-dates.interface';
import { TrainingDuration } from '@server/libs/types/training-time.enum';

export interface UserInterface extends CreatedUpdatedDatesInterface {
  id?: string;
  name: string;
  email: string;
  avatar?: string,
  gender: Gender;
  birthDate?: Date;
  description?: string;
  location: Location;
  pageBackground?: string;
  role?: UserRole;

  level?: UserLevel;
  trainingType?: TrainingType[];
  trainingDuration?: TrainingDuration;
  loseCaloriesLimit?: number;
  dayCaloriesLimit?: number;
  isReadyToTraining?: boolean;
}
