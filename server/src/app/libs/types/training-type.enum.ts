export const TrainingTypeEnum = {
    YOGA: 'yoga',
    RUNNING: 'running',
    BOX: 'box',
    STRETCHING: 'stretching',
    CROSSFIT: 'crossfit',
    AEROBICS: 'aerobics',
    PILATES: 'pilates',
} as const;

export type TrainingType = (typeof TrainingTypeEnum)[keyof typeof TrainingTypeEnum];