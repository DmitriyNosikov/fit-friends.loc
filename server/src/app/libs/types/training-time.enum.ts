export const TrainingDurationEnum = {
    HALF_HOUR: '10-30',
    HOUR: '30-50',
    HOUR_AND_HALF: '50-80',
    TWO_HOUDS: '80-100',
} as const;

export type TrainingDuration = (typeof TrainingDurationEnum)[keyof typeof TrainingDurationEnum];
export const trainingTimeList: TrainingDuration[] = ['10-30', '30-50', '50-80', '80-100'];