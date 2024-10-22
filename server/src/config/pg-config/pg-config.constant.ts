import { MessagesType } from '../../app/libs/types';

export const PGConfigMessage: MessagesType = {
  ERROR: {
    VALIDATION: '[PG Config] Validation failed. Errors: '
  },
} as const;
