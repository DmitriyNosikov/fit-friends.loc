import { CreatedUpdatedDatesInterface } from '@server/libs/interfaces';
import { Gender, TrainingType, UserLevel } from '@server/libs/types';
import { TrainingDuration } from '@server/libs/types/training-time.enum';

export interface TrainingInterface extends CreatedUpdatedDatesInterface {
    name: string;
    background: string;
    userLevel: UserLevel;
    trainingType: TrainingType;
    trainingDuration: TrainingDuration;
    price: number;
    calories: number;
    description: string;
    gender: Gender,
    video: string;
    rating: number;
    trainersName: string;
    isSpecial: boolean;
}