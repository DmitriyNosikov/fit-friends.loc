import { MessagesType } from '../libs/types/';

export const TrainingReviewValidation = {
  RATING: {
    MIN: 1,
    MAX: 5,
  },
  TEXT: {
    MIN_LENGTH: 100,
    MAX_LENGTH: 1024,
  },
} as const;

export const TrainingReviewMessage: MessagesType = {
  ERROR: {
    NOT_FOUND: 'Review not found',
    TRAINING_NOT_FOUND: 'Training not found',
    USER_NOT_FOUND: 'User not found',
    CANT_UPDATE: 'Can`t update review. Possible reason: Object with fields to update are empty',
  },
  SUCCESS: {
    FOUND: 'Review found',
    CREATED: 'Review has been successfully created',
    UPDATED: 'Review has been successfully created',
    DELETED: 'Review has been successfully deleted',
  },
} as const;
