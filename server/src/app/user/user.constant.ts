import { MessagesType, UserLevelEnum, UserRoleEnum, trainingTypeList } from '@server/libs/types';


export const USER_DEFAULT = {
  ROLE: UserRoleEnum.CLIENT,
  CALORIES: {
    MALE: 3300,
    FEMALE: 2300
  },
  TRAINING_TYPE: trainingTypeList.slice(0, 3),
  LEVEL: UserLevelEnum.REGULAR
} as const;

export const UserValidation = {
  NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 15,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
  DESCRIPTION: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 140,
  },
  LOSE_CALORIES: {
    MIN: 1000,
    MAX: 5000,
  },
  DAY_CALORIES: {
    MIN: 1000,
    MAX: 5000,
  },
  TRAINING_TYPE: {
    MIN_COUNT: 1,
    MAX_COUNT: 3
  },
  ALLOWED_IMG_EXT: [ 'jpg', 'jpeg', 'png' ]
} as const;

export const UserMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User with passed email already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
    CANT_UPDATE: 'Can`t update user. Possible reason: Object with fields to update are empty',
    CANT_UPDATE_USER: 'Sorry, you can update only yourself.',
    CANT_CREATE_TOKENS: 'Can`t get get a new access/refresh tokens',
    CANT_FOUND_ADDITIONAL: 'Can`t found additional info',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
    NEW_TOKENS: 'Successfully get a new access/refresh tokens',

    FRIEND_ADDED: 'Friend has been successfully added',
    FRIEND_REMOVED: 'Friend has been successfully removed',

    FOUND: 'Users found',
    DELETED: 'User has been successfully deleted',
    ADDITIONAL: 'Additional info found'
  },
} as const;
