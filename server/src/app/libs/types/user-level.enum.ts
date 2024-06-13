export const UserLevelEnum = {
    NEWBIE: 'новичок',
    REGULAR: 'любитель',
    PRO: 'прфоессионал',
} as const;

export type UserLevel = (typeof UserLevelEnum)[keyof typeof UserLevelEnum];