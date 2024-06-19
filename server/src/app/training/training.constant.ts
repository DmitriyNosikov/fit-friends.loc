import { MessagesType } from '@server/libs/types';

export const TrainingValidation = {
    TITLE: {
      MIN_LENGTH: 1,
      MAX_LENGTH: 15,
    },
    PRICE: {
        MIN: 0
    },
    CALORIES: {
        MIN: 1000,
        MAX: 5000
    },
    RATING: {
      MIN: 0,
      MAX: 5
    },
    DESCRIPTION: {
        MIN_LENGTH: 10,
        MAX_LENGTH: 140,       
    },
    TRAINERS_NAME: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 15,    
    }
  } as const;

  
export const TrainingMessage: MessagesType = {
    ERROR: {
      NOT_FOUND: 'Training not found',
      CANT_UPDATE: 'Can`t update Training. Possible reason: Object with fields to update are empty',
    },
    SUCCESS: {
      CREATED: 'Training has been successfully created',
      UPDATED: 'Training has been successfully updated',
      FOUND: 'Training found',
      DELETED: 'Training has been successfully deleted',
    },
  } as const;