export const UserRoleEnum = {
    ADMIN: 'admin',
    CLIENT: 'client',
    TRAINER: 'trainer'
} as const;

export type UserRole = (typeof UserRoleEnum)[keyof typeof UserRoleEnum];
export const userRolesList: UserRole[] = ['admin', 'client', 'trainer'];
export const userRolesListWithoutAdmin: UserRole[] = ['client', 'trainer'];