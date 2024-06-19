export const UserLevelEnum = {
    NEWBIE: 'новичок',
    REGULAR: 'любитель',
    PRO: 'профессионал',
} as const;

export type UserLevel = (typeof UserLevelEnum)[keyof typeof UserLevelEnum];
export const userLevelList: UserLevel[] = ['новичок', 'любитель', 'профессионал'];