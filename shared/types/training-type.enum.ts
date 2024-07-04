export const TrainingTypeEnum = {
    YOGA: 'йога',
    RUNNING: 'бег',
    BOX: 'бокс',
    STRETCHING: 'стрейчинг',
    CROSSFIT: 'кроссфит',
    AEROBICS: 'аэробика',
    PILATES: 'пилатес',
} as const;

export type TrainingType = (typeof TrainingTypeEnum)[keyof typeof TrainingTypeEnum];
export const trainingTypeList: TrainingType[] = ['йога', 'бег', 'бокс', 'стрейчинг', 'кроссфит', 'аэробика', 'пилатес'];