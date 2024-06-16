export const GenderEnum = {
    MALE: 'мужской',
    FEMALE: 'женский',
    NEVERMIND: 'неважно',
} as const;

export type Gender = (typeof GenderEnum)[keyof typeof GenderEnum];
export const genderTypeList: Gender[] = ['мужской', 'женский', 'неважно'];