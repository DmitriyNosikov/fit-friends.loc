export const LocationEnum = {
    POINERSKAYA: 'пионерская',
    PETROGRADSKAYA: 'петроградская',
    UDELNAYA: 'удельная',
    ZVEZDNAYA: 'звездная',
    SPORTIVNAYA: 'спортивная',
} as const;

export type Location = (typeof LocationEnum)[keyof typeof LocationEnum];
export const locationList: Location[] = ['пионерская', 'петроградская', 'удельная', 'звездная', 'спортивная'];