import { MessagesType } from '../../app/libs/types';

export const JWTConfigMessage: MessagesType = {
  ERROR: {
    JWT_ACCESS_TOKEN_SECRET_REQUIRED: '[JWT Config] JWT Access token secret is required',
    JWT_REFRESH_TOKEN_SECRET_REQUIRED: '[JWT Config] JWT Refresh token secret is required ',
    VALIDATION: '[JWT Config] Validation failed. Errors: '
  },
} as const;
