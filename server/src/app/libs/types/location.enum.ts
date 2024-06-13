export const LocationEnum = {
    POINERSKAYA: 'пионерская',
    PETROGRADSKAYA: 'петроградская',
    UDELNAYA: 'удельная',
    ZVEZDNAYA: 'звездная',
    SPORTIVNAYA: 'спортивная',
} as const;

export type Location = (typeof LocationEnum)[keyof typeof LocationEnum];