import { Gender, Location, TrainingDuration, TrainingType, UserRole } from '@server/libs/types';

export class AdditionalInfoRDO {
  gender!: Gender[];
  location!: Location[];
  trainingType!: TrainingType[];
  trainingDuration!: TrainingDuration[];
  roles!: UserRole[];
};