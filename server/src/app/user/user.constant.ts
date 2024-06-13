import { MessagesType } from '../libs/types/';

export const UserValidation = {
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
} as const;

export const UserMessage: MessagesType = {
  ERROR: {
    ALREADY_EXISTS: 'User with passed email already exists',
    NOT_FOUND: 'User not found',
    INCORRECT_CREDENTIALS: 'Incorrect user email/password',
    CANT_CREATE_TOKENS: 'Can`t get get a new access/refresh tokens',
  },
  SUCCESS: {
    LOGGED_IN: 'User logged in',
    CREATED: 'User has been successfully created',
    NEW_TOKENS: 'Successfully get a new access/refresh tokens',

    FOUND: 'User found',
    DELETED: 'User has been successfully deleted',
  },
} as const;
