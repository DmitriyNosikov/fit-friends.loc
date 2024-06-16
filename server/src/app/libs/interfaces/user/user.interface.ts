import { Gender, Location, TrainingTime, TrainingType, UserLevel, UserRole } from '../../types';
import { CreatedUpdatedDatesInterface } from '../created-updated-dates.interface';

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
  trainingTime?: TrainingTime;
  loseCalories?: number;
  dayCalories?: number;
  isReadyToTraining?: boolean;
}
