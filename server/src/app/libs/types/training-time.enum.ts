export const TrainingTimeEnum = {
    HALF_HOUR: '10-30',
    HOUR: '30-50',
    HOUR_AND_HALF: '50-80',
    TWO_HOUDS: '80-100',
} as const;

export type TrainingTime = (typeof TrainingTimeEnum)[keyof typeof TrainingTimeEnum];
export const trainingTimeList: TrainingTime[] = ['10-30', '30-50', '50-80', '80-100'];